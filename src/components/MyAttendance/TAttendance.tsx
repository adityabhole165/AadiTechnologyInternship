import { useEffect, useState } from 'react'
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import List26 from '../../libraries/list/List26'
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import { Box, Container, Grid, Avatar, Typography, Hidden, Card, Link } from '@mui/material'
import { getStandard, GetSaveAttendanceStatus, GetStudentList, setSaveResponse } from 'src/requests/TAttendance/TAttendance';
import ITAttendance, { IStudentsDetails } from 'src/interfaces/Teacher/TAttendance';
import { IGetAttendanceStatus, ISaveAttendance } from "src/interfaces/Teacher/TAttendanceList";
import { IGetSummaryCountforAttendanceBody, IDeleteAttendanceBody } from "src/interfaces/Teacher/TAttendanceList";
import { CDASummaryCountforAttendanceBody, CDADeleteAttendance, CDAresetDeleteAttendance } from "src/requests/TAttendance/TAttendance"
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { TextField } from '@mui/material'
import PageHeader from 'src/libraries/heading/PageHeader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getDateFormatted } from '../Common/Util'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Calender1 } from '../Attendance/Calender';
import Calendar from 'react-calendar';
import { ListStyle } from 'src/libraries/styled/CardStyle';
import AttandaceHalf from './AttendanceHalf';
import AttendanceCalendar from './AttendanceCalendar';
import TableAttendace from 'src/libraries/ResuableComponents/TableAttendace';
import CardCalender from 'src/libraries/ResuableComponents/CardCalender';
import DotLegendTeacher from 'src/libraries/summary/DotLegendTeacher';
import DotLegendAttandaceCalender from 'src/libraries/summary/DotLegendAttandaceCalender';
import CardCalender1 from 'src/libraries/ResuableComponents/CardCalender1';

import { Styles } from 'src/assets/style/student-style';
const TAttendance = () => {
    const HeaderArray = [
        { Id: 1, Header: '' },
        { Id: 2, Header: 'Boys' },
        { Id: 3, Header: 'Girls' },
        { Id: 4, Header: 'Total' }


    ];

    const HeaderPublish = [
        { Id: 1, Header: "Sun" }, { Id: 2, Header: "Mon" }, { Id: 3, Header: "Tue" }
        , { Id: 4, Header: "Wed" }
        , { Id: 5, Header: "Thu" },
        { Id: 6, Header: "Fri" },
        { Id: 7, Header: "Sat" },

    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { AssignedDate, StandardId } = useParams();
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    let asTeacherId = "0"
    let IsClassTeacher = sessionStorage.getItem("IsClassTeacher")
    const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
    const [Standardid, setStandardid] = useState<string>();

    const [assignedDate, setAssignedDate] = useState<string>();

    const [onlySelectedClass, setOnlySelectedClass] = useState('none');
    const [singleStdName, setSingleStdName] = useState('');

    const [AttendanceDate, setAttendanceDate] = useState(
        new Date().toISOString()
    );
    const [asUserId, SetUserId] = useState();


    // Date selector Start
    const [asAbsentRollNos, setAbsentRollNos] = useState('');
    const [asAllPresentOrAllAbsent, setAllPresentOrAllAbsent] = useState('');

    const stdlist: any = useSelector(
        (state: RootState) => state.StandardAttendance.stdlist
    );



    const RollNoList = useSelector(
        (state: RootState) => state.AttendanceList.StudentList
    );
    const StudentAbsent = useSelector(
        (state: RootState) => state.AttendanceList.StudentAbsent
    );
    const AttendanceStatus = useSelector(
        (state: RootState) => state.AttendanceList.AttendanceStatus
    );



    const saveResponseMessage = useSelector(
        (state: RootState) => state.AttendanceList.SaveResponse
    );


    let AYStatus = useSelector(
        (state: RootState) => state.AttendanceList.AYStatus
    );

    const SummaryCountforAttendance = useSelector(
        (state: RootState) =>
            state.AttendanceList.ISGetSummaryCountforAttendance
    );


    const listAttendanceCalender = useSelector(
        (state: RootState) => state.AttendanceList.listAttendanceCalender
    );


    const DeleteAttendance = useSelector(
        (state: RootState) => state.AttendanceList.DeleteAttendance
    );


    const GetStudentDetails: IStudentsDetails = {
        asStdDivId: Standardid,
        asDate: assignedDate,
        asAcademicYearId: asAcademicYearId,
        asSchoolId: asSchoolId
    };

    const getAttendanceStatus: IGetAttendanceStatus = {
        asStanardDivisionId: Standardid,
        asAttendanceDate: assignedDate,
        asAcademicYearId: asAcademicYearId,
        asSchoolId: asSchoolId
    };

    const GetSaveStudentAttendance: ISaveAttendance = {
        asStandardDivisionId: Standardid,
        asDate: assignedDate,
        asAcademicYearId: asAcademicYearId,
        asSchoolId: asSchoolId,
        asAbsentRollNos: asAbsentRollNos,
        asAllPresentOrAllAbsent: asAllPresentOrAllAbsent,
        asUserId: asTeacherId
    };
    const SummaryCountforAttendanceBody: IGetSummaryCountforAttendanceBody =
    {
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId),
        asStandardDivisionId: Number(asStandardDivisionId),
        asAttendanceDate: (assignedDate),
        asUserId: asUserId
    };


    const DeleteAttendanceBody: IDeleteAttendanceBody =
    {
        asSchoolId: Number(asSchoolId),
        asAttendanceDate: (assignedDate),
        asAcademicYearId: Number(asAcademicYearId),
        asStdDivId: Number(asStandardDivisionId),
    }







    useEffect(() => {
        const ScreensAccessPermission = JSON.parse(sessionStorage.getItem("ScreensAccessPermission"))
        let IsFullAccess = "N"

        let teacherId = sessionStorage.getItem('TeacherId')
        let className = sessionStorage.getItem('ClassName')
        ScreensAccessPermission.map((item) => {
            if (item.ScreenName === "Attendance")
                IsFullAccess = item.IsFullAccess
        })
        if ((IsClassTeacher == "Y") && className.length > 1 && (IsFullAccess != "Y"))
            asTeacherId = teacherId != null && teacherId != "" ? teacherId : "0";
        const body: ITAttendance = {
            asSchoolId: asSchoolId,
            asAcademicyearId: asAcademicYearId,
            asTeacherId: asTeacherId
        };
        dispatch(getStandard(body));
        getCurrentDate(new Date);
        if (AssignedDate != undefined || StandardId != undefined) {
            setStandardid(StandardId);
            setAssignedDate(AssignedDate);
            setOnlySelectedClass('');
        }
    }, []);

    useEffect(() => {
        popupateDate()
        if (assignedDate != undefined) {
            dispatch(GetStudentList(GetStudentDetails));
            dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody))

        }
    }, [Standardid, assignedDate]);






    const ClickDeleteAttendance = () => {
        if (window.confirm('Are you sure you want to delete attendance of date  : ' + assignedDate)) {
            dispatch(CDADeleteAttendance(DeleteAttendanceBody))

        }
    }











    const getCurrentDate = (newDate?: Date) => {
        setAssignedDate(getDateFormatted(newDate));
    };

    const popupateDate = () => {
        if (Standardid !== undefined) {
            dispatch(GetStudentList(GetStudentDetails));
            let arr = []
            RollNoList.map((obj) => {
                if (!obj.isActive)
                    arr.push(obj.text1)
            })
        }

    }
    const handleChange = (value) => {
        if (value != 'Select Class') {
            setStandardid(value);
            setOnlySelectedClass('');
        }
        else {
            setOnlySelectedClass('none');
        }
    }

    const getAbsetNumber = (value) => {
        if (value === '')
            setAllPresentOrAllAbsent('P')
        if (value.split(',').length === RollNoList.length)
            setAllPresentOrAllAbsent('N')
        else
            setAllPresentOrAllAbsent('')
        setAbsentRollNos(value)
    }

    const SaveAttendance = () => {
        const GetSaveStudentAttendance: ISaveAttendance = {
            asStandardDivisionId: Standardid,
            asDate: assignedDate,
            asAcademicYearId: asAcademicYearId,
            asSchoolId: asSchoolId,
            asAbsentRollNos: asAbsentRollNos,
            asAllPresentOrAllAbsent: asAllPresentOrAllAbsent,
            asUserId: asTeacherId
        };
        dispatch(GetSaveAttendanceStatus(GetSaveStudentAttendance));



    }

    useEffect(() => {
        if (saveResponseMessage != '') {
            toast.success(saveResponseMessage);
            dispatch(setSaveResponse());
            dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody))


        }
    }, [saveResponseMessage]);



    useEffect(() => {
        if (DeleteAttendance != '') {
            toast.success('Attendance deleted successfully!')
            dispatch(CDAresetDeleteAttendance());
            dispatch(CDASummaryCountforAttendanceBody(SummaryCountforAttendanceBody))
        }
    }, [DeleteAttendance]);






    useEffect(() => {

        if (stdlist.length == 1) {
            setSingleStdName(stdlist[0].Name);
            setStandardid(stdlist[0].Value);
            setOnlySelectedClass('');
        }
    }, [stdlist]);
    const SaveMsg = () => {

        if (AttendanceStatus == "Selected date is holiday." || AttendanceStatus == "Selected date is weekend.") {
            if (!confirm('Are you sure to mark Attendance on selected weekend/holiday?')) {
                setAbsentRollNos('');
                return null;
            }
        }
        SaveAttendance()
    }
    const clickNav = (value) => {
        navigate(`/${location.pathname.split('/')[1]}/Teacher/TAttendance/` + value)
    }
    const ClickItemList = (value) => {
        const GetStudentDetails: IStudentsDetails = {
            asStdDivId: asStandardDivisionId,
            asDate: value,
            asAcademicYearId: asAcademicYearId,
            asSchoolId: asSchoolId
        };
        dispatch(GetStudentList(GetStudentDetails));
        setAssignedDate(value)



    }

    const ClickItem = (value) => {

        setAssignedDate(value)
    }

    const ClickNavigate = () => {
        navigate('/extended-sidebar/Teacher/SchoolAttendanceOverview')
    }
    const classes = Styles();
    return (
        <Container maxWidth={'xl'}>

            <PageHeader heading="Attendance" subheading=''></PageHeader>
            <Hidden mdDown>
                <Card sx={{ backgroundColor: "#b2dfdb", marginBottom: "10px" }}>

                    <Box sx={{ textAlign: "center", color: "blue" }} p={0.5}>
                        <Link href={"/extended-sidebar/Teacher/SchoolAttendanceOverview"} style={{ borderBottom: "2px solid green", textDecoration: "none" }}>School Attendace Overview</Link>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: "center" }} mb={1}>
                        <Card sx={{ backgroundColor: "green", padding: "5px" }}>Count :</Card>
                        <Card sx={{ backgroundColor: "green", padding: "5px", ml: "4px" }}> {SummaryCountforAttendance?.TotalStudents} </Card>

                    </Box>

                </Card>
            </Hidden>
            <Hidden mdDown>
                <Grid container spacing={2}>
                    <Grid item xs={5} />
                    <Grid item xs={1}>
                        <ButtonPrimary onClick={SaveMsg} fullWidth>Save</ButtonPrimary>

                    </Grid>

                    <Grid item xs={1}>
                        <ButtonPrimary color='error' onClick={() => ClickDeleteAttendance()} fullWidth > Delete  </ButtonPrimary>
                    </Grid>

                </Grid>

            </Hidden>
           
            <Hidden mdDown>
                <Card component={Box} p={1} mt={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <ButtonPrimary>Individual Attendace</ButtonPrimary>
                    <ButtonPrimary sx={{ ml: "10px" }}> Monthwise  Attendace</ButtonPrimary>
                    <TextField sx={{ ml: "10px" }} />
                </Card>

            </Hidden>
            <Hidden mdDown>
            <ErrorDetail sx={{mt:"10px"}}>{AttendanceStatus}</ErrorDetail>
            </Hidden>
            
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {stdlist.length > 1 ? <Dropdown Array={stdlist} handleChange={handleChange} label='Select Class' defaultValue={Standardid}></Dropdown> : <Hidden mdUp> <span><b>Class : </b>{singleStdName}</span></Hidden>}
                    <br />
                    <br />

                    <Box sx={{ display: onlySelectedClass }}>
                        <Hidden mdUp>
                            <DateSelector date={assignedDate} setCurrentDate={getCurrentDate} Close={getCurrentDate} ></DateSelector>
                        </Hidden>
                        <Hidden mdUp>
                        <ErrorDetail>{AttendanceStatus}</ErrorDetail>
                        </Hidden>
                        <Box sx={{ display: AYStatus }}>
                            <Hidden mdUp>
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    label='Absent Roll Numbers'
                                    value={StudentAbsent}></TextField>
                                <br></br>
                            </Hidden>
                            <br></br>
                        
                            <Grid container spacing={0.5}>
                                <Hidden mdUp>

                                    <Grid item xs={3.5} md={3}>
                                        <ButtonPrimary onClick={SaveMsg} fullWidth>Save</ButtonPrimary>

                                    </Grid>
                                    <Hidden mdDown>
                                    <Grid item xs={3}>
                                        <ButtonPrimary color='error' onClick={() => ClickDeleteAttendance()} fullWidth > Delete  </ButtonPrimary>
                                    </Grid>
                                </Hidden>

                           
                                    <Grid item xs={5}>
                                        <ButtonPrimary color='secondary'
                                            onClick={() => clickNav('Tview/' + assignedDate + '/' + Standardid)} fullWidth endIcon={<VisibilityIcon sx={{ fontSize: 180, ml: "-6px" }} />}>
                                            Attendance
                                        </ButtonPrimary>
                                    </Grid><Grid item xs={3.5}>
                                        <ButtonPrimary color='secondary'
                                            onClick={() => clickNav('MissingAttandence/' + assignedDate + '/' + Standardid)} fullWidth endIcon={<Avatar sx={{ width: 22, height: 20, ml: "-8px", filter: " brightness(0) invert(1) " }}
                                                src={
                                                    "/imges/missingA.png"
                                                }
                                            />}>
                                            Missing
                                        </ButtonPrimary>
                                    </Grid>
                                </Hidden>
                            </Grid>
                           
                            <Box className={classes.Attandance}>
                            <List26 Dataa={RollNoList} getAbsetNumber={getAbsetNumber} assignedDate={assignedDate}></List26>
                            </Box>
                          
                           
                            
                        </Box>
                    </Box>
                </Grid>

                <Hidden mdDown>
                    <Grid item md={6} >
                        <Grid container>
                            <Card component={Box} p={2} mt={4.5}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <DotLegendAttandaceCalender color="primary" text="Done " />
                                        <DotLegendAttandaceCalender color="info" text="Not Done" />
                                        <DotLegendAttandaceCalender color="Holiday" text="Holiday" />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <DotLegendAttandaceCalender color="Warning" text="Weekend" />
                                        <DotLegendAttandaceCalender color="Suceess" text="OutSideAcadamicYear" />

                                    </Grid>
                                </Grid>


                                <CardCalender1 ItemList={listAttendanceCalender} ClickItem={ClickItem}
                                    formattedDate={assignedDate} DefaultValue ArrayList={HeaderPublish} />
                            </Card>


                        </Grid>
                        <br></br>

                        {SummaryCountforAttendance != null &&
                            <TableAttendace ItemList={SummaryCountforAttendance.GetSummaryCountList} HeaderArray={HeaderArray} />}

                    </Grid>
                </Hidden>
            </Grid>

        </Container>
    )
}

export default TAttendance
