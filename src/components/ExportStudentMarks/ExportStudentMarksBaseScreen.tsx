import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import CommonPageHeader from '../CommonPageHeader';
import { SearchTwoTone, QuestionMark } from '@mui/icons-material';
import { blue, grey } from '@mui/material/colors';
import GetAppIcon from '@mui/icons-material/GetApp';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

const ExportStudentMarksBaseScreen = () => {
  const [selectedStandard, setSelectedStandard] = useState('');
  const standards = [
    { id: 1, Name: '1st Standard' },
    { id: 2, Name: '2nd Standard' },
    { id: 3, Name: '3rd Standard' },
    { id: 4, Name: '4th Standard' },
    { id: 5, Name: '5th Standard' },
    { id: 6, Name: '6th Standard' },
    { id: 7, Name: '7th Standard' },
    { id: 8, Name: '8th Standard' },
    { id: 9, Name: '9th Standard' },
    { id: 10, Name: '10th Standard' }
  ];

  const assessments = [
    { id: 1, Name: 'Formative Assessment I' },
    { id: 2, Name: 'Formative Assessment II' },
    { id: 3, Name: 'Subject Enrichment Analysis I' },
    { id: 4, Name: 'Progressive Analysis - I' },
    { id: 5, Name: 'Comprehensive Content Review - I' },
    { id: 7, Name: 'Progressive Analysis - II' },
    { id: 8, Name: 'Comprehensive Content Review - II' },
    { id: 8, Name: 'Subject Enrichment Analysis - II' },
    { id: 9, Name: 'Subject Enrichment Analysis - I' }
  ];

  function clickSearch() {
    throw new Error('Function not implemented.');
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedStandard(event.target.value);
  };
  return (
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Export Student Marks',
            path: '/extended-sidebar/Teacher/ExportStudentMarksBaseScreen'
          }
        ]}
        rightActions={
          <>
            <Tooltip
              title={
                'Create new photo galleries or add photos to existing gallery. You can also view all gallery photos by clicking on SlideShow.You can also add or view videos into gallery.'
              }
            >
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
            <Tooltip title={'Export'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <GetAppIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Box sx={{ backgroundColor: 'white', p:2 }}>
         <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            {' '}
            <SearchableDropdown
              sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
              ItemList={standards}
              onChange={handleChange}
              label={'Academic Year'}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {' '}
            <SearchableDropdown
              sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
              ItemList={standards}
              onChange={handleChange}
              label={'Standard '}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {' '}
            <SearchableDropdown
              sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
              ItemList={standards}
              onChange={handleChange}
              label={'Division '}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {' '}
            <SearchableDropdown
              sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
              ItemList={assessments}
              onChange={handleChange}
              label={'Subject '}
              size="medium"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {' '}
            <SearchableDropdown
              sx={{ minWidth: { xs: '100%', sm: '15vw' } }}
              ItemList={assessments}
              onChange={handleChange}
              label={'Test'}
              size="medium"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default ExportStudentMarksBaseScreen;
