import React from "react";
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
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
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
