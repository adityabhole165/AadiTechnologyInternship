import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import QuestionMark from '@mui/icons-material/QuestionMark';
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip, Typography
} from '@mui/material';
// import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import EditOffIcon from '@mui/icons-material/EditOff';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  GetClassTeacherXseedSubjectsBody,
  IDeleteAllStudentTestMarksBody,
  IGetAllPrimaryClassTeachersBody,
  IGetAssessmentDropdownBody,
  IGetPagedStudentsForMarkAssignmentBody,
  IGetPublishStatusBody,
  IoneDeleteStudentTestMarksBody
} from 'src/interfaces/StudentWiseProgressReport/IStudentWiseProgressReport';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import StudentwiseProgressreportList from 'src/libraries/ResuableComponents/StudentwiseProgressreportList';
import {
  CDAAssessmentDropdown,
  CDAClassTeacherXseedSubjects,
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
import { decodeURL, encodeURL, getSchoolConfigurations } from '../Common/Util';
import IsPublishstatus from './IsPublishstatus';

import Legend from 'src/libraries/Legend/Legend';
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
  let {
    ClassTecherid,
    ClassId,
    TestId,
    TermId
  } = useParams();

  // Decode in-place
  ClassTecherid = decodeURL(ClassTecherid);
  ClassId = decodeURL(ClassId);
  TestId = decodeURL(TestId);
  TermId = decodeURL(TermId);

  let CanEdit = getSchoolConfigurations(74)

  const [SelectTeacher, setSelectTeacher] = useState(TeacherId);
  const [selectClass, SetSelectClass] = useState(ClassId == undefined ? "" : ClassId);
  const [ClassWiseExam, SetClassWiseExam] = useState(TestId == undefined ? "" : TestId);
  const [ClassTecher, SetClassTecher] = useState(ClassTecherid == undefined ? TeacherId : ClassTecherid);
  const [Assessment, setAssessment] = useState<string | undefined>(undefined);


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
    { Id: 2, Header: 'Student Name', SortOrder: "Name" },
    { Id: 3, Header: 'Edit' },
    { Id: 4, Header: 'Delete' }
  ]);

  const [sortExpression, setSortExpression] = useState('Roll_No');
  const [headerArray, setHeaderArray] = useState([
    { Id: 1, Header: 'Roll No', SortOrder: null, sortKey: 'Roll_No' },
    { Id: 2, Header: 'Student Name', SortOrder: null, sortKey: 'Name' },
    { Id: 3, Header: 'Edit', },
    { Id: 4, Header: 'Delete', }

  ]);

  const handleHeaderClick = (updatedHeaderArray) => {
    setHeaderArray(updatedHeaderArray);
    const sortField = updatedHeaderArray.find(header => header.SortOrder !== null);
    const newSortExpression = `${sortField.sortKey} ${sortField.SortOrder}`;
    setSortExpression(newSortExpression);
  };



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
  const USClassTeacherXseedSubjects: any = useSelector((state: RootState) => state.Studentwiseprogress.ISClassTeacherXseedSubjects);
  const IsPublished1 = USClassTeacherXseedSubjects.map(item => item.IsPublished)
  const [asMode, setAsMode] = useState(PublishStatu.AllowPublish === true ? 'Publish' : 'Unpublish');

  const IsPublished = USClassTeacherXseedSubjects.every(item => item.IsPublished == 'Y')
  const ShowDeleteButton = StudentAssignment.every(item => item.ShowDeleteButton !== "1")

  const ShowProgressReport = StudentAssignment.map(item => item.ShowProgressReport)

  const GetAllRecordSubmitted: any = useSelector((state: RootState) => state.Studentwiseprogress.ISGetAllRecordSubmitted);





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
    asSortExp: sortExpression
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
    if (Assessment != null) {
      dispatch(PageStudentsAssignment(GetPagedStudentsForMarkAssignment_Body));
    }
  }, [SelectTeacher, Assessment, HeaderPublish, page, rowsPerPage, StandardDivisionId(), sortExpression]);

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


  useEffect(() => {
    if (USAssessmentDrop.length > 0) {
      setAssessment(USAssessmentDrop[0].Value);
    }
  }, [USAssessmentDrop]);

  useEffect(() => {
    if (TermId !== undefined) {
      setAssessment(TermId);
    }
  }, [TermId]);




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

  const ClassTeacherXseedSubjectsBodyNew: GetClassTeacherXseedSubjectsBody = {
    asAcadmeicYearId: Number(asAcademicYearId),
    asSchoolId: Number(asSchoolId),
    asAssessmentId: Number(Assessment),
    asStdDivId: Number(StandardDivisionId())


  }

  useEffect(() => {
    dispatch(CDAClassTeacherXseedSubjects(ClassTeacherXseedSubjectsBodyNew));


  }, [Assessment, StandardDivisionId()]);



  const ClicEdit = (YearwiseStudentId, StandardId) => {

    navigate('/RITeSchool/Teacher/StudentwiseprogressreportEdit/' +
      encodeURL(Assessment) + '/' +
      encodeURL(YearwiseStudentId) + '/' +
      encodeURL(StandardId), { state: { fromInternal: true } }

    );
  };

  const ClickHeader = (value) => {
    setHeaderPublish(value)
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

  const LegendArray = [
    {
      id: 1,
      Name: 'Marks entry not started',
      Value: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EditOffIcon style={{ color: '#f44336', fontSize: 'large', position: 'relative', top: '-2px' }} />
          <Typography>Marks entry not started</Typography>
        </Box>
      ),
    },
    {
      id: 2,
      Name: 'Marks entry partially done',
      Value: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DesignServicesIcon style={{ color: '#ff9800', fontSize: 'large', position: 'relative', top: '-2px' }} />
          <Typography>Marks entry partially done</Typography>
        </Box>
      ),
    },
    {
      id: 3,
      Name: 'Marks entry completed',
      Value: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EventAvailableIcon style={{ color: '#25e67b', fontSize: 'large', position: 'relative', top: '-2px' }} />
          <Typography>Marks entry completed</Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Student Wise Progress Report', path: '/RITeSchool/Teacher/StudentwiseProgressReport' }
        ]}
        rightActions={
          <>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="left"
              gap={1}
              sx={{
                mt: { xs: 0, sm: 0 },
                flexWrap: { xs: 'nowrap', sm: 'nowrap' }
              }}
            >
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
              >
                <SearchableDropdown
                  sx={{
                    width: { xs: '70vw', sm: '25vw', md: '22vw' }
                    , bgcolor: GetScreenPermission() === 'N' && PrimaryTeacher.length == 0 ? '#F0F0F0' : 'inherit'
                  }}
                  ItemList={PrimaryTeacher}
                  onChange={clickSelectClass}
                  defaultValue={SelectTeacher?.toString()}
                  size="small"
                  label="Class Teacher"
                  DisableClearable={GetScreenPermission() === 'N'}
                  mandatory
                  disabled={GetScreenPermission() === 'N' && PrimaryTeacher.length == 0}
                />
              </Grid>

              <Grid
                item
                xs={12}
                display="flex"
                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
              >
                <SearchableDropdown
                  sx={{ width: { xs: '50vw', sm: '20vw', md: '15vw' } }}
                  ItemList={USAssessmentDrop}
                  onChange={clickAssessmentDropdown}
                  label={'Assessment:'}
                  defaultValue={String(Assessment)}
                  mandatory
                  size={"small"}
                />
              </Grid>

              <Grid
                item
                xs={12}
                gap={1}
                display="flex"
                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
              >
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





                <Tooltip title="Delete All">
                  <span>
                    <IconButton
                      sx={{
                        display: 'inline-flex',
                        color: 'white',
                        padding: '4px',
                        width: '36px',
                        height: '36px',
                        backgroundColor: red[500],
                        ':hover': { backgroundColor: red[600] },
                        marginLeft: '0px',
                      }}
                      disabled={ShowDeleteButton == true || IsPublished == true}
                      onClick={clickDeleteAlll}
                    >
                      <DeleteSweepIcon />
                    </IconButton>
                  </span>
                </Tooltip>




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
                {/* {PublishStatu.AllowPublish == true || PublishStatu.AllowUnpublish == true && GetAllRecordSubmitted.AllSubmitted == true ? <IconButton
              sx={{
                backgroundColor: PublishStatu.AllowPublish ? green[500] : red[500],
                display: 'inline-flex',
                color: 'white',
                padding: '6px',
                width: '36px',
                height: '36px !important',
                marginLeft: '1px',
                ':hover': { backgroundColor: PublishStatu.AllowPublish ? green[600] : red[600] }
              }}
              onClick={ClickPublishUnpublish}
            >
              {PublishStatu.AllowPublish ? <PublishedWithChangesIcon /> : <UnpublishedIcon />}
            </IconButton> : <span> </span>} */}

              </Grid>
            </Stack>

          </>
        } />

      <Box sx={{ background: 'white', p: 1.5, mb: 2 }}>
        <Legend LegendArray={LegendArray} />
      </Box>
      <Box mb={1} sx={{ p: 2, background: 'white' }}>
        <Box>
          {
            StudentAssignment.length > 0 ? (
              <p style={{ flex: 1, textAlign: 'center', }}>
                <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
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
        </Box>

        <IsPublishstatus.Provider value={IsPublished}>
          <StudentwiseProgressreportList
            ItemList={StudentAssignment}
            HeaderArray={headerArray}
            ClickHeader={handleHeaderClick}
            clickEdit={ClicEdit}
            clickDelete={ClickDelete}
          />
        </ IsPublishstatus.Provider>

        {
          endRecord > 19 ? (
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
    </Box>
  );
};

export default Studentwiseprogressreport;