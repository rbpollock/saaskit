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

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
      if (user.email) {
        // Update last login
        await prisma.user.update({
          where: { email: user.email },
          data: { lastLogin: new Date() },
        });

        // Assign default USER role if no roles exist
        const userRoles = await prisma.userRole.findMany({
          where: { userId: user.id },
        });

        if (userRoles.length === 0) {
          const userRole = await prisma.role.findUnique({
            where: { name: "USER" },
          });

          if (userRole) {
            await prisma.userRole.create({
              data: {
                userId: user.id,
                roleId: userRole.id,
              },
            });
          }
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.credits = user.credits;

        // Fetch user roles and permissions
        const userRoles = await prisma.userRole.findMany({
          where: { userId: user.id },
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
        });

        const roles = userRoles.map((ur) => ur.role.name);
        const permissions = Array.from(
          new Set(
            userRoles.flatMap((ur) =>
              ur.role.rolePermissions.map((rp) => rp.permission.name)
            )
          )
        );

        session.user.roles = roles;
        session.user.permissions = permissions;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "database",
  },
});
