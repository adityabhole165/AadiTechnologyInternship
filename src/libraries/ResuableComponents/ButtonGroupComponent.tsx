
import { Box, IconButton, Pagination, Tooltip, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const ButtonGroupComponent = ({
  ChangeRowsPerPage,
  rowsPerPageOptions,
  rowsPerPage,
  PageChange,
  pagecount
}) => {
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  backgroundColor:'white', pt:2, }}>
    <FormControl variant="outlined" style={{ minWidth: 100 }} size="small">
      <InputLabel>Rows per page</InputLabel>
      <Select value={rowsPerPage} onChange={ChangeRowsPerPage} label="Rows per page">
        {rowsPerPageOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      Select a page:
      <Pagination
        count={pagecount}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        onChange={(event, value) => {
          PageChange(value);
        }}
      />
    </Box>
  </Box>
  );
};

export default ButtonGroupComponent;