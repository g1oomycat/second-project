import { makeAutoObservable } from "mobx";

class RegStore {
  _registrationIsOpen = false;

  constructor() {
    makeAutoObservable(this);
  }
  setRegistrationIsOpen(registrationIsOpen) {
    this._registrationIsOpen = registrationIsOpen;
  }
  get registrationIsOpen() {
    return this._registrationIsOpen;
  }
}

export default RegStore;
