// ./src/app/(home)/properties/page.tsx

import { config } from '/src/config';

import { NotAuthorizedView } from './not-authorized-view';

export const metadata = {
  title: `${config.site.name} | Not Authorized`,
  description: 'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertiesPage() {
  return <NotAuthorizedView />;
}
