import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  GetQuestionDetailsList,
  GetAnswerDetailsList,
  GetExamSchedulesListList
} from 'src/requests/Student/OnlineExam';
import {
  ExamSchedules,
  IOnlineExamQuestions
} from 'src/interfaces/Student/OnlineExam';
import PageHeader from 'src/libraries/heading/PageHeader';
import ExamDetails from 'src/libraries/list/examDetailsCard';
import BackButton from 'src/libraries/button/BackButton';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Card1 from 'src/libraries/mainCard/Card1';

const onlineExamDetails = () => {
  const dispatch = useDispatch();
  const { ExamId, SubjectId } = useParams();
  const QuestionDetailsList = useSelector(
    (state: RootState) => state.OnlineExam.QuestionDetailsList
  );
  const AnswerDetailsList = useSelector(
    (state: RootState) => state.OnlineExam.AnswerDetailsList
  );
  const ExamSchedules = useSelector(
    (state: RootState) => state.OnlineExam.ExamSchedulesList
  );

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const asStudentId = sessionStorage.getItem('StudentId');

  const QuestionsForOnlineExam: IOnlineExamQuestions = {
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    asStandardId: asStandardId,
    asStdDivId: asStandardDivisionId,
    asSubjectId: SubjectId,
    asSchoolwiseTestId: ExamId,
    asStudentId: asStudentId
  };

  useEffect(() => {
    dispatch(GetQuestionDetailsList(QuestionsForOnlineExam));
    dispatch(GetAnswerDetailsList(QuestionsForOnlineExam));
    dispatch(GetExamSchedulesListList(QuestionsForOnlineExam));
  }, []);

  return (
    <>
      <Container>
        <PageHeader heading={'Online Exam Details'} subheading={''} />

        <BackButton FromRoute={'/Student/OnlineExam'} />

        {ExamSchedules?.map((examSchedules: ExamSchedules, i) => {
          return (
            <>
              {/* <ExamDetails
              Exam={examSchedules.Exam}
              StartDate={examSchedules.StartDate}
              StartTime={examSchedules.StartTime}
              EndDate={examSchedules.EndDate}
              EndTime={examSchedules.EndTime}
              SubjectName={examSchedules.Subject}
            /> */}
              <Card1
                header={examSchedules.Exam}
                text1={examSchedules.Subject}
                text2={examSchedules.StartTime + '-' + examSchedules.EndTime}
                text5=""
                text3={examSchedules.StartDate}
                Color=""
                margin=""
                FileName=""
                key=""
              />
            </>
          );
        })}
      </Container>
    </>
  );
};

export default onlineExamDetails;
