import React, { useState } from 'react'
import moment from 'moment';
import { FormControl, NativeSelect } from '@mui/material';
import { GetStandardDivisionsResult } from 'src/interfaces/Teacher/TAttendance';

const Dropdown = ({ Array, handleChange }) => {


    return (
        <>
            <FormControl variant="standard" sx={{ mb: 2 }} fullWidth>
                <NativeSelect onChange={(e) => handleChange(e.target.value)} >
                    <option value="0">Select Class</option>
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