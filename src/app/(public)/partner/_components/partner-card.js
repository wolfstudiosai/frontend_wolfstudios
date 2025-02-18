import { CustomChip } from "@/components/core/custom-chip";
import { Iconify } from "@/components/iconify/iconify";
import { IconText } from "@/components/utils/icon-text";
import { Box, Button, Card, Stack, Typography } from "@mui/material";

export const PartnerCard = () => {
    return (
        <Card sx={{ border: '1px solid', borderColor: 'divider' }}>
            <Stack direction='row'>
                <Box component='img' src='https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66f8d87567db1d54b9d6b5d4_2CoCP5UkbBxnruHemWWGaYSct3ZRB8VF0-84yJknGQc-p-800.jpeg' alt='Partner name' sx={{ width: '48%', height: '200px', objectFit: 'cover', borderRadius: '8px 0px 8px 0px' }} />
                <Stack direction='column' justifyContent='space-between' spacing={1} sx={{ p: 2 }}>
                    <Box>
                        <Typography variant="h5">Partner name</Typography>
                        <Stack direction='row' divider={<Iconify icon='radix-icons:divider-vertical' sx={{ color: 'grey.400' }} />}>
                            <Typography sx={{ color: 'text.secondary' }}>303M</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>$202</Typography>
                        </Stack>
                    </Box>
                    <Stack>
                        <IconText icon='mage:email' text='john@example.com' sx={{ color: 'text.secondary' }} />
                        <IconText icon='line-md:phone' text='+8801840452116' sx={{ color: 'text.secondary' }} />
                        <IconText icon='mynaui:globe' text='www.example.com' sx={{ color: 'text.secondary' }} />
                        <IconText icon='tabler:user' text='Combina key' sx={{ color: 'text.secondary' }} />
                    </Stack>
                </Stack>
            </Stack>
            <Box sx={{ p: 2 }}>
                <Stack direction="row" flexWrap={"wrap"} gap={1} mt={1} alignItems={"center"}>
                    <Typography fontSize="14px" fontWeight={500}>Products:</Typography>
                    <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
                    <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
                    <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
                </Stack>
                <Stack direction="row" flexWrap={"wrap"} gap={1} mt={0.5} alignItems={"center"}>
                    <Typography fontSize="14px" fontWeight={500}>Proposed:</Typography>
                    <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
                    <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
                </Stack>
                <Stack direction="row" flexWrap={"wrap"} gap={1} mt={0.5} alignItems={"center"}>
                    <Typography fontSize="14px" fontWeight={500}>Contributed:</Typography>
                    <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
                    <CustomChip label={'Product 1'} height="14px" variant={'soft'} fontSize="12px" />
                </Stack>
                <Stack direction='row' justifyContent='space-arround' sx={{ mt: 1.5, flexWrap: 'wrap' }}>
                    <SocialInfo icon='mingcute:facebook-line' follower='123k' rate={100} sx={{ width: '50%' }} />
                    <SocialInfo icon='mingcute:facebook-line' follower='123k' rate={100} sx={{ width: '50%' }} />
                    <SocialInfo icon='mingcute:facebook-line' follower='123k' rate={100} sx={{ width: '50%' }} />
                    <SocialInfo icon='mingcute:facebook-line' follower='123k' rate={100} sx={{ width: '50%' }} />
                    <SocialInfo icon='mingcute:facebook-line' follower='123k' rate={100} sx={{ width: '50%' }} />
                    <SocialInfo icon='mingcute:facebook-line' follower='123k' rate={100} sx={{ width: '50%' }} />
                    <SocialInfo icon='mingcute:facebook-line' follower='123k' rate={100} sx={{ width: '50%' }} />
                    <SocialInfo icon='mingcute:facebook-line' follower='123k' rate={100} sx={{ width: '50%' }} />
                </Stack>
                <Stack direction='row' gap={2} sx={{ mt: 2.5 }}>
                    <Button variant="outlined" size="small" fullWidth>Active Campaign</Button>
                    <Button variant='contained' size="small" fullWidth>Live Campaign</Button>
                </Stack>
            </Box>
        </Card>
    )
}


const SocialInfo = ({ sx, icon, follower, rate }) => (
    <Stack direction='row' gap={0.7} alignItems='center' sx={{ color: 'text.secondary', ...sx }}>
        <Iconify icon={icon} sx={{ width: 22, height: 22 }} />
        <Stack direction='row' divider={<Iconify icon='radix-icons:divider-vertical' sx={{ color: 'grey.400' }} />}>
            <Typography>{follower}</Typography>
            <Typography>${rate}</Typography>
        </Stack>
    </Stack>
)