import React, { useContext } from "react";
import { TextField, Button } from "@mui/material";
import {
  nameValidation,
  passwordlValidation,
  emailValidation,
} from "../validation";
import { Controller, useForm } from "react-hook-form";
import classes from "../enterAcc.module.scss";
import "../customMUI.scss";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { registerDB } from "../../../API/userAPI";
import { useNavigate } from "react-router-dom";

const RegistrarationAcc = observer(() => {
  const navigate = useNavigate();
  const { reg, users } = useContext(Context);
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    let user = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumber,
      email: data.email,
      password: data.password,
      user_adress: "",
      user_balance: 0,
      role: false,
    };
    try {
      const response = await registerDB(user);

      users.setUser(response.data);
      users.setLoggedIn(true);
      reg.setRegistrationIsOpen(false);
      // basket.addUserId(response.data.id);
      navigate("/account");
    } catch (error) {
      console.log("Ошибка при введении данных", error);
    }
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={classes.enter_form}
    >
      <span className={classes.enter_title}>Регистрация</span>
      <div className={classes.find_table_items}>
        <Controller
          name="firstName"
          rules={nameValidation}
          defaultValue={""}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Имя*"
              fullWidth
              helperText={error && error.message}
            />
          )}
          control={control}
        />
      </div>
      <div className={classes.find_table_items}>
        <Controller
          name="lastName"
          defaultValue={""}
          rules={nameValidation}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Фамилия*"
              fullWidth
              helperText={error && error.message}
            />
          )}
          control={control}
        />
      </div>
      <div className={classes.find_table_items}>
        <Controller
          name="phoneNumber"
          defaultValue={""}
          rules={{
            validate: (value) => matchIsValidTel(value),
          }}
          render={({ field, fieldState }) => (
            <MuiTelInput
              {...field}
              label="Номер телефона*"
              defaultCountry="RU"
              fullWidth
              helperText={fieldState.error ? "Номер телофона не верен" : ""}
              error={fieldState.error}
            />
          )}
          control={control}
        />
      </div>
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
        Зарегестрироваться
      </Button>
      <Button
        variant="outlined"
        size="small"
        className={classes.sub_btn}
        onClick={() => reg.setRegistrationIsOpen(false)}
      >
        Войти в аккаунт
      </Button>
    </form>
  );
});

export default RegistrarationAcc;
