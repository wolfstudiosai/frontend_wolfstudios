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
        'https://rr6---sn-gwpa-5bgk.googlevideo.com/videoplayback?expire=1736774257&ei=Eb6EZ6KTE4WGkucP-aTAoAw&ip=2a13%3A55c1%3Aa50e%3Ad7a6%3Ac180%3A2a8b%3A2d52%3A3735&id=o-AEDgi8Z2xBwR1pnbI5l3k_sXnuHWEIus8-2M96DBPT1f&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AY2Et-MqugNG3y_ZqGvRmlTVcJP9UH-zrx2AVICLFfRXUUVbWFVToNapMAY_X2FMc3N8B_xMJ8ya6D_K&vprv=1&svpuc=1&mime=video%2Fmp4&ns=S3kbpENwwZZsvHPmURLzZsoQ&rqh=1&gir=yes&clen=1612306&ratebypass=yes&dur=20.970&lmt=1736447232438523&lmw=1&fexp=24350590,24350737,24350827,24350974,51326932,51335594,51353498,51371294&c=TVHTML5&sefc=1&txp=5430534&n=i1u7rDv81QayWA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgOdqcuFcU88MfOECZn9FrtGwwoaZsLuF12NTcN5mDhYMCIQDvgmRyvFlqLqcBYOy4BBU56K15MeEvsutYZuprI_IyCw%3D%3D&title=these%20dolphins%20just%20really%20love%20hanging%20with%20Australian%20creator%20@FieldDays%20dolphins%20ocean%20sailing&redirect_counter=1&rm=sn-n4vlz7e&rrc=104&req_id=2dcbf9b423bca3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1736752670,&mh=Zj&mip=115.247.164.212&mm=31&mn=sn-gwpa-5bgk&ms=au&mt=1736751729&mv=u&mvi=6&pl=16&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIhAKfY8qQMOMEwKpZ3nb-YY6EvoCjxSGZ71TBvCBEZSwHeAiBhhWr9g01FSrHd1HHbzFLwY00hymAMcUTlftfmTInbmQ%3D%3D',
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
      video: 'https://www.w3schools.com/html/movie.mp4',
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
        'https://rr6---sn-gwpa-5bgk.googlevideo.com/videoplayback?expire=1736774257&ei=Eb6EZ6KTE4WGkucP-aTAoAw&ip=2a13%3A55c1%3Aa50e%3Ad7a6%3Ac180%3A2a8b%3A2d52%3A3735&id=o-AEDgi8Z2xBwR1pnbI5l3k_sXnuHWEIus8-2M96DBPT1f&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AY2Et-MqugNG3y_ZqGvRmlTVcJP9UH-zrx2AVICLFfRXUUVbWFVToNapMAY_X2FMc3N8B_xMJ8ya6D_K&vprv=1&svpuc=1&mime=video%2Fmp4&ns=S3kbpENwwZZsvHPmURLzZsoQ&rqh=1&gir=yes&clen=1612306&ratebypass=yes&dur=20.970&lmt=1736447232438523&lmw=1&fexp=24350590,24350737,24350827,24350974,51326932,51335594,51353498,51371294&c=TVHTML5&sefc=1&txp=5430534&n=i1u7rDv81QayWA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgOdqcuFcU88MfOECZn9FrtGwwoaZsLuF12NTcN5mDhYMCIQDvgmRyvFlqLqcBYOy4BBU56K15MeEvsutYZuprI_IyCw%3D%3D&title=these%20dolphins%20just%20really%20love%20hanging%20with%20Australian%20creator%20@FieldDays%20dolphins%20ocean%20sailing&redirect_counter=1&rm=sn-n4vlz7e&rrc=104&req_id=2dcbf9b423bca3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1736752670,&mh=Zj&mip=115.247.164.212&mm=31&mn=sn-gwpa-5bgk&ms=au&mt=1736751729&mv=u&mvi=6&pl=16&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIhAKfY8qQMOMEwKpZ3nb-YY6EvoCjxSGZ71TBvCBEZSwHeAiBhhWr9g01FSrHd1HHbzFLwY00hymAMcUTlftfmTInbmQ%3D%3D',
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
        'https://rr6---sn-gwpa-5bgk.googlevideo.com/videoplayback?expire=1736774257&ei=Eb6EZ6KTE4WGkucP-aTAoAw&ip=2a13%3A55c1%3Aa50e%3Ad7a6%3Ac180%3A2a8b%3A2d52%3A3735&id=o-AEDgi8Z2xBwR1pnbI5l3k_sXnuHWEIus8-2M96DBPT1f&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AY2Et-MqugNG3y_ZqGvRmlTVcJP9UH-zrx2AVICLFfRXUUVbWFVToNapMAY_X2FMc3N8B_xMJ8ya6D_K&vprv=1&svpuc=1&mime=video%2Fmp4&ns=S3kbpENwwZZsvHPmURLzZsoQ&rqh=1&gir=yes&clen=1612306&ratebypass=yes&dur=20.970&lmt=1736447232438523&lmw=1&fexp=24350590,24350737,24350827,24350974,51326932,51335594,51353498,51371294&c=TVHTML5&sefc=1&txp=5430534&n=i1u7rDv81QayWA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgOdqcuFcU88MfOECZn9FrtGwwoaZsLuF12NTcN5mDhYMCIQDvgmRyvFlqLqcBYOy4BBU56K15MeEvsutYZuprI_IyCw%3D%3D&title=these%20dolphins%20just%20really%20love%20hanging%20with%20Australian%20creator%20@FieldDays%20dolphins%20ocean%20sailing&redirect_counter=1&rm=sn-n4vlz7e&rrc=104&req_id=2dcbf9b423bca3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1736752670,&mh=Zj&mip=115.247.164.212&mm=31&mn=sn-gwpa-5bgk&ms=au&mt=1736751729&mv=u&mvi=6&pl=16&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIhAKfY8qQMOMEwKpZ3nb-YY6EvoCjxSGZ71TBvCBEZSwHeAiBhhWr9g01FSrHd1HHbzFLwY00hymAMcUTlftfmTInbmQ%3D%3D',
    },
    {
      name: 'Tamara Rzaeva',
      subtitle: 'Tamara Rzaeva',
      profileImage: 'https://picsum.photos/200/200?random=7',
      image: 'https://picsum.photos/300/200?random=7',
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
      image: 'https://picsum.photos/300/200?random=9',
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
      image: 'https://picsum.photos/300/200?random=11',
    },
    {
      name: 'Lydia DTLA',
      subtitle: 'Session Lydia',
      profileImage: 'https://picsum.photos/200/200?random=12',
      image: 'https://picsum.photos/300/200?random=12',
      video:
        'https://rr6---sn-gwpa-5bgk.googlevideo.com/videoplayback?expire=1736774257&ei=Eb6EZ6KTE4WGkucP-aTAoAw&ip=2a13%3A55c1%3Aa50e%3Ad7a6%3Ac180%3A2a8b%3A2d52%3A3735&id=o-AEDgi8Z2xBwR1pnbI5l3k_sXnuHWEIus8-2M96DBPT1f&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AY2Et-MqugNG3y_ZqGvRmlTVcJP9UH-zrx2AVICLFfRXUUVbWFVToNapMAY_X2FMc3N8B_xMJ8ya6D_K&vprv=1&svpuc=1&mime=video%2Fmp4&ns=S3kbpENwwZZsvHPmURLzZsoQ&rqh=1&gir=yes&clen=1612306&ratebypass=yes&dur=20.970&lmt=1736447232438523&lmw=1&fexp=24350590,24350737,24350827,24350974,51326932,51335594,51353498,51371294&c=TVHTML5&sefc=1&txp=5430534&n=i1u7rDv81QayWA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgOdqcuFcU88MfOECZn9FrtGwwoaZsLuF12NTcN5mDhYMCIQDvgmRyvFlqLqcBYOy4BBU56K15MeEvsutYZuprI_IyCw%3D%3D&title=these%20dolphins%20just%20really%20love%20hanging%20with%20Australian%20creator%20@FieldDays%20dolphins%20ocean%20sailing&redirect_counter=1&rm=sn-n4vlz7e&rrc=104&req_id=2dcbf9b423bca3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1736752670,&mh=Zj&mip=115.247.164.212&mm=31&mn=sn-gwpa-5bgk&ms=au&mt=1736751729&mv=u&mvi=6&pl=16&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIhAKfY8qQMOMEwKpZ3nb-YY6EvoCjxSGZ71TBvCBEZSwHeAiBhhWr9g01FSrHd1HHbzFLwY00hymAMcUTlftfmTInbmQ%3D%3D',
    },
  ];

  return (
    <>
      <Box
        component="div"
        sx={{
          columnCount: 4,
          columnWidth: '33%',
          WebkitColumnCount: 4,
          WebkitColumnWidth: '33%',
          MozColumnCount: 4,
          MozColumnWidth: '33%',
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
