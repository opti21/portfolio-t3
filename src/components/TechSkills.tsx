import { animated, useTrail } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import type { TechSkill } from "../types/types";
import Icon from "./Icon";
import cuid from "cuid";

const TECH_SKILLS: TechSkill[] = [
  { name: "Typescript", icon: "typescript-plain" },
  { name: "Javascript", icon: "javascript-plain" },
  { name: "Next.js", icon: "nextjs-original" },
  { name: "React", icon: "react-original" },
  { name: "Go", icon: "go-original-wordmark" },
  { name: "Tailwind", icon: "tailwindcss-plain" },
  { name: "MongoDB", icon: "mongodb-plain" },
  { name: "PostgreSQL", icon: "postgresql-plain" },
];

const TechSkills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });

  const trail = useTrail(TECH_SKILLS.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: inView ? 1 : 0,
    x: inView ? 0 : 20,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 text-4xl mt-4"
    >
      {trail.map(({ height, ...style }, index) => {
        const skill = TECH_SKILLS[index]

       return (
        skill ?
          <animated.div
            style={style}
            key={cuid()}
            className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border p-4"
          >
            <div className="text-base">{skill.name}</div>
            <Icon icon={skill.icon} />

          </animated.div>
          :
          null
        );
      })}
    </div>
  );
};

export default TechSkills;
