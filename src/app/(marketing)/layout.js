'use client';
import * as React from 'react';
import { Footer } from '@/components/navbar/footer';
import { MainNav } from '@/components/navbar/main-nav';
import { dashboardItems } from '@/router';
import { Container } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';

import { Breadcrumbs } from './bredcrumbs';
import { PublicSideNav } from './side-nav';
import { FeatureCards } from './top-cards';

export default function Layout({ children }) {
  const [openSideNav, setOpenSideNav] = React.useState(true);

  // function to handle screen size change
  const handleResize = () => {
    if (window.innerWidth <= 1025) {
      setOpenSideNav(false);
    } else {
      setOpenSideNav(true);
    }
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '52px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': openSideNav ? '265px' : '0',
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
        <Breadcrumbs />
        <FeatureCards />
        {/* Toggleable SideNav */}
        {openSideNav && <PublicSideNav items={dashboardItems} />}
        <main
          style={{
            minHeight: 'calc(100vh - 360px)',
            marginLeft: openSideNav ? '265px' : '0',
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
