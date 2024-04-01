import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Container, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Styles } from 'src/assets/style/student-style';
import { IDeleteAadharCardPhotoCopyBody, IGetUserDetailsForAadharCardNoBody, IUpdateTeacherAadharDetailsBody } from 'src/interfaces/NewAadharcardTeachers/IAadharcardTeacher';
import Errormessage from 'src/libraries/ErrorMessages/Errormessage';
import { CDADeleteAadharCardPhotoCopy, CDAGetUserDetailsForAadharCardNo, CDAUpdateTeacherAadharDetails, resetMessage, resetdelete } from 'src/requests/NewAadharcard/RAadharcardTecaher';
import { RootState } from 'src/store';
import { CheckFileValidationAdhar } from '../Common/Util';
const AadharCard = () => {
  const dispatch = useDispatch();
  const classes = Styles();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asFolderName = localStorage.getItem('FolderName');

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

  const validFiles = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
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

  const ResetForm = () => {
    setSelectedFile('');
  };
  const SaveFile = () => {
    const isAadharValid = validateAadharCardNumber(AadharCardNumber);
    if (!isAadharValid) {
      alert('Please enter a valid Aadhar card number.');
      return;
    }

    dispatch(CDAUpdateTeacherAadharDetails(UpdateTeacherAadharDetailsBody));
    ResetForm();

  };
  useEffect(() => {
    if (GetUserDetailsForAadharCardNoUS != null) {
      setAadharCardNumber(GetUserDetailsForAadharCardNoUS.AadharCardNo)
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

  return (
    <>
      <Container maxWidth={'xl'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            pt: 4
          }}
        >
          <Box>
            <Breadcrumbs
              aria-label="breadcrumb"
              separator={<ChevronRightTwoTone />}
            >
              <Link
                to={'/extended-sidebar/landing/landing'}
                color="inherit"
                style={{ textDecoration: 'none' }}
              >
                <IconButton
                  sx={{
                    background: (theme) => theme.palette.common.white,
                    border: (theme) => `1px solid ${theme.palette.grey[400]}`
                  }}
                >
                  <HomeTwoTone color="primary" />
                </IconButton>
              </Link>
              <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
                Add Aadhar Card Details
              </Typography>
            </Breadcrumbs>
          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={1}>

            <Box>
              <Tooltip title={`Add Aadhar Card Details.`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: grey[600] }
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

                    color: 'white',
                    backgroundColor: green[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] }
                  }}
                >
                  <Save />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>
        <Box sx={{ p: 2, background: 'white', mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={"Name"}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#e3f2fd' }}
                value={GetUserDetailsForAadharCardNoUS?.TeacherFullName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={
                  <span>
                    Aadhar Card Number <span style={{ color: 'red' }}>*</span>
                  </span>
                }
                value={AadharCardNumber}
                onChange={(e) => { changeAdhar(e.target.value) }}
                error={error}
                helperText={error ? "Please enter only 12 digits " : ""}
              />

            </Grid>
            <Grid item xs={12}>

            </Grid>
          </Grid>

        </Box>

        <Box sx={{ my: '10px', textAlign: 'center' }}>
          {GetUserDetailsForAadharCardNoUS != null && GetUserDetailsForAadharCardNoUS.AadharCard_Photo_Copy_Path === '/RITeSchool/DOWNLOADS/Aadhar Cards/' ? (
            <img
              style={{ height: '150px', width: '150px' }}
              src={'/imges/Adhar.png'}
              alt={'adhar'}
            />
          ) : (
            <>
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  width="150"
                  height="150"
                  style={{ border: '1px solid gray', padding: '1px' }}
                />
              ) : (
                <img
                  src={
                    localStorage.getItem('SiteURL') +
                    '/RITeSchool/DOWNLOADS/Aadhar Card/' +
                    GetUserDetailsForAadharCardNoUS?.AadharCard_Photo_Copy_Path
                  }
                  width="150"
                  height="150"
                  style={{ border: '1px solid gray', padding: '1px' }}
                />
              )}
            </>
          )}
        </Box>


        <Box sx={{ textAlign: 'center', position: 'relative' }}>
          <input
            ref={aRef}
            type="file"
            onChange={changeFile}
            style={{ width: '250px', zIndex: 1 }} // Ensure the input is behind the tooltip
            onMouseEnter={() => { document.getElementById("tooltip").style.visibility = "visible"; }}
            onMouseLeave={() => { document.getElementById("tooltip").style.visibility = "hidden"; }}
          />
          <div id="tooltip" style={{ visibility: "hidden", position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#483d8b', color: 'white', padding: '5px', borderRadius: '5px', zIndex: 1 }}>
            (Supports only .PDF, .JPG, .PNG, .BMP, .JPEG file type. File size should not exceed 3MB.)
          </div>
        </Box>




        {fileError && <Errormessage Error={fileError} />}
      </Container >

    </>
  );
};

export default AadharCard;
