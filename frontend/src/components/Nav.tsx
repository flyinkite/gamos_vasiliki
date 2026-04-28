import navStyle from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

export const Nav = () => {
  const { t, i18n } = useTranslation();

  const routes = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.info"), path: "/information" },
    { label: t("nav.rsvp"), path: "/rsvp" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className={navStyle.nav}>
      
      {/* Top bar */}
      <div className={navStyle.topBar}>
        <NavLink className={navStyle.logo} to="/">
          Β<span>&</span>Σ
        </NavLink>

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

        <div className={navStyle.rightControls}>
          
          {/* Language buttons */}
          <div className={navStyle.langSwitch}>
            <button
              onClick={() => changeLanguage("el")}
              className={classNames(navStyle.langBtn, {
                [navStyle.activeLang]: i18n.language === "el"
              })}
            >
              GR
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={classNames(navStyle.langBtn, {
                [navStyle.activeLang]: i18n.language === "en"
              })}
            >
              EN
            </button>
          </div>

          {/* Hamburger */}
          <div
            className={navStyle.menuIcon}
            onClick={() => setIsOpen(!isOpen)}
          >
            <GiHamburgerMenu />
          </div>

        </div>
      </div>
    </nav>
  );
};