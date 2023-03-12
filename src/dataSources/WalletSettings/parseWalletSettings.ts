import { WalletSettings } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IWalletSettingsDocument } from 'models/WalletSettingsModel';

export default function parseWalletSettings(document: IWalletSettingsDocument): WalletSettings {
  const { hasNotificationsSilenced } = document;
  return {
    ...parseApiNodeAttributes(document),
    hasNotificationsSilenced,
  };
}
