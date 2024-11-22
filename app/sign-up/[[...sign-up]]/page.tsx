import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return <div className='w-full h-svh flex justify-center items-center bg-neutral-900 '>
        <SignUp />
    </div>
}