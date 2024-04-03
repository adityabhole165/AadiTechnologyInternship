import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Container, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  IGetAllGradesForSubjectMarkListBody,
  IGetClassExamSubjectNameDetailesBody,
  IManageStudentsTestMarkBody
} from 'src/interfaces/SubjectExamMarks/ISubjectExamMarks';
import { getAllGradesForSubjectMarkList, getClassExamSubjectNameDetailes, getManageStudentsTestMark, getSubjectExamMarkslist } from 'src/requests/SubjectExamMarks/RequestSubjectExamMarks';
import { RootState, useSelector } from 'src/store';
import { getCalendarDateFormatDate } from '../Common/Util';

import CommonPageHeader from '../CommonPageHeader';
import SubjectExamMarkTable from './SubjectExamMarkTable';
const SubjectExamMarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { StandardDivisionId, SubjectId, ClassWiseExam } = useParams();
  const StandardDivisionId = 1241, SubjectId = 2346, ClassWiseExam = 592

  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const userId = sessionStorage.getItem('Id');
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
  const [HasRemark, setHasRemark] = useState(false);
  const [ShowTotalAsPerOutOfMarks, setShowTotalAsPerOutOfMarks] = useState('');
  const [selectStandard, setSelectStandard] = useState('');
  const [selectDivision, setSelectDivision] = useState('');
  const [RollNo, setRollNo] = useState('');
  const [Name, setName] = useState('');
  const [HeaderDetails, setHeaderDetails] = useState([]);



  const StudentsForMarksAssignment: any = useSelector(
    (state: RootState) => state.SubjectExamMark.StudentsForMarksAssignments
  );
  const [MarksAssignment, setMarksAssignment] = useState([])
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
  const ExamMarkHeader: any = useSelector(
    (state: RootState) => state.SubjectExamMark.ExamMarkHeader
  );
  const ExamStatus: any = useSelector(
    (state: RootState) => state.SubjectExamMark.ListDisplayNameDetail
  );

  const ManageStudentsTestMarks: any = useSelector(
    (state: RootState) => state.SubjectExamMark.ManageStudentsTestMark
  );
  const GradesForSubjectMarkList: any = useSelector(
    (state: RootState) => state.SubjectExamMark.GradesForSubjectMarkList
  );
  const clickTestDate = (value) => {
    setTestDate(value)
  }
  // useEffect(() => {
  //   if (ExamStatus.length > 0)
  //     setMarksAssignment(ExamStatus[0].Id);
  // }, [ExamStatus]);

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
    setMarksAssignment(StudentsForMarksAssignment)
  }, [StudentsForMarksAssignment])
  useEffect(() => {
    setHeaderDetails(ExamMarkHeader)
  }, [ExamMarkHeader])

  useEffect(() => {

    if (TestMarkDetails?.length > 0) {

      setTestDate(getCalendarDateFormatDate(TestMarkDetails[0].Test_Date))
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
    const GetSubjectExamMarkslists =
    {
      "asSchoolId": 18,
      "asStandardDivision_Id": 1241,
      "asSubjectId": 2346,
      "asTestId": 592,
      "asAcademicYrId": 54,
      "asShowTotalAsPerOutOfMarks": "Y",
      "asTestDate": "12/2/2023 12:00:00 AM"
    }
    // {
    //   asSchoolId: Number(asSchoolId),
    //   asStandardDivision_Id: 1241,
    //   asSubjectId: 2346,
    //   asTestId: 592,
    //   // asStandardDivision_Id: Number(StandardDivisionId),
    //   // asSubjectId: Number(SubjectId),
    //   // asTestId: Number(ClassWiseExam),
    //   asAcademicYrId: 54,// Number(asAcademicYearId),
    //   asShowTotalAsPerOutOfMarks: "Y"
    // };

    dispatch(getSubjectExamMarkslist(GetSubjectExamMarkslists));
  }, []);
  // useEffect(() => {
  //   const GetAllStudentsForMarksAssignmentsBody: IGetAllStudentsForMarksAssignmentsBody = {
  //     asAcademicYearID: Number(asAcademicYearId),
  //     asSchoolId: Number(asSchoolId),
  //     asSubject_Id: Number(SubjectId),
  //     asStandardDivision_Id: Number(StandardDivisionId),
  //     asTestDate: TestDate
  //   };

  //   dispatch(getSubjectExamMarkslist(GetAllStudentsForMarksAssignmentsBody));
  // }, []);

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
  const getStudentTestType = () => {
    let returnVal = "<SchoolWiseStudentTestMarks>"
    MarksAssignment.map((Item, i) => {
      returnVal = returnVal + "<SchoolWiseStudentTestMark " +
        "School_Id=\"" + asSchoolId +
        "\" Academic_Year_Id=\"" + asAcademicYearId +
        "\" Student_Id=\"" + Item.Id +
        "\" Subject_Id=\"" + SubjectId +
        "\" TestWise_Subject_Marks_Id=\"" + 37699 +
        "\" Test_Date=\"" + TestDate +
        "\" IsSavedForSingleStudent=\"False\" Total_Marks_Scored=\"" + parseInt(Item.TotalMarks) +
        "\" IsAbsent=\"Y\" IsOptional=\"N\" />"
    })
    return returnVal + "</SchoolWiseStudentTestMarks>"
  }
  const getStudentTestTypeDetails = () => {
    let returnVal = "<SchoolWiseStudentTestMarksDetails>"
    MarksAssignment.map((Obj, i) => {
      Obj.MarksForStudent.map((Item) => {
        returnVal = returnVal + "<SchoolWiseStudentTestMarksDetail " +
          "School_Id=\"" + asSchoolId +
          "\" Academic_Year_Id=" + asAcademicYearId +
          " Student_Id=\"" + Item.Id +
          "\" Subject_Id=\"" + SubjectId +
          "\" Is_Absent=\"Y\" " +
          "TestType_Id=\"" + Item.Id +
          "\" Marks_Scored=\"" + parseInt(Item.Text1) +
          "\" Assigned_Grade_Id=\"\" />"
      })
    })
    return returnVal + "</SchoolWiseStudentTestMarksDetails>"
  }
  const onClickSave = () => {
    if (!MarksError) {
      const ManageStudentsTestMarkBody: IManageStudentsTestMarkBody = {
        asTestWise_Subject_Marks_Id: Number(SubjectMarksId),
        asInserted_By_id: Number(userId),
        Student_Test_Type_Marks: getStudentTestType(),
        Student_Test_Type_Marks_Details: getStudentTestTypeDetails(),
        asRemoveProgress: RemoveProgress,
        RemarkXml: RemarkXml,
        asHasRemark: HasRemark,
        asTestId: Number(ClassWiseExam),
        asSubjectId: Number(SubjectId),
        asSchoolId: Number(asSchoolId),
        asAcademicYearId: Number(asAcademicYearId)
      };
      dispatch(getManageStudentsTestMark(ManageStudentsTestMarkBody))
    }
  };

  useEffect(() => {

    if (ManageStudentsTestMarks !== '') {
      // toast.success(ManageStudentsTestMarks)
      // dispatch(resetManageStudentsTestMark())
      navigate("/extended-sidebar/Teacher/AssignExamMark")
    }
  }, [ManageStudentsTestMarks])
  const ExamMarks = [
    { Marks: 10, Grade: "A" },
    { Marks: 8, Grade: "B" }
  ]
  const [MarksError, setMarksError] = useState('')

  const onChangeExamStatus = (value) => {
    setMarksAssignment(value)
    setMarksError('')
    value.map((Obj, i) => {
      Obj.MarksForStudent.map((Item, Index) => {
        if (Number(Item.Text1) > Number(Item.Text2))
          setMarksError('Highlighted Marks should be less than total marks')
      })
    })

  }
  const onClickExamHeader = (value) => {
    setHeaderDetails(value);
  };
  return (
    <Container maxWidth={"xl"}>
      <CommonPageHeader
        navLinks={[
          { title: 'Assign Exam Mark', path: '/extended-sidebar/Teacher/AssignExamMark' },
          { title: 'Subject Exam Marks', path: '' }
        ]}
        rightActions={
          <>
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
            <div style={{ textAlign: 'right', color: 'red', paddingRight: '20px' }}>
              *
            </div>
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
                    backgroundColor: MarksError != '' ? grey[500] : green[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: MarksError != '' ? grey[500] : green[600], }
                  }}
                  onClick={onClickSave}
                >
                  <Save />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        }
      />
      <Box sx={{ p: 2, background: 'white' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant={"h4"}>
            {/* Total Marks: 20 */}
            <TextField fullWidth value={TestMarkDetails?.length > 0 ?
              (TestMarkDetails[0].Subject_Total_Marks) : ''} />
          </Typography>
          <div>|</div>
          <Typography variant={"h4"}>
            {/* Passing Marks: 20 */}
            <TextField fullWidth value={TestMarkDetails?.length > 0 ?
              (TestMarkDetails[0].Passing_Total_Marks) : ''} />
          </Typography>
          <Typography sx={{ color: 'red' }}>{MarksError}</Typography>

        </Box>
        {/* Table */}
        {(MarksAssignment.length > 0 && HeaderDetails != null) &&
          <SubjectExamMarkTable ExamStatus={ExamStatus}
            StudentsForMarksAssignment={MarksAssignment}
            onChangeExamStatus={onChangeExamStatus}
            ExamMarksHeader={HeaderDetails}
            onChangeExamHeader={onClickExamHeader}
            GradesForSubjectMarkList={GradesForSubjectMarkList} />
        }
      </Box>

    </Container>
  );
};

export default SubjectExamMarks;


