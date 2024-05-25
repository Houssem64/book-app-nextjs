/* import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { type NextAuthOptions } from "next-auth";
import connectDB from "@/utils/connect"
import bcrypt from "bcrypt";
import User from "../../../../models/userModel"; // Import your User model

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/signin',
    },
    providers: [

        CredentialsProvider({
            id: 'userlogin',
            name: "Credentials",
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await User.findOne({ email: credentials.email });

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        }),],
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
 */
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/utils/connect";
import UserModel from "@/models/userModel";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",

    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                await connectDB();
                const user = await UserModel.findOne({ email });
                if (!user) {
                    throw new Error("User not found");
                }
                const passwordMatch = await user.comparePassword(password);
                if (!passwordMatch) {
                    throw new Error("Invalid password");
                }
                return { name: user.name, email: user.email, id: user._id };
            }
        }

        )
    ],
    callbacks: {
        jwt(params: any) {
            if (params.user?.id) {
                params.id = params.user.id;
            }
            return params.token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as { id: string }).id = token.id as string

            }
            return session;

        }
    }
}
const authHandler = NextAuth(authOptions);


export { authHandler as GET, authHandler as POST };