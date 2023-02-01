import { useContext, useRef, useState } from 'react';

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
import { IAuthenticateUser, IAuthenticateUserResult } from 'src/interfaces/Authentication/Login';
import LoginApi from 'src/api/Authentication/Login';
import { toast } from 'react-toastify';
import ThemeSettings from 'src/layouts/components/ThemeSettings';
import { logoURL } from 'src/components/Common/Util';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { App } from '@capacitor/app';
import { Detail1 } from 'src/libraries/styled/CardStyle';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';
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

  const Name = sessionStorage.getItem("StudentName");
  const Class = sessionStorage.getItem("Class");
  const RollNo = sessionStorage.getItem("RollNo");
  const ImgUrl = sessionStorage.getItem("PhotoFilePath")
  const userprofile = ImgUrl.length != 0 ? 'data:image/png;base64,' + ImgUrl : '/imges/defualtUser.jpg'
  const img_src = logoURL + localStorage.getItem('TermsSchoolName')?.split(' ').join('%20') + "_logo.png";

  const authData = JSON.parse(localStorage.getItem("auth"));
  let siblingList: any = [];
  if (authData.data.AuthenticateUserResult.RoleName === 'Student') {
    siblingList = authData.data.StudentDetails.StudentSiblingList
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
      sessionStorage.clear();
      localStorage.removeItem("auth")
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const setSession = async (response) => {
    const result: IAuthenticateUserResult = await response.data.AuthenticateUserResult
    const studentDetails: any = await response.data.StudentDetails
    const teacherDetails: any = await response.data.TeacherDetails
    const adminDetails: any = await response.data.TeacherDetails

    if (result.RoleName === "Student") {
      window.sessionStorage.setItem("AuthenticateUserResult", JSON.stringify(result));
      sessionStorage.setItem('DivisionId', studentDetails.DivisionId);
      sessionStorage.setItem('Class', studentDetails.Class);
      sessionStorage.setItem('StandardId', studentDetails.StandardId);
      sessionStorage.setItem('RollNo', studentDetails.RollNo);
      sessionStorage.setItem('AcademicYearId', studentDetails.AcademicYearId);
      sessionStorage.setItem('AcademicYear', studentDetails.AcademicYear);
      sessionStorage.setItem('StudentId', studentDetails.StudentId);
      sessionStorage.setItem('StandardDivisionId', studentDetails.StandardDivisionId);
      sessionStorage.setItem('Address', studentDetails.Address);
      sessionStorage.setItem('Residence_Phone_Number', studentDetails.Residence_Phone_Number);
      sessionStorage.setItem('CasteAndSubCaste', studentDetails.CasteAndSubCaste);
      sessionStorage.setItem('UDISENumber', studentDetails.UDISENumber);
      sessionStorage.setItem('Birth_Place', studentDetails.Birth_Place);
      sessionStorage.setItem('Nationality', studentDetails.Nationality);
      sessionStorage.setItem('Mother_Tongue', studentDetails.Mother_Tongue);
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
      localStorage.setItem("UserId", result.Id);
    }

    sessionStorage.setItem("Id", result.Id);
    sessionStorage.setItem("RoleId", result.RoleId);
    sessionStorage.setItem("StudentName", result.Name);
    sessionStorage.setItem("PhotoFilePath", result.PhotoFilePath);
    sessionStorage.setItem("Userlogin", result.UserLogin);
    const url = localStorage.getItem("url");

    if (result.RoleName == "Student") {
      navigate('/extended-sidebar/landing/landing');
    }
    else {
      navigate(url);
    }
  }

  const loginToSibling = async (siblingUserLogin, siblingPassword) => {
    const body: IAuthenticateUser = {
      asUserName: siblingUserLogin,
      asPassword: siblingPassword,
      asSchoolId: schoolId,
      asIsSiblingLogin: true
    };

    const response: any = await LoginApi.AuthenticateUser(body)
    if (response.data != null) {
      localStorage.setItem("auth", JSON.stringify(response));
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

  return (
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
            <Avatar variant="rounded" alt="user.name" src={userprofile} />
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
              <FeedbackTwoToneIcon fontSize="small"  sx={{ color: "#053082" }}/>
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
              <ContactSupportTwoToneIcon fontSize="small"  sx={{ color: "#053082" }}/>
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
          {typeof(localStorage.getItem('deviceType'))!= undefined && window.localStorage.getItem('deviceType') === 'android' ? (
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
          </Box>):<div/>}
        </Popover>
        <Avatar sx={{ backgroundColor: "#90caf9", height: 50 }} variant="rounded" aria-label="add">
          <NotificationsIcon fontSize="large" onClick={Notification} sx={{ height: 50 }} />
        </Avatar>
        {/* <ThemeSettings /> */}
      </Stack>

    </HeaderWrapper>
  );
}

export default Header;
