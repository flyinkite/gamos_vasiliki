import navStyle from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import classNames from "classnames";

export const Nav = () => {
  const routes = [
    { label: "Αρχική", path: "/" },
    { label: "Πληροφορίες", path: "/information" },
    { label: "RSVP", path: "/rsvp" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={navStyle.nav}>
      
      {/* Top bar */}
      <div className={navStyle.topBar}>
        <NavLink className={navStyle.logo} to="/">
          Β<span>&</span>Σ
        </NavLink>

        <div className={navStyle.menuIcon} onClick={() => setIsOpen(!isOpen)}>
          <GiHamburgerMenu />
        </div>
      </div>

      {/* Menu */}
      <ul
        className={classNames(navStyle.ul, {
          [navStyle.is_open]: isOpen,
        })}
      >
        {routes.map((route) => (
          <li key={route.path} className={navStyle.li}>
            <NavLink
              to={route.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                classNames(navStyle.link, {
                  [navStyle.active]: isActive,
                })
              }
            >
              {route.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};