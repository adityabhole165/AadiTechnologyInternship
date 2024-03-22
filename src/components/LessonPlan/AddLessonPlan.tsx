import Check from '@mui/icons-material/Check';
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Breadcrumbs, Container, Grid, IconButton, Stack, TableCell, TextField, Tooltip, Typography, alpha, styled } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IAddOrEditLessonPlanDetailsBody, IClassListBody, ISaveApproverCommentBody, ISaveLessonPlanBody, ISubmitLessonPlanBody } from 'src/interfaces/LessonPlan/IAddLessonPlan';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { GetAddOrEditLessonPlanDetails, SaveLessonPlan, classnamelist, getSaveApproverComment, getSubmitLessonPlan, getUpdateLessonPlanDate, resetsaveLessonPlan } from 'src/requests/LessonPlan/RequestAddLessonPlan';
import CDAlessonplanlist from 'src/requests/LessonPlan/RequestLessonPlanBaseScreen';
import { RootState } from 'src/store';
import LessonPlanList from './LessonPlanList';

const HeaderStyledCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  border: '1px solid rgba(224, 224, 224, 1)',
}))

const StyledCell = styled(TableCell)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  border: '1px solid rgba(224, 224, 224, 1)',
}))

const AddLessonPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [StartDate, setStartDate] = useState('');
  const [EndDate, setEndDate] = useState('');
  const [SelectClass, setSelectClass] = useState('');
  const [ReportingUserId, setasReportingUserId] = useState('');
  const [UpdatedById, setUpdatedById] = useState('');
  const [OldStartDate, setOldStartDate] = useState('');
  const [OldEndDate, setOldEndDate] = useState('');
  const [ItemList, setItemList] = useState('');
  const [ApproverComment, setApproverComment] = useState('');

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const TeacherName = sessionStorage.getItem('StudentName');
  const [exampleLessonDetails, setExampleLessonDetails] = useState([
    {
      lessonName: '6-C ( Marathi III )',
      subject: 'Marathi',
      planDetails: [
        {
          Id: 1,
          label: "Topic / Sub topic",
          value: ""
        },
        {
          Id: 2,
          label: "Resources & References",
          value: ""
        },
        {
          Id: 3,
          label: "Instructional Objective and Learning Outcome",
          value: ""
        },
        {
          label: "Description of activities to be used to conduct the class",
          value: "",
          subPlanDetails: [
            {
              Id: 4,
              label: "Continuity of learning experience.",
              value: ""
            },
            {
              Id: 5,
              label: "Life Skills / Value based question.",
              value: ""
            },
            {
              Id: 6,
              label: "Multiple Intelligence / Subject Integration.",
              value: ""
            }
          ]
        },
        {
          Id: 7,
          label: "Homework Assigned",
          value: ""
        }
      ],
    },
    {
      lessonName: '6-C ( Marathi III )',
      subject: 'Marathi',
      planDetails: [
        {
          Id: 8,
          label: "Topic / Sub topic",
          value: ""
        },
        {
          Id: 9,
          label: "Resources & References",
          value: ""
        },
        {
          Id: 10,
          label: "Instructional Objective and Learning Outcome",
          value: ""
        },
        {
          Id: 11,
          label: "Description of activities to be used to conduct the class",
          value: "",
          subPlanDetails: [
            {
              Id: 12,
              label: "Continuity of learning experience.",
              value: ""
            },
            {
              Id: 13,
              label: "Life Skills / Value based question.",
              value: ""
            },
            {
              Id: 14,
              label: "Multiple Intelligence / Subject Integration.",
              value: ""
            }
          ]
        },
        {
          Id: 15,
          label: "Homework Assigned",
          value: ""
        }
      ],
    }
  ])

  const ClassListDropdown = useSelector((state: RootState) => state.addlessonplan.ClassName);
  const AddOrEditLessonPlanDetails = useSelector((state: RootState) => state.addlessonplan.AddOrEditLessonPlanDetails);
  const SaveLessonPlans = useSelector((state: RootState) => state.addlessonplan.saveLessonPlanmsg);
  const SubmitLessonPlans = useSelector((state: RootState) => state.addlessonplan.submitLessonPlanmsg);
  const SaveApproverComment = useSelector((state: RootState) => state.addlessonplan.saveApproverCommentmsg);
  const UpdateLessonPlanDate = useSelector((state: RootState) => state.addlessonplan.updateLessonPlanDatemsg);

  const SaveLessonPlanBody: ISaveLessonPlanBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: Number(asUserId),
    asReportingUserId: Number(ReportingUserId),
    aasStartDate: "12/29/2023 12:00:00 AM",
    aasEndDate: "12/30/2023 12:00:00 AM",
    asLessonPlanXml: ItemList,
    asUpdatedById: Number(UpdatedById),
    asOldStartDate: OldStartDate,
    asOldEndDate: OldEndDate,
  };


  useEffect(() => {
    const ClassListBody: IClassListBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      aTeacherId: TeacherId
    };
    dispatch(classnamelist(ClassListBody));
  }, [TeacherId]);

  useEffect(() => {
    const AddOrEditLessonPlanDetails: IAddOrEditLessonPlanDetailsBody = {
      asSchoolId: 18,
      asAcademicYearId: 54,
      asStandardDivId: 1266,
      asUserId: 4463,
      asReportingUserId: 4463,
      asStartDate: "2024-10-10 12:00:00 AM",
      asEndDate: "2024-10-10 12:00:00 AM",
      IsNewMode: true
    };
    dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetails))
  }, [])

  useEffect(() => {
    if (SaveLessonPlans !== '') {
      toast.success(SaveLessonPlans)
      dispatch(resetsaveLessonPlan())
      dispatch(CDAlessonplanlist)
    }
  }, [SaveLessonPlans])

  useEffect(() => {
    const SubmitLessonPlanBody: ISubmitLessonPlanBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: Number(asUserId),
      asReportingUserId: Number(ReportingUserId),
      aasStartDate: "1/3/2024 12:00:00 AM",
      aasEndDate: "1/6/2024 12:00:00 AM",
      asUpdatedById: Number(UpdatedById)
    };
    dispatch(getSubmitLessonPlan(SubmitLessonPlanBody));
  }, [])
  useEffect(() => {
    const SaveApproverCommentBody: ISaveApproverCommentBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: Number(asUserId),
      asReportingUserId: Number(ReportingUserId),
      aasStartDate: "1/8/2024 12:00:00 AM",
      aasEndDate: "1/9/2024 12:00:00 AM",
      asApproverComment: ApproverComment,
      asUpdatedById: Number(UpdatedById),
      asOldStartDate: "1/8/2024 12:00:00 AM",
      asOldEndDate: "1/9/2024 12:00:00 AM",
    };
    dispatch(getSaveApproverComment(SaveApproverCommentBody));
  }, [])
  useEffect(() => {
    const UpdateLessonPlanDateBody: ISaveApproverCommentBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: Number(asUserId),
      asReportingUserId: Number(ReportingUserId),
      aasStartDate: "1/8/2024 12:00:00 AM",
      aasEndDate: "1/9/2024 12:00:00 AM",
      asApproverComment: ApproverComment,
      asUpdatedById: Number(UpdatedById),
      asOldStartDate: "1/8/2024 12:00:00 AM",
      asOldEndDate: "1/9/2024 12:00:00 AM",
    };
    dispatch(getUpdateLessonPlanDate(UpdateLessonPlanDateBody));
  }, [])
  useEffect(() => {
    const monday = getMonday();
    const friday = getFriday();
    setStartDate(monday.toISOString().split('T')[0]);
    setEndDate(friday.toISOString().split('T')[0]);
  }, []);

  const getMonday = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(currentDate.setDate(diff));
  };
  const getFriday = () => {
    const mondayDate = getMonday();
    const fridayDate = new Date(mondayDate);
    fridayDate.setDate(mondayDate.getDate() + 4);
    return fridayDate;
  };

  const onSelectStartDate = (value) => {
    setStartDate(value);
  };
  const onSelectEndDate = (value) => {
    setEndDate(value);
  };
  const onClickClass = (value) => {
    setSelectClass(value);
  };

  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/LessonPlanBaseScreen');
  };

  const onTextChange = (value) => {
    setExampleLessonDetails(value)
  }
  const onClickSave = () => {
    dispatch(SaveLessonPlan(SaveLessonPlanBody));
  }

  return (
    <Container maxWidth="xl">
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          pt: 4,
          pb: 2
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
                  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
                }}
              >
                <HomeTwoTone color="primary" />
              </IconButton>
            </Link>
            <Link
              to={'/extended-sidebar/Teacher/LessonPlanBaseScreen'}
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
                Lesson Plans
              </Typography>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Lesson Plan Details
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Box>
            <Tooltip title={'Save/ Submit/ Approve lesson plan details.'}>
              <IconButton
                sx={{
                  backgroundColor: grey[500],
                  color: 'white',
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={'Submit'}>
              <IconButton
                sx={{
                  backgroundColor: blue[500],
                  color: 'white',
                  '&:hover': {
                    backgroundColor: blue[600]
                  }
                }}
              >
                <Check />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <Tooltip title={'Save'}>
              <IconButton
                sx={{
                  backgroundColor: green[500],
                  color: 'white',
                  '&:hover': {
                    backgroundColor: green[600]
                  }
                }}
                onClick={onClickSave}
              >
                <Save />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ p: 2, background: 'white' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label={<>
                Teacher <span style={{ color: 'red' }}>*</span>
              </>}
              value={TeacherName}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type='date'
              label={'Start Date'}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                max: new Date().toISOString().split('T')[0]
              }}
              value={StartDate}
              onChange={(e) => onSelectStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type='date'
              label={'End Date'}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                max: new Date().toISOString().split('T')[0]
              }}
              value={EndDate}
              onChange={(e) => onSelectEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <SearchableDropdown
              ItemList={ClassListDropdown}
              defaultValue={SelectClass}
              label='Class'
              mandatory
              sx={{ width: '100%' }}
              onChange={(e) => onClickClass(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {/* <Button variant={"contained"} color={"success"}>
                Save
              </Button>
              <Button variant={"outlined"} color={"primary"} disabled>
                Submit
              </Button> */}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h5"} mb={1}>
              Plan Details
            </Typography>
            <LessonPlanList exampleLessonDetails={exampleLessonDetails} onTextChange={onTextChange} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={"h5"} mb={1}>
              Activity
            </Typography>
            <Grid container>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                <Typography color={"primary"} fontWeight={"bold"}>
                  Name:
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                <Typography color={"primary"}>
                  Ms. Manjiri S. Phadke
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                <Typography color={"primary"} fontWeight={"bold"}>
                  Submitted On:
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                <Typography color={"primary"}>
                  Ms. Manjiri S. Phadke
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                <Typography color={"primary"} fontWeight={"bold"}>
                  Name:
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                <Typography color={"primary"}>
                  Ms. Manjiri S. Phadke
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                <Typography color={"primary"} fontWeight={"bold"}>
                  Approved On:
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                <Typography color={"primary"}>
                  Ms. Manjiri S. Phadke
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                <Typography color={"primary"} fontWeight={"bold"}>
                  Name:
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                <Typography color={"primary"}>
                  Ms. Manjiri S. Phadke
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                <Typography color={"primary"} fontWeight={"bold"}>
                  Approved On:
                </Typography>
              </Grid>
              <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                <Typography color={"primary"}>
                  Ms. Manjiri S. Phadke
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {/* <Button variant={"contained"} color={"success"}>
                Save
              </Button>
              <Button variant={"outlined"} color={"primary"} disabled>
                Submit
              </Button> */}
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PageHeader heading="Lesson Plan Details" />
        <br></br>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Typography>
              <b>Teacher :</b>
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField value={TeacherName} />
          </Grid>
        </Grid>

        <br></br>

        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Typography>
              <b>Start Date:</b>
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              type="date"
              value={StartDate}
              onChange={(e) => {
                onSelectStartDate(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <br></br>
        <br></br>

        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Typography>
              <b>End Date:</b>
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <TextField
              type="date"
              value={EndDate}
              onChange={(e) => {
                onSelectEndDate(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <br></br>
        <br></br>

        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item xs={1}>
            <Typography>
              <b>Class:</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <DropDown
              width={"300px"}
              itemList={ClassListDropdown}
              ClickItem={onClickClass}
              DefaultValue={SelectClass}
              Label={'Select'}
            />
            <br></br>
          </Grid>
        </Grid>

        <br></br>

        <Stack spacing={3} direction="row">
          <DotLegend text="Submitted On" color="secondary" />
          <br></br>
          <DotLegend text="Approved Plan" color="info" />
          <br></br>
        </Stack>
        <br></br>
        <div>
          <Grid
            container
            spacing={2}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Grid item xs={6}>
              <ButtonPrimary variant="contained">
                <b>SAVE</b>
              </ButtonPrimary>
            </Grid>

            <Grid item xs={6}>
              <ButtonPrimary
                variant="contained"
                style={{ backgroundColor: '#4da0f7', color: 'white' }}
              >
                SUBMIT
              </ButtonPrimary>
            </Grid>
          </Grid>
        </div>
        <br></br>
        <ButtonPrimary
          variant="contained"
          onClick={onClickBack}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          BACK
        </ButtonPrimary>
      </div> */}
    </Container>
  );
};

export default AddLessonPlan;
