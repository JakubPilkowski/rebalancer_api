import { WalletSettings } from 'generated/graphql';

import parseApiNodeAttributes from 'core/parseApiNodeAttributes';

import { IWalletSettingsDocument, IWalletSettingsSubdocument } from 'models/WalletSettingsModel';

export default function parseWalletSettings(
  document: IWalletSettingsDocument | IWalletSettingsSubdocument
): WalletSettings {
  const { hasNotificationsSilenced } = document;
  return {
    ...parseApiNodeAttributes(document),
    hasNotificationsSilenced,
  };
}
