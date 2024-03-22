
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Container, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDeleteAadharCardPhotoCopyBody, IGetUserDetailsForAadharCardNoBody, IUpdateTeacherAadharDetailsBody } from 'src/interfaces/NewAadharcardTeachers/IAadharcardTeacher';
import SingleFile from 'src/libraries/File/SingleFile';
import { CDADeleteAadharCardPhotoCopy, CDAGetUserDetailsForAadharCardNo, CDAUpdateTeacherAadharDetails, resetMessage, resetdelete } from 'src/requests/NewAadharcard/RAadharcardTecaher';
import { RootState } from 'src/store';

const AadharCard = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asFolderName = localStorage.getItem('FolderName');

  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;
  const [Name, setName] = useState('');
  const [AadharCardNumber, setAadharCardNumber] = useState('');
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false)
  const [File, setFile] = useState('');
  const [FileError, setFileError] = useState('');

  const UpdateTeacherAadharDetailsUS: any = useSelector(
    (state: RootState) => state.AadharcardTecaherSlice.ISUpdateTeacherAadharDetails
  );

  console.log(UpdateTeacherAadharDetailsUS,);

  const DeleteAadharCardPhotoCopyUS: any = useSelector(
    (state: RootState) => state.AadharcardTecaherSlice.ISDeleteAadharCardPhotoCopy
  );

  console.log(DeleteAadharCardPhotoCopyUS, "DeleteAadharCardPhotoCopyUS");

  const GetUserDetailsForAadharCardNoUS: any = useSelector((state: RootState) => state.AadharcardTecaherSlice.ISGetUserDetailsForAadharCardNo);

  console.log(GetUserDetailsForAadharCardNoUS, "GetUserDetailsForAadharCardNoUS");


  const SaveFile = () => {

    const isAadharValid = validateAadharCardNumber(AadharCardNumber);

    if (!isAadharValid) {
      alert('Please enter a valid Aadhar card number.');
      return;
    }

    const UpdateTeacherAadharDetailsBody: IUpdateTeacherAadharDetailsBody = {
      asUserId: Number(UserId),
      asSchoolId: Number(asSchoolId),
      asAadharCardNo: AadharCardNumber,
      asAadharCardPhotoCopyPath: File,
      asUpdatedById: TeacherId.toString(),
      asSaveFeature: "Aadhar Cards",
      asFolderName: "PPSN Website",
      asBase64String: base64URL
    };

    dispatch(CDAUpdateTeacherAadharDetails(UpdateTeacherAadharDetailsBody));
    dispatch(CDAGetUserDetailsForAadharCardNo(GetUserDetailsForAadharCardNoBody));

  };
  useEffect(() => {
    if (UpdateTeacherAadharDetailsUS !== '') {
      toast.success(UpdateTeacherAadharDetailsUS, { toastId: 'success1' });
      dispatch(resetMessage());

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
    }
  }

  const GetUserDetailsForAadharCardNoBody: IGetUserDetailsForAadharCardNoBody = {
    asUserId: Number(UserId),
    asSchoolId: Number(asSchoolId)
  }

  useEffect(() => {
    dispatch(CDAGetUserDetailsForAadharCardNo(GetUserDetailsForAadharCardNoBody));
  }, []);

  const ChangeFile = (value) => {
    setFile(value.Name);
    setbase64URL(value.Value);
  };

  const changeAdhar = (value) => {
    const re = /^\d{12}$/;
    if (re.test(value)) {
      setAadharCardNumber(value);
      setError(false);
      setError1(false);
    } else {
      setAadharCardNumber(value);
      if (value.length === 0) {
        setError(false);
      } else {
        setError(true);
      }
      setError1(value.length > 12);
    }
  };


  const clickFileName = () => {
    window.open(
      localStorage.getItem('SiteURL') +
      '/RITeSchool/' +
      '/DOWNLOADS/Aadhar Card/' +
      GetUserDetailsForAadharCardNoUS.AadharCard_Photo_Copy_Path);
  }
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
              <Tooltip title={`Add Aadhar Card Details.`}>
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
          <Typography style={{ color: 'red', display:'flex', justifyContent:'flex-end' }}> *</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={"Name"}
                InputLabelProps={{ shrink: true }}
                value={GetUserDetailsForAadharCardNoUS?.TeacherFullName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={"Aadhar Card Number"}
                value={AadharCardNumber}
                onChange={(e) => { changeAdhar(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SingleFile
                  FileName={File}
                  MaxfileSize={MaxfileSize}
                  ChangeFile={ChangeFile}
                  errorMessage={FileError}
                  FilePath={GetUserDetailsForAadharCardNoUS == null ? "" : GetUserDetailsForAadharCardNoUS.AadharCard_Photo_Copy_Path}
                  viewIcon={true}
                  deleteIcon={true}
                  clickDelete={DeleteAadhar}
                  isMandatory={false}
                  FileLabel='Upload Scanned Copy of Aadhar Card'
                  ValidFileTypes={ValidFileTypes}
                  width='400px'
                  clickFileName={clickFileName}
                />
              </Box>
            </Grid>
          </Grid>

        </Box>

      </Container >

    </>
  );
};

export default AadharCard;
