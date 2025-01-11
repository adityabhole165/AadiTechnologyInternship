import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Avatar, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, useTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Styles } from 'src/assets/style/student-style';
import { IstaffBirthday } from 'src/interfaces/Student/dashboard';
import MonthSelector from 'src/libraries/buttons/MonthSelector';
import Legend from 'src/libraries/Legend/Legend';
import { DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled';
import { getstaffBirthday } from 'src/requests/Dashboard/Dashboard';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';

function StaffBirthday() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const staffBirthdayList = useSelector(
    (state: RootState) => state.Dashboard.staffBirthdayData
  );


  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const [date, setDate] = useState({ selectedDate: '' });
  const [assignedYear, setAssignedYear] = useState<number>();

  const [assignedMonth, setAssignedMonth] = useState<string>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<number>();
  const Current_Month = new Date().getMonth() + 1;

  function setCurrentDate(newDate?: Date) {
    const date = newDate || new Date();
    const Month = new Date(date).toLocaleString('default', { month: 'long' });
    const Month_num = new Date(date).getMonth();
    const Year = new Date(date).getFullYear();
    setAssignedYear(Year)
    const NewDateFormat = `${Month}-${Year}`;
    setDate({
      selectedDate: NewDateFormat
    });
    setAssignedYear(Year);
    setAssignedMonth(Month);
    SetassignedMonth_num(Month_num + 1);
  }
  useEffect(() => {
    setCurrentDate();
  }, []);

  const getPreviousDate = () => {
    const { selectedDate } = date;
    const currentDayInMilli = new Date(selectedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() - 1);
    setCurrentDate(currentDayInMilli);
  };

  const getNextDate = () => {
    const { selectedDate } = date;
    const currentDayInMilli = new Date(selectedDate);
    currentDayInMilli.setMonth(currentDayInMilli.getMonth() + 1);
    setCurrentDate(currentDayInMilli);
  };

  const body: IstaffBirthday = {
    asMonth: assignedMonth_num,
    asAcademicyearId: asAcademicYearId,
    asSchoolId: asSchoolId,
    year: assignedYear
  };

  const [checked, setChecked] = useState(true);
  let { assignedDate } = useParams();

  // Decode in-place
  assignedDate = decodeURL(assignedDate);

  const [birthDate, SetBirthDate] = useState([]);

  staffBirthdayList.map((item: any, i) => {
    birthDate.push(item.BirthDate)
  })

  const presDate = moment(new Date()).format("DD MMM ")

  const PresentDate = new Date();


  const PresntDay = new Date(presDate);
  const presenttt = moment(new Date(PresntDay)).format("DD ");
  const MonthDay = new Date(PresentDate).toLocaleString('default', { month: 'short' });
  const presentDateMonth = presenttt + MonthDay;

  const PresentMonth = new Date(PresentDate).toLocaleString('default', { month: 'short' });
  const PresentDateFormat = `${PresntDay} ${PresentMonth}`;

  const presentDate = moment(new Date()).format("DD MMM")
  const currentDayInMilli = new Date(presentDate).getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const nextDayInMilli = currentDayInMilli + oneDay;
  const nextDay = new Date(nextDayInMilli);
  const Day = moment(new Date(nextDay)).format("DD");
  const Month = new Date(nextDay).toLocaleString('default', { month: 'short' });
  const NewDateFormat = `${Day} ${Month}`;

  const datesToBeChecked: any = birthDate
  const dateToCheckFor = presentDate;


  let nearestDate;

  datesToBeChecked.map(date => {


    let diff = moment(date).diff(moment(dateToCheckFor), 'days');


    if (diff > 0) {
      if (nearestDate) {
        if (moment(date).diff(moment(nearestDate), 'days') < 2) {
          nearestDate = date;
        }
      } else {
        nearestDate = date;
      }
    }
  });

  useEffect(() => {
    dispatch(getstaffBirthday(body));
  }, [assignedMonth]);

  useEffect(() => {
    dispatch(getstaffBirthday(body));
  }, []);
  const classes = Styles();
  const LegendArray = [
    {
      id: 1,
      Name: 'Upcoming Birthday',
      Value: (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <DotLegendStyled1
            className={classes.border}
            style={{ background: '#e9a69a' }}
          />
        </Box>
      )
    },
    {
      id: 2,
      Name: 'Past Birthday',
      Value: (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <DotLegendStyled1
            className={classes.border}
            style={{ background: '#C0C0C0' }}
          />
        </Box>
      )
    }
  ];

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[{ title: 'Staff Birthdays', path: ' ' },
        ]}
        rightActions={
          <Box>
            <Tooltip title={`List of the school staff birthdays.`}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  height: '36px !important',
                  ':hover': { backgroundColor: grey[600] },
                }}
              >
                <QuestionMarkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        }
      />
      {assignedMonth_num == Current_Month &&
        <Box sx={{ background: 'white', p: 1 ,mb:2}}>
          <Legend LegendArray={LegendArray} />
        </Box>
      }
    
      <MonthSelector
        date={date.selectedDate}
        PrevDate={getPreviousDate}
        NextDate={getNextDate}
        Close={undefined}
      />


      {staffBirthdayList.length === 0 ? (
        <Box sx={{ backgroundColor: '#D2FDFC' }}>
          <Typography variant="h6" align="center" color="blue" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }} >
            No birthdays are available.
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ backgroundColor: 'white', p: 2 }}>
            {/* Render the header only if there are birthdays */}
            <TableContainer component={Box}>
              <Table
                aria-label="simple table"
                sx={{
                  border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      background: (theme) => theme.palette.secondary.main, color: (theme) => theme.palette.common.white,
                    }}>
                    <TableCell sx={{
                      textTransform: 'capitalize',
                      color: "white",
                      py: 1.5
                    }}>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell sx={{
                      textAlign: "center",
                      textTransform: 'capitalize',
                      color: "white",
                      py: 1.5
                    }}>
                      <strong>DOB</strong>
                    </TableCell>
                    <TableCell sx={{
                      textAlign: 'center',
                      textTransform: 'capitalize',
                      color: "white",
                      py: 1.5
                    }}>
                      <strong>Designation</strong>
                    </TableCell>
                    <TableCell sx={{
                      textTransform: 'capitalize',
                      color: "white",
                      py: 1.5
                    }}>
                      <strong>Email Address</strong>
                    </TableCell>
                    <TableCell sx={{
                      whiteSpace: 'nowrap',
                      textAlign: "center",
                      textTransform: 'capitalize',
                      color: "white",
                      py: 1.5
                    }}>
                      <strong>Mobile Number</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {staffBirthdayList.map((item, i) => (

                  <TableBody>
                    <TableRow
                      sx={{
                        background: item.IsHighlight === 1 ? "#EFDCC9" : item.IsHighlight === 2 ? "#d3d3d3" : `${theme.colors.gradients.pink1}`,
                      }}
                    >
                      <TableCell sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
                        <Avatar
                          alt={item.Name}
                          src={`data:image/png;base64,${item.BinaryPhotoImage}`}
                          sx={{
                            backgroundColor: grey[500],
                            width: 40,
                            height: 40,
                            '& img': { objectFit: 'contain' },
                            mr: 1
                          }}
                        />
                        <span style={{ whiteSpace: 'nowrap' }}>{item.Name}</span>
                      </TableCell>
                      <TableCell sx={{ py: 0.5, textAlign: 'center', whiteSpace: 'nowrap' }}>{item.BirthDate}</TableCell>
                      <TableCell sx={{ py: 0.5, textAlign: 'center' }}>{item.Designation}</TableCell>
                      <TableCell sx={{ py: 0.5 }}>{item.EmailAddress}</TableCell>
                      <TableCell sx={{ py: 0.5, textAlign: 'center' }}>{item.MobileNumber}</TableCell>
                    </TableRow>
                  </TableBody>


                ))}
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </Box>
  );
}

export default StaffBirthday;
