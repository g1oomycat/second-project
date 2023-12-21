import React, { useContext } from "react";
import classes from "./Registration.module.scss";
import { observer } from "mobx-react-lite";
import EnterAcc from "../../components/regAccount/enterAcc/EnterAcc";
import { Context } from "../..";
import RegistrarationAcc from "../../components/regAccount/registrarationAcc/RegistrarationAcc";

const Registration = observer(() => {
  const { reg } = useContext(Context);
  return (
    <div className={classes.reg}>
      <div className={classes.reg_body}>
        {reg.registrationIsOpen ? <RegistrarationAcc /> : <EnterAcc />}
      </div>
    </div>
  );
});

export default Registration;
