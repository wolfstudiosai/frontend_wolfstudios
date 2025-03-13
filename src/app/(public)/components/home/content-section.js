import { Avatar, AvatarGroup, Box, Button, CardMedia, Chip, Divider, IconButton, Rating, Stack, TextField, Typography } from "@mui/material";
import { Iconify } from "/src/components/iconify/iconify";

export function ContentSection() {
    return (
        <Stack direction='column' gap={3} sx={{ px: 4, py: 4 }}>
            <Typography variant="h3" sx={{ textTransform: 'uppercase' }}>Content name</Typography>
            <Stack direction='row' gap={2}>
                <Stack direction='column' gap={3} justifyContent='space-between' sx={{ width: '30%', border: '1px solid', borderColor: 'divider', p: 3 }}>
                    <Stack direction='column' gap={1}>
                        <Stack direction='row' gap={2}>
                            <Box component='img' src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fceb82b74027628836d005_66f6664e6c10316b602127e7_DSC09046-2.jpeg" sx={{ width: '160px', height: '200px', objectFit: 'cover' }} />
                            <Stack direction='column' justifyContent='flex-end'>
                                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>+500</Typography>
                                <Typography>Positive reviews</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction='row' gap={1} alignItems='center'>
                            <Rating name="read-only" value={3.5} readOnly />
                            <Typography variant="caption">4.5</Typography>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Typography sx={{ fontWeight: 'medium', textTransform: 'uppercase' }}>Specifications itype pro</Typography>
                        <Stack direction='row' justifyContent='right'>
                            <Button variant="text" endIcon={<Iconify icon='mdi:arrow-top-right' />}>
                                Send
                            </Button>
                        </Stack>
                        {["MODEL: KEYBOARD PRO", "DISPLAY: COLOR OLED DISPLAY", "AI: MACHINE LEARNING ALGORITHMS"].map((item, index) => (
                            <Box key={index} sx={{ borderTop: 1, borderColor: "divider", py: 1, display: "flex", justifyContent: "space-between" }}>
                                <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} >{item.split(": ")[0]}</Typography>
                                <Typography variant="body2" fontWeight="medium" sx={{ color: 'text.secondary' }}>{item.split(": ")[1]}</Typography>
                            </Box>
                        ))}
                        <Stack direction='row' gap={2} alignItems='center' sx={{ mt: 2 }}>
                            <Button variant='contained' size='small' fullWidth sx={{ borderRadius: '20px', textTransform: 'uppercase' }}>
                                Go to the store
                            </Button>
                            <IconButton size='small' sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}>
                                <Iconify icon='mdi:favourite-border' />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{ width: '40%', position: 'relative' }}>
                    <Box component='img' src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fceb82b74027628836d005_66f6664e6c10316b602127e7_DSC09046-2.jpeg" sx={{ width: '100%', height: '600px', objectFit: 'cover', zIndex: 9 }} />
                    <Stack sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, p: 4, left: 0, zIndex: 10 }}>
                        <Box sx={{
                            bgcolor: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(5px)", p: 1, borderRadius: "50px", display: "flex", alignItems: "center"
                        }}>
                            <TextField placeholder="Enter your email" variant="standard" fullWidth sx={{ flex: 1, px: 1 }} />
                            <Button variant="contained" size='small' sx={{ borderRadius: '30px' }} endIcon={<Iconify icon='si:double-arrow-right-fill' />}>
                                Subscribe
                            </Button>
                        </Box>
                        <Stack direction='column' justifyContent='space-around' alignItems='center' sx={{ flexGrow: 1, my: 2 }}>
                            {
                                ['Built-in artificial intelligence', 'Built-in artificial intelligence', 'Built -in artificial intelligence'].map((item, index) => (
                                    <Stack key={index} direction='row' alignItems='center' gap={1} sx={{
                                        bgcolor: "rgba(255, 255, 255, 0.2)", width: 'fit-content', pr: 1.2,
                                        backdropFilter: "blur(5px)", color: 'white', borderRadius: '30px',
                                        ml: index % 2 !== 0 ? 16 : 0,
                                    }}>
                                        <Iconify icon='radix-icons:dot-filled' sx={{
                                            bgcolor: "rgba(255, 255, 255, 0.2)",
                                            backdropFilter: "blur(2px)", borderRadius: '50%', width: 22, height: 22
                                        }} />
                                        <Typography sx={{ fontSize: '0.8rem', color: 'black' }}>{item}</Typography>
                                    </Stack>
                                ))
                            }
                        </Stack>
                    </Stack>
                </Stack>
                <Stack sx={{ width: '30%', border: '1px solid', borderColor: 'divider', p: 3 }}>
                    <Typography sx={{ fontWeight: 'bold', mb: 2 }}>#CoreCollection</Typography>
                    {/* Stepper Section */}
                    <Box display="flex" gap={1}>
                        {["00", "01", "02", "03"].map((step, index) => (
                            <Chip key={index} label={step} variant={index === 0 ? "filled" : "soft"} size='small' sx={{ borderRadius: '20px', px: 1 }} />
                        ))}
                    </Box>

                    {/* Image */}
                    <CardMedia
                        component="img"
                        image="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fceb82b74027628836d005_66f6664e6c10316b602127e7_DSC09046-2.jpeg"
                        alt="Keyboard"
                        sx={{ width: '70%', height: '130px', objectFit: 'cover', my: 2 }}
                    />

                    {/* Text Content */}
                    <Typography variant="h6" fontWeight="bold">
                        MULTILINGUAL SUPPORT
                    </Typography>
                    <Stack direction='row' gap={3} alignItems='flex-end'>
                        <Typography variant="body2" color="text.secondary" mt={1}>
                            Our keyboard supports many languages thanks to AI. Dictate a message
                            and the keyboard will automatically translate it into the desired
                            language.
                        </Typography>
                        <IconButton size='small' sx={{ backgroundColor: 'grey.800', color: 'white', borderRadius: '50%', '&:hover': { backgroundColor: 'grey.900' } }}>
                            <Iconify icon='gg:arrow-bottom-right' />
                        </IconButton>
                    </Stack>

                    <Divider sx={{ border: '2px solid', borderColor: 'grey.800', my: 3 }} />

                    {/* Contact Section */}
                    <Stack direction='row' gap={1}>
                        <AvatarGroup max={3}>
                            <Avatar src="https://via.placeholder.com/40" sx={{ width: 30, height: 30 }} />
                            <Avatar src="https://via.placeholder.com/40" sx={{ width: 30, height: 30 }} />
                            <Avatar src="https://via.placeholder.com/40" sx={{ width: 30, height: 30 }} />
                        </AvatarGroup>
                        <Stack direction='column' gap={1}>
                            <Typography fontSize={14} fontWeight="bold">
                                Write to us and our manager will contact you shortly
                            </Typography>
                            <Box>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{ mt: 2, borderRadius: "20px", px: 3 }}
                                >
                                    CONTACT US
                                    <Typography component='span' sx={{ ml: 2 }}>»</Typography>
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>

                    {/* Footer Links */}
                    <Stack direction='row' justifyContent='space-between' gap={1} sx={{ mt: 'auto' }}>
                        {
                            ['• Delivery', '• Reviews', '• Services', '• Contact'].map((item, index) => (
                                <Chip key={index} label={item} size='small' variant='soft' />
                            ))
                        }
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}
