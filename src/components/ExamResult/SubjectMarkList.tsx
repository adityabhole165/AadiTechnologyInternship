import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {
  GetFirstThreeToopersBody,
  GetStudentsForSubjectMarkMouseOverBody,
  IGetTestMarkBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import DynamicList from 'src/libraries/list/DynamicList';
import {
  firstthreetopperslist,
  gettestmarklist, studentmouseoverlist
} from 'src/requests/ExamResult/RequestSubjectMarkList';
import { RootState, useSelector } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
const SubjectMarkList = () => {
  const dispatch = useDispatch();
  const { SubjectId, TestId, StandardDivisionId, getExamName, getTeacherName, getSubjectName } = useParams();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const Note: string = "Displays brief mark list with toppers for selected class-subject."
  const HoverNote: string = "To view the student name take your mouse on the roll number."

  const TestMarkList: any = useSelector(
    (state: RootState) => state.SubjectMarkList.listTestMark);
  const HeaderList: any = useSelector(
    (state: RootState) => state.SubjectMarkList.HeaderList);

  const StudentNamelistMouseOver: any = useSelector(
    (state: RootState) => state.SubjectMarkList.StudentNameMouseOver);
  // console.log(StudentNamelistMouseOver, "jjjjj");
  const ListLegend: any = useSelector(
    (state: RootState) => state.SubjectMarkList.legend);
  const FirstThreeToppers: any = useSelector(
    (state: RootState) => state.SubjectMarkList.ThreeToppersList);

  const GetTestMarkBody: IGetTestMarkBody = {
    asSchoolId: Number(asSchoolId),
    asStandardDivision_Id: Number(StandardDivisionId),
    asSubject_Id: Number(SubjectId),
    asTestId: Number(TestId),
    asAcademicYearID: Number(asAcademicYearId),
    asShowTotalAsPerOutOfMarks: "Y"
  }
  const GetStudentsForSubjectMarkMouseOver: GetStudentsForSubjectMarkMouseOverBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivId: Number(StandardDivisionId),
    asNoOfRecord: 15,
    asTestId: Number(TestId),
    asSubjectId: Number(SubjectId),

  }
  const GetFirstThreeToopers: GetFirstThreeToopersBody = {
    "asAcademicYearID": Number(asAcademicYearId),
    "asSchoolId": Number(asSchoolId),
    "asStandardDivision_Id": Number(StandardDivisionId),
    "asSubject_Id": Number(SubjectId),
    "asTestId": Number(TestId)
  }
  useEffect(() => {
    dispatch(firstthreetopperslist(GetFirstThreeToopers));
  }, []);

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
                value={getTeacherName}
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
                value={getExamName}
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
                value={getSubjectName}
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
        {(HeaderList.length > 0) &&
          (<Grid container>
            <Grid xs={4}>
              <DynamicList
                HeaderList={HeaderList}
                ItemList={TestMarkList.
                  filter((item) => { return item.Index < 15 })
                }
                IconList={[]}
                ClickItem={""}
                // LinkList={true}
                ClickLink={true}
              /></Grid><Grid xs={4}>
              <DynamicList
                HeaderList={HeaderList}
                ItemList={TestMarkList.
                  filter((item) => { return (item.Index > 14 && item.Index < 30) })
                }
                IconList={[]}
                ClickItem={""}
                // LinkList={true}
                ClickLink={true}
              /></Grid><Grid xs={4}>
              <DynamicList
                HeaderList={HeaderList}
                ItemList={TestMarkList.
                  filter((item) => { return (item.Index > 29 && item.Index < 45) })
                }
                IconList={[]}
                ClickItem={""}
                // LinkList={true}
                ClickLink={true}
              /></Grid>

          </Grid>)
        }
      </Box>
    </>
  )
}

export default SubjectMarkList