import { useDispatch } from 'react-redux';
import {
  GetOnlineExamList,
  GetOnlineExamSubjectList
} from 'src/requests/Student/OnlineExam';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import IOnlineTest, {
  GetAllTestsForStudentdata,
  GetAllSubjectsForExamdata,
  IOnlineTestSubject
} from 'src/interfaces/Student/OnlineExam';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import List6 from 'src/libraries/list/List6';

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
    <>
      <PageHeader heading={'Online Exam'} subheading={''} />
      <Container>
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
      </Container>
      {SubjectList?.map((subjectList: GetAllSubjectsForExamdata, i) => {
        return (
          <>
            <List6
              StartDate={subjectList.StartDate}
              StartTime={subjectList.StartTime}
              EndTime={subjectList.EndTime}
              SubjectName={subjectList.SubjectName}
              ExamId={subjectList.Exam_Id}
              SubjectId={subjectList.SubjectId}
              index={i}
            />
          </>
        );
      })}
    </>
  );
};

export default onlineExam;
