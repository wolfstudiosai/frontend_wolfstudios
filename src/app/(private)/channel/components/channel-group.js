import { useState } from 'react';
import { Box, Chip, Collapse, List, ListItemButton, ListItemText } from '@mui/material';

import { Iconify } from '/src/components/iconify/iconify';

import { channelList } from '/src/mock_data';

export function ChannelGroup() {
  const [isFavouriteExpend, setIsFavouriteExpend] = useState(true);
  const [isChannelExpend, setIsChannelExpend] = useState(false);

  return (
    <Box>
      {channelList?.filter((c) => c.isFavourite)?.length > 0 && (
        <List>
          <ListItemButton onClick={() => setIsFavouriteExpend(!isFavouriteExpend)}>
            <ListItemText primary="Favourite" />
            <Iconify icon={isFavouriteExpend ? 'icon-park-solid:up-one' : 'prime:sort-down-fill'} />
          </ListItemButton>
          <Collapse in={isFavouriteExpend} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              {channelList
                .filter((c) => c.isFavourite)
                .map((channel) => (
                  <ListItemButton key={channel.id}>
                    <Iconify icon={channel.icon} />
                    <ListItemText primary={channel.name} />
                    {channel.newMessage > 0 && (
                      <Chip
                        label={channel.newMessage}
                        size="small"
                        fontSize={10}
                        color="text.primary"
                        sx={{ borderRadius: 1 }}
                      />
                    )}
                  </ListItemButton>
                ))}
            </List>
          </Collapse>
        </List>
      )}
      {channelList?.length > 0 && (
        <List>
          <ListItemButton onClick={() => setIsChannelExpend(!isChannelExpend)}>
            <ListItemText primary="Channels" />
            <Iconify icon={isChannelExpend ? 'icon-park-solid:up-one' : 'prime:sort-down-fill'} />
          </ListItemButton>
          <Collapse in={isChannelExpend} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 2 }}>
              {channelList.map((channel) => (
                <ListItemButton key={channel.id}>
                  <Iconify icon={channel.icon} />
                  <ListItemText primary={channel.name} />
                  {channel.newMessage > 0 && (
                    <Chip
                      label={channel.newMessage}
                      size="small"
                      fontSize={10}
                      color="text.primary"
                      sx={{ borderRadius: 1 }}
                    />
                  )}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      )}
    </Box>
  );
}
