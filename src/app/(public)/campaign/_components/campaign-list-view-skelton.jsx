import { Box, Skeleton, Divider } from "@mui/material";

export const CampaignListViewSkelton = () => {
    return (
        <Box sx={{ mb: 3, px: 1.5 }}>
            {/* Section Header */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                }}
            >
                <Skeleton variant="text" width="60%" height={25} />
                <Skeleton variant="circular" width={25} height={25} />
            </Box>

            {/* Section Items */}
            {Array.from({ length: 3 }).map((_, index) => (
                <Box key={index} sx={{}}>
                    <Skeleton width="100%" height={30} />
                </Box>
            ))}

            <Divider sx={{ my: 3 }} />

            {/* Section Items */}
            {Array.from({ length: 3 }).map((_, index) => (
                <Box key={index} sx={{}}>
                    <Skeleton width="100%" height={30} />
                </Box>
            ))}
        </Box>
    );
};