import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import Accordion6 from 'src/UI_Library/accordion/accordion6';
import OnlineExamProgressReport from 'src/Interface/Student/OnlineExamProgressReport';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import {
  getSchoolInformation,
  getStudentDetails,
  getSubjects,
  getOnlineExams,
  getMarkInformation
} from 'src/Client_Api/Student/OnlineExamProgressReport';
import BackButton from 'src/UI_Library/button/BackButton';
import { Box, Container } from '@mui/material';


function OnlineExamReport() {

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');


  console.log(asStandardDivisionId);
  

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
    dispatch(getStudentDetails(ExamDetails));
    dispatch(getSchoolInformation(ExamDetails));
    dispatch(getSubjects(ExamDetails));
    dispatch(getOnlineExams(ExamDetails));
    dispatch(getMarkInformation(ExamDetails));
  }, []);

  return (
    <>
    <Box sx={{mt:"30px",ml:"20px"}}>
    <BackButton/>
    </Box>
      
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
