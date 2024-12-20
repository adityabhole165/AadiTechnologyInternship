import { QuestionMark } from '@mui/icons-material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { Box, Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useNavigate } from 'react-router';
import CommonPageHeader from '../CommonPageHeader';

const StudentDetailsAttendance = () => {
  const navigate = useNavigate();
  const cardData = [
    { label: 'School working days', value: '0 out of 30' },
    { label: 'Total present days', value: '0 out of 0' },
    { label: 'Total absent days', value: '0 out of 0' },
  ];
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
          }
        ]}
        rightActions={
          <>
            {/* <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label={
                <span>
                  Name / Reg. No.<span style={{ color: 'red' }}> *</span>
                </span>
              }
              variant="outlined"
              size="small"
            /> */}

            <Tooltip title="Your attendance for the current month with summary. You can change the month by clicking on month link on the top corners of the calender.">
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
            <Tooltip title="Attendance Toppers">
              <IconButton
                // onClick={() => handleSearch(searchTerm)}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
                onClick={() =>
                  navigate(`/RITeSchool/Teacher/AttendanceTopperspage`)
                }
              >
                <MilitaryTechIcon />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Old Attendance Records">
              <IconButton
                // onClick={() => handleSearch(searchTerm)}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <CalendarMonthIcon />
              </IconButton>
            </Tooltip> */}
          </>
        }
      />
      <Box>
        <Grid container spacing={2}>
          {cardData.map((data, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  padding: 0,
                  textAlign: 'center',
                }}
              >
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#38548A',
                    }}
                  >
                    {data.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      //   color: '#333',
                    }}
                  >
                    {data.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <Box sx={{ pl: 2 }}>
        <CardCalenderList
          ItemList={ItemList}
          ClickItem={ClickItem}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          formattedDate={FormattedDate}
          DefaultValue={DefaultValue}
          ArrayList={HeaderPublish}
        />
      </Box> */}
    </Box>
  );
};
export default StudentDetailsAttendance;
