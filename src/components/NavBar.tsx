import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.css";
import moment from "moment";

const NavBar = () => {
  return (
    <div className={classes["nav-bar"]}>
      <nav>
        <ul className={classes["nav-bar-links"]}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes["active-nav-link"] : classes["nav-link"]
              }
              to=""
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes["active-nav-link"] : classes["nav-link"]
              }
              to="favourites"
            >
              Favourites
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes["active-nav-link"] : classes["nav-link"]
              }
              to="recents"
            >
              Recent Search
            </NavLink>
          </li>
        </ul>
      </nav>
      <p className={classes.date}>
        {moment(Date()).format("ddd, DD MMM YYYY hh:mm A")}
      </p>
    </div>
  );
};

export default NavBar;
