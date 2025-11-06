import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
      roles: string[];
      permissions: string[];
    } & DefaultSession["user"];
  }

  interface User {
    credits: number;
  }
}

// JWT types are handled differently in NextAuth v5
// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     credits?: number;
//     roles?: string[];
//     permissions?: string[];
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Incorrect password");
        }

        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error("Please verify your email before signing in. Check your inbox for the verification link.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          credits: user.credits,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
              credits: 100,
              lastLogin: new Date(),
              emailVerified: new Date(), // OAuth providers already verify emails
            },
          });
        } else {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              lastLogin: new Date(),
              // Ensure OAuth users have verified email
              emailVerified: existingUser.emailVerified || new Date(),
            },
          });
        }

        // Assign default USER role if no roles exist
        const userRoles = await prisma.userRole.findMany({
          where: { userId: existingUser.id },
        });

        if (userRoles.length === 0) {
          const userRole = await prisma.role.findUnique({
            where: { name: "USER" },
          });

          if (userRole) {
            await prisma.userRole.create({
              data: {
                userId: existingUser.id,
                roleId: userRole.id,
              },
            });
          }
        }

        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      // Initialize with defaults if not set
      if (!token.roles) token.roles = [];
      if (!token.permissions) token.permissions = [];

      if (user) {
        token.id = user.id;
        token.credits = user.credits || 100;
      }

      // Fetch user data from database on each JWT creation/update
      if (token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
            include: {
              userRoles: {
                include: {
                  role: {
                    include: {
                      rolePermissions: {
                        include: {
                          permission: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

          if (dbUser) {
            token.id = dbUser.id;
            token.credits = dbUser.credits;
            token.roles = dbUser.userRoles.map((ur: any) => ur.role.name);
            token.permissions = Array.from(
              new Set(
                dbUser.userRoles.flatMap((ur: any) =>
                  ur.role.rolePermissions.map((rp: any) => rp.permission.name)
                )
              )
            );
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id as string) || "";
        session.user.credits = (token.credits as number) || 100;
        session.user.roles = (token.roles as string[]) || [];
        session.user.permissions = (token.permissions as string[]) || [];
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
});
