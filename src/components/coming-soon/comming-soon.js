"use client";

import { Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Iconify } from "../iconify/iconify";

const CommingSoon = ({ pageName }) => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/");
    }
    return (
        <Container
            maxWidth="xl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                height: '80vh',
            }}
        >
            <Iconify icon="mdi:clock-fast" sx={{ width: 80, height: 80, color: 'primary.main' }} />
            <Typography variant="h3" sx={{ mt: 2, mb: 2 }}>
                Coming Soon!
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 4 }}>
                {pageName ? (
                    <>
                        The{' '}
                        <Typography component="span" sx={{ fontWeight: 'bold' }}>
                            {pageName}
                        </Typography>{' '}
                        page is currently under construction. We are working hard to make it available soon.
                    </>
                ) : (
                    'We are working hard to bring this feature to life. Stay tuned for updates!'
                )}
                <br />
                In the meantime, feel free to explore other sections of the site.
            </Typography>

            <Button onClick={handleRedirect} size="large" variant="contained">
                Go to Home
            </Button>
        </Container>
    )
}

export default CommingSoon;