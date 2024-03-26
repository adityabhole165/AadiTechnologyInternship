import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Button, Container, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  IGetAllGradesForSubjectMarkListBody,
  IGetAllStudentsForMarksAssignmentsBody,
  IGetClassExamSubjectNameDetailesBody,
  IGetSubjectExamMarkslistsBody,
  IManageStudentsTestMarkBody
} from 'src/interfaces/SubjectExamMarks/ISubjectExamMarks';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import { getAllGradesForSubjectMarkList, getAllStudentsForMarksAssignments, getClassExamSubjectNameDetailes, getManageStudentsTestMark, getSubjectExamMarkslists, resetManageStudentsTestMark } from 'src/requests/SubjectExamMarks/RequestSubjectExamMarks';
import { RootState, useSelector } from 'src/store';
import { getCalendarDateFormatDate } from '../Common/Util';
const SubjectExamMarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { StandardDivisionId, SubjectId, ClassWiseExam } = useParams();

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const [TestDate, setTestDate] = useState('');
  const [DisplayName, setDisplayName] = useState('');
  const [SubjectTotalMarks, setSubjectTotalMarks] = useState('')
  const [PassingTotalMarks, setPassingTotalMarks] = useState('')
  const [TestTypeName, setTestTypeName] = useState('')
  const [TestTypeTotalMarks, setTestTypeTotalMarks] = useState('')
  const [MarksScored, setMarksScored] = useState('')
  const [GradeOrMarkss, setGradeOrMarks] = useState('')
  const [TestOutOfMarks, setTestOutOfMarks] = useState('');
  const [TotalMarks, setTotalMarks] = useState('');
  const [SubjectMarksId, setSubjectMarksId] = useState('');
  const [HeaderList, setHeaderList] = useState([]);
  const [ItemList, setItemList] = useState([]);
  const [StudentTestType, setStudentTestType] = useState('');
  const [StudentTestTypeDetails, setStudentTestTypeDetails] = useState('');
  const [RemoveProgress, setRemoveProgress] = useState('');
  const [RemarkXml, setRemarkXml] = useState('');
  const [InsertedByid, setInsertedByid] = useState('');
  const [HasRemark, setHasRemark] = useState(false);
  const [ShowTotalAsPerOutOfMarks, setShowTotalAsPerOutOfMarks] = useState('');
  const [selectStandard, setSelectStandard] = useState('');
  const [selectDivision, setSelectDivision] = useState('');
  const [RollNo, setRollNo] = useState('');
  const [Name, setName] = useState('');

  const StudentsForMarksAssignment: any = useSelector(
    (state: RootState) => state.SubjectExamMark.StudentsForMarksAssignments
  );

  const StandardName: any = useSelector(
    (state: RootState) => state.SubjectExamMark.StandardName
  );

  const SubjectName: any = useSelector(
    (state: RootState) => state.SubjectExamMark.SubjectName
  );

  const TestName: any = useSelector(
    (state: RootState) => state.SubjectExamMark.SchoolWiseTestName
  );
  const TestMarkDetails: any = useSelector(
    (state: RootState) => state.SubjectExamMark.ListStudentTestMarkDetails
  );
  console.log("TestMarkDetails", TestMarkDetails)
  const ExamStatus: any = useSelector(
    (state: RootState) => state.SubjectExamMark.ListDisplayNameDetail
  );

  const ManageStudentsTestMarks: any = useSelector(
    (state: RootState) => state.SubjectExamMark.ManageStudentsTestMark
  );
  const clickTestDate = (value) => {
    setTestDate(value)
  }
  useEffect(() => {

    const ClassExamSubjectNameDetailes: IGetClassExamSubjectNameDetailesBody = {
      asStandardDivision_Id: Number(StandardDivisionId),
      asSubject_Id: Number(SubjectId),
      asTestId: Number(ClassWiseExam),
      asSchoolId: Number(asSchoolId),
      asAcademicYrId: Number(asAcademicYearId)
    };
    dispatch(getClassExamSubjectNameDetailes(ClassExamSubjectNameDetailes));

  }, []);
  useEffect(() => {

    if (TestMarkDetails.length > 0) {

      setTestDate(getCalendarDateFormatDate(TestMarkDetails[0].Test_Date))
      console.log(TestMarkDetails, "--", getCalendarDateFormatDate(TestMarkDetails[0].Test_Date), "setTestDate", TestMarkDetails[0].Test_Date)
      setTestTypeName(TestMarkDetails.TestType_Name)
      setTestTypeTotalMarks(TestMarkDetails.TestType_Total_Marks)
      setMarksScored(TestMarkDetails.Marks_Scored)
      setGradeOrMarks(TestMarkDetails.Grade_Or_Marks)
    }
  }, [TestMarkDetails])

  useEffect(() => {

    if (StudentsForMarksAssignment !== null) {
      setRollNo(StudentsForMarksAssignment.Roll_No)
      setName(StudentsForMarksAssignment.Name)
    }
  }, [StudentsForMarksAssignment])


  useEffect(() => {
    const GetSubjectExamMarkslists: IGetSubjectExamMarkslistsBody = {
      asSchoolId: Number(asSchoolId),
      asStandardDivision_Id: Number(StandardDivisionId),
      asSubjectId: Number(SubjectId),
      asTestId: Number(ClassWiseExam),
      asAcademicYrId: Number(asAcademicYearId),
      asShowTotalAsPerOutOfMarks: "Y"
    };

    dispatch(getSubjectExamMarkslists(GetSubjectExamMarkslists));
  }, []);
  useEffect(() => {
    const GetAllStudentsForMarksAssignmentsBody: IGetAllStudentsForMarksAssignmentsBody = {
      asAcademicYearID: Number(asAcademicYearId),
      asSchoolId: Number(asSchoolId),
      asSubject_Id: Number(SubjectId),
      asStandardDivision_Id: Number(StandardDivisionId),
      asTestDate: TestDate
    };

    dispatch(getAllStudentsForMarksAssignments(GetAllStudentsForMarksAssignmentsBody));
  }, []);

  useEffect(() => {
    const GetAllGradesForSubjectMarkListBody: IGetAllGradesForSubjectMarkListBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYrId: Number(asAcademicYearId),
      asStandardId: 1064,
      asSubjectId: Number(SubjectId),
      asTestId: Number(ClassWiseExam),
    };

    dispatch(getAllGradesForSubjectMarkList(GetAllGradesForSubjectMarkListBody));
  }, []);


  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/AssignExamMark');
  };
  const onClickSave = () => {
    const ManageStudentsTestMarkBody: IManageStudentsTestMarkBody = {
      asTestWise_Subject_Marks_Id: Number(SubjectMarksId),
      asInserted_By_id: Number(InsertedByid),
      Student_Test_Type_Marks: StudentTestType,
      Student_Test_Type_Marks_Details: StudentTestTypeDetails,
      asRemoveProgress: RemoveProgress,
      RemarkXml: RemarkXml,
      asHasRemark: HasRemark,
      asTestId: Number(ClassWiseExam),
      asSubjectId: Number(SubjectId),
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId)
    };
    dispatch(getManageStudentsTestMark(ManageStudentsTestMarkBody))
  };
  useEffect(() => {

    if (ManageStudentsTestMarks !== '') {
      toast.success(ManageStudentsTestMarks)
      dispatch(resetManageStudentsTestMark())
      navigate("../../AssignExamMark")
    }
  }, [ManageStudentsTestMarks])
  return (
    <Container maxWidth={"xl"}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          pt: 5
        }}
      >
        <Box>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<ChevronRightTwoTone />}
          >
            <Link
              to={'/extended-sidebar/landing/landing'}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <IconButton
                sx={{
                  background: (theme) => theme.palette.common.white,
                  border: (theme) => `1px solid ${theme.palette.grey[400]}`
                }}
              >
                <HomeTwoTone color="primary" />
              </IconButton>
            </Link>
            <Link
              to={'/extended-sidebar/Teacher/AssignExamMark'}
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant={'h3'}
                fontSize={'23px'}
                fontWeight={'normal'}
                color={'text.primary'}
                sx={{
                  '&:hover': {
                    fontWeight: 'bold'
                  }
                }}
              >
                Assign Exam Mark
              </Typography>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Subject Exam Marks
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Box>
            {/* <Dropdown
              variant='outlined'
              label='Class'
              width='100px'
              Array={[]}
            /> */}



            {/* <TextField fullWidth label={'Class'} InputLabelProps={{ shrink: true }} value={StandardName.Standard_Name} /> */}
            {/* <TextField fullWidth value={StandardName?.length > 0 ?
              (StandardName[0].Standard_Name + ' - ' + StandardName[0].Division_Name) : ''} /> */}

            <TextField
              fullWidth
              value={
                (StandardName && Object.keys(StandardName).length > 0) ?
                  (StandardName.Standard_Name + ' - ' + StandardName.Division_Name)
                  :
                  ''
              }
            />
          </Box>
          <Box>
            {/* <Dropdown
              variant='outlined'
              label='Exam'
              width='200px'
              Array={[]}
            /> */}
            {/* <TextField fullWidth label={'Exam'} InputLabelProps={{ shrink: true }} value={TestName.SchoolWise_Test_Name} /> */}
            {/* <TextField fullWidth value={TestName?.length > 0 ?
              (TestName[0].SchoolWise_Test_Name) : ''} /> */}
            <TextField
              fullWidth
              value={
                (TestName && Object.keys(TestName).length > 0) ?
                  TestName.SchoolWise_Test_Name
                  :
                  ''
              }
            />
          </Box>
          <Box>
            {/* <Dropdown
              variant='outlined'
              label='Subject Name'
              width='150px'
              Array={[]}
            /> */}
            {/* <TextField fullWidth label={'Subject Name'} InputLabelProps={{ shrink: true }} value={SubjectName.Subject_Name} /> */}
            {/* <TextField fullWidth value={SubjectName?.length > 0 ?
              (SubjectName[0].Subject_Name) : ''} /> */}
            <TextField
              fullWidth
              value={SubjectName || ''}
            />
          </Box>

          <Box>
            {/* <TextField
              fullWidth value={TestMarkDetails?.length > 0 ?
                (TestMarkDetails[0].Test_Date) : ''}
              type="date"
              label={"Exam Date"}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split('T')[0] }}
              variant={"outlined"}
              size={"small"}
              onClick={clickTestDate}
            /> */}
            <TextField
              fullWidth
              value={TestDate}
              type="date"
              label={"Exam Date"}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split('T')[0] }}
              variant={"outlined"}
              size={"small"}
              onChange={(e) => { setTestDate(e.target.value) }}
            />

          </Box>
          <Box>
            <Tooltip title={`Assign marks to each student in the class for the selected subject and click on &quot;Save&quot;. Once marks are submitted to class-teacher you can modify it from exam results.`}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  height: '36px !important',
                  ':hover': { backgroundColor: grey[600] }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={`Save`}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: green[500],
                  height: '36px !important',
                  ':hover': { backgroundColor: green[600] }
                }}
              >
                <Save />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>

      <Box sx={{ p: 2, background: 'white', mt: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant={"h4"}>
            {/* Total Marks: 20 */}
            <TextField fullWidth value={TestMarkDetails.length > 0 ?
              (TestMarkDetails[0].Subject_Total_Marks) : ''} />
          </Typography>
          <div>|</div>
          <Typography variant={"h4"}>
            {/* Passing Marks: 20 */}
            <TextField fullWidth value={TestMarkDetails.length > 0 ?
              (TestMarkDetails[0].Passing_Total_Marks) : ''} />
          </Typography>
        </Box>
        {/* Table */}
        <TableContainer component={Box} sx={{ mt: 2 }}>
          <Table sx={{ border: (theme) => `1px solid ${theme.palette.divider}` }}>
            <TableHead>
              <TableRow sx={{ background: (theme) => theme.palette.primary.main }}>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  Roll No.
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  Student Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold" }}>
                  Exam Status
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: "bold", py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Project / 20 <TextField sx={{ width: '50px', background: 'white' }} size={"small"} />
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Total / 20
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1.</TableCell>
                <TableCell>Miss Gauri Vishal Bhadale</TableCell>
                <TableCell>
                  <Dropdown
                    variant='outlined'
                    Array={[{
                      Value: "absent",
                      Name: "Absent"
                    }, {
                      Value: "exempted",
                      Name: "Exempted"
                    }]}
                  />
                </TableCell>
                <TableCell>
                  <TextField sx={{ width: '50px' }} size={"small"} />
                </TableCell>
                <TableCell>
                  <TextField sx={{ width: '50px' }} size={"small"} disabled />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Button onClick={onClickSave} variant="contained">
        Save
      </Button>
      <br>
      </br>
      <br></br>
      <Button color={'error'} onClick={onClickBack} variant="contained">
        Back
      </Button>

    </Container>
  );
};

export default SubjectExamMarks;


