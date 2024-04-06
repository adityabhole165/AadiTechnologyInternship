import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IOnlineExamProgressReportBody from 'src/interfaces/Student/OnlineExamProgressReport';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import DropdownandList from 'src/libraries/Page/DropdownandList';
import PageHeader from 'src/libraries/heading/PageHeader';
import { getOnlineExams } from 'src/requests/Student/OnlineExamProgressReport';
import { RootState } from 'src/store';

function OnlineExamProgressReport() {
  const dispatch = useDispatch();
  const [exam, setExam] = useState('');

  const OnlineExams: any = useSelector(
    (state: RootState) => state.ExamOnlineReport.OnlineExams
  );

  const getExamDetailslist: any = useSelector(
    (state: RootState) => state.ExamOnlineReport.getExamDetailslist
  );

  const loading = useSelector(
    (state: RootState) => state.ExamOnlineReport.Loading
  );

  useEffect(() => {
    const OnlineExamProgressReportBody: IOnlineExamProgressReportBody = {
      aiStudentId: sessionStorage.getItem('StudentId'),
      aiSchoolId: localStorage.getItem('localSchoolId'),
      aiAcademicYrId: sessionStorage.getItem('AcademicYearId'),
      asStdDivId: sessionStorage.getItem('StandardDivisionId')
    };
    dispatch(getOnlineExams(OnlineExamProgressReportBody));
  }, []);

  const onChangeExam = (value) => {
    let exam = '';
    value.map((item) => {
      if (item.IsActive) exam = item.Value;
    });
    setExam(exam);
  };

  return (
    <Box sx={{ px: 2 }}>
      <PageHeader heading={'Online Exam Progress Report'} subheading={''} />
      <Box sx={{ mt: '-10px' }}>
        {loading ? (
          <SuspenseLoader />
        ) : (
          <>
            {OnlineExams.length > 0 ? (
              <DropdownandList
                heading={''}
                Itemlist={OnlineExams}
                onChange={onChangeExam}
                Label={''}
                DefaultValue={exam}
                getExamDetailslist={getExamDetailslist}
                CardItemlist={getExamDetailslist.filter(
                  (item) => item.ExamId.toString() === exam.toString()
                )}
              />
            ) : (
              <ErrorMessages Error={'No exam has been published'} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default OnlineExamProgressReport;
