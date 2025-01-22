// 'use client';

// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import Stack from '@mui/material/Stack';
// import Tooltip from '@mui/material/Tooltip';
// import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
// import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
// import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

// // const user = {
// //   id: 'USR-000',
// //   name: 'Sofia Rivers',
// //   avatar: '/assets/avatar.png',
// //   email: 'sofia@devias.io',
// // };

// export function MessageAdd({ disabled = false, onSend }) {
//   const [content, setContent] = React.useState('');
//   const fileInputRef = React.useRef(null);
//   const [file, setFile] = React.useState(null);
//   const handleAttach = React.useCallback(() => {
//     fileInputRef.current?.click();
//   }, []);
//   const handleFileChange = React.useCallback((event) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   }, []);
//   const handleChange = React.useCallback((event) => {
//     setContent(event.target.value);
//   }, []);

//   const handleSend = React.useCallback(() => {
//     if (!content && !fileInputRef.current?.files[0]) {
//       return;
//     }
  
//     const file = fileInputRef.current?.files[0] || null;
  
//     onSend?.(file ? 'FILE' : 'TEXT', content, file);
//     setContent('');
//     if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
//   }, [content, onSend]);
  

//   const handleKeyUp = React.useCallback(
//     (event) => {
//       if (event.code === 'Enter') {
//         handleSend();
//       }
//     },
//     [handleSend]
//   );

//   return (
//     <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '0 0 auto', px: 3, py: 1 }}>
//       {/* <Avatar src={user.avatar} sx={{ display: { xs: 'none', sm: 'inline' } }} /> */}
//       <OutlinedInput
//         disabled={disabled}
//         onChange={handleChange}
//         onKeyUp={handleKeyUp}
//         placeholder="Leave a message"
//         sx={{ flex: '1 1 auto', borderRadius: 4 }}
//         value={content}
//         endAdornment={
//           <InputAdornment position="end">
//             <Tooltip title="Add emoji">
//               <span>
//                 <IconButton disabled={disabled} onClick={handleEmoji}>
//                   <EmojiEmotionsIcon />
//                 </IconButton>
//               </span>
//             </Tooltip>
//             <Tooltip title="Attach file">
//               <span>
//                 <IconButton disabled={disabled} onClick={handleAttach} 
//                 value={file}

//                 >
//                   <PaperclipIcon />
//                 </IconButton>
//               </span>
//             </Tooltip>
//             <Tooltip title="Send">
//               <span>
//                 <IconButton
//                   color="primary"
//                   disabled={!content || disabled}
//                   onClick={handleSend}
//                   sx={{
//                     bgcolor: 'var(--mui-palette-primary-main)',
//                     color: 'var(--mui-palette-primary-contrastText)',
//                     '&:hover': { bgcolor: 'var(--mui-palette-primary-dark)' },
//                     borderRadius:50
//                   }}
//                 >
//                   <PaperPlaneTiltIcon />
//                 </IconButton>
//               </span>

//             </Tooltip>
            
//           </InputAdornment>
//         }
//       />
//       <input hidden ref={fileInputRef} type="file"
//         onChange={handleFileChange}
//        />
//     </Stack>
//   );
// }

'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import dynamic from 'next/dynamic';

// Dynamically import the emoji picker to avoid server-side rendering issues
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export function MessageAdd({ disabled = false, onSend }) {
  const [content, setContent] = React.useState('');
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const pickerRef = React.useRef(null);

  const fileInputRef = React.useRef(null);
  const [file, setFile] = React.useState(null);

  const handleAttach = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = React.useCallback((event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }, []);

  const handleChange = React.useCallback((event) => {
    setContent(event.target.value);
  }, []);

  const handleSend = React.useCallback(() => {
    if (!content && !fileInputRef.current?.files[0]) {
      return;
    }

    const file = fileInputRef.current?.files[0] || null;

    onSend?.(file ? 'FILE' : 'TEXT', content, file);
    setContent('');
    if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
  }, [content, onSend]);

  const handleKeyUp = React.useCallback(
    (event) => {
      if (event.code === 'Enter') {
        handleSend();
      }
    },
    [handleSend]
  );

  const handleEmojiClick = React.useCallback((emojiData) => {
    setContent((prevContent) => prevContent + emojiData.emoji);
  }, []);

  const toggleEmojiPicker = React.useCallback(() => {
    setShowEmojiPicker((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '0 0 auto', px: 3, py: 1 }}>
      <OutlinedInput
        disabled={disabled}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Leave a message"
        sx={{ flex: '1 1 auto', borderRadius: 4 }}
        value={content}
        endAdornment={
          <InputAdornment position="end">
            <Tooltip title="Add emoji">
              <span>
                <IconButton disabled={disabled} onClick={toggleEmojiPicker}>
                  <EmojiEmotionsIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Attach file">
              <span>
                <IconButton disabled={disabled} onClick={handleAttach} value={file}>
                  <PaperclipIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Send">
              <span>
                <IconButton
                  color="primary"
                  disabled={!content || disabled}
                  onClick={handleSend}
                  sx={{
                    bgcolor: 'var(--mui-palette-primary-main)',
                    color: 'var(--mui-palette-primary-contrastText)',
                    '&:hover': { bgcolor: 'var(--mui-palette-primary-dark)' },
                    borderRadius: 50,
                  }}
                >
                  <PaperPlaneTiltIcon />
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        }
      />
      <input hidden ref={fileInputRef} type="file" onChange={handleFileChange} />

      {showEmojiPicker && (
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '20px',
            zIndex: 1000,
            border: '1px solid #ddd',
            borderRadius: '10px',
            background: '#fff',
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </Stack>
  );
}
