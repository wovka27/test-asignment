import { makeAutoObservable } from 'mobx';

export default class EntityDetailsStore<Data> {
  public data: Data | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setData = (data: Data): void => {
    this.data = data;
  };
}
