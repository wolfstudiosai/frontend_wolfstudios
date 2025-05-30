import { Fragment, useContext, useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  ClickAwayListener,
  IconButton,
  Paper,
  Popover,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { AvatarWithActiveStatus } from '/src/components/core/avatar-with-active-status';
import { Iconify } from '/src/components/iconify/iconify';

dayjs.extend(relativeTime);

const reactionOptions = ['👍', '❤️', '😂', '🎉', '😮'];

export const Message = ({ message, sidebar, pinnedTab = false, threadTab = false }) => {
  const {
    setActiveChannelThread,
    setActiveDirectThread,
    activeTab,
    createChannelReaction,
    removeChannelReaction,
    handleEditMessage,
    createDirectMessageReaction,
    removeDirectMessageReaction,
    deleteChannelMessage,
    deleteDirectMessage,
    pinChannelMessage,
    pinDirectMessage,
  } = useContext(ChatContext);

  const { userInfo } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const popperRef = useRef(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const confirmDialogRef = useRef(null);

  const handleDelete = () => {
    if (activeTab?.type === 'channel') {
      deleteChannelMessage(message?.id);
    } else {
      deleteDirectMessage(message?.id);
    }
    setOpenConfirmDialog(false);
  };

  const toggleReactionBar = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleReactionSelect = (emoji) => {
    setAnchorEl(null);
    if (activeTab?.type === 'channel') {
      createChannelReaction(message?.id, emoji);
    } else {
      createDirectMessageReaction(message?.id, emoji);
    }
  };

  const handleRemoveReaction = (emoji) => {
    if (activeTab?.type === 'channel') {
      removeChannelReaction(message?.id, emoji);
    } else {
      removeDirectMessageReaction(message?.id, emoji);
    }
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const emojis = message?.Reactions?.reduce((acc, { emoji }) => {
    const existingEmoji = acc.find((item) => item.emoji === emoji);
    const isYou = message?.Reactions?.find(
      (reaction) => reaction?.userId === userInfo?.id && reaction?.emoji === emoji
    )?.id;

    if (existingEmoji) {
      existingEmoji.count += 1;
    } else {
      acc.push({ emoji, count: 1, isYou: isYou ? true : false });
    }
    return acc;
  }, []);

  const isYourMessage =
    activeTab?.type === 'channel' ? message?.User?.id === userInfo?.id : message?.Sender?.id === userInfo?.id;

  return (
    <Stack
      direction="row"
      gap={1}
      sx={{
        position: 'relative',
        '&:hover .hover-action': { opacity: 1 },
      }}
    >
      <AvatarWithActiveStatus
        src={activeTab?.type === 'channel' ? message?.User?.profileImage : message?.Sender?.profileImage}
        alt={activeTab?.type === 'channel' ? message?.User?.profileImage : message?.Sender?.profileImage}
        sx={{
          ...(sidebar && { width: '28px', height: '28px' }),
        }}
        status={
          activeTab?.type === 'channel'
            ? message?.User?.chatStatus === 'ONLINE'
            : message?.Sender?.chatStatus === 'ONLINE'
        }
      />
      <Stack direction="column" gap={0.5}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography fontWeight={600}>
            {activeTab?.type === 'channel'
              ? `${message?.User?.firstName} ${message?.User?.lastName}`
              : `${message?.Sender?.firstName} ${message?.Sender?.lastName}`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {dayjs(message?.createdAt).fromNow()}
          </Typography>
        </Stack>

        {message?.deletedAt ? (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            This message was deleted
          </Typography>
        ) : (
          <Typography variant="body2">
            {message?.content}
            {message?.editedAt && <span style={{ fontSize: '12px', color: 'gray' }}> (edited)</span>}
          </Typography>
        )}

        {/* File Attachments */}
        {!message?.deletedAt && (
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ my: 1 }}>
            {message?.Attachments?.map((file, index) => (
              <Fragment key={index}>
                {file.type.startsWith('image/') ? (
                  <Box
                    component="img"
                    src={file.url}
                    alt={file.name}
                    sx={{ maxWidth: sidebar ? '120px' : '280px', borderRadius: 0.5 }}
                  />
                ) : (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    sx={{ border: '1px solid', borderColor: 'divider', width: '100%', p: 1, borderRadius: 0.5 }}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Iconify
                        icon="bx:file"
                        sx={{ width: sidebar ? '30px' : '50px', height: sidebar ? '30px' : '50px' }}
                      />
                      <Stack>
                        <Typography variant="h6" color="text.primary" sx={{ fontSize: sidebar ? '14px' : '16px' }}>
                          {file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new URL(file.url).hostname}
                        </Typography>
                      </Stack>
                    </Stack>
                    <IconButton
                      size="small"
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
                    >
                      ↗
                    </IconButton>
                  </Stack>
                )}
              </Fragment>
            ))}
          </Stack>
        )}

        {/* Reactions */}
        {!pinnedTab && !message?.deletedAt && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {emojis?.length > 0 &&
              emojis.map((e, i) => (
                <Chip
                  label={`${e?.emoji} ${e?.count > 0 ? e?.count : ''}`}
                  key={i}
                  color="inherit"
                  size="small"
                  sx={{
                    border: e?.isYou ? '0.5px solid var(--mui-palette-primary-main)' : '0.5px solid transparent',
                    bgcolor: e?.isYou ? '#e0e0ee' : '#eee',
                  }}
                  onClick={() => (e?.isYou ? handleRemoveReaction(e?.emoji) : handleReactionSelect(e?.emoji))}
                />
              ))}
            <IconButton size="small" aria-label="react" onClick={toggleReactionBar} ref={popperRef}>
              <Iconify icon="material-symbols:add-reaction-outline" />
            </IconButton>
            {message?.isThread && (
              <Button
                variant="text"
                onClick={() =>
                  activeTab?.type === 'channel'
                    ? setActiveChannelThread(message?.id)
                    : setActiveDirectThread(message?.id)
                }
                color="primary"
              >
                Show {message?.Replies?.length} more repl{message?.Replies?.length > 1 ? 'ies' : 'y'}
              </Button>
            )}
          </Stack>
        )}
      </Stack>

      {/* Hover actions */}
      {!message?.deletedAt && !pinnedTab && (
        <ButtonGroup
          className="hover-action"
          sx={{
            backgroundColor: 'var(--mui-palette-background-level2)',
            position: 'absolute',
            top: 0,
            right: 10,
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
          }}
        >
          {isYourMessage && (
            <IconButton title="Edit" onClick={() => handleEditMessage(message || null)}>
              <Iconify icon="material-symbols:edit-outline-rounded" />
            </IconButton>
          )}

          {isYourMessage && (
            <IconButton title="Delete" ref={confirmDialogRef} onClick={() => setOpenConfirmDialog(true)}>
              <Iconify icon="material-symbols:delete-outline-rounded" />
            </IconButton>
          )}
          {!threadTab && (
            <IconButton
              title="Reply in thread"
              onClick={() => {
                if (activeTab?.type === 'channel') setActiveChannelThread(message?.id);
                else setActiveDirectThread(message?.id);
              }}
            >
              <Iconify icon="mingcute:message-3-fill" />
            </IconButton>
          )}
          {!threadTab && (
            <IconButton
              title="Pin Message"
              onClick={() => {
                if (activeTab?.type === 'channel') {
                  pinChannelMessage(message?.id, !message?.isPinned);
                } else {
                  pinDirectMessage(message?.id, !message?.isPinned);
                }
              }}
            >
              <Iconify icon={message?.isPinned ? 'ri:unpin-line' : 'mingcute:pin-line'} />
            </IconButton>
          )}
        </ButtonGroup>
      )}

      {/* Reaction Popper */}
      {!pinnedTab && (
        <Popper open={open} anchorEl={anchorEl} placement="top-start">
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper sx={{ p: 1, display: 'flex', gap: 1, borderRadius: 2 }}>
              {reactionOptions.map((emoji) => (
                <Button
                  key={emoji}
                  onClick={() => handleReactionSelect(emoji)}
                  size="small"
                  sx={{ minWidth: '30px', fontSize: '1.2rem' }}
                >
                  {emoji}
                </Button>
              ))}
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}

      {/* Delte confirmation popover */}
      <Popover
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        anchorEl={confirmDialogRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            Are you sure want to delete?
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button size="small" variant="outlined" onClick={() => setOpenConfirmDialog(false)}>
              Cancel
            </Button>
            <Button size="small" variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Popover>
    </Stack>
  );
};

{
  /* <IconButton title="Copy">
          <Iconify icon="mingcute:copy-line" />
        </IconButton> */
}
{
  /* <IconButton title="Forward">
          <Iconify icon="flowbite:forward-outline" />
        </IconButton> */
}
{
  /* <IconButton title="Bookmark">
          <Iconify icon="material-symbols-light:bookmark-outline" />
        </IconButton> */
}

{
  /* <IconButton title="Like">
          <Iconify icon="solar:like-broken" />
        </IconButton> */
}
{
  /* <IconButton title="React" onClick={toggleReactionBar}>
          <Iconify icon="material-symbols:add-reaction-outline" />
        </IconButton> */
}

{
  /* Message */
}
{
  /* <Typography variant="body2">
          I have already prepared all styles and components according to our standards during the design phase, so the
          UI kit is 90% complete. All that remains is to add some states to the interactive elements and prepare the
          Lottie files for animations.{' '}
          <Link href="#" color="primary">
            @Emily D.
          </Link>
          , please take a look and let me know if you have any questions.
        </Typography> */
}

{
  /* Figma Link Card */
}
{
  /* <Card variant="outlined" sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box component="img" src="/figma-icon.svg" alt="figma" width={32} />
                            <Box>
                                <Typography fontWeight={500}>Conceptzilla website v.3.0</Typography>
                                <Typography variant="caption" color="text.secondary">www.figma.com</Typography>
                            </Box>
                        </Stack>
                        <Button size="small" variant="outlined" sx={{ textTransform: "none" }}>
                            Quick view
                        </Button>
                    </Card> */
}

{
  /* <Box
                  sx={{
                    p: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 0.5,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="body2">{file.name}</Typography>
                  <Button
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Open File
                  </Button>
                </Box> */
}
