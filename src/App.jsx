import React from "react";
import { Navbar, Welcome, Dock } from "#components";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { Terminal } from "#windows";
import { Safari } from "#windows";
import { Resume } from "#windows";
import { Finder } from "#windows";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
    </main>
  );
};

export default App;
