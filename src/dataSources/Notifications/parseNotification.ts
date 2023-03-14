import { Notification } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { INotificationDocument, INotificationSubdocument } from 'models/NotificationModel';

export default function parseNotification(
  document: INotificationDocument | INotificationSubdocument
): Notification {
  const { daysBeforeNotify } = document;
  return {
    ...parseApiNodeAttributes(document),
    daysBeforeNotify,
  };
}
