import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useGridApiContext } from '@mui/x-data-grid';
import dayjs from 'dayjs';

export default function DateEditCell(props) {
    const { id, value, field, format = "MMMM YYYY" } = props;
    const apiRef = useGridApiContext();

    const handleDateChange = (newValue) => {
        apiRef.current.setEditCellValue({ id, field, value: dayjs(newValue).format(format) });
    };

    return (
        <DatePicker
            value={dayjs(value)}
            onChange={handleDateChange}
            format={format}
            slotProps={{
                textField: {
                    variant: 'standard',
                    fullWidth: true,
                },
            }}
        />
    );
}
