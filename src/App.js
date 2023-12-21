import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/registarationPage/Registration";
import Main from "./pages/mainPage/Main";
import Catalog from "./pages/catalogPage/Catalog";
import Basket from "./pages/basketPage/Basket";
import Account from "./pages/accountPage/Account";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Context } from "./index";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import BurgerMenuBlock from "./components/BurgerMenu/BurgerMenuBlock/BurgerMenuBlock";
import ArmchairPage from "./pages/productPages/ArmchairPage";
import ChairPage from "./pages/productPages/ChairPage";
import BedPage from "./pages/productPages/BedPage";
import ClosetPage from "./pages/productPages/ClosetPage";
import SofaPage from "./pages/productPages/SofaPage";
import TablePage from "./pages/productPages/TablePage";

const App = observer(() => {
  const { users } = useContext(Context);
  return (
    <div>
      <BrowserRouter className="wrapper">
        <Header />
        <BurgerMenuBlock />
        <main className="main">
          <Routes>
            <Route path="/catalog" element={<Catalog />} />
            {!users.loggedIn && (
              <Route path="/registration" element={<Registration />} />
            )}
            {users.loggedIn && <Route path="/account" element={<Account />} />}
            <Route path="/basket" element={<Basket />} />
            <Route path="*" element={<Main />} />
            <Route path="/catalog/bed" element={<BedPage />} />
            <Route path="/catalog/sofa" element={<SofaPage />} />
            <Route path="/catalog/closet" element={<ClosetPage />} />
            <Route path="/catalog/chair" element={<ChairPage />} />
            <Route path="/catalog/armchair" element={<ArmchairPage />} />
            <Route path="/catalog/table" element={<TablePage />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </div>
  );
});

export default App;
