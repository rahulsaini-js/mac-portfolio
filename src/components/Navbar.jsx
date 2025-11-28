import React from 'react'
import { navLinks, navIcons } from '#constants'
import dayjs from 'dayjs'
import useWindowStore from '#store/window.js';

const navbar = () => {
    const { openWindow } = useWindowStore();

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
                        <li key={id}>
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