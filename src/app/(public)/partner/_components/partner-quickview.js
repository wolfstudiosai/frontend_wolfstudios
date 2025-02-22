import { CustomChip } from '/src/components/core/custom-chip';
import { SectionTitle } from '/src/components/core/section-title';
import { Iconify } from '/src/components/iconify/iconify';
import { handleCopy, isVideoContent, pxToRem } from '/src/utils/helper';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import { SocialIconWithText } from './partner-gridview';

const mediaArr = [
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670d11d77dff7fcc24e16f1c_2_DSC03975.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6712275879e29b61d2c2dc79_DSC05709%20(1).jpg',
  'https://player.vimeo.com/progressive_redirect/playback/1008919226/rendition/1080p/file.mp4?loc=external&signature=bf4233dc5593395173302057f4757f83ccb3c307dd4c49f373ecf1e8f5d31ffb',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67023b95692662e57485fae7_1ACCCEF7-605C-4365-B7D4-5084FDC835C6_1_105_c.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6715276ce15620dc4dd4440f_12957620_1589024814746137_4884333050968345441_o.jpg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57cef550fb1eff420953_6704c33770670bf02efed363_DSC02976.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6700cebb14edd020aabfc239_66e46ffa64b6346acab2aff8_MjlmMg.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/6714acdd01014c6861e52708_DSC09507.jpg',
  'https://player.vimeo.com/progressive_redirect/playback/1008947433/rendition/1080p/file.mp4?loc=external&signature=395c363decf2b9c5efa59010005a9ccc97b2524fab8fcba75bd44be7e72e16f7',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8d1a7375ebfdf94f49c3c_H4GHJcXPb_zOb6Lw8Kx-4jALSl7doDJy2V30K63_o2g.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/67170dd5c7259b4b76267d1f_DSC00747.jpg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a2d4f4cbbc6d3e7c13aa5_DSC02474s.jpg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a0ffb65f22701e5420fe0_DSC05443.jpg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8e5f0d68063b6f16d6d55_z8pS_CpmIatuha7Fa9oHmwtlWlJy5F3v9blibpSrOkQ-p-800.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670f57d47703bf6e5069bcb3_6704c1ab0db136d6b6183dab_DSC09888.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671c9306a2d018d04d75a44c_00000.jpg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671f73189e8433871403c301_6700ce647b1bae09a801a438_101F0090-2A4F-4A34-8EA5-5A160A35AC3A_1_105_c.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a2467ecc2b689879d3288_DSC01190-p-800.jpg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/672a68398a0546bb263ef24a_IMG_2156-p-800.jpg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fcecf5793a3e5d867d6d4b_F18F2EBD-DD3E-4D35-B35F-B16E1E6AEF5D_1_105_c.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/671a166f1260d41c15c305c7_670f57d45ad541aa5f58e9a3_67040092fc0406aea44cf646_DSC08662-p-800.jpeg',
  'https://cdn.prod.website-files.com/66836d311a49ad62d048361e/670be14aa60fa816cf457054_19055002_1812151462433470_492009593312992502_o-p-500.jpeg',
];

export const PartnerQuickView = ({ data }) => {

  return (
    <Stack spacing={2}>
      <SliderWrapper
        modules={[Navigation, SwiperPagination, Scrollbar, A11y, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pauseOnHover
        // speed={2000}
        spaceBetween={10}
      >
        {mediaArr.map((item, index) => (
          <SwiperSlide key={index}>
            {isVideoContent(item) ? (
              <Box
                component="video"
                src={item}
                controls
                autoPlay
                loop
                muted
                playsInline
                sx={{
                  height: pxToRem(300),
                  width: '100%',
                  objectFit: 'contain',
                  borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                  border: '1px solid var(--mui-palette-divider)',
                }}
              />
            ) : (
              <Box
                component="img"
                src={item}
                sx={{
                  height: pxToRem(300),
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: 'calc(1* var(--mui-shape-borderRadius))',
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </SliderWrapper>
      <Stack
        direction={'row'}
        spacing={0.5}
      >
        <CustomChip label={'Live_Campaign'} color={'primary'} height="18px" />
        {
          data?.profile_status && <CustomChip label={data?.profile_status} color={'primary'} />
        }
        {
          data?.current_status && <CustomChip label={data?.current_status} color={'primary'} />
        }
      </Stack>
      {/* <Box sx={{ position: 'relative' }}>
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
          {
            data?.profile_status && <CustomChip label={data?.profile_status} color={'primary'} />
          }
          {
            data?.current_status && <CustomChip label={data?.current_status} color={'primary'} />
          }
        </Stack>
      </Box> */}
      <Stack direction='row' alignItems='center' gap={2}>
        <Typography fontSize={{ xs: '22px', md: '26px' }} fontWeight={800}>
          {data?.name}
        </Typography>
        <Stack direction="row" alignItems='center'>
          <IconButton size='small' onClick={() => handleCopy(data?.phone || '')}>
            <Iconify icon="solar:phone-outline" />
          </IconButton>
          <IconButton size='small' onClick={() => handleCopy(data?.whatsapp || '')}>
            <Iconify icon="ic:twotone-whatsapp" />
          </IconButton>
          <IconButton size='small' onClick={() => handleCopy(data?.email || '')}>
            <Iconify icon="mage:email" />
          </IconButton>
          <IconButton size='small' onClick={() => handleCopy(data?.website || '')}>
            <Iconify icon="mynaui:globe" />
          </IconButton>
          <IconButton size='small' onClick={() => handleCopy(data?.amazon_review_link || '')}>
            <Iconify icon="ri:amazon-fill" />
          </IconButton>
        </Stack>
      </Stack>
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
      {/* <Stack direction={'row'} spacing={2}>

        <SocialIconWithRedirectionUrl icon="mage:email" url={`mailto:${data?.email}`} text={data?.email} />
        <SocialIconWithRedirectionUrl icon="solar:phone-outline" url={`tel:${data?.phone}`} text={data?.phone} />
        <IconWithoutText icon="mynaui:globe" value={'www.example.com'} type={'url'} />
        <IconWithoutText icon="ri:drive-fill" value={'https://www.instagram.com'} type={'url'} />
        <IconWithoutText icon="ri:amazon-fill" value={'www.example.com'} type={'url'} />
      </Stack> */}

      {/* Social Media Stats */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {data?.instagram && (
          <SocialIconWithText
            icon="hugeicons:instagram"
            url={data?.instagram}
            text={`${data?.instagram_following?.toLocaleString()}`}
            value={`$${data?.partner_IG_rate}`}
          />
        )}
        {data?.tiktok && (
          <SocialIconWithText
            icon="hugeicons:tiktok"
            url={data?.tiktok}
            text={`${data?.tiktok_following?.toLocaleString()}`}
            value={`$${data?.partner_TT_rate}`}
          />
        )}
        {data?.youtube && (
          <SocialIconWithText
            icon="hugeicons:youtube"
            url={data?.youtube}
            text={`${data?.youtube_following?.toLocaleString()}`}
            value={`$${data?.partner_YT_rate}`}
          />
        )}
        {data?.x && (
          <SocialIconWithText
            icon="hugeicons:new-twitter-ellipse"
            url={data?.x}
            text={`${data?.x_following?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
        {data?.facebook && (
          <SocialIconWithText
            icon="mingcute:facebook-line"
            url={data?.facebook}
            text={`${data?.facebook_following?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
        {data?.pinterest && (
          <SocialIconWithText
            icon="hugeicons:pinterest"
            url={data?.pinterest}
            text={`${data?.pinterest_following?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
        {data?.snapchat && (
          <SocialIconWithText
            icon="hhugeicons:snapchat"
            url={data?.snapchat}
            text={`${data?.snapchat_following?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
        {data?.linkedin && (
          <SocialIconWithText
            icon="circum:linkedin"
            url={data?.linkedin}
            text={`${data?.linkedin_connection?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
      </Box>

      <Grid container spacing={2}>
        {/* Personal Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionTitle title="Personal Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
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
          <SectionTitle title="Contract Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
          <Stack spacing={1} mt={1}>
            <Typography variant="body2">
              <strong>Contract:</strong> {data?.contract}
            </Typography>
            <Typography variant="body2">
              <strong>Profile Category:</strong> {data?.profile_category}
            </Typography>
            <Typography variant="body2">
              <strong>Affiliate Platform:</strong> {data?.affiliate_platform || 'N/A'}
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
          <SectionTitle title="Other Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
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
                {data?.tags?.split(',')?.map((tag) => (
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
          <SectionTitle title="Amazon Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
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
