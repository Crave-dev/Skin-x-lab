'use server'

import { loginFormSchema, signIn } from "../auth"

export async function signinAction(prevState: { message: string } | undefined, formData: FormData) {
    const parsedSchema = loginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (parsedSchema.success === false) {
        return {
            message: parsedSchema.error.errors?.[0]?.message
        }
    }

    await signIn('credentials', {
        email: parsedSchema.data.email,
        password: parsedSchema.data.password,
        redirectTo: '/',
    })
}