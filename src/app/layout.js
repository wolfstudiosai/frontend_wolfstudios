import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import '/src/styles/global.css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SessionProvider } from 'next-auth/react';

import { config } from '/src/config';
import { applyDefaultSettings } from '/src/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '/src/lib/settings/get-settings';
import { AuthProvider } from '/src/contexts/auth/AuthContext';
import { UserProvider } from '/src/contexts/auth/user-context';
import { ChatProvider } from '/src/contexts/chat';
import { SettingsProvider } from '/src/contexts/settings';
import { SocketProvider } from '/src/contexts/socket';
import { Analytics } from '/src/components/core/analytics';
import { I18nProvider } from '/src/components/core/i18n-provider';
import { LocalizationProvider } from '/src/components/core/localization-provider';
import { ThemeProvider } from '/src/components/core/theme-provider/theme-provider';
import { Toaster } from '/src/components/core/toaster';
import { Progressbar } from '/src/components/utils/Progressbar';

import { LayoutView } from '../components/layout/layout-view';
import RouteLoader from '../components/loaders/route-loader';
import { AuthGuard } from '/src/app/auth/guard/auth-guard';

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
        <SessionProvider>
          <AuthProvider>
            <InitColorSchemeScript attribute="class" />
            <Analytics>
              <LocalizationProvider>
                <UserProvider>
                  <SettingsProvider settings={settings}>
                    <I18nProvider lng={settings.language}>
                      <ThemeProvider>
                        <Progressbar />
                        <AuthGuard>
                          <SocketProvider>
                            <ChatProvider>
                              <LayoutView>
                                <RouteLoader />
                                {children}
                              </LayoutView>
                            </ChatProvider>
                          </SocketProvider>
                        </AuthGuard>
                        {/* <SettingsButton /> */}
                        <Toaster position="bottom-right" />
                      </ThemeProvider>
                    </I18nProvider>
                  </SettingsProvider>
                </UserProvider>
              </LocalizationProvider>
            </Analytics>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
