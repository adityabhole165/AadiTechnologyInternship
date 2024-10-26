import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Visibility from '@mui/icons-material/Visibility';
import { Alert, Box, Button, Grid, IconButton, MenuItem, TextField, Tooltip, } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import { User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IMasterDatastudentBody } from 'src/interfaces/Students/IStudentUI';
import SingleFile from 'src/libraries/File/SingleFile';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetStudentRecordData } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';
const PersonalDetails = ({ onSave }) => {
    const location = useLocation();
    const { standardId, DivisionId } = location.state || {};
    const dispatch = useDispatch();
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
        aadharCardScanCopy: '', // This will store the file object
        photo: null, // This will store the file object
    });


    const ValidFileTypes = ["BMP", "DOC", "DOCX", "JPG", "JPEG", "PDF", "XLS", "XLSX"];
    const MaxfileSize = 5000000;

    const ChangeFile = (value) => {
        setForm(value.name);
        //setbase64URL2(value.Value);
    };

    const [errors, setErrors] = useState({
        firstName: false,
        motherName: false,
        motherNumber: false,
        parentName: false,
        email: false,
        address: false,
        city: false,
        state: false,
        pin: false,
        placeOfBirth: false,
        casteAndSubCaste: false,
        dateOfBirth: false,
        nationality: false,
        motherTongue: false,
    });

    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');

    const GetTeachers = useSelector(
        (state: RootState) => state.StudentRecords.ClassTeachers
    );
    //Occupation Dropdown
    const OccupationDropdown = useSelector((state: RootState) => state.StudentUI.ISOcupationDropdown);
    console.log('OccupationDropdown', OccupationDropdown);

    useEffect(() => {
        dispatch(CDAGetStudentRecordData(GetStudentRecordDataResult));
    }, []);

    const GetStudentRecordDataResult: IMasterDatastudentBody = {
        asSchoolId: Number(localStorage.getItem('localSchoolId')),
        asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
        asStandardId: standardId,
        asDivisionId: DivisionId
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, files } = e.target;

        let fieldValue;
        if (type === 'checkbox') {
            fieldValue = checked;
        } else if (type === 'file') {
            fieldValue = files ? files[0] : null;
        } else {
            fieldValue = value;
        }

        setForm(prevForm => ({
            ...prevForm,
            [name]: fieldValue
        }));

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


    const handleDeletePhoto = () => {
        // Reset the form photo to null to remove the image
        setForm({ ...form, photo: null });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";  // Reset the file input so the file name disappears
        }
    };

    const validateForm = () => {
        const newErrors = {
            firstName: !form.firstName,
            motherName: !form.motherName,
            motherNumber: !form.motherNumber,
            parentName: !form.parentName,
            email: !form.email,
            address: !form.address,
            city: !form.city,
            state: !form.state,
            pin: !form.pin,
            placeOfBirth: !form.placeOfBirth,
            casteAndSubCaste: !form.casteAndSubCaste,
            dateOfBirth: !form.dateOfBirth,
            nationality: !form.nationality,
            motherTongue: !form.motherTongue
        };
        setErrors(newErrors);
        console.log(!Object.values(newErrors).includes(true));
        return !Object.values(newErrors).includes(true);
    };

    const handleSave = () => {
        const isValid = validateForm();
        onSave(isValid);
        setMessage(
            isValid
                ? 'Draft saved successfully!'
                : 'Please fill in all required fields.'
        );
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <Box sx={{ backgroundColor: 'white', p: 2 }}>
            {message && (
                <Grid item xs={12}>
                    <Alert
                        severity={message.includes('successfully') ? 'success' : 'error'}
                    >
                        {message}
                    </Alert>
                </Grid>
            )}
            <Grid container spacing={2} >
                <Grid item xs={9}>
                    <Grid container spacing={2}>
                        {/* User Name */}
                        <Grid item xs={12} md={4}>
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
                            <Grid item xs={12} md={4}>
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
                            <Grid item xs={4}>
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

                        {form.motherName !== undefined && (
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
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
                            <Grid item xs={4}>
                                <SearchableDropdown
                                    sx={{ minWidth: '15vw' }}
                                    ItemList={OccupationDropdown}
                                    onChange={handleInputChange}
                                    label={"Parent's Occupation"}
                                    defaultValue={form.parentOccupation}
                                    size={"medium"}
                                />
                            </Grid>
                        )}


                    </Grid>

                </Grid>

                {/* Photo Grid */}
                <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <Box
                        mt={0}
                        sx={{
                            width: '40%',
                            height: '180px', // Adjust height as needed
                            border: '2px dashed #ccc', // Dashed border for empty box
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center', // Ensure spacing between image and button
                            overflow: 'hidden',
                            flexDirection: 'row', // Arrange items horizontally
                        }}
                    >
                        {form.photo ? (

                            <img
                                src={form.photo}
                                alt="Preview"
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                            />

                        ) : (
                            <p> <User
                                style={{
                                    objectFit: 'cover', // Maintain aspect ratio for User icon
                                }} />
                            </p>
                        )}

                    </Box>

                    <Grid container spacing={2} sx={{ justifyContent: 'space-between', px: 2 }}
                    >

                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }} >

                            <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ marginTop: '10px', marginLeft: '100px' }} />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }} >
                            <Tooltip title="Delete">
                                <IconButton
                                    onClick={handleDeletePhoto}
                                    sx={{
                                        color: '#223354',
                                        mt: 0,
                                        '&:hover': {
                                            color: 'red',
                                            backgroundColor: 'rgb(254, 226, 226)', // red[100] equivalent
                                        }
                                    }}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                    </Grid>

                </Grid>

                <Grid item xs={12} >
                    <Grid container spacing={2}>

                        {form.address !== undefined && (
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
                                <TextField
                                    name="casteAndSubCaste"
                                    label="Caste and Sub-caste"
                                    variant="outlined"
                                    value={form.casteAndSubCaste}
                                    onChange={handleInputChange}
                                    required
                                    error={errors.casteAndSubCaste}
                                    helperText={errors.casteAndSubCaste ? "This field is required" : ""}
                                    fullWidth
                                />
                            </Grid>
                        )}

                        {/* dropdown */}
                        {form.category !== undefined && (
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
                                <TextField
                                    name="gender"
                                    label="Gender"
                                    variant="outlined"
                                    value={form.gender}
                                    onChange={handleInputChange}
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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

                        <Grid item md={2}>
                            <SingleFile
                                ValidFileTypes={ValidFileTypes}
                                MaxfileSize={MaxfileSize}
                                FileName={form.aadharCardScanCopy}
                                ChangeFile={handleImageChange}
                                FileLabel={'Aadhar Card'}
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
                </Grid>
            </Grid>

            {/* <Grid
                item
                xs={12}
                pt={2}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
                <Button
                    sx={{
                        color: '#38548A',
                        backgroundColor: grey[100],
                        '&:hover': {
                            color: '#38548A',
                            backgroundColor: blue[100]
                        }
                    }}
                    onClick={handleSave}
                >
                    Save And Next
                </Button>
            </Grid> */}
        </Box >
    );
};

export default PersonalDetails