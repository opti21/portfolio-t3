import { useSpring, animated } from "@react-spring/web";
import type { FC } from "react";
import { useInView } from "react-intersection-observer";
import type { Item } from "../types/types";

type Props = {
  item: Item;
  index: number;
};

const Card: FC<Props> = ({ item, index }) => {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "50px",
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 15,
    from: { opacity: 0, y: 15 },
    delay: reducedMotion ? 0 : index * 40,
    immediate: reducedMotion,
    config: { tension: 400, friction: 30 },
  });

  return (
    <animated.article
      style={spring}
      ref={ref}
      className="glass-card hover-glow group relative p-6 transition-all duration-500 md:p-8"
    >
      <div className="card-hover-border pointer-events-none absolute inset-0 rounded-2xl" />

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          {/* Title with optional link */}
          <div className="mb-2 flex items-center gap-3">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group/link flex items-center gap-2"
              >
                <h3 className="font-display text-xl font-semibold text-text-primary transition-colors group-hover/link:text-accent-cyan md:text-2xl">
                  {item.name}
                </h3>
                <svg
                  className="h-4 w-4 text-text-muted transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent-cyan"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </a>
            ) : (
              <h3 className="font-display text-xl font-semibold text-text-primary md:text-2xl">
                {item.name}
              </h3>
            )}
          </div>

          {/* Position */}
          {item.position && (
            <p className="text-sm font-medium uppercase tracking-wider text-accent-cyan">
              {item.position}
            </p>
          )}
        </div>

        {/* Date badge */}
        {item.beginDate && item.endDate && (
          <div className="flex items-center gap-2 rounded-lg border border-white/[0.04] bg-surface-muted/50 px-3 py-1.5">
            <svg
              className="h-4 w-4 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-text-secondary">
              {item.beginDate} — {item.endDate}
            </span>
          </div>
        )}
      </div>

      {/* Description / Bullet Points */}
      {item.bulletPoints && (
        <div className="mb-6">
          <ul className="space-y-3">
            {item.bulletPoints.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 leading-relaxed text-text-secondary"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-cyan/60" />
                <span dangerouslySetInnerHTML={{ __html: point }} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tech Stack */}
      {item.tech && (
        <div className="flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-white/[0.04] bg-surface-muted/60 px-3 py-1.5 text-xs font-medium text-text-secondary transition-all duration-300 hover:border-accent-cyan/20 hover:text-accent-cyan"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </animated.article>
  );
};

export default Card;
