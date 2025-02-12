import { Box, Stack } from "@mui/material";

export const PartnerQuickView = ({ data }) => {
    console.log("data in quick view: ", data);
    return (
        <Stack>
            <Box component='img' src={data?.profile_image} alt={data?.name} />
        </Stack>
    )
}