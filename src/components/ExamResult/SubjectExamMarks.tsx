import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Button, Container, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
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
import { getAllGradesForSubjectMarkList, getClassExamSubjectNameDetailes, getManageStudentsTestMark, getSubjectExamMarkslist, resetManageStudentsTestMark } from 'src/requests/SubjectExamMarks/RequestSubjectExamMarks';
import { RootState, useSelector } from 'src/store';
import { getCalendarDateFormatDate } from '../Common/Util';

import SubjectExamMarkTable from './SubjectExamMarkTable';
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
  // const [HeaderList, setHeaderList] = useState([]);
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
  const HeaderList: any = useSelector(
    (state: RootState) => state.SubjectExamMark.ListTestDetailss
  );
  console.log("HeaderList", HeaderList)
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
      asStandardDivision_Id: 1241,
      asSubjectId: 2346,
      asTestId: 592,
      // asStandardDivision_Id: Number(StandardDivisionId),
      // asSubjectId: Number(SubjectId),
      // asTestId: Number(ClassWiseExam),
      asAcademicYrId: 54,// Number(asAcademicYearId),
      asShowTotalAsPerOutOfMarks: "Y"
    };

    dispatch(getSubjectExamMarkslist(GetSubjectExamMarkslists));
  }, []);
  useEffect(() => {
    const GetAllStudentsForMarksAssignmentsBody: IGetAllStudentsForMarksAssignmentsBody = {
      asAcademicYearID: Number(asAcademicYearId),
      asSchoolId: Number(asSchoolId),
      asSubject_Id: Number(SubjectId),
      asStandardDivision_Id: Number(StandardDivisionId),
      asTestDate: TestDate
    };

    dispatch(getSubjectExamMarkslist(GetAllStudentsForMarksAssignmentsBody));
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
  const ExamMarks = [
    { Marks: 10, Grade: "A" },
    { Marks: 8, Grade: "B" }
  ]
  // const ExamMarksHeader = [
  //   { Subject: "Theory/20", Total: "15" },
  //   { Subject: "Library/10", Total: "8" }
  // ]
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
            <TextField
              fullWidth
              value={SubjectName || ''}
            />
          </Box>

          <Box>

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
        <SubjectExamMarkTable ExamMarks={ExamMarks} ExamMarksHeader={HeaderList}></SubjectExamMarkTable>
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


