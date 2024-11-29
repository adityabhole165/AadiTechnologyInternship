// import { Autocomplete, TextField } from '@mui/material';
// import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';

// SearchableDropdown.propTypes = {
//   ItemList: PropTypes.array,
//   onclick: PropTypes.func,
//   label: PropTypes.string
// };

// function SearchableDropdown({ ItemList, onChange, label, defaultValue = '',
//   mandatory = false, sx = null, size = "medium", DisableClearable = false, disabled = false }) {
//   const location = useLocation();
//   const pathname = location.pathname;
//   const pageName = pathname.replace('/extended-sidebar/Student/', '');

//   return (
//     <Autocomplete
//       value={ItemList.find((item) => item.Value === defaultValue) || null}
//       onChange={(e, newValue) => onChange(newValue ? newValue.Value : '')}
//       options={ItemList}
//       disableClearable={DisableClearable}
//       disabled={disabled}
//       getOptionLabel={(option) => option.Name}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           size={size as any}
//           sx={sx || {
//             minWidth: '350px',
//             pl: '10px',

//           }}
//           label={label ? <>
//             <span>{label} {mandatory && <span style={{ color: 'red' }}>*</span>}</span>
//           </> : ''}
//         />
//       )}

//     />
//   );
// }

// export default SearchableDropdown;


import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

SearchableDropdown.propTypes = {
  ItemList: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  mandatory: PropTypes.bool,
  sx: PropTypes.object,
  size: PropTypes.string,
  DisableClearable: PropTypes.bool,
  disabled: PropTypes.bool,
};

function SearchableDropdown({ ItemList, onChange, label, defaultValue = '',
  mandatory = false, sx = null, size = "medium", DisableClearable = false, disabled = false }) {
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');

  // const handleKeyDown = (event) => {
  //   if (/[&@*%#!0-9-^_$()+=]/.test(event.key)) {
  //     event.preventDefault();
  //   }
  // };
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
      value={ItemList.find((item) => item.Value == defaultValue) || null}
      onChange={(e, newValue) => onChange(newValue ? newValue.Value : '')}
      options={ItemList}
      disableClearable={DisableClearable}
      disabled={disabled}
      getOptionLabel={(option) => option.Name}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size as any}
          sx={sx || {
            minWidth: '350px',
            pl: '10px',
          }}
          label={label ? (
            <span>
              {label} {mandatory && <span style={{ color: 'red' }}>*</span>}
            </span>
          ) : ''}
          onKeyDown={handleKeyDown}
        />
      )}
    />
  );
}

export default SearchableDropdown;




