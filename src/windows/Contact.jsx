import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import { socials } from "#constants";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact</h2>
      </div>
      <div className="p-8">
        <img src="./images/adrian.jpg" alt="Rahul" className="w-20 rounded-full mb-3"/>
        <h3 className="mb-3">Let Connect</h3>
        <p className="mb-2">Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <p className="mb-5">itsrahulsaini21@gmail.com</p>
        <ul>
          {socials.map(({ id, text, icon, bg, link }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3"
                title={text}
              >
                <img src={icon} alt={text} className="w-6 h-6" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;

