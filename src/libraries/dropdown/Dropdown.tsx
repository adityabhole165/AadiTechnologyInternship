import React, { useState } from 'react'
import moment from 'moment';
import { FormControl, NativeSelect } from '@mui/material';
import { GetStandardDivisionsResult } from 'src/interfaces/Teacher/TAttendance';
import PropTypes from 'prop-types';


Dropdown.propTypes = {
    Array: PropTypes.any,
    handleChange: PropTypes.any,
    label: PropTypes?.string
  };

function Dropdown({ Array, handleChange, label}){


    return (
        <>
            <FormControl variant="standard" fullWidth>
                <NativeSelect  onChange={(e) => handleChange(e.target.value)} >
                    <option>{label}</option>
                    {Array.map((items, i) => {
                        return (
                            <option value={items.Value} key={i}>
                                {items.Name}
                            </option>
                        );
                    })}
                </NativeSelect>
            </FormControl>
        </>
    )
}

export default Dropdown