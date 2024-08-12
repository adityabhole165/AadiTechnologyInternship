// This Searchable Dropdown reusable component return entire value i.e Id, Name and Value.

import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

SearchableDropdown1.propTypes = {
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

function SearchableDropdown1({ ItemList, onChange, label, defaultValue = '',
    mandatory = false, sx = null, size = "medium", DisableClearable = false, disabled = false, InputProps = null }) {
    const location = useLocation();
    const pathname = location.pathname;
    const pageName = pathname.replace('/extended-sidebar/Student/', '');

    const handleKeyDown = (event) => {
        if (/[&@*%#!0-9-^_$()+=]/.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <Autocomplete
            value={ItemList.find((item) => item.Value === defaultValue) || null}
            onChange={(e, newValue) => onChange(newValue ? newValue : '')}
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

export default SearchableDropdown1;




