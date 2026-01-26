import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Item } from "../types/types";
import Card from "../components/Card";
import TechSkills from "../components/TechSkills";
import { useInView } from "react-intersection-observer";

const EXPERIENCE: Item[] = [
  {
    name: "Shipper",
    link: "https://shipper.now",
    beginDate: "Aug 2025",
    endDate: "Jan 2026",
    position: "Full Stack Software Engineer (Contract)",
    bulletPoints: [
      "180+ commits, 767 files, 118K+ lines of code on a Next.js 15 AI-powered platform.",
      "Built AI chat infrastructure with streaming responses, tool calls, and visual code editing.",
      "Designed PR preview pipeline with Neon database branching, Railway, and Vercel — fully automated ephemeral environments.",
      "Migrated sandbox infrastructure from Daytona to Modal, improving reliability and consolidating operations.",
      "Implemented Stripe billing lifecycle, admin dashboard, and drag-and-drop task management system.",
    ],
    tech: [
      "Next.js 15", "React 19", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "Stripe", "OpenAI/Anthropic APIs", "Vercel", "Neon"
    ]
  },
  {
    name: "Thumbnail Test",
    beginDate: "Aug 2022",
    endDate: "Aug 2025",
    position: "Contract Developer",
    bulletPoints: [
      "A/B testing tool for YouTube creators — used by channels with 1M+ subscribers including Offline TV and The Diary of A CEO.",
      "Overhauled entire UI/UX, integrated Stripe webhooks. Result: <strong>$3,000+ MRR</strong>.",
    ],
    tech: [
      "Next.js", "Tailwind", "Stripe", "tRPC", "MongoDB", "Prisma", "Redis"
    ]
  },
  {
    name: "Brickseek",
    beginDate: "Mar 2022",
    endDate: "Apr 2022",
    position: "Contract Mobile Developer",
    bulletPoints: [
      "Added features to React Native app. <strong>Improved app speed by 20%</strong>."
    ],
    tech: [
      "React Native"
    ]
  },
]

const PROJECTS: Item[] = [
  {
    name: "Seth Drums Song Panel",
    link: "https://sethdrums.com",
    bulletPoints: [
      "Full-stack moderation app for a Twitch streamer. <strong>Improved mod workflow by 100x</strong>. Real-time updates via Pusher, drag-and-drop queue management.",
    ],
    tech: [
      "TypeScript", "Next.js", "Prisma", "Redis", "PostgreSQL", "Pusher"
    ]
  },
  {
    name: "Gauntlet Bot",
    link: "https://github.com/opti21/gauntlet-bot",
    bulletPoints: [
      "Submission handler for weekly design contests. <strong>1000+ original works</strong> submitted and stored. Dockerized deployment on Linode.",
    ],
    tech: [
      "TypeScript", "Next.js", "PostgreSQL", "Docker", "Vercel"
    ]
  },
]

const SectionTitle = ({ children, accent }: { children: React.ReactNode; accent?: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });

  return (
    <div ref={ref} className="mb-8">
      <h2
        className={`font-display text-3xl md:text-4xl font-bold tracking-tight ${
          inView ? "animate-fade-up" : "opacity-0"
        }`}
      >
        {children}
        {accent && <span className="gradient-text"> {accent}</span>}
      </h2>
    </div>
  );
};

const Home: NextPage = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Head>
        <title>Brandon R. | Full Stack Developer</title>
        <meta
          name="description"
          content="Full stack developer specializing in React, Next.js, and TypeScript. Building performant web applications."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-surface min-h-screen overflow-x-hidden">
        {/* Subtle background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-cyan/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-accent-violet/8 rounded-full blur-[100px]" />
        </div>

        {/* Hero Section - Compact */}
        <header
          ref={heroRef}
          className="relative min-h-[70vh] flex items-center px-6 md:px-12 lg:px-24 pt-12"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Profile Image - Smaller */}
              <div
                className={`shrink-0 ${
                  heroInView ? "animate-scale-in" : "opacity-0"
                }`}
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-white/[0.1]">
                  <Image
                    src="/gopher_pfp.jpg"
                    alt="Brandon R."
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated/80 border border-white/[0.06] mb-4 ${
                    heroInView ? "animate-fade-in" : "opacity-0"
                  }`}
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-text-secondary font-medium">Available for contract work · Houston, TX</span>
                </div>

                <h1
                  className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 ${
                    heroInView ? "animate-fade-up" : "opacity-0"
                  }`}
                >
                  <span className="text-text-primary">Brandon R.</span>
                </h1>

                <p
                  className={`text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-xl mb-6 ${
                    heroInView ? "animate-fade-up delay-100" : "opacity-0"
                  }`}
                >
                  Full stack developer. 9+ years building web apps, AI integrations, and developer tools.
                </p>

                {/* CTA Links */}
                <div
                  className={`flex flex-wrap gap-3 justify-center md:justify-start ${
                    heroInView ? "animate-fade-up delay-200" : "opacity-0"
                  }`}
                >
                  <a
                    href="https://www.linkedin.com/in/opti/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-accent-cyan text-surface font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
                  >
                    <i className="devicon-linkedin-plain" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/opti21"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-surface-elevated border border-white/[0.08] rounded-lg hover:border-white/[0.15] transition-colors"
                  >
                    <i className="devicon-github-original" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Skills Section - Compact */}
        <section className="relative py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <SectionTitle accent="Stack">Tech</SectionTitle>
            <TechSkills />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="relative py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <SectionTitle accent="Experience">Work</SectionTitle>
            <div className="space-y-4">
              {EXPERIENCE.map((experience, index) => (
                <Card key={experience.name} item={experience} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            <SectionTitle accent="Projects">Side</SectionTitle>
            <div className="space-y-4">
              {PROJECTS.map((project, index) => (
                <Card key={project.name} item={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer - Minimal */}
        <footer className="relative py-8 px-6 md:px-12 lg:px-24 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-text-muted">
            <span>Brandon R.</span>
            <a
              href="https://github.com/opti21"
              target="_blank"
              rel="noreferrer"
              className="hover:text-text-secondary transition-colors"
            >
              github.com/opti21
            </a>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;
