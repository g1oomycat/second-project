import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./header.module.scss";
import Logo from "../../images/logo1.png";
import { useContext } from "react";
import BurgerMenuButton from "../BurgerMenu/BurgerMenuButton/BurgerMenuButton";

import { observer } from "mobx-react-lite";
import {
  PersonOutlineOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { Context } from "../..";

const Header = observer(() => {
  const { users } = useContext(Context);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll".onScroll);
  }, []);
  return (
    <header className={scrolled ? classes.header_active : classes.header}>
      <div className={`${classes.header_cont} _cont_limit`}>
        <div className={classes.header_burger_logo}>
          <BurgerMenuButton />
          <span className={classes.header_logo} onClick={() => navigate("/*")}>
            <img src={Logo} alt="logo" />
          </span>
        </div>
        <div className={classes.header_menu}>
          <span className={classes.menu_item}>
            <Link className={classes.menu_link} to="*">
              Главная
            </Link>
          </span>
          <span className={classes.menu_item}>
            <Link className={classes.menu_link} to="/catalog">
              Товары
            </Link>
          </span>
          <span className={classes.menu_item}>
            <Link
              className={classes.menu_link}
              to={users.loggedIn ? "account" : "/registration"}
            >
              <PersonOutlineOutlined sx={{ fontSize: 30 }} />
            </Link>
          </span>
          <span className={classes.menu_item}>
            <Link className={classes.menu_link} to="/basket">
              <ShoppingBagOutlined sx={{ fontSize: 30 }} />
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
});

export default Header;
