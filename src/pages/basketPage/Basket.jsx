import React, { useContext } from "react";
import classes from "./basket.module.scss";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import Title from "../../components/title/Title";
import { changeDataFromBasket } from "../../API/userAPI";
import { orders } from "../../API/orderAPI";
import { observer } from "mobx-react-lite";
import BasketCard from "../../components/BasketCard/BasketCard";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import {
  nameValidation,
  emailValidation,
  adresValidation,
} from "../../components/regAccount/validation";
import "../../components/regAccount/customMUI.scss";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";

import { orderDetails } from "../../API/orderDetailsAPI";

const Basket = observer(() => {
  const { basket, users } = useContext(Context);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    if (!basket.checkBasket()) {
      alert("Корзина пуста");
      return;
    }
    const order = {
      order_date: new Date().toLocaleDateString(),
      order_time: new Date().toLocaleTimeString(),
      delivery_addresses: data.adres,
      status: true,
      order_price: basket.basket_price,
    };
    if (!users.loggedIn) {
      order["user_name"] = data.firstName;
      order["user_number"] = data.phoneNumber;
      order["user_email"] = data.email;
    } else {
      order["user_id"] = users.user.id;
      const bonus =
        users.user.user_balance + Math.floor(basket.basket_price * 0.05);
      try {
        const response = await changeDataFromBasket(
          users.user.id,
          data.firstName,
          data.phoneNumber,
          data.email,
          data.adres,
          bonus
        );
        users.setUser(response.data);
      } catch (error) {
        alert("Ошибка замены номера");
      }
    }

    try {
      const response = await orders(order);
      for (let product of basket.basket) {
        const responseDetails = await orderDetails({
          order_id: response.data.id,
          product_id: product.id_product,
          quantity: product.total,
        });
      }

      basket.setBasket([]);
      basket.delPrice();
      alert("Заказ оформлен");
      navigate("/main");
    } catch (error) {
      alert("Ошибка сервера или данных");
    }
  };
  return (
    <div className={classes.basket}>
      <Title title_text={"Корзина"} />
      <div className={`${classes.basket_cont} _cont_limit`}>
        <section className={classes.basket_body}>
          <div className={classes.basket_column_left}>
            {basket.basket.map((product) => (
              <BasketCard
                key={product.id_product}
                id_product={product.id_product}
                oldTotal={product.total}
              />
            ))}

            <div className={classes.basket_info_user}>
              <div className={classes.user_item}>
                <form
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  className={classes.basket_form}
                >
                  <span className={classes.basket_title}>
                    Введите свои данные
                  </span>
                  <div className={classes.basket_items}>
                    <Controller
                      name="firstName"
                      rules={nameValidation}
                      defaultValue={users.user.first_name || ""}
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

                  <div className={classes.basket_items}>
                    <Controller
                      name="phoneNumber"
                      defaultValue={users.user.phone_number || ""}
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
                  <div className={classes.basket_items}>
                    <Controller
                      name="email"
                      rules={emailValidation}
                      defaultValue={users.user.email || ""}
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
                  <div className={classes.basket_items}>
                    <Controller
                      name="adres"
                      defaultValue={users.user.user_adress || ""}
                      rules={adresValidation}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          label="Адрес*"
                          placeholder="Город, улица, дом, этаж,квартира"
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
                    Подтверждаю заказ
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className={classes.basket_column_right}>
            <div className={classes.right_item}>
              <div className={classes.total}>
                итого {basket.basket.length} товара на сумму
              </div>
              <div className={classes.coast_bonus}>
                <div className={classes.coast}>{basket.basket_price} ₽</div>
                <div className={classes.bonus}>
                  <SavingsOutlinedIcon />{" "}
                  <span>+{Math.floor(basket.basket_price * 0.05)} бонусов</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export default Basket;
