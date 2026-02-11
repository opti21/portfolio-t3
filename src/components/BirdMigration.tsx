import { useEffect, useRef, useCallback } from "react";

interface Bird {
  x: number;
  y: number;
  z: number; // depth for parallax
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  wingPhase: number;
  wingSpeed: number;
}

const COLORS = [
  "rgba(34, 211, 238, 0.6)", // cyan
  "rgba(167, 139, 250, 0.5)", // violet
  "rgba(251, 191, 36, 0.4)", // amber
  "rgba(34, 211, 238, 0.3)", // cyan dim
  "rgba(167, 139, 250, 0.25)", // violet dim
];

const BirdMigration = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdsRef = useRef<Bird[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  const createBird = useCallback(
    (canvas: HTMLCanvasElement, startX?: number): Bird => {
      const z = Math.random() * 0.8 + 0.2; // depth 0.2 to 1
      const upperBandStart = canvas.height * 0.08;
      const upperBandHeight = canvas.height * 0.48;
      return {
        x: startX ?? -50,
        y: upperBandStart + Math.random() * upperBandHeight,
        z,
        vx: (0.3 + Math.random() * 0.5) * z, // slower birds are further away
        vy: (Math.random() - 0.5) * 0.3,
        size: (5 + Math.random() * 10) * z,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] as string,
        rotation: Math.atan2(0.3, 1),
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: 0.08 + Math.random() * 0.04,
      };
    },
    []
  );

  const drawBird = useCallback((ctx: CanvasRenderingContext2D, bird: Bird) => {
    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.rotate(bird.rotation);

    // Wing flap animation
    const wingAngle = Math.sin(bird.wingPhase) * 0.4;

    ctx.fillStyle = bird.color;
    ctx.strokeStyle = bird.color.replace(/[\d.]+\)$/, "0.8)");
    ctx.lineWidth = 0.5;

    // Body triangle (main)
    ctx.beginPath();
    ctx.moveTo(bird.size, 0); // nose
    ctx.lineTo(-bird.size * 0.6, -bird.size * 0.3);
    ctx.lineTo(-bird.size * 0.6, bird.size * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Left wing triangle
    ctx.save();
    ctx.translate(-bird.size * 0.2, 0);
    ctx.rotate(-wingAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-bird.size * 0.5, -bird.size * 0.8);
    ctx.lineTo(-bird.size * 0.7, -bird.size * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Right wing triangle
    ctx.save();
    ctx.translate(-bird.size * 0.2, 0);
    ctx.rotate(wingAngle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-bird.size * 0.5, bird.size * 0.8);
    ctx.lineTo(-bird.size * 0.7, bird.size * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let prefersReducedMotion = reducedMotionQuery.matches;

    const getBirdCount = () => {
      const baseCount = Math.min(25, Math.floor(window.innerWidth / 60));
      return prefersReducedMotion
        ? Math.max(8, Math.floor(baseCount * 0.6))
        : baseCount;
    };

    const initializeBirds = () => {
      birdsRef.current = Array.from({ length: getBirdCount() }, () =>
        createBird(canvas, Math.random() * canvas.width)
      );
    };

    const drawStaticFrame = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      birdsRef.current.forEach((bird) => drawBird(ctx, bird));
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (prefersReducedMotion) {
        drawStaticFrame();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize birds
    initializeBirds();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (prefersReducedMotion) {
        drawStaticFrame();
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      birdsRef.current.forEach((bird, i) => {
        // Gentle flock behavior - birds slightly influence each other
        let avgVy = 0;
        let neighbors = 0;
        birdsRef.current.forEach((other, j) => {
          if (i !== j) {
            const dist = Math.hypot(bird.x - other.x, bird.y - other.y);
            if (dist < 150) {
              avgVy += other.vy;
              neighbors++;
            }
          }
        });

        if (neighbors > 0) {
          bird.vy += (avgVy / neighbors - bird.vy) * 0.01;
        }

        // Mouse influence - birds gently avoid cursor
        if (mouseRef.current.active) {
          const dx = bird.x - mouseRef.current.x;
          const dy = bird.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            bird.vy += (dy / dist) * force * 0.05;
          }
        }

        // Add slight wave motion
        bird.vy += Math.sin(Date.now() * 0.001 + bird.x * 0.01) * 0.002;

        // Keep birds within bounds vertically
        const topBound = rect.height * 0.08;
        const bottomBound = rect.height * 0.58;
        if (bird.y < topBound) bird.vy += 0.02;
        if (bird.y > bottomBound) bird.vy -= 0.02;

        // Dampen vertical velocity
        bird.vy *= 0.99;
        bird.vy = Math.max(-1, Math.min(1, bird.vy));

        // Update position
        bird.x += bird.vx;
        bird.y += bird.vy;

        // Update wing animation
        bird.wingPhase += bird.wingSpeed;

        // Update rotation based on movement direction
        const targetRotation = Math.atan2(bird.vy, bird.vx);
        bird.rotation += (targetRotation - bird.rotation) * 0.1;

        // Reset bird when it leaves the screen
        if (bird.x > rect.width + 50) {
          Object.assign(bird, createBird(canvas));
        }

        drawBird(ctx, bird);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      initializeBirds();
      cancelAnimationFrame(animationRef.current);

      if (prefersReducedMotion) {
        drawStaticFrame();
      } else {
        animate();
      }
    };

    if (reducedMotionQuery.addEventListener) {
      reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    } else {
      reducedMotionQuery.addListener(handleReducedMotionChange);
    }

    if (prefersReducedMotion) {
      drawStaticFrame();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (reducedMotionQuery.removeEventListener) {
        reducedMotionQuery.removeEventListener(
          "change",
          handleReducedMotionChange
        );
      } else {
        reducedMotionQuery.removeListener(handleReducedMotionChange);
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [createBird, drawBird]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto fixed inset-0 z-0"
      style={{
        width: "100%",
        height: "100%",
        opacity: 0.7,
      }}
    />
  );
};

export default BirdMigration;
