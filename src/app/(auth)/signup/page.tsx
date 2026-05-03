import Link from 'next/link'
import { signUp } from '@/app/auth/actions'

interface SignupPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams
  const errorMessage = params.error

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col items-center justify-center relative border-x border-neutral-800/60">

        <div className="w-full max-w-md space-y-8 rounded-2xl bg-neutral-900 border border-neutral-800 p-8">

          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-100">Create your account</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Start tracking your wellness journey
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="rounded-lg bg-red-950/40 p-3 text-sm text-red-400 border border-red-800">
              {decodeURIComponent(errorMessage)}
            </div>
          )}

          {/* Form */}
          <form action={signUp} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-1 block w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-neutral-200 placeholder-neutral-500 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Min. 8 characters"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 active:bg-blue-700 focus:outline-none transition-colors"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-neutral-500">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}