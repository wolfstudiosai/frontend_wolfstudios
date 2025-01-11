'use client';

import * as React from 'react';
import { use } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

import { logger } from '/src/lib/default-logger';
import { de } from '/src/locales/de';
import { en } from '/src/locales/en';
import { es } from '/src/locales/es';

use(initReactI18next)
  .init({
    debug: false,
    ns: Object.keys(en),
    defaultNS: 'common',
    fallbackNS: 'common',
    fallbackLng: 'en',
    resources: {
      de,
      en,
      es,
    },
  })
  .catch((err) => {
    logger.error('Failed to initialize i18n', err);
  });

export function I18nProvider({ children, lng = 'en' }) {
  const { i18n } = useTranslation();

  if (typeof window === 'undefined') {
    i18n.changeLanguage(lng).catch(() => {
      logger.error(`Failed to change language to ${lng}`);
    });
  }

  React.useEffect(() => {
    i18n.changeLanguage(lng).catch(() => {
      logger.error(`Failed to change language to ${lng}`);
    });
  }, [i18n, lng]);

  return <React.Fragment>{children}</React.Fragment>;
}
