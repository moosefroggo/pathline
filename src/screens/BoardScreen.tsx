import { useState } from 'react'
import {
  IconBolt,
  IconBriefcase,
  IconBuilding,
  IconChevronRight,
  IconCreditCard,
  IconHelpCircle,
  IconLeaf,
  IconMessageCircle,
  IconPlugConnected,
  IconSettings,
  IconShieldCheck,
  IconUser,
  IconUserCircle,
  IconX,
} from '@tabler/icons-react'
import { Avatar } from '../components/bits'
import { PresenceCarousel } from '../components/PresenceCarousel'
import { atsBacklog, candidates, openMomentsCount, recruiter, type Candidate } from '../data'

function TabItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-[58px] flex-col items-center gap-1 rounded-xl px-1.5 py-1 text-caption transition active:scale-[0.96] ${
        active ? 'text-live-700' : 'text-ink-3'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function ProfileSheet({ onClose }: { onClose: () => void }) {
  const rows = [
    { icon: <IconUserCircle size={16} stroke={1.8} />, label: 'Recruiter Profile' },
    { icon: <IconBuilding size={16} stroke={1.8} />, label: 'Company & Team' },
    { icon: <IconShieldCheck size={16} stroke={1.8} />, label: 'Privacy & Consent' },
    { icon: <IconPlugConnected size={16} stroke={1.8} />, label: 'ATS Integrations' },
    { icon: <IconSettings size={16} stroke={1.8} />, label: 'Notification Settings' },
    { icon: <IconCreditCard size={16} stroke={1.8} />, label: 'Billing' },
    { icon: <IconHelpCircle size={16} stroke={1.8} />, label: 'Help' },
  ]

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-night/45">
      <button type="button" aria-label="Close profile menu" className="flex-1" onClick={onClose} />
      <div className="pl-glass-panel rounded-t-[28px] px-4 pt-3 pb-5">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-ink-4/60" />
        <div className="flex items-center gap-3">
          <Avatar initials={recruiter.initial} hue="coral" size="md" />
          <div className="leading-tight">
            <div className="text-subhead font-medium text-ink">Dana Reed</div>
            <div className="text-caption text-ink-3">{recruiter.company} · Hiring Team</div>
          </div>
          <button
            type="button"
            aria-label="Close profile menu"
            onClick={onClose}
            className="pl-glass-soft ml-auto flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition active:scale-95"
          >
            <IconX size={16} stroke={1.8} />
          </button>
        </div>
        <div className="mt-4 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-surface/40">
          {rows.map((row) => (
            <button
              key={row.label}
              type="button"
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-caption text-ink transition hover:bg-ink/5 active:bg-ink/10"
            >
              <span className="text-ink-3">{row.icon}</span>
              <span>{row.label}</span>
              <IconChevronRight size={14} stroke={1.8} className="ml-auto text-ink-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BoardScreen({ onSelect }: { onSelect: (c: Candidate) => void }) {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2">
          <span className="pl-glass-soft flex h-[22px] w-[22px] items-center justify-center rounded-[7px] text-live-700">
            <IconLeaf size={14} stroke={1.8} />
          </span>
          <span className="text-headline font-medium text-ink">Moments</span>
          <button
            type="button"
            aria-label="Open settings"
            onClick={() => setShowProfile(true)}
            className="pl-glass-soft ml-auto flex h-8 w-8 items-center justify-center rounded-full text-ink-2 transition active:scale-95"
          >
            <IconSettings size={16} stroke={1.8} />
          </button>
          <button
            type="button"
            aria-label="Open profile"
            onClick={() => setShowProfile(true)}
            className="transition active:scale-95"
          >
            <Avatar initials={recruiter.initial} hue="coral" size="xs" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-label text-ink-2">
          <IconBriefcase size={13} stroke={1.8} className="shrink-0 text-ink-3" />
          <span>
            Hiring {recruiter.role} · {recruiter.company}
          </span>
        </div>
        <div className="mt-2.5">
          <div className="font-serif text-[19px] font-medium whitespace-nowrap text-live-700">
            {openMomentsCount} available now
          </div>
          <div className="mt-0.5 text-caption text-ink-3">vs {atsBacklog} ATS records</div>
        </div>
      </div>

      <PresenceCarousel candidates={candidates} onSelect={onSelect} />

      <div className="pl-bottom-glass mt-auto flex items-center justify-around border-t border-hairline-strong px-2 pt-2 pb-3 text-ink-3">
        <TabItem icon={<IconBolt size={20} stroke={1.8} />} label="Moments" active />
        <TabItem icon={<IconBriefcase size={20} stroke={1.8} />} label="Roles" />
        <TabItem icon={<IconMessageCircle size={20} stroke={1.8} />} label="Messages" />
        <TabItem icon={<IconUser size={20} stroke={1.8} />} label="Profile" onClick={() => setShowProfile(true)} />
      </div>

      {showProfile && <ProfileSheet onClose={() => setShowProfile(false)} />}
    </div>
  )
}
