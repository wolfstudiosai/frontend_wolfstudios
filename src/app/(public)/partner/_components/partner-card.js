import React from 'react';
import { Box, Button, Divider, MenuItem, MenuList, Popover, Stack, Typography } from '@mui/material';

import { CustomChip } from '/src/components/core/custom-chip';
import { Iconify } from '/src/components/iconify/iconify';
import { IconWithoutText } from '/src/components/utils/icon-text';

import { ManagePartnerRightPanel } from './manage-partner-right-panel';
import { formatCompactNumber, formatViewCount, isSupabaseUrl } from '/src/utils/helper';

export const PartnerCard = ({ item, fetchList }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = React.useState(null);
  const handleOpenAddToPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddToPopover = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        border: '1px solid var(--mui-palette-divider)',
        overflow: 'hidden',
        boxShadow: 2,
        bgcolor: 'background.paper',
        width: { xs: '100%', sm: '350px', md: '380px', lg: '408px' },
        maxWidth: '100%',
      }}
    >
      <Box
        component="div"
        sx={{
          width: '100%',
          height: { xs: '100%', sm: '250px', md: '280px' },
          objectFit: 'cover',
          borderBottom: '1px solid var(--mui-palette-divider)',
        }}
      >
        <Box
          component="img"
          src={item?.ProfileImage?.at(0) ?? '/assets/image-placeholder.jpg'}
          alt={item?.Name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderBottom: '1px solid var(--mui-palette-divider)',
          }}
          onClick={() => setOpenPartnerRightPanel(item)}
        />
      </Box>

      <Box sx={{ p: 1.5 }}>
        {/* Username and stats */}
        <Stack direction="row" spacing={0.5} justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: '16px', sm: '18px', md: '20px' },
              fontWeight: 700,
              color: 'text.primary',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {item?.Name ? item?.Name : 'N/A'}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {formatCompactNumber(item?.TotalAudience)}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {'$' + formatCompactNumber(item?.HourlyRate)}
            </Typography>
          </Stack>
        </Stack>

        {/* <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Audience: {formatCompactNumber(item?.TotalAudience)}
          </Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Rate: {'$' + formatCompactNumber(item?.HourlyRate)} h
          </Typography>
        </Stack> */}

        {/* Contact icons */}
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 1.5, md: 2 }}
          sx={{ my: 1.5 }}
          justifyContent={{ xs: 'space-between', sm: 'flex-start' }}
        >
          <IconWithoutText icon="mage:email" value={item?.Email} type={'email'} />
          <IconWithoutText icon="proicons:call" value={item?.Phone} type={'phone'} />
          <IconWithoutText icon="mynaui:globe" value={item?.Website} type={'url'} />
          <IconWithoutText icon="ri:drive-fill" value={item?.GoogleDriveFiles} type={'url'} />
          <IconWithoutText icon="ri:amazon-fill" value={item?.AmazonReviewLink} type={'url'} />
        </Stack>

        {/* Profile status chips */}
        {/* {item?.ProfileStatus.length > 0 && (
          <Stack direction={'row'} gap={1} sx={{ mb: 1 }}>
            {item?.ProfileStatus && <CustomChip key="item" label={item.ProfileStatus?.at(0)} variant="soft" />}
          </Stack>
        )} */}

        {/* Add to button */}
        <Box sx={{ mb: 1 }}>
          <Button
            endIcon={<Iconify icon="icon-park-solid:down-one" />}
            variant="text"
            onClick={handleOpenAddToPopover}
            size="small"
            sx={{ textTransform: 'none', px: 2, padding: '0' }}
          >
            Add to
          </Button>
        </Box>

        {/* Products, Proposed, Contributed */}
        {/* <Stack spacing={1} sx={{ mt: 1 }}>
          {item?.ByProductPartnerHQ?.length > 0 && (
            <Stack direction="row" alignItems="flex-start">
              <Typography fontSize={{ xs: '13px', sm: '14px' }} fontWeight={500} minWidth={{ xs: '80px', sm: '90px' }}>
                Products:
              </Typography>
              <Box sx={{ flex: 1 }}>
                {item.ByProductPartnerHQ.map((product) => (
                  <CustomChip
                    key={product?.ByProduct?.Name}
                    label={product?.ByProduct?.Name}
                    variant="soft"
                    fontSize="11px"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </Stack>
          )}
          {item?.ByCampaignsProposedPartners?.length > 0 && (
            <Stack direction="row" alignItems="flex-start">
              <Typography fontSize={{ xs: '13px', sm: '14px' }} fontWeight={500} minWidth={{ xs: '80px', sm: '90px' }}>
                Proposed:
              </Typography>
              <Box sx={{ flex: 1 }}>
                {item.ByCampaignsProposedPartners.map((item) => (
                  <CustomChip
                    key={item?.ByCampaigns?.Name}
                    label={item?.ByCampaigns?.Name}
                    variant="soft"
                    fontSize="11px"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </Stack>
          )}
          {item?.contributed_campaigns && item.contributed_campaigns.trim() !== '' && (
            <Stack direction="row" alignItems="flex-start">
              <Typography fontSize={{ xs: '13px', sm: '14px' }} fontWeight={500} minWidth={{ xs: '80px', sm: '90px' }}>
                Contributed:
              </Typography>
              <Box sx={{ flex: 1 }}>
                {item.contributed_campaigns.split(',').map((item) => (
                  <CustomChip key={item} label={item} variant="soft" fontSize="12px" sx={{ mr: 1, mb: 1 }} />
                ))}
              </Box>
            </Stack>
          )}
        </Stack> */}

        {/* Social Media Stats */}
        {/* <Divider sx={{ my: 2 }} /> */}
        {/* <Stack direction="row" flexWrap="wrap">
          {[
            item?.Instagram && (
              <SocialInfo
                icon="hugeicons:instagram"
                follower={formatCompactNumber(item?.InstagramFollowing)}
                url={item?.Instagram}
                rate={item?.PartnerIGRate ? formatCompactNumber(item.PartnerIGRate) : undefined}
              />
            ),
            item?.Youtube && (
              <SocialInfo
                icon="hugeicons:youtube"
                follower={formatCompactNumber(item?.YoutubeFollowing)}
                url={item?.Youtube}
                rate={item?.PartnerYTRate ? formatCompactNumber(item?.PartnerYTRate) : undefined}
              />
            ),
            item?.Facebook && (
              <SocialInfo
                icon="mingcute:facebook-line"
                follower={formatCompactNumber(item?.FacebookFollowing)}
                url={item?.Facebook}
                rate={item?.PartnerFBRate ? formatCompactNumber(item?.PartnerFBRate) : undefined}
              />
            ),
            item?.X && (
              <SocialInfo
                icon="hugeicons:new-twitter-ellipse"
                follower={formatCompactNumber(item?.XFollowing)}
                url={item?.X}
                rate={item?.PartnerTTRate ? formatCompactNumber(item?.PartnerTTRate) : undefined}
              />
            ),
            item?.Pinterest && (
              <SocialInfo
                icon="hugeicons:pinterest"
                follower={formatCompactNumber(item?.PinterestFollowing)}
                url={item?.Pinterest}
                rate={item?.PartnerPInterestRate ? formatCompactNumber(item?.PartnerPInterestRate) : undefined}
              />
            ),
            item?.LinkedIn && (
              <SocialInfo
                icon="mingcute:linkedin-line"
                follower={formatCompactNumber(item?.LinkedInConnections)}
                url={item?.LinkedIn}
                rate={item?.PartnerLinkedinRate ? formatCompactNumber(item?.PartnerLinkedinRate) : undefined}
              />
            ),
          ]
            .filter(Boolean)
            .map((component, index, array) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {component}
                {index < array.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      borderColor: 'grey.400',
                      mx: 1.2,
                      borderRightWidth: 2,
                      visibility: 'visible !important',
                      height: '20px',
                    }}
                  />
                )}
              </Box>
            ))}
        </Stack> */}
      </Box>

      {/* Popover for "Add to" button */}
      <Popover
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorEl)}
        onClose={handleCloseAddToPopover}
        anchorEl={anchorEl}
      >
        <MenuList sx={{ minWidth: '160px' }}>
          <MenuItem>
            <Typography>Partner</Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Typography>Partner</Typography>
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Right Panel Component */}
      <ManagePartnerRightPanel
        view="QUICK"
        fetchList={fetchList}
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      />
    </Box>
  );
};

const SocialInfo = ({ sx, icon, follower, rate, url }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [iframeError, setIframeError] = React.useState(false);
  const isInstagram = icon === 'hugeicons:instagram';

  const handlePopoverOpen = (event) => {
    if (isInstagram) {
      setAnchorEl(event.currentTarget);
      setIframeError(false);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleRedirect = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <>
      <Stack direction="row" gap={1} alignItems="center" sx={{ color: 'text.secondary', ...sx }}>
        <Iconify
          icon={icon}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{
            width: 22,
            height: 22,
            cursor: 'pointer',
            color: 'text.primary',
            '&:hover': { color: 'primary.main' },
            cursor: 'pointer',
          }}
          onClick={handleRedirect}
        />

        {rate && rate !== '0' && (
          <Stack direction="row" gap={0.5} alignItems="center">
            <Typography fontSize="14px">{follower}</Typography>
            <Typography fontSize="14px">${rate}</Typography>
          </Stack>
        )}
      </Stack>
      {isInstagram && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{
            onMouseEnter: handlePopoverOpen,
            onMouseLeave: handlePopoverClose,
            sx: { pointerEvents: 'auto', p: 1 },
          }}
          disableRestoreFocus
        >
          <Box sx={{ width: 300, height: 400 }}>
            {!iframeError ? (
              <iframe
                src={`${url}embed`}
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                onError={() => setIframeError(true)}
              />
            ) : (
              <Stack alignItems="center" justifyContent="center" sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  This profile is private or unavailable.
                </Typography>
              </Stack>
            )}
          </Box>
        </Popover>
      )}
    </>
  );
};
