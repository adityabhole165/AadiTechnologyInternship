import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import { IGetStudentPhotoBody } from 'src/interfaces/Student/GetStudentPhoto';
import { GetAllowStudentPhotoUploadFromStudentLogin } from 'src/requests/SchoolSetting/schoolSetting';
import { getstudentpic } from 'src/requests/StudentPhoto/RequestStudentPhoto';
import { RootState } from 'src/store';
import UserPhoto from '../UserPhoto/UserPhoto';
import { ListStyle } from '../styled/CardStyle';
import { ProfileDetail2, ProfileDetailHeader } from '../styled/ProfileStyled';
import ProfileComponent from './ProfileComponent';

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
  const DOB = sessionStorage.getItem('DOB');
  const birthPlace = sessionStorage.getItem('BirthPlace');
  const asUserId = sessionStorage.getItem('UserId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const RoleId = sessionStorage.getItem('RoleId');

  const MobileNo = sessionStorage.getItem('MobileNumber');

  const AllowStudentPhotoUpload: any = useSelector(
    (state: RootState) =>
      state.getSchoolSettings.AllowStudentPhotoUploadFromStudentLogin
  );

  const GetStudentPic: any = useSelector(
    (state: RootState) => state.StudentPic.GetStudentpic
  );
  // console.log(GetStudentPic,"GetStudentPic")

  const DisableSubmit = GetStudentPic == null ? '' : GetStudentPic.IsSubmitted;

  const GetSettingValueBody: IGetSettingValueBody = {
    asSchoolId: parseInt(asSchoolId),
    aiAcademicYearId: parseInt(asAcademicYearId),
    asKey: ''
  };

  const getstudentphoto: IGetStudentPhotoBody = {
    aiSchoolId: parseInt(asSchoolId),
    aiUserId: parseInt(asUserId),
    aiStudentId: parseInt(asStudentId)
  };
  useEffect(() => {
    if (RoleId === '3') {
      dispatch(getstudentpic(getstudentphoto));
    }
    dispatch(GetAllowStudentPhotoUploadFromStudentLogin(GetSettingValueBody));
  }, []);

  const ResidencePhoneNumber = sessionStorage.getItem('ResidencePhoneNumber');
  const PhoneNumber = sessionStorage.getItem('MobileNumber');
  const PhoneNumber2 = sessionStorage.getItem('MobileNumber2');
  const Religion = sessionStorage.getItem('Religion');
  const CategoryName = sessionStorage.getItem('CategoryName');
  const ImgUrl = sessionStorage.getItem('PhotoFilePath');
  const CasteAndSubCaste = sessionStorage.getItem('CasteAndSubCaste');
  const userPhoto =
    ImgUrl.length != 0
      ? 'data:image/png;base64,' + ImgUrl
      : '/imges/defualtUser.jpg';
  const FamilyPhoto =
    GetStudentPic?.PhotoImage?.length != 0 &&
    GetStudentPic?.PhotoImage !== undefined
      ? 'data:image/png;base64,' + GetStudentPic?.PhotoImage
      : '';
  // const FamilyPhoto = FamilyPhotoFilePath.length != 0 ? localStorage.getItem('SiteURL') + FamilyPhotoFilePath : ''
  const getDateFormate = (date) => {
    const day = new Date(date).getDate();
    const month = new Date(date).toLocaleString('default', { month: 'long' });
    const year = new Date(date).getFullYear();
    return `${day} ${month} ${year}`;
  };
  const newdate = DOB === undefined || DOB === '' ? '' : getDateFormate(DOB);

  const EditProfile = () => {
    navigate('EditProfile');
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          ml={
            RoleId === '3' && AllowStudentPhotoUpload && !DisableSubmit
              ? '30px'
              : '0px'
          }
        >
          <UserPhoto
            ImgUrl={userPhoto}
            alt={'user.name'}
            width={'106px'}
            height={'137px'}
          />
        </Box>
        {RoleId === '3' && AllowStudentPhotoUpload && !DisableSubmit && (
          <Box sx={{ color: 'black' }} onClick={EditProfile}>
            <EditIcon fontSize="small" />
          </Box>
        )}
      </Box>
      <ProfileDetailHeader style={{ marginRight: '12px', textAlign: 'center' }}>
        <b>{UserName}</b>
      </ProfileDetailHeader>

      {RoleName == 'Student' && (
        <ProfileDetail2 style={{ marginRight: '3px', textAlign: 'center' }}>
          Roll No: {RollNo}
        </ProfileDetail2>
      )}

      <ListStyle
        sx={{
          marginBottom: '60px',
          height: '100%',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            {RoleName == 'Teacher' || RoleName == 'Admin Staff' ? (
              <>
                <ProfileComponent
                  Name="Designation :"
                  Value={DesignationName}
                ></ProfileComponent>

                {RoleName == 'Teacher' && (
                  <ProfileComponent
                    Name="Class Teacher :"
                    Value={ClassTeacher}
                  ></ProfileComponent>
                )}

                <ProfileComponent
                  Name="Mobile Number :"
                  Value={MobileNo}
                ></ProfileComponent>

                <ProfileComponent
                  Name="Address :"
                  Value={Address}
                ></ProfileComponent>

                <ProfileComponent
                  Name="Date of Birth :"
                  Value={newdate}
                ></ProfileComponent>
              </>
            ) : RoleName == 'Student' ? (
              <>
                <Box sx={{ display: 'flex' }}>
                  <ProfileComponent
                    Name="Address:"
                    Value={Address}
                  ></ProfileComponent>
                </Box>

                <ProfileComponent
                  Name="Residence Phone No :"
                  Value={ResidencePhoneNumber}
                ></ProfileComponent>
                <ProfileComponent
                  Name="Religion :"
                  Value={Religion}
                ></ProfileComponent>
                <ProfileComponent
                  Name="Caste & Sub-Caste :"
                  Value={CasteAndSubCaste}
                ></ProfileComponent>
                <ProfileComponent
                  Name="Category Name :"
                  Value={CategoryName}
                ></ProfileComponent>
                <ProfileComponent
                  Name="UDISE Number :"
                  Value={UDISENumber}
                ></ProfileComponent>
                <ProfileComponent
                  Name="Mobile Number :"
                  Value={
                    PhoneNumber === ''
                      ? PhoneNumber2
                      : PhoneNumber + ' , ' + PhoneNumber2
                  }
                ></ProfileComponent>

                <ProfileComponent
                  Name="Place of Birth :"
                  Value={birthPlace}
                ></ProfileComponent>

                <ProfileComponent
                  Name="Date of Birth :"
                  Value={newdate}
                ></ProfileComponent>

                <ProfileComponent
                  Name="Nationality :"
                  Value={Nationality}
                ></ProfileComponent>

                <ProfileComponent
                  Name="Mother Tongue :"
                  Value={MotherTongue}
                ></ProfileComponent>

                <ProfileComponent
                  Name="Blood Group :"
                  Value={Blood_Group}
                ></ProfileComponent>

                <Box sx={{ display: 'flex' }}>
                  <ProfileComponent
                    Name="Family Photo :"
                    Value={''}
                  ></ProfileComponent>
                  <Box sx={{ mt: '14px' }}>
                    {ImgUrl && (
                      <Avatar
                        alt="user.name"
                        src={FamilyPhoto}
                        sx={{
                          width: '180px',
                          height: '160px',
                          border: '2px solid gray',
                          textAlign: 'center'
                        }}
                        variant="square"
                        aria-label="add"
                      ></Avatar>
                    )}
                  </Box>
                </Box>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </ListStyle>
    </>
  );
}

export default Card6;
