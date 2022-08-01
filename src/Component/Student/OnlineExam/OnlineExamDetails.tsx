import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  GetQuestionDetailsList,
  GetAnswerDetailsList,
  GetExamSchedulesListList
} from 'src/Client_Api/Student/OnlineExam';
import {
  ExamSchedules,
  IOnlineExamQuestions
} from 'src/Interface/Student/OnlineExam';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import ExamDetails from 'src/UI_Library/list/examDetailsCard';
import BackButton from 'src/UI_Library/button/BackButton';
import { useParams } from 'react-router-dom';

const onlineExamDetails = () => {
  const dispatch = useDispatch();
  const { ExamId, SubjectId} = useParams();
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
      <PageHeader heading={'Online Exam Details'} subheading={''} />
      <BackButton />
      {ExamSchedules?.map((examSchedules: ExamSchedules, i) => {
        return (
          <>
            <ExamDetails
              Exam={examSchedules.Exam}
              StartDate={examSchedules.StartDate}
              StartTime={examSchedules.StartTime}
              EndDate={examSchedules.EndDate}
              EndTime={examSchedules.EndTime}
              SubjectName={examSchedules.Subject}
            />
          </>
        );
      })}
    </>
  );
};

export default onlineExamDetails;
