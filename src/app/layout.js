import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import '/src/styles/global.css';

import { Analytics } from '@/components/core/analytics';
import { I18nProvider } from '@/components/core/i18n-provider';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { SettingsButton } from '@/components/core/settings/settings-button';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';
import { Toaster } from '@/components/core/toaster';
import { config } from '/src/config';
import { UserProvider } from '/src/contexts/auth/user-context';
import { SettingsProvider } from '/src/contexts/settings';
import { applyDefaultSettings } from '/src/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '/src/lib/settings/get-settings';
import { AuthProvider } from '/src/contexts/auth/AuthContext';
import { Progressbar } from '@/components/utils/Progressbar';
import { VerticalLayout } from '@/components/dashboard/layout/vertical/vertical-layout';

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
                      {/* {children} */}
                      <VerticalLayout>{children}</VerticalLayout>
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
