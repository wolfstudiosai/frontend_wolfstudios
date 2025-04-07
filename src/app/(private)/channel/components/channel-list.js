import { Stack, Typography } from "@mui/material";
import { ChannelGroup } from "./channel-group";
import ExpandableSearch from "/src/components/utils/expandable-search";

export const ChannelList = ({ sx }) => {

    return (
        <Stack direction='column' gap={1} sx={{ width: '30%', height: '100%', p: 2, borderRight: '1px solid', borderColor: 'divider', ...sx }}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' gap={1}>
                <Typography variant="h5">Channels</Typography>
                <ExpandableSearch />
            </Stack>
            <ChannelGroup />
        </Stack>
    )
}