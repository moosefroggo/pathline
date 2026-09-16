# Pathline

Pathline is a clickable iPhone prototype for recruiters. It shows candidates who have opted in to a live conversation, lets the recruiter review a short brief, and then starts a call.

[Try the prototype](https://nectar-social-prototype.vercel.app)

I made this as a take-home project while interviewing for a Staff Product Designer role at Nectar Social. I worked on the product idea, flow, design, and frontend.

## The idea

Recruiters often work through long lists of applications and cold messages. I wanted to explore a smaller, more direct flow: show a few people who are available now and let both sides agree to talk.

## What the prototype shows

1. A notification tells the recruiter that a candidate is available for a role.
2. A board shows a few open conversations, with time left and basic activity signals.
3. A short brief shows the candidate's work history, links, and stated interests. It labels where each detail came from.
4. The recruiter can start an audio-first conversation when both people agree.
5. The candidate's name and photo appear once the conversation starts.
6. The recruiter can book a longer follow-up call.

The flow runs inside an iPhone frame. It includes countdowns, call controls, and a replay option.

## Design choices

- **Show availability:** The board focuses on people who have opened a window to talk, not a large list of search results.
- **Show sources:** The brief labels which details come from a work email, GitHub, a portfolio link, or the candidate.
- **Ask for consent:** A recruiter can only start a conversation with someone who has opted in.
- **Delay the identity reveal:** The candidate's name and photo stay hidden until both sides start the conversation.

I recorded the tradeoffs in [DECISIONS.md](DECISIONS.md) and the longer design process in [DESIGN-JOURNAL.md](DESIGN-JOURNAL.md).

## What is mocked

This is a frontend prototype. Candidates, availability, verification labels, and the call are mocked. There is no backend, real matching, login, or WebRTC call. A live conversation alone would not prove someone's identity. The risks and possible checks are discussed in [THREAT-MODEL.md](THREAT-MODEL.md).

## Stack

React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Tabler icons.

## Run locally

```bash
npm install
npm run dev
```

To check the build:

```bash
npm run build
```

Start on the lock screen and tap the notification to go through the demo.
