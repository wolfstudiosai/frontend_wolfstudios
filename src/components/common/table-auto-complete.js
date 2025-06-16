import { Autocomplete, Chip, TextField } from '@mui/material';
import { api } from '/src/utils/api';

const fetchOptions = async (url) => {
    const response = await api.get(url);
    console.log(response.data);
    return response.data;
}

const keys = ["partnerHQ", "states", "countries"];
const getOptions = (operator, key) => {
    if (["has any of", "has none of"].includes(operator)) {

        return ["has any of", "has none of"];
    } else if (["is empty", "is not empty"].includes(operator)) {
        return ["is empty", "is not empty"];
    } else {
        return [];
    }
}

export default function TableAutoComplete({
    multiple,
    value,
    key,
    operator,
    onChange,
}) {
    const options = getOptions(operator, key);

    return (
        <Autocomplete
            multiple={multiple}
            options={options}
            getOptionLabel={(option) => (typeof option === 'string' ? option : '')}
            value={multiple ? (value || []) : (value || null)}
            onChange={(event, newValue) => onChange?.(event, newValue)}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const tagProps = getTagProps({ index });
                    const { key, ...rest } = tagProps;
                    return (
                        <Chip
                            key={key}
                            size="small"
                            color="inherit"
                            label={option}
                            {...rest}
                            sx={{ borderRadius: '2px' }}
                        />
                    );
                })
            }
            renderInput={(params) => <TextField {...params} />}
            sx={{ width: 250, '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
        />
    );
}
