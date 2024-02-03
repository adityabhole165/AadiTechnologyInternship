import { Box, Card, Grid, Typography } from '@mui/material';

import UserPhoto from 'src/libraries/UserPhoto/UserPhoto';
function MyprofileCard() {
  const UserName = sessionStorage.getItem('StudentName');
  const RoleName = localStorage.getItem('RoleName');
  const DesignationName = sessionStorage.getItem('DesignationName');
  const ClassTeacher = sessionStorage.getItem('ClassName');
  const RollNo = sessionStorage.getItem('RollNo');
  const UDISENumber = sessionStorage.getItem('UDISENumber');
  const BirthPlace = sessionStorage.getItem('BirthPlace');
  const Nationality = sessionStorage.getItem('Nationality');
  const Address = sessionStorage.getItem('Address');
  const Blood_Group = sessionStorage.getItem('Blood_Group');
  const MotherTongue = sessionStorage.getItem('MotherTongue');
  const DOB = sessionStorage.getItem('DOB');
  const ImgUrl = sessionStorage.getItem('PhotoFilePath');
  const userPhoto =
    ImgUrl.length != 0
      ? 'data:image/png;base64,' + ImgUrl
      : '/imges/defualtUser.jpg';
  const getDateFormate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString('default', { month: 'long' });
    const year = new Date(date).getFullYear();
    return `${day} ${month} ${year}`;
  };
  const newdate = DOB === undefined || DOB === '' ? '' : getDateFormate(DOB);
  return (
    <div>
      <Card sx={{ backgroundColor: '#4db6ac' }}>
        <Box sx={{ display: 'flex' }} p={1.3}>
          <UserPhoto
            ImgUrl={userPhoto}
            alt={'user.name'}
            width={'106px'}
            height={'137px'}
          />
          <Grid container>
            <Grid item md={7} sm={6} pl={6} mt={-0.5}>
              <Typography variant="h4"> </Typography>
              <Typography>
                {' '}
                <b>Name :</b> {UserName}{' '}
              </Typography>
              <Typography>
                {' '}
                <b>Designation :</b> {DesignationName}
              </Typography>
              <Typography>
                {' '}
                <b>Class :</b> {ClassTeacher}
              </Typography>
              <Typography>
                {' '}
                <b>Date of Birth :</b> {newdate}
              </Typography>
              <Typography>
                {' '}
                <b>Qualification :</b> B.E{' '}
              </Typography>
              <Typography>
                {' '}
                <b>Mobile Number :</b> 9860168709
              </Typography>
              <Typography>
                {' '}
                <b>Email ID :</b> Unezad@gmail.com{' '}
              </Typography>
            </Grid>
            <Grid item md={5} sm={6} sx={{ float: 'right' }}>
              <img
                src={'/imges/welcomeback.png'}
                width={'250px'}
                height={'137px'}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default MyprofileCard;
