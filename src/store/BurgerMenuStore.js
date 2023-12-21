import { makeAutoObservable } from "mobx";

class BurgerMenuStore {
  _isOpen = false;
  _isOpenProducts = false;
  constructor() {
    makeAutoObservable(this);
  }
  setIsOpen(isOpen) {
    this._isOpen = isOpen;
  }
  get isOpen() {
    return this._isOpen;
  }
  setIsOpenProducts(isOpenProducts) {
    this._isOpenProducts = isOpenProducts;
  }
  get isOpenProducts() {
    return this._isOpenProducts;
  }
}

export default BurgerMenuStore;
