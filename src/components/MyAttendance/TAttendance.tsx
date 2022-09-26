import React, { useEffect, useState } from 'react'
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import List26 from '../../libraries/list/List26'
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { ErrorDetail } from 'src/libraries/styled/ErrormessageStyled';
import { Container } from '@mui/material'
import GetTAttendanceListApi from 'src/api/TAttendance/TAttendance';
import { getStandard, GetSaveAttendanceStatus, GetStudentList, GetAttendanceStatus, } from 'src/requests/TAttendance/TAttendance';
import ITAttendance, { ISaveStudentAttendanceDetails, IStudentsDetails } from 'src/interfaces/Teacher/TAttendance';
import { IGetAttendanceStatus, ISaveAttendance } from "src/interfaces/Teacher/TAttendanceList";
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { TextField } from '@mui/material'
import PageHeader from 'src/libraries/heading/PageHeader';
import { toast } from 'react-toastify';

const TAttendance = () => {

    const dispatch = useDispatch();

    const stdlist: any = useSelector((state: RootState) => state.StandardAttendance.stdlist);
    const RollNoList = useSelector((state: RootState) => state.AttendanceList.StudentList);
    const StudentAbsent = useSelector((state: RootState) => state.AttendanceList.StudentAbsent);
    const AttendanceStatus = useSelector((state: RootState) => state.AttendanceList.AttendanceStatus);
    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asStandardDivisionId = sessionStorage.getItem('DivisionId');
    const asStandardId = sessionStorage.getItem('StandardDivisionId')
    const asTeacherId = sessionStorage.getItem('TeacherId');
    // Date selector Start
    const [date, setDate] = useState({ selectedDate: '' });
    const [assignedYear, setAssignedYear] = useState<number>();
    const [assignedMonth_num, SetassignedMonth_num] = useState<number>();
    const [asAbsentRollNos, setAbsentRollNos] = useState('');
    const [asAllPresentOrAllAbsent, setAllPresentOrAllAbsent] = useState('');
    const [activateButton, setActivateButton] = useState(false);
    const [absentText, setAbsentText] = useState('warning');

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

    const body: ITAttendance = {
        asSchoolId: asSchoolId,
        asAcademicyearId: asAcademicYearId,
        asTeacherId: asTeacherId
    };

    const [Standardid, setStandardId] = useState();
    const [assignedDate, setAssignedDate] = useState<string>();

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

    useEffect(() => {
        dispatch(getStandard(body));
        getCurrentDate();

    }, []);

    useEffect(() => {
        popupateDate()
        dispatch(GetAttendanceStatus(getAttendanceStatus));
    }, [Standardid, assignedDate]);

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
        setStandardId(value);
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

    const clickSave = (value) => {
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

    const GetSaveStudentAttendance: ISaveAttendance = {
        asStandardDivisionId: Standardid,
        asDate: assignedDate,
        asAcademicYearId: asAcademicYearId,
        asSchoolId: asSchoolId,
        asAbsentRollNos: asAbsentRollNos,
        asAllPresentOrAllAbsent: asAllPresentOrAllAbsent,
        asUserId: asTeacherId
    };

    const AssignDate = new Date(assignedDate);
    const PresentDate = new Date();

    const SaveMsg = () => {
        {
            if (asAbsentRollNos.length == 0) {
                toast.error('Please enter absent roll numbers or select either option.');
            } else {
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
    }

    return (
        <Container sx={{ paddingLeft: '25px' }}>
            <PageHeader heading="Attendance" subheading=''></PageHeader>
            <Dropdown Array={stdlist} handleChange={handleChange}></Dropdown>
            <DateSelector date={date.selectedDate} setCurrentDate={getCurrentDate} Close={undefined} ></DateSelector>
            {RollNoList?.map(
                (item, i) => {
                    return (
                        <>
                            {
                                (item.Status == "E") ? <ErrorDetail>There are no students available.</ErrorDetail>
                                    : null}
                        </>
                    );
                }
            )}
            {AttendanceStatus?.map(
                (item, i) => {
                    return (
                        <>
                            {
                                (Standardid == undefined || Standardid == 0) ? null
                                    :
                                    <>
                                        {
                                            (item.StatusMessage == "Attendance is already marked.") ? <ErrorDetail>Attendance is already marked.</ErrorDetail>
                                                : null}
                                        <>
                                            {(item.StatusMessage == "Attendance not yet marked.") ? <ErrorDetail>Attendance not yet marked.</ErrorDetail>
                                                : null}
                                            <>
                                                {(item.StatusMessage == "Selected date is Holiday.") ? <ErrorDetail>Selected date is Holiday.</ErrorDetail> : null}
                                                {
                                                    <>
                                                        <TextField
                                                            variant="standard"
                                                            fullWidth
                                                            label='Absent Roll Number'
                                                            value={StudentAbsent}></TextField>
                                                        <br></br>
                                                        <br></br>
                                                        <ButtonPrimary color={StudentAbsent !== asAbsentRollNos ? 'primary' : 'warning'} onClick={clickSave} onClickCapture={SaveMsg}>Save</ButtonPrimary>
                                                        <List26 Dataa={RollNoList} getAbsetNumber={getAbsetNumber} assignedDate={assignedDate}></List26>
                                                    </>

                                                }

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