import { useEffect, useState } from 'react'
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import List26 from '../../libraries/list/List26'
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import { Container, Grid } from '@mui/material'
import GetTAttendanceListApi from 'src/api/TAttendance/TAttendance';
import { getStandard, GetSaveAttendanceStatus, GetStudentList, GetAttendanceStatus, GetStudentDetailsList } from 'src/requests/TAttendance/TAttendance';
import ITAttendance, { IStudentsDetails } from 'src/interfaces/Teacher/TAttendance';
import { IGetAttendanceStatus, ISaveAttendance } from "src/interfaces/Teacher/TAttendanceList";
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { TextField } from '@mui/material'
import PageHeader from 'src/libraries/heading/PageHeader';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const TAttendance = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asTeacherId = sessionStorage.getItem('TeacherId');
    const [Standardid, setStandardid] = useState();
    const [StandardId, setStandardId] = useState();
    const [assignedDate, setAssignedDate] = useState<string>();
    const [calanderSelected, setcalanderSelected] = useState(false);
    const [CalanderDate, setCalanderDate] = useState("");
    // Date selector Start
    const [date, setDate] = useState({ selectedDate: '' });
    const [asAbsentRollNos, setAbsentRollNos] = useState('');
    const [asAllPresentOrAllAbsent, setAllPresentOrAllAbsent] = useState('');
    const [activateButton, setActivateButton] = useState(false);
    const [absentText, setAbsentText] = useState('warning');
    console.log(date)


    const stdlist: any = useSelector(
        (state: RootState) => state.StandardAttendance.stdlist
    );
    const RollNoList = useSelector(
        (state: RootState) => state.AttendanceList.StudentList
    );
    // const RollNoList2 = useSelector(
    //     (state: RootState) => state.AttendanceList.GetStudentDetailsList
    // );
    const StudentAbsent = useSelector(
        (state: RootState) => state.AttendanceList.StudentAbsent
    );
    const AttendanceStatus = useSelector(
        (state: RootState) => state.AttendanceList.AttendanceStatus
    );
    const saveResponseMessage = useSelector(
        (state: RootState) => state.AttendanceList.SaveResponse
    );


    const body: ITAttendance = {
        asSchoolId: asSchoolId,
        asAcademicyearId: asAcademicYearId,
        asTeacherId: asTeacherId
    };

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
        dispatch(getStandard(body));
        getCurrentDate();

    }, []);

    useEffect(() => {
        popupateDate()
    }, [Standardid, assignedDate]);

    const getCurrentDate = (newDate?: Date) => {
        const date = newDate || new Date();
        const Day = new Date(date).getDate();
        const Month = new Date(date).toLocaleString('default', { month: 'short' });
        const Year = new Date(date).getFullYear();
        const NewDateFormat = `${Day}-${Month}-${Year}`;
        setDate({
            selectedDate: NewDateFormat
        });
        setAssignedDate(NewDateFormat);
        setcalanderSelected(false);
        setCalanderDate(NewDateFormat);
    };
   
    const popupateDate = () => {
        if (Standardid !== undefined) {
            dispatch(GetStudentList(GetStudentDetails));
            let arr = []
            RollNoList.map((obj) => {
                if (!obj.isActive)
                    arr.push(obj.text1)
            })
            setAbsentText(arr.join(','))
            // dispatch(GetAttendanceStatus(getAttendanceStatus));
        }
    }

    const handleChange = (value) => {
        setStandardid(value);
    }

    const getAbsetNumber = (value) => {

        setActivateButton(true)
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
        if (saveResponseMessage != '')
            toast.success(saveResponseMessage);
    }, [saveResponseMessage]);

    const SaveMsg = () => {
        if (AttendanceStatus == "Selected date is Holiday.") {
            if (!confirm('Selected date is Holiday')) {
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
        <Container sx={{ paddingLeft: '25px' }}>

            <PageHeader heading="Attendance" subheading=''></PageHeader>

            <Dropdown Array={stdlist} handleChange={handleChange}></Dropdown>
<br/>
 <br/>           <DateSelector date={date.selectedDate} setCurrentDate={getCurrentDate} Close={getCurrentDate} ></DateSelector>

            <ErrorDetail>{AttendanceStatus}</ErrorDetail>

            <TextField
                variant="standard"
                fullWidth
                label='Absent Roll Number'
                value={StudentAbsent}></TextField><br></br>
            <br></br>
            <Grid container>
                <Grid item xs={3}>
                    <ButtonPrimary onClick={SaveMsg}>Save</ButtonPrimary>
                </Grid><Grid item xs={3}>
                    <ButtonPrimary color='secondary'
                        onClick={() => clickNav('Tview/' + assignedDate + '/' + StandardId)}>
                        TView
                    </ButtonPrimary>
                </Grid><Grid item xs={6}>
                    <ButtonPrimary color='secondary'
                        onClick={() => clickNav('MissingAttandence/' + assignedDate)}>
                        Missing Attendance
                    </ButtonPrimary>
                </Grid>
            </Grid>
            <List26 Dataa={RollNoList} getAbsetNumber={getAbsetNumber} assignedDate={assignedDate}></List26>

        </Container>
    )
}

export default TAttendance