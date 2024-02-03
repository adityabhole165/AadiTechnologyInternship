import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

SearchableDropdown.propTypes = {
  ItemList: PropTypes.array,
  onclick: PropTypes.func,
  label: PropTypes.string
};

function SearchableDropdown({ ItemList, onChange, label, defaultValue = '' }) {
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.replace('/extended-sidebar/Student/', '');

  return (
    <Autocomplete
      value={ItemList.find((item) => item.Value === defaultValue) || null}
      onChange={(e, newValue) => onChange(newValue ? newValue.Value : '')}
      options={ItemList}
      getOptionLabel={(option) => option.Name}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            minWidth: '250px',
            pl: '10px'
          }}
          variant={'standard'}
          label={label}
        />
      )}
      clearIcon={null}
    />
  );
}

export default SearchableDropdown;
