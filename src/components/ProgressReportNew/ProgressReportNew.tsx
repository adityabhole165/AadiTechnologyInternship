import { XMLParser } from "fast-xml-parser";

import ClearIcon from '@mui/icons-material/Clear';
import QuestionMark from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Link, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetSchoolSettingsBody, IGetAcademicYearsOfStudentBody, IGetAllMarksGradeConfigurationBody, IGetAllStudentsProgressSheetBody, IGetClassTeachersBody, IGetOldStudentDetailsBody, IGetPassedAcademicYearsBody, IGetStudentNameDropdownBody, IsGradingStandarBody, IsTestPublishedForStdDivBody, IsTestPublishedForStudentBody, IStudentProgressReportBody } from "src/interfaces/ProgressReport/IprogressReport";
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import GradeConfigurationList from 'src/libraries/ResuableComponents/GradeConfigurationList';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetAcademicYearsOfStudent, CDAGetAllMarksGradeConfiguration, CDAGetClassTeachers, CDAgetOldstudentDetails, CDAGetPassedAcademicYears, CDAGetSchoolSettings, CDAGetStudentName, CDAIsGradingStandard, CDAIsTestPublishedForStdDiv, CDAIsTestPublishedForStudent, CDAStudentProgressReport, GetAllStudentsProgressSheet } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import ProgressReportGradeView from './ProgressReportGradeView';
import ProgressReportMarkView from './ProgressReportMarkView';

const ProgressReportNew = () => {
  const dispatch = useDispatch();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const TeacherIdsession = sessionStorage.getItem('TeacherId');

  const asUserId = Number(sessionStorage.getItem('Id'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));


  const [Error, SetError] = useState('');
  const [StudentId, SetStudentId] = useState('');
  const [AcademicYear, SetAcademicYear] = useState('');

  
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);


  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );



  let CanEdit = getSchoolConfigurations(79)

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Progress Report') perm = item.IsFullAccess;
    });
    return perm;
  };





  const [selectTeacher, SetselectTeacher] = useState(CanEdit == 'N' ? TeacherIdsession : '');


  const USlistTestDetailsArr: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISlistTestDetailsArr
  );
  const USlistTestDetailsArr1: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISlistTestDetailsArr1
  );
  const USGetClassTeachers: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISGetClassTeachers
  );

  const USGetStudentNameDropdown: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISGetStudentNameDropdown
  );

  const USStudentProgressReport: any = useSelector(
    (state: RootState) => state.ProgressReportNew.ISStudentProgressReport
  );
  const AllStudentsProgressSheet: any = useSelector(
    (state: RootState) => state.ProgressReportNew.AllStudentsProgressSheet
  );
  useEffect(() => {
    if (AllStudentsProgressSheet !== null) {
      const parser = new XMLParser();
      const jsonData = parser.parse(AllStudentsProgressSheet.listStudentsMarksDetiles[0].Tests);
    }
  }, [AllStudentsProgressSheet])

  const USGetPassedAcademicYears: any = useSelector((state: RootState) => state.ProgressReportNew.ISGetPassedAcademicYears);
  const ThirdHeaderColumn: any = useSelector((state: RootState) => state.ProgressReportNew.ISThirdHeaderColumn);
  const USlistStudentsDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistStudentsDetails);
  const USlistSubjectsDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistSubjectsDetails);
  const EntireDataList: any = useSelector((state: RootState) => state.ProgressReportNew.ISEntireDataList);
  const USlistTestDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistTestDetails);
  const USlistSubjectIdDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistSubjectIdDetails);
  const USListSchoolWiseTestNameDetail: any = useSelector((state: RootState) => state.ProgressReportNew.ISListSchoolWiseTestNameDetail);
  const USListSubjectidDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListSubjectidDetails);
  const USListTestTypeIdDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListTestTypeIdDetails);
  const USListMarkssDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListMarkssDetails);
  const ListDisplayNameDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListDisplayNameDetails);
  const USGetAllMarksGradeConfiguration = useSelector((state: RootState) => state.ProgressReportNew.ISGetAllMarksGradeConfiguration);
  const USGetAllMarksGradeConfiguration1 = useSelector((state: RootState) => state.ProgressReportNew.ISGetAllMarksGradeConfiguration1);
  const Data = USGetAllMarksGradeConfiguration.filter((item) => item.Standard_Id != "")
  const Data1 = USGetAllMarksGradeConfiguration1.filter((item) => item.Standard_Id != "")
  const Data3 = USlistSubjectIdDetails.filter((item) => item.SchoolWise_Test_Name !== "Total")
  const legendText = 'Legend : * Subject marks not considered in total marks';
  const formattedText = legendText.replace('*', '<span style="color: red;">*</span>');
  const USIsGradingStandard: any = useSelector((state: RootState) => state.ProgressReportNew.IsGradingStandarBodyIS);
  const USIsTestPublishedForStdDiv: any = useSelector((state: RootState) => state.ProgressReportNew.IsTestPublishedForStdDivBodyIS);
  const USIsTestPublishedForStudentIS: any = useSelector((state: RootState) => state.ProgressReportNew.RIsTestPublishedForStudentIS);
  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);
  const hasTotalConsiderationN = USlistSubjectsDetails.some(subject => subject.Total_Consideration === "N");
  const [IsTotalConsiderForProgressReport, setIsTotalConsiderForProgressReport] = useState('');
  const MarkDetailsList: any = useSelector((state: RootState) => state.ProgressReportNew.MarkDetailsList);
  const HeaderArray: any = useSelector((state: RootState) => state.ProgressReportNew.HeaderArray);
  const SubHeaderArray: any = useSelector((state: RootState) => state.ProgressReportNew.SubHeaderArray);


  const MarkDetailsList1: any = useSelector((state: RootState) => state.ProgressReportNew.MarkDetailsList1);
  const HeaderArray1: any = useSelector((state: RootState) => state.ProgressReportNew.HeaderArray1);
  const SubHeaderArray1: any = useSelector((state: RootState) => state.ProgressReportNew.SubHeaderArray1);

  const ShowOnlyGrades = EntireDataList?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true';

  const UsAcademicYearsOfStudent: any = useSelector((state: RootState) => state.ProgressReportNew.IsAcademicYearsOfStudent);
  const GetOldStudentDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISGetOldStudentDetails);
console.log(GetOldStudentDetails,"GetOldStudentDetails");


  useEffect(() => {
    if (UsGetSchoolSettings != null)
      setIsTotalConsiderForProgressReport(UsGetSchoolSettings?.GetSchoolSettingsResult?.IsTotalConsiderForProgressReport);
    // setIsTotalConsiderForProgressReport('False');
  }, [UsGetSchoolSettings])



  let headerArray = [
    { Id: 1, Header: 'Percentage' },
    { Id: 2, Header: 'Grade Name' },
    { Id: 3, Header: 'Remarks' }

  ]

  const GetClassTeacher = () => {
    let returnVal = false
    USlistStudentsDetails.map((item) => {
      if (item.Standard_Division_Id == selectTeacher) {
        returnVal = item.Standard_Id
      }
    })
    return returnVal
  };


  const StandardDivisionId = () => {
    let returnVal = 0
    USGetClassTeachers.map((item) => {
      if (item.Value == selectTeacher) {
        returnVal = item.Id
      }
    })
    return returnVal
  };




  const Standard_Id = () => {
    let returnVal = 0
    USGetClassTeachers.map((item) => {
      if (item.Value == selectTeacher) {
        returnVal = item.asStandardId
      }
    })
    return returnVal
  };

  const hasEmptyMarks = USlistSubjectIdDetails.some((item) => item.Marks_Scored === "");
  const hasGrade = USlistSubjectIdDetails.some((item) => item.Grade === "");

  const StudentName = () => {
    let classStudentName = '';
    USGetStudentNameDropdown.map((item) => {
      if (item.Value == StudentId) classStudentName = item.Name;
    });
    return classStudentName;
  };



  useEffect(() => {
    StandardDivisionId()
    Standard_Id()
  }, [selectTeacher]);

  const GetClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asTeacherId: Number(CanEdit == 'Y' ? 0 : TeacherIdsession)
  };

  const GetStudentNameDropdownBody: IGetStudentNameDropdownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: StandardDivisionId()

  };
  const GetAllStudentsProgressSheetBody: IGetAllStudentsProgressSheetBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmicYearId: Number(asAcademicYearId),
    asStdDivId: StandardDivisionId()
  }
  const StudentProgressReportBody: IStudentProgressReportBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmeicYearId: Number(asAcademicYearId),
    asStudentId: Number(StudentId),
    asUserId: asUserId,
    IsTotalConsiderForProgressReport: IsTotalConsiderForProgressReport,

  };

  const GetPassedAcademicYearsBody: IGetPassedAcademicYearsBody = {
    asSchoolId: Number(asSchoolId),
    asStudent_Id: Number(StudentId),
    asIncludeCurrentYear: false


  };
  const GetSchoolSettings: GetSchoolSettingsBody = {
    asSchoolId: Number(asSchoolId),



  };

  const GetAllMarksGradeConfigurationBody: IGetAllMarksGradeConfigurationBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYrId: Number(asAcademicYearId),
    asStandardId: Number(Standard_Id()),
    asIsCoCurricular: false
  };

  const GetAllMarksGradeConfigurationBody1: IGetAllMarksGradeConfigurationBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYrId: Number(asAcademicYearId),
    asStandardId: Number(Standard_Id()),
    asIsCoCurricular: true
  };

  const IsGradingStandard: IsGradingStandarBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardId: Number(Standard_Id())

  };

  const IsTestPublishedForStdDiv: IsTestPublishedForStdDivBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmicYearId: Number(asAcademicYearId),
    asStdDivId: Number(StandardDivisionId())

  };

  const IsTestPublishedForStudent: IsTestPublishedForStudentBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivId: Number(StandardDivisionId()),
    asStudentId: Number(StudentId)

  };


  const AcademicYearsOfStudentBody: IGetAcademicYearsOfStudentBody = {
    aiSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    aiStudentId: StudentId

  };

  const OldStudentDetailsBody:IGetOldStudentDetailsBody = {
    aiSchoolId: asSchoolId,
    aiAcademicYearId: AcademicYear,
    aiStudentId: StudentId
  }

  const clickSelectClass = (value) => {
    setOpen(false);
    SetselectTeacher(value)
  };

  const AcademicRecords = (value) => {
    alert("Old Academic Records Page Not Devloped ")
  };

  const clickStudentList = (value) => {
    setOpen(false);
    SetStudentId(value);
  };


  const ClickAcademicYear= (value) => {
    setOpen(false);
    SetAcademicYear(value);
  };

  const ClickShow = (value) => {
    if (selectTeacher === '0') {
      SetError('Class Teacher should be selected.');
      return;
    }

    setOpen(true);
    SetError('')
  }


  useEffect(() => {
    if (USGetStudentNameDropdown.length > 0) {
      SetStudentId(USGetStudentNameDropdown[0].Value);
    }
  }, [USGetStudentNameDropdown]);

  useEffect(() => {
    dispatch(CDAIsGradingStandard(IsGradingStandard));

  }, [Standard_Id(), selectTeacher, StudentId]);

  useEffect(() => {
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));

  }, []);


  useEffect(() => {
    dispatch(CDAIsTestPublishedForStdDiv(IsTestPublishedForStdDiv));

  }, [StandardDivisionId()]);

  useEffect(() => {
    dispatch(CDAIsTestPublishedForStudent(IsTestPublishedForStudent));

  }, [StandardDivisionId()]);


  useEffect(() => {
    if (CanEdit == 'Y') {
      if (USGetClassTeachers.length > 0) {
        SetselectTeacher(USGetClassTeachers[0].Value);
      }
    }

  }, [USGetClassTeachers]);

  useEffect(() => {
    GetClassTeacher()

  }, []);

  useEffect(() => {
    dispatch(CDAGetClassTeachers(GetClassTeachersBody));

  }, []);

  useEffect(() => {
    dispatch(CDAGetStudentName(GetStudentNameDropdownBody));
  }, [selectTeacher, StandardDivisionId()]);

  useEffect(() => {
    if (StudentId == '0') {
      dispatch(GetAllStudentsProgressSheet(GetAllStudentsProgressSheetBody));
    }
    dispatch(CDAStudentProgressReport(StudentProgressReportBody, IsGradingStandard));
  }, [StudentId]);

  useEffect(() => {
    dispatch(CDAGetPassedAcademicYears(GetPassedAcademicYearsBody));
  }, [StudentId]);

  useEffect(() => {
    dispatch(CDAGetAllMarksGradeConfiguration(GetAllMarksGradeConfigurationBody));
  }, [Standard_Id()]);

  useEffect(() => {
    dispatch(CDAGetAcademicYearsOfStudent(AcademicYearsOfStudentBody));
  }, [StudentId]);

  useEffect(() => {
    dispatch(CDAgetOldstudentDetails(OldStudentDetailsBody));
  }, [StudentId,AcademicYear]);


  useEffect(() => {
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));

  }, []);


  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setOpen1(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen1(false); // Close the dialog
  };
  const getListDisplayName = (ShortName) => {
    let returnVal = ""
    ListDisplayNameDetails.map((Item) => {
      if (Item.ShortName == ShortName)
        returnVal = Item.DisplayName
    })
    return returnVal

  }
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Progress Report', path: '/extended-sidebar/Teacher/ProgressReportNew' }
        ]}
        rightActions={<>

          <SearchableDropdown
            label={"Subject Teacher"}
            sx={{ pl: 0, minWidth: '350px', backgroundColor: CanEdit == 'N' ? '#F0F0F0' : '', }}
            ItemList={USGetClassTeachers}
            mandatory
            onChange={clickSelectClass}
            disabled={CanEdit == 'N'}
            defaultValue={selectTeacher}
            size={"small"}


          />

          <SearchableDropdown
            ItemList={USGetStudentNameDropdown}
            sx={{ minWidth: '300px' }}
            onChange={clickStudentList}
            defaultValue={StudentId}
            label={'Student Name'}
            size={"small"} />


          <SearchableDropdown
            ItemList={UsAcademicYearsOfStudent}
            sx={{ minWidth: '300px' }}
            onChange={ClickAcademicYear}
            defaultValue={AcademicYear}
            label={'Academic Years '}
            size={"small"} />

          <Box>
            <Tooltip title={'Displays  progress report of published exam of selected / all student.'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title={'Show'}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: blue[600]
                }
              }}
              onClick={ClickShow}>
              <VisibilityTwoToneIcon />
            </IconButton>
          </Tooltip>

        </>}

      />
      <ErrorMessage1 Error={Error}></ErrorMessage1>
      {StudentId == "0" ? (
        <span></span>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
          <Button variant="outlined" onClick={AcademicRecords}>
            Old Academic Records
          </Button>
        </Box>
      )}

      {open && (
        <div>

          {USIsTestPublishedForStdDiv == true ?
            <>
              {EntireDataList?.listStudentsDetails?.[0]?.ShowOnlyGrades?.trim() === 'true' ? //USIsGradingStandard == true ?
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Link href="#" underline="none" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h4">Grade Configuration Details</Typography>
                    </Link>

                    <Dialog
                      open={open1}
                      onClose={handleClose}
                      maxWidth="md" scroll="body"
                      sx={{ minHeight: '400px' }}
                      PaperProps={{
                        sx: {
                          borderRadius: "15px",
                        }
                      }}>
                      <DialogTitle sx={{ bgcolor: '#223354' }}>

                        <ClearIcon onClick={handleClose}
                          sx={{
                            color: 'white',
                            // background:'white',
                            borderRadius: '7px',
                            position: 'absolute',
                            top: '5px',
                            right: '8px',
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'red'
                            }
                          }} />
                      </DialogTitle>

                      <DialogContent>
                        <Typography variant="h3" my={1}>
                          Grade Configuration Details
                        </Typography>
                        <Typography variant="h4" my={1}>
                          Subjects :-
                        </Typography>
                        <GradeConfigurationList
                          configurationList={USGetAllMarksGradeConfiguration.filter((item) => item.Standard_Id != "")}
                          HeaderArray={headerArray}
                        />
                      </DialogContent>
                      <DialogContent>
                        <Typography variant="h4" >
                          Co-Curricular Subjects :-
                        </Typography>
                        <GradeConfigurationList
                          configurationList={USGetAllMarksGradeConfiguration1.filter((item) => item.Standard_Id != "")}
                          HeaderArray={headerArray}
                        />
                      </DialogContent>
                    </Dialog>
                  </Box>
                  <Box sx={{ mt: 1, background: 'white' }}>
                    <hr />
                    {USlistStudentsDetails.map((subject, index) => (
                      <div key={index}>
                        <Typography variant="h4" textAlign="center" color="primary" mb={1}>
                          {subject.School_Orgn_Name}
                        </Typography>
                        <hr />
                        <Typography variant="h3" textAlign="center" color="black" mb={1}>
                          {subject.School_Name}
                        </Typography>
                        <hr />
                        <Typography variant="h4" textAlign="center" color="black" mb={1}>
                          Progress Report
                        </Typography>
                      </div>
                    ))}
                    <Table>
                      <TableBody>
                        {USlistStudentsDetails.map((item) => {
                          return (
                            <TableRow sx={{ bgcolor: '#38548A' }}>
                              <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No: </b>{item.Roll_No} </TableCell>
                              <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name: </b> {item.Student_Name}	</TableCell>
                              <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class: </b> {item.Standard_Name} - {item.Division_Name}	</TableCell>
                              <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year: </b> {item.Academic_Year}	</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Box>
                  {hasTotalConsiderationN && (
                    <Typography
                      sx={{ bgcolor: 'white', p: 2 }}
                      dangerouslySetInnerHTML={{ __html: formattedText }}
                    />
                  )}
                  <Box sx={{ overflowX: 'auto' }}>
                    <ProgressReportGradeView
                      EntireDataList={EntireDataList}
                      IsTotalConsiderForProgressReport={IsTotalConsiderForProgressReport}
                      HeaderArray1={HeaderArray1}
                      SubHeaderArray1={SubHeaderArray1}
                      MarkDetailsList1={IsTotalConsiderForProgressReport.toLowerCase() === 'true' ? MarkDetailsList : MarkDetailsList1}
                    />
                  </Box>
                </>
                :
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

                    <Link href="#" underline="none" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h4">Grade Configuration Details</Typography>
                    </Link>
                    <Dialog
                      open={open1}
                      onClose={handleClose}
                      maxWidth="md"
                      scroll="body"
                      PaperProps={{
                        sx: {
                          borderRadius: "15px",
                        }
                      }}
                    >
                      <Box sx={{ backgroundColor: "#223354" }}>
                        <DialogTitle
                          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                          <ClearIcon onClick={handleClose}
                            sx={{
                              color: 'white',
                              // background:'white',
                              borderRadius: '7px',
                              position: 'absolute',
                              top: '5px',
                              right: '8px',
                              cursor: 'pointer',
                              '   &:hover': {
                                color: 'red',
                                //  backgroundColor: red[100]

                              }
                            }} />
                        </DialogTitle>
                      </Box>
                      <DialogContent>
                        <Typography variant="h3">Grade Configuration Details</Typography>
                        <Typography variant="h4" my={1}>
                          Subjects :-
                        </Typography>
                        <GradeConfigurationList
                          configurationList={USGetAllMarksGradeConfiguration.filter((item) => item.Standard_Id != "")}
                          HeaderArray={headerArray}
                        />
                      </DialogContent>
                      <DialogContent>
                        <Typography variant="h4" my={1}>
                          Co-Curricular Subjects :-
                        </Typography>
                        <GradeConfigurationList
                          configurationList={USGetAllMarksGradeConfiguration1.filter((item) => item.Standard_Id != "")}
                          HeaderArray={headerArray}
                        />
                      </DialogContent>
                    </Dialog>
                  </Box>
                  <Box sx={{ mt: 1, background: 'white', }}>
                    <hr />
                    {USlistStudentsDetails.map((subject, index) => (
                      <div key={index}>
                        <Typography variant="h4" textAlign="center" color="primary" mb={1}>
                          {subject.School_Orgn_Name}
                        </Typography>
                        <hr />
                        <Typography variant="h3" textAlign="center" color="black" mb={1}>
                          {subject.School_Name}
                        </Typography>
                        <hr />
                        <Typography variant="h4" textAlign="center" color="black" mb={1}>
                          Progress Report
                        </Typography>
                      </div>
                    ))}
                    <Table >
                      <TableBody>
                        {USlistStudentsDetails.map((item) => {
                          return (
                            <TableRow sx={{ bgcolor: '#38548A' }}>
                              <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No: </b>{item.Roll_No} </TableCell>
                              <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name: </b> {item.Student_Name}	</TableCell>
                              <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class: </b> {item.Standard_Name} - {item.Division_Name}	</TableCell>
                              <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year: </b> {item.Academic_Year}	</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </Box>
                  {hasTotalConsiderationN && (
                    <Typography
                      sx={{ bgcolor: 'white', p: 2 }}
                      dangerouslySetInnerHTML={{ __html: formattedText }}
                    />
                  )}
                  <Box sx={{ overflowX: 'auto' }}>
                    <ProgressReportMarkView
                      HeaderArray={HeaderArray}
                      SubHeaderArray={SubHeaderArray}
                      MarkDetailsList={MarkDetailsList}
                      ListDisplayNameDetails={ListDisplayNameDetails}
                      IsTotalConsiderForProgressReport={IsTotalConsiderForProgressReport}
                      USListSchoolWiseTestNameDetail={USListSchoolWiseTestNameDetail}
                      USListMarkssDetails={USListMarkssDetails}
                      ListTestTypeIdDetails={USListTestTypeIdDetails}
                      ThirdHeaderRow={ThirdHeaderColumn}
                      EntireDataList={EntireDataList}
                    />
                  </Box>
                </>

              }
            </>
            :
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No exam of this class has been published for the current academic year.</b>
            </Typography>

          }

        </div>
      )}

      {/* {USIsGradingStandard === true && hasGrade == true ?
        <h1>  massage   {StudentName()} </h1> : USIsGradingStandard === false && hasEmptyMarks == true ?
          <h1>  massage   {StudentName()}  </h1> : null

      } */}


    </Box>
  )
}

export default ProgressReportNew