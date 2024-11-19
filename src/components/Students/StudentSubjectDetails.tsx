
// const StudentSubjectDetails = ({ onSave }) => {
//   return (
//     <div>StudentSubjectDetails</div>
//   )
// }

// export default StudentSubjectDetails
import { Box, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IGetAllGroupsOfStreamBody, IGetAllStreamsBody, IGetStreamwiseSubjectDetailsBody } from 'src/interfaces/Students/IStudentUI';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetAllGroupsOfStream, CDAGetAllStreams, CDAStreamwiseSubjectDetails } from 'src/requests/Students/RequestStudentUI';
import { RootState } from 'src/store';

const StudentSubjectDetails = ({ onTabChange }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision } = location.state || {};
  // Session Variables
  const schoolId = localStorage.getItem('SchoolId');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const teacherId = sessionStorage.getItem('TeacherId');

  // State to manage the selected stream, group, and optional subjects
  const [form, setForm] = useState({
    streamId: '',
    groupId: '',
    compulsorySubjects: '',
    optionalSubject: '',
    optionalSubject1: '',
    optionalSubject2: '',
    competitiveExams: [],
  })

  const [showSecondOptional, setShowSecondOptional] = useState(false);
  // const [selectedStream, setSelectedStream] = useState('');
  // const [selectedGroup, setSelectedGroup] = useState('');
  // const [compulsorySubjects, setCompulsorySubjects] = useState([]);
  // const [optionalSubject, setOptionalSubject] = useState('');
  // const [CompetiticeExams, setCompetiticeExams] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  //#region API Calls
  const GetStudentStreamwiseSubjectDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentStreamwiseSubjectDetails);
  //console.log('🎈GetStudentStreamwiseSubjectDetails:', GetStudentStreamwiseSubjectDetails);
  const GetAllStreamsDrop = useSelector((state: RootState) => state.StudentUI.ISGetAllStreams);
  //console.log('GetAllStreamsDrop:', GetAllStreamsDrop);
  const GetAllGroupsOfStreamDrop = useSelector((state: RootState) => state.StudentUI.ISGetAllGroupsOfStream);
  //console.log('😶GetAllGroupsOfStream:', GetAllGroupsOfStreamDrop);
  const FillFirstOptionalSubjects = useSelector((state: RootState) => state.StudentUI.ISFillOptionalSubjects);
  const FillSecondOptionalSubjectArts = useSelector((state: RootState) => state.StudentUI.ISFillOptionalSubjectArts);
  //console.log('1️⃣FillFirstOptionalSubjects:', FillFirstOptionalSubjects);
  // console.log('2️⃣FillSecondOptionalSubjectArts:', FillSecondOptionalSubjectArts);
  const FillCompitativeExams = useSelector((state: RootState) => state.StudentUI.ISFillCompitativeExams);
  //console.log('3️⃣FillCompitativeExams:', FillCompitativeExams);


  // const RetriveStudentStreamwiseSubjectBody: IRetriveStudentStreamwiseSubjectBody = {
  //   asSchoolId: 122,
  //   asAcademicYearId: 10,
  //   asStudentId: 3556
  // }

  // useEffect(() => {
  //   dispatch(CDARetriveStudentStreamwiseSubject(RetriveStudentStreamwiseSubjectBody));     //Get StreamDetails
  // }, []);
  //#endregion

  useEffect(() => {
    if (GetStudentStreamwiseSubjectDetails && GetStudentStreamwiseSubjectDetails.length > 0) {
      const StudentStreamwiseSubjectDetails = GetStudentStreamwiseSubjectDetails[0];

      // Split optional subjects if StreamId is 3
      let optionalSubject1 = "";
      let optionalSubject2 = "";

      if (StudentStreamwiseSubjectDetails.StreamId === "3" && StudentStreamwiseSubjectDetails.OptionalSubjects) {
        const optionalSubjects = StudentStreamwiseSubjectDetails.OptionalSubjects.split(',');
        optionalSubject1 = optionalSubjects[0] || "";
        optionalSubject2 = optionalSubjects[1] || "";
      } else {
        optionalSubject1 = StudentStreamwiseSubjectDetails.OptionalSubjects || "";
      }

      // Initialize competitive exams
      const competitiveExams = StudentStreamwiseSubjectDetails.CompitativeExam?.split(',').map(Number) || [];

      setForm(prevForm => ({
        ...prevForm,
        streamId: StudentStreamwiseSubjectDetails.StreamId || "",
        groupId: StudentStreamwiseSubjectDetails.GroupId || "",
        compulsorySubjects: StudentStreamwiseSubjectDetails.CompulsorySubjects || "",
        optionalSubject1,
        optionalSubject2,
        competitiveExams,

      }));
      // Set visibility of second optional subject dropdown
      //setShowSecondOptional(StudentStreamwiseSubjectDetails.StreamId === "3");
    }
  }, [GetStudentStreamwiseSubjectDetails, GetAllStreamsDrop]);
  // console.log('🤬', form);
  const GetAllStremsBody: IGetAllStreamsBody = {
    asSchoolId: 122,
  }

  useEffect(() => {
    dispatch(CDAGetAllStreams(GetAllStremsBody));                 //Stream dropdown
    // dispatch(CDARetriveStudentStreamwiseSubject(RetriveStudentStreamwiseSubjectBody));     //Get StreamDetails
  }, []);

  // Fetch groups when stream changes
  useEffect(() => {
    //setShowSecondOptional(form.streamId === "3");
    if (form.streamId) {
      const GetAllGroupsOfStreamBody: IGetAllGroupsOfStreamBody = {
        asSchoolId: 122,
        asStreamId: Number(form.streamId),
      };
      dispatch(CDAGetAllGroupsOfStream(GetAllGroupsOfStreamBody));

      // Reset optionalSubject2 when switching away from StreamId 3
      if (form.streamId !== "3") {
        setForm(prev => ({
          ...prev,
          optionalSubject2: ''
        }));
      }
    }
  }, [form.streamId]);

  const StreamwiseSubjectDetailsBody: IGetStreamwiseSubjectDetailsBody = {
    asSchoolId: 122,
    asStreamGroupId: Number(form.groupId),
    asAcademicYearId: 10
  }

  useEffect(() => {
    //console.log('🙌StreamwiseSubjectDetailsBody:', StreamwiseSubjectDetailsBody);
    dispatch(CDAStreamwiseSubjectDetails(StreamwiseSubjectDetailsBody));//Compulsary,OPtional,CompitativeExams dropdown
    // dispatch(CDARetriveStudentStreamwiseSubject(RetriveStudentStreamwiseSubjectBody));     //Get StreamDetails
  }, [form.groupId]);

  //#endregion

  // Update visibility of second optional subject based on both conditions
  useEffect(() => {
    setShowSecondOptional(form.streamId === "3" || Boolean(form.optionalSubject2));
  }, [form.streamId, form.optionalSubject2]);

  // Auto-select the single group if available
  useEffect(() => {
    if (GetAllGroupsOfStreamDrop && GetAllGroupsOfStreamDrop.length === 1) {
      const singleGroup = GetAllGroupsOfStreamDrop[0];
      setForm(prevForm => ({
        ...prevForm,
        groupId: singleGroup.Id
      }));
    }
  }, [GetAllGroupsOfStreamDrop]);


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

  //const compulsorySubjects = ['Mathematics', 'English', 'Biology']; // Example compulsory subjects
  const handleDropdownChange = (name: string, value: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleCheckboxChange = (examId: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      competitiveExams: prevForm.competitiveExams.includes(examId)
        ? prevForm.competitiveExams.filter(id => id !== examId)
        : [...prevForm.competitiveExams, examId]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    // Add validation for second optional subject when StreamId is 3
    if (form.streamId === "3" && showSecondOptional && !form.optionalSubject2) {
      newErrors['optionalSubject2'] = true;
    }
    setErrors(newErrors);
    console.log(!Object.values(newErrors).includes(true));
    return !Object.values(newErrors).includes(true);
  };

  const handleSave = () => {
    const isValid = validateForm();
    // onSave(isValid);
    setMessage(isValid ? 'Draft saved successfully!' : 'Please fill in all required fields.');
    setTimeout(() => setMessage(''), 2000);
  };
  //#region DataTrannsfer
  useEffect(() => {
    onTabChange(form); // Sends the initial form state to the parent when component mounts
  }, [form]);
  //#endregion

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={form.streamId}
            ItemList={GetAllStreamsDrop}
            onChange={(value) => handleDropdownChange('streamId', value)}
            label={'Stream'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={form.groupId}
            ItemList={GetAllGroupsOfStreamDrop}
            onChange={(value) => handleDropdownChange('groupId', value)}
            label={'Group'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name='compulsorySubjects'
            label="Compulsory Subjects"
            variant="outlined"
            value={form.compulsorySubjects}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </Grid>

        {/* Optional Subject as Searchable Dropdown */}
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={form.optionalSubject1}
            ItemList={FillFirstOptionalSubjects}
            onChange={(value) => handleDropdownChange('optionalSubject1', value)}
            //onChange={handleOptionalSubjectChange}
            label={'Optional Subject'}
            size={'medium'}
          />
        </Grid>
        {/* Conditionally show second optional subject based on stream */}
        {showSecondOptional && (
          <Grid item xs={3}>
            <SearchableDropdown
              sx={{ minWidth: '300px' }}
              defaultValue={form.optionalSubject2}
              ItemList={FillSecondOptionalSubjectArts}
              onChange={(value) => handleDropdownChange('optionalSubject2', value)}
              //onChange={handleOptionalSubjectChange}
              label={'Optional Subject Arts'}
              size={'medium'}
            // error={errors.optionalSubject2}
            />
          </Grid>
        )}


        {/* Competitive Exams as Multi-Select Searchable Dropdown */}
        <Grid item xs={3} sx={{ ml: 2 }}>
          {/* <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={form.compitativeExams}
            ItemList={FillCompitativeExams}
            onChange={(value) => handleDropdownChange('compitativeExams', value)}
            //onChange={handleCompetitiveExamsChange}
            label={'Competitive Exams'}
            size={'medium'}
          /> */}
          <Box>
            <div>Competitive Exams</div>
            {FillCompitativeExams.map((exam) => (
              <FormControlLabel
                key={exam.Id}
                control={
                  <Checkbox
                    checked={form.competitiveExams.includes(Number(exam.Id))}
                    onChange={() => handleCheckboxChange(Number(exam.Id))}
                  />
                }
                label={exam.Name}
              />
            ))}
          </Box>
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
