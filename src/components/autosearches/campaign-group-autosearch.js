import React from 'react';
import { api } from '@/utils/api';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const CampaignAutoSearch = ({ value, onSelect }) => {
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
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      size="small"
      options={options}
      loading={loading}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => onSelect(newValue)}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};
