import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PhoneFrame } from './components/PhoneFrame'
import { PathlineMark } from './components/PathlineMark'
import { PushScreen } from './screens/PushScreen'
import { WorkbenchIntro } from './screens/WorkbenchIntro'
import { BoardScreen } from './screens/BoardScreen'
import { BriefScreen } from './screens/BriefScreen'
import { GoLiveScreen } from './screens/GoLiveScreen'
import { LiveScreen } from './screens/LiveScreen'
import { BookedScreen } from './screens/BookedScreen'
import { StyleGuide } from './StyleGuide'
import { candidates, type Candidate } from './data'
import {
  screenMotionTransitions,
  screenStackVariants,
  type ScreenMotion,
} from './lib/motion'

type Screen = 'push' | 'board' | 'brief' | 'golive' | 'live' | 'booked'

const screenOrder: Record<Screen, number> = {
  push: 0,
  board: 1,
  brief: 2,
  golive: 3,
  live: 4,
  booked: 5,
}

/**
 * The deck embeds the real prototype via <iframe src="/?embed=1">, so the slide
 * shows this exact app rather than a hand-drawn copy. `embed` strips the page
 * chrome down to the bare phone; `screen` deep-links the starting screen.
 */
const params = new URLSearchParams(window.location.search)
const isEmbed = params.has('embed')
const isStyle = params.has('style')
const isWorkbench = params.has('workbench') && window.parent !== window
const workbenchOrigin = document.referrer ? new URL(document.referrer).origin : ''
const allowedWorkbench = new Set([
  'https://workbench-henna.vercel.app', 'http://localhost:4173', 'http://127.0.0.1:4173',
])
const initialScreen: Screen =
  params.get('screen') && params.get('screen')! in screenOrder
    ? (params.get('screen') as Screen)
    : 'push'

export default function App() {
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [direction, setDirection] = useState(1)
  const [screenMotion, setScreenMotion] = useState<ScreenMotion>('open')
  const [selected, setSelected] = useState<Candidate>(candidates[0])
  const [intro, setIntro] = useState({ progress: 0, reduced: false })
  const guided = isWorkbench && allowedWorkbench.has(workbenchOrigin)

  useEffect(() => {
    if (!guided) return
    function onMessage(event: MessageEvent) {
      if (event.source !== window.parent || event.origin !== workbenchOrigin) return
      const data = event.data
      if (data?.type !== 'workbench:pathline:intro' || !Number.isFinite(data.progress)) return
      setIntro({ progress: Math.max(0, Math.min(1, data.progress)), reduced: data.reduced === true })
      if (data.progress <= .64) {
        setDirection(-1)
        setScreenMotion('reset')
        setScreen('push')
      }
    }
    function onWheel(event: WheelEvent) {
      if (event.defaultPrevented || event.ctrlKey || event.deltaY >= 0) return
      const scrollArea = event.target instanceof Element ? event.target.closest('.overflow-y-auto') : null
      if (scrollArea && scrollArea.scrollTop > 0) return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
      window.parent.postMessage({ type: 'workbench:pathline:scroll', delta: event.deltaY * unit }, workbenchOrigin)
    }
    window.addEventListener('message', onMessage)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.parent.postMessage({ type: 'workbench:pathline:ready' }, workbenchOrigin)
    return () => {
      window.removeEventListener('message', onMessage)
      window.removeEventListener('wheel', onWheel)
    }
  }, [guided])

  // Let the phone sit flush on the deck's dark glass — no app page background.
  useEffect(() => {
    if (!isEmbed) return
    document.documentElement.classList.add('pl-embed')
    return () => document.documentElement.classList.remove('pl-embed')
  }, [])

  function motionFor(nextScreen: Screen): ScreenMotion {
    if (screen === 'push' && nextScreen === 'board') return 'open'
    if (screen === 'board' && nextScreen === 'brief') return 'drill'
    if (screen === 'brief' && nextScreen === 'board') return 'return'
    if (screen === 'brief' && nextScreen === 'golive') return 'commit'
    if (screen === 'golive' && nextScreen === 'brief') return 'return'
    if (screen === 'golive' && nextScreen === 'live') return 'connect'
    if (screen === 'live' && nextScreen === 'booked') return 'complete'
    if (nextScreen === 'push') return 'reset'
    return screenOrder[nextScreen] >= screenOrder[screen] ? 'drill' : 'return'
  }

  function go(nextScreen: Screen) {
    setDirection(screenOrder[nextScreen] >= screenOrder[screen] ? 1 : -1)
    setScreenMotion(motionFor(nextScreen))
    setScreen(nextScreen)
  }

  const screens = (
      <AnimatePresence initial={false} custom={{ direction, motion: screenMotion }}>
        <motion.div
          key={screen}
          custom={{ direction, motion: screenMotion }}
          variants={screenStackVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ ...screenMotionTransitions[screenMotion], zIndex: { duration: 0 } }}
          className={`absolute inset-0 flex min-h-0 flex-col shadow-[-12px_0_26px_rgba(0,0,0,0.2)] ${
            screen === 'live' ? 'bg-night' : 'pl-phone-surface'
          }`}
        >
          {screen === 'push' && <PushScreen onOpen={() => go('board')} />}
            {screen === 'board' && (
              <BoardScreen
                onSelect={(c) => {
                  setSelected(c)
                  go('brief')
                }}
              />
            )}
            {screen === 'brief' && (
              <BriefScreen
                c={selected}
                onBack={() => go('board')}
                onStart={() => go('golive')}
              />
            )}
            {screen === 'golive' && (
              <GoLiveScreen
                c={selected}
                onStart={() => go('live')}
                onBack={() => go('brief')}
              />
            )}
            {screen === 'live' && (
              <LiveScreen
                c={selected}
                onBook={() => go('booked')}
                onEnd={() => go('board')}
              />
            )}
            {screen === 'booked' && (
              <BookedScreen
                c={selected}
                onRestart={() => {
                  setSelected(candidates[0])
                  go('push')
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
  )

  const phone = (
    <PhoneFrame tone={screen === 'live' ? 'dark' : 'light'}>
      {guided ? <WorkbenchIntro {...intro}>{screens}</WorkbenchIntro> : screens}
    </PhoneFrame>
  )

  if (isStyle) {
    return <StyleGuide />
  }

  if (isEmbed) {
    return <div className="flex min-h-full items-center justify-center">{phone}</div>
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-7 px-4 py-10">
      <nav aria-label="Switch view" className="pl-glass-pill fixed top-5 right-5 z-30 flex items-center gap-1 rounded-[10px] p-1 text-caption font-medium">
        <span className="rounded-[7px] bg-live-200/15 px-3 py-1.5 text-live-700">App</span>
        <a className="rounded-[7px] px-3 py-1.5 text-ink-3 transition hover:text-ink" href="/deck.html">
          Deck
        </a>
        <a className="rounded-[7px] px-3 py-1.5 text-ink-3 transition hover:text-ink" href="/?style">
          Style
        </a>
      </nav>

      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          <PathlineMark size="header" />
          <span className="font-serif text-[20px] font-medium text-ink">Pathline</span>
        </div>
        <div className="text-label text-ink-3">
          Recruiter demo
        </div>
      </div>

      {phone}
    </div>
  )
}
