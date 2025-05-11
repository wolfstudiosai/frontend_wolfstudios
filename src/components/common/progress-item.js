import { Box, Typography, LinearProgress } from '@mui/material';
import { formatCompactNumber } from '/src/utils/helper';
import { Iconify } from '/src/components/iconify/iconify';

const ProgressItem = ({ label, icon, value = 0, total = 1, progressColor }) => {
    const percent = (value / total) * 100;

    return (
        <Box mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box display="flex" alignItems="center">
                    <Iconify icon={icon} fontSize="small" sx={{ color: progressColor, mr: 1 }} />
                    <Typography variant="body2" fontWeight="medium">
                        {label}
                    </Typography>
                </Box>
                <Typography variant="body2" fontWeight="500">
                    {formatCompactNumber(value)}
                </Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={percent}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${progressColor}33`, // 20% opacity
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: progressColor,
                    },
                }}
            />
        </Box>
    );
};

export default ProgressItem;
