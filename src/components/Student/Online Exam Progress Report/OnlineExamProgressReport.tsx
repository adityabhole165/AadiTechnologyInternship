import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import Accordion6 from 'src/libraries/accordion/accordion6';
import OnlineExamProgressReport from 'src/interfaces/Student/OnlineExamProgressReport';
import PageHeader from 'src/libraries/heading/PageHeader';
import {
  getSchoolInformation,
  getStudentDetails,
  getSubjects,
  getOnlineExams,
  getMarkInformation
} from 'src/requests/Student/OnlineExamProgressReport';
import BackButton from 'src/libraries/button/BackButton';

function OnlineExamReport() {
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');

  const dispatch = useDispatch();
  const getStudent = useSelector(
    (state: RootState) => state.ExamOnlineReport.Students
  );
  const SchoolInformation = useSelector(
    (state: RootState) => state.ExamOnlineReport.SchoolInformation
  );
  const geOnlineExams = useSelector(
    (state: RootState) => state.ExamOnlineReport.OnlineExams
  );
  const getsubjects = useSelector(
    (state: RootState) => state.ExamOnlineReport.Subjects
  );
  const getMarks = useSelector(
    (state: RootState) => state.ExamOnlineReport.MarkInformation
  );

  const ExamDetails: OnlineExamProgressReport = {
    aiStudentId: asStudentId,
    aiSchoolId: asSchoolId,
    aiAcademicYrId: asAcademicYearId,
    asStdDivId: asStandardDivisionId
  };

  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(getStudentDetails(ExamDetails));
    dispatch(getSchoolInformation(ExamDetails));
    dispatch(getSubjects(ExamDetails));
    dispatch(getOnlineExams(ExamDetails));
    dispatch(getMarkInformation(ExamDetails));
  }, []);

  return (
    <>
      <PageHeader heading={'Online Progress Report'} subheading={''} />
      <Accordion6
        Student={getStudent}
        OnlineExams={geOnlineExams}
        MarkInformation={getMarks}
        Subject={getsubjects}
      />
    </>
  );
}
export default OnlineExamReport;
