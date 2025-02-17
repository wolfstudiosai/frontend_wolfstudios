import { Box, Stack, Typography } from '@mui/material';

import { SocialIconWithRedirectionUrl, SocialIconWithText } from './partner-gridview';

export const PartnerQuickView = ({ data }) => {
  return (
    <Stack>
      <Typography fontSize={{ xs: '22px', md: '26px' }} fontWeight={800}>
        {data?.name}
      </Typography>
      <Stack direction={'row'} gap={4} mt={1}>
        <SocialIconWithRedirectionUrl icon="mage:email" url={data?.email} text={data?.email} />
        <SocialIconWithRedirectionUrl icon="solar:phone-outline" url={data?.phone} text={data?.phone} />
        <SocialIconWithRedirectionUrl icon="ic:outline-whatsapp" url={data?.phone} text={data?.whatsapp} />
      </Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, mt: 1 }}>
        <SocialIconWithText icon="hugeicons:instagram" url={'https://www.instagram.com/'} text="100K" value={'400$'} />
        <SocialIconWithText icon="hugeicons:youtube" url={'https://www.instagram.com/'} text="100K" value={'400$'} />
        <SocialIconWithText
          icon="mingcute:facebook-line"
          url={'https://www.instagram.com/'}
          text="100K"
          value={'400$'}
        />
        <SocialIconWithText
          icon="hugeicons:new-twitter-ellipse"
          url={'https://www.instagram.com/'}
          text="100K"
          value={'400$'}
        />
        <SocialIconWithText icon="circum:linkedin" url={'https://www.instagram.com/'} text="100K" value={'400$'} />
        <SocialIconWithText icon="hugeicons:pinterest" url={'https://www.instagram.com/'} text="100K" value={'400$'} />
      </Box>
    </Stack>
  );
};
