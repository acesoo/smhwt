export default function ConfirmPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md text-center space-y-4">
        <div className="text-4xl">📬</div>
        <h1 className="text-xl font-bold text-gray-900">Check your email</h1>
        <p className="text-sm text-gray-500">
          We sent a confirmation link to your email address. Click it to activate
          your account, then come back to sign in.
        </p>
      </div>
    </div>
  )
}