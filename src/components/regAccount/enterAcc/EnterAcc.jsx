import React, { useContext } from "react";
import { TextField, Button } from "@mui/material";
import { passwordlValidation, emailValidation } from "../validation";
import { Controller, useForm } from "react-hook-form";
import classes from "../enterAcc.module.scss";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { login } from "../../../API/userAPI";
import { useNavigate } from "react-router-dom";

const EnterAcc = observer(() => {
  const navigate = useNavigate();
  const { reg, users } = useContext(Context);
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      users.setUser(response.data);
      users.setLoggedIn(true);
      // basket.addUserId(response.data.id);
      navigate("/account");
    } catch (error) {
      if (error.response.status === 403) {
        alert("Пользователь не найден");
      }
    }
    console.log(data);
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={classes.enter_form}
    >
      <span className={classes.enter_title}>Вход</span>
      <div className={classes.find_table_items}>
        <Controller
          name="email"
          rules={emailValidation}
          defaultValue={""}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Email*"
              fullWidth
              helperText={error && error.message}
            />
          )}
          control={control}
        />
      </div>
      <div className={classes.find_table_items}>
        <Controller
          name="password"
          rules={passwordlValidation}
          defaultValue={""}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Пароль*"
              type="password"
              fullWidth
              helperText={error && error.message}
            />
          )}
          control={control}
        />
      </div>

      <Button
        variant="outlined"
        type="submit"
        fullWidth
        size="large"
        className={classes.main_btn}
      >
        Войти
      </Button>
      <Button
        variant="outlined"
        size="small"
        className={classes.sub_btn}
        onClick={() => reg.setRegistrationIsOpen(true)}
      >
        Создать новый аккаунт
      </Button>
    </form>
  );
});

export default EnterAcc;
