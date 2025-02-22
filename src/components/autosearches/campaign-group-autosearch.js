import React from 'react';
import { api } from '/src/utils/api';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const CampaignAutoSearch = ({ name, id, onSelect }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
      return;
    }

    let active = true;
    (async () => {
      setLoading(true);
      const response = await api.get('/campaign-group');
      if (active) {
        setOptions(response.data.data.map((item) => ({ id: item.id, name: item.name })));
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [open]);

  return (
    <Autocomplete
      value={id ? { id, name } : null}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      size="small"
      options={options}
      loading={loading}
      isOptionEqualToValue={(option, value) => value.name === option.name}
      getOptionLabel={(option) => option.name || ''}
      getValue
      onChange={(event, newValue) => onSelect(newValue || { id: null, name: '' })}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};
