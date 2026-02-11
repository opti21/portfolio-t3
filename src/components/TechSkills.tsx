import { animated, useTrail } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import type { TechSkill } from "../types/types";

const TECH_SKILLS: TechSkill[] = [
  { name: "TypeScript", icon: "typescript-plain" },
  { name: "JavaScript", icon: "javascript-plain" },
  { name: "Next.js", icon: "nextjs-original" },
  { name: "React", icon: "react-original" },
  { name: "Go", icon: "go-original-wordmark" },
  { name: "Tailwind", icon: "tailwindcss-plain" },
  { name: "MongoDB", icon: "mongodb-plain" },
  { name: "PostgreSQL", icon: "postgresql-plain" },
  { name: "Redis", icon: "redis-plain" },
  { name: "Svelte", icon: "svelte-plain" },
];

const TechSkills = () => {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "50px",
  });

  const trail = useTrail(TECH_SKILLS.length, {
    config: { tension: 500, friction: 28 },
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 10,
    scale: inView ? 1 : 0.95,
    from: { opacity: 0, y: 10, scale: 0.95 },
    immediate: reducedMotion,
    delay: reducedMotion ? 0 : undefined,
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      {trail.map((style, index) => {
        const skill = TECH_SKILLS[index];

        return skill ? (
          <animated.div
            style={style}
            key={skill.name}
            className="glass-card hover-glow group relative flex cursor-default flex-col items-center justify-center gap-3 p-5"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/0 via-transparent to-accent-violet/0 transition-all duration-500 group-hover:from-accent-cyan/5 group-hover:to-accent-violet/5" />

            {/* Icon */}
            <div className="relative">
              <i
                className={`devicon-${skill.icon} text-4xl text-text-secondary transition-colors duration-300 group-hover:text-accent-cyan`}
              />
            </div>

            {/* Label */}
            <span className="text-sm font-medium text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
              {skill.name}
            </span>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-accent-cyan transition-all duration-500 group-hover:w-12" />
          </animated.div>
        ) : null;
      })}
    </div>
  );
};

export default TechSkills;
