import React from "react";
import { useRef } from "react";
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

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);


  useGSAP(() => {
    const titleCleanup=setuptextHover(titleRef.current, "title");
    const subtitleCleanup=setuptextHover(subtitleRef.current, "subtitle");
    return () => {
      titleCleanup();
      subtitleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
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
