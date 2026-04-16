"use client";

import { useRef, useState } from "react";
import { motion, useInView, type TargetAndTransition, Variants } from "framer-motion";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-provider";

const slideDate = "April 16, 2026, 10-11 PM PH Time";

// ─── Types ────────────────────────────────────────────────────────────────────

type VisualKind =
  | "title"
  | "personal-intro"
  | "problem"
  | "definition"
  | "skill-intro"
  | "flow"
  | "usecase-email"
  | "test-email"
  | "usecase-insight"
  | "test-insight"
  | "meeting-summary"
  | "reply-drafter"
  | "send-email"
  | "tradeoffs"
  | "closing";

type Slide = {
  number: string;
  act: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  insight: string;
  label: string;
  visual: VisualKind;
};

// ─── Slide content ────────────────────────────────────────────────────────────

const slides: Slide[] = [
  // ── ACT 1: UNDERSTAND ──────────────────────────────────────────────────────
  {
    number: "01",
    act: "Act 1 — Understand",
    title: "OpenClaw: The AI That Actually Does Things",
    bullets: [
      "AI that goes beyond answering",
      "Automates real workflows using reusable skills",
      "Built for sales, operations, and development teams",
      `Internal training session · ${slideDate}`,
    ],
    insight: "It takes action, not just gives answers.",
    label: "Title",
    visual: "title",
  },
  {
    number: "02",
    act: "Act 1 — Understand",
    title: "Why I'm Sharing This",
    subtitle: "Hands-on, not theoretical",
    bullets: [
      "Attended OpenClaw events in the Philippines",
      "Spent the past few months setting it up and testing it",
      "Tried skills and workflows in real use cases",
      "What I'm showing tonight comes from direct experience",
    ],
    insight: "This is based on hands-on work, not just research.",
    label: "Personal Context",
    visual: "personal-intro",
  },
  {
    number: "03",
    act: "Act 1 — Understand",
    title: "The Problem",
    subtitle: "What the team deals with every day",
    bullets: [
      "Limited visibility into daily activity",
      "Hard to track consistency across teams",
      "Too many manual follow-ups",
      "Leaders cannot monitor everything",
      "Workflows stay fragmented across tools",
    ],
    insight: "Management breaks when signal is buried in noise.",
    label: "Problem",
    visual: "problem",
  },
  {
    number: "04",
    act: "Act 1 — Understand",
    title: "What is OpenClaw",
    bullets: [
      "Understands your request in plain language",
      "Coordinates the right workflow or skill",
      "Executes and returns a useful output",
      "The layer between 'I need this done' and 'it's done'",
      "Like a fast assistant that fills itself in — every time, consistently",
    ],
    insight: "It takes action, not just gives answers.",
    label: "Definition",
    visual: "definition",
  },
  {
    number: "05",
    act: "Act 1 — Understand",
    title: "What is a Skill",
    subtitle: "The real unlock",
    bullets: [
      "A skill is a saved recipe — write the instructions once",
      "Anyone on the team can run it by typing one line",
      "Like a Word template — except the template fills itself in",
      "Skills are named, reusable, and stackable",
    ],
    insight: "One skill replaces hours of repeated manual work — for the whole team.",
    label: "Skills",
    visual: "skill-intro",
  },
  {
    number: "06",
    act: "Act 1 — Understand",
    title: "How It Works",
    subtitle: "Request to result in seconds",
    bullets: [
      "You give it a request",
      "It understands what you mean",
      "It picks the right skill",
      "It gets the data it needs",
      "It gives you the result",
    ],
    insight: "It takes action, not just gives answers.",
    label: "Flow",
    visual: "flow",
  },

  // ── ACT 2: SEE IT WORK ─────────────────────────────────────────────────────
  {
    number: "07",
    act: "Act 2 — See It Work",
    title: "Skill: followup-email",
    subtitle: "For sales — meeting notes to polished email",
    bullets: [
      "Input: client wants chatbot",
      "Input: budget $5k–$10k, timeline 2 months",
      "Input: concern is website integration",
      "Output: subject line",
      "Output: email body, summary, and next steps",
    ],
    insight: "20 minutes of writing becomes 10 seconds of prompting.",
    label: "Skill 1 Setup",
    visual: "usecase-email",
  },
  {
    number: "08",
    act: "Act 2 — See It Work",
    title: "Live Demo 1",
    subtitle: "followup-email running live",
    bullets: [
      "Prompt: generate follow-up from meeting notes",
      "Client wants chatbot · Budget: $5k–$10k",
      "Timeline: 2 months · Concern: website integration",
      "Output: subject line, email body, next steps",
    ],
    insight: "This took seconds. Manual version was 15–20 minutes.",
    label: "Demo 1",
    visual: "test-email",
  },
  {
    number: "09",
    act: "Act 2 — See It Work",
    title: "Skill: team-activity-monitor",
    subtitle: "For ops and leadership — visibility without checking logs",
    bullets: [
      "Input: Ken 9AM–6PM",
      "Input: John 2PM–11PM · Anna 9AM–12PM",
      "Input: Mark — no activity",
      "Output: schedule patterns and operational risks",
      "Output: recommended actions",
    ],
    insight: "AI turns raw activity into management insight.",
    label: "Skill 2 Setup",
    visual: "usecase-insight",
  },
  {
    number: "10",
    act: "Act 2 — See It Work",
    title: "Live Demo 2",
    subtitle: "team-activity-monitor running live",
    bullets: [
      "Prompt: analyze this team activity",
      "Ken: 9AM–6PM · John: 2PM–11PM",
      "Anna: 9AM–12PM · Mark: no activity",
      "OpenClaw flags Mark as an operational risk",
      "Output: summary, patterns, recommended actions",
    ],
    insight: "One prompt. The alternative is checking logs or waiting for a weekly report.",
    label: "Demo 2",
    visual: "test-insight",
  },

  // ── ACT 3: SEE THE BREADTH ─────────────────────────────────────────────────
  {
    number: "11",
    act: "Act 3 — See the Breadth",
    title: "Skill: meeting-summary",
    subtitle: "Every team has meetings. Nobody likes writing summaries.",
    bullets: [
      "Input: raw messy bullet points from any meeting",
      "Output: TL;DR in 3 lines",
      "Output: decisions made",
      "Output: action items with owners",
      "Output: open questions",
    ],
    insight: "15 minutes manually. 10 seconds with this skill.",
    label: "Skill 3",
    visual: "meeting-summary",
  },
  {
    number: "12",
    act: "Act 3 — See the Breadth",
    title: "Skill: reply-drafter",
    subtitle: "The #1 thing people use AI for — made consistent across the team",
    bullets: [
      "Input: an email someone received",
      "Input: a short instruction (e.g., 'say yes but push the date')",
      "Output: a polished reply, ready to paste",
      "Replying is harder than writing fresh — this solves it",
      "Consistent tone and format across the whole team",
    ],
    insight: "It takes action, not just gives answers.",
    label: "Skill 4",
    visual: "reply-drafter",
  },
  {
    number: "13",
    act: "Act 3 — See the Breadth",
    title: "Bonus Demo — send-email",
    subtitle: "AI that takes action",
    bullets: [
      "Natural language prompt: 'Email Sarah confirming Wednesday kickoff'",
      "OpenClaw generates a ready-to-run PowerShell command",
      "Review step in terminal before send",
      "n8n validates the data and routes it to Gmail",
      "Email lands in the inbox in under 30 seconds",
    ],
    insight: "It takes action, not just gives answers.",
    label: "Live Action Demo",
    visual: "send-email",
  },
  {
    number: "14",
    act: "Act 3 — See the Breadth",
    title: "OpenClaw: Strengths and Tradeoffs",
    subtitle: "Useful, flexible, and real-world",
    bullets: [
      "Strength: more control with self-hosted deployment",
      "Strength: reusable skills tailored to team workflows",
      "Strength: consistent outputs and actions across the team",
      "Tradeoff: server, infrastructure, and maintenance cost",
      "Tradeoff: model or API usage still has a cost",
    ],
    insight: "Useful systems come with real tradeoffs.",
    label: "Balanced View",
    visual: "tradeoffs",
  },
  {
    number: "15",
    act: "Act 3 — See the Breadth",
    title: "That's OpenClaw",
    subtitle: "Three things to remember",
    bullets: [
      "1. It understands plain-English requests",
      "2. Skills are reusable recipes anyone on the team can use",
      "3. It takes action, not just gives answers",
      "And it connects to the tools you already use — Gmail, Slack, n8n, and more",
    ],
    insight: "Open Q&A — ask anything.",
    label: "Closing",
    visual: "closing",
  },
];

// ─── Motion variants ───────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const hoverLift: TargetAndTransition = {
  y: -6,
  scale: 1.015,
  transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
};

const hoverGlow: TargetAndTransition = {
  boxShadow: "0 18px 36px rgba(255,96,88,0.12)",
};

// ─── Shared primitives ────────────────────────────────────────────────────────

function OpenClawMark() {
  return (
    <div className="flex flex-col items-center gap-5">
      <motion.div
        className="relative h-20 w-20 rounded-full bg-[radial-gradient(circle_at_35%_30%,#ff7465_0%,#ff554c_48%,#cc2f36_100%)] shadow-[0_0_48px_rgba(255,84,76,0.35)]"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute left-4 top-7 h-2.5 w-2.5 rounded-full bg-[#081019]" />
        <span className="absolute right-4 top-7 h-2.5 w-2.5 rounded-full bg-[#081019]" />
        <span className="absolute left-6 top-[-4px] h-3 w-0.5 rotate-[-28deg] rounded-full bg-[#ff6a63]" />
        <span className="absolute right-6 top-[-4px] h-3 w-0.5 rotate-[28deg] rounded-full bg-[#ff6a63]" />
        <span className="absolute bottom-[-6px] left-7 h-3 w-1 rounded-full bg-[#cc2f36]" />
        <span className="absolute bottom-[-6px] right-7 h-3 w-1 rounded-full bg-[#cc2f36]" />
      </motion.div>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      >
        <h1 className="bg-[linear-gradient(90deg,#ff685e_0%,#fb5f5b_35%,#d0b39d_100%)] bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
          OpenClaw
        </h1>
      </motion.div>
    </div>
  );
}

function SlideBadge({
  label,
  number,
  act,
}: {
  label: string;
  number: string;
  act: string;
}) {
  return (
    <div className="space-y-2">
      <p
        className="text-xs font-semibold uppercase tracking-[0.22em]"
        style={{ color: "var(--accent)", opacity: 0.7 }}
      >
        {act}
      </p>
      <div className="flex items-center justify-between gap-3">
        <div
          className="inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]"
          style={{
            borderColor: "var(--card-border)",
            backgroundColor: "var(--pill-bg)",
            color: "var(--text-muted-strong)",
          }}
        >
          <span>{label}</span>
          <span style={{ color: "var(--text-faint)" }}>{number}</span>
        </div>
        <span
          className="text-xs font-medium uppercase tracking-[0.18em]"
          style={{ color: "var(--text-faintest)" }}
        >
          Internal Training
        </span>
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={popIn}
      className="rounded-full border px-4 py-2 text-sm"
      style={{
        borderColor: "var(--card-border)",
        backgroundColor: "var(--pill-bg)",
        color: "var(--text-muted-strong)",
      }}
    >
      {children}
    </motion.div>
  );
}

function QuoteCard({ name, text }: { name: string; text: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border p-4"
      style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffe1d6,#ff8f7f)] text-sm font-semibold text-[#0a101b]">
          {name.slice(0, 2)}
        </div>
        <div>
          <p className="text-sm leading-6" style={{ color: "var(--text-muted-strong)" }}>
            {text}
          </p>
          <p className="mt-2 text-sm font-semibold" style={{ color: "var(--accent)" }}>
            @{name}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StoryBar({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.18em]"
        style={{ color: "var(--text-faint)" }}
      >
        {title}
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <motion.div key={item} variants={fadeUp} custom={index * 0.08}>
            <div
              className="flex items-center justify-between text-sm"
              style={{ color: "var(--text-muted-strong)" }}
            >
              <span>{item}</span>
              <span>{70 + index * 7}%</span>
            </div>
            <div
              className="mt-2 h-2 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--card-border)" }}
            >
              <div
                className="animate-progress rounded-full bg-[linear-gradient(90deg,#ff6259,#d1b19a)]"
                style={{ width: `${70 + index * 7}%`, animationDelay: `${index * 0.4}s` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PulseNode({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <motion.div
      variants={popIn}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl border px-4 py-4"
      style={
        active
          ? {
              borderColor: "rgba(255,96,88,0.3)",
              background:
                "linear-gradient(180deg,rgba(255,101,90,0.12),rgba(255,101,90,0.03))",
            }
          : { borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }
      }
    >
      <div
        className={`mb-4 h-2.5 w-2.5 rounded-full ${active ? "animate-soft-pulse bg-[#ff6058]" : ""}`}
        style={!active ? { backgroundColor: "var(--muted)", opacity: 0.4 } : {}}
      />
      <p className="text-lg font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
        {label}
      </p>
    </motion.div>
  );
}

function FlowLane({ nodes }: { nodes: string[] }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative rounded-3xl border p-5"
      style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
    >
      <div className="flow-line absolute left-7 right-7 top-[38px] hidden h-px bg-[linear-gradient(90deg,rgba(255,96,88,0.2),rgba(255,96,88,0.7),rgba(255,96,88,0.2))] xl:block" />
      <div className="flow-dot absolute top-[32px] hidden h-3 w-3 rounded-full bg-[#ff6058] shadow-[0_0_18px_rgba(255,96,88,0.8)] xl:block" />
      <motion.div
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {nodes.map((node, index) => (
          <PulseNode key={node} label={node} active={index === 1 || index === 3} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function TerminalCard({
  title,
  lines,
  accent = "default",
}: {
  title: string;
  lines: string[];
  accent?: "default" | "warm";
}) {
  return (
    <motion.div
      variants={popIn}
      className="rounded-2xl border p-5"
      style={
        accent === "warm"
          ? {
              borderColor: "rgba(255,96,88,0.16)",
              background: "linear-gradient(180deg,rgba(255,101,90,0.08),rgba(255,101,90,0.02))",
            }
          : { borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }
      }
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6058]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffb36f]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6be3c1]" />
      </div>
      <p
        className="text-sm font-semibold uppercase tracking-[0.18em]"
        style={{ color: accent === "warm" ? "#ff978f" : "var(--text-faint)" }}
      >
        {title}
      </p>
      <motion.div
        className="mt-4 space-y-2 text-sm leading-6"
        style={{ color: "var(--text-body)" }}
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {lines.map((line, index) => (
          <motion.p key={`${line}-${index}`} variants={fadeUp} custom={index * 0.06}>
            {line}
          </motion.p>
        ))}
      </motion.div>
    </motion.div>
  );
}

function SkillCard({ name, desc }: { name: string; desc: string }) {
  return (
    <motion.div
      variants={popIn}
      whileHover={{ ...hoverLift, ...hoverGlow }}
      className="rounded-2xl border p-5"
      style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff6058]" />
        <code
          className="text-xs font-semibold tracking-tight"
          style={{ color: "var(--accent)", fontFamily: "var(--font-geist-mono)" }}
        >
          {name}
        </code>
      </div>
      <p className="text-sm leading-6" style={{ color: "var(--text-muted-strong)" }}>
        {desc}
      </p>
    </motion.div>
  );
}

function SendEmailPanel() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      num: "1",
      title: "Natural language prompt",
      body: '"Email Sarah confirming Wednesday kickoff"',
    },
    {
      num: "2",
      title: "OpenClaw skill",
      body: "PowerShell preview\nsend-email.ps1\n-to sarah@...\n-subject 'Wednesday kickoff'",
    },
    {
      num: "3",
      title: "Review + send",
      body: "Terminal review\nProceed with send? [y/n]\n> y",
    },
    {
      num: "4",
      title: "Inbox result",
      body: "Gmail notification\nTo: Sarah\nSubject: Wednesday kickoff confirmed",
    },
  ];

  const systems = [
    {
      name: "OpenClaw",
      desc: "Understands the request, drafts the email, produces a ready-to-run command.",
    },
    {
      name: "n8n",
      desc: "Takes the command, validates the data, connects to Gmail.",
    },
    {
      name: "Gmail",
      desc: "Sends the actual email. Your account, your voice, your control.",
    },
  ];

  const activeSystem = [0, 0, 1, 2][activeStep];

  return (
    <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
      <motion.div className="grid gap-3 xl:grid-cols-[repeat(4,minmax(0,1fr))]" variants={stagger}>
        {steps.map(({ num, title, body }, index) => (
          <motion.div
            key={num}
            variants={popIn}
            whileHover={{ ...hoverLift, ...hoverGlow }}
            onHoverStart={() => setActiveStep(index)}
            onHoverEnd={() => setActiveStep(0)}
            className="relative rounded-2xl border p-4"
            style={{
              borderColor: index === activeStep ? "rgba(255,96,88,0.36)" : "var(--card-border)",
              backgroundColor: index === activeStep ? "rgba(255,101,90,0.10)" : "var(--card-bg)",
              boxShadow: index === activeStep ? "0 18px 40px rgba(255,96,88,0.14)" : "none",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  background: index === activeStep ? "rgba(255,96,88,0.24)" : "rgba(255,96,88,0.12)",
                  color: "var(--accent)",
                }}
              >
                {num}
              </span>
              {index < steps.length - 1 ? (
                <span
                  className="text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: index === activeStep ? "var(--accent)" : "var(--text-faint)" }}
                >
                  Next
                </span>
              ) : null}
            </div>
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {title}
            </p>
            <pre
              className="mt-3 whitespace-pre-wrap rounded-xl border px-3 py-3 text-xs leading-5"
              style={{
                borderColor: index === activeStep ? "rgba(255,96,88,0.24)" : "rgba(255,96,88,0.14)",
                background: index === activeStep ? "rgba(17,24,39,0.44)" : "rgba(17,24,39,0.32)",
                color: "var(--text-muted-strong)",
              }}
            >
              {body}
            </pre>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="grid gap-3 md:grid-cols-3" variants={stagger}>
        {systems.map(({ name, desc }, index) => (
          <motion.div
            key={name}
            variants={fadeUp}
            whileHover={{ ...hoverLift, ...hoverGlow }}
            className="rounded-2xl border px-5 py-4"
            style={{
              borderColor: index === activeSystem ? "rgba(255,96,88,0.32)" : "var(--card-border)",
              backgroundColor: index === activeSystem ? "rgba(255,101,90,0.08)" : "var(--card-bg)",
              boxShadow: index === activeSystem ? "0 18px 36px rgba(255,96,88,0.10)" : "none",
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
              {name}
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-muted-strong)" }}>
              {desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="rounded-2xl border px-5 py-4"
        style={{ borderColor: "rgba(255,96,88,0.14)", background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))" }}
      >
        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
          From prompt to inbox in under 30 seconds —
          <span style={{ color: "var(--accent)" }}> with a review step in the middle.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Visual panels ────────────────────────────────────────────────────────────

function VisualPanel({ visual }: { visual: VisualKind }) {
  // S1 — Title
  if (visual === "title") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-8">
        <div className="animate-float">
          <OpenClawMark />
        </div>
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.28em] sm:text-base"
          style={{ color: "var(--accent)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          It takes action, not just gives answers.
        </motion.p>
        <motion.p
          className="mx-auto max-w-xl text-center text-base leading-7 sm:text-lg"
          style={{ color: "var(--text-faint)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          A walkthrough of practical skills for sales, operations, and development teams.
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {["Sales workflows", "Operations support", "Development tasks"].map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </motion.div>
        <motion.div
          className="w-full max-w-2xl rounded-full border px-4 py-3 text-sm"
          style={{
            borderColor: "var(--card-border)",
            backgroundColor: "var(--card-bg)",
            color: "var(--text-muted-strong)",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="mr-3 rounded-full bg-[#ff5c54] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Session
          </span>
          No adoption ask. No roadmap. Just understanding.
        </motion.div>
      </div>
    );
  }

  // S2 — Problem
  if (visual === "personal-intro") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]"
        >
          <motion.div
            className="rounded-3xl border p-5"
            style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
            whileHover={{ ...hoverLift, ...hoverGlow }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
              Why this matters to me
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
              I&apos;ve seen OpenClaw in person and spent the past few months trying it hands-on.
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Attended OpenClaw events in the Philippines",
                "Set it up and explored how the workflows work",
                "Tested skills over the past few months",
                "Built understanding from direct use, not just reading",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  custom={index * 0.08}
                  className="rounded-xl border px-4 py-3"
                  style={{ borderColor: "rgba(255,96,88,0.14)", background: "rgba(255,96,88,0.05)" }}
                >
                  <p className="text-sm font-medium leading-6" style={{ color: "var(--foreground)" }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" variants={stagger}>
            {[
              { src: "/e1.jpg", label: "OpenClaw event" },
              { src: "/e2.jpg", label: "Community session" },
              { src: "/e3.jpg", label: "Hands-on setup" },
            ].map(({ src, label }) => (
              <motion.div
                key={src}
                variants={popIn}
                whileHover={{ ...hoverLift, ...hoverGlow }}
                className="relative min-h-[118px] overflow-hidden rounded-2xl border"
                style={{
                  borderColor: "rgba(255,96,88,0.22)",
                }}
              >
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg,rgba(5,9,16,0.08),rgba(5,9,16,0.56))" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: "#ffd5d1" }}>
                    Direct Experience
                  </p>
                  <p className="mt-1 text-sm font-medium" style={{ color: "white" }}>
                    {label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(255,96,88,0.14)", background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            What I&apos;m showing tonight comes from direct experience,
            <span style={{ color: "var(--accent)" }}> not just theory or secondhand research.</span>
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // S3 — Problem
  if (visual === "problem") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            The signal problem
          </p>
          <p className="mt-4 text-3xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
            Teams lose clarity when work is scattered across too many places.
          </p>
        </motion.div>
        <StoryBar
          title="Common friction points"
          items={["Manual follow-ups", "Fragmented tools", "Inconsistent execution", "Low visibility"]}
        />
        <motion.div className="grid gap-4 sm:grid-cols-3" variants={stagger}>
          <QuoteCard name="opslead" text="Too many updates, not enough clear signals." />
          <QuoteCard name="salesmgr" text="Follow-ups are easy to miss when the team is busy." />
          <QuoteCard name="englead" text="Context lives in too many tools to act quickly." />
        </motion.div>
      </motion.div>
    );
  }

  // S3 — Definition
  if (visual === "definition") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Central layer
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              variants={popIn}
              className="animate-float rounded-2xl border p-5"
              style={{
                borderColor: "rgba(255,96,88,0.16)",
                background: "linear-gradient(180deg,rgba(255,101,90,0.08),rgba(255,101,90,0.02))",
              }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ff978f]">
                OpenClaw
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
                Understands
                <br />Coordinates
                <br />Executes
              </p>
            </motion.div>
            <motion.div className="grid gap-3" variants={stagger}>
              {["Requests", "Workflows", "Skills", "Outputs"].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  className="rounded-2xl border p-4 text-lg font-semibold tracking-tight"
                  style={{
                    borderColor: "var(--card-border)",
                    backgroundColor: "var(--card-bg)",
                    color: "var(--foreground)",
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        {/* Taglines */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{
            borderColor: "rgba(255,96,88,0.14)",
            background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))",
          }}
        >
          <p className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
            &ldquo;The layer between{" "}
            <span style={{ color: "var(--accent)" }}>&lsquo;I need this done&rsquo;</span> and{" "}
            <span style={{ color: "var(--accent)" }}>&lsquo;it&rsquo;s done.&rsquo;</span>&rdquo;
          </p>
          <p className="mt-2 text-sm leading-6" style={{ color: "var(--text-muted-strong)" }}>
            Like a really fast assistant that reads your instructions and produces the output you
            need — in seconds, in a consistent format, every time.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // S4 — Skill intro
  if (visual === "skill-intro") {
    const skills = [
      { name: "followup-email", desc: "Turns meeting notes into a polished follow-up email" },
      { name: "team-activity-monitor", desc: "Analyzes team activity and surfaces risks and patterns" },
      { name: "meeting-summary", desc: "Converts raw notes into structured meeting records" },
    ];
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Think of it this way
          </p>
          <p className="mt-3 text-2xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
            Like a Word template —<br />
            <span style={{ color: "var(--accent)" }}>except the template fills itself in.</span>
          </p>
        </motion.div>
        <motion.div className="grid gap-3 sm:grid-cols-3" variants={stagger}>
          {skills.map((s) => (
            <SkillCard key={s.name} name={s.name} desc={s.desc} />
          ))}
        </motion.div>
        <motion.div className="flex flex-wrap gap-3" variants={stagger}>
          {["Named", "Reusable", "Stackable"].map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  // S5 — Flow
  if (visual === "flow") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <FlowLane nodes={["User", "Intent", "Skill", "Data", "Action"]} />
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(255,96,88,0.14)", background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))" }}
        >
          <p className="text-sm leading-6" style={{ color: "var(--text-muted-strong)" }}>
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>
              It takes action, not just gives answers.
            </span>{" "}
            Every step from request to result happens inside OpenClaw.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // S6 — followup-email setup
  if (visual === "usecase-email") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Input → Output
          </p>
          <motion.div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" variants={stagger}>
            <TerminalCard
              title="Source notes"
              lines={[
                "Client wants chatbot",
                "Budget: $5k–$10k",
                "Timeline: 2 months",
                "Concern: website integration",
              ]}
            />
            <TerminalCard
              title="Generated"
              accent="warm"
              lines={[
                "Subject line",
                "Follow-up email body",
                "Summary",
                "Next steps",
              ]}
            />
          </motion.div>
        </motion.div>
        <FlowLane nodes={["Meeting notes", "Prompt", "Draft", "Review", "Send"]} />
      </motion.div>
    );
  }

  // S7 — followup-email live demo
  if (visual === "test-email") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Live prompt
          </p>
          <motion.div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" variants={stagger}>
            <TerminalCard
              title="Prompt input"
              lines={[
                "Generate follow-up from meeting notes:",
                "Client wants chatbot",
                "Budget: $5k–$10k · Timeline: 2 months",
                "Concern: website integration",
              ]}
            />
            <TerminalCard
              title="Output"
              accent="warm"
              lines={[
                "Subject line",
                "Follow-up email body",
                "Summary",
                "Next steps",
              ]}
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(255,96,88,0.14)", background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            This took seconds.{" "}
            <span style={{ color: "var(--accent)" }}>Manual version was 15–20 minutes.</span>
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // S8 — team-activity-monitor setup
  if (visual === "usecase-insight") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Activity → Insight
          </p>
          <motion.div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" variants={stagger}>
            <TerminalCard
              title="Raw activity"
              lines={[
                "Ken: 9AM–6PM",
                "John: 2PM–11PM",
                "Anna: 9AM–12PM",
                "Mark: no activity",
              ]}
            />
            <TerminalCard
              title="Insight"
              accent="warm"
              lines={[
                "Schedule patterns",
                "Inactive members flagged",
                "Operational risks",
                "Recommended actions",
              ]}
            />
          </motion.div>
        </motion.div>
        <StoryBar
          title="Output confidence areas"
          items={["Schedule consistency", "Inactive members", "Risk signals", "Action advice"]}
        />
      </motion.div>
    );
  }

  // S9 — team-activity-monitor live demo
  if (visual === "test-insight") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Live prompt
          </p>
          <motion.div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" variants={stagger}>
            <TerminalCard
              title="Prompt input"
              lines={[
                "Analyze this team activity:",
                "Ken: 9AM–6PM · John: 2PM–11PM",
                "Anna: 9AM–12PM · Mark: no activity",
              ]}
            />
            <TerminalCard
              title="Output"
              accent="warm"
              lines={[
                "Summary",
                "Patterns detected",
                "Mark flagged — no activity",
                "Recommended actions",
              ]}
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(255,96,88,0.14)", background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            One prompt.{" "}
            <span style={{ color: "var(--accent)" }}>
              The alternative is checking logs or waiting for a weekly report.
            </span>
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // S10 — meeting-summary
  if (visual === "meeting-summary") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Messy notes → Clean record
          </p>
          <motion.div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" variants={stagger}>
            <TerminalCard
              title="Raw input"
              lines={[
                "— ken mentioned launch delay",
                "— anna thinks scope too big",
                "— john will check budget",
                "— maybe push to Q3?? not sure",
                "— action: someone talk to client",
              ]}
            />
            <TerminalCard
              title="Output"
              accent="warm"
              lines={[
                "TL;DR: Launch pushed to Q3 pending scope review",
                "Decision: Budget check before proceeding",
                "Action: John → budget review by Friday",
                "Open: Client comms owner TBD",
              ]}
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(255,96,88,0.14)", background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            15 minutes manually.{" "}
            <span style={{ color: "var(--accent)" }}>10 seconds with this skill.</span>
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // S11 — reply-drafter
  if (visual === "reply-drafter") {
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            Email + instruction → polished reply
          </p>
          <motion.div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" variants={stagger}>
            <TerminalCard
              title="Input"
              lines={[
                "Email received:",
                "'Can we meet Thursday at 2PM to review the proposal?'",
                "",
                "Instruction:",
                "say yes but push the date to next week",
              ]}
            />
            <TerminalCard
              title="Reply"
              accent="warm"
              lines={[
                "Hi [Name],",
                "Thanks for reaching out! Thursday works in principle — I'd like to push to next week to give both sides more time.",
                "Would any slot next week work for you?",
                "Best, [Your name]",
              ]}
            />
          </motion.div>
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(255,96,88,0.14)", background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Consistent replies across the whole team —{" "}
            <span style={{ color: "var(--accent)" }}>one instruction, one skill.</span>
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // S12 — send-email
  if (visual === "send-email") {
    return <SendEmailPanel />;
  }

  // S13 — strengths and tradeoffs
  if (visual === "tradeoffs") {
    const strengths = [
      "More control with self-hosted setup",
      "Reusable skills matched to team workflows",
      "Consistent outputs across the team",
      "Can connect to real tools and real actions",
    ];
    const tradeoffs = [
      "Server and infrastructure cost",
      "Model or API usage cost",
      "Setup and maintenance effort",
      "Results depend on how well skills are written",
    ];

    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div className="grid gap-4 lg:grid-cols-2" variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border p-5"
            whileHover={{ ...hoverLift, boxShadow: "0 18px 36px rgba(78,216,154,0.10)" }}
            style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
              Strengths
            </p>
            <div className="mt-4 space-y-3">
              {strengths.map((item, index) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  custom={index * 0.08}
                  whileHover={{ x: 6, transition: { duration: 0.16 } }}
                  className="rounded-xl border px-4 py-3"
                  style={{ borderColor: "rgba(78,216,154,0.14)", background: "rgba(78,216,154,0.05)" }}
                >
                  <p className="text-sm font-medium leading-6" style={{ color: "var(--foreground)" }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border p-5"
            whileHover={{ ...hoverLift, boxShadow: "0 18px 36px rgba(255,176,92,0.10)" }}
            style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
              Tradeoffs
            </p>
            <div className="mt-4 space-y-3">
              {tradeoffs.map((item, index) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  custom={index * 0.08}
                  whileHover={{ x: 6, transition: { duration: 0.16 } }}
                  className="rounded-xl border px-4 py-3"
                  style={{ borderColor: "rgba(255,176,92,0.14)", background: "rgba(255,176,92,0.05)" }}
                >
                  <p className="text-sm font-medium leading-6" style={{ color: "var(--foreground)" }}>
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "rgba(255,96,88,0.14)", background: "linear-gradient(180deg,rgba(255,101,90,0.06),rgba(255,101,90,0.02))" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            Strong systems are not magic.
            <span style={{ color: "var(--accent)" }}> They create value, and they come with operating cost.</span>
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // S14 — Closing
  if (visual === "closing") {
    const points = [
      { num: "1", text: "It understands plain-English requests" },
      { num: "2", text: "Skills are reusable recipes anyone on the team can use" },
      { num: "3", text: "It takes action, not just gives answers" },
    ];
    const tools = ["Gmail", "Slack", "n8n", "Google Drive", "Internal systems", "And more"];
    return (
      <motion.div className="grid h-full gap-4" variants={stagger} initial="hidden" animate="visible">
        <motion.div className="grid gap-3 sm:grid-cols-3" variants={stagger}>
          {points.map(({ num, text }) => (
            <motion.div
              key={num}
              variants={popIn}
              whileHover={{ ...hoverLift, ...hoverGlow }}
              className="rounded-2xl border p-6"
              style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
            >
              <p
                className="text-5xl font-bold"
                style={{ color: "var(--accent)", opacity: 0.25 }}
              >
                {num}
              </p>
              <p
                className="mt-4 text-lg font-semibold tracking-tight"
                style={{ color: "var(--foreground)" }}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Integration tools strip */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "var(--card-border)", backgroundColor: "var(--card-bg)" }}
        >
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--text-faint)" }}
          >
            Connects to
          </p>
          <motion.div className="flex flex-wrap gap-2" variants={stagger}>
            {tools.map((tool) => (
              <motion.span
                key={tool}
                variants={popIn}
                whileHover={{ y: -3, scale: 1.04, transition: { duration: 0.15 } }}
                className="rounded-full border px-3 py-1 text-sm font-medium"
                style={{
                  borderColor: "rgba(255,96,88,0.2)",
                  background: "rgba(255,96,88,0.06)",
                  color: "var(--text-muted-strong)",
                }}
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="rounded-3xl border p-5 text-center"
          style={{
            borderColor: "rgba(255,96,88,0.2)",
            background: "linear-gradient(180deg,rgba(255,101,90,0.1),rgba(255,101,90,0.03))",
          }}
        >
          <p
            className="text-xl font-semibold tracking-tight sm:text-2xl"
            style={{ color: "var(--foreground)" }}
          >
            &ldquo;It takes action, not just gives answers.&rdquo;
          </p>
          <p className="mt-3 text-sm" style={{ color: "var(--text-faint)" }}>
            Open Q&A — ask anything.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return null;
}

// ─── Slide card ───────────────────────────────────────────────────────────────

function SlideCard({ slide }: { slide: Slide }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const isTitle = slide.visual === "title";

  return (
    <section
      ref={ref}
      className="flex min-h-screen snap-start items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-12"
    >
      <div
        className="slide-frame mx-auto grid w-full max-w-7xl gap-6 rounded-[28px] border p-4 sm:p-6 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:p-8"
        style={{ borderColor: "var(--card-border-strong)" }}
      >
        {/* Left column */}
        <motion.div
          className="flex flex-col gap-6"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <SlideBadge label={slide.label} number={slide.number} act={slide.act} />
          </motion.div>

          <motion.div className="space-y-4" variants={fadeUp} custom={0.05}>
            {slide.subtitle && (
              <p
                className="text-sm font-semibold uppercase tracking-[0.24em]"
                style={{ color: "var(--accent)" }}
              >
                {slide.subtitle}
              </p>
            )}
            <h2
              className={`max-w-3xl font-semibold tracking-tight ${
                isTitle
                  ? "text-4xl sm:text-6xl lg:text-7xl"
                  : "text-3xl sm:text-5xl lg:text-6xl"
              }`}
              style={{ color: "var(--foreground)" }}
            >
              {slide.title}
            </h2>
          </motion.div>

          <motion.div className="grid gap-3" variants={stagger}>
            {slide.bullets.map((bullet) => (
              <motion.div
                key={bullet}
                variants={fadeUp}
                className="rounded-2xl border px-4 py-3 text-sm leading-6 sm:text-base sm:leading-7"
                style={{
                  borderColor: "var(--card-border-strong)",
                  backgroundColor: "var(--pill-bg)",
                  color: "var(--text-body)",
                }}
              >
                {bullet}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.15}
            className="rounded-3xl border p-5"
            style={{
              borderColor: "rgba(255,96,88,0.14)",
              background:
                "linear-gradient(180deg,rgba(255,101,90,0.08),rgba(255,101,90,0.03))",
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ff978f]">
              Key Insight
            </p>
            <p
              className="mt-3 text-base leading-7 sm:text-lg sm:leading-8"
              style={{ color: "var(--text-body)" }}
            >
              {slide.insight}
            </p>
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div
          className="flex min-h-[320px] items-center lg:min-h-[420px]"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full">
            <VisualPanel visual={slide.visual} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="page-shell min-h-screen">
      {/* Sticky nav */}
      <div
        className="sticky top-0 z-20 border-b backdrop-blur-xl"
        style={{ borderColor: "var(--card-border)", backgroundColor: "var(--nav-bg)" }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-12">
          <div>
            <p className="bg-[linear-gradient(90deg,#ff675c_0%,#c4b49e_100%)] bg-clip-text text-sm font-semibold uppercase tracking-[0.24em] text-transparent">
              OpenClaw
            </p>
            <p className="text-sm" style={{ color: "var(--text-faintest)" }}>
              {slides.length}-slide internal training deck · Romega Solutions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden text-sm sm:block" style={{ color: "var(--text-faintest)" }}>
              3 acts · {slides.length} slides
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Slides */}
      <div className="snap-y snap-mandatory">
        {slides.map((slide) => (
          <SlideCard key={slide.number} slide={slide} />
        ))}
      </div>
    </main>
  );
}
