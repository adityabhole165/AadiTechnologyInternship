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
import Datepicker1 from 'src/libraries/DateSelector/Datepicker1';
import SingleFile2 from 'src/libraries/File/SingleFile2';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDADeleteStudentPhoto, CDAresetDeletePhotoMsg } from 'src/requests/Students/RequestStudentUI';
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

const PersonalDetails = ({ personal, onChange, validationMessages, isValid }) => {
  const [usingWebcam, setUsingWebcam] = useState(false);
  const webcamRef = useRef(null);

  const location = useLocation();
  const { Name, standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision_Id } = location.state || {};
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(false)

  const { AssignedDate } = useParams();
  //console.log(AssignedDate, 'sfsdfds')
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

  useEffect(() => {
    //console.log('2️⃣personal data from Parent', personal);
    //console.log('🎈🎈From Parent', personal.dateOfBirth);
  }, [personal]);

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

  //const USGetSingleStudentDetails = useSelector((state: RootState) => state.StudentUI.ISGetSingleStudentDetails);
  //console.log(USGetSingleStudentDetails, '🔲USGetSingleStudentDetails');
  //const GetStudentAdditionalDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentAdditionalDetails);

  const DeleteStudentPhotoMsg = useSelector((state: RootState) => state.StudentUI.ISDeleteStudentPhotoMsg);

  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
  const compareAgeTillDate = UsGetSchoolSettings?.GetSchoolSettingsResult?.CompareAgeTillDate || '';
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

  //#region Date Formation
  // const formatDOB = (date) => {
  //   try {
  //     // Handle DD-MM-YYYY format with or without time
  //     if (date.includes('-')) {
  //       const [day, month, year] = date.split(' ')[0].split('-');
  //       if (day.length === 2) {
  //         return `${year}-${month}-${day}`;
  //       }
  //     }

  //     // If already in YYYY-MM-DD format or needs conversion
  //     const d = new Date(date);
  //     return d.toISOString().split('T')[0];
  //   } catch {
  //     return '';
  //   }
  // };
  const calculateAge = (dob: string, tillDate: string): string => {
    if (!dob || !tillDate) return '';

    const birthDate = new Date(dob);
    const compareDate = new Date(tillDate);

    let years = compareDate.getFullYear() - birthDate.getFullYear();
    let months = compareDate.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return `${years} Year(s) ${months} Month(s)`;
  };

  //#endregion

  // useEffect(() => {
  //   if ((USGetSingleStudentDetails && USGetSingleStudentDetails.length > 0) || (GetStudentAdditionalDetails && Object.keys(GetStudentAdditionalDetails).length > 0)) {
  //     const studentData = USGetSingleStudentDetails[0];
  //     const AdditionalData: any = GetStudentAdditionalDetails; // Get first item from array
  //     setForm(prevForm => ({
  //       ...prevForm,
  //       firstName: studentData.First_Name || '',
  //       middleName: studentData.Middle_Name || '',
  //       lastName: studentData.Last_Name || '',
  //       motherName: studentData.Mother_Name || '',
  //       motherNumber: studentData.Mobile_Number || '',
  //       parentName: studentData.Parent_Name || '',
  //       fatherNumber: studentData.Mobile_Number2 || '',
  //       email: studentData.Email_Address || '',
  //       parentOccupation: studentData.Parent_Occupation || '',
  //       address: studentData.Address || '',
  //       city: studentData.City || '',
  //       state: studentData.State || '',
  //       pin: studentData.Pincode || '',
  //       placeOfBirth: studentData.Birth_Place || '',
  //       birthTaluka: AdditionalData.BirthTaluka || '',
  //       birthDistrict: AdditionalData.BirthDistrict || '',
  //       birthState: AdditionalData.BirthState || '',
  //       religion: studentData.Religion || '',
  //       casteAndSubCaste: studentData.CasteAndSubCaste || '',
  //       category: studentData.Category_Id || '',
  //       dateOfBirth: formatDOB(studentData.DOB) || '',
  //       nationality: studentData.Nationality || '',
  //       motherTongue: studentData.Mother_Tongue || '',
  //       gender: studentData.Sex || '',
  //       bloodGroup: studentData.Blood_Group || '',
  //       aadharCardNumber: studentData.AadharCardNo || '',
  //       nameOnAadharCard: studentData.NameOnAadharCard || '',
  //       aadharCardScanCopy: studentData?.AadharCard_Photo_Copy_Path || '',
  //       photoFilePath: studentData.Photo_File_Path || null,
  //       photoFilePathImage: studentData.Photo_file_Path_Image || null
  //     }));
  //   }
  //   console.log(form, 'form');
  // }, [USGetSingleStudentDetails]);


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

    // setForm((prevForm) => {
    //   const updatedForm = { ...prevForm, [name]: fieldValue };
    //   onTabChange(updatedForm); // Notify parent of updated data
    //   return updatedForm;
    // });
    onChange(name, fieldValue);
    // setForm((prevForm) => ({
    //   ...prevForm,
    //   [name]: fieldValue
    // }));

    //onTabChange({ firstName: fieldValue, })
    // Remove error when the user starts filling the field
    setErrors({ ...errors, [name]: false });
  };

  const handleDateChange = (name: string) => (date: Date | null) => {
    //const formattedDate = date ? moment(date).format('DD-MM-YYYY HH:mm:ss') : ''; // Use an empty string if the date is null

    onChange(name, date); // Pass the formatted date to parent

  };

  function handleContactNoChange(e) {
    const numericValue = e.target.value.replace(/\D/g, '');
    if (!isNaN(Number(numericValue)) && numericValue.length <= 10) {
      //setIContactNumber(numericValue);
      setForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: numericValue
      }));
      onChange(e.target.name, numericValue);
    }
  }

  const age = personal.dateOfBirth ? calculateAge(personal.dateOfBirth, compareAgeTillDate) : '';

  //#region WebCam/StPhoto 
  const [open, setOpen] = useState(false);
  //  const [fileNameError, setFileNameError] = useState('');
  const [isWebcamActive, setIsWebcamActive] = useState(true)
  const [capturedImage, setCapturedImage] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState('');

  //#region orgPhotos
  // Update uploadedImage state when photoFilePath is available in props
  useEffect(() => {
    if (personal?.photoFilePath && personal?.photoFilePathImage) {
      const base64Image = personal.photoFilePathImage;
      const newImageName = personal.photoFilePath.split('/').pop(); // Extract file name
      const fileExtension = personal.photoFilePath.split('.').pop(); // Extract file extension
      const imageData = `data:image/${fileExtension};base64,${personal.photoFilePathImage}`;

      setUploadedImage({
        src: imageData,                      //`data:image/jpeg;base64,${personal.photoFilePathImage}`,
        name: newImageName,                 //personal.photoFilePath.split('/').pop(), // Extract file name
        base64: base64Image, // Use the file path from API
      });
    }
  }, [personal.photoFilePath, personal.photoFilePathImage]);

  const generateImageName = (prefix) => {
    const dateTime = new Date().toISOString();
    return `${personal.firstName}_${prefix}_${dateTime}.png`;
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
    onChange('photoFilePath', newImageName);
  };

  useEffect(() => {
    console.log('uploadedImage', uploadedImage);
  }, [uploadedImage]);

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
    //setForm({ ...personal, photoFilePath: null });
    onChange('photoFilePath', '');
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
    if (personal.photoFilePath) {
      console.log('👎', personal.photoFilePath);
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
      dispatch(CDAresetDeletePhotoMsg());
    }
  }, [DeleteStudentPhotoMsg]);

  //#region photo Upload
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
    console.log('1️⃣', personal.aadharCardScanCopy);
    console.log('2️⃣', base64URL2);
    console.log('3️⃣', imageFileExtention);

    console.log('Selected file:', value.Name);            // late render

    setForm((prevForm) => ({
      ...prevForm,
      aadharCardScanCopy: value.Name,
    }));
    onChange('aadharCardScanCopy', value.Name);
    console.log('🆕1️⃣aadharCardScanCopy', personal.aadharCardScanCopy);
  };

  //let url = localStorage.getItem("SiteURL") + "/RITeSchool/DOWNLOADS/Student Documents/"
  let url = localStorage.getItem("SiteURL") + "RITeSchool/DOWNLOADS/Aadhar Cards/"
  //const url = `${localStorage.getItem("SiteURL")}RITeSchool/DOWNLOADS/Aadhar Cards/${form.aadharCardScanCopy}`;   //--remeber to set aadharCardScanCopy
  const base64Image = `data:image/${imageFileExtention};base64,${base64URL2}`;

  const viewImage = () => {
    if (form.aadharCardScanCopy) {
      const fullImageUrl = `${url}${form.aadharCardScanCopy}`;
      window.open(fullImageUrl, '_blank');
    }
  };
  // const viewImage = () => {
  //   //const base64Image = `data:image/${imageFileExtention};base64,${base64URL2}`;
  //   console.log('base64Image', base64Image);
  //   if (form.aadharCardScanCopy) {                             // -----show image using url🩸
  //     window.open(url, '_blank');
  //   }

  //   // if (base64URL2 && imageFileExtention) {       // -----show image using base64🩸
  //   //   console.log('Opening image:', base64Image);
  //   //   window.open(base64Image, '_blank');
  //   // } else {
  //   //   console.error('Base64 string or file extension is missing!');
  //   // }

  //   //window.open(base64Image, '_blank');
  // };


  //#region DataTransfer 
  // useEffect(() => {
  //   onTabChange(form); // Sends the initial form state to the parent when component mounts
  // }, [form]);
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
                value={personal.firstName}
                onChange={handleInputChange}
                error={!!validationMessages.firstName}
                helperText={validationMessages.firstName ? 'First Name should not be blank.' : ''}
                fullWidth
                inputProps={{
                  maxLength: 50, // Restricts the input length to 50 characters
                }}
              />
            </Grid>

            {personal.middleName !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="middleName"
                  label="Middle Name"
                  variant="outlined"
                  value={personal.middleName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}

            {personal.lastName !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={personal.lastName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}

            {personal.motherName !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="motherName"
                  label="Mother Name"
                  variant="outlined"
                  value={personal.motherName}
                  onChange={handleInputChange}
                  error={errors.motherName}
                  helperText={errors.motherName ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            )}

            {personal.mobileNumber1 !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="mobileNumber1"
                  label={
                    <span>
                      Mobile No. 1 <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={personal.mobileNumber1}
                  onChange={handleContactNoChange}
                  error={!!validationMessages.mobileNumber1}
                  helperText={validationMessages.mobileNumber1 ? 'Mobile Number should not be blank.' : ''}
                  fullWidth
                />
              </Grid>
            )}

            {personal.email !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="email"
                  label="E-mail"
                  variant="outlined"
                  value={personal.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  helperText={errors.email ? 'This field is required' : ''}
                  fullWidth
                />
              </Grid>
            )}

            {personal.parentName !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="parentName"
                  label={
                    <span>
                      Parent Name <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={personal.parentName}
                  onChange={handleInputChange}
                  error={!!validationMessages.parentName}
                  helperText={validationMessages.parentName ? 'Parent Name should not be blank.' : ''}
                  fullWidth
                  inputProps={{
                    maxLength: 50, // Restricts the input length to 50 characters
                  }}
                />
              </Grid>
            )}

            {personal.mobileNumber2 !== undefined && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  name="mobileNumber2"
                  label="Mobile No. 2"
                  variant="outlined"
                  value={personal.mobileNumber2}
                  onChange={handleContactNoChange}
                  fullWidth
                  error={personal.mobileNumber2.toString() !== '' && personal.mobileNumber2.toString().length < 10 ? true : false}
                  helperText={
                    personal.mobileNumber2.toString() !== '' && personal.mobileNumber2.toString().length < 10 ? 'Mobile number should be a 10 digit number.' : ''
                  }
                />
              </Grid>
            )}

            {/* Dropdown */}
            <Grid item xs={12} sm={6} md={4}>
              <SearchableDropdown
                sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
                ItemList={OccupationDropdown}
                onChange={(value) => onChange('parentOccupation', value)}
                label={'Parent Occupation'}
                mandatory
                defaultValue={personal.parentOccupation}
                size="medium"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Photo Grid */}
        <Grid item xs={12} sm={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tooltip title={<>Upload or Capture an image file for student's photo <br />(Max Height: 151px and Max Width: 112px) <br />(Image size should not exceed 1 MB. Supported file formats are JPG, JPEG)</>} placement="top">
            <Box sx={{
              backgroundColor: 'red',
              width: { xs: '80%', sm: '60%', md: '40%' }, height: '160px', border: '2px dashed #ccc', display: 'flex',
              alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexDirection: 'row'
            }}
            >
              {uploadedImage ? (
                <img
                  src={uploadedImage.src}
                  alt={uploadedImage.name || "Uploaded Image"}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              ) : (
                <User
                  style={{ objectFit: 'cover', fontSize: '4rem', color: '#ccc' }} />
              )}
            </Box>
          </Tooltip>

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
            {personal.parentOccupation == '5' && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="otherOccupation"
                  label="Other Occupation"
                  variant="outlined"
                  value={personal.parentOccupation == '5' ? personal.otherOccupation : ''}
                  onChange={handleInputChange}
                  error={!!validationMessages.parentOccupation}
                  helperText={validationMessages.parentOccupation ? 'Parent Occupation should not be blank.' : ''}
                  fullWidth
                />
              </Grid>
            )}
            {/* Address */}
            {personal.address !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="address"
                  label={
                    <span>
                      Address <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={personal.address}
                  onChange={handleInputChange}
                  error={!!validationMessages.address}
                  helperText={validationMessages.address ? 'Address should not be blank.' : ''}
                  fullWidth
                  multiline
                />
              </Grid>
            )}
            {/* City */}
            {personal.city !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="city"
                  label={
                    <span>
                      City <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={personal.city}
                  onChange={handleInputChange}
                  error={!!validationMessages.city}
                  helperText={validationMessages.city ? 'City Name should not be blank.' : ''}
                  fullWidth
                  inputProps={{
                    maxLength: 50, // Restricts the input length to 50 characters
                  }}
                />
              </Grid>
            )}
            {/* State */}
            {personal.state !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="state"
                  label={
                    <span>
                      State <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={personal.state}
                  onChange={handleInputChange}
                  error={!!validationMessages.state}
                  helperText={validationMessages.state ? 'State Name should not be blank.' : ''}
                  fullWidth
                  inputProps={{
                    maxLength: 50, // Restricts the input length to 50 characters
                  }}
                />
              </Grid>
            )}
            {/* PIN Code */}
            {personal.pin !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="pin"
                  label={
                    <span>
                      PIN Code <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={personal.pin}
                  onChange={handleInputChange}
                  error={!!validationMessages.pin}
                  helperText={validationMessages.pin ? 'PIN Code should not be blank.' : ''}
                  fullWidth
                  inputProps={{
                    maxLength: 6,
                    typeof: 'number', // Restricts the input length to 50 characters
                  }}
                />
              </Grid>
            )}
            {/* Date of Birth */}
            {personal.dateOfBirth !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Datepicker1
                  DateValue={personal.dateOfBirth}
                  onDateChange={handleDateChange('dateOfBirth')}
                  size={'medium'}
                  label={'Date of Birth'}
                  error={!!validationMessages.dateOfBirth}
                  helperText={validationMessages.dateOfBirth ? 'Date of Birth should not be blank.' : ''}
                />
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
                {compareAgeTillDate && (
                  <Typography variant="body2" sx={{ marginTop: '8px', color: 'gray' }}>
                    {age} till {new Date(compareAgeTillDate).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}
                  </Typography>
                )}
              </Grid>
            )}
            {/* Remaining Fields */}
            {personal.placeOfBirth !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="placeOfBirth"
                  label={
                    <span>
                      Place of Birth <span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  variant="outlined"
                  value={personal.placeOfBirth}
                  onChange={handleInputChange}
                  error={!!validationMessages.placeOfBirth}
                  helperText={validationMessages.placeOfBirth ? 'Place of Birth should not be blank.' : ''}
                  fullWidth
                  inputProps={{
                    maxLength: 50, // Restricts the input length to 50 characters
                  }}
                />
              </Grid>
            )}
            {personal.birthTaluka !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="birthTaluka"
                  label="Birth Taluka"
                  variant="outlined"
                  value={personal.birthTaluka}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}
            {personal.birthDistrict !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="birthDistrict"
                  label="Birth District"
                  variant="outlined"
                  value={personal.birthDistrict}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}
            {personal.birthState !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="birthState"
                  label="Birth State"
                  variant="outlined"
                  value={personal.birthState}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}
            {personal.nationality !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="nationality"
                  label="Nationality"
                  variant="outlined"
                  value={personal.nationality}
                  onChange={handleInputChange}
                  error={errors.nationality}
                  helperText={
                    errors.nationality ? 'This field is required' : ''
                  }
                  fullWidth
                />
              </Grid>
            )}
            {personal.religion !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="religion"
                  label="Religion"
                  variant="outlined"
                  value={personal.religion}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <SearchableDropdown
                sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
                ItemList={CategoryDropdown}
                onChange={(value) => onChange('category', value)}
                label={'Category'}
                defaultValue={personal.category}
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
                value={personal.casteAndSubCaste}
                onChange={handleInputChange}
                error={!!validationMessages.casteAndSubCaste}
                helperText={validationMessages.casteAndSubCaste ? 'Caste and Sub-Caste should not be blank.' : ''}
                fullWidth
                inputProps={{
                  maxLength: 50, // Restricts the input length to 50 characters
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="motherTongue"
                label="MotherTongue"
                variant="outlined"
                value={personal.motherTongue}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  maxLength: 50, // Restricts the input length to 50 characters
                }}
              />
            </Grid>

            {/* Other Fields */}
            {personal.gender !== undefined && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <TextField
                  name="gender"
                  label="Gender"
                  variant="outlined"
                  value={personal.gender}
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
                onChange={(value) => onChange('bloodGroup', value)}
                label={'Blood Group'}
                defaultValue={personal.bloodGroup}
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="aadharCardNumber"
                label="Aadhar Card Number"
                variant="outlined"
                value={personal.aadharCardNumber}
                onChange={handleInputChange}
                fullWidth
                inputProps={{
                  maxLength: 12, // Restricts the input length to 12 characters
                  typeof: 'number',
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                name="nameOnAadharCard"
                label="Name on Adhar Card"
                variant="outlined"
                value={personal.nameOnAadharCard}
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
                FileName={personal.aadharCardScanCopy}
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
              <Grid container spacing={2} >
                <Grid item xs={6} sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: 2, borderColor: 'gray.300', maxWidth: '100%', maxHeight: '100%', overflow: 'hidden', }}
                >
                  {isWebcamActive ? (
                    <>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        height={310}
                        width={1280}
                        //className="w-full h-full object-contain"
                        style={{
                          //maxWidth: '100%',
                          // maxHeight: '100%',
                          position: 'relative',
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
                <Grid item xs={6} sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2, border: 2, maxWidth: '100%', maxHeight: '100%', overflow: 'auto', }}>
                  {capturedImage && (
                    <img
                      src={capturedImage}
                      alt="Captured"
                      style={{ minWidth: '100%', minHeight: '100%', borderRadius: '4%', objectFit: 'contain' }}
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
