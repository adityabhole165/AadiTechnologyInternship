
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Container, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IDeleteAadharCardPhotoCopyBody, IGetUserDetailsForAadharCardNoBody, IUpdateTeacherAadharDetailsBody } from 'src/interfaces/NewAadharcardTeachers/IAadharcardTeacher';
import SingleFile from 'src/libraries/File/SingleFile';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { CDADeleteAadharCardPhotoCopy, CDAGetUserDetailsForAadharCardNo, CDAUpdateTeacherAadharDetails } from 'src/requests/NewAadharcard/RAadharcardTecaher';
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
  const [File, setFile] = useState('');
  const [FileError, setFileError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };
  const UpdateTeacherAadharDetailsUS: any = useSelector(
    (state: RootState) => state.AadharcardTecaherSlice.ISUpdateTeacherAadharDetails
  );

  console.log(UpdateTeacherAadharDetailsUS,);

  const DeleteAadharCardPhotoCopyUS: any = useSelector(
    (state: RootState) => state.AadharcardTecaherSlice.ISDeleteAadharCardPhotoCopy
  );

  console.log(DeleteAadharCardPhotoCopyUS, "DeleteAadharCardPhotoCopyUS");

  const GetUserDetailsForAadharCardNoUS = useSelector((state: RootState) => state.AadharcardTecaherSlice.ISGetUserDetailsForAadharCardNo);

  console.log(GetUserDetailsForAadharCardNoUS, "GetUserDetailsForAadharCardNoUS");


  const SaveFile = () => {
    const UpdateTeacherAadharDetailsBody: IUpdateTeacherAadharDetailsBody =
    {
      asUserId: Number(UserId),
      asSchoolId: Number(asSchoolId),
      asAadharCardNo: AadharCardNumber,
      asAadharCardPhotoCopyPath: File,
      asUpdatedById: TeacherId.toString(),
      "asSaveFeature": "Aadhar Cards",
      "asFolderName": "PPSN Website",
      asBase64String: base64URL
    }
    dispatch(CDAUpdateTeacherAadharDetails(UpdateTeacherAadharDetailsBody));
  }
  const DeleteAadhar = () => {
    const DeleteAadharCardPhotoCopyBody: IDeleteAadharCardPhotoCopyBody = {
      asUserId: Number(UserId),
      asSchoolId: Number(asSchoolId),
      asUpdatedById: Number(UserId)
    }
    dispatch(CDADeleteAadharCardPhotoCopy(DeleteAadharCardPhotoCopyBody));
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
                  onClick={() => SaveFile}
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
                value={Name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label={"Aadhar Card Number"}
                value={AadharCardNumber}
                onChange={(e) => {
                  setAadharCardNumber(e.target.value);
                }}
              />
            </Grid>
            <br></br>
            <ButtonPrimary
              onClick={SaveFile}
              fullWidth

            >
              Submit
            </ButtonPrimary>

            {/* <Grid item xs={6}>
              <TextField
                fullWidth
                label={"Name Present on Aadhar Card"}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={"Mother Tongue"}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={"Email"}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SingleFile
                  FileName={fileName}
                  MaxfileSize={MaxfileSize}
                  ChangeFile={ChangeFile}
                  errorMessage={FileError}
                  // FilePath={EventDetaill == null ? "" : EventDetaill.Event_Image}
                  viewIcon={true}
                  deleteIcon={true}
                  // clickFileName={clickFileName}
                  clickDelete={DeleteAadhar}
                  isMandatory={false}
                  FileLabel='Upload Scanned Copy of Aadhar Card'
                  ValidFileTypes={ValidFileTypes}
                  // isMandatory
                  width='400px'
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* <PageHeader heading={'Aadahrcard'}> </PageHeader>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Aadhar Card Number"
          value={aadharCardNumber}
          onChange={(e) => setAadharCardNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name Present on Aadhar Card"
          value={nameOnAadharCard}
          onChange={(e) => setNameOnAadharCard(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mother Tongue"
          value={motherTongue}
          onChange={(e) => setMotherTongue(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.jpg,.png,.bmp,.jpeg"
        // Add a ref for handling file input
        />
        <button type="submit">SUBMIT</button>
      </form> */}
    </>
  );
};

export default AadharCard;
