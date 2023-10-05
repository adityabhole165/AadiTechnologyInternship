import { useContext, useEffect, useRef, useState } from 'react';
import { IPushNotificationFCM } from "src/interfaces/FCMDeviceRegistration/FCMDeviceRegistration";
import RegisterDeviceTokenApi from 'src/api/RegisterDeviceToken/RegisterDeviceToken';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Avatar,
  Popover,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  NativeSelect
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { SidebarContext } from 'src/contexts/SidebarContext';
import GroupIcon from '@mui/icons-material/Group';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';
import { Styles } from 'src/assets/style/student-style'
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import { useTranslation } from 'react-i18next';
import { IAuthenticateUser, IAuthenticateUserResult, IStaffDetailsForloginBody } from 'src/interfaces/Authentication/Login';
import LoginApi from 'src/api/Authentication/Login';
import { toast } from 'react-toastify';
import ThemeSettings from 'src/layouts/components/ThemeSettings';
import { logoURL } from 'src/components/Common/Util';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { App } from '@capacitor/app';
import { Detail1 } from 'src/libraries/styled/CardStyle';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';
import { getSaveUserLoginDetail } from 'src/requests/Dashboard/Dashboard';
import { ISaveUserLoginDetailsBody } from 'src/interfaces/Student/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Stafflogin } from 'src/requests/Authentication/StaffKidLogin';
import { IGetAllActiveNoticesBody } from 'src/interfaces/Student/ISchoolNoticeBoard';
import { getAllActiveNotices } from 'src/requests/SchoolNoticeBoard/requestSchoolNoticaBoard';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
             left: 0px;
            width: auto;
        }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
    text-align: left;
    padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.sidebar.menuItemColor};
    display: block;
    @media (max-width: 280px) {
      font-size: 11px;
    };
    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${alpha(theme.sidebar.menuItemColor, 0.6)};

    &.popoverTypo {
      color: ${theme.palette.secondary.light};
    };
    @media (max-width: 280px) {
      font-size: 11px;
    };
`
);



function Header() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();
  const classes = Styles();
  const dispatch = useDispatch();

  const Name = sessionStorage.getItem("StudentName");
  const Class = sessionStorage.getItem("Class");
  const RollNo = sessionStorage.getItem("RollNo");
  const ImgUrl = sessionStorage.getItem("PhotoFilePath")
  const UserLoginDetails1 = localStorage.getItem('UserLoginDetails1')

  let userprofile = ''
  let img_src = ''
  if (sessionStorage.length > 0) {
    userprofile = ImgUrl.length != 0 ? 'data:image/png;base64,' + ImgUrl : '/imges/defualtUser.jpg'
    img_src = logoURL + localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') + "_logo.png";
  }

  let siblingList: any = [];
  if (localStorage.getItem("RoleName") === 'Student' && sessionStorage.getItem("StudentSiblingList") !== "") {
    siblingList = JSON.parse(sessionStorage.getItem("StudentSiblingList"))
  }
  const schoolId = localStorage.getItem("localSchoolId");

  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const handleCloseApp = async (): Promise<void> => {
    try {
      handleClose();
      App.exitApp();
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      localStorage.removeItem("auth")
      sessionStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const deviceRegistrationFCM = async (userId) => {
    const data: IPushNotificationFCM = {
      asSchoolId: schoolId,
      asUserId: userId.toString(),
      asRegistrationId: localStorage.getItem('FCMdeviceToken'),
      asDeviceId: localStorage.getItem('deviceId'),
      asDeviceType: ((localStorage.getItem('deviceType') === 'ios') ? 'APPLE' : localStorage.getItem('deviceType'))
    }
    const response: any = await RegisterDeviceTokenApi.RegisterFCMToken(data)
  }
  const setSession = async (response) => {
    const result: IAuthenticateUserResult = await response.data.AuthenticateUserResult
    const studentDetails: any = await response.data.StudentDetails
    const teacherDetails: any = await response.data.TeacherDetails
    const adminDetails: any = await response.data.AdminStaffDetails.GetAdminStaffResult
    const UserLoginD: ISaveUserLoginDetailsBody = {
      asSchoolId: schoolId,
      asUserId: result.Id
    }
    dispatch(getSaveUserLoginDetail(UserLoginD))


    if (result.RoleName === "Student") {
      sessionStorage.setItem("AuthenticateUserResult", JSON.stringify(result));
      sessionStorage.setItem('DivisionId', studentDetails.DivisionId);
      sessionStorage.setItem('Class', studentDetails.Class);
      sessionStorage.setItem('StandardId', studentDetails.StandardId);
      sessionStorage.setItem('RollNo', studentDetails.RollNo);
      sessionStorage.setItem('AcademicYearId', studentDetails.AcademicYearId);
      sessionStorage.setItem('AcademicYear', studentDetails.AcademicYear);
      sessionStorage.setItem('StudentId', studentDetails.StudentId);
      sessionStorage.setItem('StandardDivisionId', studentDetails.StandardDivisionId);
      sessionStorage.setItem('Address', studentDetails.Address);
      sessionStorage.setItem('ResidencePhoneNumber', studentDetails.ResidencePhoneNumber);
      sessionStorage.setItem('CasteAndSubCaste', studentDetails.CasteAndSubCaste);
      sessionStorage.setItem('UDISENumber', studentDetails.UDISENumber);
      sessionStorage.setItem('BirthPlace', studentDetails.BirthPlace);
      sessionStorage.setItem('Nationality', studentDetails.Nationality);
      sessionStorage.setItem('MotherTongue', studentDetails.MotherTongue);
      sessionStorage.setItem('Blood_Group', studentDetails.Blood_Group);
      sessionStorage.setItem('EndDate', studentDetails.EndDate);
      sessionStorage.setItem('StartDate', studentDetails.StartDate);
      sessionStorage.setItem('Language', studentDetails.asLanguage);
      sessionStorage.setItem('ParentStaffID', studentDetails.aiParentStaffId);
      sessionStorage.setItem('StartRowIndex', studentDetails.aiStartRowIndex);
      sessionStorage.setItem('SortRowIndexExpression', studentDetails.asSortExpression);
      sessionStorage.setItem('BookTittleName', studentDetails.asBookTitle);
      sessionStorage.setItem('UserName', studentDetails.asUserName);
      sessionStorage.setItem('ExamID', studentDetails.asExamId);
      sessionStorage.setItem('DOB', studentDetails.DOB);
      sessionStorage.setItem('MobileNumber', studentDetails.MobileNumber);
      sessionStorage.setItem('MobileNumber2', studentDetails.MobileNumber2);
      sessionStorage.setItem('Religion', studentDetails.Religion);
      sessionStorage.setItem('CategoryName', studentDetails.CategoryName);
      sessionStorage.setItem('FamilyPhotoFilePath', studentDetails.FamilyPhotoFilePath);
      sessionStorage.setItem('SchoolwiseStudentId', studentDetails.SchoolwiseStudentId);
      // sessionStorage.setItem("StudentSiblingList", result.StudentSiblingList === undefined ?
      //     "" : JSON.stringify(result.StudentSiblingList));
      sessionStorage.setItem("StudentSiblingList", studentDetails.StudentSiblingList === undefined ?
        "" : JSON.stringify(studentDetails.StudentSiblingList));
    }


    if (result.RoleName === "Teacher") {
      sessionStorage.setItem("AuthenticateUserResult", JSON.stringify(result));
      sessionStorage.setItem('TeacherId', teacherDetails.TeacherId);
      sessionStorage.setItem('Address', teacherDetails.Address);
      sessionStorage.setItem('IsClassTeacher', teacherDetails.IsClassTeacher);
      sessionStorage.setItem('DesignationName', teacherDetails.DesignationName);
      sessionStorage.setItem('DivisionId', teacherDetails.DivisionId);
      sessionStorage.setItem('StandardId', teacherDetails.StandardId);
      sessionStorage.setItem('StandardDivisionId', teacherDetails.StandardDivisionId);
      sessionStorage.setItem('ClassName', teacherDetails.ClassName);
      sessionStorage.setItem('AcademicYearId', teacherDetails.AcademicYearId);
      sessionStorage.setItem('EndDate', teacherDetails.EndDate);
      sessionStorage.setItem('StartDate', teacherDetails.StartDate);
      sessionStorage.setItem('SchoolName', teacherDetails.asSchoolName);
      sessionStorage.setItem("DOB", teacherDetails.DOB);
      sessionStorage.setItem("MobileNumber", teacherDetails.MobileNumber);
    }

    if (result.RoleName === "Admin Staff") {
      sessionStorage.setItem('AcademicYearId', adminDetails.AcademicYearId);
      sessionStorage.setItem('Address', adminDetails.Address);
      sessionStorage.setItem('DesignationName', adminDetails.DesignationName);
      sessionStorage.setItem('EndDate', adminDetails.EndDate);
      sessionStorage.setItem('StartDate', adminDetails.StartDate);
      sessionStorage.setItem("DOB", adminDetails.DOB);
      sessionStorage.setItem('SchoolName', adminDetails.SchoolName);
      sessionStorage.setItem('asSchoolName', adminDetails.asSchoolName);
      sessionStorage.setItem('MobileNumber', adminDetails.MobileNumber);
    }

    sessionStorage.setItem("Id", result.Id);
    sessionStorage.setItem("RoleId", result.RoleId);
    sessionStorage.setItem("StudentName", result.Name);
    sessionStorage.setItem("PhotoFilePath", result.PhotoFilePath);
    sessionStorage.setItem("Userlogin", result.UserLogin);
    sessionStorage.setItem("TermsAccepted", result.TermsAccepted);
    sessionStorage.setItem("LastPasswordChangeDate", result.LastPasswordChangeDate);

    localStorage.setItem("UserId", result.Id);
    localStorage.setItem("RoleName", result.RoleName);

    const url = localStorage.getItem("url");

    if (url != null && url !== '/') {
      navigate(url);
    }
    else
      if (result.RoleName == "Student" ||
        result.RoleName == "Teacher" ||
        result.RoleName == "Admin Staff") {
        navigate('/extended-sidebar/landing/landing');
      }
    // deviceRegistrationFCM(result.Id)
  }


  const loginToSibling = async (siblingUserLogin, siblingPassword) => {
    const body: IAuthenticateUser = {
      asUserName: siblingUserLogin,
      asPassword: siblingPassword,
      asSchoolId: schoolId,
      asIsSiblingLogin: true
    };
    getNewLogin(body)
  }
  const getNewLogin = async (body) => {
    const response: any = await LoginApi.AuthenticateUser(body)
    if (response.data != null) {
      setSession(response);
    }
    else {
      toast.error("Invalid Username or Password");
      navigate('/')
    }
  }

  const Notification = () => {
    navigate('Student/Notification')
  }

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  const LoginStaffKid: any = useSelector(
    (state: RootState) => state.StaffKidLogin.Stafflogin
  );
  const GetAllActiveNotices = useSelector(
    (state: RootState) => state.SchoolNoticeBoard.AllActiveNotices
  );
  const StudentId = sessionStorage.getItem('StudentId');
  const RoleId = sessionStorage.getItem('RoleId');
  const SchoolId = localStorage.getItem('localSchoolId');
  const AcademicYearId = sessionStorage.getItem('AcademicYearId');
  const UserId = sessionStorage.getItem('Id');
  const Staffkid: IStaffDetailsForloginBody = {
    aiSchoolId: SchoolId,
    aiAcademicYearId: AcademicYearId,
    aiYearwiseStudentId: RoleId === "3" ? StudentId : "0",
    aiUserId: UserId
  }
  const ActiveNoticesBody: IGetAllActiveNoticesBody = {
    asSchoolId: SchoolId,
    asUserId: UserId
  };
  console.log("Header", GetAllActiveNotices);

  useEffect(() => {
    dispatch(Stafflogin(Staffkid))
    dispatch(getAllActiveNotices(ActiveNoticesBody));
  }, [])
  useEffect(() => {
    // if(GetAllActiveNotices.length > 0){
    //   navigate('/extended-sidebar/Common/SchoolNotice');
    // }
  }, [GetAllActiveNotices])
  const Toaster = () => {
    if (!isOnline) {
      toast.error('No internet connection', { toastId: 'success1' })
    }
  }
  const LoginTo = RoleId === "3" ? "Login To Staff" : "Login To Child"

  return (<>
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 1px 0 ' +
            alpha(lighten(theme.colors.primary.main, 0.7), 0.15) +
            ', 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)'
            : '0px 2px 8px -3px ' +
            alpha(theme.colors.alpha.black[100], 0.2) +
            ', 0px 5px 22px -4px ' +
            alpha(theme.colors.alpha.black[100], 0.1)
      }}
    >
      {Toaster()}
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}
      >
        <img src={img_src} className={classes.smalllogo} />
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          size="small"
          sx={{
            width: 35,
            height: 35,
            '&:hover': {
              color: `${theme.colors.alpha.trueWhite[100]}`,
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`
            }
          }}
          ref={ref}
          onClick={handleOpen}
        >
          <Avatar alt="user.name" src={userprofile} sx={{ backgroundColor: "#90caf9", height: 50 }} variant="rounded" aria-label="add" />
        </IconButton>
        <Popover
          disableScrollLock
          anchorEl={ref.current}
          onClose={handleClose}
          open={isOpen}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center'
          }}
        >
          <MenuUserBox
            sx={{
              minWidth: 600
            }}
            display="flex"
          >
            <Avatar variant="rounded" alt="user.name" src={userprofile} sx={{ height: 55 }} />
            <UserBoxText>
              <UserBoxLabel className="popoverTypo">
                {Name}
              </UserBoxLabel>
              {
                (RollNo != undefined ? <>

                  <UserBoxDescription className="popoverTypo" >
                    {Class}
                  </UserBoxDescription> </>
                  : null)
              }
              <UserBoxDescription className="popoverTypo"> {UserLoginDetails1} </UserBoxDescription>
            </UserBoxText>
          </MenuUserBox>
          <Divider
            sx={{
              mb: 0
            }}
          />
          <List
            sx={{
              p: 1
            }}
            component="nav"
          >
            <ListItem
              onClick={() => {
                handleClose();
              }}
              button
              to={"/extended-sidebar/Student/Profile"}
              component={NavLink}
            >
              <AccountBoxTwoToneIcon fontSize="small" sx={{ color: "#053082" }} />
              <ListItemText primary={<UserBoxLabel sx={{ color: "blue", fontWeight: "bold" }}  >Profile</UserBoxLabel>} />
            </ListItem>
            <ListItem
              onClick={() => {
                handleClose();
              }}
              button
              to={"/extended-sidebar/common/changePassword"}
              component={NavLink}
            >
              <LockOpenTwoToneIcon fontSize="small" sx={{ color: "#053082" }} />
              <ListItemText primary={<UserBoxLabel sx={{ color: "blue", fontWeight: "bold" }}  >Change Password</UserBoxLabel>} />
            </ListItem>
            <ListItem
              onClick={() => {
                handleClose();
              }}
              button
              to={"/extended-sidebar/Student/Feedback"}
              component={NavLink}
            >
              <FeedbackTwoToneIcon fontSize="small" sx={{ color: "#053082" }} />
              <ListItemText primary={<Detail1>Feedback</Detail1 >} />
            </ListItem>

            <ListItem
              onClick={() => {
                handleClose();
              }}
              button
              to={"/extended-sidebar/Student/Support"}
              component={NavLink}
            >
              <ContactSupportTwoToneIcon fontSize="small" sx={{ color: "#053082" }} />
              <ListItemText primary={<Detail1>Support</Detail1 >} />
            </ListItem>
            {siblingList.length == 0 ? (
              <>
              </>
            ) : siblingList.length == 1 ?
              (
                <>
                  <ListItem
                    button
                    to={""}
                    component={NavLink}
                    style={{ background: 'white !important' }}
                  >
                    <GroupIcon fontSize="small" sx={{ color: "#053082" }} />
                    <ListItemText
                      primary={<UserBoxLabel sx={{ color: "blue", fontWeight: "bold" }}
                        onClick={() => {
                          loginToSibling(siblingList[0].UserName, siblingList[0].Password);
                        }}
                      >Sibling Login</UserBoxLabel>} />
                  </ListItem>
                </>
              ) :
              <ListItem
                button
                to={""}
                component={NavLink}
                style={{ background: 'white' }}
              >
                <GroupIcon fontSize="small" sx={{ color: "#053082", marginBottom: '42px' }} />
                <ul style={{ listStyle: 'none', padding: '0px', margin: '0px' }}>
                  <Typography sx={{ color: "blue", fontWeight: "bold" }}>Sibling Login </Typography>
                  {
                    siblingList?.map(
                      (sibling: any, i) => {
                        return (
                          <>
                            <li style={{ textDecoration: "underline", color: 'blueviolet', paddingLeft: '10px' }} key={i}
                              onClick={() => {
                                loginToSibling(sibling.UserName, sibling.Password);
                              }}
                            >{sibling.FullName}</li>
                          </>
                        );
                      }
                    )
                  }
                </ul>
              </ListItem>
            }
            {LoginStaffKid.length == 0 ? (
              <>
              </>
            ) : LoginStaffKid.length == 1 ?
              (
                <>
                  <ListItem
                    button
                    to={""}
                    component={NavLink}
                    style={{ background: 'white !important' }}
                  >
                    <GroupIcon fontSize="small" sx={{ color: "#053082" }} />
                    <ListItemText
                      primary={<UserBoxLabel sx={{ color: "blue", fontWeight: "bold" }}
                        onClick={() => {
                          loginToSibling(LoginStaffKid[0].UserName, LoginStaffKid[0].Password);
                        }}
                      >{LoginTo}</UserBoxLabel>} />
                  </ListItem>
                </>
              ) :
              <ListItem
                button
                to={""}
                component={NavLink}
                style={{ background: 'white' }}
              >
                <GroupIcon fontSize="small" sx={{ color: "#053082", marginBottom: '42px' }} />
                <ul style={{ listStyle: 'none', padding: '0px', margin: '0px' }}>
                  {/* <Typography sx={{ color: "blue", fontWeight: "bold" }}>Sibling Login </Typography> */}
                  {
                    LoginStaffKid?.map(
                      (StaffKid: any, i) => {
                        return (
                          <>
                            <li style={{ textDecoration: "underline", color: 'blueviolet', paddingLeft: '10px' }} key={i}
                              onClick={() => {
                                loginToSibling(StaffKid.UserName, StaffKid.Password);
                              }}
                            >{StaffKid.StudentName}</li>
                          </>
                        );
                      }
                    )
                  }
                </ul>
              </ListItem>
            }
          </List>
          <Divider />
          <Box m={1}>
            <Button color="primary" fullWidth onClick={handleLogout}>
              <ExitToAppIcon fontSize="small"
                sx={{
                  mr: 1,
                  fontWeight: "bold",
                  color: "#053082"
                }}
              />
              <UserBoxLabel sx={{ color: "blue", fontWeight: "bold" }}  >Sign Out</UserBoxLabel>
            </Button>
          </Box>
          {(window.localStorage.getItem('deviceType') === 'android' ||
            localStorage.getItem('deviceType') === 'ios') ? (
            <Box m={1}>
              <Button color="primary" fullWidth onClick={handleCloseApp}>
                <PowerSettingsNewTwoToneIcon fontSize="small"
                  sx={{
                    mr: 1,
                    fontWeight: "bold",
                    color: "#053082"
                  }}
                />
                <UserBoxLabel sx={{ color: "blue", fontWeight: "bold" }}  >Exit</UserBoxLabel>
              </Button>
            </Box>) : <div />}
        </Popover>
        <Avatar sx={{ backgroundColor: "#90caf9", height: 50 }} variant="rounded" aria-label="add">
          <NotificationsIcon fontSize="large" onClick={Notification} sx={{ height: 50 }} />
        </Avatar>
        {/* <ThemeSettings /> */}
      </Stack>

    </HeaderWrapper>
  </>
  );
}

export default Header;
