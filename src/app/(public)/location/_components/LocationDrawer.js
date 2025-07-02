'use client';

import React from 'react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import { locations } from '../_utils/bevData';
import { DrawerContainer } from '../../../../components/drawer/drawer';

const LocationDrawer = ({ open, onClose }) => {
  return (
    <DrawerContainer open={open} handleDrawerClose={onClose} title="Locations" width="440px">
      <Box sx={{ px: 2, py: 1 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Explore Locations
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Hover or click on any location pin to see details on the map.
        </Typography>

        <List>
          {locations.map((loc) => (
            <ListItem key={loc.id} alignItems="flex-start">
              <ListItemAvatar>
                {loc.image ? (
                  <Avatar
                    variant="rounded"
                    src={loc.image}
                    alt={loc.city}
                    sx={{
                      width: { xs: 80, sm: 100, md: 112 },
                      height: { xs: 56, sm: 64, md: 72 },
                    }}
                  />
                ) : (
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: { xs: 80, sm: 100, md: 112 },
                      height: { xs: 56, sm: 64, md: 72 },
                      bgcolor: loc.color,
                    }}
                  >
                    {loc.city[0]}
                  </Avatar>
                )}
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography fontWeight="bold" sx={{ color: loc.color }}>
                    {loc.city}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" display="block">
                    {loc.state}, {loc.country} • {loc.address}
                  </Typography>
                }
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerContainer>
  );
};

export default LocationDrawer;
