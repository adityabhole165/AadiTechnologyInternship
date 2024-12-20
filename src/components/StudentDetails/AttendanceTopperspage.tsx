import { QuestionMark, SearchTwoTone } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import CommonPageHeader from '../CommonPageHeader';

const AttendanceTopperspage = () => {
  const yourAttendance = [
    {
      rollNo: 3,
      studentName: 'Miss Sakshi Anand Battale',
      attendance: {
        Mar: '09/09',
        Apr: '07/07',
        May: '-',
        Jun: '10/14',
        Jul: '22/22',
        Aug: '24/24',
        Sep: '18/19',
        Oct: '21/21',
        Nov: '11/11',
        Dec: '15/16',
        Jan: '19/20',
        Feb: '20/20',
        Mar24: '05/05',
        presentDays: 181,
        totalDays: 188,
        percentage: '96.28%'
      }
    }
  ];

  const topAttendanceRankers = [
    {
      rank: 1,
      rollNo: 20,
      studentName: 'Miss Vaishnavi Sunil Tupe',
      attendance: {
        Mar: '09/09',
        Apr: '07/07',
        May: '-',
        Jun: '14/14',
        Jul: '22/22',
        Aug: '24/24',
        Sep: '19/19',
        Oct: '21/21',
        Nov: '10/11',
        Dec: '16/16',
        Jan: '20/20',
        Feb: '20/20',
        Mar24: '05/05',
        presentDays: 187,
        totalDays: 188,
        percentage: '99.47%'
      }
    }
  ];
  const renderTable = (data, isRanked = false) => (
    <TableContainer component={Paper}>
      <Table
        aria-label="simple table"
        sx={{
          border: (theme) => `1px solid ${theme.palette.grey[300]}`
        }}
      >
        <TableHead>
          <TableRow
            sx={{
              background: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.common.white
            }}
          >
            {isRanked && (
              <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
                <strong>Rank</strong>
              </TableCell>
            )}
            <TableCell
              sx={{
                py: 1,
                textAlign: 'center',
                color: 'white',
                minWidth: '110px'
              }}
            >
              <strong>Roll No</strong>
            </TableCell>
            <TableCell
              sx={{
                py: 1,
                textAlign: 'center',
                color: 'white',
                width: '320px'
              }}
            >
              <strong>Student Name</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Mar</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Apr</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>May</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Jun</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Jul</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Aug</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Sep</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Oct</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Nov</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Dec</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Jan</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Feb</strong>
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>Mar24</strong>
            </TableCell>
            <TableCell
              sx={{
                py: 1,
                textAlign: 'center',
                color: 'white',
                minWidth: '120px'
              }}
            >
              <strong>Present Days</strong>
            </TableCell>
            <TableCell
              sx={{
                py: 1,
                textAlign: 'center',
                color: 'white',
                minWidth: '120px'
              }}
            >
              <strong>Total Days</strong>{' '}
            </TableCell>
            <TableCell sx={{ py: 1, textAlign: 'center', color: 'white' }}>
              <strong>%</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {isRanked && (
                <TableCell sx={{ py: 1, textAlign: 'center' }}>
                  {row.rank}
                </TableCell>
              )}
              <TableCell sx={{ py: 1, textAlign: 'center' }}>
                {row.rollNo}
              </TableCell>
              <TableCell sx={{ py: 1, textAlign: 'center', minWidth: '200px' }}>
                {row.studentName}
              </TableCell>
              {Object.values(row.attendance).map((value, idx) => (
                <TableCell key={idx} sx={{ py: 1, textAlign: 'center' }}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Student Details',
            path: '/RITeSchool/Teacher/StudentDetailsBaseScreen'
          },
          {
            title: 'Attendance',
            path: '/RITeSchool/Teacher/StudentDetailsAttendance'
          },
          {
            title: 'Attendance Toppers And Old Records',
            path: ''
          }
        ]}
        rightActions={
          <>
            <SearchableDropdown
              sx={{ minWidth: '200px' }}
              ItemList={years} // Array of years
              label={'Old Attendance Records'}
              size={'small'}
            />
            {/* <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label={
                <span>
                  Old Attendance Records<span style={{ color: 'red' }}></span>
                </span>
              }
              variant="outlined"
              size="small"
            /> */}
            <Tooltip title="Search">
              <IconButton
                // onClick={() => handleSearch(searchTerm)}
                sx={{
                  background: (theme) => theme.palette.primary.main,
                  color: 'white',
                  marginLeft: '0.5rem',
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark
                  }
                }}
              >
                <SearchTwoTone />
              </IconButton>
            </Tooltip>
            <Tooltip title="Displays your monthly attendance as well as top three attendance rankers of current year.">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </>
        }
      />

      <Box sx={{ backgroundColor: 'white', px: 2, py: 1 }}>
        <h3>Your Attendance</h3>
        {renderTable(yourAttendance)}

        <h3>Following are the top three attendance rankers of your class</h3>
        {renderTable(topAttendanceRankers, true)}
      </Box>
    </Box>
  );
};
export default AttendanceTopperspage;
