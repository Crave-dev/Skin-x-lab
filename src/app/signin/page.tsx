import Link from "next/link"
import SigninForm from "./form"

async function SigninPage() {
    return <div className="grid place-items-center w-max-[400px]">
        <SigninForm />
        <Link href='/signup'>
            Sign-up
        </Link>
    </div>
}

export default SigninPage