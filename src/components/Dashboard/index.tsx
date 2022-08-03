import { Container, Card, Avatar, Grid, useTheme, Typography, Box, Paper, CardHeader, CardContent, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import SmsIcon from '@mui/icons-material/Sms';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { getModulesPermission, getModulesPermissionsResultt, getSchoolSettings } from 'src/requests/SchoolSetting/schoolSetting';
import { ISchoolId, IgetModulesPermission, IGetScreensAccessPermissions } from 'src/interfaces/SchoolSetting/schoolSettings';

const Text = styled(Box)(({ theme }) => ({
  //  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  Leftpadding: theme.spacing(1),
  Rightpadding: theme.spacing(1),
  TextAlign: "center",
  cursor: "pointer",
  //   color: theme.palette.text.secondary
}));

function LandingPage() {
  const theme = useTheme();
  const dispatch = useDispatch()
  const GetSchoolSettingList = useSelector((state: RootState) => state.getSchoolSettings.SchoolSettingList)
  const ModulesPermission: any = useSelector((state: RootState) => state.getSchoolSettings.ModulesPermission)

  const GetScreensAccessPermissions: any = useSelector((state: RootState) => state.getModulesPermissionsResult.ModulesPermissionsResult)



  const asSchoolId = localStorage.getItem('localSchoolId');
  const RoleId = sessionStorage.getItem('RoleId');
  const userId = sessionStorage.getItem("Id");

  const body: ISchoolId = {
    "asSchoolId": asSchoolId
  }

  const body1: IgetModulesPermission = {
    "asSchoolId": "120",
    "asAcademicYearId": "8",
    "asUserId": "339",
    "abIsPreprimary": false,
    "abXseedApplicable": false
  }

  const body2: IGetScreensAccessPermissions = {
    "asSchoolId": asSchoolId,
    "asAcademicYearId": "9",
    "asUserId": userId,
    "asUserRoleId": RoleId,
    "abIsPreprimaryTeacher": false
  }


  useEffect(() => {
    dispatch(getSchoolSettings(body));

    if (RoleId == "3") {
      dispatch(getModulesPermission(body1))
    }
  }, [])

  useEffect(() => {
    dispatch(getModulesPermissionsResultt(body2))
  }, [])


  //     const classes = useStyles();
  return (
    <>
      {
        (RoleId == "3") ?

          <Container>
            <Card sx={{ marginTop: "15px", boxShadow: "1px 1px 20px " }} >
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >School</Typography>
                }
              />
              <CardContent>
                <Grid container columnSpacing={3} sx={{ marginTop: "-15px", textAlign: "center" }}>
                  {ModulesPermission.some(item => item.ModuleName === "EnableSchoolNotices" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`}>
                        <IconButton>
                          <AssignmentIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >School Notices</Text>
                    </Grid>
                    : null
                  }

                  {ModulesPermission.some(item => item.ModuleName === "EnableAnnualPlanner" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/EventOverview`}>
                        <IconButton>
                          <EventIcon fontSize="large" sx={{ color: "#26a69a" }} />
                        </IconButton>
                      </Link>
                      <Text >Annual Planner</Text>
                    </Grid> : null
                  }
                  {ModulesPermission.some(item => item.ModuleName === "EnableHoliday" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/Holidays`}>
                        <IconButton>
                          <DateRangeIcon fontSize="large" color="warning" />
                        </IconButton>
                      </Link>
                      <Text >Holidays</Text>
                    </Grid> : null
                  }

                  {(RoleId) == "3" ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/PhotoGallery`}>
                        <IconButton>
                          < PhotoIcon fontSize="large" sx={{ color: "#f06292" }} />
                        </IconButton>
                      </Link>
                      <Text  >Photo Gallery</Text>
                    </Grid> : null
                  }

                  {(RoleId) == "3" ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/VideoGallery`}>
                        <IconButton>
                          <VideoLibraryIcon fontSize="large" sx={{ color: "#ef5350" }} />
                        </IconButton>
                      </Link>
                      <Text >Video Gallery</Text>
                    </Grid> : null
                  }

                </Grid>

              </CardContent>
            </Card>



            <Card sx={{ marginTop: "20px", boxShadow: "1px 1px 20px " }}>
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >Student</Typography>
                }
              />
              <CardContent>
                <Grid container columnSpacing={3} sx={{ marginTop: "-15px", textAlign: "center" }}>
                  {ModulesPermission.some(item => item.ModuleName === "EnableStudentAttendanceModule" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/attendance`}>
                        <IconButton>
                          <EventNoteIcon fontSize="large" sx={{ color: "#00bcd4" }} />
                        </IconButton>
                      </Link>
                      <Text >Attendance</Text>
                    </Grid> : null
                  }

                  {ModulesPermission.some(item => item.ModuleName === "EnableTimetableMenuForStudentLogin" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Timetable`}>
                        <IconButton>
                          < AccessTimeIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >Timetable</Text>
                    </Grid> : null
                  }

                  {ModulesPermission.some(item => item.ModuleName === "EnableStudentFeesModule" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Fees`}>
                        <IconButton>
                          <MonetizationOnIcon fontSize="large" sx={{ color: "#81c784" }} />
                        </IconButton>
                      </Link>
                      <Text >Fees</Text>
                    </Grid> : null
                  }

                  {ModulesPermission.some(item => item.ModuleName === "EnableHomeworkModule" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Homework`}>
                        <IconButton>
                          <MenuBookIcon fontSize="large" sx={{ color: "#80cbc4" }} />
                        </IconButton>
                      </Link>
                      <Text >Homework</Text>
                    </Grid> : null
                  }

                  {ModulesPermission.some(item => item.ModuleName === "EnableChangePassword" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/ChangePassword`}>
                        <IconButton >
                          <LockOpenIcon fontSize="large" color="secondary" />
                        </IconButton>
                      </Link>
                      <Text >Change Password</Text>
                    </Grid> : null
                  }

                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ marginTop: 2, boxShadow: "1px 1px 20px " }}>
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >Exam</Typography>
                }
              />
              <CardContent>
                <Grid container spacing={3} sx={{ marginTop: "-40px", textAlign: "center" }}>

                  {ModulesPermission.some(item => item.ModuleName === "EnableSubjectTeacher" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/SubjectTeacher`}>
                        <IconButton>
                          < PeopleIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >Subject Teachers</Text>
                    </Grid> : null
                  }

                  {ModulesPermission.some(item => item.ModuleName === "EnableStudentExamSchedule" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/ExamSchedule`}>
                        <IconButton>
                          <CalendarTodayIcon fontSize="large" color="success" />
                        </IconButton>
                      </Link>
                      <Text >Exam Schedule</Text>
                    </Grid> : null
                  }

                  {ModulesPermission.some(item => item.ModuleName === "EnableProgressReport" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Progressreport`}>
                        <IconButton>
                          <AssessmentIcon fontSize="large" color="warning" />
                        </IconButton>
                      </Link>
                      <Text >Progress Report</Text>
                    </Grid> : null
                  }
                  <Grid item xs={4}>
                    <Link to={`/${location.pathname.split('/')[1]}/Student/OnlineExam`}>
                      <IconButton >
                        <BorderColorOutlinedIcon fontSize="large" color="success" />
                      </IconButton>
                    </Link>
                    <Text >Online Exam</Text>
                  </Grid>
                  <Grid item xs={4}>
                    <Link to={`/${location.pathname.split('/')[1]}/Student/OnlineExamProgressReport`}>
                      <IconButton >
                        <AssessmentOutlinedIcon fontSize="large" color="secondary" />
                      </IconButton>
                    </Link>
                    <Text >Online Exam Progress Report</Text>
                  </Grid>
                  <Grid item xs={4}>
                    <Link to={`/${location.pathname.split('/')[1]}/Student/Library`}>
                      <IconButton>
                        <HistoryEduOutlinedIcon fontSize="large" color="primary" />
                      </IconButton>
                    </Link>
                    <Text >Library</Text>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>


            <Card sx={{ marginTop: 2, marginBottom: 8, boxShadow: "1px 1px 20px " }}>
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >Communication</Typography>
                }
              />
              <CardContent>
                <Grid container spacing={3} sx={{ marginTop: "-40px", textAlign: "center" }}>

                  {ModulesPermission.some(item => item.ModuleName === "EnableMessageCenter" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`
                      }>
                        <IconButton>
                          <ForwardToInboxIcon fontSize="large" sx={{ color: "#ff7043" }} />
                        </IconButton>
                      </Link>
                      <Typography variant="body1">Massege Center</Typography>
                    </Grid> : null
                  }


                  {ModulesPermission.some(item => item.ModuleName === "EnableSMSCenter" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/smsCenter`
                      }>
                        <IconButton>
                          < SmsIcon fontSize="large" sx={{ color: "#aed581" }} />
                        </IconButton>
                      </Link>
                      <Typography variant="body1">SMS Center</Typography>
                    </Grid> : null
                  }

                  {ModulesPermission.some(item => item.ModuleName === "EnablePTAModuleforStudents" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/pta`
                      }>
                        <IconButton>
                          < PeopleIcon fontSize="large" color="info" />
                        </IconButton>
                      </Link>
                      <Typography variant="body1" >PTA</Typography>
                    </Grid> : null
                  }

                </Grid>
              </CardContent>
            </Card>
          </Container> : null
      }


      {/* //Teacher Module  */}
      {
        (RoleId == "2") ?

          <Container>

            <Card sx={{ marginTop: "15px", boxShadow: "1px 1px 20px " }} >
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >School</Typography>
                }
              />
              <CardContent>
                <Grid container columnSpacing={3} sx={{ marginTop: "-15px", textAlign: "center" }}>
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "SchoolNotices" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`}>
                        <IconButton>
                          <AssignmentIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >School Notices</Text>
                    </Grid>
                    : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "AnnualEventPlanner" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/EventOverview`}>
                        <IconButton>
                          <EventIcon fontSize="large" sx={{ color: "#26a69a" }} />
                        </IconButton>
                      </Link>
                      <Text >Annual Planner</Text>
                    </Grid> : null
                  }
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "HolidaysManagement" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/Holidays`}>
                        <IconButton>
                          <DateRangeIcon fontSize="large" color="warning" />
                        </IconButton>
                      </Link>
                      <Text >Holidays</Text>
                    </Grid> : null
                  }
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "StaffBirthday" && item.IsEnabled === false) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/StaffBirthday`}>
                        <IconButton>
                          <DateRangeIcon fontSize="large" color="warning" />
                        </IconButton>
                      </Link>
                      <Text >Staff Birthday</Text>
                    </Grid> : null
                  }

                  {(RoleId) == "2" ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/PhotoGallery`}>
                        <IconButton>
                          < PhotoIcon fontSize="large" sx={{ color: "#f06292" }} />
                        </IconButton>
                      </Link>
                      <Text  >Photo Gallery</Text>
                    </Grid> : null
                  }

                  {(RoleId) == "2" ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/VideoGallery`}>
                        <IconButton>
                          <VideoLibraryIcon fontSize="large" sx={{ color: "#ef5350" }} />
                        </IconButton>
                      </Link>
                      <Text >Video Gallery</Text>
                    </Grid> : null
                  }
                </Grid>

              </CardContent>
            </Card>



            <Card sx={{ marginTop: "20px", boxShadow: "1px 1px 20px " }}>
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >Teacher</Typography>
                }
              />
              <CardContent>
                <Grid container columnSpacing={3} sx={{ marginTop: "-15px", textAlign: "center" }}>
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "Attendance" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Teacher/TAttendance`}>
                        <IconButton>
                          <EventNoteIcon fontSize="large" sx={{ color: "#00bcd4" }} />
                        </IconButton>
                      </Link>
                      <Text >Attendance</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "ExamSchedule" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Teacher/Texamschedule`}>
                        <IconButton>
                          <CalendarTodayIcon fontSize="large" color="success" />
                        </IconButton>
                      </Link>
                      <Text >Exam Schedule</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "TeacherTimeTable" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Teacher/TeacherTimeTable`}>
                        <IconButton>
                          < AccessTimeIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >Timetable</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableStudentFeesModule" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Fees`}>
                        <IconButton>
                          <MonetizationOnIcon fontSize="large" sx={{ color: "#81c784" }} />
                        </IconButton>
                      </Link>
                      <Text >Fees</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableHomeworkModule" && item.IsEnabled === false) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Homework`}>
                        <IconButton>
                          <MenuBookIcon fontSize="large" sx={{ color: "#80cbc4" }} />
                        </IconButton>
                      </Link>
                      <Text >Homework</Text>
                    </Grid> : null
                  }

                  {/* {GetScreensAccessPermissions.some(item => item.ScreenName === "ChangePassword" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/changePassword`}>
                        <IconButton >
                          <LockOpenIcon fontSize="large" color="secondary" />
                        </IconButton>
                      </Link>
                      <Text >Change Password</Text>
                    </Grid> : null
                  } */}

                </Grid>
              </CardContent>
            </Card>

            {/* //REMOVE EXAM SECTION  */}
            {/* <Card sx={{ marginTop: 2, boxShadow: "1px 1px 20px " }}>
              <CardHeader
                title="Exam" sx={{ background: `${theme.colors.gradients.pink1}` }}
              />
              <CardContent>
                <Grid container spacing={3} sx={{ marginTop: "-40px", textAlign: "center" }}>

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableSubjectTeacher" && item.IsEnabled === false) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/SubjectTeacher`}>
                        <IconButton>
                          < PeopleIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >Subject Teachers</Text>
                    </Grid> : null
                  }

                 
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableProgressReport" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Progressreport`}>
                        <IconButton>
                          <AssessmentIcon fontSize="large" color="warning" />
                        </IconButton>
                      </Link>
                      <Text >Progress Report</Text>
                    </Grid> : null
                  }

                </Grid>
              </CardContent>
            </Card> */}


            <Card sx={{ marginTop: 2, marginBottom: 8, boxShadow: "1px 1px 20px " }}>
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >Communication</Typography>
                }
              />
              <CardContent>
                <Grid container spacing={3} sx={{ marginTop: "-40px", textAlign: "center" }}>

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "MessageCenter" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`
                      }>
                        <IconButton>
                          <ForwardToInboxIcon fontSize="large" sx={{ color: "#ff7043" }} />
                        </IconButton>
                      </Link>
                      <Typography variant="body1">Massege Center</Typography>
                    </Grid> : null
                  }


                  {GetScreensAccessPermissions.some(item => item.ScreenName === "SMSCenter" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/SmsCenter`
                      }>
                        <IconButton>
                          < SmsIcon fontSize="large" sx={{ color: "#aed581" }} />
                        </IconButton>
                      </Link>
                      <Typography variant="body1">SMS Center</Typography>
                    </Grid> : null
                  }


                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnablePTAModuleforStudents" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/pta`
                      }>
                        <IconButton>
                          < PeopleIcon fontSize="large" color="info" />
                        </IconButton>
                      </Link>
                      <Typography variant="body1" >PTA</Typography>
                    </Grid> : null
                  }

                </Grid>
                
              </CardContent>
            </Card>
          </Container> : null
      }


      {/* //Admin Module  */}

      {
        (RoleId == "6") ?

          <Container>

            <Card sx={{ marginTop: "15px", boxShadow: "1px 1px 20px " }} >
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >School</Typography>
                }
              />
              <CardContent>
                <Grid container columnSpacing={3} sx={{ marginTop: "-15px", textAlign: "center" }}>
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "SchoolNotices" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/schoolnotice`}>
                        <IconButton>
                          <AssignmentIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >School Notices</Text>
                    </Grid>
                    : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "AnnualEventPlanner" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/EventOverview`}>
                        <IconButton>
                          <EventIcon fontSize="large" sx={{ color: "#26a69a" }} />
                        </IconButton>
                      </Link>
                      <Text >Annual Planner</Text>
                    </Grid> : null
                  }
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "HolidaysManagement" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/Holidays`}>
                        <IconButton>
                          <DateRangeIcon fontSize="large" color="warning" />
                        </IconButton>
                      </Link>
                      <Text >Holidays</Text>
                    </Grid> : null
                  }
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "StaffBirthday" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/StaffBirthday`}>
                        <IconButton>
                          <DateRangeIcon fontSize="large" color="warning" />
                        </IconButton>
                      </Link>
                      <Text >Staff Birthday</Text>
                    </Grid> : null
                  }

                  {(RoleId) == "6" ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/PhotoGallery`}>
                        <IconButton>
                          < PhotoIcon fontSize="large" sx={{ color: "#f06292" }} />
                        </IconButton>
                      </Link>
                      <Text  >Photo Gallery</Text>
                    </Grid> : null
                  }

                  {(RoleId) == "6" ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/VideoGallery`}>
                        <IconButton>
                          <VideoLibraryIcon fontSize="large" sx={{ color: "#ef5350" }} />
                        </IconButton>
                      </Link>
                      <Text >Video Gallery</Text>
                    </Grid> : null
                  }

                </Grid>

              </CardContent>
            </Card>


            {/* <Card sx={{ marginTop: "20px", boxShadow: "1px 1px 20px " }}>
              <CardHeader
                title="Admin" sx={{ background: `${theme.colors.gradients.pink1}` }}
              />
              <CardContent>
                <Grid container columnSpacing={3} sx={{ marginTop: "-15px", textAlign: "center" }}>
                  {GetScreensAccessPermissions.some(item => item.ScreenName === "Attendance" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/attendance`}>
                        <IconButton>
                          <EventNoteIcon fontSize="large" sx={{ color: "#00bcd4" }} />
                        </IconButton>
                      </Link>
                      <Text >Attendance</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableTimetableMenuForStudentLogin" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Timetable`}>
                        <IconButton>
                          < AccessTimeIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >Timetable</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableStudentFeesModule" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Fees`}>
                        <IconButton>
                          <MonetizationOnIcon fontSize="large" sx={{ color: "#81c784" }} />
                        </IconButton>
                      </Link>
                      <Text >Fees</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableHomeworkModule" && item.IsEnabled === false) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Homework`}>
                        <IconButton>
                          <MenuBookIcon fontSize="large" sx={{ color: "#80cbc4" }} />
                        </IconButton>
                      </Link>
                      <Text >Homework</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "ChangePassword" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/changePassword`}>
                        <IconButton >
                          <LockOpenIcon fontSize="large" color="secondary" />
                        </IconButton>
                      </Link>
                      <Text >Change Password</Text>
                    </Grid> : null
                  }

                </Grid>
              </CardContent>
            </Card> */}

            {/* <Card sx={{ marginTop: 2, boxShadow: "1px 1px 20px " }}>
              <CardHeader
                title="Exam" sx={{ background: `${theme.colors.gradients.pink1}` }}
              />
              <CardContent>
                <Grid container spacing={3} sx={{ marginTop: "-40px", textAlign: "center" }}>

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableSubjectTeacher" && item.IsEnabled === false) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/SubjectTeacher`}>
                        <IconButton>
                          < PeopleIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Text >Subject Teachers</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "ExamSchedule" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/ExamSchedule`}>
                        <IconButton>
                          <CalendarTodayIcon fontSize="large" color="success" />
                        </IconButton>
                      </Link>
                      <Text >Exam Schedule</Text>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnableProgressReport" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/Progressreport`}>
                        <IconButton>
                          <AssessmentIcon fontSize="large" color="warning" />
                        </IconButton>
                      </Link>
                      <Text >Progress Report</Text>
                    </Grid> : null
                  }

                </Grid>
              </CardContent>
            </Card> */}

            <Card sx={{ marginTop: 2, marginBottom: 8, boxShadow: "1px 1px 20px " }}>
              <CardHeader sx={{ background: `${theme.colors.gradients.pink1}`, height: "50px" }}
                title={
                  <Typography sx={{ fontSize: "17px", fontWeight: "bold" }} >Communication</Typography>
                }
              />
              <CardContent>
                <Grid container spacing={3} sx={{ marginTop: "-40px", textAlign: "center" }}>

                  {GetScreensAccessPermissions.some(item => item.ScreenName === 'Message Center' && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/MessageCenter/msgCenter`
                      }>
                        <IconButton>
                          <ForwardToInboxIcon fontSize="large" sx={{ color: "#ff7043" }} />
                        </IconButton>
                      </Link>
                      <Typography variant="body1">Massege Center</Typography>
                    </Grid> : null
                  }


                  {GetScreensAccessPermissions.some(item => item.ScreenName === "SMS Center" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/SMSCenter/smsCenter`
                      }>
                        <IconButton>
                          < SmsIcon fontSize="large" sx={{ color: "#aed581" }} />
                        </IconButton>
                      </Link>
                      <Typography variant="body1">SMS Center</Typography>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "TeacherTimeTable" && item.IsEnabled === true) ?
                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Student/TeacherTimeTable`
                      }>
                        <IconButton>
                          < AccessTimeIcon fontSize="large" color="primary" />
                        </IconButton>
                      </Link>
                      <Typography variant="body1">Teacher TimeTable</Typography>
                    </Grid> : null
                  }

                  {GetScreensAccessPermissions.some(item => item.ScreenName === "EnablePTAModuleforStudents" && item.IsEnabled === true) ?

                    <Grid item xs={4}>
                      <Link to={`/${location.pathname.split('/')[1]}/Common/pta`
                      }>
                        <IconButton>
                          < PeopleIcon fontSize="large" color="info" />
                        </IconButton>
                      </Link>
                      <Typography variant="body1" >PTA</Typography>
                    </Grid> : null
                  }

                </Grid>
              </CardContent>
            </Card>
          </Container> : null
      }

    </>
  )
}

export default LandingPage
