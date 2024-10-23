import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import React, { useState } from 'react';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

const AdmissionDetails = ({ onSave }: { onSave: (isSuccessful: boolean) => void }) => {
    const [form, setForm] = useState({
        newAdmission: false,
        isRTEApplicable: false,
        userName: '',
        formNumber: '',
        registrationNumber: '',
        admissionDate: '',
        joiningDate: '',
        studentRollNumber: '',
        sendSMS: false,
        rteCategory: '',
        rteApplicationForm: '',
    });

    const [errors, setErrors] = useState({
        userName: false,
        formNumber: false,
        registrationNumber: false,
        admissionDate: false,
        joiningDate: false,
        studentRollNumber: false,
        rteCategory: false,
        rteApplicationForm: false,
    });

    const [message, setMessage] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = event.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Update error state when user types
        if (value) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: false,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            userName: !form.userName,
            formNumber: !form.formNumber,
            registrationNumber: !form.registrationNumber,
            admissionDate: !form.admissionDate,
            joiningDate: !form.joiningDate,
            studentRollNumber: !form.studentRollNumber,
            rteCategory: form.isRTEApplicable && !form.rteCategory,
            rteApplicationForm: form.isRTEApplicable && !form.rteApplicationForm,
        };
        setErrors(newErrors);
        console.log(!Object.values(newErrors).includes(true));
        return !Object.values(newErrors).includes(true);

    };
    const applicableRules = [
        { id: 1, Name: '50% Fee Concession' },
        { id: 2, Name: '75% Fee Concession' }
    ];
    const StaffUserRole = [
        { id: 1, Name: 'Teacher' },
        { id: 2, Name: 'Admin Staff' }
    ];
    const ResidenceType = [
        { id: 1, Name: 'Flat Owners' },
        { id: 2, Name: 'Tenants' }
    ];
    const SchoolBoardName = [
        { id: 1, Name: 'ICSE' },
        { id: 2, Name: 'SSC' },
        { id: 3, Name: 'CBSE' },
        { id: 4, Name: 'OTHERS' }
    ];

    const Recognised = [
        { id: 1, Name: 'Yes' },
        { id: 2, Name: 'No' }
    ];




    const handleSave = () => {
        const isValid = validateForm();
        onSave(isValid);
        setMessage(isValid ? 'Draft saved successfully!' : 'Please fill in all required fields.');
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <Box sx={{ backgroundColor: 'white', p: 2 }}>
            {message && (
                <Grid item xs={12}>
                    <Alert severity={message.includes('successfully') ? 'success' : 'error'}>
                        {message}
                    </Alert>
                </Grid>
            )}
            <Grid container spacing={2}>
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
                {form.isRTEApplicable && (
                    <Grid container spacing={2} ml={0}>
                        <Grid item xs={4}>
                            <TextField
                                name="rteCategory"
                                label="RTE Category"
                                value={form.rteCategory}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                error={errors.rteCategory}
                                helperText={errors.rteCategory ? "This field is required" : ""}
                                sx={{
                                    backgroundColor: errors.rteCategory ? 'red' : (form.rteCategory ? 'lightblue' : 'inherit'),
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                name="rteApplicationForm"
                                label="RTE Application Form"
                                value={form.rteApplicationForm}
                                onChange={handleInputChange}
                                fullWidth
                                required
                                error={errors.rteApplicationForm}
                                helperText={errors.rteApplicationForm ? "This field is required" : ""}
                                sx={{
                                    backgroundColor: errors.rteApplicationForm ? 'red' : (form.rteApplicationForm ? 'lightblue' : 'inherit'),
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h5" color="textSecondary">
                                <b>Note:</b> Student marked as RTE (Right To Education) will get 100% concession on the school fees.
                            </Typography>
                        </Grid>
                    </Grid>
                )}
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
                        sx={{
                            backgroundColor: errors.registrationNumber ? 'white' : (form.registrationNumber ? 'white' : 'inherit'),
                        }}
                        fullWidth
                    />
                </Grid>
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
                        sx={{
                            backgroundColor: errors.registrationNumber ? 'white' : (form.registrationNumber ? 'white' : 'inherit'),
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <Tooltip title="Valid Prefix(s) : No Prefix, PP">
                        <TextField
                            name="registrationNumber"
                            label="Registration Number"
                            variant="outlined"
                            value={form.registrationNumber}
                            onChange={handleInputChange}
                            required
                            error={errors.registrationNumber}
                            helperText={errors.registrationNumber ? "This field is required" : ""}
                            sx={{
                                backgroundColor: errors.registrationNumber ? 'white' : (form.registrationNumber ? 'white' : 'inherit'),
                            }}
                            fullWidth
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name="admissionDate"
                        label="Admission Date"
                        variant="outlined"
                        type="date" // Optional: use a date input
                        value={form.admissionDate}
                        onChange={handleInputChange}
                        required
                        error={errors.admissionDate}
                        helperText={errors.admissionDate ? "This field is required" : ""}
                        sx={{
                            backgroundColor: errors.registrationNumber ? 'white' : (form.registrationNumber ? 'white' : 'inherit'),
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>

                    <TextField
                        name="joiningDate"
                        label="Joining Date"
                        variant="outlined"
                        type="date" // Optional: use a date input
                        value={form.joiningDate}
                        onChange={handleInputChange}
                        required
                        error={errors.joiningDate}
                        helperText={errors.joiningDate ? "This field is required" : ""}
                        sx={{
                            backgroundColor: errors.registrationNumber ? 'white' : (form.registrationNumber ? 'white' : 'inherit'),
                        }}
                        fullWidth
                    />
                </Grid>
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
                        sx={{
                            backgroundColor: errors.registrationNumber ? 'white' : (form.registrationNumber ? 'white' : 'inherit'),
                        }}
                        fullWidth
                    />
                </Grid>


                <Grid item xs={3}>
                    <SearchableDropdown
                        sx={{ minWidth: '300px' }}
                        ItemList={applicableRules}
                        // onChange={onClickClass}
                        label={'Applicable Rule'}
                        size={"medium"}
                    />
                </Grid>
                <Grid item xs={3}>
                    <SearchableDropdown
                        sx={{ minWidth: '300px' }}
                        ItemList={StaffUserRole}
                        // onChange={onClickClass}
                        label={'Staff User Role'}
                        size={"medium"}
                    />
                </Grid>
                <Grid item xs={3}>
                    <SearchableDropdown
                        sx={{ minWidth: '300px' }}
                        ItemList={StaffUserRole}
                        // onChange={onClickClass}
                        label={'Staff Name'}
                        size={"medium"}
                    />
                </Grid>
                <Grid item xs={3}>
                    <SearchableDropdown
                        sx={{ minWidth: '300px' }}
                        ItemList={ResidenceType}
                        // onChange={onClickClass}
                        label={' Residence Type'}
                        size={"medium"}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name="userName"
                        label="RFID"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name="userName"
                        label="Admission Standard"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="newAdmission"
                                checked={form.newAdmission}
                                onChange={handleInputChange}
                            />
                        }
                        label="Is Staff Kid?"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="newAdmission"
                                checked={form.newAdmission}
                                onChange={handleInputChange}
                            />
                        }
                        label="Is Only Child?"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="newAdmission"
                                checked={form.newAdmission}
                                onChange={handleInputChange}
                            />
                        }
                        label="Is Rise & Shine?"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="newAdmission"
                                checked={form.newAdmission}
                                onChange={handleInputChange}
                            />
                        }
                        label="Is Minority?"
                    />
                </Grid>
                <Grid item xs={3}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="newAdmission"
                                checked={form.newAdmission}
                                onChange={handleInputChange}
                            />
                        }
                        label="Is For Day Boarding?"
                    />
                </Grid>

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

            <Box>
                <Typography variant="h4" color="initial" py={2}> Last School Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField
                            name="lastSchoolName"
                            label="Last School Name"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name="lastSchoolRollNumber"
                            label="School Address"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name="lastSchoolYear"
                            label="Standard"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            name="lastSchoolAddress"
                            label="School UDISE No."
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <SearchableDropdown
                            sx={{ minWidth: '300px' }}
                            ItemList={SchoolBoardName}
                            // onChange={onClickClass}
                            label={' School Board Name'}
                            size={"medium"}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <SearchableDropdown
                            sx={{ minWidth: '300px' }}
                            ItemList={Recognised}
                            // onChange={onClickClass}
                            label={'Is Recognised'}
                            size={"medium"}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12} pt={2} >
                <Button
                sx={{
                    color:'#38548A',
                      backgroundColor: grey[100],
                      '&:hover': {
                    color:'#38548A',
                     backgroundColor: blue[100]
                      }}}
                    onClick={handleSave}>
                    Save And Next
                </Button>
            </Grid>
        </Box>
    );
};

export default AdmissionDetails;
