import {
    FormControl,
    InputAdornment,
    IconButton,
    TextField
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const CustomMultipleInputField = ({
    name,
    value,
    onchange,
    isSubmitting,
    currentData,
    handleAdd,
    label,
    ...props
}) => {
    return (
        <FormControl fullWidth required disabled={isSubmitting}>
            <TextField
                {...props}
                id={name}
                label={label}
                onChange={onchange}
                value={value}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleAdd();
                    }
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={handleAdd}
                                    disabled={!currentData?.trim() || isSubmitting}
                                >
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                }}
            />
        </FormControl>
    );
};
