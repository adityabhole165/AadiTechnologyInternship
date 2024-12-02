import { QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { blue, grey, green } from '@mui/material/colors';
import React from 'react';
import CommonPageHeader from '../CommonPageHeader';
import SaveIcon from '@mui/icons-material/Save';
import SquareIcon from '@mui/icons-material/Square';

import StudentTable from './StudentTable';
import AddSiblingStudentTable from './AddSiblingStudentTable';
const EnterStudentSiblingDetails = () => {
  const students = [
    { id: 2057, name: 'Master Pranav Digambar Dubal', class: '10 - D' },
    { id: 2060, name: 'Miss Ishita Dattatray Gaikwad', class: '10 - A' },
    { id: 2061, name: 'Miss Sanskruti Dilip Gaikwad', class: '10 - A' },
    { id: 2063, name: 'Miss Arya Krushnakumar Garde', class: '10 - D' },
    { id: 2065, name: 'Miss Nirmayee Nagesh Ghatpande', class: '10 - A' },
    { id: 2066, name: 'Master Harshwardhan Vijay Ghule', class: '10 - D' },
    { id: 2067, name: 'Miss Rajlaxmi Vijay Ghule', class: '10 - B' },
    { id: 2068, name: 'Master Shambhuraj Abhijit Ghule', class: '10 - A' },
    { id: 2069, name: 'Master Shlok Ashwinkumar Gilda', class: '10 - A' }
  ];
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Students', path: '/extended-sidebar/Teacher/Students' },
          {
            title: 'Enter Students Details',
            path: '/extended-sidebar/Teacher/StudentRegistrationForms'
          },
          {
            title: 'Enter Student Sibling Details',
            path: '/extended-sidebar/Teacher/EnterStudentSiblingDetails'
          }
        ]}
        rightActions={
          <>
            <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label={'Student Name'}
              variant="outlined"
              size="small"
            />
            <TextField
              sx={{ width: '15vw' }}
              fullWidth
              label={
                <span>
                  Name / Reg. No.<span style={{ color: 'red' }}> </span>
                </span>
              }
              variant="outlined"
              size="small"
              //   value={searchTerm}
              //   onChange={(e) => handleSearch(e.target.value)}
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

            {/* <Tooltip title={'Add/Edit student details and click on "Save".'}>
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
            </Tooltip> */}

            <Tooltip title={'Save'}>
              <IconButton
                // onClick={handleFormSubmission}
                sx={{
                  color: 'white',
                  backgroundColor: green[500],
                  '&:hover': {
                    backgroundColor: green[600]
                  }
                }}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Box sx={{ background: 'white', p: 1, mb:1 }}>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <SquareIcon style={{ color: '#F0F0F0', fontSize: 25, position: 'relative', top: '-2px' }} />
              <Typography variant='h6'>Deactivated User </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: 'white', padding: '1rem' }}>
        <Typography variant="h4" sx={{ py: 1}}>
         
          Sibling Details
        </Typography>
        <AddSiblingStudentTable />
      </Box>

      <Box sx={{ backgroundColor: 'white', padding: '1rem' }}>
        <StudentTable students={students} />
      </Box>
    </Box>
  );
};
export default EnterStudentSiblingDetails;
