import { useContext, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, Breadcrumbs, IconButton, Link, Stack, TextField, Typography } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { Iconify } from '/src/components/iconify/iconify';

const messages = [
  {
    id: 1,
    content: "Hello, how are you?",
    time: "10:00 AM"
  },
  {
    id: 2,
    content: "lorem ipsum dolor sit amet consectetur adipisicing elit ",
    time: "08:04 AM"
  },
  {
    id: 3,
    content: "lorem ipsum dolor sit amet consectetur adipisicing elit lorem ipsum dolor sit amet consectetur adipisicing elit",
    time: "10:01 AM"
  },
]

export const Topbar = ({ isMobile }) => {
  const { activeTab, activeTabInfo } = useContext(ChatContext);
  const { userInfo } = useAuth();

  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const sender = activeTabInfo?.sender?.id === userInfo?.id ? activeTabInfo?.receiver : activeTabInfo?.sender;

  return (
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: 2,
        py: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        flexWrap: 'wrap',
      }}
    >
      {/* Left Section */}
      <Stack direction="row" spacing={1} alignItems="center">
        {activeTab?.type === 'direct' ? (
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar src={sender?.profileImage} alt={sender?.firstName} />
            <Typography sx={{ fontWeight: 'medium' }}>
              {sender?.firstName} {sender?.lastName}
            </Typography>
          </Stack>
        ) : (
          <>
            <Iconify icon="mdi:pound" fontSize={18} color="text.primary" />
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                href="/"
                color="text.primary"
                underline="none"
                sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
              >
                {activeTabInfo?.name}
              </Link>
              {/* <Link
                                    href="/material-ui/getting-started/installation/"
                                    color="text.primary"
                                    underline="none"
                                    sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
                                >
                                    v3.0
                                </Link>
                                <Link
                                    href="/material-ui/react-breadcrumbs/"
                                    color="text.primary"
                                    underline="none"
                                    aria-current="page"
                                    sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
                                >
                                    UI-kit design
                                </Link> */}
            </Breadcrumbs>
          </>
        )}
      </Stack>

      {/* Right Section */}
      <Stack direction="row" spacing={1} alignItems="center" position="relative">
        {isMobile ? (
          <>
            {/* Search Icon */}
            <IconButton size="small" onClick={() => setMobileSearchOpen((prev) => !prev)} sx={{ zIndex: 1100 }}>
              <SearchIcon fontSize="medium" />
            </IconButton>

            {/* Full-width Search Input */}
            {mobileSearchOpen && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 'calc(100% + 14px)',
                  right: -15,
                  width: '100vw',
                  px: 2,
                  zIndex: 1000,
                }}
              >
                <TextField
                  placeholder="Search messages..."
                  autoComplete="off"
                  fullWidth
                  value={search}
                  size="small"
                  autoFocus
                  onFocus={() => setShowResults(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowResults(false);
                      setMobileSearchOpen(false);
                    }, 100);
                  }}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ '& .MuiInputBase-root': { borderRadius: 1, bgcolor: '#fff' } }}
                />

                {showResults && (
                  <Box
                    sx={{
                      bgcolor: 'background.paper',
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Stack spacing={1}>
                      {messages.map((message) => (
                        <Box
                          key={message.id}
                          width="100%"
                          onClick={() => console.log(message)}
                          sx={{
                            cursor: 'pointer',
                            '&:hover .message-text': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          <Typography
                            className="message-text"
                            variant="body2"
                            sx={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {message.content}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {message.time}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            )}
          </>
        ) : (
          // Desktop search bar
          <Box sx={{ width: '250px', position: 'relative' }}>
            <TextField
              placeholder="Search messages..."
              autoComplete="off"
              fullWidth
              value={search}
              size="small"
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 100)}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ '& .MuiInputBase-root': { borderRadius: 0 } }}
            />
            {showResults && (
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  p: 2,
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Stack spacing={1}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      width="100%"
                      onClick={() => console.log(message)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover .message-text': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Typography
                        className="message-text"
                        variant="body2"
                        sx={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {message.content}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {message.time}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        )}

        <IconButton size="small">
          <Iconify icon="bi:three-dots" fontSize={20} />
        </IconButton>
        {/* <IconButton size="small">
          <Iconify icon="lucide:sparkle" fontSize={20} />
        </IconButton>
        <IconButton size="small">
          <Iconify icon="si:warning-line" fontSize={20} />
        </IconButton> */}
      </Stack>
    </Box>
  );
};
