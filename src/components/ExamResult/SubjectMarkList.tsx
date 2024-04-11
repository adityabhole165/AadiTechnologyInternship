import QuestionMark from '@mui/icons-material/QuestionMark';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {
  IGetTestMarkBody,GetStudentsForSubjectMarkMouseOverBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import {
  gettestmarklist,studentmouseoverlist
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
    (state: RootState) => state.SubjectMarkList.listTestMark);
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
  const GetStudentsForSubjectMarkMouseOver: GetStudentsForSubjectMarkMouseOverBody = {
    "asSchoolId":18,
    "asAcademicYearId":54,
    "asStandardDivId":1266,
    "asNoOfRecord":15,
    "asTestId":592,
    "asSubjectId":2344

  }
  useEffect(() => {
    dispatch(studentmouseoverlist(GetStudentsForSubjectMarkMouseOver));
  }, []);
  useEffect(() => {
    dispatch(gettestmarklist(GetTestMarkBody));
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