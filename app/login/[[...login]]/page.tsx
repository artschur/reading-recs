import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
    return <div className='w-full h-svh flex justify-center items-center bg-neutral-100 dark:bg-neutral-900'>
        <SignIn />
    </div>
}