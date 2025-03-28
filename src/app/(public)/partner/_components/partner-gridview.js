'use client';

import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Iconify } from '/src/components/iconify/iconify';
import { PageLoader } from '/src/components/loaders/PageLoader';

import { PartnerCard } from './partner-card';

export const PartnerGridView = ({ data, colums, fetchList, loading, handlePagination }) => {
  return (
    <Box>
      <PageLoader loading={loading} error={null}>
        <Grid container spacing={1}>
          {data?.map((partner, index) => (
            <Grid key={index} item size={{ xs: 12, md: 3 }}>
              <PartnerCard item={partner} fetchList={fetchList} />
            </Grid>
          ))}
        </Grid>
      </PageLoader>
    </Box>
  );
};

// const PartnerCard = ({ item, fetchList }) => {
//   const [openPartnerRightPanel, setOpenPartnerRightPanel] = React.useState(null);

//   return (
//     <>
//       <Stack
//         direction={{ xs: 'column' }}
//         gap={1}
//         sx={{ border: '1px solid', borderColor: 'red', borderRadius: 1, overflow: 'hidden' }}
//       >
//         <Stack direction='row'>
//           <Box
//             component="img"
//             // src={
//             //   isSupabaseUrl(item?.profile_image)
//             //     ? `${process.env.NEXT_PUBLIC_SUPABASE_PREVIEW_PREFIX}${item?.profile_image}`
//             //     : item?.profile_image
//             // }
//             src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8d87567db1d54b9d6b5d4_2CoCP5UkbBxnruHemWWGaYSct3ZRB8VF0-84yJknGQc-p-800.jpeg"
//             alt={item?.name}
//             sx={{ width: '180px', height: '100%', objectFit: 'cover', cursor: 'pointer', display: 'block' }}
//             onClick={() => setOpenPartnerRightPanel(item)}
//           />
//           <Box>
//             <Typography fontSize={{ xs: '22px', md: '26px' }} fontWeight={800}>
//               {item?.name}
//             </Typography>
//             <Stack
//               direction="row"
//               alignItems="center"
//               divider={<Iconify icon="pepicons-pop:line-y" sx={{ color: 'grey.300' }} />}
//             >
//               <Typography fontSize="14px">303M</Typography>
//               <Typography fontSize="14px">$202</Typography>
//             </Stack>
//             <Stack direction="row" flexWrap={"wrap"} gap={1} mt={1} alignItems={"center"}>
//               <Typography fontSize="13px" fontWeight={600}>Products:</Typography>
//               <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
//               <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
//               <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
//             </Stack>
//             <Stack direction="row" flexWrap={"wrap"} gap={1} mt={0.5} alignItems={"center"}>
//               <Typography fontSize="13px" fontWeight={600}>Proposed:</Typography>
//               <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
//               <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
//             </Stack>
//             <Stack direction="row" flexWrap={"wrap"} gap={1} mt={0.5} alignItems={"center"}>
//               <Typography fontSize="13px" fontWeight={600}>Contributed:</Typography>
//               <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
//               <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
//             </Stack>
//           </Box>
//         </Stack>
//         <Stack direction="column" sx={{ px: 1 }}>
//           <Stack gap={1} sx={{ my: 1 }}>
//             <SocialIconWithText
//               icon="hugeicons:instagram"
//               url={'https://www.instagram.com/'}
//               text="100K"
//               value={'400$'}
//             />
//             <SocialIconWithText
//               icon="hugeicons:youtube"
//               url={'https://www.instagram.com/'}
//               text="100K"
//               value={'400$'}
//             />
//             <SocialIconWithText
//               icon="mingcute:facebook-line"
//               url={'https://www.instagram.com/'}
//               text="100K"
//               value={'400$'}
//             />
//             <SocialIconWithText
//               icon="hugeicons:new-twitter-ellipse"
//               url={'https://www.instagram.com/'}
//               text="100K"
//               value={'400$'}
//             />
//             <SocialIconWithText icon="circum:linkedin" url={'https://www.instagram.com/'} text="100K" value={'400$'} />
//             <SocialIconWithText
//               icon="hugeicons:pinterest"
//               url={'https://www.instagram.com/'}
//               text="100K"
//               value={'400$'}
//             />
//           </Stack>
//           <Stack direction={'row'} spacing={2} mb={2}>
//             <SocialIconWithRedirectionUrl icon={'ri:drive-fill'} url={'https://www.instagram.com/'} />
//             <SocialIconWithRedirectionUrl icon={'mage:email'} url={'https://www.instagram.com/'} />
//             <SocialIconWithRedirectionUrl icon={'ri:amazon-fill'} url={'https://www.instagram.com/'} />
//           </Stack>
//           <Stack
//             direction={'column'}
//             spacing={0.5}
//             sx={{
//               position: 'absolute',
//               bottom: 8,
//               left: 8,
//               zIndex: 2,
//               boxShadow: 1,
//             }}
//           >
//             <CustomChip label={'Live Campaign'} color={'primary'} height="18px" />
//             <CustomChip label={'Current Status'} color={'primary'} />
//           </Stack>
//         </Stack>
//       </Stack>
//       <ManagePartnerRightPanel
//         view="QUICK"
//         fetchList={fetchList}
//         width="70%"
//         open={openPartnerRightPanel ? true : false}
//         data={openPartnerRightPanel}
//         onClose={() => setOpenPartnerRightPanel(false)}
//       />
//     </>
//   );
// };

// const CopyIconText = ({ icon, text, sx = {} }) => {
//   const [copied, setCopied] = React.useState(false);
//   const handleCopy = () => {
//     if (text) {
//       navigator.clipboard.writeText(text);
//       setCopied(true);
//       setTimeout(() => setCopied(), 1500);
//     }
//   };
//   return (
//     <Stack direction="row" alignItems="center" gap={1} sx={{ cursor: 'pointer', ...sx }}>
//       <Iconify icon={icon} />
//       <Typography variant="body2">{text}</Typography>
//       <Iconify
//         icon={copied ? 'mdi:check' : 'mdi:content-copy'}
//         sx={{ cursor: 'pointer', color: copied ? 'success.main' : 'text.secondary', width: 15, height: 15 }}
//         onClick={handleCopy}
//       />
//     </Stack>
//   );
// };

export const SocialIconWithText = ({ icon, url, text, value, sx = {} }) => {
  const handleRedirect = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ ...sx }}>
      <Iconify onClick={handleRedirect} sx={{ cursor: 'pointer' }} icon={icon} />
      <Typography variant="body2">{'  ' + text}</Typography>
      <Iconify icon="pepicons-pop:line-y" sx={{ color: 'grey.300' }} />
      <Typography variant="body2">{'  ' + value}</Typography>
    </Stack>
  );
};

export const SocialIconWithRedirectionUrl = ({ icon, url, text }) => {
  const handleRedirect = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Iconify onClick={handleRedirect} sx={{ cursor: 'pointer' }} icon={icon} />
      <Typography variant="body2">{text}</Typography>
    </Stack>
  );
};
