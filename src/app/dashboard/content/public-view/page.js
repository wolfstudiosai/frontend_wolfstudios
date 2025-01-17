import { config } from '@/config';
import { Typography } from '@mui/material';
import { ContentOverView } from '@/app/(marketing)/content/content-overview';

export const metadata = { title: `Dashboard | Content | ${config.site.name}` };

export default function Page() {
  // return (
  //   <>
  //   <Typography>
  //       Public Content page will Coming Soon...
  //   </Typography>
  //   </>
  // );
  return <ContentOverView/>
}
