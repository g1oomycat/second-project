import React, { useContext } from "react";
import classes from "./BurgerMenuBlock.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { PageList, ProductList } from "../BurgerList";
import { Link, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../..";
import Logo from "../../../images/logo1.png";
import { CloseOutlined, KeyboardBackspaceOutlined } from "@mui/icons-material";

const list_variants = {
  hover: {
    scale: 1.2,
    transition: {
      ease: "easeOut",
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.8,
    transition: {
      ease: "easeOut",
      duration: 0.1,
    },
  },
};

const BurgerMenuBlock = observer(() => {
  const { burgers, title, users } = useContext(Context);

  console.log(users.loggedIn);
  const validateText = (text) => {
    if (text === "Вход" && users.loggedIn) {
      return "";
    }
    if (text === "Аккаунт" && !users.loggedIn) {
      return "";
    }
    return text;
  };
  return (
    <AnimatePresence>
      {burgers.isOpen && (
        <>
          <div
            className={classes.burger_bg}
            onClick={() => {
              burgers.setIsOpen(false);
              burgers.setIsOpenProducts(false);
            }}
          ></div>
          <motion.div
            className={classes.burger_slider}
            initial={{ x: "-100%" }}
            animate={{
              x: "0%",
              transition: {
                ease: "easeOut",
                duration: 0.25,
              },
            }}
            exit={{
              x: "-100%",
              transition: {
                ease: "easeIn",
              },
            }}
          >
            <div className={classes.burger_conteiner}>
              <div className={classes.burger_header}>
                <div className={`${classes.burger_button_cont}`}>
                  <span
                    className={classes.burger_button}
                    onClick={() => burgers.setIsOpen(false)}
                  >
                    <CloseOutlined sx={{ fontSize: 30 }} />
                  </span>
                </div>
                <span className={classes.burger_logo}>
                  <img src={Logo} alt="logo" />
                </span>
              </div>
              <div className={classes.burger_main_body}>
                {!burgers._isOpenProducts && (
                  <div className={classes.burger_body}>
                    {PageList.map((item, index) => (
                      <motion.div
                        className={classes.burger_item}
                        key={index}
                        variants={list_variants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          to={item.itemLink}
                          onClick={() => burgers.setIsOpen(false)}
                        >
                          {validateText(item.itemText)}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
                {/* {burgers._isOpenProducts && (
                  <div className={classes.burger_products}>
                    <div className={classes.burger_button_cont}>
                      <div
                        className={classes.burger_button}
                        onClick={() => burgers.setIsOpenProducts(false)}
                      >
                        <KeyboardBackspaceOutlined sx={{ fontSize: 30 }} />
                      </div>
                    </div>
                    <div className={classes.burger_products_list}>
                      {ProductList.map((item, index) => (
                        <motion.div
                          className={classes.burger_item}
                          key={index}
                          variants={list_variants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <Link
                            onClick={() => {
                              burgers.setIsOpen(false);
                              title.setTitleText(item.itemLink);
                            }}
                          >
                            {item.itemText}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

export default BurgerMenuBlock;
