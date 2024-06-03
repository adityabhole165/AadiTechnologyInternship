import { Alert, Box, Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
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

  const TeacherId = (sessionStorage.getItem('TeacherId'));
  const [selectTeacher, setSelectTeacher] = useState(sessionStorage.getItem('TeacherId') || '')
  const [open, setOpen] = useState(false);
  console.log(TeacherId, " ----", selectTeacher);

  const [studentList, setStudentList] = useState();
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
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

  console.log("xxxyyyyssss", Usunpublishedexam);
  console.log("Usisconfigred", Usisconfigred.IsConfiged);


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
  }, [selectTeacher]);


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
  console.log("GetScreenPermission", GetScreenPermission())



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
    <Box px={2}>
      <CommonPageHeader
        navLinks={[
          {
            title: 'Final Result',
            path: '/extended-sidebar/Teacher/FinalResult',
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
                minWidth: '300px'
                , bgcolor: GetScreenPermission() === 'N' ? '#f0e68c' : 'inherit'
              }}
              ItemList={USClassTeachers}
              onChange={clickSelectClass}
              defaultValue={selectTeacher}
              size="small"
              label="Class Teacher"
              DisableClearable={GetScreenPermission() === 'N'}

              disabled={TeacherId == selectTeacher}
            />
          </Box>
          <Box>
            <SearchableDropdown
              ItemList={USStudentListDropDown}
              onChange={clickStudentList}
              defaultValue={studentList}
              label="All"
              size="small"
              sx={{ width: '350px' }}
            />
          </Box>
          <Box>

            <Button
              onClick={ClickShow}
              sx={{
                color: 'white',
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: grey[600],
                },
              }}
            > Show
            </Button>
          </Box>
          <Box>
            <Button
              onClick={clickPrint}
              sx={{
                color: 'white',
                backgroundColor: blue[500],
                '&:hover': {
                  backgroundColor: grey[600],
                },
              }}
            > Print Preview
            </Button>
          </Box>


        </>}
      />

      <Box sx={{ mt: 1, background: 'white' }}>
        {open && (
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
            <hr />
            <Typography variant={"h4"} mb={1}>Student Details</Typography>



            {MarkDetailsView.length > 0 ? (
              <Table>
                <TableBody>
                  {USSStudentsingleResult.map((item) => {
                    return (
                      <TableRow sx={{ bgcolor: 'grey.200' }}>
                        <TableCell><b>Roll No:</b>{item.Text2} </TableCell>
                        <TableCell><b>Name:</b> {item.Text1}	</TableCell>
                        <TableCell><b>Class:</b> {item.Text3} - {item.Text4}	</TableCell>
                        <TableCell><b>Year:</b> {item.Text5}	</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (
              <span></span>
            )}

            <Box sx={{ overflowX: 'auto' }}>

              {MarkDetailsView.length > 0 ? (
                <Table>
                  <TableBody>
                    <TableRow>
                      <Typography variant={"h4"} textAlign={'left'} color={"primary"} mt={4}>
                        Subjects
                      </Typography>
                      {SubjectDetailsView.map((subject) => (
                        <TableCell><b>{subject.Name}</b></TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <Typography variant={"h4"} textAlign={'left'} color={"primary"} mt={4}>
                        Marks
                      </Typography>
                      {MarkDetailsView.map((marks) => (
                        <TableCell>{marks.Name}</TableCell>
                      ))}
                    </TableRow>

                    <TableRow>
                      <Typography variant={"h4"} textAlign={'left'} color={"primary"} mt={4}>
                        Grade
                      </Typography>
                      {GradesDetailsView.map((Grade) => (
                        <TableCell>{Grade.Name}
                        </TableCell>
                      )
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
                  <b>Result not generated for this student: {isgenrate}</b>
                </Typography>

              )}
              {Usisconfigred.IsConfiged == 0 ? (
                <div>
                  {Usunpublishedexam.length > 0 && (
                    <Alert variant={"filled"} color='info' sx={{ mb: 2 }} icon={<InfoOutlined />}>
                      <b>Configured exams are not published: {Usunpublishedexam.map((item) => item.SchoolWise_Test_Name).join(', ')}</b>
                    </Alert>
                  )}
                </div>
              ) : (
                <span> </span>
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
                <Button
                  onClick={() => {
                    navigate('/extended-sidebar/Teacher/FinalResult');
                  }}
                  variant="contained"
                  color="error">
                  BACK
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ViewResultAll;

