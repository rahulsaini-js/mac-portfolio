import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import WindowControls from "#components/WindowControls.jsx";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window.js";

const Photos = () => {
  const { openWindow } = useWindowStore();

  const handleImageClick = (imageItem) => {
    // Create image data object for the image window
    const imageData = {
      name: `image-${imageItem.id}.png`,
      imageUrl: imageItem.img,
    };
    // Open the image window with the clicked image data
    openWindow("imgfile", imageData);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Photos</h2>
      </div>
      <div className="bg-white flex h-full w-full">
        <div className="sidebar">
          <h2>Library</h2>
          <ul>
            {photosLinks.map((link) => (
              <li key={link.id}>
                <img src={link.icon} alt={link.title} />
                <p>{link.title}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="gallery">
          <ul>
            {gallery.map((imageItem) => (
              <li
                key={imageItem.id}
                onClick={() => handleImageClick(imageItem)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img src={imageItem.img} alt={`Gallery image ${imageItem.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;

