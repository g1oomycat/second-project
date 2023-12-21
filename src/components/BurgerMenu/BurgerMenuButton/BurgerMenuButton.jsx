import React, { useContext } from "react";
import classes from "./BurgerMenuButton.module.scss";
import { motion, useCycle, AnimatePresence } from "framer-motion";

import { observer } from "mobx-react-lite";
import { Context } from "../../..";

const button_variants = {
  open_first: {
    y: 11,
    rotate: 45,
  },
  open_second: {
    scale: 0,
  },
  open_thrist: {
    y: -11,
    rotate: -45,
  },
  closed_first: {
    rotate: 0,
    y: 0,
  },
  closed_second: {
    scale: 1,
    y: 0,
  },
};

const BurgerMenuButton = observer(() => {
  const { burgers } = useContext(Context);
  return (
    <>
      <div className={classes.burger_button}>
        <div
          className={classes.burger_body}
          onClick={() => burgers.setIsOpen(true)}
        >
          <motion.span
            initial={"false"}
            animate={burgers.isOpen ? "open_first" : "closed_first"}
            variants={button_variants}
          ></motion.span>
          <motion.span
            initial={"false"}
            animate={burgers.isOpen ? "open_second" : "closed_second"}
            variants={button_variants}
          ></motion.span>
          <motion.span
            initial={"false"}
            animate={burgers.isOpen ? "open_thrist" : "closed_first"}
            variants={button_variants}
          ></motion.span>
        </div>
      </div>
    </>
  );
});

export default BurgerMenuButton;
