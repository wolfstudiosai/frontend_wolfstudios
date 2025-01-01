import { Typography } from "@mui/material";

export const CustomLinkViewer = ({ domain, value }) => {
    const textWithoutDomainName =  value ?  value.replace(domain, '') : "";

    return (
        <Typography color="text.secondary">
            <a href={value || '#'} target="_blank" rel="noopener noreferrer">
                {"@" + textWithoutDomainName || '-'}
            </a>
        </Typography>
    );
};