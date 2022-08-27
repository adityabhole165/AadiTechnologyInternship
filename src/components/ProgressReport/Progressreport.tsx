import { useDispatch } from 'react-redux';
import {
  GetExamResultList,
  GetAcademicYears,
  GetReasonforBlockingProgressReport,
  Getpendingfees,
  GetProgressReportFileName
} from 'src/requests/Student/ProgressReport';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { styled, Grid, Box, Typography, debounce, Card, List, useTheme } from '@mui/material';
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
import ErrorMessages from 'src/libraries/ErrorMessages/ErrorMessages';
import moment from 'moment';

import {
  IIsPendingFeesForStudent,
  IGetAcademicYears,
  IGetTerms,
  IGetReasonforBlockingProgressReport
} from 'src/interfaces/Student/ProgressReport';
import Icon1 from 'src/libraries/icon/icon1';

function Progressreport() {
  const dispatch = useDispatch();
  const theme = useTheme();
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

  const pendingfees: any = useSelector(
    (state: RootState) => state.Progressreport.PendingFees
  );

  const progressReportFilePath : any = useSelector(
    (state: RootState) => state.Progressreport.ProgressReportFileName
  );
  
  const filePath = progressReportFilePath.replace(/\\/g, "/");
  let sitePath = 'https://192.168.1.80';
  let downloadPathOfProgressReport = sitePath + filePath;

  const [expanded, setExpanded] = useState<boolean>(true);
  const [feependingres, setfeependingres] = useState('');
  
  const [block, setBlock] = useState("none");
  const [termId, setSetTermId] = useState(0);
  const [academicYearId, setAcademicYearId] = useState('');

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const authData = JSON.parse(localStorage.getItem("auth")); 
  const userLoginId = authData.data.AuthenticateUserResult.UserLogin
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

  

  const downloadProgress = (termId) =>{
    const getProgressReportFileName_body: any ={
      asSchoolId: asSchoolId,
      asAcademicYearId: parseInt(`${academicYearId}`),
      asStudentId: asStudentId,
      asLoginUserId: userLoginId,
      asTermId: termId
    }
    dispatch(GetProgressReportFileName(getProgressReportFileName_body))
    window.open(downloadPathOfProgressReport);
  }

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
  }, [academicYearId]);
  
  
  const [dropyear, setDropyear] = useState();
  const [showyear, setShowyear] = useState(false);

  const handledropyear = (e) =>{
    setDropyear(e.target.value)
    setShowyear(true)
    setAcademicYearId(e?.target.value);
  }
  return (
    <>

      <PageHeader heading={'Progress Report'} subheading={''} />
      <Box>
        {

          (progressreportResult.length === 0) ?
            <Container>
              <Card sx={{ boxShadow: "6px 4px 5px !important", borderRadius: "10px", mb: "10px", backgroundColor: '#d0dbd2' }}>
                <Typography sx={{ ml: "10px", mt: "5px", mb: "5px", fontSize: "9pt" }}>
                  <b>    No exam for this class has been conducted for the current academic year.</b>
                </Typography>
              </Card>
            </Container>
            :

            <Box>
              {
                (pendingfees.IsPendingFeesForStudentResult !== false) ?

                  <Container>
                    <Card sx={{ boxShadow: "6px 4px 5px !important", borderRadius: "10px", mb: "10px", backgroundColor: '#d0dbd2' }}>
                      <Typography sx={{ ml: "10px", mt: "5px", mb: "5px", fontSize: "9pt" }}>
                        <b>Your school fees are pending. Please pay the dues to view the progress report.</b>
                      </Typography>
                    </Card>
                  </Container>
                  :
                  <>
                    {

                      (getreasonbprgrepres.GetReasonforBlockingProgressReport == "") ?
                        <>
                          {feependingres ? null : (
                            <>
                              <Container  >

                                <Grid container justifyContent="center" rowSpacing={1} >
                                  <Grid xs={6} ></Grid>
                                  <Grid xs={6} >
                                    <Icon1 Title={undefined} Subtitle={undefined} Note={Note} />
                                  </Grid>
                                </Grid>

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
                              <Container>
                                <Box >
                                  <FormControl
                                    sx={{
                                      marginTop: '50px',
                                      m: 1,
                                      width: '100%',
                                      marginLeft: '1px'
                                    }}
                                  >
                                    {
                                      <NativeSelect onChange={handledropyear}>
                                        <option  value="0"  > Select Academic Year</option>
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
                                  { (dropyear !== "0") ?
                                 <>
                                 {
                                  showyear ?
                                
                                 <List>
                                    {academictermsResult?.map((gettermsres: IGetTerms, i) => {
                                      return (
                                        <Card
                                          sx={{
                                            background: `${theme.colors.gradients.pink1}`,
                                            marginTop: '0.3rem'
                                          }}
                                          key={i}
                                        >
                                          <Grid container direction="row">
                                            <Grid key={i}
                                              xs={9}
                                              sx={{
                                                borderRight: 1,
                                                borderRadius: 1,
                                                border: 'none'
                                              }} >
                                              <Typography
                                                component="div"
                                                variant="h5"
                                                sx={{ pl: 2, pt: 1, pb: 1, textAlign: 'start' }} >
                                                {gettermsres.TermName}
                                              </Typography>
                                            </Grid>
                                            <Grid
                                              xs={2}
                                              sx={{
                                                borderRight: 1,
                                                borderRadius: 1,
                                                border: 'none'
                                              }}
                                              >
                                                <Typography
                                                component="div"
                                                variant="h5"
                                                sx={{ pl: 2, pt: '3px', pb: 1, textAlign: 'end',cursor:'pointer' }}
                                                onClick={()=> downloadProgress(gettermsres.Id)}
                                                >
                                                <FileDownloadOutlinedIcon />
                                              </Typography>
                                            </Grid>
                                          </Grid>
                                        </Card>
                                      );
                                    })}
                                  </List>
                                   : null}
                                 </>
                                  :
                                  // <ErrorMessages Error={"No progress report of this class has been published for the selected academic year."} />
                                  null
                                       }
                                </Box>
                              </Container>
                            </>
                          )}
                        </>
                        :
                        <>
                          <Container>
                            <Typography className={classes.errorMessage4}> You are prohibited to view the progress report due to the following reason:</Typography>
                            <ErrorMessages Error={Reason} />
                            <Typography className={classes.errorMessage4}> Please do the needful to view the progress report.</Typography>
                          </Container>
                        </>
                    }
                  </>
              }
            </Box>
        }
      </Box>
    </>
  );
}

export default Progressreport;
