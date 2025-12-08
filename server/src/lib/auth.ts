import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../prismaClient";
import nodemailer from 'nodemailer'
import EmailVerification from '../email/email-verification'
import ReactDOMServer from "react-dom/server"
import React from "react"


// Gmail SMTP transporter
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_PASS,
//     },
//     logger: true,   // <— logs to console
//     debug: true,    // <— logs SMTP traffic

// });

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        // requireEmailVerification: true,
    },
    // emailVerification: {
    //     sendVerificationEmail: async ({ user, url, token }, request) => {
    //         await transporter.sendMail({
    //             from: process.env.GMAIL_USER,
    //             to: user.email,
    //             subject: "Verify your email address",
    //             text: "Test email from the server",
    //             html: ReactDOMServer.renderToStaticMarkup(
    //                 React.createElement(EmailVerification, { user: user.name, verifyUrl: url })
    //             )
    //         })
    //     },
    //     sendOnSignUp: true,
    //     autoSignInAfterVerification: true
    // },
    trustedOrigins: ['http://localhost:5173'],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});