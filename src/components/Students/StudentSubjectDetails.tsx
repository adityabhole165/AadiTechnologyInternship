
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

const StudentSubjectDetails = ({ streamwiseSubject, onChange }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { standardId, DivisionId, YearWise_Student_Id, SchoolWise_Student_Id, StandardDivision } = location.state || {};
  // Session Variables
  const schoolId = localStorage.getItem('SchoolId');
  const academicYearId = sessionStorage.getItem('AcademicYearId');
  const localUserId = localStorage.getItem('UserId');                     //Environmental User

  const [showSecondOptional, setShowSecondOptional] = useState(false);
  const [streamDetail, setStreamDetail] = useState(false);

  // const [selectedStream, setSelectedStream] = useState('');
  // const [selectedGroup, setSelectedGroup] = useState('');
  // const [compulsorySubjects, setCompulsorySubjects] = useState([]);
  // const [optionalSubject, setOptionalSubject] = useState('');
  // const [CompetiticeExams, setCompetiticeExams] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  useEffect(() => {
    console.log('5️⃣streamwiseSubject data from Parent', streamwiseSubject);
  }, [streamwiseSubject]);

  //#region API Calls
  const IsShowStreamSection = useSelector((state: RootState) => state.StudentUI.ISStudentStreamDetails);
  console.log('4️⃣1️⃣IsShowStreamSection', IsShowStreamSection);
  //const GetStudentStreamwiseSubjectDetails = useSelector((state: RootState) => state.StudentUI.ISGetStudentStreamwiseSubjectDetails);
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


  useEffect(() => {
    if (parseInt(schoolId) === 122) {
      if (IsShowStreamSection[0]?.IsSecondary && !IsShowStreamSection[0]?.IsMidYear) {
        setStreamDetail(true)
      }
    }
  }, [IsShowStreamSection]);

  // const RetriveStudentStreamwiseSubjectBody: IRetriveStudentStreamwiseSubjectBody = {
  //   asSchoolId: 122,
  //   asAcademicYearId: 10,
  //   asStudentId: 3556
  // }

  // useEffect(() => {
  //   dispatch(CDARetriveStudentStreamwiseSubject(RetriveStudentStreamwiseSubjectBody));     //Get StreamDetails
  // }, []);
  //#endregion

  // useEffect(() => {
  //   if (GetStudentStreamwiseSubjectDetails && GetStudentStreamwiseSubjectDetails.length > 0) {
  //     const StudentStreamwiseSubjectDetails = GetStudentStreamwiseSubjectDetails[0];

  //     // Split optional subjects if StreamId is 3
  //     let optionalSubject1 = "";
  //     let optionalSubject2 = "";

  //     if (StudentStreamwiseSubjectDetails.StreamId === "3" && StudentStreamwiseSubjectDetails.OptionalSubjects) {
  //       const optionalSubjects = StudentStreamwiseSubjectDetails.OptionalSubjects.split(',');
  //       optionalSubject1 = optionalSubjects[0] || "";
  //       optionalSubject2 = optionalSubjects[1] || "";
  //     } else {
  //       optionalSubject1 = StudentStreamwiseSubjectDetails.OptionalSubjects || "";
  //     }

  //     // Initialize competitive exams
  //     const competitiveExams = StudentStreamwiseSubjectDetails.CompitativeExam?.split(',').map(Number) || [];

  //     setForm(prevForm => ({
  //       ...prevForm,
  //       streamId: StudentStreamwiseSubjectDetails.StreamId || "",
  //       groupId: StudentStreamwiseSubjectDetails.GroupId || "",
  //       compulsorySubjects: StudentStreamwiseSubjectDetails.CompulsorySubjects || "",
  //       optionalSubject1,
  //       optionalSubject2,
  //       competitiveExams,

  //     }));
  //     // Set visibility of second optional subject dropdown
  //     //setShowSecondOptional(StudentStreamwiseSubjectDetails.StreamId === "3");
  //   }
  // }, [GetStudentStreamwiseSubjectDetails, GetAllStreamsDrop]);
  // console.log('🤬', form);
  const GetAllStremsBody: IGetAllStreamsBody = {
    asSchoolId: Number(schoolId),// Number(schoolId),
  }

  useEffect(() => {
    dispatch(CDAGetAllStreams(GetAllStremsBody));                 //Stream dropdown
  }, []);

  // Fetch groups when stream changes
  useEffect(() => {
    if (streamDetail) {
      if (streamwiseSubject.streamId) {
        const GetAllGroupsOfStreamBody: IGetAllGroupsOfStreamBody = {
          asSchoolId: Number(schoolId),
          asStreamId: Number(streamwiseSubject.streamId),
        };
        dispatch(CDAGetAllGroupsOfStream(GetAllGroupsOfStreamBody));

        // Reset optionalSubject2 when switching away from StreamId 3
        if (streamwiseSubject.streamId !== "3") {
          onChange('optionalSubject2', '');
        }
      }
    }
  }, [streamwiseSubject.streamId]);

  const StreamwiseSubjectDetailsBody: IGetStreamwiseSubjectDetailsBody = {
    asSchoolId: Number(schoolId),// Number(schoolId),
    asStreamGroupId: Number(streamwiseSubject.groupId),
    asAcademicYearId: Number(academicYearId),//Number(academicYearId)
  }

  useEffect(() => {

    dispatch(CDAStreamwiseSubjectDetails(StreamwiseSubjectDetailsBody));//Compulsary,OPtional,CompitativeExams dropdown

  }, [streamwiseSubject.streamId, streamwiseSubject.groupId]);

  //#endregion

  // Update visibility of second optional subject based on both conditions
  useEffect(() => {
    setShowSecondOptional(streamwiseSubject.streamId === "3");
  }, [streamwiseSubject.streamId, streamwiseSubject.optionalSubject2]);

  // Auto-select the single group if available
  useEffect(() => {
    if (GetAllGroupsOfStreamDrop && GetAllGroupsOfStreamDrop.length === 1) {
      const singleGroup = GetAllGroupsOfStreamDrop[0];
      onChange('groupId', singleGroup.Id);
    }
  }, [GetAllGroupsOfStreamDrop]);

  const handleCheckboxChange = (examId: number) => {
    const updatedExams = streamwiseSubject.competitiveExams.includes(examId)
      ? streamwiseSubject.competitiveExams.filter((id) => id !== examId)
      : [...streamwiseSubject.competitiveExams, examId];

    // Convert array to comma-separated string 
    const updatedExamsString = updatedExams.join(',');

    // Notify parent of updated data 
    onChange('competitiveExams', updatedExams);

  };

  const validateForm = () => {
    const newErrors = {};
    // Add validation for second optional subject when StreamId is 3
    if (streamwiseSubject.streamId === "3" && showSecondOptional && !streamwiseSubject.optionalSubject2) {
      newErrors['optionalSubject2'] = true;
    }
    setErrors(newErrors);
    //console.log(!Object.values(newErrors).includes(true));
    return !Object.values(newErrors).includes(true);
  };

  const handleSave = () => {
    const isValid = validateForm();
    // onSave(isValid);
    setMessage(isValid ? 'Draft saved successfully!' : 'Please fill in all required fields.');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={streamwiseSubject.streamId}
            ItemList={GetAllStreamsDrop}
            onChange={(value) => onChange('streamId', value)}
            label={'Stream'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={3}>
          <SearchableDropdown
            sx={{ minWidth: '300px' }}
            defaultValue={streamDetail ? streamwiseSubject.groupId : ''}
            ItemList={GetAllGroupsOfStreamDrop}
            onChange={(value) => onChange('groupId', value)}
            label={'Group'}
            size={'medium'}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            name='compulsorySubjects'
            label="Compulsory Subjects"
            variant="outlined"
            value={streamDetail ? streamwiseSubject.compulsorySubjects : ''}
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
            defaultValue={streamDetail ? streamwiseSubject.optionalSubject1 : ''}
            ItemList={FillFirstOptionalSubjects}
            onChange={(value) => onChange('optionalSubject1', value)}
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
              defaultValue={streamDetail ? streamwiseSubject.optionalSubject2 : ''}
              ItemList={FillSecondOptionalSubjectArts}
              onChange={(value) => onChange('optionalSubject2', value)}
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
                    checked={streamDetail ? streamwiseSubject.competitiveExams.includes(exam.Id) : false}
                    onChange={() => handleCheckboxChange(exam.Id)}
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
