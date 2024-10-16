import { Box, Button, Grid, TextField, Typography, Checkbox, FormControlLabel, Alert } from '@mui/material';
import React, { useState } from 'react';

const AdmissionDetails = ({ onSave }) => {
    const [form, setForm] = useState({
        newAdmission: false,
        isRTEApplicable: false,
        userName: '',
        formNumber: '',
        registrationNumber: '',
        admissionDate: '',
        joiningDate: '',
        studentRollNumber: '',
        sendSMS: false
    });

    const [errors, setErrors] = useState({
        userName: false,
        formNumber: false,
        registrationNumber: false,
        admissionDate: false,
        joiningDate: false,
        studentRollNumber: false,
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setForm({ ...form, [name]: fieldValue });

        // Remove error when the user starts filling the field
        setErrors({ ...errors, [name]: false });
    };

    const validateForm = () => {
        const newErrors = {
            userName: !form.userName,
            formNumber: !form.formNumber,
            registrationNumber: !form.registrationNumber,
            admissionDate: !form.admissionDate,
            joiningDate: !form.joiningDate,
            studentRollNumber: !form.studentRollNumber,
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const saveDraft = () => {
        const isValid = validateForm();
        if (isValid) {
            setMessage('Draft saved successfully!');
            onSave(true); // Pass success to the parent
        } else {
            setMessage('Some fields are missing or incorrect.');
            onSave(false); // Pass failure to the parent
        }
    };

    return (
        <Box>
            {/* <Typography variant="h5" p={2}>Admission Details</Typography> */}

            {/* Display success/error message */}
            {/* {message && (
                <Alert severity={message.includes('successfully') ? 'success' : 'error'}>
                    {message}
                </Alert>
            )} */}

            <Grid container spacing={2}>
                {/* New Admission */}
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="newAdmission"
                                checked={form.newAdmission}
                                onChange={handleInputChange}
                            />
                        }
                        label="New Admission"
                    />
                </Grid>

                {/* Is RTE Applicable */}
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isRTEApplicable"
                                checked={form.isRTEApplicable}
                                onChange={handleInputChange}
                            />
                        }
                        label="Is RTE Applicable?"
                    />
                </Grid>

                {/* User Name */}
                <Grid item xs={3}>
                    <TextField
                        name="userName"
                        label="User Name"
                        variant="outlined"
                        value={form.userName}
                        onChange={handleInputChange}
                        required
                        error={errors.userName}
                        helperText={errors.userName ? "This field is required" : ""}
                        fullWidth
                    />
                </Grid>

                {/* Form Number */}
                <Grid item xs={3}>
                    <TextField
                        name="formNumber"
                        label="Form Number"
                        variant="outlined"
                        value={form.formNumber}
                        onChange={handleInputChange}
                        required
                        error={errors.formNumber}
                        helperText={errors.formNumber ? "This field is required" : ""}
                        fullWidth
                    />
                </Grid>

                {/* Registration Number */}
                <Grid item xs={3}>
                    <TextField
                        name="registrationNumber"
                        label="Registration Number"
                        variant="outlined"
                        value={form.registrationNumber}
                        onChange={handleInputChange}
                        required
                        error={errors.registrationNumber}
                        helperText={errors.registrationNumber ? "This field is required" : ""}
                        fullWidth
                    />
                </Grid>

                {/* Admission Date */}
                <Grid item xs={3}>
                    <TextField
                        name="admissionDate"
                        label="Admission Date"
                        variant="outlined"
                        value={form.admissionDate}
                        onChange={handleInputChange}
                        required
                        error={errors.admissionDate}
                        helperText={errors.admissionDate ? "This field is required" : ""}
                        fullWidth
                    />
                </Grid>

                {/* Joining Date */}
                <Grid item xs={3}>
                    <TextField
                        name="joiningDate"
                        label="Joining Date"
                        variant="outlined"
                        value={form.joiningDate}
                        onChange={handleInputChange}
                        required
                        error={errors.joiningDate}
                        helperText={errors.joiningDate ? "This field is required" : ""}
                        fullWidth
                    />
                </Grid>

                {/* Student Roll Number */}
                <Grid item xs={3}>
                    <TextField
                        name="studentRollNumber"
                        label="Student Roll Number"
                        variant="outlined"
                        value={form.studentRollNumber}
                        onChange={handleInputChange}
                        required
                        error={errors.studentRollNumber}
                        helperText={errors.studentRollNumber ? "This field is required" : ""}
                        fullWidth
                    />
                </Grid>

                {/* Send SMS of User Name and Password */}
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="sendSMS"
                                checked={form.sendSMS}
                                onChange={handleInputChange}
                            />
                        }
                        label="Send SMS of User Name and Password"
                    />
                </Grid>
            </Grid>

            <Box p={2}>
                <Button onClick={saveDraft} variant="contained" color="secondary">
                    Save as Draft
                </Button>
            </Box>
        </Box>
    );
};

export default AdmissionDetails;
