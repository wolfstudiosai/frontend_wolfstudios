import { Close } from "@mui/icons-material";
import { Box, Divider, Drawer, Typography, useTheme } from "@mui/material";

export const RightPanel = (props) => {
    const {
        open,
        heading,
        isWrappedWithForm = false,
        onFormSubmit,
        subHeading,
        actionButtons,
        width,
        onClose,
        hideScroll = false,
        drawerProps,
        paperSx,
        children,
    } = props;

    const theme = useTheme();

    const content = () => {
        return (
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
                onClick={(e) => e.stopPropagation()}
            >
                <Box flex={1}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                        sx={{
                            padding: "15px",
                            backgroundColor: theme.palette.primary.main,
                        }}
                    >
                        <Typography variant="h5" fontWeight="bold" color="#fff">
                            {heading}
                        </Typography>
                        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
                            <Close sx={{ color: "#fff" }} />
                        </Box>
                    </Box>
                </Box>
                {subHeading && (
                    <Typography variant="body1">{subHeading}</Typography>
                )}
                <Box
                    flex={10}
                    sx={{
                        overflowY: hideScroll ? "hidden" : "auto",
                        padding: "0px 20px",
                        pr: hideScroll ? "0px" : "20px",
                    }}
                >
                    {children}
                </Box>
                {actionButtons && (
                    <Box flex={1} sx={{ padding: "0px 20px" }}>
                        <Divider sx={{ marginBottom: 3 }} />
                        {actionButtons()}
                    </Box>
                )}
            </Box>
        );
    };

    const wrappedWithForm = () => {
        if (isWrappedWithForm && onFormSubmit) {
            return (
                <form onSubmit={onFormSubmit} style={{ height: "100%" }}>
                    {content()}
                </form>
            );
        }
        return content();
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            sx={drawerProps}
            PaperProps={{
                sx: {
                    width: {
                        xs: "100%",
                        md: "80%",
                        lg: width || "35%",
                    },
                    padding: "40px 0px",
                    paddingTop: 0,
                    paddingBottom: "1%",
                    height: "100vh",
                    ...paperSx,
                },
            }}
            onClose={onClose}
        >
            {wrappedWithForm()}
        </Drawer>
    );
};
