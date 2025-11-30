import React, { useMemo, useRef } from "react";
import { locations } from "#constants";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";

const Home = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const homeRef = useRef(null);

  // Get all folders from work location
  const folders = useMemo(() => {
    return locations.work.children.filter((item) => item.kind === "folder");
  }, []);

  // Generate random positions for folders
  const foldersWithPositions = useMemo(() => {
    return folders.map((folder) => {
      // Generate random positions (avoiding edges)
      const top = Math.random() * 60 + 10; // 10% to 70% from top
      const left = Math.random() * 70 + 5; // 5% to 75% from left

      return {
        ...folder,
        randomTop: `${top}%`,
        randomLeft: `${left}%`,
      };
    });
  }, [folders]);

  useGSAP(() => {
    const home = homeRef.current;
    if (!home) return;

    const folderItems = home.querySelectorAll("li");
    const instances = [];

    folderItems.forEach((item, index) => {
      const folder = foldersWithPositions[index];
      if (!folder) return;

      let startX = 0;
      let startY = 0;
      let hasMoved = false;
      
      const instance = Draggable.create(item, {
        bounds: "body",
        inertia: true,
        onPress: function() {
          // Store the starting position
          startX = this.x;
          startY = this.y;
          hasMoved = false;
        },
        onDrag: function() {
          // Check if moved more than 5 pixels (threshold for click vs drag)
          const deltaX = Math.abs(this.x - startX);
          const deltaY = Math.abs(this.y - startY);
          if (deltaX > 5 || deltaY > 5) {
            hasMoved = true;
          }
        },
        onRelease: function() {
          // Open immediately on release if it was a click (didn't move much)
          if (!hasMoved) {
            setActiveLocation(folder);
            openWindow("finder");
          }
        },
      });

      instances.push(instance[0]);
    });

    return () => {
      instances.forEach((instance) => instance.kill());
    };
  }, [foldersWithPositions, setActiveLocation, openWindow]);

  return (
    <section id="home" ref={homeRef}>
      <ul>
        {foldersWithPositions.map((folder) => (
          <li
            key={folder.id}
            className="group cursor-pointer"
            style={{
              top: folder.randomTop,
              left: folder.randomLeft,
            }}
          >
            <img src={folder.icon} alt={folder.name} className="w-16 h-16" />
            <p>{folder.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;

