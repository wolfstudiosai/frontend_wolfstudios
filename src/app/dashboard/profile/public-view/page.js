import { ProfileView } from '/src/app/(public)/profile/profile-view';
import { config } from '/src/config';


export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <>
      <ProfileView />
    </>
  );
}
