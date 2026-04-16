This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Changelog — Deck Restructure (v2)

### What was removed

| Removed | Why |
|---|---|
| Pitch framing and adoption ask | Wrong for a teaching session — creates resistance instead of understanding |
| Roadmap / integration slide | Forward-looking content confuses audiences who don't yet understand the present state |
| Pros/cons framing | Implies a sales comparison; this session has no competing option |
| Infrastructure details | Non-technical audience doesn't need the stack — they need the concept |
| "Value" slide as a standalone | Collapsed into the Definition slide where the business case is more natural |

### What was added

| Added | Slide | Why |
|---|---|---|
| **"What is a Skill"** | S4 | The single most important concept for a non-technical audience. Without it, the demos look like magic instead of a reusable system. The Word template analogy grounds it immediately. |
| **meeting-summary preview** | S10 | Adds a third skill to show breadth without requiring a third live demo. Messy-notes-to-structured-output is instantly relatable for every role in the room. |
| **reply-drafter preview** | S11 | The #1 real-world AI use case. Including it as a named skill makes the point that consistency across a team is the actual unlock — not just the individual convenience. |
| **Act labels on every slide** | All | Gives the audience a map. When they know they're in "Act 2 — See It Work," they have the right frame for what's coming. |
| **Anchor phrase repeated** | S1, S3, S5, S11, S12 | Repetition is how non-technical audiences retain the core idea. One phrase, five appearances, same words every time. |

### Why the new structure teaches better

The original deck moved from problem → features → demos → roadmap. That's a sales arc. It assumes the audience is evaluating whether to buy in.

The new deck moves from problem → concept → mechanism → examples → breadth. That's a teaching arc. It builds understanding progressively so that by the time the demos run, the audience already has the mental model to interpret what they're seeing.

The "What is a Skill" slide (S4) is the key addition. Without it, the demos feel like a magic trick — impressive but not transferable. With it, the audience leaves knowing that skills are the reusable layer, and that anyone on the team can eventually use them.

The closing (S12) has no adoption ask by design. An audience that understands something will ask "how do we get this?" on their own. An audience that was pitched something will need to be convinced. This deck bets on the former.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
