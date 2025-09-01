import { makeAutoObservable } from 'mobx';

export default class EntityDetailsStore<Data> {
  constructor(public data: Data) {
    makeAutoObservable(this);
  }

  public setData = (data: Data): void => {
    this.data = data;
  };
}
