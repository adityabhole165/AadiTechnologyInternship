import PrintIcon from '@mui/icons-material/Print';
import QuestionMark from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Alert, Box, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

import {
  IClassTeacherBody,
  IGetAllStudentTestprogressBody,
  IGetStudentNameListBody,
  IGetsingleStudentBody,
  IUnpublishedTestexamBody,
  IconfiguredExamBody
} from 'src/interfaces/VeiwResultAll/IViewResultAll';

import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { GetSchoolSettingsBody } from 'src/interfaces/ProgressReport/IprogressReport';
import { CDAGetSchoolSettings } from 'src/requests/ProgressReport/ReqProgressReport';
import {
  ClassTechersListt,
  GetStudentResultList,
  GetsingleStudentResultVA,
  StudentNameList,
  getiscofigred,
  getunpublishedexam
} from 'src/requests/VeiwAllResult/ReqveiwresultAll';

type Props = {};
const ViewResultAll = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { StandardDivisionId } = useParams();
  const TeacherId = (sessionStorage.getItem('TeacherId'));
  const [selectTeacher, setSelectTeacher] = useState('')
  const [open, setOpen] = useState(false);
  // console.log(TeacherId, " ----", selectTeacher);
  const [studentList, setStudentList] = useState();
  const [teacherList, setTeacherList] = useState([]);
  const ScreensAccessPermission = JSON.parse(sessionStorage.getItem('ScreensAccessPermission'));
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asStandardDivisionId = Number(sessionStorage.getItem('StandardDivisionId'));
  const asUserId = Number(sessionStorage.getItem('Id'));
  const USClassTeachers = useSelector((state: RootState) => state.VeiwResult.ClassTeachers);
  const USStudentListDropDown = useSelector((state: RootState) => state.VeiwResult.StudentName);
  const USStudentResultList = useSelector((state: RootState) => state.VeiwResult.StudentResultList);
  const USSStudentsingleResult = useSelector((state: RootState) => state.VeiwResult.StudentsingleResult);
  const MarkDetailsView = useSelector((state: RootState) => state.VeiwResult.getMarkDetailsView);
  const SubjectDetailsView = useSelector((state: RootState) => state.VeiwResult.getSubjectDetailsView)
  const GradesDetailsView = useSelector((state: RootState) => state.VeiwResult.getGradesDetailsView);
  const TotalPerGradeView = useSelector((state: RootState) => state.VeiwResult.getTotalPerGradeView);
  const PercentageDetails = useSelector((state: RootState) => state.VeiwResult.getPerDetails);
  const Usisconfigred: any = useSelector((state: RootState) => state.VeiwResult.iscofigred);
  const Usunpublishedexam: any = useSelector((state: RootState) => state.VeiwResult.unpublishexam);
  const GetnotgenrateLists = useSelector((state: RootState) => state.VeiwResult.notResultList);

  const Data3 = SubjectDetailsView.filter((item) => item.Grade == "")
  const Data4 = SubjectDetailsView.filter((item) => item.Marks == "")
  const showOnlyGrades = USSStudentsingleResult.some((item) => item.ShowOnlyGrades.trim() === 'true');
  // console.log(showOnlyGrades, "showgradeess");
  const totalconsidration = SubjectDetailsView.filter((item) => item.Total_Consideration === "N")
  //console.log(totalconsidration, "totalconsidrationdddd");

  const UsGetSchoolSettings: any = useSelector((state: RootState) => state.ProgressReportNew.IsGetSchoolSettings);

  const [IsTotalConsiderForProgressReport, setIsTotalConsiderForProgressReport] = useState('');

  useEffect(() => {
    if (UsGetSchoolSettings != null)
      setIsTotalConsiderForProgressReport(UsGetSchoolSettings?.GetSchoolSettingsResult?.IsTotalConsiderForProgressReport);
  }, [UsGetSchoolSettings])

  const ClassTeachersBody: IClassTeacherBody = {
    asSchoolId,
    asAcademicYearId,
  };

  const GetSchoolSettings: GetSchoolSettingsBody = {
    asSchoolId: Number(asSchoolId),
  };


  const StudentListDropDowntBody: IGetStudentNameListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivisionId: Number(selectTeacher),
  };

  const StudentResultBody: IGetAllStudentTestprogressBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asStartIndex: 0,
    PageCount: 10,
    asTestId: 1,
  };

  const iscofigred: IconfiguredExamBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
  };

  const unpublishexam: IUnpublishedTestexamBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
  };

  const StudentsingleresultBody: IGetsingleStudentBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: asAcademicYearId,
    asStudentId: Number(studentList),
    asInsertedById: Number(asUserId),
    asWithGrace: 1,


  }

  useEffect(() => {
    dispatch(GetsingleStudentResultVA(StudentsingleresultBody))
  }, [selectTeacher, studentList])

  useEffect(() => {
    dispatch(CDAGetSchoolSettings(GetSchoolSettings));

  }, []);


  const clickSelectClass = (value) => {
    setSelectTeacher(value);
    console.log(value, selectTeacher, 'value')
  };

  const clickStudentList = (value) => {
    setOpen(false);
    setStudentList(value)
  };

  const ClickShow = (value) => {
    setOpen(true)
  }

  useEffect(() => {
    dispatch(ClassTechersListt(ClassTeachersBody));
  }, []);

  useEffect(() => {
    dispatch(StudentNameList(StudentListDropDowntBody));
  }, [selectTeacher]);


  useEffect(() => {
    //dispatch(StudentNameList(StudentListDropDowntBody));
    if (USStudentListDropDown.length > 0)
      setStudentList(USStudentListDropDown[0].Id)
  }, [USStudentListDropDown]);


  useEffect(() => {
    if (StandardDivisionId !== undefined && teacherList.length === 1)
      setSelectTeacher(StandardDivisionId)
  }, [USStudentListDropDown]);

  


  


  useEffect(() => {
    dispatch(GetStudentResultList(StudentResultBody));
  }, [selectTeacher, studentList]);

  useEffect(() => {
    dispatch(getiscofigred(iscofigred));
    dispatch(getunpublishedexam(unpublishexam));
  }, []);

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission && ScreensAccessPermission.map((item) => {
      if (item.ScreenName === 'Final veiw result') perm = item.IsFullAccess;
    });
    return perm;
  };
  //console.log("GetScreenPermission", GetScreenPermission())

  const getStudentName = () => {
    let classStudentName = '';
    USStudentListDropDown.map((item) => {
      if (item.Value == studentList) classStudentName = item.Name;
    });

    return classStudentName;
  };
  let classTeacherList = [];
  const getClassTeacherName = () => {
    USClassTeachers.map((item) => {
      if (item.TeacherId == TeacherId) {
        classTeacherList.push({
          Id: item.Id,
          Value: item.Value,
          Name: item.Name
        });
      }
    });
    // if (classTeacherList.length > 1) {
    setTeacherList(classTeacherList)
    // }
  };
  console.log(teacherList, 'teacherList')
  const isgenrate = getStudentName()
  console.log(isgenrate, "genrate");

  const clickPrint = () => {
    window.open('https://schoolwebsite.regulusit.net/RITeSchool/Student/StudentAnnualResultPrint.aspx?eNXR1G7TvKnm53e4OO8B4kK13X5MkQwItrEc3d1VEwmx4YWMbwW4T3xnZE3Dc3QV4xnyziKPOKwj6nT8UFXzenNlqH5PQrTSymfl4ktp7WE/4fc29EcOQXYAkGBiAYJ4ubKxU+rY3xn5qTDv2PMcpA==q');
  };


  useEffect(() => {
    if (USClassTeachers != null)
      setTeacherList(USClassTeachers);
    getClassTeacherName();
  }, [USClassTeachers])

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Final Result',
            path: '/extended-sidebar/Teacher/FinalResult/' + StandardDivisionId,
          },
          {
            title: 'View Result All',
            path: '',
          },
        ]}
        rightActions={<>
          <Box>
            <SearchableDropdown
              sx={{
                minWidth: '20vw'
                , bgcolor: GetScreenPermission() === 'N' ? '#F0F0F0' : 'inherit'
              }}
              ItemList={teacherList}
              onChange={clickSelectClass}
              defaultValue={selectTeacher}
              size="small"
              label="Class Teacher"
              DisableClearable={GetScreenPermission() === 'N'}
              mandatory
              disabled={teacherList.length === 1}
            />
          </Box>

          <Box>
            <SearchableDropdown
              ItemList={USStudentListDropDown}
              onChange={clickStudentList}
              defaultValue={studentList}
              label="Student Name "
              size="small"
              sx={{ width: '20vw' }}
            />
          </Box>

          <Box>
            <Tooltip title={'View result of all / selected student .'}>
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
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
                onClick={ClickShow}>
                <VisibilityTwoToneIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={'Print'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: blue[500],
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
                onClick={clickPrint}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>}
      />

      <Box sx={{ mt: 1, background: 'white' }}>
        {open && (
          <Box>
            {MarkDetailsView.length > 0 ? (
              <Box>
                <Box sx={{ backgroundColor: 'white' }}>
                  <hr />
                  {USSStudentsingleResult.length > 0 && (
                    <>
                      <Typography variant="h4" textAlign={'center'} color={'primary'} mb={1}>
                        {USSStudentsingleResult[0].Text7}
                      </Typography>
                      <hr />
                      <Typography variant="h3" textAlign={'center'} color={'black'} mb={1}>
                        {USSStudentsingleResult[0].Text6}
                      </Typography>
                      <hr />
                      <Typography variant="h4" textAlign={'center'} color={'black'} pb={1}>
                        Final Result
                      </Typography>
                    </>
                  )}
                </Box>
                <Table>
                  <TableBody>
                    {USSStudentsingleResult.map((item) => (
                      <TableRow key={item.id} sx={{ bgcolor: '#38548A' }}>
                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Roll No :  {item.Text2} </b></TableCell>
                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Name :  {item.Text1} </b></TableCell>
                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Class :  {item.Text3} - {item.Text4} </b></TableCell>
                        <TableCell sx={{ textAlign: 'center', color: 'white' }}><b>Year :  {item.Text5} </b></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Table>
                  <TableBody>
                    {totalconsidration.length > 0 && (
                      <>
                        <TableRow sx={{ bgcolor: 'white', p: 2 }}>
                          <TableCell><b> Legend : </b> <span style={{ color: 'red' }}>*</span>   Subject marks not considered in total marks </TableCell>
                        </TableRow>
                      </>
                    )}

                  </TableBody>
                </Table>

                <Box sx={{ overflowX: 'auto' }}>
                  <Table>
                    <TableBody>
                      <TableRow sx={{ backgroundColor: '#F0F0F0' }}>
                        <TableCell>
                          <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={1} ml={1}>
                            Subjects
                          </Typography>
                        </TableCell>
                        {SubjectDetailsView.map((subject) => (
                          <TableCell key={subject.Subject_Id} sx={{ textAlign: 'center' }}>
                            <b>{subject.Name}</b>
                            {subject.Total_Consideration === "N" && <span style={{ color: 'red' }}>*</span>}
                          </TableCell>
                        ))}

                        {IsTotalConsiderForProgressReport === "True" && !showOnlyGrades && (
                          <>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Total</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>%</TableCell>
                          </>
                        )}
                        {IsTotalConsiderForProgressReport === "True" && (
                          <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Grade</TableCell>
                        )}
                      </TableRow>

                      <TableRow>
                        {!showOnlyGrades && (
                          <>
                            <TableCell sx={{ backgroundColor: '#F0F0F0' }}>
                              <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={0}>
                                Marks
                              </Typography>
                            </TableCell>

                            {MarkDetailsView.map((marks) => (
                              <TableCell key={marks.Name} sx={{ textAlign: 'center' }}>
                                {marks.Name}
                              </TableCell>
                            ))}

                            {IsTotalConsiderForProgressReport === "True" && TotalPerGradeView.map((totalData, index) => {
                              if (index === 0) {
                                const matchingRemark = PercentageDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                return (
                                  <>
                                    <TableCell sx={{ textAlign: 'center' }}>{totalData.TotalMarks}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{totalData.Percentage}%</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                      <Typography variant="body2">
                                        {totalData.GradeName} {matchingRemark && `(${matchingRemark})`}
                                      </Typography>
                                    </TableCell>
                                  </>
                                );
                              }
                              return null;
                            })}
                          </>
                        )}
                      </TableRow>

                      <TableRow>
                        <TableCell sx={{ backgroundColor: '#F0F0F0' }}>
                          <Typography variant={"h4"} textAlign={'center'} color={"black"} mt={0}>
                            Subject Grade
                          </Typography>
                        </TableCell>
                        {GradesDetailsView.map((Grade) => (
                          <TableCell key={Grade.Name} sx={{ textAlign: 'center' }}>{Grade.Name}</TableCell>
                        ))}
                        {!showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                          <>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>-</TableCell>
                          </>
                        )}
                        {showOnlyGrades && IsTotalConsiderForProgressReport === "True" && (
                          <>
                            {TotalPerGradeView.map((totalData, index) => {
                              if (index === 0) {
                                const matchingRemark = PercentageDetails.find(detail => detail.GradeConfId === totalData.Grade_id)?.Remarks || '';
                                return (
                                  <TableCell sx={{ textAlign: 'center' }}>
                                    <Typography variant="body2">
                                      {totalData.GradeName} {matchingRemark && `(${matchingRemark})`}
                                    </Typography>
                                  </TableCell>
                                );
                              }
                              return null;
                            })}
                          </>
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>

                </Box>

                <Typography variant={"h6"} textAlign={'center'} color={"primary"} mb={0}>
                  {Usisconfigred.IsConfiged == 0 ? (
                    <div>
                      {Usunpublishedexam.length > 0 && (
                        <Alert variant={"filled"} color='info' sx={{ mb: 2 }} icon={<InfoOutlined />}>
                          <b style={{ color: 'blue' }}> All configured exams are not published - {Usunpublishedexam.map((item) => item.SchoolWise_Test_Name).join(', ')}</b>
                        </Alert>
                      )}
                    </div>
                  ) : (
                    <span> </span>
                  )}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                <b>Result not generated for this student :  {isgenrate}</b>
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default ViewResultAll;
