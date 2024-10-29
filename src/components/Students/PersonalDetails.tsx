import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Visibility from '@mui/icons-material/Visibility';
import {
  Alert,
  Box,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip
} from '@mui/material';
import { red } from '@mui/material/colors';
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
    photo: null // This will store the file object
  });
  console.log('form', form.parentOccupation);

  const ValidFileTypes = [
    'BMP',
    'DOC',
    'DOCX',
    'JPG',
    'JPEG',
    'PDF',
    'XLS',
    'XLSX'
  ];
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
    motherTongue: false
  });

  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const GetTeachers = useSelector(
    (state: RootState) => state.StudentRecords.ClassTeachers
  );
  //Occupation Dropdown
  const OccupationDropdown = useSelector(
    (state: RootState) => state.StudentUI.ISOcupationDropdown
  );
  console.log('OccupationDropdown', OccupationDropdown);
  const CategoryDropdown = useSelector(
    (state: RootState) => state.StudentUI.ISCategoryDropdown
  );
  console.log('OccupationDropdown', CategoryDropdown);

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

    setForm((prevForm) => ({
      ...prevForm,
      [name]: fieldValue
    }));

    // Remove error when the user starts filling the field
    setErrors({ ...errors, [name]: false });
  };

  const handleDropdownChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prevForm) => ({ ...prevForm, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    // Reset the form photo to null to remove the image
    setForm({ ...form, photo: null });

    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input so the file name disappears
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={2}>
            {/* User Name */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                name="firstName"
                label={
                  <span>
                    First Name <span style={{ color: 'red' }}> *</span>
                  </span>
                }
                variant="outlined"
                value={form.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                helperText={errors.firstName ? 'This field is required' : ''}
                fullWidth
              />
            </Grid>

            {form.middleName !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
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
              <Grid item xs={12} sm={6} md={4}>
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="motherName"
                  label="Mother Name"
                  variant="outlined"
                  value={form.motherName}
                  onChange={handleInputChange}
                  error={errors.motherName}
                  helperText={errors.motherName ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            )}

            {form.motherNumber !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="motherNumber"
                  label="Mobile No. 1"
                  variant="outlined"
                  value={form.motherNumber}
                  onChange={handleInputChange}
                  error={errors.motherNumber}
                  helperText={
                    errors.motherNumber ? 'This field is required' : ''
                  }
                  fullWidth
                />
              </Grid>
            )}

            {form.email !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={form.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  helperText={errors.email ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            )}

            {form.parentName !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="parentName"
                  label={
                    <span>
                      Parent Name <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={form.parentName}
                  onChange={handleInputChange}
                  error={errors.parentName}
                  helperText={errors.parentName ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            )}

            {form.fatherNumber !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="fatherNumber"
                  label="Mobile No. 2"
                  variant="outlined"
                  value={form.fatherNumber}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}

            {/* Dropdown */}
            <Grid item xs={12} sm={6} md={4}>
              <SearchableDropdown
                sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
                ItemList={OccupationDropdown}
                onChange={(value) =>
                  handleDropdownChange('parentOccupation', value)
                }
                label={'Parent Occupation'}
                mandatory
                defaultValue={form.parentOccupation}
                size="medium"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Photo Grid */}
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: { xs: '80%', sm: '60%', md: '40%' },
              height: '160px', // Adjust height as needed
              border: '2px dashed #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexDirection: 'row'
            }}
          >
            {form.photo ? (
              <img
                src={form.photo}
                alt="Preview"
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }}
              />
            ) : (
              <User
                style={{
                  objectFit: 'cover'
                }}
              />
            )}
          </Box>

          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              pl: { xs: 2, sm: 4, md: 10 }
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ marginTop: '10px' }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Tooltip title="Delete">
                <IconButton
                  onClick={handleDeletePhoto}
                  sx={{
                    color: '#223354',
                    mt: 0,
                    '&:hover': {
                      color: 'red',
                      backgroundColor: 'rgb(254, 226, 226)'
                    }
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Address */}
            {form.address !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="address"
                  label={
                    <span>
                      Address <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={form.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  helperText={errors.address ? 'This field is required' : ''}
                  fullWidth
                  multiline
                />
              </Grid>
            )}
            {/* City */}
            {form.city !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="city"
                  label={
                    <span>
                      City <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={form.city}
                  onChange={handleInputChange}
                  error={errors.city}
                  helperText={errors.city ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            )}
            {/* State */}
            {form.state !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="state"
                  label={
                    <span>
                      State <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={form.state}
                  onChange={handleInputChange}
                  error={errors.state}
                  helperText={errors.state ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            )}
            {/* PIN Code */}
            {form.pin !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="pin"
                  label={
                    <span>
                      PIN Code <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={form.pin}
                  onChange={handleInputChange}
                  error={errors.pin}
                  helperText={errors.pin ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            )}
            {/* Date of Birth */}
            {form.dateOfBirth !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="dateOfBirth"
                  label={
                    <span>
                      Date of Birth <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  type="date"
                  variant="outlined"
                  value={form.dateOfBirth}
                  onChange={handleInputChange}
                  error={errors.dateOfBirth}
                  helperText={
                    errors.dateOfBirth ? 'This field is required' : ''
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            )}
            {/* Remaining Fields */}
            {form.placeOfBirth !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="placeOfBirth"
                  label="Place of Birth"
                  variant="outlined"
                  value={form.placeOfBirth}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}
            {form.birthTaluka !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
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
              <Grid item xs={12} sm={6} md={4} lg={3}>
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
              <Grid item xs={12} sm={6} md={4} lg={3}>
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
            {form.nationality !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="nationality"
                  label="Nationality"
                  variant="outlined"
                  value={form.nationality}
                  onChange={handleInputChange}
                  error={errors.nationality}
                  helperText={
                    errors.nationality ? 'This field is required' : ''
                  }
                  fullWidth
                />
              </Grid>
            )}
            {/* Other Fields */}
            {form.gender !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
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
            {/* Single File Upload */}
            <Grid item xs={4} sm={2} md={2} lg={2}>
              <SingleFile
                ValidFileTypes={ValidFileTypes}
                MaxfileSize={MaxfileSize}
                FileName={form.aadharCardScanCopy}
                ChangeFile={handleImageChange}
                FileLabel={'Aadhar Card'}
                isMandatory={false}
                height={'52px'}
                width="100%"
              />
            </Grid>
            <Grid item xs={1} md={1}>
              <>
                <Tooltip title={'View'}>
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

                <Tooltip title={'Delete'}>
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
    </Box>
  );
};

export default PersonalDetails;
