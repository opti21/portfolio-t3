import { useSpring, animated } from "@react-spring/web";
import type { FC } from "react";
import { useInView } from "react-intersection-observer";
import type { Item } from "../types/types";

type Props = {
  item: Item;
  index: number;
};

const Card: FC<Props> = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "50px",
  });

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 15,
    from: { opacity: 0, y: 15 },
    delay: index * 40,
    config: { tension: 400, friction: 30 },
  });

  return (
    <animated.article
      style={spring}
      ref={ref}
      className="group relative glass-card p-6 md:p-8 hover-glow transition-all duration-500"
    >
      {/* Accent line on hover */}
      <div className="absolute top-0 left-0 w-0 h-px bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-amber group-hover:w-full transition-all duration-700" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex-1">
          {/* Title with optional link */}
          <div className="flex items-center gap-3 mb-2">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="group/link flex items-center gap-2"
              >
                <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary group-hover/link:text-accent-cyan transition-colors">
                  {item.name}
                </h3>
                <svg
                  className="w-4 h-4 text-text-muted group-hover/link:text-accent-cyan group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all"
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
              <h3 className="font-display text-xl md:text-2xl font-semibold text-text-primary">
                {item.name}
              </h3>
            )}
          </div>

          {/* Position */}
          {item.position && (
            <p className="text-accent-cyan font-medium text-sm uppercase tracking-wider">
              {item.position}
            </p>
          )}
        </div>

        {/* Date badge */}
        {item.beginDate && item.endDate && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-muted/50 rounded-lg border border-white/[0.04]">
            <svg
              className="w-4 h-4 text-text-muted"
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
              <li key={i} className="flex gap-3 text-text-secondary leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/60 mt-2.5 shrink-0" />
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
              className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-surface-muted/60 border border-white/[0.04] rounded-lg hover:border-accent-cyan/20 hover:text-accent-cyan transition-all duration-300"
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
