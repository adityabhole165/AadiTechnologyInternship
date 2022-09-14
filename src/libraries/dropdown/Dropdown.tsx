import React, { useState } from 'react'
import moment from 'moment';
import { FormControl, NativeSelect } from '@mui/material';
import { GetStandardDivisionsResult } from 'src/interfaces/Teacher/TAttendance';

const Dropdown = ({Array,handleChange}) => {

  
    return (
        <>
            <FormControl variant="standard" fullWidth sx={{ m: 1, mb: 2 }}>
                <NativeSelect
                    sx={{ mr: '14px', ml: '-8px' }}
                    onChange={(e) => handleChange(e.target.value)}
                    
                >
                    <option value="0">Select Class</option>
                    {Array.map(
                        (items, i) => {
                            return (
                                <>
                                    <option value={items.Value} key={i}>
                                        {items.Name}
                                    </option>
                                </>
                            );
                        }
                    )}
                </NativeSelect>
            </FormControl>
        </>
    )
}

export default Dropdown