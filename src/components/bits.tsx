import type { ReactNode } from 'react'
import {
  IconBrandGithub,
  IconExternalLink,
  IconMail,
  IconUsers,
  IconUser,
} from '@tabler/icons-react'
import type { AvatarHue, VerifiedSignal } from '../data'

const hueClasses: Record<AvatarHue, string> = {
  iris: 'pl-glass-soft text-ink',
  coral: 'pl-glass-soft text-ink',
  live: 'bg-live-200 text-live-900',
  amber: 'pl-glass-soft text-ink',
}

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-8 w-8 text-[13px]',
  sm: 'h-[30px] w-[30px] text-[12px]',
  md: 'h-11 w-11 text-[15px]',
  lg: 'h-24 w-24 text-[34px]',
  xl: 'h-[104px] w-[104px] text-[34px]',
}

const iconPx: Record<AvatarSize, number> = { xs: 12, sm: 15, md: 22, lg: 40, xl: 44 }

export function LiveDot({ className = '' }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`}>
      <span className="pl-pulse absolute inline-flex h-full w-full rounded-full bg-live" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
    </span>
  )
}

export function Avatar({
  initials,
  hue = 'iris',
  locked = false,
  size = 'md',
}: {
  initials?: string
  hue?: AvatarHue
  locked?: boolean
  size?: AvatarSize
}) {
  if (locked) {
    return (
      <span
        className={`pl-glass-soft flex shrink-0 items-center justify-center rounded-full text-ink-3 ${sizeClasses[size]}`}
      >
        <IconUser size={iconPx[size]} stroke={1.6} />
      </span>
    )
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full font-medium ${hueClasses[hue]} ${sizeClasses[size]}`}
    >
      {initials}
    </span>
  )
}

export function SourceTag({ source, sourceIcon }: Pick<VerifiedSignal, 'source' | 'sourceIcon'>) {
  const Icon =
    sourceIcon === 'github'
      ? IconBrandGithub
      : sourceIcon === 'link'
        ? IconExternalLink
        : sourceIcon === 'users'
          ? IconUsers
          : IconMail
  return (
    <span className="pl-glass-pill flex shrink-0 items-center gap-1 rounded-md px-2 py-[3px] text-[12px] text-ink-2">
      <Icon size={12} stroke={1.7} />
      {source}
    </span>
  )
}

export function SectionLabel({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="mt-4 mb-2 flex items-center gap-1.5">
      <span className="flex items-center">{icon}</span>
      <span className="text-[12px] text-ink-3">{children}</span>
    </div>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="pl-glass-pill rounded-md px-2.5 py-1 text-[12px] text-ink">{children}</span>
}
