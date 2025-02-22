import { Container } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import * as React from 'react';
import { Footer } from 'src/components/navbar/footer';
import { MainNav } from '/src/components/navbar/main-nav';

import { TopBreadcrumbs } from './breadcrumbs.js';
import { FeatureCards } from './top-cards.js';

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '52px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
            '--Text-primary': '#333333',
            '--Text-secondary': '#17181A9E',
          },
        }}
      />
      <div>
        <MainNav />
        <TopBreadcrumbs />
        <FeatureCards />
        {/* <main style={{ minHeight: "calc(100vh - 360px)" }}>{children}</main> */}
        <main style={{ minHeight: 'calc(100vh - 360px)' }}>
          <Container maxWidth="xxl">{children}</Container>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}
