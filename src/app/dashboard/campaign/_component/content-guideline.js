import { Box, Button, ButtonGroup, Stack } from '@mui/material';

import { CustomSelect } from '@/components/formFields/custom-select';
import { CustomTextField } from '@/components/formFields/custom-textfield';
import { Iconify } from '@/components/iconify/iconify';

export const ContentGuideline = ({ data, onChange }) => {
  const handleAdd = (index) => {
    const newData = [...data];
    newData.splice(index + 1, 0, { platform: '', url: '' });
    onChange(newData);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    onChange(newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    onChange(newData);
  };
  return (
    <Box>
      {data.map((item, index) => (
        <Stack key={index} direction={'row'} spacing={2} alignItems={'end'}>
          <CustomSelect
            value={item.platform}
            onChange={(value) => handleChange(index, 'platform', value)}
            name="platform"
            options={[
              { value: 'FACEBOOK', label: 'Facebook' },
              { value: 'TWITTER', label: 'Twitter' },
            ]}
          />
          <CustomTextField name="url" value={data.url} onChange={(value) => handleChange(index, 'url', value)} />
          <ButtonGroup variant="outlined" aria-label="content guildeline buttons" size="small" sx={{ mb: 0.5 }}>
            <Button variant="outlined" color="primary" title="Add platform" onClick={() => handleAdd(index)}>
              <Iconify icon="line-md:plus" width={24} height={24} />
            </Button>
            <Button variant="outlined" color="error" title="Delete platform" onClick={() => handleDelete(index)}>
              <Iconify icon="line-md:minus" width={24} height={24} />
            </Button>
          </ButtonGroup>
        </Stack>
      ))}
    </Box>
  );
};
