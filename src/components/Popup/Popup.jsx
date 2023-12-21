import React, { useContext } from "react";
import classes from "./Popup.module.scss";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import {
  nameValidation,
  passwordlValidation,
  emailValidation,
} from "../regAccount/validation";
import "../regAccount/customMUI.scss";
import { Controller, useForm } from "react-hook-form";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { TextField, Button } from "@mui/material";
import { changeDataUser } from "../../API/userAPI";
import CloseIcon from "@mui/icons-material/Close";

const Popup = observer(() => {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const { popup, users } = useContext(Context);
  const onSubmit = async (data) => {
    try {
      const response = await changeDataUser(
        users.user.id,
        data.firstName,
        data.lastName,
        data.phoneNumber,
        data.email,
        data.password
      );
      console.log(response);
      users.setUser(response.data);
    } catch (error) {
      console.log("Ошибка при введении данных", error);
    }
    popup.setPopupIsOpen(false);
  };
  return (
    <>
      {popup.popupIsOpen && (
        <div className={classes.popup}>
          <div className={classes.popup_cont}>
            <div
              className={classes.popup_exit}
              onClick={() => popup.setPopupIsOpen(false)}
            >
              <CloseIcon />
            </div>
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className={classes.popup_form}
            >
              <span className={classes.enter_title}>Профиль</span>
              <div className={classes.find_table_items}>
                <Controller
                  name="firstName"
                  rules={nameValidation}
                  defaultValue={users.user.first_name}
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
                  defaultValue={users.user.last_name}
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
                  defaultValue={users.user.phone_number}
                  rules={{
                    validate: (value) => matchIsValidTel(value),
                  }}
                  render={({ field, fieldState }) => (
                    <MuiTelInput
                      {...field}
                      label="Номер телефона*"
                      defaultCountry="RU"
                      fullWidth
                      helperText={
                        fieldState.error ? "Номер телофона не верен" : ""
                      }
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
                  defaultValue={users.user.email}
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
                  defaultValue={users.user.password}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Пароль*"
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
                Изменить данные
              </Button>
            </form>
          </div>
          <div
            className={classes.popup_mask}
            onClick={() => popup.setPopupIsOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
});

export default Popup;
