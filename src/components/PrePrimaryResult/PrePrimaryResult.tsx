import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IGetAssessmentBody,
  IGetClassTeacherXseedSubjectsBody,
  IGetPrePrimaryResultBody,
  IGetPublishResltBody,
  IGetUnPublishResltBody
} from 'src/interfaces/PrePrimaryResult/IPrePrimaryResult';

import {
  AssessmentList,
  CDAPublished,
  CDAUnPublished,
  PrePrimary,
  PublishresetMessage,
  TeacherXseedSubjects,
  UnPublishresetMessage
} from 'src/requests/PrePrimaryResult/RequestPrePrimaryResult';

import { RootState } from 'src/store';
// import { Container } from '@mui/material';
import { CheckCircle, Unpublished } from '@mui/icons-material';
import { blue, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import SearchableDropdown1 from 'src/libraries/ResuableComponents/SearchableDropdown1';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import PrePrimaryResultlist from './PrePrimaryResultlist';
const PrePrimaryResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TermId, StdDivId } = useParams();
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const [SelectTeacher, setSelectTeacher] = useState('0');
  const [teacherName, setTeachername] = useState('');
  const [termName, setTermName] = useState('');
  let PreprimaryFullAccess = getSchoolConfigurations(163)
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const [AssessmentResult, setAssessmentResult] = useState('0');
  const [open, setOpen] = useState(false);
  const [Reason, setReason] = useState('');
  const [ReasonError, setReasonError] = useState('');
  const asUserId = Number(localStorage.getItem('UserId'));
  const { showAlert, closeAlert } = useContext(AlertContext);

  useEffect(() => {
    if (StdDivId && TermId) {
      if (StdDivId.length > 0 && TermId.length > 0) {
        let CurrentTeacherName: any = PrePrimaryClassTeacher.filter((item) => item.Id === StdDivId);
        let CurrentTermName: any = Assessmentt.filter((item) => item.Id === TermId);
        setAssessmentResult(TermId)
        setSelectTeacher(StdDivId)
        setTeachername(CurrentTeacherName[0]?.Name)
        setTermName(CurrentTermName[0]?.Name)
      }
    }
  }, [StdDivId, TermId])
  const HeaderList = [
    { Id: 1, Header: 'Subject' },
    { Id: 2, Header: 'Edit' },


  ];

  const PrePrimaryResultt = useSelector(
    (state: RootState) => state.PrePrimaryResult.PrePrimaryResult
  );


  const PrePrimaryClassTeacher = PrePrimaryResultt.filter((teacher: any) => teacher.Is_PrePrimary == 'Y');
  const Assessmentt = useSelector(
    (state: RootState) => state.PrePrimaryResult.Assessment
  );

  const GetTeacherXseedSubjects = useSelector(
    (state: RootState) => state.PrePrimaryResult.TeacherXseedSubjects
  );
  const USlistpublishstatusDetails = useSelector(
    (state: RootState) => state.PrePrimaryResult.ISlistpublishstatusDetails
  );
  const IsPublished = USlistpublishstatusDetails.length > 0 ? USlistpublishstatusDetails[0].IsPublished : "";
  const PublishStatus = USlistpublishstatusDetails.length > 0 ? USlistpublishstatusDetails[0].PublishStatus : "";
  const StandardDivisionId = USlistpublishstatusDetails.length > 0 ? USlistpublishstatusDetails[0].StandardDivisionId : "";
  console.log(IsPublished, "--", PublishStatus);


  const UnPublisheed = useSelector(
    (state: RootState) => state.PrePrimaryResult.Unpublish
  );

  const Publisheed = useSelector(
    (state: RootState) => state.PrePrimaryResult.publish
  );

  const PrePrimaryResult: IGetPrePrimaryResultBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asTeacher_id: 0

  };


  const AssessmentLists: IGetAssessmentBody = {
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };


  const SubjectsList: IGetClassTeacherXseedSubjectsBody = {
    asSchoolId: asSchoolId,
    asAcadmeicYearId: asAcademicYearId,
    asStdDivId: PreprimaryFullAccess == 'Y' ? Number(SelectTeacher) : asStandardDivisionId,
    asAssessmentId: Number(AssessmentResult)
  };




  const ClickUnpublish = () => {
    const UnpublishBody: IGetUnPublishResltBody = {
      asSchoolId: asSchoolId,
      asAcademic_Year_Id: asAcademicYearId,
      asStandardDivisionId: PreprimaryFullAccess == 'Y' ? Number(SelectTeacher) : asStandardDivisionId,
      asAssessmentId: Number(AssessmentResult),
      asUnPublishReason: Reason,
      asInsertedById: asUserId,
      asUpdatedById: asUserId,
      IsPublish: false
    };
    dispatch(CDAUnPublished(UnpublishBody));
  };




  const Clickpublish = () => {

    const PublishBody: IGetPublishResltBody = {
      asSchoolId: asSchoolId,
      asAcademic_Year_Id: asAcademicYearId,
      asStandardDivisionId: PreprimaryFullAccess == 'Y' ? Number(SelectTeacher) : asStandardDivisionId,
      asAssessmentId: Number(AssessmentResult),
      asUnPublishReason: "",
      asInsertedById: asUserId,
      asUpdatedById: asUserId,
      IsPublish: true
    }
    showAlert({
      title: 'Please Confirm',
      message:
        'Once you publish the result it will be visible to parents/students. Are you sure you want to continue?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(CDAPublished(PublishBody));


        closeAlert();
      }
    });




  };









  const GetPrPriResultDropdown = (value) => {
    setSelectTeacher(value.Value);
    setTeachername(value.Name)
  };
  const GetAssessmentDropdown = (value) => {
    setAssessmentResult(value);
  };





  // path: 'AssignPrePrimarySubjectGrades/:EditStatusId/:ClassName/:Assesment/:SelectTerm/:SubjectName/:SubjectId/:StandardDivisionId/:selectTeacher'
  // const { EditStatusId, ClassName, Assesment, SubjectName, SubjectId, SelectTerm, StandardDivisionId, selectTeacher } = useParams();

  const ClickItem = (SubId, SubName, IsXseedSubject) => {
    let className = PreprimaryFullAccess == 'N' ? sessionStorage.getItem('ClassName') : teacherName?.split(':')[0];
    let StdDivIds = PreprimaryFullAccess == 'N' ? sessionStorage.getItem('StandardDivisionId') : SelectTeacher;
    console.log('🥱', className)
    let isPublishStatus = IsPublished === 'Y' ? '3P' : '2'
    if (IsXseedSubject === 'Y') {
      navigate(
        '/extended-sidebar/Teacher/AssignPrePrimarySubjectGrades/' +
        isPublishStatus +
        '/' +
        className +
        '/' +
        termName +
        '/' +
        AssessmentResult +
        '/' +
        SubName +
        '/' +
        SubId +
        '/' +
        StdDivIds +
        '/' +
        'RP'
      );
    } else if (IsXseedSubject === 'N') {
      navigate(
        '/extended-sidebar/Teacher/AssignProgressReportSubject/' +
        isPublishStatus +
        '/' +
        className +
        '/' +
        termName +
        '/' +
        AssessmentResult +
        '/' +
        SubName +
        '/' +
        SubId +
        '/' +
        StdDivIds +
        '/' +
        'RP'
      );
    }
  };

  const onClickunpublished = () => {
    setOpen(true)

  };


  const getClassName = () => {
    let className = '';
    Assessmentt.map((item) => {
      if (item.Value == AssessmentResult) className = item.Name;
    });

    return className;
  };

  const getClassName1 = () => {
    let className = '';
    PrePrimaryResultt.map((item) => {
      if (item.Value == (PreprimaryFullAccess == 'Y' ? Number(SelectTeacher) : asStandardDivisionId)) className = item.Name;
    });

    return className;
  };

  const ClickOk = () => {
    if (Reason === '') {
      setReasonError("Reason for unpublish should not be blank.");
    } else {

      ClickUnpublish()
      setOpen(false);
      setReasonError('')

    }
  };


  useEffect(() => {
    dispatch(TeacherXseedSubjects(SubjectsList));
  }, [SelectTeacher, AssessmentResult]);

  useEffect(() => {
    dispatch(AssessmentList(AssessmentLists));
  }, []);

  useEffect(() => {
    dispatch(PrePrimary(PrePrimaryResult));
  }, []);

  useEffect(() => {
    if (Publisheed != "") {
      toast.success(Publisheed);
      dispatch(PublishresetMessage());
      dispatch(TeacherXseedSubjects(SubjectsList));
    }
  }, [Publisheed]);

  useEffect(() => {
    if (UnPublisheed != "") {
      toast.success(UnPublisheed);
      dispatch(UnPublishresetMessage());
      dispatch(TeacherXseedSubjects(SubjectsList));
      setReasonError('')
      setReason('')
    }
  }, [UnPublisheed]);



  // useEffect(() => {
  //   if (Assessmentt.length > 0) {
  //     setAssessmentResult(Assessmentt[0].Value);
  //   }
  // }, [Assessmentt]);


  return (
    <Box sx={{ px: 2 }}>

      <CommonPageHeader
        navLinks={[
          { title: `Pre-Primary Progress Report Results`, path: '/extended-sidebar/Teacher/PrePrimaryResult' },

        ]}

        rightActions={
          <>
            <SearchableDropdown1
              ItemList={Assessmentt}
              sx={{ minWidth: '250px' }}
              onChange={(value) => {
                GetAssessmentDropdown(value.Value);
                setTermName(value.Name);
              }}
              defaultValue={AssessmentResult}
              label={'Assessment'}
              size={"small"}

            />
            {
              PreprimaryFullAccess == 'Y' ?
                <SearchableDropdown1
                  ItemList={PrePrimaryClassTeacher}
                  sx={{ minWidth: '250px' }}
                  onChange={(value) => {
                    GetPrPriResultDropdown(value);
                  }}
                  defaultValue={SelectTeacher}
                  label={'Select Class Teacher'}
                  size={"small"}
                />
                : <span></span>

            }
            {
              StandardDivisionId == "" || AssessmentResult == '0' ? null : <div>
                {
                  PublishStatus === "Y" && IsPublished === "N" ? (
                    <Tooltip title={'Publish'}>
                      <IconButton
                        sx={{
                          color: 'white',
                          backgroundColor: blue[500],
                          '&:hover': {
                            backgroundColor: blue[600],
                          },
                        }}
                        onClick={Clickpublish}
                      >
                        <CheckCircle />
                      </IconButton>
                    </Tooltip>
                  ) : PublishStatus === "Y" && IsPublished === "Y" ? (
                    <Tooltip title={'Unpublish'}>
                      <IconButton
                        sx={{
                          color: 'white',
                          backgroundColor: red[500],
                          '&:hover': {
                            backgroundColor: red[500],
                          },
                        }}
                        onClick={onClickunpublished}
                      >
                        <Unpublished />
                      </IconButton>
                    </Tooltip>
                  ) : null
                }

              </div>
            }


            <Tooltip title={'View summarised results of your class for the selected assessment.Assessment result can be publish by clicking on publish button and unpublish by clicking on unpublish button.'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],

                  height: '36px !important',
                  ':hover': { backgroundColor: grey[600] }
                }}
              >
                <QuestionMarkIcon />
              </IconButton>
            </Tooltip>
          </>}
      />


      {GetTeacherXseedSubjects.length > 0 ? (
        <Box sx={{ p: 2, background: 'white', display: 'flex', flexDirection: 'column' }}>
          <PrePrimaryResultlist
            HeaderArray={HeaderList}
            ItemList={GetTeacherXseedSubjects}
            clickEdit={ClickItem}
          />
        </Box>
      ) : (
        <span></span>
      )}








      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth
        maxWidth={'sm'}
        PaperProps={{
          sx: {
            borderRadius: "15px",
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: '#223354',
            // backgroundColor: (theme) => theme.colors.primary.main,
            color: (theme) => theme.palette.common.white
          }}
        >
          <ClearIcon onClick={() => {
            setOpen(false)
            setReasonError('')
            setReason('')
          }}
            sx={{
              color: 'white',
              // background:'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '7px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
                //  backgroundColor: red[100]

              }
            }} />
          <Tooltip title={'Enter the reason for assessment unpublish.'}>

            <QuestionMarkIcon
              sx={{
                color: 'white',
                // background:'white',
                borderRadius: '10px',
                position: 'absolute',
                top: '4px',
                right: '35px',
                cursor: 'pointer',
                '&:hover': { backgroundColor: grey[600] }
              }} />
          </Tooltip>
        </DialogTitle>
        <DialogContent>

          <Box sx={{ maxHeight: '300px', overflowY: 'auto', position: 'relative', background: 'white' }}>
            <h1>
              Enter Reason For Unpublish
            </h1>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={6}>
                <TextField fullWidth label={'Assessment'}
                  sx={{ width: '95%', bgcolor: '#f0f0f0' }}
                  disabled
                  value={getClassName()}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label={'Class Teacher :'}
                  sx={{ width: '100%', bgcolor: '#f0f0f0' }}
                  disabled
                  value={getClassName1()} />
              </Grid>
              <br></br>
              <Grid item xs={12} marginTop={2}>
                {/* <Typography variant={"h4"} sx={{ mb: 1 }}>
          Reason For Unpublish<span style={{ color: 'red' }}>*</span>
          </Typography> */}
                <ResizableTextField fullWidth label={'Reason For Unpublish  :'}
                  multiline
                  // rows={3}
                  value={Reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  sx={{ width: '100%' }}
                  error={ReasonError !== ''}
                  helperText={ReasonError}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ py: 1, px: 3 }}>
          <Button onClick={() => {
            setOpen(false)
            setReasonError('')
            setReason('')
          }}
            color={'error'}>
            Cancel
          </Button>
          <Button onClick={() => { ClickOk() }} color={'error'} sx={{
            '&:hover': {
              backgroundColor: red[100]
            }
          }}>
            Unpublish
          </Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrePrimaryResult;
