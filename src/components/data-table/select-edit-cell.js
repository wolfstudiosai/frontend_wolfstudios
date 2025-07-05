import { CustomSelect } from '/src/components/formFields/custom-select';
import { useGridApiContext } from '@mui/x-data-grid';

export default function SelectEditCell(props) {
    const { id, value, field, options, label } = props;
    const apiRef = useGridApiContext();

    const handleSelectChange = (newValue) => {
        apiRef.current.setEditCellValue({ id, field, value: newValue });

        setTimeout(() => {
            apiRef.current.stopCellEditMode({ id, field });
        }, 100);
    };

    return (
        <CustomSelect
            name={field}
            label={label}
            value={value}
            onChange={handleSelectChange}
            options={options}
        />
    );
}