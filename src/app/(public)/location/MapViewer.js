'use client';

import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Icon, IconButton, Typography } from '@mui/material';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';

import { config } from '/src/config';

import LocationDrawer from './_components/LocationDrawer';
import { grayTheme, locations } from './_utils/bevData';

const MapViewer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);

  const createCustomMarkerIcon = (color) => ({
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 0,
    scale: 1.5,
    anchor: window.google ? new window.google.maps.Point(12, 24) : null,
  });

  const LocationCard = ({ location }) => (
    <Box sx={{ paddingLeft: 1, minWidth: 160 }}>
      <Typography variant="body1" fontWeight="bold">
        {location.city}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {location.state}, {location.country}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {location.address}
      </Typography>
    </Box>
  );

  return (
    <>
      <Box sx={{ height: '100vh', width: '100vw', m: 0, p: 0, position: 'relative' }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 999,
            bgcolor: 'white',
            boxShadow: 2,
            borderRadius: '50%',
            '&:hover': {
              bgcolor: 'grey.100',
            },
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <LoadScript googleMapsApiKey={config.googleMap.apiKey}>
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={{ lat: 39.8283, lng: -98.5795 }}
            zoom={4}
            options={{
              styles: grayTheme,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              disableDefaultUI: true,
            }}
          >
            {locations.map((loc) => (
              <Marker
                key={loc.id}
                position={{ lat: loc.latitude, lng: loc.longitude }}
                onMouseOver={() => setHoveredLocation(loc)}
                onMouseOut={() => !activeLocation && setHoveredLocation(null)}
                onClick={() => {
                  setActiveLocation(loc);
                  setHoveredLocation(null);
                }}
                icon={createCustomMarkerIcon(loc.color)}
                options={{ optimized: false }}
                animation={
                  activeLocation?.id === loc.id
                    ? window.google.maps.Animation.BOUNCE
                    : hoveredLocation?.id === loc.id
                      ? window.google.maps.Animation.DROP
                      : null
                }
              />
            ))}

            {hoveredLocation && !activeLocation && (
              <InfoWindow
                position={{ lat: hoveredLocation.latitude, lng: hoveredLocation.longitude }}
                options={{ disableAutoPan: true, pixelOffset: new window.google.maps.Size(0, -40) }}
              >
                <LocationCard location={hoveredLocation} />
              </InfoWindow>
            )}

            {activeLocation && (
              <InfoWindow
                position={{ lat: activeLocation.latitude, lng: activeLocation.longitude }}
                onCloseClick={() => setActiveLocation(null)}
                options={{ disableAutoPan: true, pixelOffset: new window.google.maps.Size(0, -40) }}
              >
                <LocationCard location={activeLocation} />
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </Box>

      <LocationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default MapViewer;
