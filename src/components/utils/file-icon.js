import { Box } from '@mui/material';
import { defaultStyles, FileIcon } from 'react-file-icon';

export function FileTypeIcon({ extension, sx }) {
  const style = defaultStyles[extension] || defaultStyles.default;

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <FileIcon extension={extension} {...style} />
    </Box>
  );
}
