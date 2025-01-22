import { ProfileView } from '@/app/(marketing)/profile/profile-view';
import { config } from '@/config';


export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <>
      <ProfileView />
    </>
  );
}
