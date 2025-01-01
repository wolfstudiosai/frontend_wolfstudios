"use client";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Styled Accordion component
const MuiAccordion = styled((props) => <Accordion {...props} />)(({ theme }) => ({
    borderRadius: 12,
    "&:not(:last-child)": {
        borderBottom: "none", // Remove the bottom border for all but the last Accordion
    },
    "&:before": {
        display: "none", // Remove the default "plus" icon
    },
}));

// Styled AccordionDetails component
const MuiAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const CustomAccordion = (props) => {
    const {
        pannelId,
        title,
        onChange,
        children,
        expanded,
        bottomGap,
        sx,
        isLight = false,
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setIsExpanded(expanded ? true : false);
    }, [expanded]);

    return (
        <MuiAccordion
            expanded={isExpanded}
            sx={{ marginBottom: bottomGap ? 2 : 0 }}
        >
            <AccordionSummary
                onClick={() => (onChange ? onChange() : setIsExpanded(!isExpanded))}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={pannelId}
                id={pannelId}
                sx={{ ...sx, boxShadow: isExpanded ? "0px 2px 0px #202427" : "none" }}
            >
                {isLight ? (
                    <Typography variant="body1" fontWeight={600}>
                        {title}
                    </Typography>
                ) : (
                    <Typography variant="h3" fontWeight={700}>
                        {title}
                    </Typography>
                )}
            </AccordionSummary>
            <MuiAccordionDetails>{children}</MuiAccordionDetails>
        </MuiAccordion>
    );
};

export default CustomAccordion;
