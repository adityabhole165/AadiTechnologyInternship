import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {
  Box,
  Button,
  Card,
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControl,
  NativeSelect,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import GetTAttendanceListApi from 'src/api/TAttendance/TAttendance';
import 'src/assets/style/teacher.css';
import ITAttendance, {
  GetStandardDivisionsResult,
  IStudentsDetails
} from 'src/interfaces/Teacher/TAttendance';
import AttendanceData, {
  ISaveAttendance
} from 'src/interfaces/Teacher/TAttendanceList';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import Buttons from 'src/libraries/buttons/button';
import PageHeader from 'src/libraries/heading/PageHeader';
import {
  GetAttendanceStatus,
  GetStudentDetailsList,
  getAttendanceDataList,
  getStandardList
} from 'src/requests/TAttendance/TAttendance';
import { RootState } from 'src/store';

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
  const [ifTrue, setifTrue] = useState(true);
  const [SelectAllChecckBox, setSelectAllChecckBox] = useState(true);

  // start
  const RollNoList = useSelector(
    (state: RootState) => state.AttendanceList.GetStudentDetailsList
  );
  const Attendancestatus = useSelector(
    (state: RootState) => state.AttendanceList.AttendanceStatus
  );
  const SaveAttendanceStatus = useSelector(
    (state: RootState) => state.AttendanceList.SaveAttendanceStatus
  );

  const [AllPresentOrAllAbsent, setAllPresentOrAllAbsent] = useState('');
  const [selectedRollNo, setSelectedRollNo] = useState<string[]>([]);
  const [selectedStudentId, setselectedStudentId] = useState<number[]>([]);
  const [AbsentyObject, setAbsentyObject] = useState<any>({
    RollNo: [],
    StudentId: []
  });

  const handleSelectAllRollNo = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setifTrue(false);
    setSelectedRollNo(
      !event.target.checked
        ? RollNoList?.map((data) =>
            data.RollNumber.length == 1
              ? '0' + data.RollNumber
              : data.RollNumber
          )
        : []
    );
    setselectedStudentId(
      event.target.checked ? RollNoList?.map((data) => data.StudentId) : []
    );
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    RollId: string,
    StudentId: number
  ): void => {
    setifTrue(false);
    if (!selectedRollNo.includes(RollId)) {
      setSelectedRollNo((prevSelected) => [...prevSelected, RollId]);
      setselectedStudentId((prevSelected) => [...prevSelected, StudentId]);
    } else {
      setSelectedRollNo((prevSelected) =>
        prevSelected.filter((id) => id !== RollId)
      );
      setselectedStudentId((prevSelected) =>
        prevSelected.filter((id) => id !== StudentId)
      );
    }
  };

  useEffect(() => {
    setAbsentyObject({
      RollNo: [...selectedRollNo],
      StudentId: [...selectedStudentId]
    });
  }, [selectedRollNo]);

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
    asStdDivId: StandardId,
    asDate: assignedDate,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const GetStudentDetails: IStudentsDetails = {
    asStdDivId: StandardId,
    asDate: assignedDate,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const AttendanceStatus = {
    asStanardDivisionId: StandardId,
    asAttendanceDate: date,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const SaveAttendance: ISaveAttendance = {
    asStandardDivisionId: StandardId,
    asDate: assignedDate,
    asAbsentRollNos: selectedRollNo.toString(),
    asAllPresentOrAllAbsent:
      selectedRollNo.length == RollNoList?.length ? 'A' : '',
    asUserId: asTeacherId,
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  //End Save attendance Here

  useEffect(() => {
    dispatch(getStandardList(body));
  }, [StandardId]);

  useEffect(() => {
    getCurrentDate();
    dispatch(getAttendanceDataList(body1));
    dispatch(GetAttendanceStatus(AttendanceStatus));
  }, []);

  useEffect(() => {
    dispatch(GetStudentDetailsList(GetStudentDetails));
    dispatch(getAttendanceDataList(body1));
  }, [assignedDate, StandardId]);

  useEffect(() => {
    setUsers(getAttendanceData);
  }, []);

  const [selectedValues, setselectedValues] = useState<any>();

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
    setSelectAllChecckBox(false);
    setifTrue(true);
    setStandardId(e.target.value);
  };

  const handleChange1 = (e) => {
    setifTrue(false);
    setSelectedRollNo(e.target.value);
  };

  // End Calender Here

  const formik = useFormik({
    initialValues: {
      response: ''
    },
    onSubmit: (values) => {
      if (selectedRollNo.length !== 0) {
        setselectedValues(selectedRollNo);
        GetTAttendanceListApi.SaveStudentAttendanceDetails(SaveAttendance)
          .then((resp) => {
            if (resp.status == 200) {
              toast.success(
                'Attendance saved for the valid roll number(s) !!!'
              );
            }
          })
          .catch((err) => {
            alert('error network');
          });
      }
      if (selectedRollNo.length == 0) {
        toast.error(
          'Please enter absent roll numbers or select either option.'
        );
      }
    }
  });

  const AssignDate = new Date(assignedDate);
  const PresentDate = new Date();

  return (
    <>
      <PageHeader heading={'Attendance'} subheading={''} />
      <>
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
      </>
      <Buttons
        date={date.selectedDate}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={undefined}
      />

      {/* {/ Start Enter Absent number Here  /} */}
      <>
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
            value={selectedRollNo}
            onChange={formik.handleChange}
            onChangeCapture={handleChange1}
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onChange={formik.handleChange}
          >
            Save
          </Button>
        </form>

        <Typography variant="h5" textAlign="center">
          {' '}
          OR{' '}
        </Typography>
        <TextField
          fullWidth
          sx={{ mb: 1 }}
          id="standard-read-only-input"
          placeholder="Absent Roll Numbers"
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
              `/${location.pathname.split('/')[1]}/Teacher/Tattendance/Tview/` +
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
              }/Teacher/Tattendance/MissingAttandence/` + assignedDate
            }
          >
            <Button variant="contained" color="primary">
              {' '}
              Missing Attendance{' '}
            </Button>
          </RouterLink>
        </Stack>
        <br />

        <Card>
          <Divider />
          {AssignDate > PresentDate ? (
            <ErrorMessages Error={'Future date attendance is not allowed'} />
          ) : (
            <>
              {selectedSomeRollNo != null ? (
                <>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ background: '#ceabd2' }}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={ifTrue ? true : !selectedAllRollNo}
                              indeterminate={selectedSomeRollNo}
                              onChange={handleSelectAllRollNo}
                              disabled={SelectAllChecckBox}
                            />
                          </TableCell>
                          <TableCell align="center">Roll No</TableCell>

                          <TableCell align="center">Student Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {RollNoList?.map((data) => {
                          const isSelected = ifTrue
                            ? true
                            : !selectedRollNo.includes(
                                data.RollNumber.length == 1
                                  ? '0' + data.RollNumber
                                  : data.RollNumber
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
                                    handleSelectOne(
                                      event,
                                      data.RollNumber.length == 1
                                        ? '0' + data.RollNumber
                                        : data.RollNumber,
                                      data.StudentId
                                    )
                                  }
                                  value={isSelected}
                                  name={data.StudentId}
                                />
                              </TableCell>

                              <TableCell align="center">
                                {' '}
                                <b>
                                  {data.RollNumber.length == 1
                                    ? '0' + data.RollNumber
                                    : data.RollNumber}
                                </b>{' '}
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
            </>
          )}
        </Card>
      </>
    </>
  );
}

export default Attendance;
