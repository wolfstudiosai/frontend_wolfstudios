'use client';

import { useRef, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Avatar, Box, Chip, Divider, IconButton, Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import dayjs from 'dayjs';

import { SectionTitle } from '/src/components/core/section-title';
import { Iconify } from '/src/components/iconify/iconify';

import { handleCopy } from '/src/utils/helper';

export const ContentQuickView = ({ data }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Combina key',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ipsa repellat quibusdam natus culpa neque ducimus dolores quos corrupti tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      time: '2m ago',
      files: [],
    },
    {
      id: 2,
      name: 'Fazly Alahi Nahid',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ipsa repellat quibusdam natus culpa neque ducimus dolores quos corrupti tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      time: '1m ago',
      files: [],
    },
    {
      id: 3,
      name: 'Riayazul Haque',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ipsa repellat quibusdam natus culpa neque ducimus dolores quos corrupti tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      time: 'just now',
      files: [],
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const attachmentRef = useRef(null);

  const handleAddComment = () => {
    if (!newComment.trim() && !selectedFiles.length) return;

    const newCommentData = {
      id: comments.length + 1,
      name: 'Combina Key',
      text: newComment,
      time: 'just now',
      files: selectedFiles.map((file) => URL.createObjectURL(file)),
    };

    setComments([...comments, newCommentData]);
    setNewComment('');
    setSelectedFiles([]);
  };

  const handleFileSelect = (event) => {
    if (event.target.files?.length) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Stack direction="row" gap={1}>
        <Stack sx={{ width: '60%' }}>
          <Box
            component="img"
            src={data?.Image?.at(0) || '/'}
            alt={data?.Name}
            sx={{ height: '500px', objectFit: 'contain', border: '1px solid', borderColor: 'divider' }}
          />
          <Stack sx={{ mb: 4, pl: 1 }}>
            {data?.ContentHQComments?.length > 0 && (
              <Timeline
                sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0,
                  },
                  px: 0,
                  py: 0,
                }}
              >
                {data?.ContentHQComments?.map((comment, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot sx={{ backgroundColor: 'transparent', p: 0 }}>
                        <Avatar sx={{ width: '30px', height: '30px' }} />
                      </TimelineDot>
                      {index !== comments.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent sx={{ mt: 1 }}>
                      <Typography variant="h6">
                        {comment?.user?.firstName} {comment?.user?.lastName}
                        <Typography component="span" sx={{ ml: 1, fontSize: '0.9rem' }}>
                          {dayjs(comment?.createdAt).format('DD MMM, YYYY')}
                        </Typography>
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                        {comment?.comment}
                      </Typography>
                      {comment.files?.length > 0 && (
                        <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap' }}>
                          {comment.files.map((file, index) => (
                            <Box
                              key={index}
                              component="img"
                              src={file}
                              sx={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: 0.5 }}
                            />
                          ))}
                        </Stack>
                      )}
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            )}
            <Stack sx={{ pt: 1 }}>
              {selectedFiles.length > 0 && (
                <>
                  <Stack direction="row" gap={0.6} sx={{ flexWrap: 'wrap' }}>
                    {selectedFiles?.map((file, index) => (
                      <Box key={index} sx={{ width: '120px', height: '120px', position: 'relative' }}>
                        <Box
                          component="img"
                          src={URL.createObjectURL(file)}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0.5 }}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 3,
                            right: 3,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            borderRadius: '50%',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                          }}
                          onClick={() => handleRemoveFile(index)}
                        >
                          <Iconify icon="mingcute:close-fill" sx={{ color: '#fff', width: '16px', height: '16px' }} />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                  <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                </>
              )}
              <FormControl variant="standard">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <Avatar sx={{ width: '30px', height: '30px' }} />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end" sx={{ display: 'flex', gap: 0.2 }}>
                      <IconButton
                        size="small"
                        sx={{ borderRadius: '50%' }}
                        onClick={() => attachmentRef?.current?.click()}
                      >
                        <Iconify icon="mage:attachment" sx={{ color: 'grey.800' }} />
                      </IconButton>
                      <IconButton size="small" sx={{ borderRadius: '50%' }}>
                        <Iconify icon="material-symbols-light:add-reaction-outline" sx={{ color: 'grey.800' }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          borderRadius: '50%',
                          ...((newComment.length > 0 || selectedFiles.length > 0) && {
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.main' },
                          }),
                        }}
                        onClick={handleAddComment}
                      >
                        <Iconify
                          icon="mingcute:arrow-up-fill"
                          sx={{ color: newComment.length > 0 || selectedFiles.length > 0 ? '#fff' : 'grey.800' }}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 0, pb: 1, borderRadius: 0 }}
                />
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{ width: '40%' }}>
          <Typography variant="h6">{data?.Name}</Typography>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {data?.MonthUploaded} by Combina key
            </Typography>
            {data?.PostingQuality?.map((p, i) => (
              <Chip key={i} size="small" variant="soft" label={p} />
            ))}
          </Stack>
          <Stack direction="row" alignItems="center">
            <IconButton
              size="small"
              onClick={() => handleCopy(data?.GoogleDriveFiles || '')}
              sx={{ borderRadius: '50%' }}
            >
              <Iconify icon="mingcute:drive-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
            <IconButton size="small" onClick={() => handleCopy(data?.PlaybookLink || '')} sx={{ borderRadius: '50%' }}>
              <Iconify icon="solar:book-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Stack>
          <Stack direction="row" gap={1} sx={{ mt: 1 }}>
            <Box sx={{ width: '50%' }}>
              <SectionTitle title="Content Information" sx={{ px: 2, py: 1, borderRadius: 1, fontSize: '0.9rem' }} />
              <Box sx={{ ml: 1, mt: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Instagram like: {data?.IGTotalLikes}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Instagram comment: {data?.IGTotalComments}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Instagram share: {data?.IGTotalShares}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Instagram view: {data?.IGTotalViews}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Instagram social sets used: {data?.IGSocialSetsUsed}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  REVO Twitter: {data?.REVOTwitter}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  REVO Tiktok: {data?.REVOTikTok}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  REVO Tiktok view: {data?.REVOTTViews}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Tiktok account used: {data?.TikTokAccountsused}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Tiktok dummy account used: {data?.TTDummyAccountsUsed?.at(0)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Youtube account used: {data?.YTAccountsUsed}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Youtube view: {data?.YTClubREVOTotalViews}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: '50%' }}>
              <SectionTitle title="Partner Information" sx={{ px: 2, py: 1, borderRadius: 1, fontSize: '0.9rem' }} />
              <Box sx={{ ml: 1, mt: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Instagram link: {data?.PartnerIGLink}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  TikTok link: {data?.PartnerTikTokLink}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  TikTok comment: {data?.PartnerTTComments}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  TikTok like: {data?.PartnerTTLikes}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  TikTok comments: {data?.PartnerTTComments}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  TikTok share: {data?.PartnerTTShares}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  TikTok view: {data?.PartnerTTViews}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  TikTok save: {data?.PartnerTTSaves}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Youtube link: {data?.PartnerYTLink}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Youtube like: {data?.YTPartnerTotallikes}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Youtube comment: {data?.YTPartnerTotalcomments}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Youtube save: {data?.YTPartnerTotalSaves}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>
                  Youtube view: {data?.YTPartnerTotalViews}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
      {/* File input (Hidden) */}
      <input
        ref={attachmentRef}
        type="file"
        style={{ display: 'none' }}
        id="file-upload"
        onChange={handleFileSelect}
        multiple
      />
    </>
  );
};
