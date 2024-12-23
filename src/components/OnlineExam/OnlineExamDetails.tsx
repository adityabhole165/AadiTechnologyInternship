import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  ExamSchedules,
  IOnlineExamQuestions
} from 'src/interfaces/Student/OnlineExam';
import Note from 'src/libraries/Note/Note';
import BackButton from 'src/libraries/button/BackButton';
import PageHeader from 'src/libraries/heading/PageHeader';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  GetAnswerDetailsList,
  GetExamSchedulesListList,
  GetQuestionDetailsList
} from 'src/requests/Student/OnlineExam';
import { RootState } from 'src/store';
import { decodeURL } from '../Common/Util';
import CardQA from './CardQA';

const onlineExamDetails = () => {
  const dispatch = useDispatch();
  let {
    ExamId,
    SubjectId
  } = useParams();

  // Decode in-place
  ExamId = decodeURL(ExamId);
  SubjectId = decodeURL(SubjectId);

  const QuestionDetailsList = useSelector(
    (state: RootState) => state.OnlineExam.QuestionDetailsList
  );
  const AnswerDetailsList = useSelector(
    (state: RootState) => state.OnlineExam.AnswerDetailsList
  );
  const ExamSchedules = useSelector(
    (state: RootState) => state.OnlineExam.ExamSchedulesList
  );
  const note = [
    '1) After clicking on the start exam button exam will start.',
    '2) On time out system will auto-save and submit the given answers.'
  ];
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
  const EXAMid = localStorage.setItem('Examid', ExamId);
  const Subjectid = localStorage.setItem('SubjectId', SubjectId);

  return (
    <>
      <Box sx={{ px: 2 }}>
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
              {/* <Card1
                header={examSchedules.Exam}
                text1={examSchedules.Subject}
                text2={examSchedules.StartTime + '-' + examSchedules.EndTime}
                text5=""
                text3={examSchedules.StartDate}
                text4=""
                text6=""
                Color=""
                margin=""
                FileName=""
                key=""
              /> */}
              <CardQA
                key={i}
                header={examSchedules.Exam}
                text1={examSchedules.Subject}
                text2={examSchedules.StartTime + ' - ' + examSchedules.EndTime}
                text3={examSchedules.StartDate}
              />
            </>
          );
        })}
        <RouterLink
          to={`/${location.pathname.split('/')[1]}/Student/QueAns`}
          style={{ textDecoration: 'none' }}
        >
          <ButtonPrimary fullWidth color="primary">
            Start Exam
          </ButtonPrimary>
        </RouterLink>
        <Note NoteDetail={note} />
      </Box>
    </>
  );
};

export default onlineExamDetails;
