import { config } from '/src/config';

import { ProfileView } from './profile-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <>
      <ProfileView />
    </>
  );
}
