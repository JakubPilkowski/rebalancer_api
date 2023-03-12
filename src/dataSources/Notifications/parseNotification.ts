import { Notification } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { INotificationDocument } from 'models/NotificationModel';

export default function parseNotification(document: INotificationDocument): Notification {
  const { daysBeforeNotify } = document;
  return {
    ...parseApiNodeAttributes(document),
    daysBeforeNotify,
  };
}
