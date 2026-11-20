export const walkthrough = [
  { screen: 'push', start: 0, transition: 0, motion: 'open' },
  { screen: 'board', start: .11, transition: .075, motion: 'open' },
  { screen: 'brief', start: .29, transition: .08, motion: 'drill' },
  { screen: 'golive', start: .47, transition: .08, motion: 'commit' },
  { screen: 'live', start: .62, transition: .075, motion: 'connect' },
  { screen: 'booked', start: .86, transition: .075, motion: 'complete' },
] as const

export type WalkthroughScreen = typeof walkthrough[number]['screen']

export function easeRange(progress: number, start: number, end: number, reduced: boolean) {
  const p = Math.min(1, Math.max(0, (progress - start) / (end - start)))
  return reduced ? Number(p >= .5) : p * p * (3 - 2 * p)
}
