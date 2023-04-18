import { Stack, Grid, Avatar, Box, Button } from '@mui/material';
import { ButtonPrimary } from '../styled/ButtonStyle';
import { ListStyle } from '../styled/CardStyle';
import { ProfileDetail1, ProfileDetail2, ProfileDetail3, ProfileDetail4, ProfileWrapper, ProfileDetailHeader } from '../styled/ProfileStyled';
import EditIcon from '@mui/icons-material/Edit';
import UserPhoto from '../UserPhoto/UserPhoto';
import ProfileComponent from './ProfileComponent';
import { useNavigate } from 'react-router-dom';
import CropSquareTwoToneIcon from '@mui/icons-material/CropSquareTwoTone';

function Card6() {
  const navigate = useNavigate();
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
  const authData = JSON.parse(localStorage.getItem('auth'));
  const DOB = RoleName == 'Student' ? authData.data.StudentDetails.DOB :
    RoleName == 'Teacher' ? authData.data.TeacherDetails.DOB :
      RoleName == 'Admin Staff' ? authData.data.AdminStaffDetails?.GetAdminStaffResult?.DOB : ''


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
      <Stack alignItems="center" justifyContent="center" gap={1}>
        <Box sx={{ display: "flex" }}>
          <UserPhoto ImgUrl={userPhoto} alt={'user.name'} width={'106px'} height={'137px'} />
          
          <Button style={{marginTop:"1px", marginLeft:"-5px"}} onClick={EditProfile}> 
          <Box sx={{border: "1px solid gray"}}><EditIcon fontSize="small" /> </Box></Button>
         
          {/* <Button style={{marginTop:"-105px", marginLeft:"-17px"}} onClick={EditProfile}> 
          <Box sx={{border: "1px solid gray"}}><EditIcon fontSize="small" /> </Box></Button> */}
        </Box>
        
        <ProfileDetailHeader style={{marginRight:"57px"}}><b>{UserName}</b></ProfileDetailHeader>

        {RoleName == 'Student' &&
          <ProfileDetail2 style={{marginRight:"57px"}}>Roll No: {RollNo}</ProfileDetail2>
        }
       
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
                {/* <ButtonPrimary onClick={EditProfile}>Edit <EditIcon fontSize="small" /></ButtonPrimary> */}
                <ProfileComponent Name='Address:' Value={Address}></ProfileComponent>
                <ProfileComponent Name='Residence Phone No:' Value={ResidencePhoneNumber}></ProfileComponent>

                {/* <ProfileComponent Name='Religion:' Value=''></ProfileComponent> */}
                {/* <ProfileComponent Name='Caste & sub-Caste:' Value={''}></ProfileComponent> */}

                <ProfileComponent Name='UDISE Number:' Value={UDISENumber}></ProfileComponent>

                <ProfileComponent Name='Place of Birth:' Value={BirthPlace}></ProfileComponent>

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
