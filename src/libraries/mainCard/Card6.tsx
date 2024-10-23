import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Card, Grid, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IGetSettingValueBody } from 'src/interfaces/SchoolSetting/schoolSettings';
import { IGetStudentPhotoBody } from 'src/interfaces/Student/GetStudentPhoto';
import { GetAllowStudentPhotoUploadFromStudentLogin } from 'src/requests/SchoolSetting/schoolSetting';
import { getstudentpic } from 'src/requests/StudentPhoto/RequestStudentPhoto';
import { RootState } from 'src/store';
import UserPhoto from '../UserPhoto/UserPhoto';
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
      <Card
        sx={{
          borderRadius: '7px',
          boxShadow: 3,
          overflow: 'hidden',
          maxWidth: '70%',
          mx: 'auto',
          mb: 2,

        }}
      >
        <Card sx={{ background: '#c0c0c0', borderRadius: '7px' }}>
          <Box
            sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
                width={'140px'}
                height={'160px'}
              />
            </Box>
            {RoleId === '3' && AllowStudentPhotoUpload && !DisableSubmit && (
              <Box sx={{ color: 'black' }} onClick={EditProfile}>
                <EditIcon fontSize="small" />
              </Box>
            )}
          </Box>
          <ProfileDetailHeader style={{ marginRight: '12px', textAlign: 'center', color: 'white', fontSize: '20px' }}>
            <b>{UserName}</b>
          </ProfileDetailHeader>

          {RoleName == 'Student' && (
            <ProfileDetail2 style={{ marginRight: '3px', textAlign: 'center' }}>
              Roll No: {RollNo}
            </ProfileDetail2>
          )}
        </Card>
        {/* <ListStyle
  sx={{
    marginBottom: '0px',
    height: '100%',
    width: '100%',
    borderRadius: '7px',
  }}
> */}
        <Grid container>
          <Grid item xs={12}>
            <Table>
              <TableBody>
                {RoleName === 'Teacher' || RoleName === 'Admin Staff' ? (
                  <>
                    <TableRow>
                      <TableCell >
                        <ProfileComponent Name="Designation :" Value={DesignationName} />
                      </TableCell>
                      <TableCell>
                        <ProfileComponent Name="Address :" Value={Address} />
                      </TableCell>
                    </TableRow>

                    {RoleName === 'Teacher' && (
                      <TableRow>
                        <TableCell>
                          <ProfileComponent Name="Class Teacher :" Value={ClassTeacher} />
                        </TableCell>
                        <TableCell>
                          <ProfileComponent Name="Date of Birth :" Value={newdate} />
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Mobile Number :" Value={MobileNo} />
                      </TableCell>
                      <TableCell>
                        <ProfileComponent Name="Email Id :" Value={null} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name=" Standard Details:" Value={null} />
                      </TableCell>
                      <TableCell>
                        <ProfileComponent Name="Subject Details :" Value={null} />
                      </TableCell>
                    </TableRow>



                  </>
                ) : RoleName === 'Student' ? (
                  <>
                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Address :" Value={Address} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Residence Phone No :" Value={ResidencePhoneNumber} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Religion :" Value={Religion} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Caste & Sub-Caste :" Value={CasteAndSubCaste} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Category Name :" Value={CategoryName} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="UDISE Number :" Value={UDISENumber} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent
                          Name="Mobile Number :"
                          Value={
                            PhoneNumber === ''
                              ? PhoneNumber2
                              : PhoneNumber + ' , ' + PhoneNumber2
                          }
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Place of Birth :" Value={birthPlace} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Date of Birth :" Value={newdate} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Nationality :" Value={Nationality} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Mother Tongue :" Value={MotherTongue} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Blood Group :" Value={Blood_Group} />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>
                        <ProfileComponent Name="Family Photo :" Value={''} />
                        {ImgUrl && (
                          <Avatar
                            alt="user.name"
                            src={FamilyPhoto}
                            sx={{
                              width: '180px',
                              height: '160px',
                              border: '2px solid gray',
                              mt: 2,
                            }}
                            variant="square"
                            aria-label="add"
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        {/* </ListStyle> */}
      </Card>
    </>
  );
}

export default Card6;
