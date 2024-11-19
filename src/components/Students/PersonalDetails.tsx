import { Clear as ClearIcon } from '@mui/icons-material'; // Ensure ClearIcon is imported correctly
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Visibility from '@mui/icons-material/Visibility';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import green from '@mui/material/colors/green';
import { User } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaCamera, FaRedo, FaStop } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';
import { AlertContext } from 'src/contexts/AlertContext';
import { IRemoveStudentPhotoBody } from 'src/interfaces/Students/IStudentUI';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import SingleFile2 from 'src/libraries/File/SingleFile2';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDADeleteStudentPhoto, resetDeleteStudentPhoto } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew } from '../Common/Util';



// const CaptureButton = ({ onClick }) => (
//   <div
//     className="absolute bottom-2 right-2 p-2 bg-gray-800 bg-opacity-50 rounded-full cursor-pointer"
//     onClick={onClick}
//   >
//     <FaCamera className="text-white" />
//   </div>
// )

// const RestartButton = ({ onClick }) => (
//   <div
//     className="absolute bottom-2 left-2 p-2 bg-gray-800 bg-opacity-50 rounded-full cursor-pointer"
//     onClick={onClick}
//   >
//     <FaRedo className="text-white" />
//   </div>
// )

// const StopButton = ({ onClick }) => (
//   <div
//     className="absolute bottom-2 left-2 p-2 bg-gray-800 bg-opacity-50 rounded-full cursor-pointer"
//     onClick={onClick}
//   >
//     <FaStop className="text-white" />
//   </div>
// )

const PersonalDetails = ({ onTabChange }) => {
  const [usingWebcam, setUsingWebcam] = useState(false);
  const webcamRef = useRef(null);

  const location = useLocation();
  const { Name, standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision_Id } = location.state || {};
  const dispatch = useDispatch();
  const { AssignedDate } = useParams();
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
    photoFilePath: null,
    photoFilePathImage: null,
  });
  //console.log('form', form.parentOccupation);
  const { showAlert, closeAlert } = useContext(AlertContext);

  const ValidFileTypes = ['BMP', 'DOC', 'DOCX', 'JPG', 'JPEG', 'PDF', 'XLS', 'XLSX'];
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
  const [SelectDate, SetSelectDate] = useState(
    AssignedDate == undefined
      ? new Date().toISOString().split('T')[0]
      : getCalendarDateFormatDateNew(AssignedDate)
  );
  const onSelectDate = (value) => {
    SetSelectDate(value);
  };

  // const GetTeachers = useSelector(
  //   (state: RootState) => state.StudentRecords.ClassTeachers
  // );
  //Occupation Dropdown
  const OccupationDropdown = useSelector((state: RootState) => state.StudentUI.ISOcupationDropdown);
  const CategoryDropdown = useSelector((state: RootState) => state.StudentUI.ISCategoryDropdown);

  const USGetSingleStudentDetails = useSelector((state: RootState) => state.StudentUI.ISGetSingleStudentDetails);
  console.log(USGetSingleStudentDetails, '🔲USGetSingleStudentDetails');

  const DeleteStudentPhotoMsg = useSelector((state: RootState) => state.StudentUI.ISDeleteStudentPhotoMsg);

  // const GetStudentRecordDataResult: IMasterDatastudentBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //   asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
  //   asStandardId: standardId,
  //   asDivisionId: DivisionId
  // };
  // const GetSingleStudentDetails: IGetSingleStudentDetailsBody = {
  //   asSchoolId: Number(localStorage.getItem('localSchoolId')),
  //   asAcademicYearId: Number(sessionStorage.getItem('AcademicYearId')),
  //   asStudentId: SchoolWise_Student_Id // Number(sessionStorage.getItem('Id'))
  // };

  // useEffect(() => {
  //   dispatch(CDAGetMasterData(GetStudentRecordDataResult));
  //   dispatch(CDAGetSingleStudentDetails(GetSingleStudentDetails));
  // }, []);

  useEffect(() => {
    if (USGetSingleStudentDetails && USGetSingleStudentDetails.length > 0) {
      const studentData = USGetSingleStudentDetails[0]; // Get first item from array
      setForm(prevForm => ({
        ...prevForm,
        firstName: studentData.First_Name || '',
        middleName: studentData.Middle_Name || '',
        lastName: studentData.Last_Name || '',
        motherName: studentData.Mother_Name || '',
        motherNumber: studentData.Mobile_Number || '',
        parentName: studentData.Parent_Name || '',
        fatherNumber: studentData.Mobile_Number2 || '',
        email: studentData.Email_Address || '',
        parentOccupation: studentData.Parent_Occupation || '',
        address: studentData.Address || '',
        city: studentData.City || '',
        state: studentData.State || '',
        pin: studentData.Pincode || '',
        placeOfBirth: studentData.Birth_Place || '',
        birthTaluka: studentData.birthTaluka || '',
        birthDistrict: studentData.birthDistrict || '',
        birthState: studentData.birthState || '',
        religion: studentData.Religion || '',
        casteAndSubCaste: studentData.CasteAndSubCaste || '',
        category: studentData.Category_Id || '',
        dateOfBirth: studentData.DOB || '',
        nationality: studentData.Nationality || '',
        motherTongue: studentData.Mother_Tongue || '',
        gender: studentData.Sex || '',
        bloodGroup: studentData.Blood_Group || '',
        aadharCardNumber: studentData.AadharCardNo || '',
        nameOnAadharCard: studentData.NameOnAadharCard || '',
        aadharCardScanCopy: studentData?.AadharCard_Photo_Copy_Path || '',
        photoFilePath: studentData.Photo_File_Path || null,
        photoFilePathImage: studentData.Photo_file_Path_Image || null
      }));
    }
  }, [USGetSingleStudentDetails]);


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

    //onTabChange({ firstName: fieldValue, })
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

  //#region WebCam
  const [open, setOpen] = useState(false);
  //  const [fileNameError, setFileNameError] = useState('');
  const [isWebcamActive, setIsWebcamActive] = useState(true)
  const [capturedImage, setCapturedImage] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const generateImageName = (prefix) => {
    const dateTime = new Date().toISOString();
    return `${form.firstName}_${prefix}_${dateTime}.png`;
  };

  const processImage = (imageData, prefix) => {
    console.log('prefix', prefix);
    const base64Image = imageData.split(',')[1];
    const newImageName = generateImageName(prefix);
    setImageName(newImageName);

    setUploadedImage({
      src: imageData,
      name: newImageName,
      base64: base64Image
    });

    setForm(prevForm => ({
      ...prevForm,
      photoFilePath: newImageName
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log('file', reader);
      // const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      // const fileName = `${form.firstName}_Selected_${timestamp}.png`;
      // reader.readAsDataURL(file);
      reader.onloadend = () => {
        //setForm((prevForm) => ({ ...prevForm, photo: fileName }));
        setCapturedImage(reader.result); // Store image temporarily until uploaded
        processImage(reader.result, 'Selected');              ////🆕newesst Logic
        console.log('0️⃣reader.result', reader.result);
        console.log('0️⃣SelectedImage', capturedImage);
        // const dateTime = new Date().toISOString();
        // const base64Image = capturedImage.split(',')[1];
        // const imageName = `${form.firstName}_WebCam_${dateTime}.png`;
        // setImageName(imageName);

        // setUploadedImage({ src: capturedImage, name: imageName, base64: base64Image });
        // setForm((prevForm) => ({
        //   ...prevForm,
        //   photoFilePath: imageName
        // }));
        //setFileNameError('');
      };
      reader.readAsDataURL(file);

    }
  };

  const CapturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);

    // setForm({ ...form, photoFilePath: fileName });

    setIsWebcamActive(true);
    //setFileNameError('');
    console.log('capturedImage 0️⃣', capturedImage);
  };


  const handleDeletePhoto = () => {
    // Reset the form photo to null to remove the image
    setUploadedImage(null);
    setCapturedImage(null);
    setForm({ ...form, photoFilePath: null });

    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input so the file name disappears
    }
    //setFileNameError('');
  };

  // const handleOpenDialog = () => {
  //   setOpen(true);
  // };

  const ClickUpload = () => {
    console.log('Captured Image after clicked Upload 1️⃣', capturedImage);

    if (capturedImage) {
      processImage(capturedImage, 'WebCam');
      // const dateTime = new Date().toISOString();
      // const base64Image = capturedImage.split(',')[1];
      // const imageName = `${form.firstName}_WebCam_${dateTime}.png`;
      // setImageName(imageName);

      // setUploadedImage({ src: capturedImage, name: imageName, base64: base64Image });
      // setForm((prevForm) => ({
      //   ...prevForm,
      //   photoFilePath: imageName
      // }));
      // setForm({ form.photoFilePath: imageName });         // Set the imageName in the photoFilePath of the useState

      setOpen(false);
    }
    //setFileNameError('');
  };

  // const stopWebcam = () => {
  //   setIsWebcamActive(false)
  // }

  const restartWebcam = () => {
    setIsWebcamActive(true)
    setCapturedImage(null)
    //setFileNameError('');

  }

  const handleCloseDialog = () => {
    setOpen(false);
    //setFileNameError('');
    setIsWebcamActive(false);
  };

  const deleteImage = () => {
    const DeleteStudentPhotoBody: IRemoveStudentPhotoBody = {
      asSchoolId: Number(localStorage.getItem('localSchoolId')),
      asStudentId: SchoolWise_Student_Id
    };
    if (form.photoFilePath) {
      console.log('👎', form.photoFilePath);
      showAlert({
        title: 'Please Confirm',
        message: 'Are you sure you want to delete Student Photo?',
        variant: 'warning',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        onCancel: () => {
          closeAlert();
        },
        onConfirm: () => {
          dispatch(CDADeleteStudentPhoto(DeleteStudentPhotoBody));
          closeAlert();
        },
      });
    }
  };

  useEffect(() => {
    if (DeleteStudentPhotoMsg !== '') {
      toast.success(DeleteStudentPhotoMsg);
      handleDeletePhoto();                // delete photo
      dispatch(resetDeleteStudentPhoto());
    }
  }, [DeleteStudentPhotoMsg]);

  //#region File Upload
  const ValidFileTypes2 = ['JPG', 'JPEG', 'PNG', 'BMP'];
  const MaxfileSize2 = 3000000;

  const [ImageFile, setImageFile] = useState('');
  const [base64URL2, setbase64URL2] = useState('');
  const [imageFileExtention, setImageFileExtention] = useState('');

  const ChangeFile2 = (value) => {
    console.log('🆕ChangeFile', value);

    //setImageFile(value.Name);
    setbase64URL2(value.Value);
    setImageFileExtention(value.FileExtension);
    console.log('1️⃣', form.aadharCardScanCopy);
    console.log('2️⃣', base64URL2);
    console.log('3️⃣', imageFileExtention);

    console.log('Selected file:', value.Name);            // late render

    setForm((prevForm) => ({
      ...prevForm,
      aadharCardScanCopy: value.Name,
    }));
    console.log('🆕1️⃣aadharCardScanCopy', form.aadharCardScanCopy);
  };

  //let url = localStorage.getItem("SiteURL") + "/RITeSchool/DOWNLOADS/Student Documents/"
  const url = `${localStorage.getItem("SiteURL")}RITESCHOOL/DOWNLOADS/Student Documents/${form.aadharCardScanCopy}`;   //--remeber to set aadharCardScanCopy
  const base64Image = `data:image/${imageFileExtention};base64,${base64URL2}`;

  const viewImage = () => {
    //const base64Image = `data:image/${imageFileExtention};base64,${base64URL2}`;
    console.log('base64Image', base64Image);
    if (form.aadharCardScanCopy) {                             // -----show image using url🩸
      window.open(url, '_blank');
    }

    // if (base64URL2 && imageFileExtention) {       // -----show image using base64🩸
    //   console.log('Opening image:', base64Image);
    //   window.open(base64Image, '_blank');
    // } else {
    //   console.error('Base64 string or file extension is missing!');
    // }

    //window.open(base64Image, '_blank');
  };


  //#region DataTransfer 
  useEffect(() => {
    onTabChange(form); // Sends the initial form state to the parent when component mounts
  }, [form]);
  //#endregion

  //#endregion
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
    // onSave(isValid);
    setMessage(
      isValid
        ? 'Draft saved successfully!'
        : 'Please fill in all required fields.'
    );
    setTimeout(() => setMessage(''), 2000);
  };
  const BloodGroupDropdown = [
    { Id: 1, Name: 'O+', Value: 'O+' },
    { Id: 2, Name: 'A+', Value: 'A+' },
    { Id: 3, Name: 'B+', Value: 'B+' },
    { Id: 4, Name: 'AB+', Value: 'AB+' },
    { Id: 5, Name: 'O-', Value: 'O-' },
    { Id: 6, Name: 'A-', Value: 'A-' },
    { Id: 7, Name: 'B-', Value: 'B-' },
    { Id: 8, Name: 'AB-', Value: 'AB-' }
  ];


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
                  label="E-mail"
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
        <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{
            width: { xs: '80%', sm: '60%', md: '40%' }, height: '160px', border: '2px dashed #ccc', display: 'flex',
            alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexDirection: 'row'
          }}
          >
            {uploadedImage ? (
              <img
                src={uploadedImage.src}
                alt="Uploaded"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              <User
                style={{ objectFit: 'cover' }} />
            )}
          </Box>

          <Grid container spacing={2} sx={{ justifyContent: 'space-between', pl: { xs: 2, sm: 4, md: 10 } }}>
            <Grid item xs={6} sm={8} sx={{ display: 'flex', justifyContent: 'center' }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ margin: '12px' }}
              />
            </Grid>
            <Grid item xs={3} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={() => setOpen(true)}>
                <Tooltip title={"Use Webcam"}>
                  <AddAPhotoIcon />
                </Tooltip>
              </IconButton>
            </Grid>

            <Grid item xs={3} sm={2} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => deleteImage()}
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
                <Datepicker
                  DateValue={SelectDate}
                  onDateChange={onSelectDate}
                  size={'medium'}
                  label={'Date of Birth'} />
                {/* <TextField
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
                />*/}
              </Grid>
            )}
            {/* Remaining Fields */}
            {form.placeOfBirth !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="placeOfBirth"
                  label={
                    <span>
                      Place of Birth <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={form.placeOfBirth}
                  onChange={handleInputChange}
                  error={errors.placeOfBirth}
                  helperText={errors.placeOfBirth ? 'This field is required' : ''}
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
            {form.religion !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SearchableDropdown
                sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
                ItemList={CategoryDropdown}
                onChange={(value) => handleDropdownChange('category', value)}
                label={'Category'}
                defaultValue={form.category}
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="casteAndSubCaste"
                label={
                  <span>
                    Caste & Sub-Caste <span style={{ color: 'red' }}> *</span>
                  </span>
                }
                variant="outlined"
                value={form.casteAndSubCaste}
                onChange={handleInputChange}
                error={errors.casteAndSubCaste}
                helperText={errors.casteAndSubCaste ? 'This field is required' : ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="motherTongue"
                label="MotherTongue"
                variant="outlined"
                value={form.motherTongue}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>

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
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  {/* <MenuItem value="other">Other</MenuItem> */}
                </TextField>
              </Grid>
            )}

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SearchableDropdown
                sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
                ItemList={BloodGroupDropdown}
                onChange={(value) => handleDropdownChange('bloodGroup', value)}
                label={'Blood Group'}
                defaultValue={form.bloodGroup}
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="aadharCardNumber"
                label="Aadhar Card Number"
                variant="outlined"
                value={form.aadharCardNumber}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="nameOnAadharCard"
                label="Name on Adhar Card"
                variant="outlined"
                value={form.nameOnAadharCard}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            {/* Single File Upload */}
            <Grid item xs={4} sm={2} md={2} lg={2}>
              <SingleFile2
                ValidFileTypes={ValidFileTypes2}
                MaxfileSize={MaxfileSize2}
                ChangeFile={ChangeFile2}
                errorMessage={''}
                FileName={form.aadharCardScanCopy}
                FileLabel={'Select Aadhar Card'}
                width={'100%'}
                height={"52px"}
                isMandatory={false}
              />
            </Grid>
            <Grid item xs={1} md={1}>
              <>
                <Tooltip title={'View'}>
                  <IconButton
                    onClick={viewImage}
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
      <Dialog
        open={open}
        maxWidth={'md'}
        fullWidth
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: "15px",
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <ClearIcon onClick={handleCloseDialog}
            sx={{
              color: 'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
              }
            }} />
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography variant="h2" sx={{ pt: 2, pl: 1 }}>Upload Photo</Typography>
            <Box sx={{ background: 'white', top: '1px', alignItems: 'center', pl: 1, pr: 2, pt: 2 }}>
              <Grid container spacing={2}  >
                <Grid item xs={6} sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: 2, borderColor: 'gray.300', width: '100%', height: '100%', overflow: 'hidden', }}
                >
                  {isWebcamActive ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        //className="w-full h-full object-contain"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain', // To maintain aspect ratio
                          borderRadius: '4%', // Match the captured image's rounded corners
                        }}

                      />
                      <IconButton onClick={CapturePhoto} sx={{ position: 'absolute', bottom: 20, left: 20, p: 2, backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}>
                        <Tooltip title={'Capture Photo'}>
                          <FaCamera />
                        </Tooltip>
                      </IconButton>
                      {/* <CaptureButton onClick={handleCapturePhoto} /> */}
                      <IconButton onClick={() => setIsWebcamActive(false)} sx={{ position: 'absolute', bottom: 20, right: 20, p: 2, backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}>
                        <Tooltip title={'Stop'}>
                          <FaStop />
                        </Tooltip>
                      </IconButton>
                      {/* <StopButton onClick={stopWebcam} /> */}
                    </>
                  ) : (
                    <IconButton onClick={restartWebcam} sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: '50%', cursor: 'pointer' }}>
                      <Tooltip title={'Reload Camera'}>
                        <FaRedo />
                      </Tooltip>
                    </IconButton>
                    // <RestartButton onClick={restartWebcam} />
                  )}
                </Grid>
                {/* {capturedImage && ( */}
                <Grid item xs={6} sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: 2, width: '100%', height: '100%' }}>
                  {capturedImage && (
                    <img
                      src={capturedImage}
                      alt="Captured"
                      style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', borderRadius: '4%' }}
                    />
                  )}
                </Grid>
                {/* )} */}
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button
            color={'error'}
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            onClick={ClickUpload} // Increment attachment count only on upload
            sx={{
              color: 'green',
              '&:hover': {
                color: 'green',
                backgroundColor: green[100]
              }
            }}
            disabled={false} // Disable upload if there's a file error
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonalDetails;
