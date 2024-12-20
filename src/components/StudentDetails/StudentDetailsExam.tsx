import { QuestionMark, SearchTwoTone } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import PrintIcon from '@mui/icons-material/Print';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useState } from 'react';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import CommonPageHeader from '../CommonPageHeader';
import GradeConfigurationPopup from './GradeConfigurationPopup';

const StudentDetailsExam = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => setPopupOpen(true);
  const handleClosePopup = () => setPopupOpen(false);
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
            title: 'Old Academic Record',
            path: ''
          }
        ]}
        rightActions={
          <>
            <SearchableDropdown
              sx={{ minWidth: '200px' }}
              ItemList={years} // Array of years
              label={'Old Academic Record'}
              size={'small'}
            />

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
            <Tooltip title="Displays progress report of published exams of selected/all students.">
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
            <Tooltip title="Print">
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Grade Configuration Details">
              <IconButton
                onClick={handleOpenPopup}
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <FactCheckTwoToneIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Box>
        <GradeConfigurationPopup
          open={isPopupOpen}
          onClose={handleClosePopup}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="right"
        alignItems="center"
        gap={2} // Space between buttons
        sx={{ margin: '16px' }}
      >
        {/* Button for Term I */}
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          sx={{
            textTransform: 'none',
            fontSize: '14px',
            borderColor: '#ccc',
            color: 'black',
            backgroundColor: 'white'
          }}
        >
          Download Term I Report
        </Button>

        {/* Button for Term II */}
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          sx={{
            textTransform: 'none',
            fontSize: '14px',
            borderColor: '#ccc',
            color: 'black',
            backgroundColor: 'white'
          }}
        >
          Download Term II Report
        </Button>
      </Box>

      <Box textAlign="center" sx={{ backgroundColor: 'white', p: 2 }}>
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
          On publish, you will see download buttons to download Term 1/2
          progress report.
        </Typography>
      </Box>
    </Box>
  );
};
export default StudentDetailsExam;
