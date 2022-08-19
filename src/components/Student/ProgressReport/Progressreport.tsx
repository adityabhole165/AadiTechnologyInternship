import { useDispatch } from 'react-redux';
import {
  GetExamResultList,
  GetAcademicYears,
  GetReasonforBlockingProgressReport,
  Getpendingfees
} from 'src/requests/Student/ProgressReport';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { styled, Grid, Box, Typography } from '@mui/material';
import IExamResult, {
  GetStudentExamResult, IGetReasonforBlockingProgressReportResult
} from 'src/interfaces/Student/ProgressReport';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Styles } from 'src/assets/style/student-style';
import Accordions3 from 'src/libraries/accordion/accordion3';
import http from 'src/requests/SchoolService/schoolServices';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ErrorMessagess from "src/libraries/ErrorMessages/ProgressReportError";

import {
  IIsPendingFeesForStudent,
  IGetAcademicYears,
  IGetTerms,
  IGetReasonforBlockingProgressReport
} from 'src/interfaces/Student/ProgressReport';
import Icon1 from 'src/libraries/icon/icon1';

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
  // console.log("Reason",getreasonbprgrepres.GetReasonforBlockingProgressReport);

  const pendingfees: any = useSelector(
    (state: RootState) => state.Progressreport.PendingFees
  );

  const [expanded, setExpanded] = useState<boolean>(true);
  const [feependingres, setfeependingres] = useState('');
  const [DependentOnAttendance, setDependentOnAttendance] = useState(" ")
  const [block, setBlock] = useState("none")


  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const Reason = getreasonbprgrepres.GetReasonforBlockingProgressReport;

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
  const Note: string = '* Denotes subject marks are not considered in total marks.';

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

  const Getpendingfees_body: IIsPendingFeesForStudent = {
    asStudentId: asStudentId,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const GetAcademicYears_body: any = {
    aiSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aiStudentId: asStudentId
  };

  useEffect(() => {
    localStorage.setItem("url", window.location.pathname)
    dispatch(Getpendingfees(Getpendingfees_body))
    dispatch(GetExamResultList(GetExamResultList_body));
    GetPeendingFeesResult();
    dispatch(GetAcademicYears(GetAcademicYears_body));
    dispatch(
      GetReasonforBlockingProgressReport(
        GetReasonforBlockingProgressReport_body
      )
    );
    if (pendingfees.IsPendingFeesForStudentResult == false) {
      setBlock('block')
    }
    if (pendingfees.IsPendingFeesForStudentResult == true) {
      setBlock('none')
    }

  }, []);
//   const newReason = Reason.split("\n").map((item:IGetReasonforBlockingProgressReportResult, i) => {
//     return <p key={i}>{item.GetReasonforBlockingProgressReportResult}</p>;
// });
  return (
    <>

      <PageHeader heading={'Progress Report'} subheading={''} />
      {
       
        (getreasonbprgrepres.GetReasonforBlockingProgressReport == "" && pendingfees.IsPendingFeesForStudentResult == true) ?
          <>
            <Container  >
             
              <Grid container justifyContent="center" rowSpacing={1} style={{ display: block }}>
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

                  <>
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
                  </>

                </Box>
              </>
            )}
          </>
          
          :
          <><><ErrorMessagess Error={"You are prohibited to view the progress report due to the following reason: "} />
            <ErrorMessagess Error={Reason} /></>
            <ErrorMessagess Error={"Please do the needful to view the progress report."} /></>
      }
    </>
  );
}

export default Progressreport;
