import { Chip, Stack } from "@mui/material";

export const ReadonlyStatusChip = ({ value }) => {
    const newStatus = typeof value === "string" ? value.replace(/_/g, " ").toUpperCase() : "";
    return (
        <Chip sx={{ mt: 1 }} size='small' color="text.secondary" label={newStatus || "--"} />
    );
};


export const MultiReadonlyStatusChip = ({ value }) => {
    const statuses = Array.isArray(value)
        ? value.map((s) => s.replace(/_/g, " ").toUpperCase())
        : [];

    return (
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", mt: 1 }}>
            {statuses.length > 0 ? (
                statuses.map((status, index) => (
                    <Chip
                        key={index}
                        size="small"
                        color="default"
                        label={status || "--"}
                    />
                ))
            ) : (
                <Chip size="small" color="default" label="--" />
            )}
        </Stack>
    );
};
