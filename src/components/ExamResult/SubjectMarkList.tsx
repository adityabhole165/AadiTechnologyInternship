import { Box, Grid, TextField } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import {
  IGetTestMarkBody
} from 'src/interfaces/ExamResult/ISubjectMarkList';
import DynamicList from 'src/libraries/list/DynamicList';
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

  const TestMarkList: any = useSelector(
    (state: RootState) => state.SubjectMarkList.listTestName
  );
  console.log(TestMarkList, "jhshf");

  const GetTestMarkBody: IGetTestMarkBody = {
    "asSchoolId": 18,
    "asStandardDivision_Id": 1266,
    "asSubject_Id": 2344,
    "asTestId": 592,
    "asAcademicYearID": 54,
    "asShowTotalAsPerOutOfMarks": "Y"
  }
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
          </Grid>
        </Box>
        <DynamicList
          HeaderList={HeaderList}
          ItemList={TestMarkList}
          IconList={""}
          ClickItem={""}
          // LinkList={true}
          ClickLink={true}
        />
      </Box>
    </>
  )
}

export default SubjectMarkList