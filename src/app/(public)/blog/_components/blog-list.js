'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Drawer, Typography, useColorScheme } from '@mui/material';
import { motion } from 'framer-motion';

import { blogListData } from '../../../../mock_data/blog-list-data';

export const BlogList = () => {
  const { mode } = useColorScheme();
  const [selectedBlog, setSelectedBlog] = React.useState(null);

  return (
    <>
      <Box
        component="section"
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          borderBottom: 'none',
          color: mode === 'dark' ? 'white' : 'black',
          mt: 10,
        }}
      >
        {/* Top 2 large posts */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            borderBottom: '1px solid',
            borderColor: 'var(--mui-palette-divider)',
          }}
        >
          {blogListData.slice(0, 2).map((blog, i) => (
            <Box
              component={motion.div}
              key={blog.id}
              whileHover="hover"
              initial="initial"
              onClick={() => setSelectedBlog(blog)}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                minHeight: 590,
                p: 6,
                color: mode === 'dark' ? 'white' : 'black',
                transition: 'color 0.3s ease',
                borderBottom: { xs: '1px solid var(--mui-palette-divider)', md: 'none' },
                borderRight: i === 0 ? '1px solid var(--mui-palette-divider)' : 'none',
              }}
            >
              {/* Background image motion */}
              <motion.div
                component="div"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${blog.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  zIndex: 1,
                }}
                variants={{
                  initial: { height: '0%' },
                  hover: {
                    height: '100%',
                    transition: {
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
              />

              {/* Text Content */}
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography fontWeight={600}>{blog.category}</Typography>
                  <Box
                    component={motion.div}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: 'var(--mui-palette-divider)',
                      mx: 1,
                      transition: 'background-color 0.3s ease',
                      '.MuiBox-root:hover &': {
                        backgroundColor: mode === 'dark' ? 'white' : 'black',
                      },
                    }}
                  />
                  <Typography fontWeight={500}>{blog.date}</Typography>
                </Box>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 1, fontSize: '3rem' }}>
                  {blog.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    transition: 'opacity 0.3s ease',
                    '.MuiBox-root:hover &': { opacity: 0 },
                  }}
                >
                  {blog.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Remaining posts */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            borderColor: 'var(--mui-palette-divider)',
          }}
        >
          {blogListData.slice(2).map((blog, i) => {
            const isLastInRowMobile = i % 2 === 1;
            const isLastInRowTablet = i % 3 === 2;
            const isLastInRowDesktop = i % 4 === 3;

            return (
              <Box
                key={blog.id}
                component={motion.div}
                whileHover="hover"
                initial="initial"
                onClick={() => setSelectedBlog(blog)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  p: 6,
                  color: mode === 'dark' ? 'white' : 'black',
                  borderBottom: '1px solid var(--mui-palette-divider)',
                  minHeight: 480,
                  borderRight: {
                    xs: !isLastInRowMobile ? '1px solid var(--mui-palette-divider)' : 'none',
                    md: !isLastInRowTablet ? '1px solid var(--mui-palette-divider)' : 'none',
                    lg: !isLastInRowDesktop ? '1px solid var(--mui-palette-divider)' : 'none',
                  },
                  transition: 'color 0.3s ease',
                }}
              >
                <motion.div
                  component="div"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${blog.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1,
                  }}
                  variants={{
                    initial: { height: '0%' },
                    hover: {
                      height: '100%',
                      transition: {
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    },
                  }}
                />

                {/* Text content */}
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography fontWeight={600}>{blog.category}</Typography>
                    <Box
                      component={motion.div}
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: 'var(--mui-palette-divider)',
                        mx: 1,
                        transition: 'background-color 0.3s ease',
                        '.MuiBox-root:hover &': {
                          backgroundColor: mode === 'dark' ? 'white' : 'black',
                        },
                      }}
                    />
                    <Typography fontWeight={500}>{blog.date}</Typography>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontSize: '1.75rem' }}>
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.25rem',
                      fontWeight: 500,
                      transition: 'opacity 0.3s ease',
                      '.MuiBox-root:hover &': { opacity: 0 },
                    }}
                  >
                    {blog.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {selectedBlog && (
        <Drawer
          anchor="right"
          open={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          sx={{
            '& .MuiDrawer-paper': {
              width: { xs: '100%', md: '600px' },
              maxWidth: '600px',
              p: 2,
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box>
              <Image
                src={selectedBlog.image}
                alt={selectedBlog.title}
                width={500}
                height={500}
                style={{ width: '100%', maxHeight: '400px', objectFit: "contain" }}
              />
            </Box>
            <Box mt={2}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, fontSize: '1.75rem' }}>
                {selectedBlog.title}
              </Typography>
              <Typography variant="body2" mt={4}>
                {selectedBlog.description}
              </Typography>
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};
