import { Box, Button, TextField, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GetTAttendanceListApi from 'src/api/TAttendance/TAttendance';
import StandardAttendance, {
  IStudentsDetails
} from 'src/interfaces/Teacher/TAttendance';
import { ISaveAttendance } from 'src/interfaces/Teacher/TAttendanceList';
import Buttons from 'src/libraries/buttons/button';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import PageHeader from 'src/libraries/heading/PageHeader';
import {
  GetSaveAttendanceStatus,
  GetStudentList,
  getStandardList
} from 'src/requests/TAttendance/TAttendance';
import { RootState } from 'src/store';

function TeacherAttendance() {
  const dispatch = useDispatch();

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivisionId = sessionStorage.getItem('DivisionId');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const [StandardId, setStandardId] = useState();
  const [date, setDate] = useState<any>({ selectedDate: null });
  const currentDate = moment(new Date()).format('DD-MM-YYYY');
  const [assignedDate, setAssignedDate] = useState<string>(currentDate);

  const RollNoList = useSelector(
    (state: RootState) => state.AttendanceList.StudentList
  );

  const StandardAttendance: any = useSelector(
    (state: RootState) => state.StandardAttendance.stdlist
  );
  const SaveAttendanceStatus = useSelector(
    (state: RootState) => state.AttendanceList.SaveAttendanceStatus
  );

  const [count, setCount] = useState('');
  // const handleClick = value => {
  //   setCount(value);
  // };
  const handleClick = (value) => {
    if (value.length !== 0) {
      setCount(value);
      GetTAttendanceListApi.SaveStudentAttendanceDetails(SaveAttendance);
    }
  };

  const GetStudentDetails: IStudentsDetails = {
    asStdDivId: sessionStorage.getItem('StandardDivisionId'),
    asDate: assignedDate,
    asAcademicYearId: sessionStorage.getItem('AcademicYearId'),
    asSchoolId: localStorage.getItem('localSchoolId')
  };

  const TeacherStandard: StandardAttendance = {
    asSchoolId: localStorage.getItem('localSchoolId'),
    asAcademicyearId: sessionStorage.getItem('AcademicYearId'),
    asTeacherId: sessionStorage.getItem('TeacherId')
  };

  const SaveAttendance: ISaveAttendance = {
    asStandardDivisionId: StandardId,
    asDate: assignedDate,
    asAbsentRollNos: count,
    asAllPresentOrAllAbsent: '',
    asUserId: asTeacherId,
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  useEffect(() => {
    dispatch(getStandardList(TeacherStandard));
  }, []);
  useEffect(() => {
    dispatch(GetStudentList(GetStudentDetails));
    dispatch(GetSaveAttendanceStatus(SaveAttendance));
  }, [StandardId, date]);

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

  const getPreviousDate = () => {
    const { selectedDate } = date;

    const currentDayInMilli = new Date(selectedDate).valueOf();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli = currentDayInMilli - oneDay;
    const prev = new Date(previousDayInMilli);
    getCurrentDate(prev);
  };

  const getNextDate = () => {
    const { selectedDate } = date;

    const currentDayInMilli = new Date(selectedDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    const next = new Date(nextDayInMilli);
    getCurrentDate(next);
  };

  const handleChange = (value) => {
    setStandardId(value);
  };

  const changeText = () => { };

  return (
    <>
      <PageHeader heading={'Attendance'} subheading={''} />
      <Box sx={{ px: 2 }}>
        <Dropdown Array={StandardAttendance} handleChange={handleChange} />
      </Box>
      <Buttons
        date={date.selectedDate}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={undefined}
      />
      <Box sx={{ px: 2 }}>
        <TextField
          fullWidth
          id="standard-basic"
          label={
            <Typography sx={{ color: 'black' }}>Absent Numbers</Typography>
          }
          variant="standard"
          className="form-check-input"
          size="medium"
          name="response"
          disabled={true}
          // value={count}
          sx={{ mb: 1 }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={(event) => handleClick}
        >
          Save
        </Button>
      </Box>
      {StandardId != '0' ? (
        <>{/* <List26 Dataa={RollNoList} getAbsetNumber={handleClick} /> */}</>
      ) : null}
    </>
  );
}

export default TeacherAttendance;
