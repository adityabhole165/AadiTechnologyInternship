import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import QuestionMark from '@mui/icons-material/QuestionMark';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import {
  Box,
  IconButton,
  Tooltip, Typography
} from '@mui/material';
// import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { green, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  IDeleteAllStudentTestMarksBody,
  IGetAllPrimaryClassTeachersBody,
  IGetAssessmentDropdownBody,
  IGetPagedStudentsForMarkAssignmentBody,
  IGetPublishStatusBody,
  IoneDeleteStudentTestMarksBody
} from 'src/interfaces/StudentWiseProgressReport/IStudentWiseProgressReport';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import DotLegends from 'src/libraries/ResuableComponents/DotLegends';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import StudentwiseProgressreportList from 'src/libraries/ResuableComponents/StudentwiseProgressreportList';
import { ButtonPrimary } from 'src/libraries/styled/ButtonStyle';
import {
  CDAAssessmentDropdown,
  DeleteAllStudentTest,
  GetPrimaryTeacher,
  PageStudentsAssignment,
  PublishStatus, PublishUnpublishXseed,
  PublishresetMessageNewAll,
  deleteresetMessage,
  deleteresetMessageAll,
  oneDeleteStudentTest
} from 'src/requests/StudentWiseProgressReport/ReqStudentWiseProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
// import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
const Studentwiseprogressreport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asUpdatedById = Number(sessionStorage.getItem('Id'));

  const asUserId = Number(localStorage.getItem('UserId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const aTeacherId = Number(sessionStorage.getItem('TeacherId'));
  // const asStandardDivisionId = sessionStorage.getItem('StandardDivisionId');
  const asExamId = Number(sessionStorage.getItem('ExamID'));
  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const TeacherId = sessionStorage.getItem('TeacherId');
  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'Student wise Progress Report ') perm = item.IsFullAccess;
    });
    return perm;
  };
  const { ClassTecherid, ClassId, TestId } =
    useParams();
  let CanEdit = getSchoolConfigurations(74)

  const [SelectTeacher, setSelectTeacher] = useState(TeacherId);

  console.log(SelectTeacher, "SelectTeacher---");
  const [selectClass, SetSelectClass] = useState(ClassId == undefined ? "" : ClassId);
  const [ClassWiseExam, SetClassWiseExam] = useState(TestId == undefined ? "" : TestId);
  const [ClassTecher, SetClassTecher] = useState(ClassTecherid == undefined ? TeacherId : ClassTecherid);
  const [Assessment, setAssessment] = useState();
  const [std, setstd] = useState();
  const [StudentAssig, setStudentAssig] = useState();
  const [StudentGrad, setStudentGrad] = useState();
  const [oneDelete, setoneDelete] = useState();
  const [DeleteAll, setDeleteAll] = useState();
  const [ublishS, setublishS] = useState();
  const [PublishUn, setPublishUn] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const [page, setPage] = useState(1);
  const { showAlert, closeAlert } = useContext(AlertContext);
  const [isVisible, setIsVisible] = useState(false);
  const GetClassTeacher = () => {
    let returnVal = false
    PrimaryTeacher.map((item) => {
      if (item.Value == selectClass) {
        returnVal = item.IsClassTeacher
      }
    })
    return returnVal
  };
  const StandardDivisionId = () => {
    let returnVal = 0
    PrimaryTeacher.map((item) => {
      if (item.Value == SelectTeacher) {
        returnVal = item.Id
      }
    })
    return returnVal
  };
  const [HeaderPublish, setHeaderPublish] = useState([
    { Id: 1, Header: 'Roll No', SortOrder: "Roll_No" },
    { Id: 2, Header: 'Student Name' },
    { Id: 3, Header: 'Edit' },
    { Id: 4, Header: 'Delete' }
  ]);

  const PrimaryTeacher = useSelector((state: RootState) => state.Studentwiseprogress.PrimaryClassTeacher);
  //console.log(PrimaryTeacher, "PrimaryTeacher");
  const USAssessmentDrop = useSelector((state: RootState) => state.Studentwiseprogress.ISAssessmentDropdown);
  const StudentAssignment = useSelector((state: RootState) => state.Studentwiseprogress.StudentsAssignment);
  const StudentGrade = useSelector((state: RootState) => state.Studentwiseprogress.StudentsAssignmentGrade);
  const oneDeleteStud = useSelector((state: RootState) => state.Studentwiseprogress.oneDeleteStudent);
  const DeleteAllStud = useSelector((state: RootState) => state.Studentwiseprogress.DeleteAllStudent);
  const PublishStatu: any = useSelector((state: RootState) => state.Studentwiseprogress.PublishStatus);
  const PublishUnpublish: any = useSelector((state: RootState) => state.Studentwiseprogress.PublishUnpublishXseed);
  const StudentRecordCount: any = useSelector((state: RootState) => state.Studentwiseprogress.ISAllStudentRecordCount);

  const [asMode, setAsMode] = useState(PublishStatu.AllowPublish === true ? 'Publish' : 'Unpublish');
  const Data = StudentAssignment.map(item => item.ShowDeleteButton)
  const Data1 = StudentAssignment.map(item => item.ShowProgressReport)

  const getPrimaryTeacher_body: IGetAllPrimaryClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmicYearId: Number(asAcademicYearId),
    asTeacher_id: GetScreenPermission() === 'Y' ? 0 : Number(SelectTeacher)
  };

  const GetAssessmentDropdown_Body: IGetAssessmentDropdownBody = {
    asAcademicYearId: Number(asAcademicYearId),
    asSchoolId: Number(asSchoolId),
  };
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const StandradID = StandardDivisionId()

  const GetPagedStudentsForMarkAssignment_Body: IGetPagedStudentsForMarkAssignmentBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivId: Number(StandardDivisionId()),
    asAssessmentId: Number(Assessment),
    asStartIndex: startIndex,
    asEndIndex: endIndex,
    asSortExp: ' ' + HeaderPublish[0].SortOrder
  }

  const GetPublishStatusBody: IGetPublishStatusBody = {
    asAcademicYearId: Number(asAcademicYearId),
    asSchoolId: Number(asSchoolId),
    asStandardDivId: Number(StandardDivisionId()),
    asAssessmentId: Number(Assessment),
  }

  useEffect(() => {
    if (PublishStatu.AllowPublish === true || PublishStatu.AllowUnpublish === true) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [PublishStatu]);




  const ClickPublishUnpublish = () => {
    const PublishUnpublishXseedResultBody = {
      asSchoolId: Number(asSchoolId),
      asAcademicYearId: Number(asAcademicYearId),
      asStandardDivisionId: Number(StandardDivisionId()),
      asAssessmentId: Number(Assessment),
      asMode: PublishStatu.AllowPublish ? 'Publish' : 'Unpublish',
      asInsertedById: Number(SelectTeacher)
    };

    const confirmationMessage = PublishStatu.AllowPublish
      ? 'Are you sure you want to publish pre-primary progress report grade details of all students?'
      : 'Are you sure you want to unpublish pre-primary progress report grade details of all students?';

    showAlert({
      title: 'Please Confirm',
      message: confirmationMessage,
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(PublishUnpublishXseed(PublishUnpublishXseedResultBody));
        closeAlert();
      }
    });
  };


  useEffect(() => {
    dispatch(CDAAssessmentDropdown(GetAssessmentDropdown_Body));
  }, []);


  useEffect(() => {
    if (GetScreenPermission() !== 'Y' && PrimaryTeacher.length > 0) {
      setSelectTeacher(PrimaryTeacher[0].Value);
    }
  }, [PrimaryTeacher]);

  useEffect(() => {
    dispatch(GetPrimaryTeacher(getPrimaryTeacher_body));
  }, []);


  useEffect(() => {
    if (USAssessmentDrop.length > 0) {
      setAssessment(USAssessmentDrop[0].Value);
    }
  }, [USAssessmentDrop]);


  useEffect(() => {
    if (Assessment != null) {
      dispatch(PageStudentsAssignment(GetPagedStudentsForMarkAssignment_Body));
    }
  }, [SelectTeacher, Assessment, HeaderPublish, page, rowsPerPage, StandardDivisionId()]);

  useEffect(() => {
    if (Assessment != null && PrimaryTeacher.length > 0) {
      dispatch(PublishStatus(GetPublishStatusBody));
    }
  }, [PrimaryTeacher, Assessment]);

  useEffect(() => {
    if (PublishUnpublish != '') {
      toast.success(PublishUnpublish);
      dispatch(PublishresetMessageNewAll());
      dispatch(PageStudentsAssignment(GetPagedStudentsForMarkAssignment_Body));
      dispatch(PublishStatus(GetPublishStatusBody));

    }
  }, [PublishUnpublish, StandardDivisionId(), Assessment, SelectTeacher]);

  const clickSelectClass = (value) => {
    setSelectTeacher(value);
  };

  const clickAssessmentDropdown = (value) => {
    setAssessment(value);
  };

  const clickunpublish = (value) => {
    setublishS(value);
  };


  const ClickDelete = (Id) => {
    const oneDeleteStudentTestMarks_Body: IoneDeleteStudentTestMarksBody = {
      asAcademicYearId: Number(asAcademicYearId),
      asSchoolId: Number(asSchoolId),
      asAssessmentId: Number(Assessment),
      asStudentId: Number(Id),
      asUpdatedById: Number(asUpdatedById)

    }

    showAlert({
      title: 'Delete',
      message: Id.ShowDeleteButton !== 'N' ? 'Are you sure you want to delete grades of selected assessment of selected student? ' :
        '',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(oneDeleteStudentTest(oneDeleteStudentTestMarks_Body));
        dispatch(PageStudentsAssignment(GetPagedStudentsForMarkAssignment_Body));

        closeAlert();
      }
    });
  };




  useEffect(() => {
    if (oneDeleteStud != '') {
      toast.success(oneDeleteStud);
      dispatch(deleteresetMessage());
      dispatch(PageStudentsAssignment(GetPagedStudentsForMarkAssignment_Body));
    }
  }, [oneDeleteStud]);



  const clickDeleteAlll = () => {

    const DeleteAllStudentTestMarksBody: IDeleteAllStudentTestMarksBody = {
      asAcademicYearId: Number(asAcademicYearId),
      asSchoolId: Number(asSchoolId),
      asAssessmentId: Number(Assessment),
      asStandardDivId: Number(StandardDivisionId()),
      asUpdatedById: Number(asUpdatedById)
    };

    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete grades of selected assessment of all students.?  ',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(DeleteAllStudentTest(DeleteAllStudentTestMarksBody));
        closeAlert();
      }
    });
  }


  useEffect(() => {
    if (DeleteAllStud != '') {
      toast.success(DeleteAllStud);
      dispatch(deleteresetMessageAll());
      dispatch(PageStudentsAssignment(GetPagedStudentsForMarkAssignment_Body));
    }
  }, [DeleteAllStud]);

  const clickEdit = (value) => {
    navigate('/extended-sidebar/Teacher/SubjectExamMarks/' +
      ClassTecher + '/' +
      value.StandardDivisionId + '/' +
      value.SubjectId + '/' +
      selectClass + '/' +
      ClassWiseExam + '/' +
      aTeacherId.toString() + '/' +
      value.StandardId + '/' +
      value.IsMonthConfig + '/' +
      !(value.IsSubmitted == "N") + '/' +
      false + '/' +
      'true'
    );
  };

  const ClickHeader = (value) => {
    setHeaderPublish(value)
  }
  const ClicEdit = (value) => {
  }
  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, StudentRecordCount.Count);
  const pagecount = Math.ceil(StudentRecordCount.Count / rowsPerPage);
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Student Wise Progress Report ', path: '/extended-sidebar/Teacher/StudentwiseProgressReport' }
        ]}
        rightActions={
          <>
            <Box>
              <SearchableDropdown
                sx={{
                  minWidth: '20vw'
                  , bgcolor: GetScreenPermission() === 'N' ? '#F0F0F0' : 'inherit'
                }}
                ItemList={PrimaryTeacher}
                onChange={clickSelectClass}
                defaultValue={SelectTeacher?.toString()}
                size="small"
                label="Class Teacher"
                DisableClearable={GetScreenPermission() === 'N'}
                mandatory
                disabled={GetScreenPermission() === 'N'}
              />
            </Box>

            <Box>
              <SearchableDropdown
                sx={{ minWidth: '15vw' }}
                ItemList={USAssessmentDrop}
                onChange={clickAssessmentDropdown}
                label={'Assessment:'}
                defaultValue={Assessment}
                mandatory
                size={"small"}
              />
            </Box>

            <Box>
              <Tooltip
                title={`Select the class and edit any students grades for student wise marks assignment.`}
              >
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
            {/* <Box sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
              {StudentAssignment.length > 0 &&
                (() => {
                  const item = StudentAssignment.find(item => item.ShowDeleteButton === "1");
                  if (item) {
                    const isClickable = item.ShowProgressReport !== "Y";
                    return (
                      <Tooltip key={item.Id} title={isClickable ? "Delete All " : "Delete Disabled"}>
                        <span style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}>
                                                    <DeleteForeverIcon
                            onClick={isClickable ? () => clickDeleteAlll() : undefined}
                                                       sx={{
                              color: 'red',
                              '&:hover': {
                                color: isClickable ? 'red' : 'gray',
                                backgroundColor: isClickable ? red[100] : 'transparent'
                              }}}
                          />
                        </span>
                      </Tooltip>
                    );
                  }
                  return null;
                })()
              }
            </Box> */}

            {Data[0] == 1 && Data1[0] == 'Y' ?
              <span></span> : <Box
                sx={{
                  display: 'inline-flex',
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #ccc', 
                  borderRadius: 2,
                  backgroundColor: 'transparent'
                }}
              >
                 <DeleteSweepIcon
                  onClick={clickDeleteAlll}
                  sx={{
                    display: 'inline-flex',
                    color: 'white',
                    padding:'4px',
                    width:'36px',
                    backgroundColor: red[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: red[600] },
                    marginLeft: '0px',     
                          }}
                /> 
              </Box>
            }



            {/* <Box sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
              {StudentAssignment.length > 0 &&
                (() => {
                  const item = StudentAssignment.find(item => item.ShowDeleteButton == "1");
                  if (item) {
                    const isClickable = item.ShowProgressReport !== "Y"; // Updated condition based on your requirements
                    return (
                      <Tooltip key={item.Id} title={isClickable ? "Delete All" : "Delete Disabled"}>
                        <span style={{ cursor: isClickable ? 'pointer' : 'not-allowed' }}>
                          <Box
                            sx={{
                              display: 'inline-flex',
                              width: 36,
                              height: 36,
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #ccc',
                              borderRadius: 2,
                              backgroundColor: 'transparent'
                            }}
                          >
                            <DeleteForeverIcon
                              onClick={isClickable ? clickDeleteAlll : undefined}
                              sx={{
                                color: '#223354',
                                '&:hover': {
                                  color: 'red',
                                  backgroundColor: red[100]
                                }
                              }}
                            />
                          </Box>
                        </span>
                      </Tooltip>
                    );
                  }
                  return null;
                })()
              }
            </Box> */}


            <IconButton
              sx={{ backgroundColor: PublishStatu.AllowPublish ? green[500] : red[500], 
                display: 'inline-flex',
                color: 'white',
                padding:'6px',
                width:'36px',
                height: '36px !important',               
                marginLeft: '1px',     
                       }}
              onClick={ClickPublishUnpublish}
            >
              {PublishStatu.AllowPublish ? <PublishedWithChangesIcon /> : <UnpublishedIcon />}
            </IconButton>


          </>
        } />

      <Box sx={{ background: 'white', pl: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <DotLegends
              color="secondary"
              text={''}
              text1={'Marks entry not started'}
              text2={'Marks entry partially done'}
              text3={'Marks entry completed	'} text4={undefined} text5={undefined}
            />
          </Box>
        </Box>
      </Box>
      <Box>

        {
          StudentAssignment.length > 0 ? (
            <p style={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                <Box component="span" fontWeight="fontWeightBold">
                  {startRecord} to {endRecord}
                </Box>
                {' '}out of{' '}
                <Box component="span" fontWeight="fontWeightBold">
                  {StudentRecordCount.Count}
                </Box>{' '}
                {StudentRecordCount.Count === 1 ? 'record' : 'records'}
              </Typography>
            </p>
          ) : (
            <span></span>
          )}

        <StudentwiseProgressreportList
          ItemList={StudentAssignment}
          HeaderArray={HeaderPublish}
          ClickHeader={ClickHeader}
          clickEdit={ClicEdit}
          clickDelete={ClickDelete}
        />
      </Box>
      {StudentRecordCount.Count > rowsPerPage ? (
        <ButtonGroupComponent
          rowsPerPage={rowsPerPage}
          ChangeRowsPerPage={ChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          PageChange={PageChange}
          pagecount={pagecount}
        />
      ) : (
        <span></span>
      )
      }
    </Box>
  );
};

export default Studentwiseprogressreport;