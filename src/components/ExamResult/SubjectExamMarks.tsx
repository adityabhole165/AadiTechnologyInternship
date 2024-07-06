import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, IconButton, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import 'react-datetime/css/react-datetime.css';

import {
  IGetAllGradesForSubjectMarkListBody,
  IGetClassExamSubjectNameDetailesBody,
  IGetExamScheduleBody,
  IGetSubjectExamMarkslistsBody,
  IManageStudentsTestMarkBody
} from 'src/interfaces/SubjectExamMarks/ISubjectExamMarks';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import {
  getAllGradesForSubjectMarkList, getClassExamSubjectNameDetailes,
  getExamSchedule,
  getManageStudentsTestMark,
  getSubjectExamMarkslist,
  resetManageStudentsTestMark
} from 'src/requests/SubjectExamMarks/RequestSubjectExamMarks';
import { RootState, useSelector } from 'src/store';
import { formatDateAsDDMMMYYYY, getCalendarDateFormatDate, getCalendarDateFormatDateNew, getDateMonthYearFormatted, getYearFirstDateFormatted, isGreaterDate, isGreaterThanDate, isOutsideAcademicYear } from '../Common/Util';

// import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import CommonPageHeader from '../CommonPageHeader';
import SubjectExamMarkTable from './SubjectExamMarkTable';
const SubjectExamMarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const today = moment();
  // const disableFutureDt = current => {
  //   return current.isBefore(today)
  // }
  let { ClassTecher, ClassId, TeacherId,
    StandardId, IsMonthConfig, IsReadOnly, StandardDivisionId, SubjectId, TestId, examResultProp, publish } = useParams();

  // const [examResultProp, setexamResultProp] = useState(false);

  // const StandardDivisionId = 1241, SubjectId = 2346, TestId = 592
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const userId = sessionStorage.getItem('Id');
  const [TestDate, setTestDate] = useState(format(new Date(), 'yyyy-MM-dd'));
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
  const [RemoveProgress, setRemoveProgress] = useState('N');
  const [RemarkXml, setRemarkXml] = useState('');
  const [HasRemark, setHasRemark] = useState(false);
  const [ShowTotalAsPerOutOfMarks, setShowTotalAsPerOutOfMarks] = useState('');
  const [selectStandard, setSelectStandard] = useState('');
  const [selectDivision, setSelectDivision] = useState('');
  const [RollNo, setRollNo] = useState('');
  const [Name, setName] = useState('');
  const [HeaderDetails, setHeaderDetails] = useState([]);
  const [GradeHeaderDetails, setGradeHeaderDetails] = useState([]);
  const [GradeRowDetails, setGradeRowDetails] = useState([]);


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
  const ExamSchedules: any = useSelector(
    (state: RootState) => state.SubjectExamMark.ExamSchedule
  );

  const [ExamGrade, setExamGrade] = useState([])
  const clickTestDate = (value) => {
    setTestDate(
      format(value, 'yyyy-MM-dd')
    )
  }
  useEffect(() => {
    if (StandardName != undefined || StandardName) {
      StandardId = StandardName.Standard_Id
    }
  }, [StandardName])
  //for testdate
  useEffect(() => {
    const GetSubjectExamMarkslists: IGetSubjectExamMarkslistsBody =
    {
      asSchoolId: Number(asSchoolId),
      asStandardDivision_Id: Number(StandardDivisionId),
      asSubjectId: Number(SubjectId),
      asTestId: Number(TestId),
      asAcademicYrId: Number(asAcademicYearId),
      asShowTotalAsPerOutOfMarks: "Y",
      asTestDate: TestDate
    }


    dispatch(getSubjectExamMarkslist(GetSubjectExamMarkslists));

  }, []);
  //for Passing Total marks
  useEffect(() => {

    const ClassExamSubjectNameDetailes: IGetClassExamSubjectNameDetailesBody = {
      asStandardDivision_Id: Number(StandardDivisionId),
      asSubject_Id: Number(SubjectId),
      asTestId: Number(TestId),
      asSchoolId: Number(asSchoolId),
      asAcademicYrId: Number(asAcademicYearId)
    };
    dispatch(getClassExamSubjectNameDetailes(ClassExamSubjectNameDetailes));

  }, []);
  //for RollNo,student name
  //for Grade
  useEffect(() => {
    const GetAllGradesForSubjectMarkListBody: IGetAllGradesForSubjectMarkListBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYrId: Number(asAcademicYearId),
      asStandardId: Number(StandardId),
      asSubjectId: Number(SubjectId),
      asTestId: Number(TestId),
    };

    dispatch(getAllGradesForSubjectMarkList(GetAllGradesForSubjectMarkListBody));
  }, []);
  useEffect(() => {
    setMarksAssignment(StudentsForMarksAssignment)
  }, [StudentsForMarksAssignment])
  useEffect(() => {
    let IsLateJoinee = false
    setMarksAssignment(StudentsForMarksAssignment.map((Item) => {
      IsLateJoinee = isGreaterThanDate(getDateMonthYearFormatted(Item.JoiningDate), getYearFirstDateFormatted(TestDate))
      return {
        ...Item,
        MarksForStudent: Item.MarksForStudent.map((Obj) => {
          return {
            ...Obj,
            ExamStatus: (Item.IsAbsent == "N" && IsLateJoinee) ? "J" : Obj.ExamStatus,
            IsLateJoinee: IsLateJoinee,
          }
        })
      }
    }))
  }, [TestDate])
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
    else {
      if (ExamSchedules.length > 0)
        setTestDate(getCalendarDateFormatDate(ExamSchedules[0].SubjectExamStartDate))
      else
        setTestDate(getCalendarDateFormatDateNew(new Date()))

    }
  }, [TestMarkDetails])

  useEffect(() => {

    if (StudentsForMarksAssignment !== null) {
      setRollNo(StudentsForMarksAssignment.Roll_No)
      setName(StudentsForMarksAssignment.Name)
    }
  }, [StudentsForMarksAssignment])

  useEffect(() => {
    const GetExamSchedule: IGetExamScheduleBody =
    {

      asSchoolId: Number(asSchoolId),
      asStandardId: Number(StandardId),
      asTestId: Number(TestId),
      asSubjectId: Number(SubjectId),
    }
    dispatch(getExamSchedule(GetExamSchedule));

  }, []);

  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/AssignExamMark');
  };
  const getIsMarkAssigned = (StudentId) => {
    let bIsReturn = false
    MarksAssignment.map((Obj, i) => {
      if (Obj.Id == StudentId) {
        Obj.MarksForStudent.map((Item) => {
          if (Item.Text1 != "" || Item.ExamStatus != "N") {
            bIsReturn = true
          }
        })
      }
    })
    return bIsReturn
  }
  const getStudentTestType = () => {
    let returnVal = "<SchoolWiseStudentTestMarks>"
    MarksAssignment.map((Item, i) => {
      if (getIsMarkAssigned(Item.Id)) {
        returnVal = returnVal + "<SchoolWiseStudentTestMark " +
          "School_Id=\"" + asSchoolId +
          "\" Academic_Year_Id=\"" + asAcademicYearId +
          "\" Student_Id=\"" + Item.Id +
          "\" Subject_Id=\"" + SubjectId +
          "\" TestWise_Subject_Marks_Id=\"" + TestName.TestWise_Subject_Marks_Id +
          "\" Test_Date=\"" + TestDate +
          "\" IsSavedForSingleStudent=\"False\" Total_Marks_Scored=\"" + parseInt(Item.TotalMarks) +
          "\" IsAbsent=\"" + Item.ExamStatus + "\" IsOptional=\"N\" />"

      }
    })

    return returnVal + "</SchoolWiseStudentTestMarks>"

  }
  const getAllAbsent = () => {
    let returnVal = "Y"
    MarksAssignment.map((Obj, i) => {
      Obj.MarksForStudent.map((Item) => {
        if (Item.ExamStatus) {
          returnVal = "N"
        }
      })
    })
    return returnVal
  }
  const getStudentTestTypeDetails = () => {
    let returnVal = "<SchoolWiseStudentTestMarksDetails>"
    MarksAssignment.map((Obj, i) => {
      Obj.MarksForStudent.map((Item) => {
        if (Item.Text1 != "" || Item.ExamStatus != "N") {
          returnVal = returnVal + "<SchoolWiseStudentTestMarksDetail " +
            "School_Id=\"" + asSchoolId +
            "\" Academic_Year_Id=\"" + asAcademicYearId +
            "\" Student_Id=\"" + Item.Student_Id +
            "\" Subject_Id=\"" + SubjectId +
            "\" Is_Absent=\"" + Item.ExamStatus + "\" " +
            // "\" Is_Absent=\"" + Item.ExamStatus + "\" " +
            "TestType_Id=\"" + Item.Id +
            "\" Marks_Scored=\"" + parseInt(Item.Text1 == "" ? "0" : Item.Text1) +
            "\" Assigned_Grade_Id=\"\" />"
        }
      })
    })
    return returnVal + "</SchoolWiseStudentTestMarksDetails>"
  }
  // const onClickSave = () => {
  //   if (TestDate !== "" && isOutsideAcademicYear(TestDate)) {
  //     setMarksError('Exam date should be within the current academic year (i.e. between ' +
  //       formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' to ' + formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ')');
  //   } else {
  //     setMarksError('')
  //     if (!MarksError)  {
  //       const ManageStudentsTestMarkBody: IManageStudentsTestMarkBody = {
  //         asTestWise_Subject_Marks_Id: Number(TestName.TestWise_Subject_Marks_Id),
  //         asInserted_By_id: Number(userId),
  //         asStudent_Test_Type_MarksXml: getStudentTestType(),
  //         asStudent_Test_Type_Marks_DetailsXml: getStudentTestTypeDetails(),
  //         asRemoveProgress: RemoveProgress,
  //         RemarkXml: RemarkXml,
  //         asHasRemark: HasRemark,
  //         asTestId: Number(TestId),
  //         asSubjectId: Number(SubjectId),
  //         asSchoolId: Number(asSchoolId),
  //         asAcademicYearId: Number(asAcademicYearId)
  //       };

  //       dispatch(getManageStudentsTestMark(ManageStudentsTestMarkBody))
  //     }
  //   }
  // };
  const onClickSave = () => {
    if (TestDate !== "" && isOutsideAcademicYear(TestDate)) {
      setMarksError('Exam date should be within the current academic year (i.e. between ' +
        formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' to ' + formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ')');
    } else {
      setMarksError('');
      if (!MarksError) {
        let isValid = true;
        MarksAssignment.forEach((Item) => {
          Item.MarksForStudent.forEach((studentItem) => {
            if (Number(studentItem.Text1) > Number(studentItem.Text2)) {
              isValid = false;
              setMarksError(`Marks Scored should be less than ${studentItem.Text2}`);
            }
          });
        });

        if (isValid) {
          const ManageStudentsTestMarkBody: IManageStudentsTestMarkBody = {
            asTestWise_Subject_Marks_Id: Number(TestName.TestWise_Subject_Marks_Id),
            asInserted_By_id: Number(userId),
            asStudent_Test_Type_MarksXml: getStudentTestType(),
            asStudent_Test_Type_Marks_DetailsXml: getStudentTestTypeDetails(),
            asRemoveProgress: RemoveProgress,
            RemarkXml: RemarkXml,
            asHasRemark: HasRemark,
            asTestId: Number(TestId),
            asSubjectId: Number(SubjectId),
            asSchoolId: Number(asSchoolId),
            asAcademicYearId: Number(asAcademicYearId)
          };
          dispatch(getManageStudentsTestMark(ManageStudentsTestMarkBody));
        }
      }
    }
  };
  useEffect(() => {

    if (ManageStudentsTestMarks !== '') {
      toast.success(ManageStudentsTestMarks)
      dispatch(resetManageStudentsTestMark())
      if (examResultProp === "true") {
        navigate("/extended-sidebar/Teacher/ExamResultBase/" + StandardDivisionId + "/" + TestId);
      } else {
        navigate("/extended-sidebar/Teacher/AssignExamMark/" + ClassTecher + "/" + ClassId + "/" + TestId);
      }
    }
    //   navigate("/extended-sidebar/Teacher/AssignExamMark/" +
    //     ClassTecher + "/" + TestId + "/" + ClassId
    //   )
    // }
  }, [ManageStudentsTestMarks])
  const ExamMarks = [
    { Marks: 10, Grade: "A" },
    { Marks: 8, Grade: "B" }
  ]
  const [MarksError, setMarksError] = useState('')


  // useEffect(() => {
  //   if (TestDate != "") {
  //     if (isOutsideAcademicYear(TestDate)) {
  //       setMarksError('Exam date should be within current academic year (i.e. between ' +
  //         formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' to ' + formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ')')
  //     }
  //     else {
  //       setMarksError('')
  //     }
  //   }
  // }, [TestDate])


  useEffect(() => {


    if (TestDate !== "" && ExamSchedules.length > 0) {
      if (IsReadOnly !== 'true') {
        if (isOutsideAcademicYear(TestDate)) {
          setMarksError('Please fix following error(s): ' +
            'Exam date should be within the current academic year (i.e., between ' +
            formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + ' to ' + formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ')');
        } else {

          const startDate = new Date(getDateMonthYearFormatted(ExamSchedules[0].Exam_Start_Date));
          const endDate = new Date(getDateMonthYearFormatted(ExamSchedules[0].Exam_End_Date));
          const selectedDate = new Date(TestDate);
          if (isGreaterDate(startDate, selectedDate) || isGreaterDate(selectedDate, endDate)) {

            setMarksError('Exam date for this standard should be between ' + getDateMonthYearFormatted(ExamSchedules[0].Exam_Start_Date) +
              ' and ' + getDateMonthYearFormatted(ExamSchedules[0].Exam_End_Date));
          } else {
            setMarksError('');
          }
        }
      }
    }
  },
    [TestDate, ExamSchedules]);
  useEffect(() => {
    const currentDate = new Date();
    if (TestDate && new Date(TestDate) > currentDate) {
      setIsSaveDisabled(true);
    } else {
      setIsSaveDisabled(false);
    }
  }, [TestDate]);


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
  const onClickExamGrade = (value) => {
    setMarksAssignment(value)
  };
  const onClickExamGradeHeader = (value) => {
    setGradeRowDetails(value);
  };
  const ExamResultLink = {
    title: 'Exam Results',
    path: '/extended-sidebar/Teacher/ExamResultBase/' + StandardDivisionId + "/" + TestId
    //path: '/extended-sidebar/Teacher/ExamResultBase'
  };

  const AssignExamMarkLink = {
    title: 'Assign Exam Mark',
    path: '/extended-sidebar/Teacher/AssignExamMark/' + ClassTecher + "/" + ClassId + "/" + TestId
  };
  return (
    <Box sx={{ px: 2 }}>
      {/* <CommonPageHeader
        navLinks={
          IsReadOnly
            ? [AssignExamMarkLink, { title: 'Subject Exam Marks', path: '' }]
            
            : examResultProp === "true"
              ? [ExamResultLink, { title: 'Subject Exam Marks', path: '' }]
              : [AssignExamMarkLink, { title: 'Subject Exam Marks', path: '' }]
        }
 */}
      <CommonPageHeader
        navLinks={
          IsReadOnly === 'true'
            ? (examResultProp === "true"
              ? [ExamResultLink, { title: 'Subject Exam Marks', path: '' }]
              : [AssignExamMarkLink, { title: 'Subject Exam Marks', path: '' }])

            : (examResultProp === "true"
              ? [ExamResultLink, { title: 'Subject Exam Marks', path: '' }]
              : [AssignExamMarkLink, { title: 'Subject Exam Marks', path: '' }])
        }

        rightActions={
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

              <Box sx={{ width: '10%' }}>
                <TextField
                  size={"small"}
                  fullWidth
                  label={"Class"}
                  value={
                    (StandardName && Object.keys(StandardName).length > 0) ?
                      (StandardName.Standard_Name + ' - ' + StandardName.Division_Name)
                      :
                      ''
                  }
                  sx={{ bgcolor: '#D3D3D3', maxWidth: '20vw' }}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled={IsReadOnly === 'true'}
                />
              </Box>

              <Box sx={{ ml: 1, width: '29%' }}>
                <TextField
                  size={"small"}
                  fullWidth
                  label={"Exam"}
                  value={
                    (TestName && Object.keys(TestName).length > 0) ?
                      TestName.SchoolWise_Test_Name
                      :
                      ''
                  }
                  sx={{ bgcolor: '#D3D3D3', maxWidth: '20vw' }}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled={IsReadOnly === 'true'}
                />
              </Box>

              <Box sx={{ ml: 1 }}>
                <TextField
                  size={"small"}
                  fullWidth
                  label={"Subject Name"}
                  value={SubjectName || ''}
                  sx={{ bgcolor: '#D3D3D3', maxWidth: '20vw' }}
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled={IsReadOnly === 'true'}
                />

              </Box>
              {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>*/}
              <Box sx={{ ml: 1, width: '18%', display: 'flex', alignItems: 'center' }}>
                {/* <Box sx={{ ml: 1 }}> */}
                {(ExamSchedules.length > 0 && ExamSchedules.Schoolwise_Standard_Exam_Schedule_Id != "0") ?
                  <Datepicker
                    DateValue={new Date(TestDate)}
                    onDateChange={clickTestDate}
                    label={"Exam Date"}
                    size={"small"}
                  />
                  :
                  <>
                    <Datepicker
                      DateValue={new Date(TestDate)}
                      onDateChange={clickTestDate}
                      label={"Exam Date"}
                      size={"small"}
                    />
                    <div style={{ color: 'red', marginLeft: '5px' }}>
                      *
                    </div>
                  </>
                }
              </Box>
              {/* </Box> */}


              <Box sx={{ ml: 1 }}>
                <Tooltip title={`Assign marks to each student in the class for the selected subject and click on "Save". Once marks are submitted to class-teacher you can modify it from exam results.`}>
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
              <Box sx={{ ml: 1 }}>

                {(IsReadOnly === 'true' || examResultProp === 'true' && publish === 'true') ? (
                  null // Don't render anything
                ) : (
                  <Tooltip title={`Save`}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: MarksError !== '' ? grey[500] : green[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: MarksError !== '' ? grey[500] : green[600] }
                      }}
                      onClick={onClickSave}
                      disabled={isSaveDisabled}
                    >
                      <Save />
                    </IconButton>
                  </Tooltip>
                )}



                {/* {IsReadOnly === 'true' ? (
                  null // If IsReadOnly is true, don't render anything
                ) : (
                  <Tooltip title={`Save`}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: MarksError !== '' ? grey[500] : green[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: MarksError !== '' ? grey[500] : green[600] }
                      }}
                      onClick={onClickSave}
                      disabled={isSaveDisabled}
                    >
                      <Save />
                    </IconButton>
                  </Tooltip>
                )} */}
              </Box>
            </Box>
            {/* <Box>
              <Tooltip title={`Save`}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: MarksError != '' ? grey[500] : green[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: MarksError != '' ? grey[500] : green[600], }
                  }}
                  onClick={onClickSave}
                  disabled={isSaveDisabled}

                >
                  <Save />
                </IconButton>
              </Tooltip>
            </Box> */}

          </>
        }
      />
      < Box sx={{ p: 2, background: 'white' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

          <Typography variant={"h4"}>
            {/* Total Marks: 20 */}
            {TestName && TestName.Grade_Or_Marks == "M" &&
              <TextField
                size={"small"}
                fullWidth
                label={"Total Marks"}
                value={
                  (TestName && Object.keys(TestName).length > 0) ?
                    TestName.Subject_Total_Marks
                    :
                    ''
                }
                sx={{ bgcolor: '#D3D3D3' }}
                InputProps={{
                  readOnly: true,
                }}
                disabled={IsReadOnly === 'true'}
              />
              // <TextField
              // size={"small"} fullWidth value={TestMarkDetails?.length > 0 ?
              //  (TestMarkDetails[0].Subject_Total_Marks) : ''}
              //   disabled={IsReadOnly === 'true'} />
            }
          </Typography>
          {/* {TestName && TestName.Grade_Or_Marks == "M" &&
            <div>|</div>
          } */}
          <Typography variant={"h4"}>
            {/* Passing Marks: 20 */}
            {TestName && TestName.Grade_Or_Marks == "M" &&
              // <TextField
              // size={"small"} fullWidth value={TestMarkDetails?.length > 0 ?
              //   (TestMarkDetails[0].Passing_Total_Marks) : ''}
              //   disabled={IsReadOnly === 'true'}

              // />
              <TextField
                fullWidth
                label={"Passing Marks"}
                size={"small"}
                value={
                  (TestName && Object.keys(TestName).length > 0) ?
                    parseInt(TestName.Passing_Total_Marks)
                    :
                    ''
                }
                sx={{ bgcolor: '#D3D3D3' }}
                InputProps={{
                  readOnly: true,
                }}
                disabled={IsReadOnly === 'true'}
              />
            }
            {TestName && TestName.Grade_Or_Marks == "G" &&
              <TextField
                size={"small"}
                fullWidth
                label={"Passing Grade"}
                value={
                  (TestName && Object.keys(TestName).length > 0) ?
                    TestName.Grade_Name
                    :
                    ''
                }
                sx={{ bgcolor: '#f0e68c' }}
                InputProps={{
                  readOnly: true,
                }}
                disabled={IsReadOnly === 'true'}
              />
            }

          </Typography>
          <Typography sx={{ color: 'red' }}>{MarksError}</Typography>

        </Box>
        <br>
        </br>
        {
          IsReadOnly === 'true' && (
            // <Typography variant="body2" color="textSecondary" style={{ backgroundColor: '#d3d3d3', color: '#000000' }}>
            //   <span style={{ fontWeight: 'bold' }}> Student marks are already submitted.</span>
            // </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>Student marks are already submitted.</b>
            </Typography>
          )
        }
        {
          examResultProp === 'true' && publish === 'true' && (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>Results for this exam have been published. You need to unpublish the exam to update the marks.</b>
            </Typography>
          )
        }
        {
          TestName?.AllowDecimal == "True" && (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>Note:	Marks assignment can be done in decimal numbers.</b>
            </Typography>)
        }
        {/* Table */}
        {
          (MarksAssignment.length > 0 && HeaderDetails != null) &&
          <SubjectExamMarkTable
            ExamMarksHeader={HeaderDetails}
            onChangeExamHeader={onClickExamHeader}
            ExamStatus={ExamStatus}
            StudentsForMarksAssignment={MarksAssignment}
            onChangeExamStatus={onChangeExamStatus}
            GradesForSubjectMarkList={GradesForSubjectMarkList}
            onChangeExamGrade={onClickExamGrade}
            IsReadOnly={IsReadOnly}
            examResultProp={examResultProp}
            publish={publish}
            IsMark={TestName?.Grade_Or_Marks == "M"}
            AllowDecimal={TestName?.AllowDecimal == "True"}
          />
        }
      </Box >

    </Box >
  );
};

export default SubjectExamMarks;


