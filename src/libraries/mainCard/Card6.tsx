import { Stack, Grid, Avatar, Box, Button } from '@mui/material';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { useEffect, useState } from 'react';
import { ListStyle } from '../styled/CardStyle';
import { ProfileDetail1, ProfileDetail2, ProfileDetail3, ProfileDetail4, ProfileWrapper, ProfileDetailHeader } from '../styled/ProfileStyled';
import EditIcon from '@mui/icons-material/Edit';
import UserPhoto from '../UserPhoto/UserPhoto';
import ProfileComponent from './ProfileComponent';
import { useNavigate } from 'react-router-dom';
import CropSquareTwoToneIcon from '@mui/icons-material/CropSquareTwoTone';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'src/store';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import { GetAllowStudentPhotoUploadFromStudentLogin } from 'src/requests/SchoolSetting/schoolSetting';

function Card6() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserName = sessionStorage.getItem('StudentName');
  const RoleName = localStorage.getItem('RoleName');
  const DesignationName = sessionStorage.getItem('DesignationName');
  const ClassTeacher = sessionStorage.getItem('ClassName');
  const RollNo = sessionStorage.getItem('RollNo');
  const UDISENumber = sessionStorage.getItem('UDISENumber');
  const Nationality = sessionStorage.getItem('Nationality');
  const Address = sessionStorage.getItem('Address');
  const Blood_Group = sessionStorage.getItem('Blood_Group');
  const MotherTongue = sessionStorage.getItem('MotherTongue');
  const DOB = sessionStorage.getItem('DOB')
  const birthPlace = sessionStorage.getItem('BirthPlace');

  const AllowStudentPhotoUpload: any = useSelector(
    (state: RootState) => state.getSchoolSettings.AllowStudentPhotoUploadFromStudentLogin
  );

  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: parseInt(asAcademicYearId),
    asKey: "",
  };
  useEffect(() => {
    dispatch(GetAllowStudentPhotoUploadFromStudentLogin(GetSettingValueBody))
  }, []);

  const ResidencePhoneNumber = sessionStorage.getItem('ResidencePhoneNumber');
  const ImgUrl = sessionStorage.getItem('PhotoFilePath');
  const userPhoto = ImgUrl.length != 0 ? 'data:image/png;base64,' + ImgUrl : '/imges/defualtUser.jpg'
  const getDateFormate = (date) => {

    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString('default', { month: "long" });
    const year = new Date(date).getFullYear();
    return `${day} ${month} ${year}`
  }
  const newdate = (DOB === undefined || DOB === "") ? "" : getDateFormate(DOB)

  const EditProfile = () => {
    navigate('EditProfile')
  }
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
        <Box ml={AllowStudentPhotoUpload == true && "30px"} >
          <UserPhoto ImgUrl={userPhoto} alt={'user.name'} width={'106px'} height={'137px'} />
        </Box>

        {AllowStudentPhotoUpload == true &&

          <Box sx={{ color: "black" }} onClick={EditProfile}>
            <EditIcon fontSize="small" />
          </Box>}
      </Box>

      <ProfileDetailHeader style={{ marginRight: "12px", textAlign: "center" }}><b>{UserName}</b></ProfileDetailHeader>

      {RoleName == 'Student' &&
        <ProfileDetail2 style={{ marginRight: "3px", textAlign: "center" }}>Roll No: {RollNo}</ProfileDetail2>
      }

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

            {RoleName == 'Teacher' || RoleName == 'Admin Staff' ? (
              <>
                <ProfileComponent Name='Designation:' Value={DesignationName}></ProfileComponent>


                {RoleName == 'Teacher' &&
                  <ProfileComponent Name='Class Teacher:' Value={ClassTeacher}></ProfileComponent>}

                <ProfileComponent Name='Mobile Number:' Value=''></ProfileComponent>

                <ProfileComponent Name='Address:' Value={Address}></ProfileComponent>

                <ProfileComponent Name='Date of Birth:' Value={newdate}></ProfileComponent>
              </>
            ) : RoleName == 'Student' ? (
              <>

                <ProfileComponent Name='Address:' Value={Address}></ProfileComponent>
                <ProfileComponent Name='Residence Phone No:' Value={ResidencePhoneNumber}></ProfileComponent>



                <ProfileComponent Name='UDISE Number:' Value={UDISENumber}></ProfileComponent>

                <ProfileComponent Name='Place of Birth:' Value={birthPlace}></ProfileComponent>

                <ProfileComponent Name='Date of Birth:' Value={newdate}></ProfileComponent>

                <ProfileComponent Name='Nationality:' Value={Nationality}></ProfileComponent>

                <ProfileComponent Name='Mother Tongue:' Value={MotherTongue}></ProfileComponent>

                <ProfileComponent Name='Blood Group:' Value={Blood_Group}></ProfileComponent>



              </>
            ) : (<></>)}
          </Grid>
        </Grid>
      </ListStyle>
    </>
  );
}

export default Card6;
