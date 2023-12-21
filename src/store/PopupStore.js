import { makeAutoObservable } from "mobx";

class PopupStore {
  _popupIsOpen = false;

  constructor() {
    makeAutoObservable(this);
  }
  setPopupIsOpen(popupIsOpen) {
    this._popupIsOpen = popupIsOpen;
  }
  get popupIsOpen() {
    return this._popupIsOpen;
  }
}

export default PopupStore;
