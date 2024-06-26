import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                id: { label: "id", type: "text" },
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                email: { label: "Email", type: "email" },
            },
            async authorize(credentials) {

                if (!credentials.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                    include: {
                        role: true, // Incluimos el rol del usuario
                    },
                });
                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
              
                if (!passwordMatch) {
                    return null;
                }

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.role) {
                session.user.role = token.role.role;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Redirigir a la página de inicio después de sign out
            if (url === '/api/auth/signout') {
                return baseUrl;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };