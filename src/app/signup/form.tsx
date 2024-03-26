'use client'

import { useFormState, useFormStatus} from 'react-dom'
import { signupAction } from './action'

function SubmitButton() {
    const { pending } = useFormStatus()
    return <button type='submit' disabled={pending} className='bg-[green] text-white rounded-2xl mt-4'>
    {pending ? 'Submitting' : 'Submit'}
  </button>
}

export function SignupForm() {
    const [state, action] = useFormState(signupAction, {
        message: ''
    })

    return <form action={action} className='flex flex-col py-12'>
        <label htmlFor="email" className='flex flex-col'>
            Email:
            <input type="email" id="email" name="email" className='border border-[#ccc] rounded-md' />
        </label>
        <label htmlFor="password" className='flex flex-col'>
            Pasword:
            <input type="password" id="password" name="password" className='border border-[#ccc] rounded-md' />
        </label>
        <label htmlFor="confirmPassword" className='flex flex-col'>
            Confirm Password:
            <input type="password" id="confirmPassword" name="confirmPassword" className='border border-[#ccc] rounded-md' />
        </label>
        <p aria-live="polite" className='text-[red]'>
            {state?.message}
        </p>
      <SubmitButton />
    </form>
}

export default SignupForm