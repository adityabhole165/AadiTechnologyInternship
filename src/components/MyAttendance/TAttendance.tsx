import { useEffect, useState } from 'react'
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import List26 from '../../libraries/list/List26'
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import { Box, Container, Grid, Avatar } from '@mui/material'
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

const TAttendance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { AssignedDate, StandardId } = useParams();
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    let asTeacherId = "0"
    let IsClassTeacher = sessionStorage.getItem("IsClassTeacher")
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
        console.log(body)
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

    return (
        <Container >

            <PageHeader heading="Attendance" subheading=''></PageHeader>
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
        </Container>
    )
}

export default TAttendance