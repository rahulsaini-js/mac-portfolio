import React from 'react'
import { navLinks, navIcons } from '#constants'
import dayjs from 'dayjs'
import useWindowStore from '#store/window.js';
import useThemeStore from '#store/theme.js';

const navbar = () => {
    const { openWindow } = useWindowStore();
    const { toggleTheme, isDark } = useThemeStore();

    const handleIconClick = (id) => {
        // Icon with id 4 is the mode/theme toggle icon
        if (id === 4) {
            toggleTheme();
        }
    };

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold">Rahul's Portfolio</p>
                <ul>
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={() => openWindow(type)}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({ id, img }) => (
                        <li key={id} onClick={() => handleIconClick(id)}>
                            <img className="icon-hover" src={img} alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>
                <time>
                    {dayjs().format("ddd D MMM h:mm A")}
                </time>
            </div>
        </nav>
    );
};

export default navbar