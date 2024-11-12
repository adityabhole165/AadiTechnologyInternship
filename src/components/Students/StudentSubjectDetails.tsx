
// const StudentSubjectDetails = ({ onSave }) => {
//   return (
//     <div>StudentSubjectDetails</div>
//   )
// }

// export default StudentSubjectDetails
import { Box, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllGroupsOfStreamBody, IGetAllStreamsBody, IGetStreamwiseSubjectDetailsBody } from 'src/interfaces/Students/IStudentUI';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetAllGroupsOfStream, CDAGetAllStreams, CDAStreamwiseSubjectDetails } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';

const StudentSubjectDetails = ({ onSave }) => {
  const dispatch = useDispatch();
  // State to manage the selected stream, group, and optional subjects
  const [selectedStream, setSelectedStream] = useState('science');
  const [selectedGroup, setSelectedGroup] = useState('groupA');
  const [optionalSubject, setOptionalSubject] = useState('Physical Education');
  const [selectedExams, setSelectedExams] = useState([]);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({});
  //#region API Calls
  const GetAllStreamsDrop = useSelector((state: RootState) => state.StudentUI.ISGetAllStreams);
  //console.log('GetAllStreamsDrop:', GetAllStreamsDrop);
  const GetAllGroupsOfStreamDrop = useSelector((state: RootState) => state.StudentUI.ISGetAllGroupsOfStream);
  //console.log('GetAllGroupsOfStream:', GetAllGroupsOfStreamDrop);
  //const GetStreamwiseSubjectDetails = useSelector((state: RootState) => state.StudentUI.ISGetStreamwiseSubjectDetails);

  const GetAllStremsBody: IGetAllStreamsBody = {
    asSchoolId: 122,
  }

  const GetAllGroupsOfStreamBody: IGetAllGroupsOfStreamBody = {
    asSchoolId: 122,
    asStreamId: 1
  }

  const CDAStreamwiseSubjectDetailsBody: IGetStreamwiseSubjectDetailsBody = {
    asSchoolId: 122,
    asStreamGroupId: 4,
    asAcademicYearId: 10
  }
  useEffect(() => {
    dispatch(CDAGetAllStreams(GetAllStremsBody));
    dispatch(CDAGetAllGroupsOfStream(GetAllGroupsOfStreamBody));
    dispatch(CDAStreamwiseSubjectDetails(CDAStreamwiseSubjectDetailsBody));

  }, []);

  //#endregion
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
            ItemList={GetAllStreamsDrop}
            onChange={handleStreamChange}
            label={'Stream'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            ItemList={GetAllGroupsOfStreamDrop}
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

        {/* <Grid item xs={12} pt={2}>
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
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default StudentSubjectDetails;
