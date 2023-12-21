import React, { useContext, useEffect, useState } from "react";
import classes from "./BasketCard.module.scss";
import { Add, Remove } from "@mui/icons-material";
import { observer } from "mobx-react-lite";

import { getProductsByID } from "../../API/productsAPI";
import { Context } from "../..";

const BasketCard = observer(({ id_product, oldTotal }) => {
  const { basket } = useContext(Context);
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(oldTotal);
  const getProducts = async () => {
    try {
      const response = await getProductsByID(id_product);
      setProduct(response.data[0]);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (total === 0) {
      delProduct();
    }
  }, [total]);
  function changeTotalAndPrice(value) {
    if (value) {
      basket.incrementTotal(id_product);
      let incr_total = total + 1;
      setTotal(incr_total);
      basket.sumPrice(product.price);
    } else {
      basket.dincrementTotal(id_product);
      let dincr_total = total - 1;
      setTotal(dincr_total);
      basket.minusPrice(product.price);
    }
  }
  function delProduct() {
    basket.minusPrice(total * product.price);
    basket.delBasket(id_product);
  }
  return (
    <div className={classes.left_item}>
      <div className={classes.item_img}>
        <img
          src={process.env.REACT_APP_BASE_URL + product.img}
          alt={product.name}
        />
      </div>
      <div className={classes.item_info}>
        <div className={classes.item_delete} onClick={delProduct}>
          Удалить
        </div>
        <div className={classes.item_name}>{product.name}</div>
        <div className={classes.item_discription}>{product.description}</div>
        <div className={classes.item_coast_count}>
          <div className={classes.item_count}>
            <span
              className={classes.count_button}
              onClick={() => changeTotalAndPrice(false)}
            >
              <Remove />
            </span>
            <span className={classes.count_text}>{total}</span>
            <span
              className={classes.count_button}
              onClick={() => changeTotalAndPrice(true)}
            >
              <Add />
            </span>
          </div>
          <div className={classes.item_coast}>{product.price} ₽</div>
        </div>
      </div>
    </div>
  );
});

export default BasketCard;
