import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'
import React from 'react'

const RadioButton = ({ Array }) => {

    return (
        <>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Feedback for:</FormLabel>

                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                // onChange={handleChange}                                                                          
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        ml:"10px"
                    }}>
                        {Array.map((items, i) => {

                            return (
                                <FormControlLabel key={i} value={items.Value}
                                    control={<Radio />}
                                    label={items.Name}
                                />
                            );
                        })}
                    </Box>
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default RadioButton