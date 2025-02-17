import Image from 'next/image'
import Link from 'next/link'
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center justify-center gap-2 font-medium">
            <Image
              src="/belajar-indo.png"
              width={180}
              height={52}
              alt="Belajar Indo logo"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
        <p>Photo by <a href="https://unsplash.com/@bagirbahana?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Bagir Bahana</a> on <a href="https://unsplash.com/photos/brown-and-white-boat-on-body-of-water-during-daytime-nAmTWqr8xEk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
          </p>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/bagir-bahana-nAmTWqr8xEk-unsplash.jpg"
          width={720}
          height={961}
          alt="Belajar Indo logo"
        />
      </div>
    </div>
  )
}
