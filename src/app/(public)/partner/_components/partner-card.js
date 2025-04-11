import React from 'react';
import { Box, Button, Divider, MenuItem, MenuList, Popover, Stack, Typography } from '@mui/material';

import { CustomChip } from '/src/components/core/custom-chip';
import { Iconify } from '/src/components/iconify/iconify';
import { IconWithoutText } from '/src/components/utils/icon-text';

import { ManagePartnerRightPanel } from './manage-partner-right-panel';
import { formatCompactNumber, formatViewCount, isSupabaseUrl } from '/src/utils/helper';

export const PartnerCardOld = ({ item, fetchList }) => {
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
        borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
        overflow: 'hidden',
        boxShadow: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Stack direction="row">
        <Box
          component="img"
          src={
            // isSupabaseUrl(item.profile_image)
            //   ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item.profile_image}`
            //   : item.profile_image
            item?.ProfileImage?.at(0) ?? '/'
          }
          alt={item?.Name}
          sx={{
            width: '48%',
            height: '170px',
            objectFit: 'cover',
            borderRight: '1px solid var(--mui-palette-divider)',
            borderBottom: '1px solid var(--mui-palette-divider)',
            borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
            ml: '5px',
            mt: '5px',
          }}
          onClick={() => setOpenPartnerRightPanel(item)}
        />
        <Stack sx={{ p: 2, flex: 1 }}>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            {item?.Name}
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
          <Stack direction={'row'} gap={1.5} flexWrap="wrap" sx={{ py: 1.5 }}>
            <IconWithoutText icon="mage:email" value={item?.Email} type={'email'} />
            <IconWithoutText icon="proicons:call" value={item?.Phone} type={'phone'} />
            <IconWithoutText icon="mynaui:globe" value={item?.Website} type={'url'} />
            <IconWithoutText icon="ri:drive-fill" value={item?.GoogleDriveFiles} type={'url'} />
            <IconWithoutText icon="ri:amazon-fill" value={item?.AmazonReviewLink} type={'url'} />
          </Stack>
          <Stack direction={'row'} gap={1}>
            {item?.ProfileStatus && <CustomChip key="item" label={item.ProfileStatus?.at(0)} color={'primary'} />}
          </Stack>
          <Box>
            <Button
              endIcon={<Iconify icon="icon-park-solid:down-one" />}
              variant="text"
              onClick={handleOpenAddToPopover}
              size="small"
              sx={{ textTransform: 'none', borderRadius: '8px', px: 2, padding: '0' }}
            >
              Add to
            </Button>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ px: 2 }}>
        <Stack spacing={0.5} pt={1}>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Products:
            </Typography>
            {item?.ByProductPartnerHQ?.length > 0
              ? item?.ByProductPartnerHQ?.map((product) => (
                  <CustomChip
                    key={product?.ByProduct?.Name}
                    label={product?.ByProduct?.Name}
                    variant={'soft'}
                    fontSize="12px"
                  />
                ))
              : 'N/A'}
          </Stack>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Proposed:
            </Typography>
            {item?.ByCampaignsProposedPartners?.map((item) => (
              <CustomChip
                key={item?.ByCampaigns?.Name}
                label={item?.ByCampaigns?.Name}
                variant={'soft'}
                fontSize="12px"
              />
            ))}
          </Stack>
          <Stack direction="row" flexWrap={'wrap'} gap={1} alignItems={'center'}>
            <Typography fontSize="14px" fontWeight={500}>
              Contributed:
            </Typography>
            {item?.contributed_campaigns?.split(',').map((item) => (
              <CustomChip key={item} label={item} variant={'soft'} fontSize="12px" />
            ))}
          </Stack>
        </Stack>
        <Stack direction={'row'} flexWrap={'wrap'} sx={{ mt: 1.5 }}>
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
          ] .filter(Boolean)
            .map((component, index, array) => (
              <Box key={component.key} sx={{ display: 'flex', alignItems: 'center' }}>
                {component}
                {index < array.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      borderColor: 'grey.400',
                      mx: 1.2,
                      borderRightWidth: 2,
                      visibility: 'visible !important'
                    }}
                  />
                )}
              </Box>
        ))}
        </Stack>
        <Box sx={{ mt: 2 }}>
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
        </Box>
      </Box>

      <ManagePartnerRightPanel
        view="QUICK"
        fetchList={fetchList}
        width={'50vw'}
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      />
    </Box>
  );
};

export const PartnerCard = ({ item, fetchList }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openPartnerRightPanel, setOpenPartnerRightPanel] = React.useState(null)
  const handleOpenAddToPopover = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseAddToPopover = () => {
    setAnchorEl(null)
  }
  return (
    <Box
      sx={{
        border: "1px solid var(--mui-palette-divider)",
        borderRadius: "calc(1* var(--mui-shape-borderRadius))",
        overflow: "hidden",
        boxShadow: 2,
        bgcolor: "background.paper",
        width: { xs: "100%", sm: "350px", md: "380px" },
        maxWidth: "100%",
      }}
    >
      <Box 
      component="div"
      sx={{
        width: "100%",
        height: { xs: "100%", sm: "250px", md: "280px" },
        objectFit: "cover",
        borderBottom: "1px solid var(--mui-palette-divider)",
      }}
      >
      <Box
        component="img"
        src={item?.ProfileImage?.at(0) ?? "/"}
        alt={item?.Name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderBottom: "1px solid var(--mui-palette-divider)",
        }}
        onClick={() => setOpenPartnerRightPanel(item)}
      />
      </Box>

      <Box sx={{ p: 2 }}>
        {/* Username and stats */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {item?.Name}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {formatCompactNumber(item?.TotalAudience)}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {"$" + formatCompactNumber(item?.HourlyRate)}
            </Typography>
          </Stack>
        </Stack>

        {/* Contact icons */}
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 1.5, md: 2 }}
          sx={{ my: 1.5 }}
          justifyContent={{ xs: "space-between", sm: "flex-start" }}
        >
          <IconWithoutText icon="mage:email" value={item?.Email} type={"email"} />
          <IconWithoutText icon="proicons:call" value={item?.Phone} type={"phone"} />
          <IconWithoutText icon="mynaui:globe" value={item?.Website} type={"url"} />
          <IconWithoutText icon="ri:drive-fill" value={item?.GoogleDriveFiles} type={"url"} />
          <IconWithoutText icon="ri:amazon-fill" value={item?.AmazonReviewLink} type={"url"} />
        </Stack>

        {/* Profile status chips */}
        <Stack direction={"row"} gap={1} sx={{ mb: 1 }}>
          {item?.ProfileStatus && <CustomChip key="item" label={item.ProfileStatus?.at(0)} color={"primary"} />}
        </Stack>

        {/* Add to button */}
        <Box sx={{ mb: 1 }}>
          <Button
            endIcon={<Iconify icon="icon-park-solid:down-one" />}
            variant="text"
            onClick={handleOpenAddToPopover}
            size="small"
            sx={{ textTransform: "none", borderRadius: "8px", px: 2, padding: "0" }}
          >
            Add to
          </Button>
        </Box>

        {/* Products, Proposed, Contributed */}
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="flex-start">
            <Typography fontSize={{ xs: "13px", sm: "14px" }} fontWeight={500} minWidth={{ xs: "80px", sm: "90px" }}>
              Products:
            </Typography>
            <Box sx={{ flex: 1 }}>
              {item?.ByProductPartnerHQ?.length > 0
                ? item?.ByProductPartnerHQ?.map((product) => (
                    <CustomChip
                      key={product?.ByProduct?.Name}
                      label={product?.ByProduct?.Name}
                      variant={"soft"}
                      fontSize="12px"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))
                : "N/A"}
            </Box>
          </Stack>
          <Stack direction="row" alignItems="flex-start">
            <Typography fontSize={{ xs: "13px", sm: "14px" }} fontWeight={500} minWidth={{ xs: "80px", sm: "90px" }}>
              Proposed:
            </Typography>
            <Box sx={{ flex: 1 }}>
              {item?.ByCampaignsProposedPartners?.map((item) => (
                <CustomChip
                  key={item?.ByCampaigns?.Name}
                  label={item?.ByCampaigns?.Name}
                  variant={"soft"}
                  fontSize="12px"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Stack>
          <Stack direction="row" alignItems="flex-start">
            <Typography fontSize={{ xs: "13px", sm: "14px" }} fontWeight={500} minWidth={{ xs: "80px", sm: "90px" }}>
              Contributed:
            </Typography>
            <Box sx={{ flex: 1 }}>
              {item?.contributed_campaigns?.split(",").map((item) => (
                <CustomChip key={item} label={item} variant={"soft"} fontSize="12px" sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          </Stack>
        </Stack>

        {/* Social Media Stats */}
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" flexWrap="wrap" sx={{ gap: { xs: 1, sm: 2 } }}>
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
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                {component}
                {index < array.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      borderColor: "grey.400",
                      mx: 1.2,
                      borderRightWidth: 2,
                      visibility: "visible !important",
                      height: "20px",
                    }}
                  />
                )}
              </Box>
            ))}
        </Stack>
      </Box>

      {/* Popover for "Add to" button */}
      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorEl)}
        onClose={handleCloseAddToPopover}
        anchorEl={anchorEl}
      >
        <MenuList sx={{ minWidth: "160px" }}>
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
        width={"50vw"}
        open={openPartnerRightPanel ? true : false}
        data={openPartnerRightPanel}
        onClose={() => setOpenPartnerRightPanel(false)}
      />
    </Box>
  )
}

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
          cursor: 'pointer'
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
              style={{ borderRadius: 8 }}
              onError={() => setIframeError(true)} 
            />
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: '100%', textAlign: 'center', p: 2 }}
            >
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
