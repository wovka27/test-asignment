import { makeAutoObservable } from 'mobx';

export default class EntityDetailsStore<Data, FormState> {
  data: Data | null = null;
  initialFormState: FormState | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setData = (data: Data | null): void => {
    this.data = data;
  };

  setInitialFormState = (initialFormState: FormState): void => {
    this.initialFormState = initialFormState;
  };
}
