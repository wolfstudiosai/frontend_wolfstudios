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
        src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57d588f4b57625814b04_67014a7ff7209b375680d65a_41199266_2086471245001489_187941219047833600_n.jpeg"
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
