import { Box } from '@mui/material';

export const TypingAnimation = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          gap: '4px',
          height: '10px',
          '& div': {
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'text.secondary',
            animation: 'typingBlink 1.4s infinite',
          },
          '& div:nth-of-type(2)': {
            animationDelay: '0.2s',
          },
          '& div:nth-of-type(3)': {
            animationDelay: '0.4s',
          },
        }}
      >
        <div />
        <div />
        <div />
      </Box>

      <style>{`
      @keyframes typingBlink {
        0%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-6px);
        }
      }
    `}</style>
    </Box>
  );
};
