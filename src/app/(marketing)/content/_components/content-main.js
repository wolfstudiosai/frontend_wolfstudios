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
        'https://rr3---sn-cvh76nes.googlevideo.com/videoplayback?expire=1737043629&ei=TdqIZ_fZBY7C9fwPybCSqA8&ip=183.83.237.129&id=o-ABJ3pSST1XzAJqXnYZdPwtqALalBmfb9WtBRwvvSTfw0&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&gcr=in&bui=AY2Et-PWDMJUOfgXv8jjfFBm7Ldg7-lVwusp4dtwX_WIEQaoXGvUZFr0ml-BWpjP8Z4ebfSZfUKbIoKO&spc=9kzgDbSG-PzyJHYrZJsUHTmKBxCwgNCrURfHm1O1xx3Nu2k6rIieBSG2ucFxZKXIig&vprv=1&svpuc=1&mime=video%2Fmp4&ns=wutWrgkrjcM8jV_l9MMtXikQ&rqh=1&gir=yes&clen=654278&ratebypass=yes&dur=8.490&lmt=1734964040655627&fexp=24350590,24350737,24350827,24350860,24350961,24350975,51326932,51331020,51335594,51353498,51371294,51384461&c=MWEB&sefc=1&txp=5530434&n=Swj_RFegVvkT-w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAJHGoB7oVnPg2N7d9rRNhcAq5fsjJLfhUm_gILXPyRLuAiAXO8ud7DSl8Obt2Jm_SL24rUlc5055l6n-3UqXRJTCQA%3D%3D&title=Tower&rm=sn-5jucgv5qc5oq-itqy7e,sn-h55sz7s&rrc=79,104&req_id=b690dfedb83ba3ee&rms=nxu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1737025898,&mh=Vb&mip=115.247.164.212&mm=30&mn=sn-cvh76nes&ms=nxu&mt=1737025707&mv=m&mvi=3&pl=21&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIgT7XYlMKU8jtIRzTN9skC6xytmjS7qg5za4zWFKEK5NECIQD19CrYwHgnNMWDLloOiWm8rJySVkVqqzxOvqo0O92opQ%3D%3D',
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
        'https://rr3---sn-cvh76nes.googlevideo.com/videoplayback?expire=1737043629&ei=TdqIZ_fZBY7C9fwPybCSqA8&ip=183.83.237.129&id=o-ABJ3pSST1XzAJqXnYZdPwtqALalBmfb9WtBRwvvSTfw0&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&gcr=in&bui=AY2Et-PWDMJUOfgXv8jjfFBm7Ldg7-lVwusp4dtwX_WIEQaoXGvUZFr0ml-BWpjP8Z4ebfSZfUKbIoKO&spc=9kzgDbSG-PzyJHYrZJsUHTmKBxCwgNCrURfHm1O1xx3Nu2k6rIieBSG2ucFxZKXIig&vprv=1&svpuc=1&mime=video%2Fmp4&ns=wutWrgkrjcM8jV_l9MMtXikQ&rqh=1&gir=yes&clen=654278&ratebypass=yes&dur=8.490&lmt=1734964040655627&fexp=24350590,24350737,24350827,24350860,24350961,24350975,51326932,51331020,51335594,51353498,51371294,51384461&c=MWEB&sefc=1&txp=5530434&n=Swj_RFegVvkT-w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAJHGoB7oVnPg2N7d9rRNhcAq5fsjJLfhUm_gILXPyRLuAiAXO8ud7DSl8Obt2Jm_SL24rUlc5055l6n-3UqXRJTCQA%3D%3D&title=Tower&rm=sn-5jucgv5qc5oq-itqy7e,sn-h55sz7s&rrc=79,104&req_id=b690dfedb83ba3ee&rms=nxu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1737025898,&mh=Vb&mip=115.247.164.212&mm=30&mn=sn-cvh76nes&ms=nxu&mt=1737025707&mv=m&mvi=3&pl=21&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIgT7XYlMKU8jtIRzTN9skC6xytmjS7qg5za4zWFKEK5NECIQD19CrYwHgnNMWDLloOiWm8rJySVkVqqzxOvqo0O92opQ%3D%3D',
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
        'https://rr3---sn-cvh76nes.googlevideo.com/videoplayback?expire=1737043629&ei=TdqIZ_fZBY7C9fwPybCSqA8&ip=183.83.237.129&id=o-ABJ3pSST1XzAJqXnYZdPwtqALalBmfb9WtBRwvvSTfw0&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&gcr=in&bui=AY2Et-PWDMJUOfgXv8jjfFBm7Ldg7-lVwusp4dtwX_WIEQaoXGvUZFr0ml-BWpjP8Z4ebfSZfUKbIoKO&spc=9kzgDbSG-PzyJHYrZJsUHTmKBxCwgNCrURfHm1O1xx3Nu2k6rIieBSG2ucFxZKXIig&vprv=1&svpuc=1&mime=video%2Fmp4&ns=wutWrgkrjcM8jV_l9MMtXikQ&rqh=1&gir=yes&clen=654278&ratebypass=yes&dur=8.490&lmt=1734964040655627&fexp=24350590,24350737,24350827,24350860,24350961,24350975,51326932,51331020,51335594,51353498,51371294,51384461&c=MWEB&sefc=1&txp=5530434&n=Swj_RFegVvkT-w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAJHGoB7oVnPg2N7d9rRNhcAq5fsjJLfhUm_gILXPyRLuAiAXO8ud7DSl8Obt2Jm_SL24rUlc5055l6n-3UqXRJTCQA%3D%3D&title=Tower&rm=sn-5jucgv5qc5oq-itqy7e,sn-h55sz7s&rrc=79,104&req_id=b690dfedb83ba3ee&rms=nxu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1737025898,&mh=Vb&mip=115.247.164.212&mm=30&mn=sn-cvh76nes&ms=nxu&mt=1737025707&mv=m&mvi=3&pl=21&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIgT7XYlMKU8jtIRzTN9skC6xytmjS7qg5za4zWFKEK5NECIQD19CrYwHgnNMWDLloOiWm8rJySVkVqqzxOvqo0O92opQ%3D%3D',
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
        'https://rr3---sn-cvh76nes.googlevideo.com/videoplayback?expire=1737043629&ei=TdqIZ_fZBY7C9fwPybCSqA8&ip=183.83.237.129&id=o-ABJ3pSST1XzAJqXnYZdPwtqALalBmfb9WtBRwvvSTfw0&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&gcr=in&bui=AY2Et-PWDMJUOfgXv8jjfFBm7Ldg7-lVwusp4dtwX_WIEQaoXGvUZFr0ml-BWpjP8Z4ebfSZfUKbIoKO&spc=9kzgDbSG-PzyJHYrZJsUHTmKBxCwgNCrURfHm1O1xx3Nu2k6rIieBSG2ucFxZKXIig&vprv=1&svpuc=1&mime=video%2Fmp4&ns=wutWrgkrjcM8jV_l9MMtXikQ&rqh=1&gir=yes&clen=654278&ratebypass=yes&dur=8.490&lmt=1734964040655627&fexp=24350590,24350737,24350827,24350860,24350961,24350975,51326932,51331020,51335594,51353498,51371294,51384461&c=MWEB&sefc=1&txp=5530434&n=Swj_RFegVvkT-w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cgcr%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAJHGoB7oVnPg2N7d9rRNhcAq5fsjJLfhUm_gILXPyRLuAiAXO8ud7DSl8Obt2Jm_SL24rUlc5055l6n-3UqXRJTCQA%3D%3D&title=Tower&rm=sn-5jucgv5qc5oq-itqy7e,sn-h55sz7s&rrc=79,104&req_id=b690dfedb83ba3ee&rms=nxu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1737025898,&mh=Vb&mip=115.247.164.212&mm=30&mn=sn-cvh76nes&ms=nxu&mt=1737025707&mv=m&mvi=3&pl=21&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRQIgT7XYlMKU8jtIRzTN9skC6xytmjS7qg5za4zWFKEK5NECIQD19CrYwHgnNMWDLloOiWm8rJySVkVqqzxOvqo0O92opQ%3D%3D',
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
