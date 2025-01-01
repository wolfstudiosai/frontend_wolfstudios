import { Typography } from "@mui/material";

export const WrapedText = ({ value }) => {
    return (
        <Typography color="text.secondary" style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
            {value}
        </Typography>
    );
}