import { ComingSoon } from '@/components/coming-soon/comming-soon-2';

import { config } from '/src/config';


export const metadata = { title: `Contact | ${config.site.name}` };

export default function Page() {
  return <ComingSoon pageName={'Contact'} />;
}
