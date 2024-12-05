import { QuestionMark, SearchTwoTone } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import StudentTable from './StudentTable';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ThreePRoundedIcon from '@mui/icons-material/ThreePRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import { useNavigate } from 'react-router';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';

export const StudentDetailsBaseScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const studentData = [
    {
      regNo: '4120',
      class: '9 - D',
      rollNo: 28,
      studentName: 'Master Aaryan Sachin Kad',
      dob: '02-Jan-2018',
      mobile: '9372648088, 9545993843',
      image: 'https://via.placeholder.com/150'
    },
    {
      regNo: 'PP3126',
      class: 'Junior KG - F',
      rollNo: 28,
      studentName: 'Master Martand Sandip Tupe',
      dob: '15-Feb-2019',
      mobile: '9876543210, 8765432109',
      image: 'https://via.placeholder.com/150'
    },
    {
      regNo: 'PP3128',
      class: 'Junior KG - E',
      rollNo: 28,
      studentName: 'Master Shambhuraj Nilesh Tupe',
      dob: '20-Mar-2018',
      mobile: '9123456789, 9988776655',
      image: 'https://via.placeholder.com/150'
    },
    {
      regNo: '4012',
      class: '2 - B',
      rollNo: 29,
      studentName: 'Master Shivansh Prasad Pawar',
      dob: '05-Apr-2017',
      mobile: '9911223344, 8877665544',
      image: 'https://via.placeholder.com/150'
    },
    {
      regNo: '4312',
      class: '1 - C',
      rollNo: 30,
      studentName: 'Master Harshal Amol Shinde',
      dob: '02-Jan-2018',
      mobile: '9372648088, 9545993843',
      image: 'https://via.placeholder.com/150'
    }
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearchPerformed(true);

    if (term.trim() === '') {
      setFilteredData([]);
      setSelectedStudent(null);
      setCount(0);
      return;
    }

    // Search for students where both name or regNo matches partially
    const partialMatches = studentData.filter(
      (student) =>
        student.studentName.toLowerCase().includes(term.toLowerCase()) ||
        student.regNo.toLowerCase().includes(term.toLowerCase())
    );

    // If an exact match is found for either name or regNo, show that student.
    const exactMatch = studentData.find(
      (student) =>
        student.studentName.toLowerCase() === term.toLowerCase() ||
        student.regNo.toLowerCase() === term.toLowerCase()
    );

    if (exactMatch) {
      setSelectedStudent(exactMatch); // Exact match, show student details
    } else {
      setSelectedStudent(null); // No exact match, hide student details
    }

    // Update filtered data for table display
    setFilteredData(partialMatches);
    setCount(partialMatches.length);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student); // Show the selected student's details
  };

  const rowsPerPageOptions = [5, 50, 100, 200];

  const startRecord =
    filteredData.length > 0 ? (page - 1) * rowsPerPage + 1 : 0;
  const endRecord = Math.min(page * rowsPerPage, count);
  const pagecount = Math.ceil(count / rowsPerPage);

  const PageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const ChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Student Details',
            path: '/extended-sidebar/Teacher/StudentDetailsBaseScreen'
          }
        ]}
        rightActions={
          <>
            <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label={
                <span>
                  Name / Reg. No.<span style={{ color: 'red' }}> *</span>
                </span>
              }
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by Name or Reg. No."
            />
            <Tooltip title="Search">
              <IconButton
                onClick={() => handleSearch(searchTerm)}
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
            <Tooltip title="You can see students' total information.">
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
            <Tooltip title="Student Details">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
                onClick={() =>
                  navigate(`/extended-sidebar/Teacher/StudentRegistrationForms`)
                }
              >
                <ThreePRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Fees">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <CurrencyExchangeRoundedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Attendance">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
                onClick={() =>
                  navigate(`/extended-sidebar/Teacher/StudentDetailsAttendance`)
                }
              >
                <EventNoteOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Exam">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
                onClick={() =>
                  navigate(`/extended-sidebar/Teacher/StudentDetailsExam`)
                }
              >
                <ImportContactsIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />

      {/* Display Selected Student Details */}
      <Box mb={2}>
        {selectedStudent && (
          <Card
            style={{
              marginTop: '20px',
              padding: '20px',
              maxWidth: '900px',
              margin: '0 auto',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                style={{ marginBottom: '20px', fontWeight: 'bold' }}
              >
                Student Details
              </Typography>
              <Grid container spacing={4} alignItems="center">
                {/* Student Photo */}
                <Grid item xs={4}>
                  <img
                    src={selectedStudent.image}
                    alt={selectedStudent.studentName}
                    style={{
                      width: '80%',
                      borderRadius: '10px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}
                  />
                </Grid>
                {/* Student Details */}
                <Grid item xs={8}>
                  <Typography
                    variant="body1"
                    style={{
                      marginBottom: '10px',
                      fontSize: '16px',
                      color: '#333'
                    }}
                  >
                    <strong>Student Name:</strong> {selectedStudent.studentName}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      marginBottom: '10px',
                      fontSize: '16px',
                      color: '#333'
                    }}
                  >
                    <strong>Date of Birth:</strong> {selectedStudent.dob}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      marginBottom: '10px',
                      fontSize: '16px',
                      color: '#333'
                    }}
                  >
                    <strong>Class:</strong> {selectedStudent.class}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      marginBottom: '10px',
                      fontSize: '16px',
                      color: '#333'
                    }}
                  >
                    <strong>Roll No.:</strong> {selectedStudent.rollNo}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ fontSize: '16px', color: '#333' }}
                  >
                    <strong>Mobile Number:</strong> {selectedStudent.mobile}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Student Table */}

      <Box sx={{ backgroundColor: 'white', pt: 0.5 }}>
        {filteredData.length > 0 && (
          <div style={{ flex: 1, textAlign: 'center' }}>
            <Typography
              variant="subtitle1"
              sx={{ margin: '16px 0', textAlign: 'center' }}
            >
              <Box component="span" fontWeight="fontWeightBold">
                {startRecord} to {endRecord}
              </Box>{' '}
              out of{' '}
              <Box component="span" fontWeight="fontWeightBold">
                {count}
              </Box>{' '}
              {count === 1 ? 'record' : 'records'}
            </Typography>
          </div>
        )}
        {isSearchPerformed && filteredData.length === 0 ? (
          <Box textAlign="center" sx={{backgroundColor: 'white', p:2 }}>
            <Typography
              variant="h6"
              align="center"
              color="blue"
              sx={{
                textAlign: 'center',
                marginTop: 0,
                backgroundColor: '#324b84',
                padding: 1,
                borderRadius: 2,
                color: 'white'
              }}
            >
              No record found
            </Typography>
          </Box>
        ) : (
          <Box p={2} >
          <StudentTable
            data={filteredData}
            onSelectStudent={handleSelectStudent}
          />
          </Box>
        )}
      </Box>
      {filteredData.length > rowsPerPage && (
        <ButtonGroupComponent
          rowsPerPage={rowsPerPage}
          ChangeRowsPerPage={ChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          PageChange={PageChange}
          pagecount={pagecount}
        />
      )}
    </Box>
  );
};
