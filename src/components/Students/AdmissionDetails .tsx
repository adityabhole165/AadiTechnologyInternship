import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const AdmissionDetails = () => {
    const [form, setForm] = useState({
        newAdmission: '',
        isRTEApplicable: '',
        userName: '',
        // Add other fields here...
    });

    const [errors, setErrors] = useState({
        newAdmission: false,
        userName: false,
        // Add other field errors...
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Validate field here
        if (name === 'newAdmission' && value === '') {
            setErrors({ ...errors, [name]: true });
        } else {
            setErrors({ ...errors, [name]: false });
        }
    };

    const saveDraft = () => {
        // Save draft logic here
        console.log("Draft Saved:", form);
    };

    return (
        <Box>
            <Typography variant="h6">Admission Details</Typography>
            <TextField
                name="newAdmission"
                label="New Admission"
                variant="outlined"
                value={form.newAdmission}
                onChange={handleInputChange}
                required
                error={errors.newAdmission}
                helperText={errors.newAdmission ? "This field is required" : ""}
                sx={{
                    borderColor: errors.newAdmission ? 'red' : 'green',
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: errors.newAdmission ? 'red' : 'green',
                        },
                    },
                }}
            />
            <TextField
                name="isRTEApplicable"
                label="Is RTE Applicable?"
                variant="outlined"
                value={form.isRTEApplicable}
                onChange={handleInputChange}
                required
            />
            {/* Add more fields... */}
            <Button onClick={saveDraft} variant="contained" color="secondary">
                Save as Draft
            </Button>
        </Box>
    );
};

export default AdmissionDetails;
