import { QuestionMark, SearchTwoTone } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { blue, grey, green } from '@mui/material/colors';
import { SaveIcon } from 'lucide-react';
import React from 'react';
import CommonPageHeader from '../CommonPageHeader';
const EnterStudentSiblingDetails = () => {
  return (
    <Box>
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

              <Tooltip title={'Add/Edit student details and click on "Save".'}>
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
      </Box>
    </Box>
  );
};
export default EnterStudentSiblingDetails;
