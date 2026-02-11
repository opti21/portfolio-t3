import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Item } from "../types/types";
import Card from "../components/Card";
import TechSkills from "../components/TechSkills";
import BirdMigration from "../components/BirdMigration";
import { useInView } from "react-intersection-observer";

const EXPERIENCE: Item[] = [
  {
    name: "AI Dev Tools Startup",
    beginDate: "Aug 2025",
    endDate: "Jan 2026",
    position: "Full Stack Software Engineer (Contract)",
    bulletPoints: [
      "Built and maintained an AI-powered platform.",
      "Built AI chat infrastructure with streaming responses, tool calls, and visual code editing.",
      "Designed PR preview pipeline with database branching and fully automated ephemeral environments.",
      "Migrated sandbox infrastructure, improving reliability and consolidating operations.",
      "Implemented billing lifecycle, admin dashboard, and drag-and-drop task management system.",
    ],
  },
  {
    name: "Thumbnail Test",
    beginDate: "Aug 2022",
    endDate: "Sep 2025",
    position: "Contract Developer",
    bulletPoints: [
      "Key team member on a widely used A/B testing tool for YouTube thumbnails and titles.",
      "Revamped UI/UX and integrated webhooks for efficient subscription processing.",
    ],
  },
  {
    name: "Brickseek",
    beginDate: "Mar 2022",
    endDate: "Apr 2022",
    position: "Contract Mobile Developer",
    bulletPoints: [
      "Added features to React Native app. <strong>Improved app speed by 20%</strong>.",
    ],
    tech: ["React Native"],
  },
];

const PROJECTS: Item[] = [
  {
    name: "Seth Drums Song Panel",
    link: "https://sethdrums.com",
    bulletPoints: [
      "Full-stack moderation app for a Twitch streamer. <strong>Improved mod workflow by 100x</strong>. Real-time updates via Pusher, drag-and-drop queue management.",
    ],
    tech: ["TypeScript", "Next.js", "Prisma", "Redis", "PostgreSQL", "Pusher"],
  },
  {
    name: "Gauntlet Bot",
    link: "https://github.com/opti21/gauntlet-bot",
    bulletPoints: [
      "Submission handler for weekly design contests. <strong>1000+ original works</strong> submitted and stored. Dockerized deployment on Linode.",
    ],
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Docker", "Vercel"],
  },
];

const SectionTitle = ({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0 });

  return (
    <div ref={ref} className="mb-8">
      <h2
        className={`font-display text-3xl font-bold tracking-tight md:text-4xl ${
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
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

      <main className="min-h-screen overflow-x-hidden bg-surface">
        {/* Bird migration background */}
        <BirdMigration />

        {/* Subtle gradient orbs */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="bg-accent-cyan/8 absolute -right-40 -top-40 h-96 w-96 rounded-full blur-[120px]" />
          <div className="bg-accent-violet/8 absolute -left-40 top-1/2 h-80 w-80 rounded-full blur-[100px]" />
        </div>

        {/* Hero Section - Compact */}
        <header
          ref={heroRef}
          className="relative flex min-h-[70vh] items-center px-6 pt-12 md:px-12 lg:px-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
              {/* Profile Image - Smaller */}
              <div
                className={`shrink-0 ${
                  heroInView ? "animate-scale-in" : "opacity-0"
                }`}
              >
                <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-white/[0.1] md:h-40 md:w-40">
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
                  className={`mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-surface-elevated/80 px-3 py-1.5 ${
                    heroInView ? "animate-fade-in" : "opacity-0"
                  }`}
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-text-secondary">
                    Available for work
                  </span>
                </div>

                <h1
                  className={`mb-4 font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl ${
                    heroInView ? "animate-fade-up" : "opacity-0"
                  }`}
                >
                  <span className="text-text-primary">Brandon R.</span>
                </h1>

                <p
                  className={`mb-6 max-w-xl text-lg font-light leading-relaxed text-text-secondary md:text-xl ${
                    heroInView ? "animate-fade-up delay-100" : "opacity-0"
                  }`}
                >
                  Full stack developer. 9+ years building web apps, AI
                  integrations, and developer tools.
                </p>

                {/* CTA Links */}
                <div
                  className={`flex flex-wrap justify-center gap-3 md:justify-start ${
                    heroInView ? "animate-fade-up delay-200" : "opacity-0"
                  }`}
                >
                  <a
                    href="https://www.linkedin.com/in/opti/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-accent-cyan px-5 py-2.5 font-semibold text-surface transition-colors hover:bg-accent-cyan/90"
                  >
                    <i className="devicon-linkedin-plain" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/opti21"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-surface-elevated px-5 py-2.5 transition-colors hover:border-white/[0.15]"
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
        <section className="relative px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <SectionTitle accent="Stack">Tech</SectionTitle>
            <TechSkills />
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="relative px-6 py-16 md:px-12 lg:px-24"
        >
          <div className="mx-auto max-w-6xl">
            <SectionTitle accent="Experience">Work</SectionTitle>
            <div className="space-y-4">
              {EXPERIENCE.map((experience, index) => (
                <Card key={experience.name} item={experience} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative px-6 py-16 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <SectionTitle accent="Projects">Side</SectionTitle>
            <div className="space-y-4">
              {PROJECTS.map((project, index) => (
                <Card key={project.name} item={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer - Minimal */}
        <footer className="relative border-t border-white/[0.04] px-6 py-8 md:px-12 lg:px-24">
          <div className="mx-auto flex max-w-6xl items-center justify-between text-sm text-text-muted">
            <span>Brandon R.</span>
            <a
              href="https://github.com/opti21"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-text-secondary"
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
