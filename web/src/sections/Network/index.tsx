import React, { useState } from 'react';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18not';
import { IoClipboard, IoCloseCircle } from 'react-icons/io5';

import styles from './index.module.scss';
import { Network } from '../../components/Network.js';
import { applicationStore, networkStore } from '../../stores/index.js';
import { LocalNetworks } from '../LocalNetworks/index.js';
import { Button } from '../../components/Button.js';
import { Toggle } from '../../components/Toggle.js';
import { readClipboardFiles } from '../../utils/clipboard.js';

export const NetworkSection: React.FC = observer(() => {
  const clients = networkStore.clients;
  const transfers = networkStore.transfers;
  const { t } = useTranslation();
  const [isPaste, setPaste] = useState(window.location.hash === '#paste');
  const showPaste = applicationStore.showPaste;
  const sendFromClipboard = isPaste && showPaste;

  return (
    <>
      {!!networkStore.networkError && (
        <div className="subsection error">
          <IoCloseCircle /> {t(`error.network.${networkStore.networkError}`)}
        </div>
      )}
      <div className="subsection">
        {clients.length > 0 ? (
          <>
            {showPaste && (
              <div className={styles.clipboardToggle}>
                <Toggle
                  label={t('sendFromClipboard')}
                  value={isPaste}
                  onChange={setPaste}
                />
              </div>
            )}
            <Network
              icon={sendFromClipboard ? <IoClipboard /> : undefined}
              onSelect={
                sendFromClipboard
                  ? async clientId => {
                      try {
                        const files = await readClipboardFiles();
                        for (const file of files) {
                          networkStore.createTransfer(file, clientId);
                        }
                      } catch {}
                    }
                  : undefined
              }
            />
          </>
        ) : (
          <>
            <div className={styles.empty}>
              <div>
                <div>{t('emptyNetwork.title')}<br /> {t('emptyNetwork.body')}</div>
                {!!networkStore.otherNetworks?.length && (
                  <div>{t('emptyNetwork.local')}</div>
                )}
              </div>
              <div className="desktopHidden">
                <Button onClick={() => applicationStore.setTab('connect')}>
                  {t('emptyNetwork.qr')}
                </Button>
              </div>
              <div className="mobileHidden">
                <Button onClick={() => applicationStore.openModal('connect')}>
                  {t('emptyNetwork.qr')}
                </Button>
              </div>
            </div>
            <LocalNetworks />
          </>
        )}
      </div>
	{/* show always CTRL-V Hint */}
    {/* {clients.length > 0 && transfers.size === 0 && !showPaste && ( */}
        <div className={clsx('mobileHidden', styles.hint)}>
          {t('desktopHint')}
        </div>
    {/* )} */}
    </>
  );
});
