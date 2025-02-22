'use client';
import { SectionTitle } from '/src/components/core/section-title';
import { Iconify } from '/src/components/iconify/iconify';
import { handleCopy } from '/src/utils/helper';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { useRef, useState } from "react";

export const ContentQuickView = ({ data }) => {

  const [comments, setComments] = useState([
    { id: 1, name: "Combina key", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ipsa repellat quibusdam natus culpa neque ducimus dolores quos corrupti tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.", time: "2m ago", files: [] },
    { id: 2, name: "Fazly Alahi Nahid", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ipsa repellat quibusdam natus culpa neque ducimus dolores quos corrupti tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.", time: "1m ago", files: [] },
    { id: 3, name: "Riayazul Haque", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, ipsa repellat quibusdam natus culpa neque ducimus dolores quos corrupti tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.", time: "just now", files: [] }
  ]);
  const [newComment, setNewComment] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const attachmentRef = useRef(null);

  const handleAddComment = () => {
    if (!newComment.trim() && !selectedFiles.length) return;

    const newCommentData = {
      id: comments.length + 1,
      name: "Combina Key",
      text: newComment,
      time: 'just now',
      files: selectedFiles.map((file => URL.createObjectURL(file))),
    };

    setComments([...comments, newCommentData]);
    setNewComment("");
    setSelectedFiles([]);
  };

  const handleFileSelect = (event) => {
    if (event.target.files?.length) {
      setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <Stack direction='row' gap={1}>
        <Stack sx={{ width: '60%' }}>
          <Box component='img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s' alt='model image' sx={{ height: '500px', objectFit: 'contain', border: '1px solid', borderColor: 'divider' }} />
          <Stack sx={{ mb: 4, pl: 1 }}>
            {
              comments.length > 0 && (
                <Timeline sx={{
                  [`& .${timelineItemClasses.root}:before`]: {
                    flex: 0,
                    padding: 0
                  },
                  px: 0,
                  py: 0
                }}>
                  {
                    comments.map((comment, index) => (
                      <TimelineItem key={comment.id}>
                        <TimelineSeparator>
                          <TimelineDot sx={{ backgroundColor: 'transparent', p: 0 }}>
                            <Avatar sx={{ width: '30px', height: '30px' }} />
                          </TimelineDot>
                          {index !== comments.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent sx={{ mt: 1 }}>
                          <Typography variant='h6'>{comment.name}
                            <Typography component='span' sx={{ ml: 1, fontSize: '0.9rem' }}>{comment.time}</Typography>
                          </Typography>
                          <Typography variant='body2' sx={{ color: 'text.secondary', mt: 0.5 }}>
                            {comment.text}
                          </Typography>
                          {
                            comment.files?.length > 0 && (
                              <Stack direction='row' gap={1} sx={{ flexWrap: 'wrap' }}>
                                {
                                  comment.files.map((file, index) => (
                                    <Box key={index} component='img' src={file} sx={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: 0.5 }} />
                                  ))
                                }
                              </Stack>
                            )
                          }
                        </TimelineContent>
                      </TimelineItem>
                    ))
                  }
                </Timeline>
              )
            }
            <Stack sx={{ pt: 1 }}>
              {
                selectedFiles.length > 0 && (
                  <>
                    <Stack direction='row' gap={0.6} sx={{ flexWrap: 'wrap' }}>
                      {
                        selectedFiles?.map((file, index) => (
                          <Box key={index} sx={{ width: '120px', height: '120px', position: 'relative' }}>
                            <Box component='img' src={URL.createObjectURL(file)} sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0.5 }} />
                            <IconButton size='small' sx={{ position: 'absolute', top: 3, right: 3, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '50%', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' } }} onClick={() => handleRemoveFile(index)}>
                              <Iconify icon='mingcute:close-fill' sx={{ color: '#fff', width: '16px', height: '16px' }} />
                            </IconButton>
                          </Box>
                        ))
                      }
                    </Stack>
                    <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
                  </>
                )
              }
              <FormControl variant="standard">
                <Input
                  placeholder='Add a comment...'
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
                      <IconButton size='small' sx={{ borderRadius: '50%' }} onClick={() => attachmentRef?.current?.click()}>
                        <Iconify icon='mage:attachment' sx={{ color: 'grey.800' }} />
                      </IconButton>
                      <IconButton size='small' sx={{ borderRadius: '50%' }}>
                        <Iconify icon='material-symbols-light:add-reaction-outline' sx={{ color: 'grey.800' }} />
                      </IconButton>
                      <IconButton size='small' sx={{ borderRadius: '50%', ...((newComment.length > 0 || selectedFiles.length > 0) && { backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }) }} onClick={handleAddComment}>
                        <Iconify icon='mingcute:arrow-up-fill' sx={{ color: (newComment.length > 0 || selectedFiles.length > 0) ? '#fff' : 'grey.800' }} />
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
          <Typography variant='h6'>Content title</Typography>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>12 mar, 2024 by Combina key</Typography>
            <Chip size='small' variant='soft' label='Good for Stories' />
          </Stack>
          <Stack direction="row" alignItems='center'>
            <IconButton size='small' onClick={() => handleCopy('https://drive.google.com' || '')} sx={{ borderRadius: '50%' }}>
              <Iconify icon="mingcute:drive-fill" sx={{ color: 'text.secondary' }} />
            </IconButton>
            <IconButton size='small' onClick={() => handleCopy('https://playbook.com' || '')} sx={{ borderRadius: '50%' }}>
              <Iconify icon="solar:book-bold" sx={{ color: 'text.secondary' }} />
            </IconButton>
          </Stack>
          <Stack direction='row' gap={1} sx={{ mt: 1 }}>
            <Box sx={{ width: '50%' }}>
              <SectionTitle title="Content Information" sx={{ px: 2, py: 1, borderRadius: 1, fontSize: '0.9rem' }} />
              <Box sx={{ ml: 1, mt: 1 }}>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Instagram like: 1234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Instagram comment: 154</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Instagram share: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Instagram view: 3444</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Instagram social sets used: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>REVO Twitter: Not Posted</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>REVO Tiktok: Not Posted</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>REVO Tiktok view: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Tiktok account used: Not Posted</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Tiktok dummy account used: N/A</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Youtube account used: N/A</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Youtube view: 234</Typography>
              </Box>
            </Box>
            <Box sx={{ width: '50%' }}>
              <SectionTitle title="Partner Information" sx={{ px: 2, py: 1, borderRadius: 1, fontSize: '0.9rem' }} />
              <Box sx={{ ml: 1, mt: 1 }}>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Instagram link: https://instagram.com</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>TikTok link: https://tiktok.com</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>TikTok comment: Partner comment</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>TikTok like: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>TikTok comments: 3444</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>TikTok share: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>TikTok view: 4434</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>TikTok save: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Youtube link: https://youtube.com</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Youtube like: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Youtube comment: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Youtube save: 234</Typography>
                <Typography variant='body2' sx={{ color: 'text.seconday', fontSize: '0.8rem' }}>Youtube view: 234</Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
      {/* File input (Hidden) */}
      <input
        ref={attachmentRef}
        type="file"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileSelect}
        multiple
      />
    </>
  );
};