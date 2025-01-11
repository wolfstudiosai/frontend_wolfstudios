import { Box, Button, ButtonGroup, FormLabel, Stack } from '@mui/material';

import { CustomSelect } from '/src/components/formFields/custom-select';
import { CustomTextField } from '/src/components/formFields/custom-textfield';
import { Iconify } from '/src/components/iconify/iconify';

export const ContentGuideline = ({ data, onChange }) => {
  const handleAdd = () => {
    const newData = [...data];
    newData.splice(data.length + 1, 0, { platform: '', url: '' });
    onChange(newData);
  };

  const handleDelete = () => {
    const newData = [...data];
    newData.splice(data.length - 1, 1);
    onChange(newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <FormLabel>Social Platforms</FormLabel>
        <ButtonGroup variant="outlined" aria-label="content guildeline buttons" size="small" sx={{ mb: 0.5 }}>
          <Button variant="text" color="primary" title="Add platform" onClick={handleAdd}>
            <Iconify icon="line-md:plus" width={24} height={24} />
          </Button>
          <Button
            variant="text"
            color="error"
            title="Delete platform"
            onClick={handleDelete}
            disabled={data.length <= 1}
          >
            <Iconify icon="line-md:minus" width={24} height={24} />
          </Button>
        </ButtonGroup>
      </Stack>
      {data.map((item, index) => (
        <Stack key={index} direction={'row'} spacing={1} alignItems={'end'}>
          <CustomSelect
            value={item.platform}
            onChange={(value) => handleChange(index, 'platform', value)}
            name="platform"
            options={[
              { value: 'FACEBOOK', label: 'Facebook' },
              { value: 'TWITTER', label: 'Twitter' },
            ]}
          />
          <CustomTextField name="url" value={data.url} onChange={(e) => handleChange(index, 'url', e.target.value)} />
        </Stack>
      ))}
    </Box>
  );
};
