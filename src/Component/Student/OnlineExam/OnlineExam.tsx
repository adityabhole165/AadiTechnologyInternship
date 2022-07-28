import { useDispatch } from 'react-redux';
import {
  GetOnlineExamList,
  GetOnlineExamSubjectList
} from 'src/Client_Api/Student/OnlineExam';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import IOnlineTest, {
  GetAllTestsForStudentdata,
  GetAllSubjectsForExamdata,
  IOnlineTestSubject
} from 'src/Interface/Student/OnlineExam';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import List6 from 'src/UI_Library/list/List6';

const onlineExam = () => {
  const dispatch = useDispatch();
  const [examid, setexamid] = useState('');
  const OnlineExamList = useSelector(
    (state: RootState) => state.OnlineExam.GetAllTestsForStudentdata
  );
  const SubjectList = useSelector(
    (state: RootState) => state.OnlineExam.SubjectList
  );

  const OnlineExamList_body: IOnlineTest = {
    aiSchoolId: 120,
    aiAcademicYrId: 8,
    aiStudentId: 11585
  };

  const SubjectList_body: IOnlineTestSubject = {
    aiSchoolId: 120,
    aiAcademicYrId: 8,
    asExamId: parseInt(`${examid}`),
    aiStudentId: 11585
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
              index={i}
            />
          </>
        );
      })}
    </>
  );
};

export default onlineExam;
