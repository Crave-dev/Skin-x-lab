import NextAuth from "next-auth"
import { db } from "@/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Credentials from "next-auth/providers/credentials"
import { getUserFromEmail } from "@/db/query"
import { loginFormSchema } from "./validate"
import { comparePassword } from "./hash"
import { AdapterUser } from "next-auth/adapters"

export * from './validate'

export const { handlers, auth, signIn, signOut } =  NextAuth({
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = loginFormSchema.safeParse(credentials)
                if (parsed.success === false) {
                    return null
                }
                const user = await getUserFromEmail(parsed.data.email)
                if (!user || !user.hashed_password) return null

                const passwordMatched = await comparePassword(parsed.data.password, user.hashed_password)
                if (!passwordMatched) return null

                return { user: user.id , name: user?.name, email: user.email }
            },
            
        })
    ],
    adapter: DrizzleAdapter(db),
    callbacks: {
        async session(params) {
            if ((params?.token.token as Record<'user', {}>)?.user) {
                params.session.user = (params?.token.token as Record<'user', {}>)?.user as unknown as AdapterUser & { id: string, name: string | null; email: string}
            }
            return params.session
        },
        async jwt(params) {
            return params
        },
    },
    session: { strategy: "jwt" },
    secret: process.env.AUTH_SECRET,
    logger: {
        error(code, ...message) {
            console.error(code, message)
        },
        debug(code, ...message) {
            console.debug(code, message)
        }
    },
})