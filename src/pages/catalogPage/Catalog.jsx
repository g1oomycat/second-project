import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import classes from "./Catalog.module.scss";
import Title from "../../components/title/Title";
import CatalogCard from "../../components/CatalogCards/CatalogCard";
import { getCategories } from "../../API/categoriesApi";

const Catalog = observer(() => {
  const [categories, setСategories] = useState([]);
  useEffect(() => {
    getСategoriesFromServer();
  }, []);
  const getСategoriesFromServer = async () => {
    try {
      const response = await getCategories();
      setСategories(response.data);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className={classes.catalog}>
      <section className={classes.catalog_catalog}>
        <div className={`${classes.catalog_cont} _cont_limit`}>
          <Title title_text={"Каталог"} />
          <div className={classes.catalog_body}>
            {categories.map((category) => (
              <CatalogCard
                key={category.id}
                name={category.name}
                image={category.img}
                link={category.link}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

export default Catalog;
