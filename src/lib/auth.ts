import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

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

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    credits: number;
    roles: string[];
    permissions: string[];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
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
            },
          });
        } else {
          await prisma.user.update({
            where: { email: user.email },
            data: { lastLogin: new Date() },
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
            token.roles = dbUser.userRoles.map((ur) => ur.role.name);
            token.permissions = Array.from(
              new Set(
                dbUser.userRoles.flatMap((ur) =>
                  ur.role.rolePermissions.map((rp) => rp.permission.name)
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
        session.user.id = token.id;
        session.user.credits = token.credits;
        session.user.roles = token.roles || [];
        session.user.permissions = token.permissions || [];
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
