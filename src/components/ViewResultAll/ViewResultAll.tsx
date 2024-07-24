import PrintIcon from '@mui/icons-material/Print';
import QuestionMark from '@mui/icons-material/QuestionMark';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { Alert, Box, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,useParams} from 'react-router';
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
  const { StandardDivisionId } =useParams();    
  const TeacherId = (sessionStorage.getItem('TeacherId'));
  const [selectTeacher, setSelectTeacher] = useState(sessionStorage.getItem('TeacherId') || '')
  const [open, setOpen] = useState(false);
  // console.log(TeacherId, " ----", selectTeacher);
  const [studentList, setStudentList] = useState();
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
  const Usisconfigred: any = useSelector((state: RootState) => state.VeiwResult.iscofigred);
  const Usunpublishedexam: any = useSelector((state: RootState) => state.VeiwResult.unpublishexam);
  const GetnotgenrateLists = useSelector((state: RootState) => state.VeiwResult.notResultList);

  const Data3 = SubjectDetailsView.filter((item) => item.Grade == "")
  const Data4 = SubjectDetailsView.filter((item) => item.Marks == "")
  const showOnlyGrades = USSStudentsingleResult.some((item) => item.ShowOnlyGrades.trim() === 'true');
  // console.log(showOnlyGrades, "showgradeess");
  const totalconsidration = SubjectDetailsView.filter((item) => item.Total_Consideration === "N")
  //console.log(totalconsidration, "totalconsidrationdddd");

  const ClassTeachersBody: IClassTeacherBody = {
    asSchoolId,
    asAcademicYearId,
  };

  const StudentListDropDowntBody: IGetStudentNameListBody = {
    asSchoolId,
    asAcademicYearId,
    asStandardDivisionId,
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
    asWithGrace: 0,
  }

  useEffect(() => {
    dispatch(GetsingleStudentResultVA(StudentsingleresultBody))
  }, [selectTeacher, studentList])

  const clickSelectClass = (value) => {
    setSelectTeacher(value);
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
  }, [dispatch]);
  useEffect(() => {
    //dispatch(StudentNameList(StudentListDropDowntBody));
    if (USStudentListDropDown.length > 0)
      setStudentList(USStudentListDropDown[0].Id)
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
  const isgenrate = getStudentName()
  console.log(isgenrate, "genrate");

  const clickPrint = () => {
    window.open('https://schoolwebsite.regulusit.net/RITeSchool/Student/StudentAnnualResultPrint.aspx?eNXR1G7TvKnm53e4OO8B4kK13X5MkQwItrEc3d1VEwmx4YWMbwW4T3xnZE3Dc3QV4xnyziKPOKwj6nT8UFXzenNlqH5PQrTSymfl4ktp7WE/4fc29EcOQXYAkGBiAYJ4ubKxU+rY3xn5qTDv2PMcpA==q');
  };

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
              ItemList={USClassTeachers}
              onChange={clickSelectClass}
              defaultValue={selectTeacher}
              size="small"
              label="Class Teacher"
              DisableClearable={GetScreenPermission() === 'N'}
              mandatory
              disabled={TeacherId == selectTeacher}
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
                <hr />
                <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>
                  Pawar Public Charitable Trust's
                </Typography>
                <hr />
                <Typography variant={"h3"} textAlign={'center'} color={"primary"} mb={1}>
                  PAWAR PUBLIC SCHOOL
                </Typography>
                <hr />
                <Typography variant={"h4"} textAlign={'center'} color={"primary"} mb={1}>
                  Final Result
                </Typography>

                <Table>
                  <TableBody>
                    {USSStudentsingleResult.map((item) => (
                      <TableRow key={item.id} sx={{ bgcolor: 'grey.300' }}>
                        <TableCell><b>Roll No :  {item.Text2} </b></TableCell>
                        <TableCell><b>Name :  {item.Text1} </b></TableCell>
                        <TableCell><b>Class :  {item.Text3} - {item.Text4} </b></TableCell>
                        <TableCell><b>Year :  {item.Text5} </b></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Table>
                  <TableBody>
                    {totalconsidration.length > 0 && (
                      <>
                        <TableRow sx={{ bgcolor: 'grey.200' }}>
                          <TableCell><b> Legend : </b> <span style={{ color: 'red' }}>*</span>   Subject marks not considered in total marks </TableCell>
                        </TableRow>
                        {/* {totalconsidration.map((Subject) => (
                          <TableRow key={Subject.Subject_Id}>
                            <TableCell>{Subject.Name}<span style={{ color: 'red' }}>*</span></TableCell>
                          </TableRow>
                        ))} */}
                      </>
                    )}

                  </TableBody>
                </Table>

                <Box sx={{ overflowX: 'auto' }}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <Typography variant={"h4"} textAlign={'center'} color={"primary"} mt={2}>
                          Subjects
                        </Typography>
                        {SubjectDetailsView.map((subject) => (

                          <TableCell key={subject.Subject_Id}><b>{subject.Name}  </b>
                            {/* {(totalconsidration == subject.Subject_Id) && <span style={{ color: 'red' }}>*</span>} */}

                            {(subject.Total_Consideration === "N") && <span style={{ color: 'red' }}>*</span>}

                          </TableCell>

                        ))}

                      </TableRow>
                      <TableRow>
                        {!showOnlyGrades && (
                          <>
                            <Typography variant={"h4"} textAlign={'center'} color={"primary"} mt={2}>
                              Marks
                            </Typography>

                            {MarkDetailsView.map((marks) => (
                              <TableCell key={marks.Name}>{marks.Name}</TableCell>
                            ))}
                          </>
                        )}
                      </TableRow>
                      <TableRow>
                        <Typography variant={"h4"} textAlign={'center'} color={"primary"} mt={2}>
                          Subject Grade
                        </Typography>
                        {GradesDetailsView.map((Grade) => (
                          <TableCell>{Grade.Name}
                          </TableCell>
                        )
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>

                </Box>
                <hr />
                <Typography variant={"h6"} textAlign={'center'} color={"primary"} mb={2}>
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
