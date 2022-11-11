import { useEffect, useState } from 'react'
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import List26 from '../../libraries/list/List26'
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import { Box, Container, Grid } from '@mui/material'
import { getStandard, GetSaveAttendanceStatus, GetStudentList, setSaveResponse, GetStudentDetailsList } from 'src/requests/TAttendance/TAttendance';
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
    const asTeacherId = sessionStorage.getItem('TeacherId');
    const [Standardid, setStandardid] = useState<string>();
    const [assignedDate, setAssignedDate] = useState<string>();
    const [onlySelectedClass, setOnlySelectedClass] = useState('none');
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
        getCurrentDate(new Date);
        if(AssignedDate != undefined || StandardId!= undefined){
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

            <Dropdown Array={stdlist} handleChange={handleChange} label='Select Class' defaultValue={Standardid}></Dropdown>
            <br />
            <br />

            <Box sx={{ display: onlySelectedClass }}>
                <DateSelector date={assignedDate} setCurrentDate={getCurrentDate} Close={getCurrentDate} ></DateSelector>
                <ErrorDetail>{AttendanceStatus}</ErrorDetail>
                <Box sx={{ display: AYStatus }}>
                    <TextField
                        variant="standard"
                        fullWidth
                        label='Absent Roll Number'
                        value={StudentAbsent}></TextField><br></br>
                    <br></br>
                    <Grid container spacing={0.5}>
                        <Grid item xs={4}>
                            <ButtonPrimary onClick={SaveMsg} fullWidth>Save</ButtonPrimary>
                        </Grid><Grid item xs={4}>
                            <ButtonPrimary color='secondary'
                                onClick={() => clickNav('Tview/' + assignedDate + '/' + Standardid)} fullWidth endIcon={<VisibilityIcon sx={{ fontSize: 90 ,ml:"-8px"}} />}>
                                Attendance 
                            </ButtonPrimary>
                        </Grid><Grid item xs={4}>
                            <ButtonPrimary color='secondary'
                                onClick={() => clickNav('MissingAttandence/' + assignedDate +'/' + Standardid)} fullWidth>
                                Missing Attendance
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