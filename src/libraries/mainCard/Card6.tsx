import {  Stack, Grid,} from '@mui/material';
import { ListStyle } from '../styled/CardStyle';
import {ProfileDetail1,ProfileDetail2,ProfileDetail3,ProfileDetail4,ProfileWrapper} from '../styled/ProfileStyled';

import UserPhoto from '../UserPhoto/UserPhoto';
function Card6() {
  const UserName = sessionStorage.getItem('StudentName');
  const RoleName = localStorage.getItem('RoleName');
  const DesignationName = sessionStorage.getItem('DesignationName');
  const ClassTeacher = sessionStorage.getItem('IsClassTeacher');
  const RollNo = sessionStorage.getItem('RollNo');
  const UDISENumber = sessionStorage.getItem('UDISENumber');
  const BirthPlace = sessionStorage.getItem('BirthPlace');
  const Nationality = sessionStorage.getItem('Nationality');
  const Address = sessionStorage.getItem('Address');
  const Blood_Group = sessionStorage.getItem('Blood_Group');
  const MotherTongue = sessionStorage.getItem('MotherTongue');
  const ResidencePhoneNumber = sessionStorage.getItem(
    'ResidencePhoneNumber'
  );
  const ImgUrl = sessionStorage.getItem('PhotoFilePath');

  return (
    <>
      <Stack alignItems="center" justifyContent="center" gap={1}>
        <UserPhoto ImgUrl={ImgUrl} alt={''} width={'150px'} height={'150px'} />

        {RoleName == 'Teacher' ? (
          <>
            <ProfileDetail3><b>{UserName}</b></ProfileDetail3>
          </>
        ) : RoleName == 'Admin Staff' ? (
          <>
            <ProfileDetail3><b>{UserName}</b></ProfileDetail3>
          </>
        ) : (
          <>
            <ProfileDetail1><b>{UserName}</b></ProfileDetail1>
            <ProfileDetail2>Roll No: {RollNo}</ProfileDetail2>
          </>
        )}
      </Stack>

      <ListStyle
        sx={{
          bottom: 0,
          height: '80vh',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            {RoleName == 'Teacher' ? (
              <>
                <ProfileWrapper>
                  <ProfileDetail1>Designation:</ProfileDetail1>
                  <ProfileDetail4>{DesignationName}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Class Teacher:</ProfileDetail1>
                  <ProfileDetail4> {ClassTeacher}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Mobile Number:</ProfileDetail1>
                  <ProfileDetail4> {}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Address:</ProfileDetail1>
                  <ProfileDetail4> {Address}</ProfileDetail4>
                </ProfileWrapper>
              </>
            ) : RoleName == 'Admin Staff' ? (
              <>
                <ProfileWrapper>
                  <ProfileDetail1>Designation:</ProfileDetail1>
                  <ProfileDetail4> {DesignationName}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Mobile Number:</ProfileDetail1>
                  <ProfileDetail4> {}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Address:</ProfileDetail1>
                  <ProfileDetail4> {Address}</ProfileDetail4>
                </ProfileWrapper>
              </>
            ) : (
              <>
                <ProfileWrapper>
                  <ProfileDetail1>Address:</ProfileDetail1>
                  <ProfileDetail4> {Address}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Residence Phone No:</ProfileDetail1>
                  <ProfileDetail4> {ResidencePhoneNumber}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Religion:</ProfileDetail1>
                  <ProfileDetail4> {}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Caste & sub-Caste:</ProfileDetail1>
                  <ProfileDetail4> {}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>UDISEnumber:</ProfileDetail1>
                  <ProfileDetail4> {UDISENumber}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Place of Birth:</ProfileDetail1>
                  <ProfileDetail4> {BirthPlace}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Nationality:</ProfileDetail1>
                  <ProfileDetail4>{Nationality}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Mother Tongue:</ProfileDetail1>
                  <ProfileDetail4> {MotherTongue}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Blood Group:</ProfileDetail1>
                  <ProfileDetail4> {Blood_Group}</ProfileDetail4>
                </ProfileWrapper>
                <ProfileWrapper>
                  <ProfileDetail1>Family Photo:</ProfileDetail1>
                  <ProfileDetail4> {}</ProfileDetail4>
                </ProfileWrapper>
              </>
            )}
          </Grid>
        </Grid>
      </ListStyle>
    </>
  );
}

export default Card6;
