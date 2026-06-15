import type { ReactNode } from 'react'

function SignalBars({ dark }: { dark: boolean }) {
  const bar = dark ? 'bg-ink' : 'bg-ink'
  return (
    <span className="flex items-end gap-[2px]">
      <span className={`h-[4px] w-[3px] rounded-[1px] ${bar}`} />
      <span className={`h-[6px] w-[3px] rounded-[1px] ${bar}`} />
      <span className={`h-[8px] w-[3px] rounded-[1px] ${bar}`} />
      <span className={`h-[10px] w-[3px] rounded-[1px] ${bar}`} />
    </span>
  )
}

function Battery({ dark }: { dark: boolean }) {
  const line = dark ? 'border-ink' : 'border-ink'
  const fill = dark ? 'bg-ink' : 'bg-ink'
  return (
    <span className="flex items-center gap-[1px]">
      <span className={`flex h-[11px] w-[22px] items-center rounded-[3px] border ${line} p-[1.5px]`}>
        <span className={`h-full w-[70%] rounded-[1px] ${fill}`} />
      </span>
      <span className={`h-[4px] w-[1.5px] rounded-r ${fill}`} />
    </span>
  )
}

export function PhoneFrame({
  tone = 'light',
  children,
}: {
  tone?: 'light' | 'dark'
  children: ReactNode
}) {
  const dark = tone === 'dark'
  return (
    <div className="rounded-[44px] bg-bezel p-2 shadow-2xl">
      <div
        className={`relative flex h-[718px] w-[342px] flex-col overflow-hidden rounded-[36px] ${
          dark ? 'bg-night' : 'pl-phone-surface'
        }`}
      >
        <div className="absolute top-2 left-1/2 z-20 h-[26px] w-[104px] -translate-x-1/2 rounded-full bg-bezel" />
        <div
          className={`absolute top-0 inset-x-0 z-20 flex items-center justify-between px-7 pt-3.5 text-body font-medium ${
            dark ? 'text-ink' : 'text-ink'
          }`}
        >
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <SignalBars dark={dark} />
            <svg viewBox="0 0 16 16" className="h-[13px] w-[13px] fill-current shrink-0" aria-hidden="true">
              <path d="M8 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-3.83-5.02a5.42 5.42 0 0 1 7.66 0l-1.06 1.06a3.92 3.92 0 0 0-5.54 0L4.17 8.48Zm-2.12-2.12a8.42 8.42 0 0 1 11.9 0l-1.06 1.06a6.92 6.92 0 0 0-9.78 0L2.05 6.36Z"/>
            </svg>
            <Battery dark={dark} />
          </span>
        </div>
        <div className="pl-noscroll absolute inset-0 z-10 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
