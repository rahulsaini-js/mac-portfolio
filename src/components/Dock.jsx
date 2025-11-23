import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import useWindowStore from "#store/window.js";
const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);


  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");
    if (icons.length === 0) return;

    // Kill any existing animations
    icons.forEach((icon) => {
      gsap.killTweensOf(icon);
      gsap.set(icon, { scale: 1, y: 0 });
    });

    const animateIcons = (mouseX) => {
      const dockRect = dock.getBoundingClientRect();
      const dockLeft = dockRect.left;

      icons.forEach((icon) => {
        const iconRect = icon.getBoundingClientRect();
        const iconLeft = iconRect.left;
        const iconWidth = iconRect.width;
        const iconCenter = iconLeft - dockLeft + iconWidth / 2;
        const distance = Math.abs(mouseX - iconCenter);
        const intensity = Math.exp(-(distance ** 2.7) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const dockRect = dock.getBoundingClientRect();
      const mouseX = e.clientX - dockRect.left;
      animateIcons(mouseX);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
      icons.forEach((icon) => {
        gsap.killTweensOf(icon);
      });
    };
  }, []);


  const toggleApp = (app) => {
    if(!app.canOpen) return;

    const window=windows[app.id];
    if(window.isOpen){
      closeWindow(app.id);
    }else{
      openWindow(app.id);
    }
    console.log(windows);
    
  };


  

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, canOpen, icon }) => (
          <div className="relative flex justify-center" key={id}>
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
