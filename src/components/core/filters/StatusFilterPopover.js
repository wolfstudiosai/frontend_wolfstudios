import { Button, FormControl, MenuItem, Select } from "@mui/material";
import React from "react";
import { FilterPopover, useFilterContext } from "../filter-button";

export function StatusFilterPopover() {
    const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        setValue(initialValue ?? '');
    }, [initialValue]);

    return (
        <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by status">
            <FormControl>
                <Select
                    labelId="role"
                    id="role"
                    value={value}
                    label="Role"
                    onChange={(event) => setValue(event.target.value)}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            onApply(value);
                        }
                    }}
                >
                    <MenuItem value={""}>All</MenuItem>
                    <MenuItem value={"ACTIVE"}>Active</MenuItem>
                    <MenuItem value={"BLOCKED"}>Blocked</MenuItem>
                </Select>
            </FormControl>
            <Button
                onClick={() => {
                    onApply(value);
                }}
                variant="contained"
            >
                Apply
            </Button>
        </FilterPopover>
    );
}