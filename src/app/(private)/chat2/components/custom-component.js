import { Box, Chip, styled } from "@mui/material";

export const ScrollableContent = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    overflowY: "auto",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
    "&::-webkit-scrollbar": {
        display: "none", // For Chrome, Safari, and Opera
    },
}));

export const CountChip = styled(Chip)(({ theme }) => ({
    height: 18,
    fontSize: 11,
    backgroundColor: "#e9e9e9",
    color: "#666",
    minWidth: 18,
    marginLeft: "auto",
}))