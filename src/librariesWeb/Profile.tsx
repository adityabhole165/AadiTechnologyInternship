import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISaveUserLoginDetailsBody } from 'src/interfaces/Student/dashboard';
import UserPhoto from 'src/libraries/UserPhoto/UserPhoto';
import { getSaveUserLoginDetail } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';
import Header from './Header';

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const dispatch = useDispatch();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asUserId = sessionStorage.getItem('Id');

  const UserLoginDetails1: any[] = useSelector((state: RootState) => state.Dashboard.UserLoginDetails);
  const UserLoginDetailsBody: ISaveUserLoginDetailsBody = {
    asSchoolId: asSchoolId,
    asUserId: asUserId
  };

  useEffect(() => {
    dispatch(getSaveUserLoginDetail(UserLoginDetailsBody));
  }, [dispatch]);


  const UserName = sessionStorage.getItem('StudentName') || '-';
  const DesignationName = sessionStorage.getItem('DesignationName') || '-';
  const ClassTeacher = sessionStorage.getItem('ClassName') || '-';
  const MobileNumber = sessionStorage.getItem('MobileNumber') || '-';
  const ImgUrl = sessionStorage.getItem('PhotoFilePath');
  // const UserLoginDetails1 = localStorage.getItem('UserLoginDetails1');
  const userPhoto =
    ImgUrl && ImgUrl.length !== 0
      ? 'data:image/png;base64,' + ImgUrl
      : '/imges/defualtUser.jpg';

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '382px' },
        maxWidth: { xs: '100%', md: '50' }, p: 1, backgroundColor: 'white'
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Header Title="Teacher Details" />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          mt={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <UserPhoto
            ImgUrl={userPhoto}
            alt={'user.name'}
            width={'140px'}
            height={'180px'}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" align="center">
            {UserName}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {DesignationName} ({ClassTeacher})
          </Typography>
          <Typography variant="body1" align="center">
            {MobileNumber}
          </Typography>
          <Typography align="center">
            <br />
            <b>Last Login:</b> {UserLoginDetails1}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
