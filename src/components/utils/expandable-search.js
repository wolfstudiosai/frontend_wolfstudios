import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import { useState } from "react";

export default function ExpandableSearch() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Box sx={{ position: "relative" }}>
                <Box
                    sx={{
                        overflow: "hidden",
                        transition: "all 300ms ease-out",
                        width: isExpanded ? 200 : 0,
                        opacity: isExpanded ? 1 : 0,
                    }}
                >
                    <TextField
                        placeholder="Search..."
                        autoFocus={isExpanded}
                        size="small"
                        sx={{ width: 200 }}
                    />
                </Box>
                <IconButton
                    onClick={toggleExpand}
                    aria-label="Search"
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                    }}
                    size="small"
                >
                    <SearchIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}