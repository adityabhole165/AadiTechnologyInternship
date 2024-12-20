import { FormControl, MenuItem, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

Dropdown.propTypes = {
  Array: PropTypes.any,
  handleChange: PropTypes.any,
  label: PropTypes?.string
};
function Dropdown({ Array, disabled = false, handleChange, label, size = 'medium', defaultValue = '', width = 'auto', variant = "standard" }) {
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/RITeSchool/Student/', '');
  return (
    <>
      <FormControl variant="standard" fullWidth>
        <TextField
          sx={{ width: width }}
          value={defaultValue}
          onChange={(e) => handleChange(e.target.value)}
          fullWidth
          variant={variant as any}
          size={size as any}
          label={label}
          select={true}
          disabled={disabled}
          InputLabelProps={{
            shrink: true
          }}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 350
                }
              }
            }
          }}
        >
          {defaultValue == '' && <MenuItem>{label}</MenuItem>}
          {Array.map((items, i) => {
            return (
              <MenuItem value={items.Value} key={i}>
                {items.Name}
              </MenuItem>
            );
          })}
        </TextField>
      </FormControl>
    </>
  );
}

export default Dropdown;
