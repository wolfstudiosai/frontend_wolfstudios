import { Typography } from "@mui/material";

export const ErrorMessage = ({ error }) => {
    return <Typography color="error" variant="body2">{error}</Typography>;
};