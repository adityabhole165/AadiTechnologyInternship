import React, { useEffect, useState } from 'react'
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import List26 from '../../libraries/list/List26'
import DateSelector from 'src/libraries/buttons/DateSelector';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { Container } from '@mui/system';
import Button from '@mui/material'
import {
    getStandard,
    GetSaveAttendanceStatus,
    GetStudentList,
    GetAttendanceStatus,
} from 'src/requests/TAttendance/TAttendance';
import ITAttendance, {
    ISaveStudentAttendanceDetails, IStudentsDetails
} from 'src/interfaces/Teacher/TAttendance';
import { IGetAttendanceStatus, ISaveAttendance } from "src/interfaces/Teacher/TAttendanceList";
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import { TextField } from '@mui/material'
import PageHeader from 'src/libraries/heading/PageHeader';

const TAttendance = () => {
    const [Dataa, setData] = useState([{
        text1: "1",
        text2: "Ajit",
        isActive: true
    }, {
        text1: "2",
        text2: "Mayur",
        isActive: true
    }]
    )
    const dispatch = useDispatch();

    const stdlist: any = useSelector(
        (state: RootState) => state.StandardAttendance.stdlist
    );
    const RollNoList = useSelector(
        (state: RootState) => state.AttendanceList.StudentList
    );
    const StudentAbsent = useSelector(
        (state: RootState) => state.AttendanceList.StudentAbsent
    );

    const asSchoolId = localStorage.getItem('localSchoolId');
    const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
    const asStandardDivisionId = sessionStorage.getItem('DivisionId');
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

    const [StandardId, setStandardId] = useState();
    const [assignedDate, setAssignedDate] = useState<string>();
    const GetStudentDetails: IStudentsDetails = {
        asStdDivId: StandardId,
        asDate: assignedDate,
        asAcademicYearId: asAcademicYearId,
        asSchoolId: asSchoolId
    };

    const GetAttendanceStatusData: IGetAttendanceStatus = {
        asStanardDivisionId: StandardId,
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

    }, [StandardId, assignedDate]);

    const popupateDate = () => {
        if (StandardId !== undefined) {
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
            asStandardDivisionId: StandardId,
            asDate: assignedDate,
            asAcademicYearId: asAcademicYearId,
            asSchoolId: asSchoolId,
            asAbsentRollNos: asAbsentRollNos,
            asAllPresentOrAllAbsent: asAllPresentOrAllAbsent,
            asUserId: asTeacherId
        };

        dispatch(GetSaveAttendanceStatus(GetSaveStudentAttendance));
    }
    return (
        <Container sx={{paddingLeft:'25px'}}>
            
            <PageHeader heading="Attendance" subheading=''></PageHeader>

            <Dropdown Array={stdlist} handleChange={handleChange}></Dropdown>

            <DateSelector date={date.selectedDate} setCurrentDate={getCurrentDate} Close={undefined}></DateSelector>

            <TextField 
                variant="standard"
                sx={{width:'80%'}}
                label = 'Absent Roll Number'
                value={StudentAbsent}></TextField>
<br></br>
<br></br>
            <ButtonPrimary color={StudentAbsent!==asAbsentRollNos?'primary':'warning'} onClick={clickSave}>Save</ButtonPrimary>

            <List26 Dataa={RollNoList} getAbsetNumber={getAbsetNumber}></List26>

        </Container>
    )
}

export default TAttendance