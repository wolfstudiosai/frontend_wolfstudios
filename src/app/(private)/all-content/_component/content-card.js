import { IconText } from "@/components/utils/icon-text";
import { Avatar, Box, Card, Chip, Stack, Typography } from "@mui/material";

export const ContentCard = ({ content }) => {
    return (
        <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Box component='img' src="https://images.pexels.com/photos/1839963/pexels-photo-1839963.jpeg?cs=srgb&dl=pexels-abir-hasan-912465-1839963.jpg&fm=jpg" alt="demo image" sx={{ width: '100%', height: '260px', objectFit: 'cover' }} />
            <Stack direction='column' justifyContent='space-between' gap={2} sx={{ p: 2 }}>
                <Stack direction='column' spacing={2}>
                    <Typography variant="h5">{content.title}</Typography>
                    <Stack direction='row' alignItems='center' gap={1}>
                        <Avatar />
                        <Box>
                            <Typography variant="subtitle2">John Doe</Typography>
                            <Stack>
                                <IconText icon='solar:calendar-linear' text='Feb 19, 2020' />
                            </Stack>
                        </Box>
                    </Stack>
                    <Typography variant="body2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima labore qui dignissimos at illo ipsum fugiat quos doloremque adipisci odit.</Typography>
                    <Stack direction='row' gap={1} sx={{ flexWrap: 'wrap' }}>
                        <Chip size="small" variant="soft" label="React" />
                        <Chip size="small" variant="soft" label="React" />
                        <Chip size="small" variant="soft" label="React" />
                    </Stack>
                </Stack>
                <Stack>
                    <IconText icon="solar:like-broken" text="1000" />
                </Stack>
            </Stack>
        </Card>
    )
}