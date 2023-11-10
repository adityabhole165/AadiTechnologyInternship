import { useEffect, useState } from 'react'
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import List26 from '../../libraries/list/List26'
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import { Box, Container, Grid, Avatar, Typography, Hidden } from '@mui/material'
import { getStandard, GetSaveAttendanceStatus, GetStudentList, setSaveResponse } from 'src/requests/TAttendance/TAttendance';
import ITAttendance, { IStudentsDetails } from 'src/interfaces/Teacher/TAttendance';
import { IGetAttendanceStatus, ISaveAttendance } from "src/interfaces/Teacher/TAttendanceList";
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

const TAttendance = () => {
   
    const ItemList = [
        {id:1 , Name:"1" ,value:1 , IsActive:false, category:"1" ,categoryName:"Holiday"},
        {id:2 , Name:"2" ,value:2, IsActive:false , category:"3" ,categoryName:"Present"},
        {id:3 , Name:"3" ,value:3, IsActive:false,category:"3" ,categoryName:"Present"}, 
        {id:4, Name:"4" , value:4 ,IsActive:false,category:"3" ,categoryName:"Present"},
        {id:5 , Name:"5" ,value:5 , IsActive:false ,category:"3" ,categoryName:"Present"},
        {id:6 , Name:"6" ,value:0, IsActive:false ,category:"2",categoryName:"Weekend"} ,
        {id:7 ,value:0, Name:"7",IsActive:false,category:"2" ,categoryName:"Weekend"},
        {id:8 ,value:8, Name:"8",IsActive:false,category:"3" ,categoryName:"Present"},
        {id:9 ,value:9, Name:"9",IsActive:false,category:"3" ,categoryName:"Present"},
        {id:10 ,value:10, Name:"10",IsActive:false,category:"4" ,categoryName:"Absent"},
        {id:11 ,value:11, Name:"11",IsActive:false,category:"5" ,categoryName:"Attendance Unavailable"},
        {id:12 ,value:12, Name:"12",IsActive:false,category:"5",categoryName:"Attendance Unavailable"},
        {id:13 ,value:0, Name:"13",IsActive:false,category:"2" ,categoryName:"Weekend"},
        {id:14 ,value:0, Name:"14",IsActive:false,category:"2" ,categoryName:"Weekend"},
        {id:15,value:15, Name:"15",IsActive:false,category:"3" ,categoryName:"Present"},
        {id:16 ,value:16, Name:"16",IsActive:false,category:"3" ,categoryName:"Present"},
        {id:17 ,value:17, Name:"17",IsActive:false,category:"3",categoryName:"Present"},
        {id:18 ,value:18, Name:"18",IsActive:false,category:"3",categoryName:"Present"},
        {id:19 ,value:19, Name:"19",IsActive:false,category:"3",categoryName:"Present"},
        {id:20 ,value:0, Name:"20",IsActive:false,category:"2",categoryName:"Weekend"},
        {id:21 ,value:0, Name:"21",IsActive:false,category:"2",categoryName:"Weekend"},
        {id:22 ,value:22, Name:"22",IsActive:false,category:"3" ,categoryName:"Present"},
        {id:23, value:23, Name:"23",IsActive:false,category:"3" ,categoryName:"Present"},
        {id:24 ,value:24, Name:"24",IsActive:false,category:"3",categoryName:"Present"},
        {id:25 ,value:25, Name:"25",IsActive:false,category:"3",categoryName:"Present"},
        {id:26 ,value:26, Name:"26",IsActive:false,category:"3",categoryName:"Present"},
        {id:27 ,value:27, Name:"27",IsActive:false,category:"2",categoryName:"Weekend"},
        {id:28 ,value:28, Name:"28",IsActive:false,category:"2",categoryName:"Weekend"},
        {id:29, value:29, Name:"29",IsActive:false,category:"1",categoryName:"Hoilday"},
        {id:30 ,value:30, Name:"30",IsActive:false,category:"4",categoryName:"Absent"},
        {id:31 ,value:0, Name:"31",IsActive:false,category:"4",categoryName:"Absent"},]

        const [ItemList1 , setItemList1]=useState(ItemList)

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


    const [attanStatus, setAttenStatus] = useState();


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
        dispatch(GetStudentList(GetStudentDetails));
    }, [Standardid, assignedDate]);

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
        }
    }, [saveResponseMessage]);

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


    const ClickItemList=(value)=>{
        const GetStudentDetails: IStudentsDetails = {
               asStdDivId: asStandardDivisionId,               //write
               asDate:value,
               asAcademicYearId: asAcademicYearId,
               asSchoolId: asSchoolId
           };
           dispatch(GetStudentList(GetStudentDetails));
           setAssignedDate(value)
    }
    const ClickDate = (value) => {
        setAssignedDate(value)
    }

    return (
        <Container maxWidth={'xl'}>

            <PageHeader heading="Attendance" subheading=''></PageHeader>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                {stdlist.length > 1 ? <Dropdown Array={stdlist} handleChange={handleChange} label='Select Class' defaultValue={Standardid}></Dropdown> : <span><b>Class : </b>{singleStdName}</span>}
            <br />
            <br />

            <Box sx={{ display: onlySelectedClass }}>
                <DateSelector date={assignedDate} setCurrentDate={getCurrentDate} Close={getCurrentDate} ></DateSelector>
                <ErrorDetail>{AttendanceStatus}</ErrorDetail>
                <Box sx={{ display: AYStatus }}>
                    <TextField
                        variant="standard"
                        fullWidth
                        label='Absent Roll Numbers'
                        value={StudentAbsent}></TextField><br></br>
                    <br></br>
                    <Grid container spacing={0.5}>
                        <Grid item xs={3.5}>
                            <ButtonPrimary onClick={SaveMsg} fullWidth>Save</ButtonPrimary>
                        </Grid><Grid item xs={5}>
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
                    </Grid>
                    <List26 Dataa={RollNoList} getAbsetNumber={getAbsetNumber} assignedDate={assignedDate}></List26>
                </Box>
            </Box>
                </Grid>
                <Hidden mdDown>
                <Grid item md={6} >
                {/* <AttandaceHalf ItemList={ItemList1} ClickItemList={ClickItemList}/> */}
                {/* <AttendanceCalendar DefaultDate={assignedDate} ClickDate={ClickDate}/> */}
                </Grid>
                </Hidden>
              
            </Grid>
      
        </Container>
    )
}

export default TAttendance