export default function ConfirmPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4 relative overflow-hidden">

      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-950/30 blur-3xl" />
      </div>

      {/* ── Centering shell ── */}
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col items-center justify-center relative border-x border-white/5">

        {/* ── Glass card ── */}
        <div className="w-full max-w-md rounded-2xl p-8 text-center space-y-6
          bg-white/5 backdrop-blur-xl
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

          {/* ── Logo + Title ── */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <svg
                width="26" height="26" viewBox="0 0 26 26"
                fill="none" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M13 22C13 22 4 16.5 4 9.5C4 7.01 5.99 5 8.5 5C10.24 5 11.75 5.99 12.5 7.44L13 8.38L13.5 7.44C14.25 5.99 15.76 5 17.5 5C20.01 5 22 7.01 22 9.5C22 16.5 13 22 13 22Z"
                  fill="#3b82f6"
                  fillOpacity="0.8"
                />
                <path
                  d="M8 13h2.5l1.5-3 2 5 1.5-3.5H18"
                  stroke="#93c5fd"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="text-center">
              <h1 className="text-lg font-semibold text-neutral-100 tracking-tight">
                Wellness Tracker
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5">
                Student Mental Health & Wellness
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-white/8" />

          {/* ── Confirmation message ── */}
          <div className="space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl">
              📬
            </div>
            <h2 className="text-xl font-bold text-neutral-100">Check your email</h2>
            <p className="text-sm text-neutral-500 leading-relaxed">
              We sent a confirmation link to your email address. Click it to activate
              your account, then come back to sign in.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}