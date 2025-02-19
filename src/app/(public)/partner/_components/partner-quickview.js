import { CustomChip } from '@/components/core/custom-chip';
import { SectionTitle } from '@/components/core/section-title';
import { Iconify } from '@/components/iconify/iconify';
import { IconWithoutText } from '@/components/utils/icon-text';
import { isSupabaseUrl, pxToRem } from '@/utils/helper';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { SocialIconWithRedirectionUrl, SocialIconWithText } from './partner-gridview';

export const PartnerQuickView = ({ data }) => {
  return (
    <Stack spacing={2}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src={
            isSupabaseUrl(data.profile_image)
              ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${data.profile_image}`
              : data.profile_image
          }
          sx={{
            width: pxToRem(500),
            height: '100%',
            objectFit: 'cover',
            borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
            border: '1px solid var(--mui-palette-divider)',
          }}
        />

        <Stack
          direction={'row'}
          spacing={0.5}
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            zIndex: 2,
            boxShadow: 1,
          }}
        >
          <CustomChip label={'Live_Campaign'} color={'primary'} height="18px" />
          <CustomChip label={'Client_Status'} color={'primary'} />
          <CustomChip label={'client'} color={'primary'} />
        </Stack>
      </Box>
      <Typography fontSize={{ xs: '22px', md: '26px' }} fontWeight={800}>
        {data?.name}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        divider={<Iconify icon="pepicons-pop:line-y" sx={{ color: 'grey.300' }} />}
      >
        <Typography fontSize="14px">303M</Typography>
        <Typography fontSize="14px">Hourly Rate: $202</Typography>
        <Typography fontSize="14px">partner_360_rate: $202</Typography>
        <Typography fontSize="14px">$202</Typography>
        {data?.occupation && <CustomChip label={data?.occupation} color={'primary'} />}
      </Stack>

      {/* Contact Info */}
      <Stack direction={'row'} spacing={2}>
        <SocialIconWithRedirectionUrl icon="mage:email" url={`mailto:${data?.email}`} text={data?.email} />
        <SocialIconWithRedirectionUrl icon="solar:phone-outline" url={`tel:${data?.phone}`} text={data?.phone} />
        <IconWithoutText icon="mynaui:globe" value={'www.example.com'} type={'url'} />
        <IconWithoutText icon="ri:drive-fill" value={'https://www.instagram.com'} type={'url'} />
        <IconWithoutText icon="ri:amazon-fill" value={'www.example.com'} type={'url'} />
      </Stack>

      {/* Social Media Stats */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {data?.instagram && (
          <SocialIconWithText
            icon="hugeicons:instagram"
            url={data?.instagram}
            text={`${data?.instagram_following.toLocaleString()} Followers`}
            value={`$${data?.partner_IG_rate}`}
          />
        )}
        {data?.tiktok && (
          <SocialIconWithText
            icon="hugeicons:tiktok"
            url={data?.tiktok}
            text={`${data?.tiktok_following.toLocaleString()} Followers`}
            value={`$${data?.partner_TT_rate}`}
          />
        )}
        {data?.youtube && (
          <SocialIconWithText
            icon="hugeicons:youtube"
            url={data?.youtube}
            text={`${data?.youtube_following.toLocaleString()} Subscribers`}
            value={`$${data?.partner_YT_rate}`}
          />
        )}
        {data?.x && (
          <SocialIconWithText
            icon="hugeicons:new-twitter-ellipse"
            url={data?.x}
            text={`${data?.x_following.toLocaleString()} Followers`}
            value={'N/A'}
          />
        )}
        {data?.facebook && (
          <SocialIconWithText
            icon="mingcute:facebook-line"
            url={data?.facebook}
            text={`${data?.facebook_following.toLocaleString()} Followers`}
            value={'N/A'}
          />
        )}
        {data?.pinterest && (
          <SocialIconWithText
            icon="hugeicons:pinterest"
            url={data?.pinterest}
            text={`${data?.pinterest_following.toLocaleString()} Followers`}
            value={'N/A'}
          />
        )}
        {data?.snapchat && (
          <SocialIconWithText
            icon="hhugeicons:snapchat"
            url={data?.snapchat}
            text={`${data?.snapchat_following.toLocaleString()} Followers`}
            value={'N/A'}
          />
        )}
        {data?.linkedin && (
          <SocialIconWithText
            icon="circum:linkedin"
            url={data?.linkedin}
            text={`${data?.linkedin_following.toLocaleString()} Followers`}
            value={'N/A'}
          />
        )}
      </Box>

      <Grid container spacing={2}>
        {/* Personal Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionTitle title="Personal Info" />
          <Stack spacing={1} mt={1}>
            <Typography variant="body2">
              <strong>State:</strong> {data?.state || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Country:</strong> {data?.country || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>City:</strong> {data?.city || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Mailing Address:</strong> {data?.mailing_address || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Website:</strong>{' '}
              <a href={data?.website} target="_blank" rel="noopener noreferrer">
                {data?.website}
              </a>
            </Typography>
            <Typography variant="body2">
              <strong>Age Range:</strong> {data?.age_bracket || 'N/A'}
            </Typography>
          </Stack>
        </Grid>
        {/* contract info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionTitle title="Contract Info" />
          <Stack spacing={1} mt={1}>
            <Typography variant="body2">
              <strong>Contract:</strong> {data?.contract}
            </Typography>
            <Typography variant="body2">
              <strong>Profile Category:</strong> {data?.profile_category}
            </Typography>
            <Typography variant="body2">
              <strong>Stakeholder:</strong> {data?.stakeholder}
            </Typography>
            <Typography variant="body2">
              <strong>Total Audience:</strong> {data?.total_audience?.toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>Products:</strong> {data?.products || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Contributed Campaigns:</strong> {data?.contributed_campaigns || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Live Campaign:</strong> {data?.live_campaign || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Open to Gifting:</strong> {data?.open_to_gifting ? 'Yes' : 'No'}
            </Typography>
            <Typography variant="body2">
              <strong>Open to Whitelisting:</strong> {data?.open_to_whitelisting ? 'Yes' : 'No'}
            </Typography>
          </Stack>
        </Grid>
        {/* other info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionTitle title="Other Info" />
          <Stack spacing={1} mt={1}>
            <Typography variant="body2">
              <strong>Source:</strong> {data?.sourced_from}
            </Typography>
            {data?.payment_link && (
              <Typography variant="body2">
                <strong>Payment Link:</strong> {data?.payment_link}
              </Typography>
            )}
            {data?.tags && (
              <Typography variant="body2">
                <strong>Tags:</strong>{' '}
                {data?.tags?.map((tag) => (
                  <CustomChip key={tag} label={tag} height="18px" variant={'soft'} fontSize="14px" />
                ))}
              </Typography>
            )}
            {data?.note && (
              <Typography variant="body2">
                <strong>Note:</strong> {data?.note}
              </Typography>
            )}
            {data?.podcast && (
              <Typography variant="body2">
                <strong>Podcast:</strong> {data?.podcast}
              </Typography>
            )}
            {data?.refusal_reason && (
              <Typography variant="body2">
                <strong>Refusal Reason:</strong> {data?.refusal_reason}
              </Typography>
            )}
          </Stack>
        </Grid>
        {/* amazon info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionTitle title="Amazon Info" />
          <Stack spacing={1} mt={1}>
            {data?.revo_amazon_order_confirmation_number && (
              <Typography variant="body2">
                <strong>Amazon order confirmation no:</strong> {data?.revo_amazon_order_confirmation_number}
              </Typography>
            )}
            {data?.amazon_review_link && (
              <Typography variant="body2">
                <strong>Amazon review link:</strong>{' '}
                <a href={data?.amazon_review_link} target="_blank" rel="noopener noreferrer">
                  {data?.amazon_review_link}
                </a>
              </Typography>
            )}
            {data?.amazon_review_cupper && (
              <Typography variant="body2">
                <strong>Amazon review cupper:</strong> {data?.amazon_review_cupper}
              </Typography>
            )}
            {data?.amazon_review_the_pill && (
              <Typography variant="body2">
                <strong>Amazon review pill:</strong> {data?.amazon_review_the_pill}
              </Typography>
            )}
            {data?.amazon_storefront && (
              <Typography variant="body2">
                <strong>Amazon storefront:</strong> {data?.amazon_storefront}
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
