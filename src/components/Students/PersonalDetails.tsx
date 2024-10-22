import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Grid, IconButton, MenuItem, TextField, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import { User } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleFile2 from 'src/libraries/File/SingleFile2';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { RootState } from 'src/store';
const PersonalDetails = ({ onSave }) => {
    const [form, setForm] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        motherName: '',
        motherNumber: '',
        parentName: '',
        fatherNumber: '',
        email: '',
        parentOccupation: '',
        address: '',
        city: '',
        state: '',
        pin: '',
        placeOfBirth: '',
        birthTaluka: '',
        birthDistrict: '',
        birthState: '',
        neighbourPhoneNumber: '',
        religion: '',
        casteAndSubCaste: '',
        category: '',
        dateOfBirth: '',
        nationality: '',
        motherTongue: '',
        gender: '',
        bloodGroup: '',
        aadharCardNumber: '',
        nameOnAadharCard: '',
        aadharCardScanCopy: null, // This will store the file object
        photo: null, // This will store the file object
    });

    const ValidFileTypes2 = ['JPG', 'JPEG', 'PNG', 'BMP'];
    const MaxfileSize2 = 10000000;

    const ChangeFile = (value) => {
        setForm(value.name);
        //setbase64URL2(value.Value);
    };

    const [errors, setErrors] = useState({
        firstName: false,
        middleName: false,
        lastName: false,
        motherName: false,
        motherNumber: false,
        parentName: false,
        fatherNumber: false,
        email: false,
        parentOccupation: false,
        address: false,
        city: false,
        state: false,
        pin: false,
        placeOfBirth: false,
        birthTaluka: false,
        birthDistrict: false,
        birthState: false,
        neighbourPhoneNumber: false,
        religion: false,
        casteAndSubCaste: false,
        category: false,
        dateOfBirth: false,
        nationality: false,
        motherTongue: false,
        gender: false,
        bloodGroup: false,
        aadharCardNumber: false,
        nameOnAadharCard: false,
        aadharCardScanCopy: false, // This will store the file object
        photo: false, // This will store the file object
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, files } = e.target;
        const fieldValue = type === 'checkbox' ? checked : type === 'file' ? (files ? files[0] : null) : value;
        setForm({ ...form, [name]: fieldValue });

        // Remove error when the user starts filling the field
        setErrors({ ...errors, [name]: false });
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prevForm => ({ ...prevForm, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const GetTeachers = useSelector(
        (state: RootState) => state.StudentRecords.ClassTeachers
    );

    return (
        <Box sx={{ backgroundColor: 'white', p: 2 }}>
            <Grid container spacing={2}>
                {/* User Name */}
                <Grid item xs={3}>
                    <TextField
                        name="firstName"
                        label="First Name"
                        variant="outlined"
                        value={form.firstName}
                        onChange={handleInputChange}
                        required
                        error={errors.firstName}
                        helperText={errors.firstName ? "This field is required" : ""}
                        fullWidth
                    />
                </Grid>

                {form.middleName !== undefined && (
                    <Grid item xs={3}>
                        <TextField
                            name="middleName"
                            label="Middle Name"
                            variant="outlined"
                            value={form.middleName}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.lastName !== undefined && (
                    <Grid item xs={3}>
                        <TextField
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            value={form.lastName}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box
                        mt={0}
                        sx={{
                            width: '45%',
                            height: '200px', // Adjust height as needed
                            border: '2px dashed #ccc', // Dashed border for empty box
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        {form.photo ? (
                            <img src={form.photo} alt="Preview" style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                            }} />
                        ) : (
                            <p> <User
                                style={{
                                    objectFit: 'cover', // Maintain aspect ratio for User icon
                                }} /></p>
                        )}
                    </Box>

                    <input type="file" onChange={handleImageChange} />

                </Grid>

                {form.motherName !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="motherName"
                            label="Mother's Name"
                            variant="outlined"
                            value={form.motherName}
                            onChange={handleInputChange}
                            required
                            error={errors.motherName}
                            helperText={errors.motherName ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.motherNumber !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="motherNumber"
                            label="Mother's Number"
                            variant="outlined"
                            value={form.motherNumber}
                            onChange={handleInputChange}
                            required
                            error={errors.motherNumber}
                            helperText={errors.motherNumber ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.parentName !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="parentName"
                            label="Parent's Name"
                            variant="outlined"
                            value={form.parentName}
                            onChange={handleInputChange}
                            required
                            error={errors.parentName}
                            helperText={errors.parentName ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.fatherNumber !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="fatherNumber"
                            label="Father's Number"
                            variant="outlined"
                            value={form.fatherNumber}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.email !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={form.email}
                            onChange={handleInputChange}
                            required
                            error={errors.email}
                            helperText={errors.email ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* Dropdown */}
                {form.parentOccupation !== undefined && (
                    <Grid item xs={2}>
                        <SearchableDropdown
                            sx={{ minWidth: '15vw' }}
                            ItemList={GetTeachers}
                            onChange={handleInputChange}
                            label={"Parent's Occupation"}
                            defaultValue={form.parentOccupation}
                            size={"medium"}
                        />
                    </Grid>
                )}

                {form.address !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="address"
                            label="Address"
                            variant="outlined"
                            value={form.address}
                            onChange={handleInputChange}
                            required
                            error={errors.address}
                            helperText={errors.address ? "This field is required" : ""}
                            fullWidth
                            rows={3}
                        />
                    </Grid>
                )}

                {form.city !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="city"
                            label="City"
                            variant="outlined"
                            value={form.city}
                            onChange={handleInputChange}
                            required
                            error={errors.city}
                            helperText={errors.city ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.state !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="state"
                            label="State"
                            variant="outlined"
                            value={form.state}
                            onChange={handleInputChange}
                            required
                            error={errors.state}
                            helperText={errors.state ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.pin !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="pin"
                            label="PIN Code"
                            variant="outlined"
                            value={form.pin}
                            onChange={handleInputChange}
                            required
                            error={errors.pin}
                            helperText={errors.pin ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.placeOfBirth !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="placeOfBirth"
                            label="Place of Birth"
                            variant="outlined"
                            value={form.placeOfBirth}
                            onChange={handleInputChange}
                            required
                            error={errors.placeOfBirth}
                            helperText={errors.placeOfBirth ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.birthTaluka !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="birthTaluka"
                            label="Birth Taluka"
                            variant="outlined"
                            value={form.birthTaluka}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.birthDistrict !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="birthDistrict"
                            label="Birth District"
                            variant="outlined"
                            value={form.birthDistrict}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.birthState !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="birthState"
                            label="Birth State"
                            variant="outlined"
                            value={form.birthState}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.neighbourPhoneNumber !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="neighbourPhoneNumber"
                            label="Neighbour's Phone Number"
                            variant="outlined"
                            value={form.neighbourPhoneNumber}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.religion !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="religion"
                            label="Religion"
                            variant="outlined"
                            value={form.religion}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.casteAndSubCaste !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="casteAndSubCaste"
                            label="Caste and Sub-caste"
                            variant="outlined"
                            value={form.casteAndSubCaste}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {/* dropdown */}
                {form.category !== undefined && (
                    <Grid item xs={2}>
                        <SearchableDropdown
                            sx={{ minWidth: '15vw' }}
                            ItemList={GetTeachers}
                            onChange={handleInputChange}
                            label={"Category"}
                            defaultValue={form.category}
                            size={"medium"}
                        />
                    </Grid>
                )}

                {form.dateOfBirth !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="dateOfBirth"
                            label="Date of Birth"
                            type='date'
                            variant="outlined"
                            value={form.dateOfBirth}
                            onChange={handleInputChange}
                            required
                            error={errors.dateOfBirth}
                            helperText={errors.dateOfBirth ? "This field is required" : ""}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                )}

                {form.nationality !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="nationality"
                            label="Nationality"
                            variant="outlined"
                            value={form.nationality}
                            onChange={handleInputChange}
                            required
                            error={errors.nationality}
                            helperText={errors.nationality ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.motherTongue !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="motherTongue"
                            label="Mother Tongue"
                            variant="outlined"
                            value={form.motherTongue}
                            onChange={handleInputChange}
                            required
                            error={errors.motherTongue}
                            helperText={errors.motherTongue ? "This field is required" : ""}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.gender !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="gender"
                            label="Gender"
                            variant="outlined"
                            value={form.gender}
                            onChange={handleInputChange}
                            required
                            error={errors.gender}
                            helperText={errors.gender ? "This field is required" : ""}
                            fullWidth
                            select
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </TextField>
                    </Grid>
                )}

                {/* Dropdown */}
                {form.bloodGroup !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="bloodGroup"
                            label="Blood Group"
                            variant="outlined"
                            value={form.bloodGroup}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.aadharCardNumber !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="aadharCardNumber"
                            label="Aadhar Card Number"
                            variant="outlined"
                            value={form.aadharCardNumber}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                {form.nameOnAadharCard !== undefined && (
                    <Grid item xs={2}>
                        <TextField
                            name="nameOnAadharCard"
                            label="Name on Aadhar Card"
                            variant="outlined"
                            value={form.nameOnAadharCard}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Grid>
                )}

                <Grid item xs={12} md={2.1} >
                    <SingleFile2
                        ValidFileTypes={ValidFileTypes2}
                        MaxfileSize={MaxfileSize2}
                        ChangeFile={ChangeFile}
                        errorMessage={''}
                        FileName={form.aadharCardScanCopy}
                        FileLabel={'Select'}
                        width={'100%'}
                        height={"52px"}
                        isMandatory={false}
                    />
                </Grid>
                <Grid item xs={1} md={1}>
                    <>

                        <Tooltip title={"View"}>
                            <IconButton
                                onClick={() => ''}
                                sx={{
                                    color: '#223354',
                                    mt: 0.7,
                                    '&:hover': {
                                        color: '#223354',
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                <Visibility />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={"Delete"}>
                            <IconButton
                                onClick={() => ''}
                                sx={{
                                    color: '#223354',
                                    mt: 0.7,
                                    '&:hover': {
                                        color: 'red',
                                        backgroundColor: red[100]
                                    }
                                }}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                </Grid>




            </Grid>
        </Box>
    );
};

export default PersonalDetails