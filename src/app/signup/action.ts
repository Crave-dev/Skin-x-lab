'use server'

import { redirect } from "next/navigation"
import { registerFormSchema } from "../auth"
import { creatSalt, hashPassword } from "../auth/hash"
import { createUser, getUserFromEmail } from "@/db/query"
import { nanoid } from "nanoid"

export async function signupAction(prevState: { message: string } | undefined, formData: FormData) {
    const parsedSchema = registerFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    if (parsedSchema.success === false) {
        return {
            message: parsedSchema.error.errors?.[0]?.message
        }
    }
    const isExistedUser = await getUserFromEmail(parsedSchema.data.email)
    if (isExistedUser) {
        return {
            message: 'This email already been used.'
        }
    }
    const salt = await creatSalt()
    const hashed = await hashPassword(parsedSchema.data.password, salt)

    const user = await createUser({
        email: parsedSchema.data.email,
        hashed_password: hashed,
        salt,
        id: nanoid(10)
    })
    .then((user) => console.debug(`Created ${user[0]?.id} from ${user[0]?.email}`))
    .catch((err) => {
        if (err instanceof Error) {
            return {
                message: err?.message
            }
        }
        return { message: 'Failed to create user.' }
    })

    redirect('/signin')
}