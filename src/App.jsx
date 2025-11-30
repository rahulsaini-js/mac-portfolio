import React, { useEffect } from "react";
import { Navbar, Welcome, Dock, Home } from "#components";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { Terminal } from "#windows";
import { Safari } from "#windows";
import { Resume } from "#windows";
import { Finder } from "#windows";
import { Text } from "#windows";
import { Image } from "#windows";
import { Contact } from "#windows";
import { Photos } from "#windows";
import useThemeStore from "#store/theme.js";
gsap.registerPlugin(Draggable);

const App = () => {
  const { isDark } = useThemeStore();

  // Sync dark class to html element for background filtering
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <main className={isDark ? "dark" : ""}>
      <Navbar />
      <Welcome />
      <Home />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
    </main>
  );
};

export default App;
