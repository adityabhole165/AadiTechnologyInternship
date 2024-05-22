// import Print from '@mui/icons-material/Print'
// import QuestionMark from '@mui/icons-material/QuestionMark'
// import Search from '@mui/icons-material/Search'
// import { Box, IconButton, Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
// import { grey } from '@mui/material/colors'
// import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown'
// import Dropdown from 'src/libraries/dropdown/Dropdown'
// import CommonPageHeader from '../CommonPageHeader'
// import DataTable from '../DataTable'

// type Props = {}

// const ViewResultAll = (props: Props) => {
//     return (
//         <Box px={2}>
//             <CommonPageHeader
//                 navLinks={[
//                     {
//                         title: 'Final Result',
//                         path: '/extended-sidebar/Teacher/FinalResult'
//                     },
//                     {
//                         title: 'View Result All',
//                         path: ''
//                     }
//                 ]}
//                 rightActions={<>
//                     <Box>
//                         <SearchableDropdown
//                             onChange={(value) => {

//                             }}
//                             ItemList={[]}
//                             size='small'
//                             sx={{ width: '250px' }}
//                             label='Class Teacher'
//                         />
//                     </Box>
//                     <Box>
//                         <Dropdown
//                             Array={[]}
//                             handleChange={(value) => { }}
//                             size='small'
//                             variant='outlined'
//                             width={'250px'}
//                             label={"Student"}
//                         />
//                     </Box>
//                     <Box>
//                         <Tooltip title={"View result of all/selected student."}>
//                             <IconButton
//                                 sx={{
//                                     color: 'white',
//                                     backgroundColor: grey[500],
//                                     '&:hover': {
//                                         backgroundColor: grey[600]
//                                     }
//                                 }}
//                             >
//                                 <QuestionMark />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                     <Box>
//                         <Tooltip title={"Search"}>
//                             <IconButton
//                                 sx={{
//                                     color: 'white',
//                                     backgroundColor: grey[500],
//                                     '&:hover': {
//                                         backgroundColor: grey[600]
//                                     }
//                                 }}
//                             >
//                                 <Search />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                     <Box>
//                         <Tooltip title={"Print Preview"}>
//                             <IconButton
//                                 sx={{
//                                     color: 'white',
//                                     backgroundColor: grey[500],
//                                     '&:hover': {
//                                         backgroundColor: grey[600]
//                                     }
//                                 }}
//                             >
//                                 <Print />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                 </>}
//             />
//             <Box sx={{ p: 2, background: 'white' }}>
//                 <Box>
//                     <hr />
//                     <Typography variant={"h3"} textAlign={'center'} color={"primary"} mb={1}>
//                         Pawar Public Charitable Trust's PAWAR PUBLIC SCHOOL Progress Report
//                     </Typography>
//                     <hr />
//                     <Typography variant={"h4"} mb={1}>Student Details</Typography>
//                     <Table>
//                         <TableBody>
//                             <TableRow sx={{ bgcolor: 'grey.200' }}>
//                                 <TableCell><b>Roll No:</b> 1</TableCell>
//                                 <TableCell><b>Name:</b> Miss Jagvi Nilesh Badgujar	</TableCell>
//                                 <TableCell><b>Class:</b> 1 - A	</TableCell>
//                                 <TableCell><b>Year:</b> 2023-2024	</TableCell>
//                             </TableRow>
//                         </TableBody>
//                     </Table>

//                     <Typography variant={"h4"} my={1} >Subject Progress Details For <Typography color='primary'>Subject Enrichment Analysis - I</Typography>
//                     </Typography>
//                     <DataTable
//                         columns={[
//                             {
//                                 id: 'english',
//                                 label: 'English',
//                                 renderCell: (rowData) => rowData.english
//                             },
//                             {
//                                 id: 'mathematics',
//                                 label: 'Mathematics',
//                                 renderCell: (rowData) => rowData.mathematics
//                             },
//                             {
//                                 id: 'evs',
//                                 label: 'E.V.S.',
//                                 renderCell: (rowData) => rowData.evs
//                             },
//                             {
//                                 id: 'computerStudies',
//                                 label: 'Computer Studies',
//                                 renderCell: (rowData) => rowData.computerStudies
//                             },
//                             {
//                                 id: 'hindi3',
//                                 label: 'Hindi III',
//                                 renderCell: (rowData) => rowData.hindi3
//                             },
//                         ]}
//                         data={[
//                             {
//                                 english: 'B2',
//                                 mathematics: 'A1',
//                                 evs: 'B2',
//                                 computerStudies: 'A1',
//                                 hindi3: 'A1',
//                             },
//                         ]}
//                         isPagination={false}
//                     />
//                 </Box>
//             </Box>
//         </Box>
//     )
// }

// export default ViewResultAll















import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Alert, Box, Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';
import { Column } from '../DataTable';

import {
  IClassTeacherBody,
  IGetAllStudentTestprogressBody,
  IGetStudentNameListBody,
  IGetsingleStudentBody
} from 'src/interfaces/VeiwResultAll/IViewResultAll';

import {
  ClassTechersListt,
  GetStudentResultList,
  GetsingleStudentResult,
  GradesDetailsVA,
  MarksDetailsVA,
  StudentNameList,
  SubjectDetailsVA
} from 'src/requests/VeiwAllResult/ReqveiwresultAll';

type Props = {};

const ViewResultAll = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectTeacher, setSelectTeacher] = useState(sessionStorage.getItem('TeacherId') || '');
  const [studentList, setStudentList] = useState();
  console.log(studentList, "sjddjdd");

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
  const GradesDetailsView = useSelector((state: RootState) => state.VeiwResult.getGradesDetailsView
  );
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
    asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asStdDivId: asStandardDivisionId,
    asStartIndex: 0,
    PageCount: 10,
    asTestId: 1,
  };

  // const StudentsingleresultBody: IGetsingleStudentBody = {
  //   asSchoolId,
  //   asAcademicyearId: asAcademicYearId,
  //   asStudentId: 1,
  //   asInsertedById: asUserId,
  //   asWithGrace: 0,
  // };
  useEffect(() => {
    const StudentsingleresultBody: IGetsingleStudentBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicyearId: asAcademicYearId,
      // asStudentId: Number(asStudentId),
      // asAcademicyearId: 53,
      // asStudentId: 32682,
      asStudentId: Number(studentList),
      asInsertedById: Number(asUserId),
      asWithGrace: 0,
    }
    dispatch(GetsingleStudentResult(StudentsingleresultBody))
    dispatch(SubjectDetailsVA(StudentsingleresultBody))
    dispatch(MarksDetailsVA(StudentsingleresultBody))
    dispatch(GradesDetailsVA(StudentsingleresultBody))
  }, [selectTeacher, studentList])

  const clickSelectClass = (value) => {
    setSelectTeacher(value);
  };

  const clickStudentList = (value) => {
    setStudentList(value);
  };

  useEffect(() => {
    dispatch(ClassTechersListt(ClassTeachersBody));
  }, []);

  useEffect(() => {
    dispatch(StudentNameList(StudentListDropDowntBody));
  }, [selectTeacher]);

  useEffect(() => {
    dispatch(GetStudentResultList(StudentResultBody));
  }, [selectTeacher, studentList]);


  // const Changevalue = (value: string) => {
  //   setStudentList(value);
  // };

  const columns: Column[] = [
    {
      id: 'english',
      label: 'English',
      renderCell: (rowData) => rowData.Text1,
    },
    {
      id: 'mathematics',
      label: 'Mathematics',
      renderCell: (rowData) => rowData.Text2,
    },
    {
      id: 'evs',
      label: 'E.V.S.',
      renderCell: (rowData) => rowData.Text3,
    },
    {
      id: 'computerStudies',
      label: 'Computer Studies',
      renderCell: (rowData) => rowData.Text4,
    },
    {
      id: 'hindi3',
      label: 'Hindi III',
      renderCell: (rowData) => rowData.Text5,
    },
  ];

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
              ItemList={USClassTeachers}
              onChange={clickSelectClass}
              defaultValue={selectTeacher}
              size="small"
              sx={{ width: '250px' }}
              label="Class Teacher"
            />
          </Box>
          <Box>
            <SearchableDropdown
              ItemList={USStudentListDropDown}
              onChange={clickStudentList}
              defaultValue={studentList}
              label="All"
              size="small"
              sx={{ width: '250px' }}
            />
          </Box>
          <Box>

            <Button
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
        </>}

      />

      <Box sx={{ mt: 1, background: 'white' }}>
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

          <Box sx={{ overflowX: 'auto' }}>
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
                  {MarkDetailsView.map((subject) => (
                    <TableCell>{subject.Name}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {GradesDetailsView.map((Grade) => (
                    <TableCell>{Grade.Name}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
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
      <Box sx={{ background: 'white', p: 2 }}>
        <Alert variant="filled" color="info" sx={{ mb: 2 }} icon={<InfoOutlined />}>
          All configured exams are not published
        </Alert>

      </Box>
    </Box>
  );
};

export default ViewResultAll;

