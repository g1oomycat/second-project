import { observer } from "mobx-react-lite";
import React from "react";
import classes from "./catalogCard.module.scss";
import { useNavigate } from "react-router-dom";

const CatalogCard = observer(({ name, image, link }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.categories_column} onClick={() => navigate(link)}>
      <div className={classes.catalog_item}>
        <div className={classes.item_img}>
          <img src={process.env.REACT_APP_BASE_URL + image} alt={name} />
        </div>
        <div className={classes.item_text}>{name}</div>
      </div>
    </div>
  );
});

export default CatalogCard;
