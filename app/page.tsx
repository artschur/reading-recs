import Image from "next/image";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { LandingHero } from "@/components/hero";
import { ModeToggle } from "@/components/mode-toggle";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <LandingHero />
        <div className="flex gap-4 items-center flex-col sm:flex-row">

          <SignedIn>
            <Link href="/recommended">
              Recommended
            </Link>
          </SignedIn>


          <Link href="/login" className="bg-green-400 dark:bg-green-600 rounded-full p-2 px-4 hover:bg-green-500">
            Login
          </Link>
          <Link href="/sign-up/" className="">
            Join us
          </Link>
        </div>
      </main >
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <ModeToggle />
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div >
  );
}
