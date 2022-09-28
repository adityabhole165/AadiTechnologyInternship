import { useEffect, useState } from 'react'
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import List26 from '../../libraries/list/List26'
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import { Container } from '@mui/material'
import GetTAttendanceListApi from 'src/api/TAttendance/TAttendance';
import { getStandard, GetSaveAttendanceStatus, GetStudentList, GetAttendanceStatus, GetStudentDetailsList } from 'src/requests/TAttendance/TAttendance';
import ITAttendance, { IStudentsDetails } from 'src/interfaces/Teacher/TAttendance';
import { IGetAttendanceStatus, ISaveAttendance } from "src/interfaces/Teacher/TAttendanceList";
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { TextField } from '@mui/material'
import PageHeader from 'src/libraries/heading/PageHeader';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';



const TAttendance = () => {
    const dispatch = useDispatch();


    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asTeacherId = sessionStorage.getItem('TeacherId');
    const [Standardid, setStandardid] = useState();
    const [StandardId, setStandardId] = useState();
    const [assignedDate, setAssignedDate] = useState<string>();
    // Date selector Start
    const [date, setDate] = useState({ selectedDate: '' });
    const [asAbsentRollNos, setAbsentRollNos] = useState('');
    const [asAllPresentOrAllAbsent, setAllPresentOrAllAbsent] = useState('');
    const [activateButton, setActivateButton] = useState(false);
    const [absentText, setAbsentText] = useState('warning');
console.log("Standardid",Standardid);

    const stdlist: any = useSelector(
        (state: RootState) => state.StandardAttendance.stdlist
    );
    const RollNoList = useSelector(
        (state: RootState) => state.AttendanceList.StudentList
    );
    const RollNoList2 = useSelector(
        (state: RootState) => state.AttendanceList.GetStudentDetailsList
    );
    const StudentAbsent = useSelector(
        (state: RootState) => state.AttendanceList.StudentAbsent
    );
    const AttendanceStatus = useSelector(
        (state: RootState) => state.AttendanceList.AttendanceStatus
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
        dispatch(GetAttendanceStatus(getAttendanceStatus));
        dispatch(GetStudentDetailsList(GetStudentDetails));
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
        }
    }

    const handleChange = (value) => {
        setStandardid(value);
    }

    const getAbsetNumber = (value) => {
        console.log("value",value);
        
        setActivateButton(true)
        if (value === '')
            setAllPresentOrAllAbsent('P')
        if (value.split(',').length === RollNoList.length)
            setAllPresentOrAllAbsent('N')
        else
            setAllPresentOrAllAbsent('')
        setAbsentRollNos(value)
    }

    // let confirmationDone;
    const clickSave = (value) => {
//     const Confirmation = AttendanceStatus;
//     const confirmationMsg = Confirmation[0].StatusMessage;
//     console.log("confirmationMsg",confirmationMsg);
//     if (confirmationMsg == "Selected date is Holiday.") {

//         {
//          if(confirm('Selected date is holidy')){
//             debugger;
//             const GetSaveStudentAttendance: ISaveAttendance = {
//                 asStandardDivisionId: Standardid,
//                 asDate: assignedDate,
//                 asAcademicYearId: asAcademicYearId,
//                 asSchoolId: asSchoolId,
//                 asAbsentRollNos: asAbsentRollNos,
//                 asAllPresentOrAllAbsent: asAllPresentOrAllAbsent,
//                 asUserId: asTeacherId
//             };
    
//             dispatch(GetSaveAttendanceStatus(GetSaveStudentAttendance));
//          }
//          else{
// return null;
//          }
//        }
//      } else{
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

    let confirmationDone;
    const SaveMsg = () => {
        const Confirmation = AttendanceStatus;
        const confirmationMsg = Confirmation[0].StatusMessage;
       debugger;
        if (confirmationMsg == "Selected date is Holiday.") {

            {
             if(confirm('Selected date is Holiday')){
                GetTAttendanceListApi.SaveStudentAttendanceDetails(GetSaveStudentAttendance)
                .then((resp) => {
                    if (resp.status == 200) {
                        toast.success('Attendance saved for the valid roll number(s) !!!');
                    }
                })
                .catch((err) => {
                    alert('error network');
                });
             }
             else{
                setAbsentRollNos('');
                return null;
             }
           }
         }else{
            GetTAttendanceListApi.SaveStudentAttendanceDetails(GetSaveStudentAttendance)
            .then((resp) => {
                if (resp.status == 200) {
                    toast.success('Attendance saved for the valid roll number(s) !!!');
                }
            })
            .catch((err) => {
                alert('error network');
            });
         }
        
    }

    return (
        <Container sx={{ paddingLeft: '25px' }}>
            <PageHeader heading="Attendance" subheading=''></PageHeader>
            <Dropdown Array={stdlist} handleChange={handleChange}></Dropdown>
            <DateSelector date={date.selectedDate} setCurrentDate={getCurrentDate} Close={undefined} ></DateSelector>
            {
                (Standardid == undefined || Standardid == 0) ? null :
                    <>
                        {(RollNoList2 == null) ? <ErrorDetail>There are no students available.</ErrorDetail> :
                            <>
                                {AttendanceStatus.map((item, i) => {
                                    return (
                                        <>
                                            {(item.StatusMessage == "Attendance not yet marked.") ? <ErrorDetail>Attendance not yet marked.</ErrorDetail>
                                                : null}
                                        </>
                                    )
                                })}
                            </>
                        }
                    </>
            }
            {AttendanceStatus?.map(
                (item, i) => {
                    console.log("item",item.StatusMessage);
                    
                    return (
                        < >
                            {
                                (Standardid == undefined || Standardid == 0) ? null
                                    :
                                    <>
                                        {
                                            (item.StatusMessage == "Attendance is already marked.") ? <ErrorDetail>Attendance is already marked.</ErrorDetail>
                                                : null}
                                        <>
                                            {(item.StatusMessage == "Selected date is Weekend.") ? <ErrorDetail>Selected date is Weekend.</ErrorDetail> : null}
                                            <>
                                                {(item.StatusMessage == "Selected date is Holiday.") ? <ErrorDetail>Selected date is Holiday.</ErrorDetail> : null}
                                                <TextField
                                                    variant="standard"
                                                    fullWidth
                                                    label='Absent Roll Number'
                                                    value={StudentAbsent}></TextField><br></br>
                                                <ButtonPrimary onClick={clickSave} onClickCapture={SaveMsg}>Save</ButtonPrimary>
                                                <br />
                                                <RouterLink
                                                    style={{ textDecoration: 'none' }}
                                                    to={
                                                        `/${location.pathname.split('/')[1]}/Teacher/Tattendance/Tview/` +
                                                        assignedDate +
                                                        '/' +
                                                        StandardId
                                                    }
                                                >
                                                    <ButtonPrimary >TView</ButtonPrimary>
                                                </RouterLink>
                                                <RouterLink
                                                    style={{ textDecoration: 'none' }}
                                                    to={
                                                        `/${location.pathname.split('/')[1]
                                                        }/Teacher/TAttendance/MissingAttandence/` + assignedDate
                                                    }
                                                >
                                                    <ButtonPrimary>Missing Attendance</ButtonPrimary>
                                                </RouterLink>
                                                <List26 Dataa={RollNoList} getAbsetNumber={getAbsetNumber} assignedDate={assignedDate}></List26>

                                            </>
                                        </>
                                    </>
                            }
                        </>
                    );
                }
            )}
        </Container>
    )
}

export default TAttendance