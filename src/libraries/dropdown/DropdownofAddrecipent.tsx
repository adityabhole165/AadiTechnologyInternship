import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

DropdownofAddrecipent.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  mandatory: PropTypes.bool,
  sx: PropTypes.object,
  size: PropTypes.string,
  DisableClearable: PropTypes.bool,
  disabled: PropTypes.bool,
};

function DropdownofAddrecipent({
  ItemList,
  onChange,
  label,
  defaultValue = '',
  mandatory = false,
  sx = null,
  size = 'medium',
  DisableClearable = false,
  disabled = false,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');

  // Prevent special characters and numbers in the search
  const handleKeyDown = (event) => {
    // Allow alphanumeric input, dash (-), space, and basic navigation keys
    const allowedKeys =
      /[a-zA-Z0-9\s-]/.test(event.key) ||
      ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'].includes(event.key);
    if (!allowedKeys) {
      event.preventDefault();
    }
  };

  return (
    <Autocomplete
      value={ItemList.find((item) => item.Id === defaultValue) || null}
      onChange={(e, newValue) => onChange(newValue ? newValue.Id : '')}
      options={ItemList}
      disableClearable={DisableClearable}
      disabled={disabled}
      getOptionLabel={(option) => option.Name}
      isOptionEqualToValue={(option, value) => option.Id === value.Id}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size as any}
          sx={sx || { minWidth: '350px', pl: '10px' }}
          label={
            label ? (
              <span>
                {label} {mandatory && <span style={{ color: 'red' }}>*</span>}
              </span>
            ) : ''
          }
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
}

export default DropdownofAddrecipent;


// import { NativeSelect } from '@mui/material';
// import PropTypes from 'prop-types';

// DropdownofAddrecipent.propTypes = {
//   Array: PropTypes.any,
//   handleChange: PropTypes.any,
//   label: PropTypes?.string
// };
// function DropdownofAddrecipent({
//   Array,
//   handleChange,
//   label,
//   defaultValue = ''
// }) {
//   return (
//     <>
//       <NativeSelect
//         value={defaultValue}
//         onChange={(e) => handleChange(e.target.value)}
//         fullWidth
//       >
//         <option value="">{label}</option>
//         {Array.map((items, i) => {
//           return (
//             <option value={items.Id} key={i}>
//               {items.Name}
//             </option>
//           );
//         })}
//       </NativeSelect>
      
//     </>
//   );
// }

// export default DropdownofAddrecipent;


