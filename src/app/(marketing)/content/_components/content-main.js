'use client';

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { RightSlideContent } from './right-slide-content';

export const ContentMain = () => {
  const contentData = [
    {
      name: 'Mary Ann',
      subtitle: 'Session',
      profileImage: 'https://picsum.photos/300/200?random=1',
      video:
        'https://download-video-ak.vimeocdn.com/v3-1/playback/ce642710-fb3f-48ad-9be8-bf46d36fc501/4afb32f1-4557263b?__token__=st=1737458958~exp=1737473358~acl=%2Fv3-1%2Fplayback%2Fce642710-fb3f-48ad-9be8-bf46d36fc501%2F4afb32f1-4557263b%2A~hmac=5c4805a7e81b13faa940053efc96d84607bcd7a838c5d72c20d9b4a32624761a&r=dXMtZWFzdDE%3D',
    },
    {
      name: 'Prints: Abstract',
      subtitle: 'Abstract',
      profileImage: 'https://picsum.photos/200/200?random=2',
      image: 'https://picsum.photos/300/200?random=2',
    },
    {
      name: 'Kansha: Love Bite',
      subtitle: 'Love Bite',
      profileImage: 'https://picsum.photos/200/200?random=3',
      video: 'https://download-video-ak.vimeocdn.com/v3-1/playback/1dfc892f-1d1f-4d4d-b8db-e0be71ea4008/249d49c9-b632bf29?__token__=st=1737459110~exp=1737473510~acl=%2Fv3-1%2Fplayback%2F1dfc892f-1d1f-4d4d-b8db-e0be71ea4008%2F249d49c9-b632bf29%2A~hmac=1b14a0f17b7d0adea9b29fa299a6ce9fa5b2a70e5c601f0778b81d7ef2001af2&r=dXMtd2VzdDE%3D',
    },
    {
      name: 'Pump Magazine: Sharee',
      subtitle: 'Pump Magazine',
      profileImage: 'https://picsum.photos/200/200?random=4',
      image: 'https://picsum.photos/300/200?random=4',
    },
    {
      name: 'Elegant Magazine: Elena',
      subtitle: 'Elegant Magazine',
      profileImage: 'https://picsum.photos/200/200?random=5',
      video:
        'https://download-video-ak.vimeocdn.com/v3-1/playback/ec554af8-860b-42d8-a461-9719ac5d99f9/28e95967-a6a23904?__token__=st=1737459684~exp=1737474084~acl=%2Fv3-1%2Fplayback%2Fec554af8-860b-42d8-a461-9719ac5d99f9%2F28e95967-a6a23904%2A~hmac=1e21a9273115ed8ea0ad258737f170cb2a96e9d7dc06ee9e94efcb6428b9dab7&r=dXMtY2VudHJhbDE%3D',
    },
    {
      name: 'Virat Kohli',
      subtitle: 'Tamara Rzaeva',
      profileImage: 'https://picsum.photos/200/200?random=7',
      image: 'https://picsum.photos/300/200?random=7',
    },
    {
      name: 'Imirage Mag',
      subtitle: 'Imirage Mag',
      profileImage: 'https://picsum.photos/200/200?random=6',
      video:
        'https://download-video-ak.vimeocdn.com/v3-1/playback/322eb8b7-e1c9-481d-a725-2d0060e439fa/337f14bf-00b70bac?__token__=st=1737459233~exp=1737473633~acl=%2Fv3-1%2Fplayback%2F322eb8b7-e1c9-481d-a725-2d0060e439fa%2F337f14bf-00b70bac%2A~hmac=f9f6e67e442b5454704d0210d086e80765af2e8a28ea52c963a3d2127928181c&r=dXMtZWFzdDE%3D',
    },
    {
      name: 'Tamara Rzaeva',
      subtitle: 'Tamara Rzaeva',
      profileImage: 'https://picsum.photos/200/200?random=7',
      video: 'https://download-video-ak.vimeocdn.com/v3-1/playback/322eb8b7-e1c9-481d-a725-2d0060e439fa/337f14bf-00b70bac?__token__=st=1737459233~exp=1737473633~acl=%2Fv3-1%2Fplayback%2F322eb8b7-e1c9-481d-a725-2d0060e439fa%2F337f14bf-00b70bac%2A~hmac=f9f6e67e442b5454704d0210d086e80765af2e8a28ea52c963a3d2127928181c&r=dXMtZWFzdDE%3D',
    },
    {
      name: 'Street Style: Karla Marie',
      subtitle: 'Street Style',
      profileImage: 'https://picsum.photos/200/200?random=8',
      image: 'https://picsum.photos/300/200?random=8',
    },
    {
      name: 'Shuba Magazine: Jyaira Moore',
      subtitle: 'Shuba Magazine',
      profileImage: 'https://picsum.photos/200/200?random=9',
      video: 'https://download-video-ak.vimeocdn.com/v3-1/playback/af685398-2f59-4498-87d8-ae78e3cacbae/782103a5-27f7e319?__token__=st=1737459581~exp=1737473981~acl=%2Fv3-1%2Fplayback%2Faf685398-2f59-4498-87d8-ae78e3cacbae%2F782103a5-27f7e319%2A~hmac=273a50dc6258fe7a8f81904808bb410647e11cafccae9a62c30f5723c0873923&r=dXMtY2VudHJhbDE%3D',
    },
    {
      name: 'Elena Tretyakova',
      subtitle: 'Elena Tretyakova',
      profileImage: 'https://picsum.photos/200/200?random=10',
      image: 'https://picsum.photos/300/200?random=10',
    },
    {
      name: 'Lissa DeLorenzo',
      subtitle: 'Lissa DeLorenzo',
      profileImage: 'https://picsum.photos/200/200?random=11',
      video: 'https://download-video-ak.vimeocdn.com/v3-1/playback/a0d678e8-f719-4f34-bc13-123f060601b9/936c33c4-2ff1a841?__token__=st=1737459441~exp=1737473841~acl=%2Fv3-1%2Fplayback%2Fa0d678e8-f719-4f34-bc13-123f060601b9%2F936c33c4-2ff1a841%2A~hmac=d09dfb2d4cc694394d24265c4e644efc7686655a78cc4a3aa1d74bc85a457c25&r=dXMtd2VzdDE%3D',
    },
    {
      name: 'Lydia DTLA',
      subtitle: 'Session Lydia',
      profileImage: 'https://picsum.photos/200/200?random=12',
      image: 'https://picsum.photos/300/200?random=12',
      video:
        'https://download-video-ak.vimeocdn.com/v3-1/playback/322eb8b7-e1c9-481d-a725-2d0060e439fa/337f14bf-00b70bac?__token__=st=1737459233~exp=1737473633~acl=%2Fv3-1%2Fplayback%2F322eb8b7-e1c9-481d-a725-2d0060e439fa%2F337f14bf-00b70bac%2A~hmac=f9f6e67e442b5454704d0210d086e80765af2e8a28ea52c963a3d2127928181c&r=dXMtZWFzdDE%3D',
    },
  ];

  return (
    <>
      <Box
        component="div"
        sx={{
          '@media screen and (min-width: 1921px) and (max-width: 2560px)': {
            columnCount: 8,
          },
          '@media screen and (min-width: 1281px) and (max-width: 1920px)': {
            columnCount: 5,
          },
          '@media screen and (min-width: 1024px) and (max-width: 1280px)': {
            columnCount: 3,
          },
          '@media screen and (min-width: 601px) and (max-width: 1023px)': {
            columnCount: 2,
            columnWidth: '50%',
          },
          '@media screen and (max-width: 600px)': {
            columnCount: 1,
            columnWidth: '100%',
          },
        }}
      >
        {contentData.map((content, index) => {
          return (
            <Box key={index} sx={{ marginBottom: '12px' }}>
              <VideoContentCard content={content} styled={{ width: '100%' }} />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

const VideoContentCard = ({ content }) => {
  const [openRightPanel, setOpenRightPanel] = React.useState(false);
  const [rightPanelData, setRightPanelData] = React.useState(null);

  const handleOpenRightPanel = (data) => {
    setOpenRightPanel(true);
    setRightPanelData(data);
  };

  return (
    <Box>
      <Paper elevation={0} variant="outlined" sx={{ border: 0 }}>
        {content.video ? (
          <Box
            component="video"
            src={content.video}
            controls
            sx={{ width: '100%', objectFit: 'cover', border: 0, borderRadius: '20px' }}
          />
        ) : (
          <Box
            component="img"
            src={content.image}
            sx={{ width: '100%', objectFit: 'cover', border: 0, borderRadius: '20px' }}
          />
        )}
        <Box p={1}>
          <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
            {content.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={content.profileImage}
              sx={{
                height: 40,
                width: 40,
                borderRadius: '50%',
                marginRight: 2,
              }}
            />
            <Typography
              variant="body2"
              sx={{ cursor: 'pointer' }}
              color="text.secondary"
              onClick={() => handleOpenRightPanel(content)}
            >
              {content.subtitle}
            </Typography>
          </Box>
        </Box>
        {openRightPanel && (
          <RightSlideContent open={true} data={rightPanelData} onClose={() => setOpenRightPanel(false)} />
        )}
      </Paper>
    </Box>
  );
};
