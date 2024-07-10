
import { CheckCircle, Unpublished } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import QuestionMark from '@mui/icons-material/QuestionMark';
import {
  Box,
  IconButton,
  Pagination,
  Tooltip, Typography
} from '@mui/material';
import { green, grey, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { AlertContext } from 'src/contexts/AlertContext';
import {
  IDeleteAllStudentTestMarksBody,
  IGetAllPrimaryClassTeachersBody,
  IGetAssessmentDropdownBody,
  IGetPagedStudentsForMarkAssignmentBody,
  IGetPublishStatusBody,
  IPublishUnpublishXseedResultBody,
  IoneDeleteStudentTestMarksBody,
} from 'src/interfaces/StudentWiseProgressReport/IStudentWiseProgressReport';
import DotLegends from 'src/libraries/ResuableComponents/DotLegends';
import ListEditIcon2 from 'src/libraries/ResuableComponents/ListEditIcon2';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  AssessmentDropdown,
  DeleteAllStudentTest,
  GetStudentResultList, PageStudentsAssignment,
  PublishStatus, PublishUnpublishXseed,
  oneDeleteStudentTest
} from 'src/requests/StudentWiseProgressReport/ReqStudentWiseProgressReport';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';


const Studentwiseprogressreport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ClassTecherid, ClassId, TestId } =
    useParams();
  let CanEdit = getSchoolConfigurations(74)

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
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


  const [SelectTeacher, setSelectTeacher] = useState(GetScreenPermission() !== 'Y' ? TeacherId : null);

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


  const { showAlert, closeAlert } = useContext(AlertContext);



  const PrimaryTeacher = useSelector((state: RootState) => state.Studentwiseprogress.PrimaryClassTeacher);
  //console.log(PrimaryTeacher, "PrimaryTeacher");
  const AssessmentDrop = useSelector((state: RootState) => state.Studentwiseprogress.AssessmentDropdown);
  //console.log(AssessmentDrop, "AssessmentDrop");
  const StudentAssignment = useSelector((state: RootState) => state.Studentwiseprogress.StudentsAssignment);
  const StudentGrade = useSelector((state: RootState) => state.Studentwiseprogress.StudentsAssignmentGrade);
  const oneDeleteStud = useSelector((state: RootState) => state.Studentwiseprogress.oneDeleteStudent);
  const DeleteAllStud = useSelector((state: RootState) => state.Studentwiseprogress.DeleteAllStudent);
  const PublishStatu = useSelector((state: RootState) => state.Studentwiseprogress.PublishStatus);
  const PublishUnpublish = useSelector((state: RootState) => state.Studentwiseprogress.PublishUnpublishXseed);




  const GetClassTeacher = () => {
    let returnVal = false
    PrimaryTeacher.map((item) => {
      if (item.Value == selectClass) {
        returnVal = item.IsClassTeacher
      }
    })
    return returnVal
  };



  //ClassDrpdown

  const getPrimaryTeacher_body: IGetAllPrimaryClassTeachersBody = {
    asSchoolId: Number(asSchoolId),
    asAcadmicYearId: Number(asAcademicYearId),
    asTeacher_id: GetScreenPermission() === 'Y' ? 0 : Number(SelectTeacher)
  };

  const GetAssessmentDropdown_Body: IGetAssessmentDropdownBody = {
    asAcadmicYearId: Number(asAcademicYearId),
    asSchoolId: Number(asSchoolId),
  };

  const GetPagedStudentsForMarkAssignment_Body: IGetPagedStudentsForMarkAssignmentBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardDivId: Number(std),
    asAssessmentId: Assessment,
    asStartIndex: 0,
    asEndIndex: 20,
    asSortExp: StudentAssig
  }

  // const oneDeleteStudentTestMarks_Body: IoneDeleteStudentTestMarksBody = {
  //     asAcadmicYearId: Number(asAcademicYearId),
  //     asSchoolId: Number(asSchoolId),
  //     asAssessmentId: Assessment,
  //     asStudentId: StudentAssig,
  //     asUpdatedById:  Number(SelectTeacher)
  // }

  const DeleteAllStudentTestMarksBody: IDeleteAllStudentTestMarksBody = {
    asAcadmicYearId: Number(asAcademicYearId),
    asSchoolId: Number(asSchoolId),
    asAssessmentId: Assessment,
    asStudentId: StudentAssig,
    asUpdatedById: Number(SelectTeacher)
  }

  const GetPublishStatusBody: IGetPublishStatusBody = {
    asAcadmicYearId: Number(asAcademicYearId),
    asSchoolId: Number(asSchoolId),
    asStandardDivId: Number(SelectTeacher),
    asAssessmentId: Assessment,
  }

  const PublishUnpublishXseedResultBody: IPublishUnpublishXseedResultBody = {
    asAcadmicYearId: Number(asAcademicYearId),
    asSchoolId: Number(asSchoolId),
  }





  useEffect(() => {
    dispatch(GetStudentResultList(getPrimaryTeacher_body));
  }, [dispatch, SelectTeacher]);

  useEffect(() => {
    if (GetScreenPermission() !== 'Y' && PrimaryTeacher.length > 0) {
      setSelectTeacher(PrimaryTeacher[0].Value);
    }
  }, [PrimaryTeacher]);

  useEffect(() => {

    dispatch(AssessmentDropdown(GetAssessmentDropdown_Body));
  }, [SelectTeacher]);



  useEffect(() => {
    if (AssessmentDrop.length > 0 && Assessment == "") {
      setAssessment(AssessmentDrop[0].Value);
    }
  }, [AssessmentDrop]);


  useEffect(() => {
    dispatch(PageStudentsAssignment(GetPagedStudentsForMarkAssignment_Body));
  }, [SelectTeacher, Assessment]);

  // useEffect(() => {
  //   dispatch(oneDeleteStudentTest(oneDeleteStudentTestMarks_Body));
  // }, [oneDelete]);

  useEffect(() => {
    dispatch(DeleteAllStudentTest(DeleteAllStudentTestMarksBody));
  }, [DeleteAll]);

  useEffect(() => {
    dispatch(PublishStatus(GetPublishStatusBody));
  }, [ublishS]);

  useEffect(() => {
    dispatch(PublishUnpublishXseed(PublishUnpublishXseedResultBody));
  }, [PublishUn]);

  const clickSelectClass = (value) => {
    setSelectTeacher(value);
  };

  const clickAssessmentDropdown = (value) => {
    setAssessment(value);
  };

  // const clickDeleteone = (value) => {
  // setoneDelete(value);
  // };

  const clickDeleteall = (value) => {
    setDeleteAll(value);
  };

  const clickunpublish = (value) => {
    setublishS(value);
  };
  const clickPublishUn = (value) => {
    setPublishUn(value);
  };

  const ClickDelete = (value) => {
    const oneDeleteStudentTestMarks_Body: IoneDeleteStudentTestMarksBody = {
      asAcadmicYearId: Number(asAcademicYearId),
      asSchoolId: Number(asSchoolId),
      asAssessmentId: Assessment,
      asStudentId: StudentAssig,
      asUpdatedById: Number(SelectTeacher)
    }

    showAlert({
      title: 'Delete',
      message: value.ShowDeleteButton !== 'N' ?
        //'Once you submit the result to the Class-teacher, you can not modify the marks/grades. Are you sure you want to continue?' :
        'Once you submit the result to the class-teacher, you can not modify the marks/grades. Are you sure you want to continue?' :
        'Are you sure, Do you want to Delete marks/grades?',
      variant: 'warning',
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      onConfirm: () => {
        closeAlert();
        dispatch(oneDeleteStudentTest(oneDeleteStudentTestMarks_Body));
      },
      onCancel: closeAlert
    });

  };


  // useEffect(() => {
  //   if (oneDeleteStud != '') {
  //     toast.success(oneDeleteStud);
  //     dispatch(resetMessage());
  //     dispatch(PageStudentsAssignment(GetPagedStudentsForMarkAssignment_Body));
  //   }
  // }, [oneDeleteStud]);



  const HeaderPublish = [
    { Id: 1, Header: 'Roll No' },
    { Id: 2, Header: 'Student Name ' },
    { Id: 3, Header: 'Edit', align: 'center' },
    { Id: 4, Header: 'Delete', align: 'center' }
  ];

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
    )
      ;


  };

  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Student wise Progress Report ', path: '/extended-sidebar/Teacher/StudentwiseProgressReport' }
        ]}
        rightActions={
          <>
            <Box>
              <SearchableDropdown
                sx={{
                  minWidth: '20vw',
                  bgcolor: GetScreenPermission() === 'N' ? '#f0e68c' : 'inherit'
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
                sx={{ minWidth: '300px' }}
                ItemList={AssessmentDrop}
                onChange={clickAssessmentDropdown}
                label={'Assessment:'}
                defaultValue={Assessment}
                mandatory
                size={"small"}
              />
            </Box>

            <Box>
              <Tooltip
                title={`View all subjects assigned with the current status of marks given to students.
                Once marks for all the students are allotted you have to submit these marks to the class teacher by clicking on "submit" button.
                Pre-primary teachers to add and submit progress report entries of his/her class.`}
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
          </>
        }
      />

      <Box sx={{ background: 'white', p: 1 }}>
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
        <ListEditIcon2
          ItemList={StudentAssignment}
          clickEdit={clickEdit}
          HeaderArray={HeaderPublish}
          clickSubmit={ClickDelete}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <Tooltip title={"Publish "}>
          <span>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: green[500],
                '&:hover': { backgroundColor: green[600] }
              }}
            >
              <CheckCircle />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title={"Unpublish "}>
          <span>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: red[500],
                '&:hover': { backgroundColor: red[600] }
              }}
            >
              <Unpublished />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title={"Delete All"}>
          <span>
            <IconButton>
              <DeleteForeverIcon sx={{ color: 'red', cursor: 'pointer' }} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={5}
          variant="outlined"
          shape='rounded'
          showFirstButton
          showLastButton
          onChange={(event, value) => {
            // handlePageChange(value);
          }}
        />
      </Box>
    </Box>
  );
};

export default Studentwiseprogressreport;
