import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Button, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Styles } from 'src/assets/style/student-style';
import { IDeleteAadharCardPhotoCopyBody, IGetUserDetailsForAadharCardNoBody, IUpdateTeacherAadharDetailsBody } from 'src/interfaces/NewAadharcardTeachers/IAadharcardTeacher';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import { CDADeleteAadharCardPhotoCopy, CDAGetUserDetailsForAadharCardNo, CDAUpdateTeacherAadharDetails, resetMessage, resetdelete } from 'src/requests/NewAadharcard/RAadharcardTecaher';
import { RootState } from 'src/store';
import { CheckFileValidationAdhar } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
const AadharCard = () => {
  const dispatch = useDispatch();
  const classes = Styles();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asFolderName = localStorage.getItem('FolderName');
  const [ErrorNamePerAadharCard, setErrorNamePerAadharcard] = useState('');
  const [ErrorNumberAadharCard, setErrorNumberAadharcard] = useState('');
  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;
  const [Name, setName] = useState('');
  const [AadharCardNumber, setAadharCardNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [aadharName, setAadharName] = useState('');
  const [mother, setMother] = useState('');
  const [base64URL, setBase64URL] = useState('');
  const [error, setError] = useState(false);
  const [errorname, setErrorname] = useState(false);
  const [fileError, setFileError] = useState('');
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const aRef = useRef(null);
  const [NamePerAadharCard, setNamePerAadharcard] = useState('')
  const validFiles = ['PDF', 'JPG', 'JPEG', 'PNG', 'BMP'];
  const maxfileSize = 3000000;

  const UpdateTeacherAadharDetailsUS: any = useSelector((state: RootState) => state.AadharcardTecaherSlice.ISUpdateTeacherAadharDetails);
  const DeleteAadharCardPhotoCopyUS: any = useSelector((state: RootState) => state.AadharcardTecaherSlice.ISDeleteAadharCardPhotoCopy);
  const GetUserDetailsForAadharCardNoUS: any = useSelector((state: RootState) => state.AadharcardTecaherSlice.ISGetUserDetailsForAadharCardNo);
  console.log(GetUserDetailsForAadharCardNoUS, "GetUserDetailsForAadharCardNoUS");

  const UpdateTeacherAadharDetailsBody: IUpdateTeacherAadharDetailsBody = {
    asUserId: Number(UserId),
    asSchoolId: Number(asSchoolId),
    asAadharCardNo: AadharCardNumber,
    asAadharCardPhotoCopyPath: fileName,
    asUpdatedById: TeacherId.toString(),
    asSaveFeature: "Aadhar Cards",
    asFolderName: "PPSN Website",
    asBase64String: base64URL
  };

  // const ResetForm = () => {
  //   setSelectedFile('');
  // };
  // const SaveFile = () => {
  //   let isError = false;
  //   const isAadharValid = validateAadharCardNumber(AadharCardNumber);
  //   if (!isAadharValid) {
  //     alert('Please enter a valid Aadhar card number.');
  //     return;
  //   }
  //   if (NamePerAadharCard == '') {
  //     setErrorNamePerAadharcard(' Please enter name present on Aadhar Card.');
  //     isError = true;
  // } else setErrorNamePerAadharcard('')

  //   dispatch(CDAUpdateTeacherAadharDetails(UpdateTeacherAadharDetailsBody));
  //   ResetForm();

  // };
  const SaveFile = () => {
    let isError = false;
    const isAadharValid = validateAadharCardNumber(AadharCardNumber);
    // if (!isAadharValid) {
    //   alert('Please enter a valid Aadhar card number.');
    //   isError = true;
    // }
    if (AadharCardNumber.trim() === '') {
      setErrorNumberAadharcard('Please enter Aadhar Card Number.');
      isError = true;
    } else {
      setErrorNumberAadharcard('');
    }
    if (NamePerAadharCard.trim() === '') {
      setErrorNamePerAadharcard('Please enter name present on Aadhar Card.');
      isError = true;
    } else {
      setErrorNamePerAadharcard('');
    }
    // if (!selectedFile) {
    //   setFileError('Please select a file.');
    //   isError = true;
    // } else {
    //   setFileError(''); // Clear any previous file error
    // }
    if (isError) {
      return; // Exit function if there are validation errors
    }

    // If no errors, proceed with API call
    dispatch(CDAUpdateTeacherAadharDetails(UpdateTeacherAadharDetailsBody));
    ResetForm(); // Example function to reset form fields
  };
  const ResetForm = () => {
    // Example function to reset form fields
    setAadharCardNumber('');
    setNamePerAadharcard('');
    setSelectedFile(null);
    setFileName('');
    setFileError('');
  };
  useEffect(() => {
    if (GetUserDetailsForAadharCardNoUS != null) {
     // setAadharCardNumber(GetUserDetailsForAadharCardNoUS.AadharCardNo)
      setAadharCardNumber('')
    }
  }, [GetUserDetailsForAadharCardNoUS])

  useEffect(() => {
    if (UpdateTeacherAadharDetailsUS !== '') {
      toast.success(UpdateTeacherAadharDetailsUS, { toastId: 'success1' });
      dispatch(resetMessage());
      dispatch(CDAGetUserDetailsForAadharCardNo(GetUserDetailsForAadharCardNoBody));
    }
  }, [UpdateTeacherAadharDetailsUS]);

  useEffect(() => {
    if (DeleteAadharCardPhotoCopyUS != "") {
      toast.success(DeleteAadharCardPhotoCopyUS)
      dispatch(resetdelete());
    }
  }, [DeleteAadharCardPhotoCopyUS])
  const validateAadharCardNumber = (aadharNumber) => {
    const re = /^\d{12}$/;
    return re.test(aadharNumber);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogImageUrl, setDialogImageUrl] = useState('');

  const handleImageClick = () => {
    setOpenDialog(true);
    setDialogImageUrl(URL.createObjectURL(selectedFile));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const DeleteAadhar = () => {
    if (confirm('Are you sure you want to delete uploaded image?')) {
      const DeleteAadharCardPhotoCopyBody: IDeleteAadharCardPhotoCopyBody = {
        asUserId: Number(UserId),
        asSchoolId: Number(asSchoolId),
        asUpdatedById: Number(UserId)
      }
      dispatch(CDADeleteAadharCardPhotoCopy(DeleteAadharCardPhotoCopyBody));
      dispatch(CDAGetUserDetailsForAadharCardNo(GetUserDetailsForAadharCardNoBody));

    }
  }

  const GetUserDetailsForAadharCardNoBody: IGetUserDetailsForAadharCardNoBody = {
    asUserId: Number(UserId),
    asSchoolId: Number(asSchoolId)
  }

  useEffect(() => {
    dispatch(CDAGetUserDetailsForAadharCardNo(GetUserDetailsForAadharCardNoBody));
  }, []);



  const changeAdhar = (value) => {
    const re = /^\d{0,12}$/;
    if (re.test(value)) {
      setAadharCardNumber(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  // useEffect(() => {
  //   const storedFile = JSON.parse(localStorage.getItem('selectedFile'));
  //   if (storedFile) {
  //     setSelectedFile(new File([storedFile], storedFile.name));
  //     setFileName(storedFile.name);
  //   }
  // }, []);
  const changeFile = async (e) => {
    const multipleFiles = e.target.files;
    let base64URL: any = '';
    let DataAttachment: any = '';
    let fileName: any = '';
    for (let i = 0; i < multipleFiles.length; i++) {
      const isValid = CheckFileValidationAdhar(
        multipleFiles[i],
        validFiles,
        maxfileSize
      );
      if (isValid == null) {
        setFileName(multipleFiles[i].name);
        setSelectedFile(e.target.files[i]);
        base64URL = await ChangeFileIntoBase64(multipleFiles[i]);
        setBase64URL(base64URL.slice(base64URL.indexOf(',') + 1));
        setFileError('');
        //localStorage.setItem('selectedFile', JSON.stringify(multipleFiles[i]));
      } else {
        setFileError(isValid);
        aRef.current.value = null;
      }
    }
  };
  const ChangeFileIntoBase64 = (fileData) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(fileData);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  //   return (
  //     <>
  //       <Box sx={{ px: 2 }}>
  //         <CommonPageHeader
  //           navLinks={[
  //             {
  //               title: 'Add Aadhar Card Details',
  //               path: ''
  //             }
  //           ]}
  //           rightActions={
  //             <>
  //               <Box>
  //                 <Tooltip title={`Add aadhar card details.`}>
  //                   <IconButton
  //                     sx={{
  //                       color: 'white', backgroundColor: grey[500], height: '36px !important',
  //                       ':hover': { backgroundColor: grey[600] }
  //                     }}
  //                   >
  //                     <QuestionMark />
  //                   </IconButton>
  //                 </Tooltip>
  //               </Box>
  //               <Box>
  //                 <Tooltip title={`Save`}>
  //                   <IconButton
  //                     onClick={() => SaveFile()}
  //                     sx={{
  //                       backgroundColor: green[500], color: 'white', height: '36px !important',
  //                       ':hover': { backgroundColor: green[600] }
  //                     }}
  //                   >
  //                     <Save />
  //                   </IconButton>
  //                 </Tooltip>
  //               </Box>
  //             </>
  //           }
  //         />
  //         <Box sx={{ p: 2, background: 'white' }}>
  //           <Grid container spacing={2}>
  //             <Grid item xs={8}>
  //               <Grid container spacing={2}>
  //                 <Grid item xs={12}>
  //                   <TextField
  //                     fullWidth
  //                     label="Name"
  //                     InputLabelProps={{ shrink: true }}
  //                     // sx={{  width:'80%', height: '60px'}}
  //                     sx={{
  //                       width: '80%',
  //                       '& .MuiInputBase-input': {
  //                         height: '50px', // Adjust height of the input field

  //                         padding: '10px', // Add padding as needed
  //                         bgcolor: '#D3D3D3', // Background color of the input field
  //                         borderRadius: '4px', // Optional: add border radius
  //                       },
  //                     }}
  //                     value={GetUserDetailsForAadharCardNoUS?.TeacherFullName}
  //                     InputProps={{
  //                       readOnly: true,
  //                     }}
  //                   />
  //                 </Grid>
  //                 <Grid item xs={12}>
  //                   <TextField
  //                     fullWidth
  //                     value={AadharCardNumber}
  //                     error={error}
  //                     label={
  //                       <span>
  //                         Aadhar Card Number <span style={{ color: 'red' }}>*</span>
  //                       </span>
  //                     }
  //                     onChange={(e) => changeAdhar(e.target.value)}
  //                     helperText={error ? 'Please enter only 12 digits ' : ''}
  //                     // sx={{ width: '80%' }}
  //                     sx={{
  //                       width: '80%',
  //                       '& .MuiInputBase-input': {
  //                         height: '50px', // Adjust height of the input field

  //                         padding: '10px', // Add padding as needed
  //                         bgcolor: '', // Background color of the input field
  //                         borderRadius: '4px', // Optional: add border radius
  //                       },
  //                     }}
  //                   />
  //                 </Grid>

  //                 <Grid item xs={12}>
  //                   <TextField
  //                     label={
  //                       <span>
  //                         Name As Per Aadhar Card <span style={{ color: 'red' }}>*</span>
  //                       </span>
  //                     }

  //                     rows={3}
  //                     value={NamePerAadharCard}
  //                     onChange={(e) => setNamePerAadharcard(e.target.value)}
  //                     fullWidth
  //                     error={ErrorNamePerAadharCard !== ''}
  //                     helperText={ErrorNamePerAadharCard}
  //                     // sx={{
  //                     //   width: '80%'
  //                     // }}
  //                     sx={{
  //                       width: '80%',
  //                       '& .MuiInputBase-input': {
  //                         height: '50px', // Adjust height of the input field

  //                         padding: '10px', // Add padding as needed
  //                         bgcolor: '', // Background color of the input field
  //                         borderRadius: '4px', // Optional: add border radius
  //                       },
  //                     }}
  //                   />
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //             <Grid item xs={4}>
  //               <Box sx={{ my: '10px', textAlign: 'center', marginBottom: '10px' }}>
  //                 {GetUserDetailsForAadharCardNoUS != null &&
  //                   GetUserDetailsForAadharCardNoUS.AadharCard_Photo_Copy_Path ===
  //                   '/RITeSchool/DOWNLOADS/Aadhar Cards/' ? (
  //                   <img
  //                     src="/imges/Adhar.png"
  //                     alt="adhar"
  //                     style={{ height: '150px', width: '150px', marginBottom: '10px' }}
  //                   />
  //                 ) : (
  //                   <>
  //                     {selectedFile ? (
  //                       <img
  //                         width="150"
  //                         height="150"
  //                         src={URL.createObjectURL(selectedFile)}
  //                         style={{ border: '1px solid gray', padding: '1px', marginBottom: '10px' }}
  //                       />
  //                     ) : (
  //                       <img
  //                         width="180"
  //                         height="180"
  //                         src={
  //                           localStorage.getItem('SiteURL') +
  //                           '/RITeSchool/DOWNLOADS/Aadhar Card/' +
  //                           GetUserDetailsForAadharCardNoUS?.AadharCard_Photo_Copy_Path
  //                         }
  //                         style={{ border: '1px solid gray', padding: '1px', marginBottom: '10px' }}
  //                       />
  //                     )}
  //                   </>
  //                 )}
  //               </Box>
  //               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
  //                 <Tooltip title="Supports only .PDF, .JPG, .PNG, .BMP, .JPEG file type. File size should not exceed 3MB.">
  //                   <Button
  //                     sx={{
  //                       width: '300px',
  //                       gap: 1,
  //                       position: 'relative',
  //                       border: (theme) =>
  //                         `1px dashed ${theme.palette.primary.main}`,
  //                       display: 'flex',
  //                       alignItems: 'center',
  //                       justifyContent: 'space-between',
  //                     }}
  //                     color="primary"
  //                   >
  //                     <Stack
  //                       direction="row"
  //                       alignItems="center"
  //                       gap={1}
  //                       sx={{
  //                         overflow: 'hidden',
  //                         textOverflow: 'ellipsis',
  //                         whiteSpace: 'nowrap',
  //                       }}
  //                     >
  //                       <CloudUploadIcon />
  //                       {fileName === '' ? ' No file selected' : fileName}
  //                       <input
  //                         ref={aRef}
  //                         type="file"
  //                         onChange={changeFile}
  //                         style={{
  //                           opacity: 0,
  //                           top: 0,
  //                           left: 0,
  //                           right: 0,
  //                           bottom: 0,
  //                           position: 'absolute',
  //                           cursor: 'pointer',
  //                         }}
  //                       />
  //                     </Stack>
  //                   </Button>
  //                 </Tooltip>
  //               </Box>
  //               {fileError && (
  //                 <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
  //                   <Errormessage Error={fileError} />
  //                 </Box>
  //               )}
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       </Box>
  //     </>
  //   );
  // };

  // export default AadharCard;
  //   return (
  //     <>
  //       <Box sx={{ px: 2 }}>
  //         <CommonPageHeader
  //           navLinks={[
  //             {
  //               title: 'Add Aadhar Card Details',
  //               path: '',
  //             },
  //           ]}
  //           rightActions={
  //             <>
  //               <Box>
  //                 <Tooltip title={`Add Aadhar card details.`}>
  //                   <IconButton
  //                     sx={{
  //                       color: 'white',
  //                       backgroundColor: grey[500],
  //                       height: '36px !important',
  //                       ':hover': { backgroundColor: grey[600] },
  //                     }}
  //                   >
  //                     <QuestionMark />
  //                   </IconButton>
  //                 </Tooltip>
  //               </Box>
  //               <Box>
  //                 <Tooltip title={`Save`}>
  //                   <IconButton
  //                     onClick={() => SaveFile()}
  //                     sx={{
  //                       backgroundColor: green[500],
  //                       color: 'white',
  //                       height: '36px !important',
  //                       ':hover': { backgroundColor: green[600] },
  //                     }}
  //                   >
  //                     <Save />
  //                   </IconButton>
  //                 </Tooltip>
  //               </Box>
  //             </>
  //           }
  //         />
  //         <Box sx={{ p: 2, background: 'white' }}>
  //           <Grid container spacing={2}>
  //             <Grid item xs={12} md={8}>
  //               <Grid container spacing={2}>
  //                 <Grid item xs={12}>
  //                   <TextField
  //                     fullWidth
  //                     label="Name"
  //                     InputLabelProps={{ shrink: true }}
  //                     sx={{
  //                       width: '80%',
  //                       '& .MuiInputBase-input': {
  //                         height: '50px',
  //                         padding: '10px',
  //                         bgcolor: '#D3D3D3',
  //                         borderRadius: '4px',
  //                       },
  //                     }}
  //                     value={GetUserDetailsForAadharCardNoUS?.TeacherFullName}
  //                     InputProps={{
  //                       readOnly: true,
  //                     }}
  //                   />
  //                 </Grid>
  //                 <Grid item xs={12}>
  //                   <TextField
  //                     fullWidth
  //                     value={AadharCardNumber}
  //                     error={error}
  //                     label={
  //                       <span>
  //                         Aadhar Card Number <span style={{ color: 'red' }}>*</span>
  //                       </span>
  //                     }
  //                     onChange={(e) => changeAdhar(e.target.value)}
  //                     helperText={error ? 'Please enter only 12 digits ' : ''}
  //                     sx={{
  //                       width: '80%',
  //                       '& .MuiInputBase-input': {
  //                         height: '50px',
  //                         padding: '10px',
  //                         bgcolor: '',
  //                         borderRadius: '4px',
  //                       },
  //                     }}
  //                   />
  //                 </Grid>
  //                 <Grid item xs={12}>
  //                   <TextField
  //                     label={
  //                       <span>
  //                         Name As Per Aadhar Card <span style={{ color: 'red' }}>*</span>
  //                       </span>
  //                     }
  //                     value={NamePerAadharCard}
  //                     onChange={(e) => setNamePerAadharcard(e.target.value)}
  //                     fullWidth
  //                     error={ErrorNamePerAadharCard !== ''}
  //                     helperText={ErrorNamePerAadharCard}
  //                     sx={{
  //                       width: '80%',
  //                       '& .MuiInputBase-input': {
  //                         height: '50px',
  //                         padding: '10px',
  //                         bgcolor: '',
  //                         borderRadius: '4px',
  //                       },
  //                     }}
  //                   />
  //                 </Grid>
  //               </Grid>
  //             </Grid>
  //             <Grid item xs={12} md={4}>
  //               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  //                 <div style={{ width: '180px', height: '180px', marginBottom: '10px', position: 'relative', border: '1px solid gray', overflow: 'hidden' }}>
  //                   {GetUserDetailsForAadharCardNoUS != null &&
  //                     GetUserDetailsForAadharCardNoUS.AadharCard_Photo_Copy_Path ===
  //                     '/RITeSchool/DOWNLOADS/Aadhar Cards/' ? (
  //                     <img
  //                       src="/imges/Adhar.png"
  //                       alt="adhar"
  //                       style={{ height: '150px', width: '150px', marginBottom: '10px' }}
  //                     />
  //                   ) : (
  //                     <div style={{ width: '180px', height: '180px', marginBottom: '10px', position: 'relative' }}>
  //                       <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, overflow: 'hidden' }}>
  //                         {selectedFile ? (
  //                           <img
  //                             src={URL.createObjectURL(selectedFile)}
  //                             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  //                             onClick={handleImageClick}
  //                           />
  //                         ) : (
  //                           <img
  //                             src={
  //                               localStorage.getItem('SiteURL') +
  //                               '/RITeSchool/DOWNLOADS/Aadhar Card/' +
  //                               GetUserDetailsForAadharCardNoUS?.AadharCard_Photo_Copy_Path
  //                             }
  //                             style={{ width: '100%', height: '100%', objectFit: 'cover' }}

  //                           />
  //                         )}
  //                       </div>
  //                     </div>

  //                   )}
  //                 </div>
  //                 <Dialog open={openDialog} onClose={handleCloseDialog}>
  //                   <img src={dialogImageUrl} style={{ width: '100%', height: 'auto' }} />
  //                 </Dialog>
  //                 <Tooltip title="Supports only .PDF, .JPG, .PNG, .BMP, .JPEG file type. File size should not exceed 3MB.">
  //                   <Button
  //                     sx={{
  //                       width: '250px',
  //                       gap: 1,
  //                       position: 'relative',
  //                       border: (theme) => `1px dashed ${theme.palette.primary.main}`,
  //                       display: 'flex',
  //                       alignItems: 'center',
  //                       justifyContent: 'center',
  //                       marginTop: '10px',
  //                     }}
  //                     color="primary"
  //                   >
  //                     <Stack
  //                       direction="row"
  //                       alignItems="center"
  //                       gap={1}
  //                       sx={{
  //                         overflow: 'hidden',
  //                         textOverflow: 'ellipsis',
  //                         whiteSpace: 'nowrap',
  //                       }}
  //                     >
  //                       <CloudUploadIcon />
  //                       {fileName === '' ? ' No file selected' : fileName}
  //                       <input
  //                         ref={aRef}
  //                         type="file"
  //                         onChange={changeFile}
  //                         style={{
  //                           opacity: 0,
  //                           top: 0,
  //                           left: 0,
  //                           right: 0,
  //                           bottom: 0,
  //                           position: 'absolute',
  //                           cursor: 'pointer',
  //                         }}
  //                       />
  //                     </Stack>
  //                   </Button>
  //                 </Tooltip>
  //                 {fileError && (
  //                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
  //                     <Errormessage Error={fileError} />
  //                   </Box>
  //                 )}
  //               </Box>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       </Box>
  //     </>
  //   );
  // };

  // export default AadharCard;
  /////new
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Add Aadhar Card Details',
            path: '',
          },
        ]}
        rightActions={
          <>
            <Box>
              <Tooltip title={`Add Aadhar card details.`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] },
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title={`Save`}>
                <IconButton
                  onClick={SaveFile}
                  sx={{
                    backgroundColor: green[500],
                    color: 'white',
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] },
                  }}
                >
                  <Save />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        }
      />
      <Box sx={{ p: 2, background: 'white' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    width: '50%',
                    '& .MuiInputBase-input': {
                      height: '50px',
                      padding: '10px',
                      bgcolor: '#D3D3D3',
                      borderRadius: '4px',
                      minWidth: '20vw'
                    },
                  }}
                  value={GetUserDetailsForAadharCardNoUS?.TeacherFullName} // Replace with actual value
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={AadharCardNumber}
                  //error={Boolean(ErrorNamePerAadharCard)}
                  label={
                    <span>
                      Aadhar Card Number <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  onChange={(e) => changeAdhar(e.target.value)}
                  //helperText={ErrorNamePerAadharCard}
                  sx={{
                    width: '50%',
                    '& .MuiInputBase-input': {
                      height: '50px',
                      padding: '10px',
                      bgcolor: '',
                      borderRadius: '4px',
                      minWidth: '20vw'
                    },
                  }}
                />
                {ErrorNumberAadharCard && <ErrorMessage1 Error={ErrorNumberAadharCard} />}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={
                    <span>
                      Name As Per Aadhar Card <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={NamePerAadharCard}
                  onChange={(e) => setNamePerAadharcard(e.target.value)}
                  fullWidth
                  // error={Boolean(ErrorNamePerAadharCard)}
                  //  helperText={ErrorNamePerAadharCard}
                  sx={{
                    width: '50%',
                    '& .MuiInputBase-input': {
                      height: '50px',
                      padding: '10px',
                      bgcolor: '',
                      borderRadius: '4px',
                      minWidth: '20vw'
                    },
                  }}
                />
                {ErrorNamePerAadharCard && <ErrorMessage1 Error={ErrorNamePerAadharCard} />}
                <Tooltip title="Supports only .PDF, .JPG, .PNG, .BMP, .JPEG file type. File size should not exceed 3MB.">
                  <Button
                    sx={{
                      width: '50%', height: '65px',
                      gap: 1,
                      position: 'relative',
                      border: (theme) => `1px dashed ${theme.palette.primary.main}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '20px',
                      minWidth: '20vw'
                    }}
                    color="primary"
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <CloudUploadIcon />
                      {fileName === '' ? ' No file selected' : fileName}
                      <input
                        type="file"
                        onChange={changeFile}
                        style={{
                          opacity: 0,
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          position: 'absolute',
                          cursor: 'pointer',
                          minWidth: '20vw'
                        }}
                      />
                    </Stack>

                  </Button>
                </Tooltip>
                {fileError && (
                  <Box sx={{ display: 'flex', alignItems: '', justifyContent: '', mt: 2 }}>
                    {/* <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '-20px' }}> */}
                    {/* <Typography color="error">{fileError}</Typography> */}
                    {fileError && <ErrorMessage1 Error={fileError} />}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Aadhar Card"
                  style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                />
              ) : (
                <div
                  style={{
                    width: '504px',
                    height: '330px',
                    // width: '323px',  // 3.37 inches * 100 (assuming 100 pixels per inch)
                    // height: '204px', // 2.13 inches * 100
                    border: '1px dashed grey',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    maxWidth: '30vw'
                  }}
                >
                  <Typography color="textSecondary">No file selected</Typography>
                </div>
              )}


            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AadharCard;
