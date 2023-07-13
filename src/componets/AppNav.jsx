import { NavLink } from "react-router-dom";
import style from "./AppNav.module.css";

export function AppNav() {
  return (
    <nav className={style.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countires">countires</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
