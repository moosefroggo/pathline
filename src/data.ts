// All mock. No backend, no network. Single source of truth for the demo.

export type AvatarHue = 'iris' | 'coral' | 'live' | 'amber'

export interface VerifiedSignal {
  label: string
  source: string // e.g. "work email", "GitHub", "linked URL", "double opt-in"
  sourceIcon: 'mail' | 'github' | 'link' | 'users'
}

export interface Candidate {
  id: string
  // anonymized identity (board + brief)
  anonRole: string
  anonContext: string
  // revealed identity (live moment only)
  name: string
  realRole: string
  initials: string
  hue: AvatarHue
  // presence
  openedAgo: string
  repliesIn: string
  windowSecs: number
  // why-now trigger
  trigger: string
  // brief sections
  verified: VerifiedSignal[]
  vouch: { quote: string; by: string; more: number }
  track: { reply: string; showed: string; onsite: string }
  declared: string[]
  // live moment caption (what they "say")
  liveLine: string
  bookSlot: string
}

export const recruiter = {
  name: 'Dana',
  initial: 'D',
  company: 'Vela',
  role: 'Staff Product Engineer',
  stage: 'Series A · 18 people',
}

export const candidates: Candidate[] = [
  {
    id: 'maya',
    anonRole: 'Senior PM',
    anonContext: 'Series-B fintech · 6 yrs',
    name: 'Maya Chen',
    realRole: 'Senior PM · Northwind',
    initials: 'MC',
    hue: 'iris',
    openedAgo: '2h ago',
    repliesIn: '~12 min',
    windowSecs: 2 * 3600 + 14 * 60,
    trigger: 'Layoffs at her co confirmed · Jun 10',
    verified: [
      { label: 'Company role confirmed', source: 'work email', sourceIcon: 'mail' },
      { label: 'Shipped a public payments product', source: 'linked URL', sourceIcon: 'link' },
      { label: '1,200+ commits this year', source: 'GitHub', sourceIcon: 'github' },
    ],
    vouch: {
      quote: 'Best PM I have shipped with. I would hire again.',
      by: 'former manager',
      more: 1,
    },
    track: { reply: '12 min', showed: '8 / 8', onsite: '2' },
    declared: ['0 to 1 product', 'Series A', '$190-210k', 'NYC / remote'],
    liveLine: 'Vela’s stage is exactly what I’m looking for. When can we talk properly?',
    bookSlot: 'Tue 3:00 PM',
  },
  {
    id: 'andre',
    anonRole: 'Product Engineer',
    anonContext: 'ex-Series A · 5 yrs',
    name: 'Andre Osei',
    realRole: 'Product Engineer · freelance',
    initials: 'AO',
    hue: 'live',
    openedAgo: '40m ago',
    repliesIn: '~6 min',
    windowSecs: 1 * 3600 + 47 * 60,
    trigger: 'Just wrapped a 6-mo contract',
    verified: [
      { label: 'Product engineering role confirmed', source: 'work email', sourceIcon: 'mail' },
      { label: 'Open-source design system, 4k stars', source: 'GitHub', sourceIcon: 'github' },
      { label: 'Live portfolio of shipped apps', source: 'linked URL', sourceIcon: 'link' },
    ],
    vouch: {
      quote: 'Took our prototype to production solo in six weeks.',
      by: 'former founder',
      more: 1,
    },
    track: { reply: '6 min', showed: '5 / 5', onsite: '1' },
    declared: ['0 to 1 product', 'Seed to Series A', '$170-190k', 'Remote'],
    liveLine: 'I’m between contracts and want to build something early-stage.',
    bookSlot: 'Mon 11:00 AM',
  },
  {
    id: 'priya',
    anonRole: 'Staff Engineer',
    anonContext: 'public co · 8 yrs',
    name: 'Priya Nair',
    realRole: 'Staff Engineer · Lumen',
    initials: 'PN',
    hue: 'coral',
    openedAgo: '1h ago',
    repliesIn: '~20 min',
    windowSecs: 3 * 3600 + 2 * 60,
    trigger: 'IPO lockup expired this week',
    verified: [
      { label: 'Staff level confirmed', source: 'work email', sourceIcon: 'mail' },
      { label: 'Led payments platform at scale', source: 'linked URL', sourceIcon: 'link' },
      { label: '900+ commits this year', source: 'GitHub', sourceIcon: 'github' },
    ],
    vouch: {
      quote: 'The person I would trust with our hardest systems problem.',
      by: 'former tech lead',
      more: 2,
    },
    track: { reply: '20 min', showed: '6 / 6', onsite: '3' },
    declared: ['Platform / infra', 'Series A to B', '$210-240k', 'Hybrid SF'],
    liveLine: 'My lockup just cleared. I finally have the freedom to go early again.',
    bookSlot: 'Wed 2:30 PM',
  },
  {
    id: 'sam',
    anonRole: 'Design Engineer',
    anonContext: 'Series-A startup · 4 yrs',
    name: 'Sam Reyes',
    realRole: 'Design Engineer · Tide',
    initials: 'SR',
    hue: 'amber',
    openedAgo: '18m ago',
    repliesIn: '~9 min',
    windowSecs: 2 * 3600 + 35 * 60,
    trigger: 'Their team reorged this week',
    verified: [
      { label: 'Design engineering role confirmed', source: 'work email', sourceIcon: 'mail' },
      { label: 'Dribbble + live component library', source: 'linked URL', sourceIcon: 'link' },
      { label: '600+ commits this year', source: 'GitHub', sourceIcon: 'github' },
    ],
    vouch: {
      quote: 'Closes the gap between design and code better than anyone.',
      by: 'former manager',
      more: 0,
    },
    track: { reply: '9 min', showed: '4 / 4', onsite: '1' },
    declared: ['Design + frontend', 'Series A', '$180-200k', 'NYC / remote'],
    liveLine: 'After the reorg I want a place where craft actually matters again.',
    bookSlot: 'Thu 10:00 AM',
  },
  {
    id: 'jordan',
    anonRole: 'Senior PM',
    anonContext: 'big tech · 7 yrs',
    name: 'Jordan Blake',
    realRole: 'Senior PM · Northstar',
    initials: 'JB',
    hue: 'iris',
    openedAgo: '5m ago',
    repliesIn: '~15 min',
    windowSecs: 50, // short on purpose — demos the perishable window-closed state live
    trigger: 'Quietly exploring this week',
    verified: [
      { label: 'Senior PM level confirmed', source: 'work email', sourceIcon: 'mail' },
      { label: 'Shipped 0 to 1 consumer product', source: 'linked URL', sourceIcon: 'link' },
      { label: 'Writes a 12k-sub product blog', source: 'linked URL', sourceIcon: 'link' },
    ],
    vouch: {
      quote: 'Has the rare instinct for what to build next.',
      by: 'former director',
      more: 1,
    },
    track: { reply: '15 min', showed: '3 / 3', onsite: '1' },
    declared: ['0 to 1 product', 'Series A', '$195-215k', 'Remote'],
    liveLine: 'Big tech is comfortable but I miss owning the whole thing.',
    bookSlot: 'Fri 1:00 PM',
  },
]

export const openMomentsCount = candidates.length
export const atsBacklog = 847
