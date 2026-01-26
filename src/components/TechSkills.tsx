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
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      {trail.map((style, index) => {
        const skill = TECH_SKILLS[index];

        return skill ? (
          <animated.div
            style={style}
            key={skill.name}
            className="group relative glass-card p-5 flex flex-col items-center justify-center gap-3 hover-glow cursor-default"
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/0 via-transparent to-accent-violet/0 group-hover:from-accent-cyan/5 group-hover:to-accent-violet/5 rounded-2xl transition-all duration-500" />

            {/* Icon */}
            <div className="relative">
              <i
                className={`devicon-${skill.icon} text-4xl text-text-secondary group-hover:text-accent-cyan transition-colors duration-300`}
              />
            </div>

            {/* Label */}
            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300">
              {skill.name}
            </span>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-accent-cyan group-hover:w-12 transition-all duration-500" />
          </animated.div>
        ) : null;
      })}
    </div>
  );
};

export default TechSkills;
