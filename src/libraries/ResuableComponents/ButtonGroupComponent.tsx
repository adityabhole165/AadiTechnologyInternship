import {
  Box,
  IconButton,
  Pagination,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
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
  const isMobile = useMediaQuery('(max-width:700px)'); // Adjust the breakpoint as needed

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        backgroundColor: 'white',
        pt: 1,
        gap: isMobile ? 1 : 2,
        mb:4
      }}
    >
      <FormControl
        variant="outlined"
        style={{ minWidth: isMobile ? 50 : 100 }}
        size={isMobile ? 'small' : 'small'}
      >
        <InputLabel>Rows per page</InputLabel>
        <Select
          value={rowsPerPage}
          onChange={ChangeRowsPerPage}
          label="Rows per page"
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', alignItems: 'center'}}>

      {!isMobile && (
         <Box
         component="span"
         sx={{
           whiteSpace: 'nowrap', // Prevent wrapping
         }}
       >
         Select a page:
       </Box>
      )}

      <Pagination
        count={pagecount}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
        size={isMobile ? 'small' : 'medium'}
        onChange={(event, value) => {
          PageChange(value);
        }}
      />
      </Box>
    </Box>
  );
};

export default ButtonGroupComponent;
