import { CustomChip } from '@/components/core/custom-chip';
import { SectionTitle } from '@/components/core/section-title';
import { Iconify } from '@/components/iconify/iconify';
import { pxToRem } from '@/utils/helper';
import { Avatar, Box, Stack, Typography } from '@mui/material';

import { SocialIconWithRedirectionUrl, SocialIconWithText } from './partner-gridview';

export const PartnerQuickView = ({ data }) => {
  console.log(data, 'data.....');
  return (
    <Stack spacing={2}>
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8d87567db1d54b9d6b5d4_2CoCP5UkbBxnruHemWWGaYSct3ZRB8VF0-84yJknGQc-p-800.jpeg"
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
        {data?.whatsapp && (
          <SocialIconWithRedirectionUrl
            icon="ic:outline-whatsapp"
            url={`https://wa.me/${data?.phone}`}
            text={data?.whatsapp}
          />
        )}
        {data?.soundcloud && (
          <SocialIconWithRedirectionUrl icon="ri:soundcloud-fill" url={`https://wa.me/${data?.soundcloud}`} />
        )}
        {data?.spotify && (
          <SocialIconWithRedirectionUrl icon="hugeicons:spotify" url={`https://wa.me/${data?.spotify}`} />
        )}
        {data?.twitch && <SocialIconWithRedirectionUrl icon="mdi:twitch" url={data?.twitch} />}
        {data?.open_to_gifting && (
          <CustomChip label={'Open to Gifting'} color={'primary'} height="18px" variant={'soft'} />
        )}
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

      <SectionTitle title="Personal Info" />
      <Stack spacing={1}>
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

      <SectionTitle title="Contract Info" />
      <Stack spacing={1}>
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
          <strong>Total Audience:</strong> {data?.total_audience.toLocaleString()}
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

        <SectionTitle title="Other Info" />
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

        <SectionTitle title="Amazon Info" />
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
    </Stack>
  );
};
