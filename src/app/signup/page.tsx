import Link from "next/link"
import SignupForm from "./form"

async function SignupPage() {
    return <div className="grid place-items-center w-max-[400px]">
        <SignupForm />
        <Link href='/signin'>
            Sign-in
        </Link>
    </div>
}

export default SignupPage