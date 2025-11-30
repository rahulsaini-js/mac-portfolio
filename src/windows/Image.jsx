import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import useWindowStore from "#store/window.js";
import { useShallow } from "zustand/react/shallow";

const Image = () => {
  const data = useWindowStore(
    useShallow((state) => state.windows.imgfile?.data)
  );

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{name || "Untitled"}</p>
      </div>
      <div className="preview">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name || "Image preview"}
          />
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;

