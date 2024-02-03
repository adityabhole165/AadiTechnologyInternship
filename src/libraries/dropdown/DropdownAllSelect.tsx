import { NativeSelect } from '@mui/material';
import PropTypes from 'prop-types';

DropdownAllSelect.propTypes = {
  Array: PropTypes.any,
  handleChange: PropTypes.any,
  label: PropTypes?.string
};
function DropdownAllSelect({ Array, handleChange, label, defaultValue = '' }) {
  return (
    <>
      <NativeSelect
        value={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
      >
        {Array.map((item, i) => {
          return (
            <option value={item.Value} key={i}>
              {item.Name}
            </option>
          );
        })}
      </NativeSelect>
    </>
  );
}

export default DropdownAllSelect;
