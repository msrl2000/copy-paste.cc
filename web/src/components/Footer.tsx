import React from 'react';
import { useTranslation } from 'react-i18not';
import { Link } from 'wouter';
import { observer } from 'mobx-react-lite';
import clsx from 'clsx';

import styles from './Footer.module.scss';
import { applicationStore } from '../stores/index.js';

export const Footer: React.FC = observer(() => {
  const { t } = useTranslation();

  return (
    <footer className={clsx(styles.footer)}>
      <ul>
        <li>
          <Link to="/privacy">{t('sections.privacy')}</Link>
        </li>
        <li>
          <Link to="/tos">{t('sections.terms')}</Link>
        </li>
        {applicationStore.abuseEmail && (
          <li>
            <Link to="/abuse">{t('sections.abuse')}</Link>
          </li>
        )}
        <li>
          <Link to="/tech">{t('sections.tech')}</Link>
        </li>
      </ul>
    </footer>
  );
});
