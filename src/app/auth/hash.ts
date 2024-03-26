import bcrypt from "bcryptjs"

export async function creatSalt() {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds);
    return salt
}

export async function hashPassword(password: string, salt: string) {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}