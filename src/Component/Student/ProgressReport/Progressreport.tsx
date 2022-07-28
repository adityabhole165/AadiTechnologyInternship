import { useDispatch } from 'react-redux';
import {
  GetExamResultList,
  GetAcademicYears,
  GetReasonforBlockingProgressReport
} from 'src/Client_Api/Student/ProgressReport';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { styled, Grid, Box } from '@mui/material';
import IExamResult, {
  GetStudentExamResult
} from 'src/Interface/Student/ProgressReport';
import PageHeader from 'src/UI_Library/heading/PageHeader';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Styles } from 'src/assets/style/student-style';
import Accordions3 from 'src/UI_Library/accordion/accordion3';
import http from 'src/Client_Api/SchoolService/schoolServices';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  IIsPendingFeesForStudent,
  IGetAcademicYears,
  IGetTerms,
  IGetReasonforBlockingProgressReport
} from 'src/Interface/Student/ProgressReport';
import Icon1 from 'src/UI_Library/icon/icon1';

function Progressreport() {
  const dispatch = useDispatch();
  const progressreportResult = useSelector(
    (state: RootState) => state.Progressreport.GetExamResultData
  );
  const academicyearResult = useSelector(
    (state: RootState) => state.Progressreport.GetAcademicYears
  );
  const academictermsResult = useSelector(
    (state: RootState) => state.Progressreport.GetTerms
  );
  const getreasonbprgrepres: any = useSelector(
    (state: RootState) => state.Progressreport.GetReasonforBlocking
  );
  const [expanded, setExpanded] = useState<boolean>(true);
  const [feependingres, setfeependingres] = useState('');

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStudentId = sessionStorage.getItem('StudentId');

  const classes = Styles();
  const DotLegend = styled('span')(
    ({ theme }) => `
          border-radius: 22px;
          width: ${theme.spacing(1.5)};
          height: ${theme.spacing(1.5)};
          display: inline-block;
          margin-right: ${theme.spacing(1)};
          margin-top: -${theme.spacing(0.1)};
      `
  );
  const Note: string = '* Denotes subject marks not considered in total marks.';

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const GetPeendingFeesResult = () => {
    const GetPendingFeesForStudentResult_body: IIsPendingFeesForStudent = {
      asStudentId: asStudentId,
      asAcademicYearId: asAcademicYearId,
      asSchoolId: asSchoolId
    };

    http
      .post(
        'Student/IsPendingFeesForStudent',
        GetPendingFeesForStudentResult_body
      )
      .then((resp) => resp.data.IsPendingFeesForStudentResult)
      .then((data) => {
        setfeependingres(data);
      });
  };

  const GetReasonforBlockingProgressReport_body: IGetReasonforBlockingProgressReport =
    {
      asSchoolId: asSchoolId,
      asStudentId: asStudentId,
      asAcademicYearId: asAcademicYearId
    };

  const GetExamResultList_body: IExamResult = {
    asSchoolId: asSchoolId,
    asStudentId: asStudentId
  };

  const GetAcademicYears_body: any = {
    aiSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aiStudentId: asStudentId
  };

  useEffect(() => {
    dispatch(GetExamResultList(GetExamResultList_body));
    GetPeendingFeesResult();
    dispatch(GetAcademicYears(GetAcademicYears_body));
    dispatch(
      GetReasonforBlockingProgressReport(
        GetReasonforBlockingProgressReport_body
      )
    );
  }, []);

  return (
    <>
      <PageHeader heading={'Progress Report'} subheading={''} />
      <Container>
        <Grid container justifyContent="center" rowSpacing={1}>
          <Grid xs={6}>
            <DotLegend
              className={classes.border}
              style={{ background: '#5C3317', marginBottom: '-1px' }}
            />
            <small>
              <b>Subject</b>
            </small>
            <br></br>
            <DotLegend
              className={classes.border}
              style={{ background: 'blueviolet ', marginBottom: '-1px' }}
            />
            <small>
              <b>Grade</b>
            </small>
          </Grid>
          <Grid xs={6}>
            <Icon1 Title={undefined} Subtitle={undefined} Note={Note} />
          </Grid>
        </Grid>
      </Container>

      {feependingres ? null : (
        <>
          <Container>
            <Box sx={{ borderRadius: 1, borderBottom: 5, mb: 2 }}>
              <FormControl
                sx={{
                  marginTop: '50px',
                  m: 1,
                  width: '100%',
                  marginLeft: '1px'
                }}
              >
                {
                  <NativeSelect>
                    <option value="0">Academic Year</option>

                    {academicyearResult?.map(
                      (getacademicyr: IGetAcademicYears, i) => {
                        return (
                          <option value={getacademicyr.Id} key={i}>
                            {getacademicyr.AcademicYear}
                          </option>
                        );
                      }
                    )}
                  </NativeSelect>
                }
              </FormControl>

              <FormControl
                sx={{
                  marginTop: '50px',
                  m: 1,
                  width: '100%',
                  marginLeft: '1px'
                }}
              >
                {
                  <NativeSelect>
                    <option value="0">Exam Type</option>

                    {academictermsResult?.map((gettermsres: IGetTerms, i) => {
                      return (
                        <option value={gettermsres.Id} key={i}>
                          {gettermsres.TermName}
                        </option>
                      );
                    })}
                  </NativeSelect>
                }
              </FormControl>
              <Box sx={{ margin: '3' }}>
                <FileDownloadOutlinedIcon />
              </Box>
            </Box>
          </Container>

          <Box>
            {progressreportResult?.map(
              (examresult: GetStudentExamResult, i) => (
                <Accordions3
                  Data={progressreportResult}
                  Exam={examresult.Exam}
                  key={i}
                  index={i}
                  Collapse={handleChange}
                  expand={expanded}
                />
              )
            )}
          </Box>
        </>
      )}
    </>
  );
}

export default Progressreport;
