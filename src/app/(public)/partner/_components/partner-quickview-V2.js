import { Box, Divider, IconButton, Stack, TextField, Typography, Card } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { A11y, Autoplay, Navigation, Scrollbar, Pagination as SwiperPagination } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { CustomChip } from '/src/components/core/custom-chip';
import { SectionTitle } from '/src/components/core/section-title';
import { Iconify } from '/src/components/iconify/iconify';
import { SliderWrapper } from '/src/components/slider/slider-wrapper';
import useAuth from '/src/hooks/useAuth';
import { SocialIconWithText } from './partner-gridview';
import { formatCompactNumber, handleCopy, isVideoContent, pxToRem } from '/src/utils/helper';
import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";

// Validation functions
const isValidUrl = (url) => {
  const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return pattern.test(url);
};

const isValidNumber = (value) => {
  return !isNaN(value) && value !== '';
};

export const PartnerQuickViewV2 = ({ data, isEdit, onUpdate }) => {
const { isLogin } = useAuth();

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

const socialProfiles = [
    data.Instagram && { platform: 'Instagram', url: "https://www.instagram.com/skinandkisses/" },
    data.Tiktok &&    { platform: 'TikTok',    url: "https://www.tiktok.com/@skinandkisses" },
    data.Youtube &&   { platform: 'YouTube',    url: "https://www.youtube.com/@katressesoriano" },
    data.X &&         { platform: 'X',          url: "data.Xhttps://x.com/Shannakress83" },
    data.Facebook &&  { platform: 'Facebook',   url: "https://www.facebook.com/CPWVeinandAestheticCenter" },

  ].filter(Boolean);

const [personalInfo, setPersonalInfo] = useState({
  States: data?.ByStatesPartnerHQ?.map(item => item?.ByStates?.Name)?.join(', ') || 'N/A',
  Country: data?.ByCountryPartners?.map(item => item?.ByCountry?.Name)?.join(', ') || 'N/A',
  City: data?.ByCityPartnerHQ?.map(item => item?.ByCity?.Name)?.join(', ') || 'N/A',
  MailingAddress: data?.MailingAddress || 'N/A',
  Website: data?.Website || 'N/A',
  AgeRange: data?.AgeBracket?.join(', ') || 'N/A'
});

const [contractInfo, setContractInfo] = useState({
  Contract: data?.Contracts?.join(', ') || 'N/A',
  ProfileCategory: data?.PartnerHQProfileCategory?.map(item => item?.ProfileCategory?.Name)?.join(', ') || 'N/A',
  AffiliatePlatform: data?.AffiliatePlatform?.join(', ') || 'N/A',
  Stakeholder: data?.PartnerHQStakeholder?.map(item => item?.Stakeholder?.Name)?.join(', ') || 'N/A',
  TotalAudience: data?.TotalAudience?.toLocaleString() || 'N/A',
  Products: data?.ByProductPartnerHQ?.map(item => item?.ByProduct?.Name)?.join(', ') || 'N/A',
  ContributedCampaigns: data?.ByCampaignsProposedPartners?.map(item => item?.ByCampaigns?.Name)?.join(', ') || 'N/A',
  LiveCampaign: 'N/A',
  OpenToGifting: data?.OpentoGifting || 'N/A',
  OpenToWhitelisting: data?.OpentoWhitelisting || 'N/A'
});

const [otherInfo, setOtherInfo] = useState({
  Source: data?.SourcedFrom?.join(', ') || 'N/A',
  PaymentLink: data?.PaymentLink || 'N/A',
  Tags: data?.ByTagsPartnerHQ?.map(tag => tag?.ByTags?.Name)?.join(', ') || 'N/A',
  Note: data?.Notes || 'N/A',
  Podcast: data?.Podcast || 'N/A',
  RefusalReason: data?.RefusalReason || 'N/A'
});

const [amazonInfo, setAmazonInfo] = useState({
  REVOAmazonOrderConfirmationNumber: data?.REVOAmazonOrderConfirmationNumber || 'N/A',
  AmazonReviewLink: data?.AmazonReviewLink || 'N/A',
  AmazonReviewCupper: data?.AmazonReviewCupper || 'N/A',
  AmazonReviewThePill: data?.AmazonReviewThePill || 'N/A',
  AmazonStorefront: data?.AmazonStorefront || 'N/A'
});

const handleChange = (section, field, value) => {
  const validation = {
    TotalAudience: (val) => isValidNumber(val),
    REVOAmazonOrderConfirmationNumber: (val) => isValidNumber(val),
     // Add other field validations as needed
  };
  if (validation[field] && !validation[field](value)) return;

  const updateFunctions = {
    personal: setPersonalInfo,
    contract: setContractInfo,
    other: setOtherInfo,
    amazon: setAmazonInfo
  };

  updateFunctions[section](prev => {
    const updated = { ...prev, [field]: value };
    onUpdate?.({ ...personalInfo, ...contractInfo, ...otherInfo, ...amazonInfo, [field]: value });
    return updated;
  });
};

const renderField = (section, field, label, type = 'text') => {
  const value = {
    personal: personalInfo,
    contract: contractInfo,
    other: otherInfo,
    amazon: amazonInfo
  }[section][field];

  if (isEdit === 'EDIT') {
    return (
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label={label}
        value={value}
        onChange={(e) => handleChange(section, field, e.target.value)}
        sx={{ mb: 0.5 }}
        type={type === 'link' ? 'url' : type}
          inputProps={{
            ...(type === 'number' && { min: 0, inputMode: 'numeric' }),
            ...(type === 'link' && { pattern: 'https?://.*' })
          }}
          error={
            (type === 'number' && !isValidNumber(value)) ||
            (type === 'link' && value !== '' && !isValidUrl(value))
          }
          helperText={
            (type === 'number' && !isValidNumber(value) && 'Must be a valid number') ||
            (type === 'link' && value !== '' && !isValidUrl(value) && 'Invalid URL format')
          }
      />
    );
  }
  // if (value === 'N/A') return null;

  return (
    <Typography variant="body2">
      <strong>{label}:</strong> {type === 'link' ? (
        <Link href={value} passHref legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          title={value}
          style={{
            display: 'block',
            width: '200px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value}
        </a>
      </Link>
      ) : type === 'chips' ? (
        value.split(', ').map((tag, index) => (
          <CustomChip
            key={index}
            label={tag}
            height="18px"
            variant="soft"
            fontSize="14px"
            sx={{ ml: 0.5 }}
          />
        ))
      ) : (
        value
      )}
    </Typography>
  );
};

  return (
    <Stack spacing={1.8}>

      {/* Personal Info */}
      <Stack direction="row" alignItems="center" gap={2}>
        <Typography fontSize={{ xs: '22px', md: '26px' }} fontWeight={800}>
          {data?.Name}
        </Typography>

        {/* Contacts Link */}
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

      {/* Profile Status */}    
      <Stack direction={'row'} spacing={0.5}>
        {/* <CustomChip label={'Live_Campaign'} color={'primary'} height="18px" /> */}
        {data?.ProfileStatus && <CustomChip label={data?.ProfileStatus} color={'primary'} />}
        {data?.CurrentStatus && <CustomChip label={data?.CurrentStatus} color={'primary'} />}
      </Stack>

     </Stack>

      {/* Total Audience, Hourly Rate, Partner 360 Rate, Occupation */}
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

      {/* Social Media Stats */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {[
        data?.Instagram && data?.Instagram !== 'Not Found' && data?.Instagram !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:instagram"
            url={data?.Instagram}
            text={`${data?.InstagramFollowing?.toLocaleString()}`}
            value={`$${data?.PartnerIGRate}`}
          />
        ),
        data?.Tiktok && data?.Tiktok !== 'Not Found' && data?.Tiktok !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:tiktok"
            url={data?.Tiktok}
            text={`${data?.TiktokFollowing?.toLocaleString()}`}
            value={`$${data?.PartnerTTRate}`}
          />
        ),
        data?.Youtube && data?.Youtube !== 'Not Found' && data?.Youtube !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:youtube"
            url={data?.Youtube}
            text={`${data?.YoutubeFollowing?.toLocaleString()}`}
            value={`$${data?.PartnerYTRate}`}
          />
        ),
        data?.X && data?.X !== 'Not Found' && data?.X !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:new-twitter-ellipse"
            url={data?.X}
            text={`${data?.XFollowing?.toLocaleString()}`}
            value={'N/A'}
          />
        ),
        data?.Facebook && data?.Facebook !== 'Not Found' && data?.Facebook !== 'Not Provided' && (
          <SocialIconWithText
            icon="mingcute:facebook-line"
            url={data?.Facebook}
            text={`${data?.FacebookFollowing?.toLocaleString()}`}
            value={'N/A'}
          />
        ),
        data?.Pinterest && data?.Pinterest !== 'Not Found' && data?.Pinterest !== 'Not Provided' && (
          <SocialIconWithText
            icon="hugeicons:pinterest"
            url={data?.Pinterest}
            text={`${data?.PinterestFollowing?.toLocaleString()}`}
            value={'N/A'}
          />
        ),
        data?.Snapchat && data?.Snapchat !== 'Not Found' && data?.Snapchat !== 'Not Provided' && (
          <SocialIconWithText
            icon="hhugeicons:snapchat"
            url={data?.Snapchat}
            text={`${data?.SnapchatFollowing?.toLocaleString()}`}
            value={'N/A'}
          />
        ),
        data?.Linkedin && data?.Linkedin !== 'Not Found' && data?.Linkedin !== 'Not Provided' && (
          <SocialIconWithText
            icon="circum:linkedin"
            url={data?.Linkedin}
            text={`${data?.LinkedinConnection?.toLocaleString()}`}
            value={'N/A'}
          />
        )
       ].filter(Boolean)
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
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 0 }} />

      {/* Image Slider */}
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
        spaceBetween={1.2}
      >
        {/* {data?.PartnerGallery?.map((item, index) => ( */}
        {mediaArr?.map((item, index) => (
          <SwiperSlide key={index}>
            <PartnerSliderCard
              item={{
                thumbnail: item,
                title: `Partner Content ${index + 1}`,
                ThumbnailImage: [item],
              }}
            />
          </SwiperSlide>
        ))}
      </SliderWrapper>

      {/* Social Media iFrame */}
       <Stack direction="row" spacing={1}>
       {socialProfiles.length > 0 && (
        <PartnerIframes profiles={socialProfiles} />
       )}
       </Stack>
       
      { isLogin  && (
        <>
            {/* All other Info */}
            <Grid container spacing={2}>
                {/* Personal Info Section */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <SectionTitle title="Personal Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
                    <Stack spacing={1} mt={1}>
                    {renderField('personal', 'States', 'State')}
                    {renderField('personal', 'Country', 'Country')}
                    {renderField('personal', 'City', 'City')}
                    {renderField('personal', 'MailingAddress', 'Mailing Address')}
                    {renderField('personal', 'Website', 'Website', 'link')}
                    {renderField('personal', 'AgeRange', 'Age Range')}
                    </Stack>
                </Grid>

                {/* Contract Info Section */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <SectionTitle title="Contract Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
                    <Stack spacing={1} mt={1}>
                    {renderField('contract', 'Contract', 'Contract')}
                    {renderField('contract', 'ProfileCategory', 'Profile Category')}
                    {renderField('contract', 'AffiliatePlatform', 'Affiliate Platform')}
                    {renderField('contract', 'Stakeholder', 'Stakeholder')}
                    {renderField('contract', 'TotalAudience', 'Total Audience', 'number')}
                    {renderField('contract', 'Products', 'Products')}
                    {renderField('contract', 'ContributedCampaigns', 'Contributed Campaigns')}
                    {renderField('contract', 'LiveCampaign', 'Live Campaign')}
                    {renderField('contract', 'OpenToGifting', 'Open to Gifting')}
                    {renderField('contract', 'OpenToWhitelisting', 'Open to Whitelisting')}
                    </Stack>
                </Grid>

                {/* Other Info Section */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <SectionTitle title="Other Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
                    <Stack spacing={1} mt={1}>
                    {renderField('other', 'Source', 'Source')}
                    {renderField('other', 'PaymentLink', 'Payment Link', 'link')}
                    {renderField('other', 'Tags', 'Tags', 'chips')}
                    {renderField('other', 'Note', 'Note')}
                    {renderField('other', 'Podcast', 'Podcast')}
                    {renderField('other', 'RefusalReason', 'Refusal Reason')}
                    </Stack>
                </Grid>

                {/* Amazon Info Section */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <SectionTitle title="Amazon Info" sx={{ px: 2, py: 1, borderRadius: 1 }} />
                    <Stack spacing={1} mt={1}>
                    {renderField('amazon', 'REVOAmazonOrderConfirmationNumber', 'Amazon Order Confirmation No', 'number')}
                    {renderField('amazon', 'AmazonReviewLink', 'Amazon Review Link', 'link')}
                    {renderField('amazon', 'AmazonReviewCupper', 'Amazon Review Cupper')}
                    {renderField('amazon', 'AmazonReviewThePill', 'Amazon Review The Pill')}
                    {renderField('amazon', 'AmazonStorefront', 'Amazon Storefront', 'link')}
                    </Stack>
                </Grid>
            </Grid>
        </>
      )}
    </Stack>
  );
};

export const PartnerSliderCard = ({ item, sx = {} }) => {
    return (
      <Card
        sx={{
          width: "100%",
          aspectRatio: "9 / 16",
          border: "unset",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#333",
          borderRadius: "0",
          border: "solid .1px var(--mui-palette-divider)",
          display: "flex",
          flexDirection: "column",
          "&:hover .image-container": {
            opacity: 0.8,
          },
          ...sx,
        }}
      >
        <Box className="image-container" sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
          {isVideoContent(item.thumbnail || "") ? (
            <Box
              component="video"
              src={item.thumbnail}
              muted
              autoPlay
              loop
              draggable={false}
              playsInline
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
          ) : (
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={item?.ThumbnailImage?.at(0) || item?.Imagefield?.at(0) || "/"}
                alt={item.title || "Partner Image"}
                draggable={false}
                style={{
                  objectFit: "cover",
                  filter: "blur(20px)",
                  transition: "filter 0.2s ease-out",
                }}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                onLoad={(e) => {
                  e.target.style.filter = "blur(0px)"
                }}
              />
            </Box>
          )}
  
          {/* Title Overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 1.5,
              background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
            }}
          >
            <Typography fontWeight={400} color="white" fontSize={{ xs: 12, md: 14 }} noWrap>
              {(item.title || "").split(/\s+/).slice(0, 4).join(" ") +
                (item.title?.split(/\s+/)?.length > 4 ? "..." : "")}
            </Typography>
            {/* Thin Line */}
            <Box
              sx={{
                width: "100%",
                height: "0.8px",
                margin: "4px 0",
                background: "var(--mui-palette-divider)",
              }}
            />
          </Box>
        </Box>
      </Card>
    )
  }
  
export const PartnerIframes = ({ profiles }) => {

  const getEmbedUrl = (url) => {
        if (url.includes('instagram.com')) {
          // assume post or profile — you may need to parse out username vs. post ID
          const postMatch = url.match(/instagram\.com\/p\/([^\/]+)/);
          if (postMatch) {
            return `https://www.instagram.com/p/${postMatch[1]}/embed`;
          }
        }
        if (url.includes('tiktok.com')) {
          // extract video id
          const vidMatch = url.match(/video\/(\d+)/);
          if (vidMatch) {
            return `https://www.tiktok.com/embed/v2/${vidMatch[1]}`;
          }
        }
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          // support both long and short URLs
          const ytMatch = url.match(/(youtu\.be\/|v=)([^&]+)/);
          if (ytMatch) {
            return `https://www.youtube.com/embed/${ytMatch[2]}`;
          }
        }
        if (url.includes('twitter.com')) {
          return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
        }
        if (url.includes('facebook.com')) {
          return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}`;
        }
        // fallback: just return the original URL
        return url;
    };

    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{ overflowX: 'auto', py: 2, px: 1 }}
      >
        {profiles.map(({ platform, url }) => {
          const embedUrl = getEmbedUrl(url);
          return (
            <Box
              key={url}
              component="iframe"
              src={embedUrl}
              title={`${platform} preview`}
              loading="lazy"
              sx={{
                width: 232,
                height: 320,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 1,
                flexShrink: 0,
              }}
            />
          );
        })}
      </Stack>
    );
  };
  