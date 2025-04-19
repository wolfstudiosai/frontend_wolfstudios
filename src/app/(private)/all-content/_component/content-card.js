import { Avatar, Box, Card, Chip, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { IconWithText } from '/src/components/utils/icon-text';

export const ContentCard = ({ content, handleOpenRightPanel }) => {
  return (
    <Card
      sx={{
        border: '1px solid var(--mui-palette-divider)',
        borderRadius: '0',
      }}
      onClick={() => handleOpenRightPanel(content)}
    >
      <Box
        component="img"
        src={content?.Image?.at(0) || '/assets/image-placeholder.jpg'}
        alt={content?.Name}
        sx={{ width: '100%', height: '260px', objectFit: 'cover' }}
      />
      <Stack direction="column" justifyContent="space-between" gap={2} sx={{ p: 2 }}>
        <Stack direction="column" spacing={2}>
          <Typography
            variant="caption"
            component="h4"
            sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'secondary.main' }}
          >
            {content?.Name}
          </Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar src={content?.ContentHQStakeholder?.at(0)?.Stakeholder?.StakeholderThumbnailImage?.at(0) || '/'} />
            <Box>
              <Typography variant="subtitle2">{content?.ContentHQStakeholder?.at(0)?.Stakeholder?.Name}</Typography>
              <Stack>
                <IconWithText icon="solar:calendar-linear" text={content?.MonthUploaded} />
              </Stack>
            </Box>
          </Stack>
          <Typography variant="body2">{content?.PostingQuality}</Typography>
          <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap' }}>
            {content?.ByProductContentHQ &&
              content?.ByProductContentHQ.map((product) => (
                <Chip key={product?.ByProduct?.Name} size="small" variant="soft" label={product?.ByProduct?.Name} />
              ))}
          </Stack>
        </Stack>
        <Stack direction={'row'} gap={2}>
          <IconWithText icon="hugeicons:instagram" text={content?.IGTotalViews} />
          <IconWithText icon="hugeicons:youtube" text={content?.YTClubREVOTotalViews} />
          <IconWithText icon="basil:pinterest-outline" text={content?.PinterestTotalViews} />
        </Stack>
      </Stack>
    </Card>
  );
};
