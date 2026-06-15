import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  IconBell,
  IconBolt,
  IconBriefcase,
  IconBuilding,
  IconChevronDown,
  IconChevronRight,
  IconCreditCard,
  IconHelpCircle,
  IconLeaf,
  IconMessageCircle,
  IconPlus,
  IconPlugConnected,
  IconShieldCheck,
  IconUser,
  IconUserCircle,
  IconX,
} from '@tabler/icons-react'
import { Avatar } from '../components/bits'
import { PresenceCarousel } from '../components/PresenceCarousel'
import { atsBacklog, candidates, openMomentsCount, recruiter, type Candidate } from '../data'
import { riseTransition, smoothEase } from '../lib/motion'

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
      className={`flex min-w-[58px] flex-col items-center gap-1 rounded-xl px-2.5 py-1.5 text-caption transition active:scale-[0.96] ${
        active ? 'bg-live-900/40 text-live-700' : 'text-ink-3'
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
    { icon: <IconBell size={16} stroke={1.8} />, label: 'Notification Settings' },
    { icon: <IconCreditCard size={16} stroke={1.8} />, label: 'Billing' },
    { icon: <IconHelpCircle size={16} stroke={1.8} />, label: 'Help' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: smoothEase }}
      className="absolute inset-0 z-30 flex flex-col justify-end bg-night/45"
    >
      <button type="button" aria-label="Close profile menu" className="flex-1" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={riseTransition}
        className="pl-glass-panel rounded-t-[28px] px-4 pt-3 pb-5"
      >
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
      </motion.div>
    </motion.div>
  )
}

const mockRoles = [
  { title: 'Staff Product Engineer', active: true },
  { title: 'Senior PM', active: false },
]

function RolesSheet({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: smoothEase }}
      className="absolute inset-0 z-30 flex flex-col justify-end bg-night/45"
    >
      <button type="button" aria-label="Close" className="flex-1" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={riseTransition}
        className="pl-glass-panel rounded-t-[28px] px-4 pt-3 pb-6"
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink-4/60" />
        <div className="mb-3 flex items-center justify-between">
          <span className="text-subhead font-medium text-ink">Active searches</span>
          <button
            type="button"
            onClick={onClose}
            className="pl-glass-soft flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-caption text-live-700 transition active:scale-95"
          >
            <IconPlus size={13} stroke={1.8} /> New role
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {mockRoles.map((r) => (
            <button
              key={r.title}
              type="button"
              onClick={onClose}
              className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition active:scale-[0.98] ${
                r.active
                  ? 'border-live/30 bg-live-900/60 text-ink'
                  : 'border-hairline bg-surface/40 text-ink-3'
              }`}
            >
              <IconBriefcase size={16} stroke={1.8} className={r.active ? 'text-live-700' : 'text-ink-4'} />
              <div className="flex-1 leading-tight">
                <div className="text-body font-medium">{r.title}</div>
                <div className="text-micro text-ink-4">{r.active ? '5 open moments' : '0 open moments'}</div>
              </div>
              {r.active && (
                <span className="rounded-md bg-live-900 px-2 py-0.5 text-micro font-medium text-live-700">
                  Active
                </span>
              )}
            </button>
          ))}
        </div>
        <p className="mt-4 text-micro text-ink-4">
          Each role has its own Moments board. Candidates only see the role type, not your company, until you go live.
        </p>
      </motion.div>
    </motion.div>
  )
}

export function BoardScreen({ onSelect }: { onSelect: (c: Candidate) => void }) {
  const [showProfile, setShowProfile] = useState(false)
  const [showRoles, setShowRoles] = useState(false)

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div className="px-4 pt-11">
        {/* Category Label */}
        <div className="flex items-center gap-1 text-micro font-semibold tracking-wider text-live uppercase">
          <IconLeaf size={13} stroke={2} className="shrink-0" aria-hidden="true" />
          <span>Moments</span>
        </div>

        {/* Hero Role Title Selector */}
        <button
          type="button"
          onClick={() => setShowRoles(true)}
          className="mt-1.5 flex items-center gap-1.5 text-headline font-semibold text-ink transition active:opacity-70"
        >
          <span>{recruiter.role}</span>
          <IconChevronDown size={14} stroke={2} className="text-ink-3 mt-0.5" />
        </button>

        {/* Combined Stats Subline */}
        <div className="mt-1 text-caption text-ink-3">
          <span className="font-medium text-live-700">{openMomentsCount} open moments</span>
          <span className="mx-2 text-ink-4">·</span>
          <span>vs {atsBacklog} in your ATS</span>
        </div>
      </div>

      <PresenceCarousel candidates={candidates} onSelect={onSelect} />

      <div className="pl-bottom-glass mt-auto flex items-center justify-around border-t border-ink/8 px-2 pt-2 pb-3 text-ink-3">
        <TabItem icon={<IconBolt size={20} stroke={1.8} />} label="Moments" active />
        <TabItem
          icon={
            <div className="relative">
              <IconBriefcase size={20} stroke={1.8} />
              <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-live-900 text-[9px] font-semibold text-live-700">
                {mockRoles.length}
              </span>
            </div>
          }
          label="Roles"
        />
        <TabItem icon={<IconMessageCircle size={20} stroke={1.8} />} label="Messages" />
        <TabItem icon={<IconUser size={20} stroke={1.8} />} label="Profile" onClick={() => setShowProfile(true)} />
      </div>

      <AnimatePresence>
        {showProfile && <ProfileSheet onClose={() => setShowProfile(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showRoles && <RolesSheet onClose={() => setShowRoles(false)} />}
      </AnimatePresence>
    </div>
  )
}
