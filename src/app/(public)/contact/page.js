import { ComingSoon } from '/src/components/coming-soon/comming-soon';

import { config } from '/src/config';


export const metadata = { title: `Contact | ${config.site.name}` };

export default function Page() {
  return <ComingSoon pageName={'Contact'} />;
}
