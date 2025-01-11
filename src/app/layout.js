import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import '/src/styles/global.css';

import { Analytics } from '/src/components/core/analytics';
import { I18nProvider } from '/src/components/core/i18n-provider';
import { LocalizationProvider } from '/src/components/core/localization-provider';
import { SettingsButton } from '/src/components/core/settings/settings-button';
import { ThemeProvider } from '/src/components/core/theme-provider/theme-provider';
import { Toaster } from '/src/components/core/toaster';
import { config } from '/src/config';
import { UserProvider } from '/src/contexts/auth/user-context';
import { SettingsProvider } from '/src/contexts/settings';
import { applyDefaultSettings } from '/src/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '/src/lib/settings/get-settings';
import { AuthProvider } from '/src/contexts/auth/AuthContext';
import { Progressbar } from '/src/components/utils/Progressbar';

export const metadata = { title: config.site.name };

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: config.site.themeColor,
};

export default async function Layout({ children }) {
  const settings = applyDefaultSettings(await getPersistedSettings());

  return (
    <html lang={settings.language} suppressHydrationWarning>
      <body>
        <AuthProvider>

          <InitColorSchemeScript attribute="class" />
          <Analytics>
            <LocalizationProvider>
              <UserProvider>
                <SettingsProvider settings={settings}>
                  <I18nProvider lng={settings.language}>
                    <ThemeProvider>
                      <Progressbar />
                      {children}
                      <SettingsButton />
                      <Toaster position="top-right" />
                    </ThemeProvider>
                  </I18nProvider>
                </SettingsProvider>
              </UserProvider>
            </LocalizationProvider>
          </Analytics>

        </AuthProvider>
      </body>
    </html>
  );
}
