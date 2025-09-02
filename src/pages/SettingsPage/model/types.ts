export interface SubscriptionApi {
  plan: string;
  status: string;
  renewal_date: string;
}

export interface SecurityApi {
  two_factor_enabled: string;
  last_password_change: string;
  login_alerts: string;
}

export interface NotificationsApi {
  email_notifications: string;
  sms_notifications: string;
  push_notifications: string;
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
