import { useDispatch } from 'react-redux';
import { GetExamResultList, GetAcademicYears, GetReasonforBlockingProgressReport, Getpendingfees, GetProgressReportFileName, GetProgressReport, AcademicProgressReportDownload, GetTermsForProgressReport } from 'src/requests/Student/ProgressReport';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { styled, Box, List, useTheme, Card, Typography, IconButton } from '@mui/material';
import IExamResult, { GetStudentExamResult, IGetReasonforBlockingProgressReportResult, IAcademicYearsForProgressReportResult } from 'src/interfaces/Student/ProgressReport';
import PageHeader from 'src/libraries/heading/PageHeader';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { Styles } from 'src/assets/style/student-style';
import Accordions3 from 'src/libraries/accordion/accordion3';
import http from 'src/requests/SchoolService/schoolServices';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import Note from 'src/libraries/Note/Note';
import { IIsPendingFeesForStudent, IGetAcademicYears, IGetTerms, IGetReasonforBlockingProgressReport, IProgressReportBody, IAcademicYearsForProgressReportBody, IGetTermsForProgressReportBody } from 'src/interfaces/Student/ProgressReport';
import Card5 from 'src/libraries/mainCard/Card5';

import DotLegend from 'src/libraries/summary/DotLegend';
import { DotLegend1, DotLegendStyled1 } from 'src/libraries/styled/DotLegendStyled';
import { CardDetail7 } from 'src/libraries/styled/CardStyle';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { IIsPendingFeesForStudentBody } from 'src/interfaces/Student/Fees';
import { getIsPendingFeesForStudent } from 'src/requests/Fees/Fees';
const BarGraphNote = [
  'Bar graph shows the percentage scored in each subject and tap on the subject bar to view scored marks.'];

function Progressreport() {
  const note = ['Your school fees are pending. Please pay the dues to view the progress report. '];
  const note2 = ['No exam of this class has been published for the current academic year.'];
  const dispatch = useDispatch();
  const theme = useTheme();
  const progressreportResult = useSelector((state: RootState) => state.Progressreport.GetExamResultData);
  const academicyearResult = useSelector((state: RootState) => state.Progressreport.GetAcademicYears);
  const academictermsResult = useSelector((state: RootState) => state.Progressreport.GetTerms);
  const getreasonbprgrepres: any = useSelector((state: RootState) => state.Progressreport.GetReasonforBlocking);
  const pendingfees: any = useSelector((state: RootState) => state.Progressreport.PendingFees);
  const progressReportFilePath: any = useSelector((state: RootState) => state.Progressreport.ProgressReportFileName);
  const ProgressReport = useSelector((state: RootState) => state.Progressreport.ProgressReportDownload);
  const TermsForProgressReport = useSelector((state: RootState) => state.Progressreport.TermsForProgressReportDownload);
  const PendingFeesForStudent = useSelector((state: RootState) => state.Fees.IsPendingFeesForStudent);
  const AcademicYearsForProgressReport = useSelector((state: RootState) => state.Progressreport.AcademicYearsForProgressReportDownload);



  const filePath = progressReportFilePath.replace(/\\/g, '/');
  let downloadPathOfProgressReport = localStorage.getItem('SiteURL') + filePath;
  const [expanded, setExpanded] = useState<boolean>(true);
  const [feependingres, setfeependingres] = useState('');
  const [academicYearId, setAcademicYearId] = useState('');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStudentId = sessionStorage.getItem('StudentId');
  const userLoginId = sessionStorage.getItem("Userlogin")
  const asAcademicYear = (sessionStorage.getItem('AcademicYearId'));
  const Reason = getreasonbprgrepres.GetReasonforBlockingProgressReport;
  const SchoolSettingsValue = JSON.parse(localStorage.getItem('SchoolSettingsValue'));
  const asDivisionId = sessionStorage.getItem('DivisionId');
  const asStandardDivision = (sessionStorage.getItem('StandardDivisionId'));
  const asStandardId = sessionStorage.getItem('StandardId');
  const BlockProgressReportIfFeesArePending = SchoolSettingsValue.BlockProgressReportIfFeesArePending;
  console.log("PendingFeesForStudent", PendingFeesForStudent);



  const [year, setYear] = useState(asAcademicYear)
  const [dropyear, setDropyear] = useState();
  const [showyear, setShowyear] = useState(false);
  const [hidePercentNote, setHidePercentNote] = useState(true);
  const [hideExamNote, setHideExamNote] = useState(true);



  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const clickDropdown = (value) => {
    setYear(value)
  }

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


  const AcademicYearsForProgressReportBody: IAcademicYearsForProgressReportBody = {

    "aiSchoolId": asSchoolId,
    "aiStudentId": asStudentId


  };

  const TermsForProgressReportBody: IGetTermsForProgressReportBody = {
    "aiSchoolId": asSchoolId,
    "aiAcademicYearId": asAcademicYearId,
    "aiStudentId": asStudentId

  };
  const IsPendingFeesBody: IIsPendingFeesForStudentBody = {
    asStudentId: asStudentId,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  const downloadProgress = (termId) => {
    const getProgressReportFileName_body: any = {
      asSchoolId: asSchoolId,
      asAcademicYearId: parseInt(`${academicYearId}`),
      asStudentId: asStudentId,
      asLoginUserId: userLoginId,
      asTermId: termId
    };
    dispatch(GetProgressReportFileName(getProgressReportFileName_body));
    window.open(downloadPathOfProgressReport);
  };

  useEffect(() => {
    dispatch(AcademicProgressReportDownload(AcademicYearsForProgressReportBody));
    dispatch(getIsPendingFeesForStudent(IsPendingFeesBody))
  }, []);


  useEffect(() => {
    localStorage.setItem('url', window.location.pathname);
    dispatch(Getpendingfees(Getpendingfees_body));
    dispatch(GetExamResultList(GetExamResultList_body));
    GetPeendingFeesResult();
    dispatch(GetAcademicYears(GetAcademicYears_body));
    dispatch(GetReasonforBlockingProgressReport(GetReasonforBlockingProgressReport_body));


  }, [academicYearId]);


  useEffect(() => {
    setYear(asAcademicYear)
  }, [AcademicYearsForProgressReport])

  useEffect(() => {
    dispatch(GetTermsForProgressReport(TermsForProgressReportBody));
  }, [year]);

  useEffect(() => {

    if (ProgressReport !== "") {
      window.open(localStorage.getItem('SiteURL') + ProgressReport.replace(/\\/g, '/'));
      // dispatch(resetReciept());
    }
  }, [ProgressReport])



  const ClickDownloadProgrss = (Id) => {
    const ProgressReportBody: IProgressReportBody = {
      "aiSchoolId": asSchoolId,
      "aiAcademicYearId": asAcademicYearId,
      "aiStandardId": asStandardId,
      "aiStandardDivID": asStandardDivision,
      "aiStudentId": asStudentId,
      "aiTermId": Id
    };
    dispatch(GetProgressReport(ProgressReportBody));
  }

  const handledropyear = (e) => {
    setDropyear(e.target.value);
    setShowyear(true);
    setAcademicYearId(e?.target.value);
  };

  //  dropyear

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



  const classes = Styles();
  
  return (
    <Container>
      <PageHeader heading={'Progress Report'} subheading={''} />
      <Box>
        {
          (pendingfees.IsPendingFeesForStudentResult !== false && BlockProgressReportIfFeesArePending == "Y") ?
            <>
              {PendingFeesForStudent !== null  &&

                <Note NoteDetail={[PendingFeesForStudent.Message]} /> 

              }</>

            :
            getreasonbprgrepres.GetReasonforBlockingProgressReport != '' ?

              <Note NoteDetail={[
                'You are prohibited to view the progress report due to the following reason:',
                Reason,
                'Please do the needful to view the progress report.']} />

              :
              (getreasonbprgrepres.GetReasonforBlockingProgressReport != ''
                && BlockProgressReportIfFeesArePending == "Y"
                && pendingfees.IsPendingFeesForStudentResult == true) ?
                <>

                  <Note NoteDetail={[
                    'Your school fees are pending. Please pay the dues to view progress report.',
                    'You are prohibited to view the progress report due to the following reason:',
                    Reason,
                    'Please do the needful to view the progress report.']} />

                </>
                :
                !hideExamNote ?
                  <Note NoteDetail={note2} />
                  :
                  <>
                    <Dropdown Array={AcademicYearsForProgressReport}
                      handleChange={clickDropdown}
                      label="Select Year"
                      defaultValue={year}></Dropdown>
                    <DotLegend1>
                      <DotLegendStyled1
                        className={classes.border}
                        style={{ background: 'blueviolet' }}
                      />
                      <CardDetail7>Denotes subject marks not considered in total marks.</CardDetail7>
                    </DotLegend1>
                    {hidePercentNote ? null :
                      <Note NoteDetail={BarGraphNote} />
                    }
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
                    {/* remove false condition in 2nd phase of development */}
                    {false &&
                      <Box>
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
                              <option value="0">
                                {' '}
                                Select Academic Year
                              </option>
                              {academicyearResult?.map(
                                (getacademicyr: IGetAcademicYears, i) => {
                                  return (
                                    <option
                                      value={getacademicyr.Id}
                                      key={i}
                                    >
                                      {getacademicyr.AcademicYear}
                                    </option>
                                  );
                                }
                              )}
                            </NativeSelect>
                          }
                        </FormControl>
                        {dropyear !== '0' ? (
                          <>
                            {showyear ? (
                              <List>
                                {academictermsResult?.map(
                                  (gettermsres: IGetTerms, i) => {
                                    return (
                                      <Card5
                                        key={i}
                                        text1={gettermsres.TermName}
                                        text2=""
                                        clickIcon={() => {
                                          downloadProgress(gettermsres.Id);
                                        }}
                                      />
                                    );
                                  }
                                )}
                              </List>
                            ) : null}
                          </>
                        ) :
                          null}
                      </Box>
                    }
                    {
                      TermsForProgressReport.length === 0 ? <> no record found </> :
                        <>
                          {TermsForProgressReport?.map((item, i) => (

                            <Card key={i} sx={{ display: "flex", justifyContent: "space-between" }} component={Box} mt={1}>
                              <Typography padding={1}>{item.TermName}</Typography>
                              <IconButton onClick={() => ClickDownloadProgrss(item.Id)}>
                                <FileDownloadOutlinedIcon />
                              </IconButton>
                            </Card>

                          ))}

                        </>

                    }
                  </>
        }
      </Box>



    </Container>
  );
}
export default Progressreport;
