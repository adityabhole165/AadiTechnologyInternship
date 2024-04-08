import QuestionMark from '@mui/icons-material/QuestionMark';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {
  IGetTestMarkBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import {
  getmarklist
} from 'src/requests/ExamResult/RequestSubjectMarkList';
import { RootState, useSelector } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
const SubjectMarkList = () => {
  const dispatch = useDispatch();
  const { StandardDivisionId, teacherName, examName, subjectName } = useParams();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const HeaderList = ['Rank', 'Class', 'Roll No.', 'Student Name', 'Marks'];
  const Note: string = "Displays brief mark list with toppers for selected class-subject."
  const HoverNote: string = "To view the student name take your mouse on the roll number."

  const TestMarkList: any = useSelector(
    (state: RootState) => state.SubjectMarkList.listTestName);
  // console.log(TestMarkList, "jhshf");
  const StudentNamelistMouseOver: any = useSelector(
    (state: RootState) => state.SubjectMarkList.StudentNameMouseOver);
  console.log(StudentNamelistMouseOver, "jjjjj");

  const GetTestMarkBody: IGetTestMarkBody = {
    "asSchoolId": 18,
    "asStandardDivision_Id": 1266,
    "asSubject_Id": 2344,
    "asTestId": 592,
    "asAcademicYearID": 54,
    "asShowTotalAsPerOutOfMarks": "Y"
  }
  // const GetStudentsForSubjectMarkMouseOver: GetStudentsForSubjectMarkMouseOverBody = {
  //   "ID_Num": "1",
  //   "Name": "Miss Gauri Vishal Bhadale",
  //   "Roll_No": "1",
  //   "SchoolWise_Standard_Division_Id": "1266",
  //   "School_Id": "18",
  //   "Standard_Id": "1068",
  //   "Division_id": "1289",
  //   "Student_Id": "37608",
  //   "Enrolment_Number": "2501",
  //   "Admission_Date": "03-01-2014 00:00:00",
  //   "First_Name": "Gauri",
  //   "Middle_Name": "Vishal",
  //   "Last_Name": "Bhadale",
  //   "SchoolWise_Student_Id": "3559",
  //   "Standard_Division_Name": "7 - B"

  // }
  // useEffect(() => {
  //   dispatch(studentmouseoverlist(GetStudentsForSubjectMarkMouseOver));
  // }, []);
  useEffect(() => {
    dispatch(getmarklist(GetTestMarkBody));
  }, []);


  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Subject Mark List',
              path: ''
            }
          ]}
        />
        <Box sx={{ p: 2, background: 'white' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={"Class"}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#e3f2fd' }}
                value={teacherName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={"Exam "}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#e3f2fd' }}
                value={examName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label={"Subject Name"}
                InputLabelProps={{ shrink: true }}
                sx={{ bgcolor: '#e3f2fd' }}
                value={subjectName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Tooltip title={HoverNote}>
                <IconButton

                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                      backgroundColor: grey[500]
                    }
                  }}
                >
                  <PriorityHighIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs={3}>
              <Tooltip title={Note}>
                <IconButton

                  sx={{
                    color: 'white',
                    backgroundColor: grey[500],
                    '&:hover': {
                      backgroundColor: grey[500]
                    }
                  }}
                >
                  <QuestionMark />
                </IconButton>
              </Tooltip>
            </Grid>

          </Grid>
        </Box>
        {/* <DynamicList
          HeaderList={HeaderList}
          ItemList={TestMarkList}
          IconList={""}
          ClickItem={""}
          // LinkList={true}
          ClickLink={true}
        /> */}
      </Box>
    </>
  )
}

export default SubjectMarkList