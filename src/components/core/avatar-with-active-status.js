import { Avatar, Badge, Box } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge, {
    shouldForwardProp: (prop) => prop !== 'isOnline',
})(({ theme, isOnline }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: isOnline ? '#44b700' : '#565e73',
        color: isOnline ? '#44b700' : '#565e73',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            ...(isOnline && { animation: 'ripple 1.2s infinite ease-in-out', }),
            border: '1px solid currentColor',
            content: '""',
        },
    },
    ...(isOnline && {
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    })

}));

export const AvatarWithActiveStatus = ({ src, alt, status, sx }) => {
    return (
        <Box>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                isOnline={status || false}
            >
                <Avatar alt={alt} src={src} sx={{ ...sx }} />
            </StyledBadge>
        </Box>
    )
}