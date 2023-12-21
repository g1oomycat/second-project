import React, { useContext, useEffect, useState } from "react";
import Title from "../../components/title/Title";
import classes from "./productPages.module.scss";
import { observer } from "mobx-react-lite";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../API/productsAPI";
import PopupAdmin from "../../components/popupAdmin/PopupAdmin";
import { Context } from "../..";
const ChairPage = observer(() => {
  const { users } = useContext(Context);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductsFromServer();
  }, []);
  const getProductsFromServer = async () => {
    try {
      const response = await getProducts(2);
      setProducts(response.data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className={classes.product}>
      {users.user.role && <PopupAdmin id_category={2} />}
      <section className={classes.product_catalog}>
        <div className={`${classes.product_cont} _cont_limit`}>
          <Title title_text={"Стулья"} />
          <div className={classes.catalog_body}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id_product={product.id}
                name={product.name}
                image={product.img}
                cost={product.price}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export default ChairPage;
