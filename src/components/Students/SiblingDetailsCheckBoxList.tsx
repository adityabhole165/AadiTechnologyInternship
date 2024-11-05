import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Box, Grid } from '@mui/material';

const dummyData = [
    { id: 1, label: "Address", checked: true },
    { id: 2, label: "Caste & Sub-caste", checked: true },
    { id: 3, label: "Category", checked: true },
    { id: 4, label: "City", checked: true },
    { id: 5, label: "District", checked: true },
    { id: 6, label: "Email", checked: true },
    { id: 7, label: "Father Email", checked: true },
    { id: 8, label: "Father Office Address", checked: true },
    { id: 9, label: "Father Office Name", checked: true },
    { id: 10, label: "Father Qualification", checked: true },
    { id: 11, label: "Fee Area Name", checked: true },
    { id: 12, label: "House No. / Plot No.", checked: true },
    { id: 13, label: "Landmark", checked: true },
    { id: 14, label: "Last Name", checked: true },
    // Add more items as needed
];

const CheckboxList = () => {
    const [items, setItems] = useState(dummyData);
    const [selectAll, setSelectAll] = useState(true);
    const handleCheckboxChange = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        setItems(prevItems =>
            prevItems.map(item => ({ ...item, checked: !selectAll }))
        );
    };
    return (
        <Box sx={{ width: '100%'}}>
            <Box sx={{width: '100%', py:0.5, pl:1, background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white }}>
        
            <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                                // color="primary"
                                sx={{
                                    color:  (theme) => theme.palette.common.white , // Set label color to white
                                }}
                            />
                        }
                        label=" Update Details to Sibling"
                        sx={{
                            '& .MuiFormControlLabel-label': {
                                color: 'white', // This targets the label text color specifically
                            },
                        }}
                    />
                    </Box>
            <FormGroup>             
                <Grid container spacing={1}  sx={{my:0, ml:0, border: (theme) => `1px solid ${theme.palette.grey[300]}`}}>
                            {items.map((item, index) => (
                                <Grid item xs={6} key={item.id}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={item.checked}
                                                onChange={() => handleCheckboxChange(item.id)}
                                                color="primary"
                                            />
                                        }
                                        label={item.label}
                                    />
                                </Grid>
                            ))}
                        </Grid>
            </FormGroup>
        </Box>
    );
};

export default CheckboxList;
