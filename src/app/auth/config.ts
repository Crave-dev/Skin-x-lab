import { NextAuthConfig } from "next-auth"
import { loginFormSchema } from "./validate"
import { getUserFromEmail } from "@/db/query"
import { comparePassword } from "./hash"
import Credentials from "next-auth/providers/credentials"

export default {
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

                return user
            },
            
        })
    ]
} satisfies NextAuthConfig