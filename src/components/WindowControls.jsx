import React from "react";
import useWindowStore from "#store/window.js";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  const handleClose = () => {
    if (!target) return;
    closeWindow(target);
  };

  return (
    <div id="window-controls">
      <button
        type="button"
        className="close"
        onClick={handleClose}
        aria-label="Close window"
      >
        &times;
      </button>
      <button type="button" className="minimize" aria-label="Minimize window">
        &ndash;
      </button>
      <button type="button" className="maximize" aria-label="Maximize window">
        +
      </button>
    </div>
  );
};

export default WindowControls;