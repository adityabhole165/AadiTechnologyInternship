import { NativeSelect } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

Dropdown.propTypes = {
  Array: PropTypes.any,
  handleChange: PropTypes.any,
  label: PropTypes?.string
};
function Dropdown({ Array, handleChange, label, defaultValue = '' }) {
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');
  return (
    <>
      <NativeSelect
        value={defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
      >
        {defaultValue == '' && <option>{label}</option>}
        {Array.map((items, i) => {
          return (
            <option value={items.Value} key={i}>
              {items.Name}
            </option>
          );
        })}
      </NativeSelect>
    </>
  );
}

export default Dropdown;
