import { Box, Breadcrumbs, IconButton, Link, Stack } from "@mui/material";
import { Iconify } from "/src/components/iconify/iconify";

export const Topbar = () => {
    return (
        <Box
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            {/* Left Section */}
            <Stack direction="row" spacing={1} alignItems="center">
                <Iconify icon="mdi:pound" fontSize={18} color="text.primary" />
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        href="/"
                        color="text.primary"
                        underline="none"
                        sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
                    >
                        Website
                    </Link>
                    <Link
                        href="/material-ui/getting-started/installation/"
                        color="text.primary"
                        underline="none"
                        sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
                    >
                        v3.0
                    </Link>
                    <Link
                        href="/material-ui/react-breadcrumbs/"
                        color="text.primary"
                        underline="none"
                        aria-current="page"
                        sx={{ fontWeight: 'medium', '&:hover': { textDecoration: 'none' } }}
                    >
                        UI-kit design
                    </Link>
                </Breadcrumbs>
            </Stack>

            {/* Right Section */}
            <Stack direction="row" spacing={1} alignItems="center">
                <IconButton size="small">
                    <Iconify icon='bi:three-dots' fontSize={20} />
                </IconButton>
                <IconButton size="small">
                    <Iconify icon='lucide:sparkle' fontSize={20} />
                </IconButton>
                <IconButton size="small">
                    <Iconify icon='si:warning-line' fontSize={20} />
                </IconButton>
            </Stack>
        </Box>
    )
}