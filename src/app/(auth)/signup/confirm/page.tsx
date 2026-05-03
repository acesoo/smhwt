export default function ConfirmPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col items-center justify-center relative border-x border-neutral-800/60">

        <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-800 p-8 text-center space-y-4">
          <div className="text-4xl">📬</div>
          <h1 className="text-xl font-bold text-neutral-100">Check your email</h1>
          <p className="text-sm text-neutral-500">
            We sent a confirmation link to your email address. Click it to activate
            your account, then come back to sign in.
          </p>
        </div>

      </div>
    </div>
  )
}