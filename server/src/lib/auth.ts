import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../prismaClient";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    baseURL: "https://home-for-rent-15bl.onrender.com",
    trustedOrigins: [
        'http://localhost:5173',
        'https://bet-ale.vercel.app',
        'https://home-for-rent-15bl.onrender.com'
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 30 * 60 // Cache duration in seconds (5 minutes)
        }
    },
    advanced: {
        cookies: {
            session_token: {
                attributes: {
                    sameSite: "none",
                    secure: true,
                }
            },
            state: {
                attributes: {
                    sameSite: "none",
                    secure: true,
                }
            }
        }
    },
});