import type { ReactNode } from 'react'
import { IconWifi } from '@tabler/icons-react'

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
          className={`relative z-10 flex items-center justify-between px-7 pt-3.5 text-[13px] font-medium ${
            dark ? 'text-ink' : 'text-ink'
          }`}
        >
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <SignalBars dark={dark} />
            <IconWifi size={18} stroke={2.15} />
            <Battery dark={dark} />
          </span>
        </div>
        <div className="pl-noscroll relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
