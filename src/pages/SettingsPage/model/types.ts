export interface SubscriptionApi {
  plan: string;
  status: boolean;
  renewal_date: string;
}

export interface SecurityApi {
  two_factor_enabled: boolean;
  last_password_change: string;
  login_alerts: boolean;
}

export interface NotificationsApi {
  email_notifications: boolean;
  sms_notifications: boolean;
  push_notifications: boolean;
}

export interface PreferencesApi {
  language: string;
  time_zone: string;
  theme: string;
}

export interface ISettingsApi {
  subscription: SubscriptionApi;
  security: SecurityApi;
  notifications: NotificationsApi;
  preferences: PreferencesApi;
}
