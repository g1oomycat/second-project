import React, { useContext } from "react";
import Title from "../../components/title/Title";
import classes from "./account.module.scss";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Popup from "../../components/Popup/Popup";

const Account = observer(() => {
  const navigate = useNavigate();
  const { popup, users } = useContext(Context);
  function exitUsers() {
    users.setUser([]);
    users.setLoggedIn(false);
    // basket.delUserId();
    navigate("/main");
  }

  return (
    <div className={classes.accont}>
      <Title title_text={"Аккаунт"} />
      <Popup />
      <div className={`${classes.account_cont} _cont_limit`}>
        <div className={classes.account_body}>
          <div className={classes.accont_item}>
            <div className={classes.item_body}>
              <div className={classes.item_header}>
                <span>Профиль</span>

                <span onClick={() => popup.setPopupIsOpen(true)}>Изменить</span>
              </div>
              <div className={classes.item_main}>
                <div className={classes.item_fio_user}>
                  <span>
                    {users.user.first_name} {users.user.last_name}
                  </span>
                </div>
                <div>{users.user.email}</div>
                <div>{users.user.phone_number}</div>
                <div className={classes.item_leave}>
                  <span onClick={exitUsers}>Выйти</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.accont_item}>
            <div className={classes.item_body}>
              <div className={classes.item_header}>
                <span>Ваши бонусы</span>
                <span>История изменений </span>
              </div>
              <div className={classes.item_main}>
                <div className={classes.item_balanse}>
                  <span>
                    <SavingsOutlinedIcon /> {users.user.user_balance}
                  </span>
                  <span>Общий баланс</span>
                </div>
                <div className={classes.item_info}>
                  Если у вас возникли вопросы по бонусам и другим условиям
                  программы лояльности, напишите нам example@mail.ru или
                  позвоните по телефону +7 (888) 888-88-88
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Account;
