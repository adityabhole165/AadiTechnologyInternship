
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
import { CDADeleteAadharCardPhotoCopy, CDAGetUserDetailsForAadharCardNo, CDAUpdateTeacherAadharDetails } from 'src/requests/NewAadharcard/RAadharcardTecaher';
import { RootState } from 'src/store';

const AadharCard = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('');
  const [base64URL, setbase64URL] = useState('');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const ValidFileTypes = ['PDF', 'JPG', 'PNG', 'BMP', 'JPEG'];
  const MaxfileSize = 3000000;
  const [name, setName] = useState('');
  const [aadharCardNumber, setAadharCardNumber] = useState('');
  const [nameOnAadharCard, setNameOnAadharCard] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };
  const UpdateTeacherAadharDetailsUS: any = useSelector(
    (state: RootState) => state.AadharcardTecaherSlice.ISUpdateTeacherAadharDetails
  );

  console.log(UpdateTeacherAadharDetailsUS, "UpdateTeacherAadharDetailsUS");

  const DeleteAadharCardPhotoCopyUS: any = useSelector(
    (state: RootState) => state.AadharcardTecaherSlice.ISDeleteAadharCardPhotoCopy
  );

  console.log(DeleteAadharCardPhotoCopyUS, "DeleteAadharCardPhotoCopyUS");

  const GetUserDetailsForAadharCardNoUS = useSelector((state: RootState) => state.AadharcardTecaherSlice.ISGetUserDetailsForAadharCardNo);

  console.log(GetUserDetailsForAadharCardNoUS, "GetUserDetailsForAadharCardNoUS");



  const UpdateTeacherAadharDetailsBody: IUpdateTeacherAadharDetailsBody = {
    asUserId: Number(UserId),
    asSchoolId: Number(asSchoolId),
    "asAadharCardNo": "098765456785",
    "asAadharCardPhotoCopyPath": "abcdddddddddd.jpg",
    asUpdatedById: UserId,
    "asSaveFeature": "Aadhar Cards",
    "asFolderName": "PPSN Website",
    "asBase64String": "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"
  }

  const DeleteAadharCardPhotoCopyBody: IDeleteAadharCardPhotoCopyBody = {
    asUserId: Number(UserId),
    asSchoolId: Number(asSchoolId),
    asUpdatedById: Number(UserId)
  }


  const GetUserDetailsForAadharCardNoBody: IGetUserDetailsForAadharCardNoBody = {
    asUserId: Number(UserId),
    asSchoolId: Number(asSchoolId)
  }

  useEffect(() => {
    dispatch(CDAUpdateTeacherAadharDetails(UpdateTeacherAadharDetailsBody));
  }, []);
  useEffect(() => {
    dispatch(CDADeleteAadharCardPhotoCopy(DeleteAadharCardPhotoCopyBody));
  }, []);
  useEffect(() => {
    dispatch(CDAGetUserDetailsForAadharCardNo(GetUserDetailsForAadharCardNoBody));
  }, []);


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
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label={"Aadhar Card Number"}
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SingleFile
                  FileName={fileName}
                  MaxfileSize={MaxfileSize}
                  ChangeFile={(file: any) => {
                    setFileName(file.name);
                    setbase64URL(file.base64);
                  }}
                  FileLabel='Upload Scanned Copy of Aadhar Card'
                  ValidFileTypes={ValidFileTypes}
                  isMandatory
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
