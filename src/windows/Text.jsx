import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import useWindowStore from "#store/window.js";
import { useShallow } from "zustand/react/shallow";

const Text = () => {
  const data = useWindowStore(
    useShallow((state) => state.windows.txtfile?.data)
  );

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name || "Untitled"}</h2>
      </div>
      <div className="p-6 space-y-4">
        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt={name || "Preview"}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}
        {subtitle && (
          <p className="text-sm text-gray-600 font-medium">{subtitle}</p>
        )}
        {description && Array.isArray(description) && (
          <div className="space-y-3">
            {description.map((paragraph, index) => (
              <p key={index} className="text-sm text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;

