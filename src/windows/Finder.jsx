import React from "react";
import WindowControls from "#components/WindowControls.jsx";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants";
import useLocationStore from "#store/location.js";
import clsx from "clsx";

const DEFAULT_LOCATION = locations.work;

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const currentLocation = activeLocation ?? DEFAULT_LOCATION;

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

  const renderContent = () => {
    const children = currentLocation.children ?? [];

    if (!children.length) {
      return (
        <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-wide text-gray-400">
          No files available
        </div>
      );
    }

    return (
      <ul className="relative h-full min-h-88 w-full">
        {children.map((child) => (
          <li key={child.id} className={clsx("group", child.position)}>
            <img src={child.icon} alt={child.name} />
            <p>{child.name}</p>
          </li>
        ))}
      </ul>
    );
  };

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
        <div className="content">{renderContent()}</div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
