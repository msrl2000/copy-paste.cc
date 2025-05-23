import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18not';
import { IoQrCode, IoSettings, IoScanSharp } from 'react-icons/io5';

import styles from './index.module.scss';
import { TargetTile } from '../../components/TargetTile.js';
import { ClientName } from './ClientName.js';
import { applicationStore, networkStore } from '../../stores/index.js';
import { IconButton } from '../../components/IconButton.js';
import clsx from 'clsx';

export const YourTileSection: React.FC = observer(() => {
  const client = networkStore.currentClient;
  const { t } = useTranslation();

  return (
    <>
      <div className="subsection">
        <div className={styles.you}>
          {client ? (
            <TargetTile variant="big" client={client} />
          ) : (
            <div></div>
          )}
          <div className={styles.info}>
            <ClientName />
          </div>
          <div className={clsx(styles.actions, 'mobileHidden')}>
            <IconButton
              onClick={() => applicationStore.openModal('connect')}
              title={t('tabs.connect')}
            >
              <IoQrCode />
            </IconButton>
            <IconButton
              onClick={() => applicationStore.openModal('scan')}
              title={t('qrScanner.title')}
            >
              <IoScanSharp />
            </IconButton>
            <IconButton
              onClick={() => applicationStore.openModal('settings')}
              title={t('tabs.settings')}
            >
              <IoSettings />
            </IconButton>
          </div>

          {/* Mobile actions */}
          <div className={clsx(styles.actions, 'desktopHidden')}>
            <IconButton
              onClick={() => applicationStore.openModal('scan')}
              title="קרא QR"
            >
              <IoScanSharp />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
});
