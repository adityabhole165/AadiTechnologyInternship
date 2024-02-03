import { NativeSelect } from '@mui/material';
import PropTypes from 'prop-types';

DropdownofAddrecipent.propTypes = {
  Array: PropTypes.any,
  handleChange: PropTypes.any,
  label: PropTypes?.string
};
function DropdownofAddrecipent({
  Array,
  handleChange,
  label,
  defaultValue = ''
}) {
  return (
    <>
      <NativeSelect
        value={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
      >
        <option value="">{label}</option>
        {Array.map((items, i) => {
          return (
            <option value={items.Id} key={i}>
              {items.Name}
            </option>
          );
        })}
      </NativeSelect>
    </>
  );
}

export default DropdownofAddrecipent;
