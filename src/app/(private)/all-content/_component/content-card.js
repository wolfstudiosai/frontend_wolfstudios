import { IconText } from '@/components/utils/icon-text';
import { Avatar, Box, Card, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const ContentCard = ({ content, handleOpenRightPnale }) => {
  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
        cursor: 'pointer',
      }}
      onClick={() => handleOpenRightPnale(content)}
    >
      <Box
        component="img"
        src="https://images.pexels.com/photos/1839963/pexels-photo-1839963.jpeg?cs=srgb&dl=pexels-abir-hasan-912465-1839963.jpg&fm=jpg"
        alt="demo image"
        sx={{ width: '100%', height: '260px', objectFit: 'cover' }}
      />
      <Stack direction="column" justifyContent="space-between" gap={2} sx={{ p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h5">{content.title}</Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar />
            <Box>
              <Typography variant="subtitle2">{content.stakeholder}</Typography>
              <Stack>
                <IconText icon="solar:calendar-linear" text={dayjs(content?.created_at).format('MMM D, YYYY')} />
              </Stack>
            </Box>
          </Stack>
          <Typography variant="body2">{content.posting_quality}</Typography>
          <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap' }}>
            {content?.product &&
              content?.product.split(',').map((tag) => <Chip key={tag} size="small" variant="soft" label={tag} />)}
          </Stack>
        </Stack>
        <Stack direction={'row'} gap={2}>
          <IconText icon="hugeicons:instagram" text={content.IG_view} />
          <IconText icon="hugeicons:youtube" text={content.partner_YT_view} />
          <IconText icon="basil:pinterest-outline" text={content.pinterest_view} />
        </Stack>
      </Stack>
    </Card>
  );
};
