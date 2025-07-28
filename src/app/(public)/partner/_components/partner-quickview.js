import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Card, Divider, IconButton, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import useAuth from '/src/hooks/useAuth';
import { CustomChip } from '/src/components/core/custom-chip';
import { SectionTitle } from '/src/components/core/section-title';
import { Iconify } from '/src/components/iconify/iconify';

import { SocialIconWithText } from './partner-gridview';
import { formatCompactNumber, handleCopy, isVideoContent } from '/src/utils/helper';

// Validation functions
const isValidUrl = (url) => {
  const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return pattern.test(url);
};

const isValidNumber = (value) => {
  return !isNaN(value) && value !== '';
};

export const PartnerQuickView = ({ data, isEdit }) => {
  const { isLogin } = useAuth();

  const socialProfiles = [
    data?.instagram && { platform: 'Instagram', url: data.instagram },
    data?.tiktok && { platform: 'TikTok', url: data.tiktok },
    // data?.Youtube && { platform: 'YouTube', url: data.Youtube },
    data?.x && { platform: 'X', url: data.x },
    data?.facebook && { platform: 'Facebook', url: data.facebook },
    data?.pinterest && { platform: 'Pinterest', url: data.pinterest },
    data?.linkedin && { platform: 'LinkedIn', url: data.linkedin },
  ].filter(Boolean);

  const [personalInfo, setPersonalInfo] = useState({
    States: data?.states?.map((item) => item?.name)?.join(', ') || 'N/A',
    Country: data?.countries?.map((item) => item?.name)?.join(', ') || 'N/A',
    City: data?.cities?.map((item) => item?.name)?.join(', ') || 'N/A',
    MailingAddress: data?.mailingAddress || 'N/A',
    Website: data?.website || 'N/A',
    AgeRange: data?.ageBracket?.join(', ') || 'N/A',
  });

  const [contractInfo, setContractInfo] = useState({
    // Contract: data?.Contracts?.join(', ') || 'N/A',
    // ProfileCategory: data?.PartnerHQProfileCategory?.map((item) => item?.ProfileCategory?.Name)?.join(', ') || 'N/A',
    AffiliatePlatform: data?.affiliatePlatform?.join(', ') || 'N/A',
    Stakeholder: data?.stakeholders?.map((item) => item?.name)?.join(', ') || 'N/A',
    TotalAudience: data?.totalAudience?.toLocaleString() || 'N/A',
    Products: data?.products?.map((item) => item?.name)?.join(', ') || 'N/A',
    ContributedCampaigns: data?.contributedCampaigns?.map((item) => item?.name)?.join(', ') || 'N/A',
    LiveCampaign: 'N/A',
    // OpenToGifting: data?.openToGifting || 'N/A',
    // OpenToWhitelisting: data?.openToWhitelisting || 'N/A',
  });

  const [otherInfo, setOtherInfo] = useState({
    Source: data?.sourcedFrom?.join(', ') || 'N/A',
    PaymentLink: data?.paymentLink || 'N/A',
    Tags: data?.tags?.map((tag) => tag?.name)?.join(', ') || 'N/A',
    Note: data?.notes || 'N/A',
    Podcast: data?.podcast || 'N/A',
    RefusalReason: data?.refusalReason || 'N/A',
    // Receipts: data?.receipts?.length > 0 ? data?.receipts : 'N/A',
    // MediaKit: data?.mediaKit?.length > 0 ? data?.mediaKit : 'N/A',
  });

  const [amazonInfo, setAmazonInfo] = useState({
    REVOAmazonOrderConfirmationNumber: data?.revoAmazonOrderConfirmationNumber || 'N/A',
    AmazonReviewLink: data?.amazonReviewLink || 'N/A',
    AmazonReviewCupper: data?.amazonReviewCupper || 'N/A',
    AmazonReviewThePill: data?.amazonReviewThePill || 'N/A',
    AmazonStorefront: data?.amazonStorefront || 'N/A',
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
      amazon: setAmazonInfo,
    };

    updateFunctions[section]((prev) => {
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
      amazon: amazonInfo,
    }[section][field];

    if (value === null || value === undefined || value === '') {
      return null;
    }

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
            ...(type === 'link' && { pattern: 'https?://.*' }),
          }}
          error={
            (type === 'number' && !isValidNumber(value)) || (type === 'link' && value !== '' && !isValidUrl(value))
          }
          helperText={
            (type === 'number' && !isValidNumber(value) && 'Must be a valid number') ||
            (type === 'link' && value !== '' && !isValidUrl(value) && 'Invalid URL format')
          }
        />
      );
    }

    return (
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <strong>{label}:</strong>{' '}
        {type === 'link' ? (
          Array.isArray(value) ? (
            value.map((link, index) => (
              <Link key={index} href={link} passHref legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link}
                  style={{
                    display: 'block',
                    width: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {link}
                </a>
              </Link>
            ))
          ) : (
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
          )
        ) : type === 'chips' ? (
          value
            .split(', ')
            .map((tag, index) => (
              <CustomChip key={index} label={tag} height="18px" variant="soft" fontSize="14px" sx={{ ml: 0.5 }} />
            ))
        ) : (
          value
        )}
      </Typography>
    );
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        mb={1}
        p={2}
        width="100%"
        sx={{ position: 'sticky', top: 0, left: 0, backgroundColor: 'var(--mui-palette-background-paper)', zIndex: 2 }}
      >
        {/* Personal Info */}
        <Stack direction="row" alignItems="center" gap={2}>
          <Typography fontSize={{ xs: '22px', md: '26px' }} fontWeight={800}>
            {data?.name}
          </Typography>

          {/* Contacts Link */}
          <Stack direction="row" alignItems="center">
            <IconButton size="small" onClick={() => handleCopy(data?.phone || '')}>
              <Iconify icon="solar:phone-outline" />
            </IconButton>
            <IconButton size="small" onClick={() => handleCopy(data?.whatsapp || '')}>
              <Iconify icon="ic:twotone-whatsapp" />
            </IconButton>
            <IconButton size="small" onClick={() => handleCopy(data?.email || '')}>
              <Iconify icon="mage:email" />
            </IconButton>
            <IconButton size="small" onClick={() => handleCopy(data?.website || '')}>
              <Iconify icon="mynaui:globe" />
            </IconButton>
            <IconButton size="small" onClick={() => handleCopy(data?.amazonReviewLink || '')}>
              <Iconify icon="ri:amazon-fill" />
            </IconButton>
          </Stack>

          {/* Status */}
          <Stack direction={'row'} spacing={0.5}>
            {data?.profileStatus?.length > 0 &&
              data?.profileStatus?.map((status, index) => <CustomChip key={index} label={status} />)}
            {data?.currentStatus?.length > 0 &&
              data?.currentStatus?.map((status, index) => <CustomChip key={index} label={status} />)}
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          divider={<Iconify icon="pepicons-pop:line-y" sx={{ color: 'grey.300' }} />}
        >
          <Typography fontSize="14px">{formatCompactNumber(data?.totalAudience)}</Typography>
          <Typography fontSize="14px">Hourly Rate: {data?.hourlyRate || 'N/A'}</Typography>
          <Typography fontSize="14px">Partner 360 Rate: {data?.partner360Rate || 'N/A'}</Typography>
          {data?.occupation && <CustomChip label={data?.occupation} />}
        </Stack>

        {/* Social Media Stats */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {[
            data?.Instagram && data?.Instagram !== 'Not Found' && data?.Instagram !== 'Not Provided' && (
              <SocialIconWithText
                icon="hugeicons:instagram"
                url={data?.instagram}
                text={`${data?.instagramFollowing?.toLocaleString()}`}
                value={`$${data?.partnerIGRate}`}
              />
            ),
            data?.tiktok && data?.tiktok !== 'Not Found' && data?.tiktok !== 'Not Provided' && (
              <SocialIconWithText
                icon="hugeicons:tiktok"
                url={data?.tiktok}
                text={`${data?.tiktokFollowing?.toLocaleString()}`}
                value={`$${data?.partnerTTRate}`}
              />
            ),
            data?.youtube && data?.youtube !== 'Not Found' && data?.youtube !== 'Not Provided' && (
              <SocialIconWithText
                icon="hugeicons:youtube"
                url={data?.youtube}
                text={`${data?.youtubeFollowing?.toLocaleString()}`}
                value={`$${data?.partnerYTRate}`}
              />
            ),
            data?.x && data?.x !== 'Not Found' && data?.x !== 'Not Provided' && (
              <SocialIconWithText
                icon="hugeicons:new-twitter-ellipse"
                url={data?.x}
                text={`${data?.xFollowing?.toLocaleString()}`}
                value={'N/A'}
              />
            ),
            data?.facebook && data?.facebook !== 'Not Found' && data?.facebook !== 'Not Provided' && (
              <SocialIconWithText
                icon="mingcute:facebook-line"
                url={data?.facebook}
                text={`${data?.facebookFollowing?.toLocaleString()}`}
                value={'N/A'}
              />
            ),
            data?.pinterest && data?.pinterest !== 'Not Found' && data?.pinterest !== 'Not Provided' && (
              <SocialIconWithText
                icon="hugeicons:pinterest"
                url={data?.pinterest}
                text={`${data?.pinterestFollowing?.toLocaleString()}`}
                value={'N/A'}
              />
            ),
            data?.snapchat && data?.snapchat !== 'Not Found' && data?.snapchat !== 'Not Provided' && (
              <SocialIconWithText
                icon="hhugeicons:snapchat"
                url={data?.snapchat}
                text={`${data?.snapchatFollowing?.toLocaleString()}`}
                value={'N/A'}
              />
            ),
            data?.linkedin && data?.linkedin !== 'Not Found' && data?.linkedin !== 'Not Provided' && (
              <SocialIconWithText
                icon="circum:linkedin"
                url={data?.linkedin}
                text={`${data?.linkedinConnections?.toLocaleString()}`}
                value={'N/A'}
              />
            ),
          ]
            .filter(Boolean)
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
                      visibility: 'visible !important',
                    }}
                  />
                )}
              </Box>
            ))}
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 0 }} />

      {/* Image Slider */}
      {/* <SliderWrapper
        modules={[Navigation, SwiperPagination, Scrollbar, A11y]}
        // autoplay={{ delay: 4000, disableOnInteraction: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        pauseOnHover
        // speed={2000}
        spaceBetween={2}
      >
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
      </SliderWrapper> */}

      {/* Social Media iFrame */}
      <Stack direction="row" spacing={1}>
        <Box
          sx={{
            width: 245,
            height: 320,
            border: '1px solid',
            borderColor: 'grey.300',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 2,
          }}
        >
          <Box
            component="img"
            src={data?.thumbnailImage ?? '/assets/image-placeholder.jpg'}
            alt={data?.Name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderBottom: '1px solid var(--mui-palette-divider)',
            }}
          />
        </Box>
        {socialProfiles.length > 0 && <PartnerIframes profiles={socialProfiles} />}
      </Stack>

      {isLogin && (
        <>
          {/* All other Info */}
          <Grid container spacing={2}>
            {/* Personal Info Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <SectionTitle title="Personal Info" sx={{ px: 2, py: 1 }} />
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
              <SectionTitle title="Contract Info" sx={{ px: 2, py: 1 }} />
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
              <SectionTitle title="Other Info" sx={{ px: 2, py: 1 }} />
              <Stack spacing={1} mt={1}>
                {renderField('other', 'Source', 'Source')}
                {renderField('other', 'PaymentLink', 'Payment Link', 'link')}
                {renderField('other', 'Tags', 'Tags', 'chips')}
                {renderField('other', 'Note', 'Note')}
                {renderField('other', 'Podcast', 'Podcast')}
                {renderField('other', 'RefusalReason', 'Refusal Reason')}
                {renderField('other', 'Receipts', 'Receipts', 'link')}
                {renderField('other', 'MediaKit', 'Media Kit', 'link')}
              </Stack>
            </Grid>

            {/* Amazon Info Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <SectionTitle title="Amazon Info" sx={{ px: 2, py: 1 }} />
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
    </Box>
  );
};

export const PartnerSliderCard = ({ item, sx = {} }) => {
  return (
    <Card
      sx={{
        width: '100%',
        aspectRatio: '9 / 13',
        border: 'unset',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#333',
        borderRadius: '0',
        border: 'solid .1px var(--mui-palette-divider)',
        display: 'flex',
        flexDirection: 'column',
        '&:hover .image-container': {
          opacity: 0.8,
        },
        ...sx,
      }}
    >
      <Box className="image-container" sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {isVideoContent(item.thumbnail || '') ? (
          <Box
            component="video"
            src={item.thumbnail}
            muted
            autoPlay
            loop
            draggable={false}
            playsInline
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Image
              src={item?.ThumbnailImage?.at(0) || item?.Imagefield?.at(0) || '/'}
              alt={item.title || 'Partner Image'}
              draggable={false}
              style={{
                objectFit: 'cover',
                filter: 'blur(20px)',
                transition: 'filter 0.2s ease-out',
              }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              onLoad={(e) => {
                e.target.style.filter = 'blur(0px)';
              }}
            />
          </Box>
        )}

        {/* Title Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 1.5,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))',
          }}
        >
          <Typography fontWeight={400} color="white" fontSize={{ xs: 12, md: 14 }} noWrap>
            {(item.title || '').split(/\s+/).slice(0, 4).join(' ') +
              (item.title?.split(/\s+/)?.length > 4 ? '...' : '')}
          </Typography>
          {/* Thin Line */}
          <Box
            sx={{
              width: '100%',
              height: '0.8px',
              margin: '4px 0',
              background: 'var(--mui-palette-divider)',
            }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export const PartnerIframes = ({ profiles }) => {
  const getEmbedUrl = (url) => {
    if (url && url?.includes('instagram.com')) {
      const cleanUrl = url.split('?')[0];

      const postMatch = cleanUrl.match(/instagram\.com\/p\/([^\/]+)/);

      if (postMatch) {
        return `https://www.instagram.com/p/${postMatch[1]}/embed`;
      }
      // Profile fallback
      const parts = cleanUrl.split('/').filter(Boolean);
      const instagramIndex = parts.findIndex((part) => part.includes('instagram.com'));
      const username = parts[instagramIndex + 1];
      return `https://www.instagram.com/${username}/embed`;
    }
    if (url && url?.includes('tiktok.com')) {
      const vidMatch = url.match(/video\/(\d+)/);
      if (vidMatch) {
        return `https://www.tiktok.com/embed/v2/${vidMatch[1]}`;
      }
    }
    if ((url && url?.includes('youtube.com')) || url?.includes('youtu.be')) {
      const ytMatch = url.match(/(youtu\.be\/|v=)([^&]+)/);
      if (ytMatch) {
        return `https://www.youtube.com/embed/${ytMatch[2]}`;
      }
    }
    if (url && url?.includes('twitter.com')) {
      return `https://twitframe.com/show?url=${encodeURIComponent(url)}`;
    }
    if (url && url?.includes('facebook.com')) {
      return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}`;
    }
    return url;
  };

  return (
    <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', py: 2, px: 1 }}>
      {profiles.map(({ platform, url }) => {
        const embedUrl = getEmbedUrl(url || '');
        return <EmbedCard key={url} platform={platform} embedUrl={embedUrl} />;
      })}
    </Stack>
  );
};

export const EmbedCard = ({ platform, embedUrl }) => {
  const [hasError, setHasError] = useState(false);

  const isInstagram = embedUrl?.includes('instagram.com');
  const isTwitter = embedUrl?.includes('x.com') || embedUrl?.includes('twitframe.com');
  const isPinterest = embedUrl?.includes('pinterest.com');
  const isLinkedIn = embedUrl?.includes('linkedin.com');

  const shouldShowDirectLink = isTwitter || isPinterest || isLinkedIn;
  const isUnsupportedEmbed = shouldShowDirectLink && !hasError;

  const isInstagramWithoutUsername = (() => {
    if (!isInstagram) return false;
    try {
      const url = new URL(embedUrl);
      const pathParts = url.pathname.split('/').filter(Boolean);
      return pathParts.length === 0;
    } catch {
      return true;
    }
  })();

  const isFallback =
    (!embedUrl || ['Not Found', 'Not found', 'unknown', 'Not Provided'].includes(embedUrl) || hasError) && !isInstagram;

  const shouldShowInstagramFallback = isInstagram && isInstagramWithoutUsername;

  const renderPlatformFallback = () => {
    let icon, color, message;

    switch (platform.toLowerCase()) {
      case 'instagram':
        icon = 'mdi:instagram';
        color = '#E1306C';
        message = 'Instagram profile is unavailable.';
        break;
      case 'x':
      case 'twitter':
        icon = 'ri:twitter-x-fill';
        color = '#000000';
        message = 'Twitter (X) profile is unavailable';
        break;
      case 'pinterest':
        icon = 'ri:pinterest-fill';
        color = '#E60023';
        message = 'Pinterest profile is unavailable';
        break;
      case 'linkedin':
        icon = 'mdi:linkedin';
        color = '#0077B5';
        message = 'LinkedIn profile is unavailable';
        break;
      default:
        icon = 'mdi:link-variant-off';
        color = '#666666';
        message = 'This profile is private or unavailable.';
    }

    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Iconify icon={icon} width={36} height={36} sx={{ color, opacity: 0.5, mb: 1 }} />
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
        {embedUrl && !['Not Found', 'Not found', 'unknown', 'Not Provided'].includes(embedUrl) && (
          <Link href={embedUrl} passHref legacyBehavior>
            <a target="_blank" rel="noopener noreferrer" style={{ marginTop: 8 }}>
              <Typography variant="caption" color="primary">
                Open in {platform}
              </Typography>
            </a>
          </Link>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: 245,
        height: 320,
        border: '1px solid',
        borderColor: 'grey.300',
        flexShrink: 0,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          hasError || isFallback || shouldShowInstagramFallback || isUnsupportedEmbed ? '#f9f9f9' : 'white',
      }}
    >
      {isFallback || shouldShowInstagramFallback || isUnsupportedEmbed ? (
        renderPlatformFallback()
      ) : (
        <iframe
          src={embedUrl}
          title={`${platform} preview`}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          onError={() => setHasError(true)}
        />
      )}
    </Box>
  );
};
