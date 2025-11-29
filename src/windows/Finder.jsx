import React from "react";
import WindowControls from "#components/WindowControls.jsx";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import useWindowStore from "#store/window";

const DEFAULT_LOCATION = locations.work;

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const currentLocation = activeLocation ?? DEFAULT_LOCATION;
  const { openWindow } = useWindowStore();

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items = []) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={`${name}-${item.id}`}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === currentLocation.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} alt={item.name} className="w-4" />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <p className="font-semibold text-gray-600">{currentLocation.name}</p>
        <Search className="icon" />
      </div>
      <div className="bg-white flex h-full w-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("Work", locations.work.children)}
        </div>
        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
