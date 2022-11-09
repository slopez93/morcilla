export interface INotificationHandler {
  sendNotification(msg: string): Promise<void>;
}

export const NOTIFICATION_HANDLER = Symbol("NOTIFICATION_HANDLER");
