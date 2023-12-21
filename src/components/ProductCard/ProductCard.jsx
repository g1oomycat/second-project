import React, { useContext, useEffect, useState } from "react";
import classes from "./productCard.module.scss";
import { observer } from "mobx-react-lite";
import {
  AddShoppingCartOutlined,
  RemoveShoppingCartOutlined,
} from "@mui/icons-material";
import { Context } from "../..";

const ProductCard = observer(({ id_product, image, name, cost }) => {
  const { basket } = useContext(Context);
  const [buy, setBuy] = useState(false);
  function submitInBasket() {
    basket.addBasket(id_product);
    basket.sumPrice(cost);
    setBuy(true);
  }
  function delInBasket() {
    basket.delBasket(id_product);
    basket.minusPrice(cost);
    setBuy(false);
  }
  useEffect(() => {
    setBuy(basket.getStatusBuy(id_product));
  }, []);
  return (
    <div className={classes.catalog_column}>
      <div className={classes.icon_shop}>
        {buy ? (
          <span onClick={delInBasket}>
            <RemoveShoppingCartOutlined />
          </span>
        ) : (
          <span onClick={submitInBasket}>
            <AddShoppingCartOutlined />
          </span>
        )}
      </div>
      <div className={classes.catalog_item}>
        <div className={classes.item_img}>
          <img src={process.env.REACT_APP_BASE_URL + image} alt="armchair" />
          <div className={classes.img_mask}></div>
        </div>
        <div className={classes.item_text}>
          <div className={classes.item_name}>{name}</div>
          <div className={classes.item_coast}>{cost} ₽</div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
