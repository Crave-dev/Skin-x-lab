import { describe, test, expect } from "vitest"
import { passwordSchema } from "./validate"

describe('Strongly password', () => {
    test('Missing at least 1 digit.', async () => {
        const parsed = passwordSchema.safeParse('Mytestpassword')
        expect(parsed.success).toBe(false)
    })

    test('Missing at least 8 character.', async () => {
        const parsed = passwordSchema.safeParse('Mytest')
        expect(parsed.success).toBe(false)
    })

    test('Missing at least 1 lowercase character.', async () => {
        const parsed = passwordSchema.safeParse('MYTEST1234')
        expect(parsed.success).toBe(false)
    })

    test('Missing at least 1 uppercase character.', async () => {
        const parsed = passwordSchema.safeParse('mytest1234')
        expect(parsed.success).toBe(false)
    })
})
