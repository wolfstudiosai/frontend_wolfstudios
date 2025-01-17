'use client';
import * as React from 'react';
import { Footer } from '@/components/navbar/footer';
import { MainNav } from '@/components/navbar/main-nav';
import { dashboardItems } from '@/router';
import { Container } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';

import { PublicSideNav } from './side-nav';

export default function Layout({ children }) {
  const [openSideNav, setOpenSideNav] = React.useState(false);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '52px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': openSideNav ? '280px' : '0',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
            '--Text-primary': '#333333',
            '--Text-secondary': '#17181A9E',
          },
        }}
      />
      <div>
        <MainNav toggleSideNav={() => setOpenSideNav(!openSideNav)} />

        {/* Toggleable SideNav */}
        {openSideNav && (
          <PublicSideNav
            color="black"
            items={dashboardItems}
            style={{
              width: 'var(--SideNav-width)',
              position: 'fixed',
              top: '11%',
              left: 0,
              height: '100vh',
              transition: 'width 0.3s ease',
            }}
          />
        )}
        <main
          style={{
            minHeight: 'calc(100vh - 360px)',
            marginLeft: openSideNav ? '280px' : '0',
            transition: 'margin-left 0.3s ease',
          }}
        >
          <Container maxWidth="xxl">{children}</Container>
          <Footer />
        </main>
      </div>
    </React.Fragment>
  );
}
