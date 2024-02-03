import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import IOnlineTest, {
  GetAllSubjectsForExamdata,
  GetAllTestsForStudentdata,
  IOnlineTestSubject
} from 'src/interfaces/Student/OnlineExam';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import PageHeader from 'src/libraries/heading/PageHeader';
import Card1 from 'src/libraries/mainCard/Card1';
import {
  GetOnlineExamList,
  GetOnlineExamSubjectList
} from 'src/requests/Student/OnlineExam';
import { RootState } from 'src/store';

const onlineExam = () => {
  const dispatch = useDispatch();
  const [examid, setexamid] = useState('');
  const OnlineExamList = useSelector(
    (state: RootState) => state.OnlineExam.GetAllTestsForStudentdata
  );
  const SubjectList = useSelector(
    (state: RootState) => state.OnlineExam.SubjectList
  );

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');

  const OnlineExamList_body: IOnlineTest = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    aiStudentId: asStudentId
  };

  const SubjectList_body: IOnlineTestSubject = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    asExamId: parseInt(`${examid}`),
    aiStudentId: asStudentId
  };

  const handleChange = (event) => {
    if (examid === '0') {
      event.preventDefault();
    }

    setexamid(event?.target.value);
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(GetOnlineExamList(OnlineExamList_body));
  }, []);

  useEffect(() => {
    if (examid === 'Select Exam' || examid === '0') {
      return null;
    } else {
      dispatch(GetOnlineExamSubjectList(SubjectList_body));
    }
  }, [examid]);
  return (
    <Container>
      <PageHeader heading={'Online Exam Schedule'} subheading={''} />
      {OnlineExamList.length === 0 ? (
        <ErrorMessages Error={'No exam has been scheduled'} />
      ) : (
        <FormControl
          sx={{ marginTop: '50px', m: 1, width: '100%', marginLeft: '0px' }}
        >
          {
            <NativeSelect onChange={handleChange}>
              <option value="Select Exam" selected>
                Select Exam
              </option>
              {OnlineExamList?.map(
                (allexamslist: GetAllTestsForStudentdata, i) => {
                  return (
                    <option value={allexamslist.ExamId} key={i}>
                      {allexamslist.ExamName}
                    </option>
                  );
                }
              )}
            </NativeSelect>
          }
        </FormControl>
      )}
      {SubjectList?.map((subjectList: GetAllSubjectsForExamdata, i) => {
        return (
          <>
            <RouterLink
              to={
                `/${
                  location.pathname.split('/')[1]
                }/Student/onlineExamDetails/` +
                subjectList.Exam_Id +
                '/' +
                subjectList.SubjectId
              }
              style={{ textDecoration: 'none' }}
            >
              <Card1
                header={subjectList.SubjectName}
                text1=""
                text2={subjectList.StartTime + '-' + subjectList.EndTime}
                text5=""
                text3={subjectList.StartDate}
                text4=""
                text6=""
                Color=""
                margin=""
                FileName=""
                Textcolor=""
                key=""
              />
            </RouterLink>
          </>
        );
      })}
    </Container>
  );
};

export default onlineExam;
