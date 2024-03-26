import { z } from "zod"

const stronglyPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/ // at least 8 charaters, 1 Uppercase, 1 Lowercase, 1 digit.

export const passwordSchema = z.string().regex(stronglyPasswordRegex, 'At least 8 charaters, 1 Uppercase, 1 Lowercase, 1 digit.')

export const loginFormSchema = z.object({
    email: z.string().email('Not an Email.'),
    password: z.string(),
})

export const registerFormSchema = z.object({
    email: z.string().email('Not an Email.'),
    password: passwordSchema,
    confirmPassword: passwordSchema,
}).superRefine((value, ctx) => {
    if (value.password !== value.confirmPassword) {
        ctx.addIssue({
            message: 'password & confirm password must be the same.',
            code: z.ZodIssueCode.custom,
        })
    }
})