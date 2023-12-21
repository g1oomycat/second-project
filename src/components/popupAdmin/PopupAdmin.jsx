import React, { useState } from "react";
import classes from "./popupAdmin.module.scss";
import "../../components/regAccount/customMUI.scss";
import {
  nameValidation,
  numberValidation,
  requiredValidation,
} from "../../components/regAccount/validation";
import { TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { MuiFileInput } from "mui-file-input";
import CloseIcon from "@mui/icons-material/Close";
import { postFotoProducts, postProduct } from "../../API/productsAPI";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const PopupAdmin = observer(({ id_category }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    const fotoProduct = new FormData();
    fotoProduct.append("file", data.foto);
    const res = await postFotoProducts(fotoProduct);
    let product = {
      id_category: id_category,
      name: data.name,
      description: data.description,
      price: data.price,
      img: res.data.filename,
    };
    console.log(product);
    try {
      const response = await postProduct(product);
      setIsOpen(false);
    } catch (error) {
      console.log("Ошибка при введении данных", error);
    }
  };
  return (
    <>
      <div className={classes.popup_button} onClick={() => setIsOpen(true)}>
        +
      </div>
      {isOpen && (
        <div className={classes.popup}>
          <div className={classes.popup_cont}>
            <div
              className={classes.popup_exit}
              onClick={() => setIsOpen(false)}
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
                  name="name"
                  rules={nameValidation}
                  defaultValue={""}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Название*"
                      fullWidth
                      helperText={error && error.message}
                    />
                  )}
                  control={control}
                />
              </div>
              <div className={classes.find_table_items}>
                <Controller
                  name="description"
                  defaultValue={""}
                  rules={nameValidation}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Описание*"
                      fullWidth
                      helperText={error && error.message}
                    />
                  )}
                  control={control}
                />
              </div>
              <div className={classes.find_table_items}>
                <Controller
                  name="price"
                  defaultValue={""}
                  rules={numberValidation}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Стоимость*"
                      fullWidth
                      helperText={error && error.message}
                    />
                  )}
                  control={control}
                />
              </div>
              <div className={classes.find_table_items}>
                <Controller
                  name="foto"
                  defaultValue={""}
                  rules={requiredValidation}
                  render={({ field, fieldState: { error } }) => (
                    <MuiFileInput
                      {...field}
                      label="Фотография*"
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
                Добавить товар
              </Button>
            </form>
          </div>
          <div
            className={classes.popup_mask}
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
});

export default PopupAdmin;
