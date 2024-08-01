
import ClearIcon from '@mui/icons-material/Clear';
import QuestionMark from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Link, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGetAllMarksGradeConfigurationBody, IGetClassTeachersBody, IGetPassedAcademicYearsBody, IGetStudentNameDropdownBody, IsGradingStandarBody, IsTestPublishedForStdDivBody, IsTestPublishedForStudentBody, IStudentProgressReportBody } from "src/interfaces/ProgressReport/IprogressReport";
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import GradeConfigurationList from 'src/libraries/ResuableComponents/GradeConfigurationList';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { CDAGetAllMarksGradeConfiguration, CDAGetAllMarksGradeConfiguration1, CDAGetClassTeachers, CDAGetPassedAcademicYears, CDAGetStudentName, CDAIsGradingStandard, CDAIsTestPublishedForStdDiv, CDAIsTestPublishedForStudent, CDAStudentProgressReport } from 'src/requests/ProgressReport/ReqProgressReport';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const ProgressReportNew = () => {
  const dispatch = useDispatch();
  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const TeacherId = sessionStorage.getItem('TeacherId');
  const asUserId = Number(sessionStorage.getItem('Id'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const [selectTeacher, SetselectTeacher] = useState(TeacherId);
  const [Error, SetError] = useState('');
  const [StudentId, SetStudentId] = useState('');
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);


  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );


  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Progress Report') perm = item.IsFullAccess;
    });
    return perm;
  };


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

  const USGetPassedAcademicYears: any = useSelector((state: RootState) => state.ProgressReportNew.ISGetPassedAcademicYears);
  const USlistStudentsDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistStudentsDetails);
  const USlistSubjectsDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistSubjectsDetails);

  const USlistTestDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistTestDetails);
  const USlistSubjectIdDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISlistSubjectIdDetails);
  const USListSchoolWiseTestNameDetail: any = useSelector((state: RootState) => state.ProgressReportNew.ISListSchoolWiseTestNameDetail);
  const USListSubjectidDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListSubjectidDetails);
  const USListTestTypeIdDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListTestTypeIdDetails);
  const USListMarkssDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListMarkssDetails);
  const USListDisplayNameDetails: any = useSelector((state: RootState) => state.ProgressReportNew.ISListDisplayNameDetails);
  const USGetAllMarksGradeConfiguration = useSelector((state: RootState) => state.ProgressReportNew.ISGetAllMarksGradeConfiguration);
  const USGetAllMarksGradeConfiguration1 = useSelector((state: RootState) => state.ProgressReportNew.ISGetAllMarksGradeConfiguration1);
  const Data = USGetAllMarksGradeConfiguration.filter((item) => item.Standard_Id != "")
  const Data1 = USGetAllMarksGradeConfiguration1.filter((item) => item.Standard_Id != "")
  const Data3 = USlistSubjectIdDetails.filter((item) => item.SchoolWise_Test_Name !== "Total")
  const legendText = 'Legend * : Subject marks not considered in total marks';
  const formattedText = legendText.replace('*', '<span style="color: red;">*</span>');
  const USIsGradingStandard: any = useSelector((state: RootState) => state.ProgressReportNew.IsGradingStandarBodyIS);
  console.log(USIsGradingStandard, "USIsGradingStandard  ");

  const USIsTestPublishedForStdDiv: any = useSelector((state: RootState) => state.ProgressReportNew.IsTestPublishedForStdDivBodyIS);
  const USIsTestPublishedForStudentIS: any = useSelector((state: RootState) => state.ProgressReportNew.RIsTestPublishedForStudentIS);
  console.log(USIsTestPublishedForStdDiv, "USIsTestPublishedForStdDiv");
  console.log(USIsTestPublishedForStudentIS, "USIsTestPublishedForStudentIS");


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
      if (item.Value == item.NewValue) {
        returnVal = item.Id
      }
    })
    return returnVal
  };

  const Standard_Id = () => {
    let returnVal = 0
    USGetClassTeachers.map((item) => {
      if (item.Value == item.NewValue) {
        returnVal = item.asStandardId
      }
    })
    return returnVal
  };

  console.log(Standard_Id(), "-", selectTeacher), "=", USGetClassTeachers;
  console.log(USGetClassTeachers), "-----";



  useEffect(() => {
    StandardDivisionId()
    Standard_Id()
  }, [selectTeacher]);
  const GetClassTeachersBody: IGetClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asTeacherId: Number(GetScreenPermission() == 'Y' ? 0 : TeacherId)
  };

  const GetStudentNameDropdownBody: IGetStudentNameDropdownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivisionId: StandardDivisionId()

  };

  const StudentProgressReportBody: IStudentProgressReportBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmeicYearId: Number(asAcademicYearId),
    asStudentId: Number(StudentId),
    asUserId: asUserId


  };

  const GetPassedAcademicYearsBody: IGetPassedAcademicYearsBody = {
    asSchoolId: Number(asSchoolId),
    asStudent_Id: Number(StudentId),
    asIncludeCurrentYear: false


  };

  const GetAllMarksGradeConfigurationBody: IGetAllMarksGradeConfigurationBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYrId: Number(asAcademicYearId),
    asStandardId: Number(GetClassTeacher()),
    asIsCoCurricular: false
  };

  const GetAllMarksGradeConfigurationBody1: IGetAllMarksGradeConfigurationBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYrId: Number(asAcademicYearId),
    asStandardId: Number(GetClassTeacher()),
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

  }, [StudentId]);

  useEffect(() => {
    dispatch(CDAIsTestPublishedForStdDiv(IsTestPublishedForStdDiv));

  }, [StudentId]);

  useEffect(() => {
    dispatch(CDAIsTestPublishedForStudent(IsTestPublishedForStudent));

  }, [StudentId]);


  useEffect(() => {
    if (GetScreenPermission() == 'Y') {
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
    dispatch(CDAStudentProgressReport(StudentProgressReportBody));

  }, [StudentId]);

  useEffect(() => {
    dispatch(CDAGetPassedAcademicYears(GetPassedAcademicYearsBody));

  }, [StudentId]);

  useEffect(() => {
    dispatch(CDAGetAllMarksGradeConfiguration(GetAllMarksGradeConfigurationBody));
    dispatch(CDAGetAllMarksGradeConfiguration1(GetAllMarksGradeConfigurationBody1));

  }, [selectTeacher]);


  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    setOpen1(true); // Open the dialog
  };

  const handleClose = () => {
    setOpen1(false); // Close the dialog
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Progress Report', path: '/extended-sidebar/Teacher/ProgressReportNew' }
        ]}
        rightActions={<>

          <SearchableDropdown
            label={"Subject Teacher"}
            sx={{ pl: 0, minWidth: '350px', backgroundColor: GetScreenPermission() == 'N' ? '#F0F0F0' : '', }}
            ItemList={USGetClassTeachers}
            mandatory
            onChange={clickSelectClass}
            disabled={GetScreenPermission() == 'N'}
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

          <Box>
            <Tooltip title={'Show'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
                onClick={ClickShow}>
                <VisibilityTwoToneIcon />
              </IconButton>
            </Tooltip>


          </Box>

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

          {USIsTestPublishedForStdDiv === true || USIsTestPublishedForStudentIS === true ?
            <>


              {USIsGradingStandard == true ?
                <>


                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

                    <Link href="#" underline="none" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h4">Grade Configuration Details</Typography>
                    </Link>

                    <Dialog open={open1} onClose={handleClose} maxWidth="md" scroll="body" sx={{ minHeight: '400px' }}>
                      <Box sx={{ backgroundColor: "#ede7f6" }}>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                          Grade Configuration Details

                          <ClearIcon onClick={handleClose} sx={{ color: 'red' }} />
                        </DialogTitle>
                      </Box>
                      <DialogContent>
                        <Typography variant="h4" my={1}>
                          Subjects :-
                        </Typography>
                        <GradeConfigurationList
                          ItemList={Data}
                          HeaderArray={headerArray}
                        />
                      </DialogContent>
                      <DialogContent>
                        <Typography variant="h4" my={1}>
                          Co-Curricular Subjects :-
                        </Typography>
                        <GradeConfigurationList
                          ItemList={Data1}
                          HeaderArray={headerArray}
                        />
                      </DialogContent>
                    </Dialog>



                  </Box>


                  <Box sx={{ mt: 1, background: '#b2ebf2' }}>
                    <hr />
                    {USlistStudentsDetails.map((subject, index) => (
                      <div key={index}>
                        <Typography variant="h4" textAlign="center" color="black" mb={1}>
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
                            <TableRow sx={{ bgcolor: 'white' }}>
                              <TableCell><b>Roll No:</b>{item.Roll_No} </TableCell>
                              <TableCell><b>Name:</b> {item.Student_Name}	</TableCell>
                              <TableCell><b>Class:</b> {item.Standard_Name} - {item.Division_Name}	</TableCell>
                              <TableCell><b>Year:</b> {item.Academic_Year}	</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>

                  </Box>
                  <Typography
                    sx={{ bgcolor: 'white' }}
                    dangerouslySetInnerHTML={{ __html: formattedText }}
                  />
                  <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#b3e5fc' }}>
                          <TableCell rowSpan={2}>
                            <Typography variant={"h4"} textAlign={'left'} color={"primary"} ml={9} >
                              Subjects &#9654;
                            </Typography>
                            <Typography variant={"h3"} textAlign={'left'} color={"primary"}>
                              &#9660; Exam
                            </Typography></TableCell>
                          {USlistSubjectsDetails.map((item) => (
                            <TableCell key={item.id}>
                              <b>
                                {item.Total_Consideration === 'N' ? (
                                  <span>
                                    {item.Subject_Name} <span style={{ color: 'red' }}>*</span>
                                  </span>
                                ) : (
                                  <span>{item.Subject_Name}</span>
                                )}
                              </b>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow>
                          {USListSubjectidDetails.map((item) => (
                            <TableCell >
                              <Typography color="#42a5f5" textAlign={'left'} mr={8}  >
                                <b style={{ marginRight: "9px" }}>{item.ShortenTestType_Name}</b>
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {USlistTestDetailsArr.map((testItem) => (
                        <TableBody key={testItem.id}>
                          <TableRow>
                            <TableCell>{testItem.Test_Name}</TableCell>
                            {testItem.subjectIdArr.map((subjectItem) => (
                              <TableCell>{subjectItem.Grade}</TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      ))}


                      {/* {USlistTestDetails.map((testItem) => (
                    <TableBody key={testItem.id}>
                      <TableRow>
                        <TableCell>{testItem.Test_Name}</TableCell>
                        {Data3.map((subjectItem) => (
                          <TableCell>{subjectItem.Grade}</TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  ))} */}
                    </Table>
                  </Box>
                </>
                :
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

                    <Link href="#" underline="none" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h4">Grade Configuration Details</Typography>
                    </Link>

                    <Dialog open={open1} onClose={handleClose} maxWidth="md" scroll="body" sx={{ minHeight: '400px' }}>
                      <Box sx={{ backgroundColor: "#ede7f6" }}>
                        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                          Grade Configuration Details

                          <ClearIcon onClick={handleClose} sx={{ color: 'red' }} />
                        </DialogTitle>
                      </Box>
                      <DialogContent>
                        <Typography variant="h4" my={1}>
                          Subjects :-
                        </Typography>
                        <GradeConfigurationList
                          ItemList={Data}
                          HeaderArray={headerArray}
                        />
                      </DialogContent>
                      <DialogContent>
                        <Typography variant="h4" my={1}>
                          Co-Curricular Subjects :-
                        </Typography>
                        <GradeConfigurationList
                          ItemList={Data1}
                          HeaderArray={headerArray}
                        />
                      </DialogContent>
                    </Dialog>



                  </Box>
                  <Box sx={{ mt: 1, background: 'white' }}>
                    <hr />
                    {USlistStudentsDetails.map((subject, index) => (
                      <div key={index}>
                        <Typography variant="h4" textAlign="center" color="black" mb={1}>
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
                              <TableCell sx={{textAlign:'center', color:'white'}}><b>Roll No:</b>{item.Roll_No} </TableCell>
                              <TableCell sx={{textAlign:'center', color:'white'}}><b>Name:</b> {item.Student_Name}	</TableCell>
                              <TableCell sx={{textAlign:'center', color:'white'}}><b>Class:</b> {item.Standard_Name} - {item.Division_Name}	</TableCell>
                              <TableCell sx={{textAlign:'center', color:'white'}}><b>Year:</b> {item.Academic_Year}	</TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>

                  </Box>
                  
                  <Typography
                    sx={{ bgcolor: 'white', p:2}}
                    dangerouslySetInnerHTML={{ __html: formattedText }}
                  />
                 
                  <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#F0F0F0' }}>
                          <TableCell rowSpan={2}>
                            <Typography variant={"h3"} textAlign={'left'} color={"black"} ml={5} >
                              Subjects &#9654;
                            </Typography>
                            <Typography variant={"h3"} textAlign={'left'} color={"black"}>
                              &#9660; Exam
                            </Typography></TableCell>
                          {USlistSubjectsDetails.map((item) => (
                            <TableCell key={item.id}>
                              <b>
                                {item.Total_Consideration === 'N' ? (
                                  <span>
                                    {item.Subject_Name} <span style={{ color: 'red' }}>*</span>
                                  </span>
                                ) : (
                                  <span>{item.Subject_Name}</span>
                                )}
                              </b>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow sx={{backgroundColor:'white'}}>
                          {USListSubjectidDetails.map((item) => (
                            <TableCell >
                              <Typography color="#38548A" textAlign={'left'} mr={8}  >
                                <b style={{ marginRight: "9px" }}>{item.ShortenTestType_Name}</b>
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      {USlistTestDetailsArr1.map((testItem) => (
                        <TableBody key={testItem.id}>
                          <TableRow  sx={{backgroundColor:'white'}}>
                            <TableCell sx={{backgroundColor:'#F0F0F0'}} >{testItem.Test_Name}</TableCell>
                            {testItem.subjectIdArr.map((subjectItem) => (
                              <TableCell>{subjectItem.Grade}</TableCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      ))}


                      {/* {USlistTestDetails.map((testItem) => (
                    <TableBody key={testItem.id}>
                      <TableRow>
                        <TableCell>{testItem.Test_Name}</TableCell>
                        {Data3.map((subjectItem) => (
                          <TableCell>{subjectItem.Grade}</TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  ))} */}
                    </Table>
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




    </Box>
  )
}

export default ProgressReportNew