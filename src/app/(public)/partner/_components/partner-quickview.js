import { Box, IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { CustomChip } from '/src/components/core/custom-chip';
import { SectionTitle } from '/src/components/core/section-title';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';

import { SocialIconWithText } from './partner-gridview';
import { formatCompactNumber, handleCopy, isVideoContent, pxToRem } from '/src/utils/helper';

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
        {data?.PartnerGallery?.map((item, index) => (
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
      <Stack direction={'row'} spacing={0.5}>
        {/* <CustomChip label={'Live_Campaign'} color={'primary'} height="18px" /> */}
        {data?.ProfileStatus && <CustomChip label={data?.ProfileStatus} color={'primary'} />}
        {data?.CurrentStatus && <CustomChip label={data?.CurrentStatus} color={'primary'} />}
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
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography fontSize={{ xs: '22px', md: '26px' }} fontWeight={800}>
          {data?.Name}
        </Typography>
        <Stack direction="row" alignItems="center">
          <IconButton size="small" onClick={() => handleCopy(data?.Phone || '')}>
            <Iconify icon="solar:phone-outline" />
          </IconButton>
          <IconButton size="small" onClick={() => handleCopy(data?.WhatsApp || '')}>
            <Iconify icon="ic:twotone-whatsapp" />
          </IconButton>
          <IconButton size="small" onClick={() => handleCopy(data?.Email || '')}>
            <Iconify icon="mage:email" />
          </IconButton>
          <IconButton size="small" onClick={() => handleCopy(data?.Website || '')}>
            <Iconify icon="mynaui:globe" />
          </IconButton>
          <IconButton size="small" onClick={() => handleCopy(data?.AmazonReviewLink || '')}>
            <Iconify icon="ri:amazon-fill" />
          </IconButton>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        divider={<Iconify icon="pepicons-pop:line-y" sx={{ color: 'grey.300' }} />}
      >
        <Typography fontSize="14px">{formatCompactNumber(data?.TotalAudience)}</Typography>
        <Typography fontSize="14px">Hourly Rate: {data?.HourlyRate || 'N/A'}</Typography>
        <Typography fontSize="14px">Partner 360 Rate: {data?.Partner360Rate || 'N/A'}</Typography>
        {data?.Occupation && <CustomChip label={data?.Occupation} color={'primary'} />}
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
        {data?.Instagram && data?.Instagram !== 'Not Found' && data?.Instagram !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:instagram"
            url={data?.Instagram}
            text={`${data?.InstagramFollowing?.toLocaleString()}`}
            value={`$${data?.PartnerIGRate}`}
          />
        )}
        {data?.Tiktok && data?.Tiktok !== 'Not Found' && data?.Tiktok !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:tiktok"
            url={data?.Tiktok}
            text={`${data?.TiktokFollowing?.toLocaleString()}`}
            value={`$${data?.PartnerTTRate}`}
          />
        )}
        {data?.Youtube && data?.Youtube !== 'Not Found' && data?.Youtube !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:youtube"
            url={data?.Youtube}
            text={`${data?.YoutubeFollowing?.toLocaleString()}`}
            value={`$${data?.PartnerYTRate}`}
          />
        )}
        {data?.X && data?.X !== 'Not Found' && data?.X !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:new-twitter-ellipse"
            url={data?.X}
            text={`${data?.XFollowing?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
        {data?.Facebook && data?.Facebook !== 'Not Found' && data?.Facebook !== 'Not Provided' && (
          <SocialIconWithText
            icon="mingcute:facebook-line"
            url={data?.Facebook}
            text={`${data?.FacebookFollowing?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
        {data?.Pinterest && data?.Pinterest !== 'Not Found' && data?.Pinterest !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:pinterest"
            url={data?.Pinterest}
            text={`${data?.PinterestFollowing?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
        {data?.Snapchat && data?.Snapchat !== 'Not Found' && data?.Snapchat !== 'Not Provided' && (
          <SocialIconWithText
            icon="hhugeicons:snapchat"
            url={data?.Snapchat}
            text={`${data?.SnapchatFollowing?.toLocaleString()}`}
            value={'N/A'}
          />
        )}
        {data?.Linkedin && data?.Linkedin !== 'Not Found' && data?.Linkedin !== 'Not Provided' && (
          <SocialIconWithText
            icon="circum:linkedin"
            url={data?.Linkedin}
            text={`${data?.LinkedinConnection?.toLocaleString()}`}
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
              <strong>State:</strong>{' '}
              {data?.ByStatesPartnerHQ?.map((item) => item?.ByStates?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Country:</strong>{' '}
              {data?.ByCountryPartners?.map((item) => item?.ByCountry?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>City:</strong> {data?.ByCityPartnerHQ?.map((item) => item?.ByCity?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Mailing Address:</strong> {data?.MailingAddress || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Website:</strong>{' '}
              {data?.Website && data?.Website !== 'Not Found' ? (
                <a href={data?.Website} target="_blank" rel="noopener noreferrer">
                  {data?.Website}
                </a>
              ) : (
                'N/A'
              )}
            </Typography>
            <Typography variant="body2">
              <strong>Age Range:</strong> {data?.AgeBracket?.join(', ') || 'N/A'}
            </Typography>
          </Stack>
        </Grid>
        {/* contract info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionTitle title="Contract Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
          <Stack spacing={1} mt={1}>
            <Typography variant="body2">
              <strong>Contract:</strong> {data?.Contracts?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Profile Category:</strong>{' '}
              {data?.PartnerHQProfileCategory?.map((item) => item?.ProfileCategory?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Affiliate Platform:</strong> {data?.AffiliatePlatform?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Stakeholder:</strong>{' '}
              {data?.PartnerHQStakeholder?.map((item) => item?.Stakeholder?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Total Audience:</strong> {data?.TotalAudience?.toLocaleString()}
            </Typography>
            <Typography variant="body2">
              <strong>Products:</strong>{' '}
              {data?.ByProductPartnerHQ?.map((item) => item?.ByProduct?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Contributed Campaigns:</strong>{' '}
              {data?.ByCampaignsProposedPartners?.map((item) => item?.ByCampaigns?.Name)?.join(', ') || 'N/A'}
            </Typography>
            <Typography variant="body2">
              <strong>Live Campaign:</strong> N/A
            </Typography>
            <Typography variant="body2">
              <strong>Open to Gifting:</strong> {data?.OpentoGifting}
            </Typography>
            <Typography variant="body2">
              <strong>Open to Whitelisting:</strong> {data?.OpentoWhitelisting}
            </Typography>
          </Stack>
        </Grid>
        {/* other info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionTitle title="Other Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
          <Stack spacing={1} mt={1}>
            <Typography variant="body2">
              <strong>Source:</strong> {data?.SourcedFrom?.join(', ') || 'N/A'}
            </Typography>
            {data?.PaymentLink && (
              <Typography variant="body2">
                <strong>Payment Link:</strong> {data?.PaymentLink}
              </Typography>
            )}
            {data?.ByTagsPartnerHQ && (
              <Typography variant="body2">
                <strong>Tags:</strong>{' '}
                {data?.ByTagsPartnerHQ?.map((tag) => (
                  <CustomChip
                    key={tag?.ByTags?.Name}
                    label={tag?.ByTags?.Name}
                    height="18px"
                    variant={'soft'}
                    fontSize="14px"
                  />
                ))}
              </Typography>
            )}
            {data?.Notes && (
              <Typography variant="body2">
                <strong>Note:</strong> {data?.Notes}
              </Typography>
            )}
            {data?.Podcast && (
              <Typography variant="body2">
                <strong>Podcast:</strong> {data?.Podcast}
              </Typography>
            )}
            {data?.RefusalReason && (
              <Typography variant="body2">
                <strong>Refusal Reason:</strong> {data?.RefusalReason}
              </Typography>
            )}
          </Stack>
        </Grid>
        {/* amazon info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SectionTitle title="Amazon Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
          <Stack spacing={1} mt={1}>
            {data?.REVOAmazonOrderConfirmationNumber && (
              <Typography variant="body2">
                <strong>Amazon order confirmation no:</strong> {data?.REVOAmazonOrderConfirmationNumber}
              </Typography>
            )}
            {data?.AmazonReviewLink && (
              <Typography variant="body2">
                <strong>Amazon review link:</strong>{' '}
                <a href={data?.AmazonReviewLink} target="_blank" rel="noopener noreferrer">
                  {data?.AmazonReviewLink}
                </a>
              </Typography>
            )}
            {data?.AmazonReviewCupper && (
              <Typography variant="body2">
                <strong>Amazon review cupper:</strong> {data?.AmazonReviewCupper}
              </Typography>
            )}
            {data?.AmazonReviewThePill && (
              <Typography variant="body2">
                <strong>Amazon review pill:</strong> {data?.AmazonReviewThePill}
              </Typography>
            )}
            {data?.AmazonStorefront && (
              <Typography variant="body2">
                <strong>Amazon storefront:</strong> {data?.AmazonStorefront}
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};
