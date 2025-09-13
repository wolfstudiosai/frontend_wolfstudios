import * as React from 'react';
import { CheckoutPageView } from './_components/checkout-page-view';
import { config } from '/src/config';

export const metadata = { title: `Checkout | ${config.site.name}` };

export default function Page() {
  return <CheckoutPageView />;
}
