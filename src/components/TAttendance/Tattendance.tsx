import {
  Container,
  useTheme,
  TextField,
  Select,
  MenuItem,
  FormControl,
  NativeSelect,
  ClickAwayListener,
  Tooltip,
  Button,
  Checkbox,
  List,
  Grid,
  InputLabel
} from '@mui/material';
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Box,
  Typography,
  Card,
  Divider,
  Stack
} from '@mui/material';
import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import PageHeader from 'src/libraries/heading/PageHeader';
import Buttons from 'src/libraries/buttons/button';
import { Link as RouterLink } from 'react-router-dom';
import 'src/assets/style/teacher.css';
import AttendanceData from 'src/interfaces/Teacher/TAttendanceList';
import { getAttendanceDataList, getStandardList, GetStudentDetailsList } from 'src/requests/TAttendance/TAttendance';
import ITAttendance,{ GetStandardDivisionsResult } from 'src/interfaces/Teacher/TAttendance';
import {Formik, useFormik} from 'formik';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';

function Attendance() {
  const dispatch = useDispatch();

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivisionId = sessionStorage.getItem('DivisionId');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const StandardAttendance: any = useSelector(
    (state: RootState) => state.StandardAttendance.StandardDivisionAttendance
  );

  const getAttendanceData = useSelector(
    (state: RootState) => state.AttendanceList.AttendanceData
  );

  const Note: string =
    'Enter comma/space separated numbers or range (For example 1,4 5 9-11).';
  const [users, setUsers] = useState([]);
  const [StandardId, setStandardId] = useState();
  const currentDate = moment(new Date()).format('DD-MM-YYYY');
  const [date, setDate] = useState<any>({ selectedDate: null });
  const [open, setOpen] = useState(false);
  const [assignedDate, setAssignedDate] = useState<string>(currentDate);

  // start
  const RollNoList = useSelector(
    (state: RootState) => state.AttendanceList.GetStudentDetailsList
  );

  const [selectedRollNo, setSelectedRollNo] = useState<string[]>([]);

  const handleSelectAllRollNo = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedRollNo(
      event.target.checked ? RollNoList?.map((data) => data.RollNumber) : []
    );
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    RollId: string
  ): void => {
    if (!selectedRollNo.includes(RollId)) {
      setSelectedRollNo((prevSelected) => [...prevSelected, RollId]);
    } else {
      setSelectedRollNo((prevSelected) =>
        prevSelected.filter((id) => id !== RollId)
      );
    }
  };

  const selectedSomeRollNo =
    selectedRollNo?.length > 0 && selectedRollNo?.length < RollNoList?.length;
  const selectedAllRollNo = selectedRollNo?.length === RollNoList?.length;

  // End

  const body: ITAttendance = {
    asSchoolId: asSchoolId,
    asAcademicyearId: asAcademicYearId,
    asTeacherId: asTeacherId
  };

  const body1: AttendanceData = {
    asStdDivId: asStandardDivisionId,
    asDate: assignedDate,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const GetStudentDetails: any = {
    asStdDivId: StandardId,
    asDate: assignedDate,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  //End Save attendance Here

  useEffect(() => {
    dispatch(getStandardList(body));
  }, [StandardId]);

  useEffect(() => {
    getCurrentDate();
    dispatch(getAttendanceDataList(body1));
  }, []);

  useEffect(() => {
    dispatch(GetStudentDetailsList(GetStudentDetails));
    dispatch(getAttendanceDataList(body1));
  }, [assignedDate, StandardId]);

  useEffect(() => {
    setUsers(getAttendanceData);
  }, []);

  const [selectedValues,setselectedValues] = useState<any>();

  // Start Calender Here

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
  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setStandardId(e.target.value);
  };

  const handleChange1 = (e) => {
    setSelectedRollNo(e.target.value);
  };

  // End Calender Here

  const callSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

const formik=useFormik({
  initialValues:{
    response:'',
  },
  onSubmit:values=>{
    setselectedValues(selectedRollNo)
  },
})
  return (
    <>
      <PageHeader heading={'Attendance'} subheading={''} />
      <Container>
        {StandardAttendance.length > 1 ? (
          <FormControl variant="standard" fullWidth sx={{ m: 1, mb: 2 }}>
            <NativeSelect
              sx={{ mr: '14px', ml: '-8px' }}
              onChange={(e) => handleChange(e)}
            >
              <option>Select Class</option>
              {StandardAttendance.map(
                (items: GetStandardDivisionsResult, i) => {
                  return (
                    <>
                      <option value={items.Id} key={i}>
                        {items.Class}
                      </option>
                    </>
                  );
                }
              )}
            </NativeSelect>
          </FormControl>
        ) : (
          StandardAttendance.map((items: GetStandardDivisionsResult, i) => {
            return (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label={'Class'}
                  variant="standard"
                  key={i}
                  value={items.Class}
                  sx={{ mt: '-0.3rem' }}
                >
                  {items.Class}
                </TextField>
              </>
            );
          })
        )}
      </Container>
      <Buttons
        date={date.selectedDate}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={undefined}
      />

      {/* Start Enter Absent number Here  */}
      <Container>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="standard-basic"
            label={
              <Typography sx={{ color: 'black' }}> 
                Enter Absent Number
              </Typography>
            }
            variant="standard"
            className="form-check-input"
            size="medium"
            name="response"
            value={selectedRollNo }
            onChange={handleChange1}
            onChangeCapture={formik.handleChange}
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true
                      }}
                      onClose={handleClick}
                      open={open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title={Note}
                      arrow
                      placement="left"
                      componentsProps={{
                        tooltip: {
                          sx: {
                            marginLeft: '70px',
                            transform:
                              'translate3d(17px, 0.5px, 0px) !important'
                          }
                        }
                      }}
                    >
                      <InfoTwoToneIcon
                        type="button"
                        onClick={handleClick}
                        sx={{
                          color: 'navy',
                          mt: 0,
                          fontSize: '17px',
                          float: 'right'
                        }}
                      />
                    </Tooltip>
                  </ClickAwayListener>
                </Box>
              )
            }}
          />
          <Button variant="contained" color="primary" type="submit" onChange={formik.handleChange}>
            Save
          </Button>
           {/* <ButtonPrimary  variant="contained" color="primary" onChange={formik.handleChange} type="submit">  {'Save'}</ButtonPrimary> */}
           {/* onChange={formik.handleChange}  */}
        </form>

        {/* end Enter Absent number Here  */}

        <Typography variant="h5" textAlign="center">
          {' '}
          OR{' '}
        </Typography>
        <TextField
          fullWidth
          sx={{ mb: 1 }}
          id="standard-read-only-input"
          placeholder='Absent Roll Numbers'
          value={selectedValues}
          InputProps={{
            readOnly: true
          }}
          variant="standard"
        />
        <Stack direction="row" spacing={2}>
          <RouterLink
            style={{ textDecoration: 'none' }}
            to={
              `/${location.pathname.split('/')[1]}/Student/Tattendance/Tview/` +
              assignedDate +
              '/' +
              StandardId
            }
          >
            <Button variant="contained" color="primary">
              View
            </Button>
          </RouterLink>
          <RouterLink
            style={{ textDecoration: 'none' }}
            to={
              `/${
                location.pathname.split('/')[1]
              }/Student/Tattendance/MissingAttandence/` + assignedDate
            }
          >
            <Button variant="contained" color="primary">
              {' '}
              Missing Attendance{' '}
            </Button>
          </RouterLink>
        </Stack>
        <br />

        {/* Start New Code Dev.Ganesh */}
        <Card>
          <Divider />
          {selectedSomeRollNo != null ? (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: '#ceabd2' }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedAllRollNo}
                          indeterminate={selectedSomeRollNo}
                          onChange={handleSelectAllRollNo}
                        />
                      </TableCell>
                      <TableCell align="center">Roll No</TableCell>

                      <TableCell align="center">Student Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {RollNoList?.map((data) => {
                      const isSelected = selectedRollNo.includes(
                        data.RollNumber
                      );
                      return (
                        <TableRow
                          key={data.RollNumber}
                          selected={isSelected}
                          sx={{
                            background: data.IsPresent
                              ? '#87ed87a6'
                              : '#ffd5cde8'
                          }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isSelected}
                              onChange={(event) =>
                                handleSelectOne(event, data.RollNumber)
                              }
                              value={isSelected}
                            />
                          </TableCell>

                          <TableCell align="center">
                            {' '}
                            <b>{data.RollNumber}</b>{' '}
                          </TableCell>
                          <TableCell align="center">
                            <b>{data.StudentName}</b>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : null}
        </Card>
      </Container>
    </>
  );
}

export default Attendance;
