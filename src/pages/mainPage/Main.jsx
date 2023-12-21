import React from "react";
import classes from "./Main.module.scss";
import bed from "../../images/bed.jpg";
import chair from "../../images/chair.jpg";
import closet from "../../images/closet.jpg";
import armchair from "../../images/armchair.jpg";
import sofa from "../../images/sofa.jpg";
import table from "../../images/table.jpg";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.main_page}>
      <section className={classes.main_block_body}>
        <div className={classes.main_image}>
          <div className={classes.main_mask}>
            <div className={`${classes.main_cont} _cont_limit`}>
              <span className={classes.main_title}>Right Furniture</span>
            </div>
          </div>
        </div>
      </section>
      <section className={classes.main_grid_catalog}>
        <div className={`${classes.main_cont} _cont_limit`}>
          <div className={classes.main_grid_title}>Популярные категории</div>
          <div className={classes.main_grid}>
            <div
              className={classes.grid_item}
              onClick={() => navigate("/catalog/sofa")}
            >
              <div className={classes.img_item}>
                <img src={sofa} alt="Диваны" />
                <div className={classes.item_mask}></div>
              </div>
              <div className={classes.name_item}>
                <span>Диваны</span>
              </div>
              <div className={classes.coast_item}>
                <span>от 5000₽</span>
              </div>
            </div>
            <div
              className={classes.grid_item}
              onClick={() => navigate("/catalog/armchair")}
            >
              <div className={classes.img_item}>
                <img src={armchair} alt="Кресла" />
                <div className={classes.item_mask}></div>
              </div>
              <div className={classes.name_item}>
                <span>Кресла</span>
              </div>
              <div className={classes.coast_item}>
                <span>от 5000₽</span>
              </div>
            </div>
            <div
              className={classes.grid_item}
              onClick={() => navigate("/catalog/bed")}
            >
              <div className={classes.img_item}>
                <img src={bed} alt="Кровати" />
                <div className={classes.item_mask}></div>
              </div>
              <div className={classes.name_item}>
                <span>Кровати</span>
              </div>
              <div className={classes.coast_item}>
                <span>от 5000₽</span>
              </div>
            </div>
            <div
              className={classes.grid_item}
              onClick={() => navigate("/catalog/table")}
            >
              <div className={classes.img_item}>
                <img src={table} alt="Столы" />
                <div className={classes.item_mask}></div>
              </div>
              <div className={classes.name_item}>
                <span>Столы</span>
              </div>
              <div className={classes.coast_item}>
                <span>от 5000₽</span>
              </div>
            </div>
            <div
              className={classes.grid_item}
              onClick={() => navigate("/catalog/chair")}
            >
              <div className={classes.img_item}>
                <img src={chair} alt="Стулья" />
                <div className={classes.item_mask}></div>
              </div>
              <div className={classes.name_item}>
                <span>Стулья</span>
              </div>
              <div className={classes.coast_item}>
                <span>от 5000₽</span>
              </div>
            </div>
            <div
              className={classes.grid_item}
              onClick={() => navigate("/catalog/closet")}
            >
              <div className={classes.img_item}>
                <img src={closet} alt="Шкафы" />
                <div className={classes.item_mask}></div>
              </div>
              <div className={classes.name_item}>
                <span>Шкафы</span>
              </div>
              <div className={classes.coast_item}>
                <span>от 5000₽ </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
