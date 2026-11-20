export const walkthrough = [
  { screen: 'push', start: 0, transition: 0, motion: 'open' },
  { screen: 'board', start: .11, transition: .055, motion: 'open' },
  { screen: 'brief', start: .29, transition: .055, motion: 'drill' },
  { screen: 'golive', start: .48, transition: .055, motion: 'commit' },
  { screen: 'live', start: .63, transition: .045, motion: 'connect' },
  { screen: 'booked', start: .85, transition: .055, motion: 'complete' },
] as const

export type WalkthroughScreen = typeof walkthrough[number]['screen']
