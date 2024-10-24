
// const StudentSubjectDetails = ({ onSave }) => {
//   return (
//     <div>StudentSubjectDetails</div>
//   )
// }

// export default StudentSubjectDetails

import { Box, Button, Grid, TextField } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useState } from 'react';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';

const StudentSubjectDetails = ({ onSave }) => {
  // State to manage the selected stream, group, and optional subjects
  const [selectedStream, setSelectedStream] = useState('science');
  const [selectedGroup, setSelectedGroup] = useState('groupA');
  const [optionalSubject, setOptionalSubject] = useState('Physical Education');
  const [selectedExams, setSelectedExams] = useState([]);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});

  const streamList = [
    { id: 1, Name: 'Science', value: 'science' },
    { id: 2, Name: 'Commerce', value: 'commerce' },
    { id: 3, Name: 'Arts', value: 'arts' },
  ];

  const groupList = [
    { id: 1, Name: 'Group A', value: 'groupA' },
    { id: 2, Name: 'Group B', value: 'groupB' },
    { id: 3, Name: 'Group C', value: 'groupC' },
  ];

  const optionalSubjectsList = [
    { id: 1, Name: 'Physical Education', value: 'Physical Education' },
    { id: 2, Name: 'Computer Science', value: 'Computer Science' },
  ];

  const competitiveExamsList = [
    { id: 1, Name: 'JEE', value: 'jee' },
    { id: 2, Name: 'EXTRA COACHING', value: 'extracoaching' },
  ];

  const compulsorySubjects = ['Mathematics', 'English', 'Biology']; // Example compulsory subjects

  const handleStreamChange = (event, selectedOption) => {
    setSelectedStream(selectedOption?.value || '');
  };

  const handleGroupChange = (event, selectedOption) => {
    setSelectedGroup(selectedOption?.value || '');
  };

  const handleOptionalSubjectChange = (event, selectedOption) => {
    setOptionalSubject(selectedOption?.value || '');
  };

  const handleCompetitiveExamsChange = (event, selectedOption) => {
    setSelectedExams(selectedOption.map(option => option.value));
  };

  const validateForm = () => {
    const newErrors = {};
    setErrors(newErrors);
    console.log(!Object.values(newErrors).includes(true));
    return !Object.values(newErrors).includes(true);
  };

  const handleSave = () => {
    const isValid = validateForm();
    onSave(isValid);
    setMessage(isValid ? 'Draft saved successfully!' : 'Please fill in all required fields.');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={streamList}
            onChange={handleStreamChange}
            label={'Stream'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={groupList}
            onChange={handleGroupChange}
            label={'Group'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Compulsory Subjects"
            variant="outlined"
            value={compulsorySubjects.join(', ')}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        {/* Optional Subject as Searchable Dropdown */}
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={optionalSubjectsList}
            onChange={handleOptionalSubjectChange}
            label={'Optional Subject'}
            size={'medium'}
          />
        </Grid>

        {/* Competitive Exams as Multi-Select Searchable Dropdown */}
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={competitiveExamsList}
            onChange={handleCompetitiveExamsChange}
            label={'Competitive Exams'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={12} pt={2}>
          <Button
            sx={{
              color: '#38548A',
              backgroundColor: grey[100],
              '&:hover': {
                color: '#38548A',
                backgroundColor: blue[100],
              },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentSubjectDetails;
