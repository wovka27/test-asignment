import type { ISettingsApi } from '@pages/SettingsPage/model/types.ts';

import type { ICompany } from '@entities/companies/model';
import type { IContact } from '@entities/contacts/model';

export interface IEntityDetailsLoaderResponse<T> {
  payload: IEntityDetailsLoaderPayload<T>;
}
export interface IEntityDetailsLoaderPayload<T> {
  details: T;
  contacts?: IContact;
}

type EntityComponentFormProps<T> = {
  setState: (v: boolean) => void;
  initialState: T;
};

export type EntityComponentFormPropsMap = {
  contacts: EntityComponentFormProps<IContact>;
  company: EntityComponentFormProps<ICompany>;
  settingsSubscription: EntityComponentFormProps<ISettingsApi['subscription']>;
  settingsSecurity: EntityComponentFormProps<ISettingsApi['security']>;
  settingsNotification: EntityComponentFormProps<ISettingsApi['notifications']>;
  settingsPreferences: EntityComponentFormProps<ISettingsApi['preferences']>;
};

export type EntityComponentFormRegistry = {
  [K in keyof EntityComponentFormPropsMap]: React.FC<EntityComponentFormPropsMap[K]>;
};
