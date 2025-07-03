import { useGridApiContext } from '@mui/x-data-grid';
import { CustomAutoCompleteV2 } from '/src/components/formFields/custom-auto-complete-v2';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

export const renderAutoCompleteCell = (value) => {
    const labels = value?.map((item) => item?.label).join(', ');
    return (
        <Tooltip
            title={
                <Box sx={{ p: 1, bgcolor: 'background.default', borderRadius: 0 }}>
                    {labels}
                </Box>
            }
            slotProps={{
                tooltip: {
                    sx: {
                        bgcolor: 'transparent',
                        p: 0,
                    }
                }
            }}
        >
            <Box sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {labels}
            </Box>
        </Tooltip>
    );
}


export const renderAutoCompleteEditCell = ({
    label = '',
    fetchOptions,
    defaultOptions = [],
    multiple = true,
}) => (params) => {
    const { id, field, value } = params;
    const apiRef = useGridApiContext();

    const handleChange = (_, newValue) => {
        apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
        <Box
            sx={{
                p: 1,
                minHeight: 100,
                width: '100%',
                display: 'flex',
                bgcolor: 'background.default',
                position: 'relative',
                overflowY: 'auto',
                zIndex: 1000,
            }}
        >
            <CustomAutoCompleteV2
                multiple={multiple}
                label={label}
                value={value}
                onChange={handleChange}
                defaultOptions={defaultOptions}
                fetchOptions={fetchOptions}
            />
        </Box>
    );
};
