import { Typography } from "@mui/material"

export const ArrayOfStringCommaView = ({ value }) => {
    const modifiedText = Array.isArray(value) ? value.join(', ') : value;
    return (
        <Typography color="text.secondary">{modifiedText || '-'}</Typography>
    )
}