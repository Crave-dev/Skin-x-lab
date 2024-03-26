'use client'

import { useFormState, useFormStatus} from 'react-dom'
import { signinAction } from './action'

function SubmitButton() {
    const { pending } = useFormStatus()
    return <button type='submit' disabled={pending} className='bg-[green] text-white rounded-2xl mt-4'>
    {pending ? 'Logging in' : 'Login'}
  </button>
}

export function SignupForm() {
    const [state, action] = useFormState(signinAction, {
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
        <p aria-live="polite" className='text-[red]'>
            {state?.message}
        </p>
      <SubmitButton />
    </form>
}

export default SignupForm