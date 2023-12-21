import React, { useContext } from "react";
import classes from "./title.module.scss";

import { observer } from "mobx-react-lite";

const Title = observer(({ title_text }) => {
  return (
    <div className={`${classes.title_cont} _cont_limit`}>
      <div className={classes.title_body}>
        <div>{title_text}</div>
      </div>
    </div>
  );
});

export default Title;
