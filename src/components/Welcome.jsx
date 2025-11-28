import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 100, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setuptextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  // Kill any existing animations on letters
  letters.forEach((letter) => {
    gsap.killTweensOf(letter);
  });

  const animateLetter = (letter, weight, duration = 0.3) => {
    return gsap.to(letter, {
      duration,
      ease: "power1.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  let rafId = null;
  const handleMouseMove = (e) => {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      const { left } = container.getBoundingClientRect();
      const mouseX = e.clientX - left;

      let closestLetter = null;
      let closestDistance = Infinity;

      // Find the closest letter to the mouse
      letters.forEach((letter) => {
        const { left: l, width: w } = letter.getBoundingClientRect();
        const letterCenter = l - left + w / 2;
        const distance = Math.abs(mouseX - letterCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestLetter = letter;
        }
      });

      // Animate: closest letter becomes bold, others become thin
      letters.forEach((letter) => {
        if (letter === closestLetter) {
          animateLetter(letter, max, 0.3);
        } else {
          animateLetter(letter, min, 0.3);
        }
      });
    });
  };

  const handleMouseLeave = () => {
    if (rafId) cancelAnimationFrame(rafId);
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.4);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
    letters.forEach((letter) => {
      gsap.killTweensOf(letter);
    });
  };
};

const setupCursorTrail = (section) => {
  if (!section) return () => {};

  const dots = section.querySelectorAll(".cursor-trail-dot");
  if (!dots.length) return () => {};

  const dotArray = Array.from(dots);

  // Base styling for all dots
  gsap.set(dotArray, {
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    opacity: 0,
    pointerEvents: "none",
  });

  const movers = dotArray.map((dot, index) => {
    const duration = 0.25 + index * 0.04;
    return {
      x: gsap.quickTo(dot, "x", { duration, ease: "power3.out" }),
      y: gsap.quickTo(dot, "y", { duration, ease: "power3.out" }),
    };
  });

  let dotIndex = 0;
  let rafId = null;

  const handleMove = (e) => {
    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const currentDot = dotArray[dotIndex % dotArray.length];
      const currentMover = movers[dotIndex % dotArray.length];
      dotIndex += 1;

      currentMover.x(x);
      currentMover.y(y);

      // Pulse this dot
      gsap.fromTo(
        currentDot,
        {
          scale: 0.1,
          opacity: 0.9,
        },
        {
          scale: 0,
          opacity: 0,
          duration: 0.7,
          ease: "power1.out",
        }
      );
    });
  };

  section.addEventListener("mousemove", handleMove);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    section.removeEventListener("mousemove", handleMove);
    gsap.killTweensOf(dotArray);
  };
};

const Welcome = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);


  useGSAP(() => {
    const titleCleanup = setuptextHover(titleRef.current, "title");
    const subtitleCleanup = setuptextHover(subtitleRef.current, "subtitle");
    const trailCleanup = setupCursorTrail(sectionRef.current);

    return () => {
      titleCleanup();
      subtitleCleanup();
      trailCleanup();
    };
  }, []);

  return (
    <section id="welcome" ref={sectionRef} className="relative overflow-hidden">
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="cursor-trail-dot absolute rounded-full bg-cyan-400/60 blur-xl mix-blend-screen"
          style={{
            width: `${10 + i * 2}px`,
            height: `${10 + i * 2}px`,
          }}
        />
      ))}
      <p ref={subtitleRef}>
        {renderText(
          "Hello, I'm Rahul Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("PORTFOLIO", "text-9xl italic font-georama", 700)}
      </h1>
      <div className="small-screen">
        <p>
          This Portfolio is designed for desktop/tablet devices. Please use a
          desktop/tablet to view the portfolio.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
