import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
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
import { blue, green, grey, red } from '@mui/material/colors';
import { ClearIcon } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router';
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

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const [SelectTeacher, setSelectTeacher] = useState('0');
  const [teacherName, setTeachername] = useState('');
  const [termName, setTermName] = useState('');
  let PreprimaryFullAccess = getSchoolConfigurations(163)
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const [AssessmentResult, setAssessmentResult] = useState('');
  const [open, setOpen] = useState(false);
  const [Reason, setReason] = useState('');
  const [ReasonError, setReasonError] = useState('');
  const asUserId = Number(localStorage.getItem('UserId'));
  const { showAlert, closeAlert } = useContext(AlertContext);


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
    setSelectTeacher(value);
  };
  const GetAssessmentDropdown = (value) => {
    setAssessmentResult(value);
  };





  // path: 'AssignPrePrimarySubjectGrades/:EditStatusId/:ClassName/:Assesment/:SelectTerm/:SubjectName/:SubjectId/:StandardDivisionId/:selectTeacher'
  // const { EditStatusId, ClassName, Assesment, SubjectName, SubjectId, SelectTerm, StandardDivisionId, selectTeacher } = useParams();

  const ClickItem = (SubId, EditStatusId, SubName) => {
    console.log(GetTeacherXseedSubjects);
    let className = PreprimaryFullAccess == 'N' ? sessionStorage.getItem('ClassName') : teacherName?.split(':')[0];
    let StdDivId = PreprimaryFullAccess == 'N' ? sessionStorage.getItem('StandardDivisionId') : SelectTeacher;
    let EditStatus = EditStatusId === 'Y' ? '3' : '2'
    navigate(
      '/extended-sidebar/Teacher/AssignPrePrimarySubjectGrades/' +
      EditStatus +
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
      StdDivId +
      '/' +
      'RP'

    );
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
      setReasonError("Reason for Unpublish should not be blank.");
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



  useEffect(() => {
    if (Assessmentt.length > 0) {
      setAssessmentResult(Assessmentt[0].Value);
    }
  }, [Assessmentt]);


  return (
    <Box sx={{ px: 2 }}>

      <CommonPageHeader
        navLinks={[
          { title: 'Pre-Primary Progress Report Results', path: '/extended-sidebar/Teacher/PrePrimaryResult' },

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
              label={'Select Term'}
              size={"small"}
              mandatory
            />
            {
              PreprimaryFullAccess == 'Y' ?
                <SearchableDropdown1
                  ItemList={PrePrimaryClassTeacher}
                  sx={{ minWidth: '250px' }}
                  onChange={(value) => {
                    GetPrPriResultDropdown(value.Value);
                    setTeachername(value.Name)
                  }}
                  defaultValue={SelectTeacher}
                  label={'Subject Teacher'}
                  size={"small"}
                  mandatory
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


            <Tooltip title={'View summarised results of your class for the selected assessment.Assessment result can be publish on by clicking on Publish button and unpublish by clicking on Unpublish button.'}>
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

      <Box sx={{ backgroundColor: 'white' }}>
        {
          GetTeacherXseedSubjects.length > 0 ?
            <PrePrimaryResultlist
              HeaderArray={HeaderList}
              ItemList={GetTeacherXseedSubjects}
              clickEdit={ClickItem}
            />
            : <span></span>
        }
      </Box>

      <Dialog
        open={open}
        maxWidth={'md'}
        fullWidth
        onClose={() => {
          setOpen(false);
        }}
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





        </DialogTitle>
        <DialogContent >

          <h1>
            {'Enter reason for unpublish'}
          </h1>
          <Grid container spacing={1} alignItems="center">
            <Grid item >
              <TextField
                sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                label={'Exam'}
                size={"small"}
                value={getClassName()} />
            </Grid>
          </Grid>


          <br></br>

          <Grid container spacing={1} alignItems="center">
            <Grid item >
              <TextField
                sx={{ minWidth: '30vw', bgcolor: '#F0F0F0' }}
                label={'Class Teacher Name'}
                size={"small"}
                value={getClassName1()} />
            </Grid>
          </Grid>
          <br></br>
          <Typography variant={"h4"} sx={{ mb: 1 }}>
            Unpublish Reason<span style={{ color: 'red' }}>*</span>
          </Typography>
          <ResizableTextField
            multiline
            // rows={5}
            value={Reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
            sx={{ width: '100%' }}
            error={ReasonError !== ''}
            helperText={ReasonError}
          />

        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button
            color={'error'}
            onClick={() => {
              setOpen(false)
              setReasonError('')
              setReason('')
            }}
          >
            Close
          </Button>
          <Button

            onClick={() => { ClickOk() }}
            sx={{
              color: 'green',
              //  backgroundColor: grey[500],
              '&:hover': {
                color: 'green',
                backgroundColor: green[100]
              }
            }}
          >
            Unpublish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrePrimaryResult;
