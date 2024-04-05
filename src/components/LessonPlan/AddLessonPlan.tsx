import Check from '@mui/icons-material/Check';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Container, Grid, IconButton, TableCell, TextField, Tooltip, Typography, alpha, styled } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { IAddOrEditLessonPlanDetailsBody, IClassListBody, ISaveApproverCommentBody, ISaveLessonPlanBody, ISubmitLessonPlanBody } from 'src/interfaces/LessonPlan/IAddLessonPlan';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { GetAddOrEditLessonPlanDetails, SaveLessonPlan, classnamelist, getSaveApproverComment, getSubmitLessonPlan, getUpdateLessonPlanDate, resetsaveLessonPlan, resetsubmitlessonplans } from 'src/requests/LessonPlan/RequestAddLessonPlan';
import { RootState } from 'src/store';
import { getCalendarDateFormatDateNew, getDateFormattedDash, isGreaterThanDate } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
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
  const { UserIdParam, StartDateParam, EndDateParam, Action } = useParams()
  // const StartDateParam = "01-Nov-2023", EndDateParam = "30-Nov-2023", IsNewMode = false
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const monday = getMonday();
  const friday = getFriday();
  const [StartDate, setStartDate] = useState(
    getCalendarDateFormatDateNew(StartDateParam == undefined ?
      monday.toISOString().split('T')[0] :
      StartDateParam
    ));
  const [EndDate, setEndDate] = useState(

    getCalendarDateFormatDateNew(EndDateParam == undefined ?
      friday.toISOString().split('T')[0] :
      EndDateParam
    ));
  const [SelectClass, setSelectClass] = useState('');
  const [ReportingUserId, setasReportingUserId] = useState('');
  const [UpdatedById, setUpdatedById] = useState('');
  const [OldStartDate, setOldStartDate] = useState('');
  const [OldEndDate, setOldEndDate] = useState('');
  const [ItemList, setItemList] = useState('');
  const [ApproverComment, setApproverComment] = useState('');
  const [errorStartDate, seterrorStartDate] = useState('');
  const [errorEndDate, seterrorEndDate] = useState('')

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));


  const [exampleLessonDetails, setExampleLessonDetails] = useState([])

  const ClassListDropdown = useSelector((state: RootState) => state.addlessonplan.ClassName);
  const AddOrEditLessonPlanDetails = useSelector((state: RootState) => state.addlessonplan.AddOrEditLessonPlanDetails);
  const TeacherName = useSelector((state: RootState) => state.addlessonplan.TeacherName);

  const ApproverDetails = useSelector((state: RootState) => state.addlessonplan.ApproverDetails);
  const SaveLessonPlans = useSelector((state: RootState) => state.addlessonplan.saveLessonPlanmsg);
  const SubmitLessonPlans = useSelector((state: RootState) => state.addlessonplan.submitLessonPlanmsg);
  const SaveApproverComment = useSelector((state: RootState) => state.addlessonplan.saveApproverCommentmsg);
  const UpdateLessonPlanDate = useSelector((state: RootState) => state.addlessonplan.updateLessonPlanDatemsg);
  const Loading = useSelector((state: RootState) => state.addlessonplan.Loading);
  console.log(AddOrEditLessonPlanDetails, "AddOrEditLessonPlanDetails");

  const getXML = () => {
    let a = []
    let asLessonPlanXML = "<ArrayOfLessonPlanDetails xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"" +
      " xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">"
    exampleLessonDetails.map((Obj, i) => {
      Obj.planDetails.map((Item, Index) => {
        a.push("<LessonPlanDetails>" +
          "<Id>0</Id>" +
          "<ReportingUserId>" + asUserId + "</ReportingUserId>" +
          "<ParameterId>" + Item.Id.toString() + "</ParameterId>" +
          "<Comment>" + Item.value + "</Comment>" +
          "<StdDivId>" + Obj.DivisionId + "</StdDivId>" +
          "<SubjectId>" + Obj.SubjectId + "</SubjectId>" +
          "<LessonPlanCategoryId>" + Item.LessonPlanCategoryId + "</LessonPlanCategoryId>" +
          "<LessonPlanSectionId>0</LessonPlanSectionId>" +
          "<SubjectCategoryId>" + Item.SubjectCategoryId + "</SubjectCategoryId>" +
          "<SubjectStartDate/><SubjectEndDate/>" +
          "</LessonPlanDetails>")
        Item.subPlanDetails.map((subItem, subIndex) => {
          a.push("<LessonPlanDetails>" +
            "<Id>0</Id>" +
            "<ReportingUserId>" + asUserId + "</ReportingUserId>" +
            "<ParameterId>" + subItem.Id.toString() + "</ParameterId>" +
            "<Comment>" + subItem.value + "</Comment>" +
            "<StdDivId>" + Obj.DivisionId + "</StdDivId>" +
            "<SubjectId>" + Obj.SubjectId + "</SubjectId>" +
            "<LessonPlanCategoryId>" + Item.LessonPlanCategoryId + "</LessonPlanCategoryId>" +
            "<LessonPlanSectionId>0</LessonPlanSectionId>" +
            "<SubjectCategoryId>" + Item.SubjectCategoryId + "</SubjectCategoryId>" +
            "<SubjectStartDate/><SubjectEndDate/>" +
            "</LessonPlanDetails>")
        })
      })
    })
    return asLessonPlanXML + a.join('') + "</ArrayOfLessonPlanDetails>"
  }

  useEffect(() => {
    const ClassListBody: IClassListBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      aTeacherId: TeacherId
    };
    dispatch(classnamelist(ClassListBody));
  }, [TeacherId]);

  const AddOrEditLessonPlanDetailBody: IAddOrEditLessonPlanDetailsBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: 0,
    asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
    asReportingUserId: asUserId,
    asStartDate: StartDate,
    asEndDate: EndDate,
    IsNewMode: Action == 'Add'
  };

  useEffect(() => {
    dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))
  }, [])
  useEffect(() => {
    if (AddOrEditLessonPlanDetails.length > 0)
      setExampleLessonDetails(AddOrEditLessonPlanDetails)
  }, [AddOrEditLessonPlanDetails])
  useEffect(() => {
    if (SaveLessonPlans !== '') {
      toast.success(SaveLessonPlans)
      dispatch(resetsaveLessonPlan())
      const AddOrEditLessonPlanDetailBody: IAddOrEditLessonPlanDetailsBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asStandardDivId: 0,
        asUserId: asUserId,
        asReportingUserId: asUserId,
        asStartDate: StartDate,
        asEndDate: EndDate,
        IsNewMode: false
      };
      dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))
      // dispatch(CDAlessonplanlist)
    }
  }, [SaveLessonPlans])

  useEffect(() => {
    if (SubmitLessonPlans !== '') {
      toast.success(SubmitLessonPlans)
      dispatch(resetsubmitlessonplans())
      dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))
    }
  }, [SubmitLessonPlans])

  useEffect(() => {
    const SaveApproverCommentBody: ISaveApproverCommentBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: Number(asUserId),
      asReportingUserId: Number(TeacherId),
      aasStartDate: StartDate,
      aasEndDate: EndDate,
      asApproverComment: ApproverComment,
      asUpdatedById: Number(UpdatedById),
      asOldStartDate: OldStartDate,
      asOldEndDate: OldEndDate,
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
  const IsFormValid = () => {
    let returnVal = true;

    if (isGreaterThanDate(StartDate, EndDate)) {
      seterrorStartDate('	Please fix following error(s):End Date should not be less than Start Date.')
      returnVal = false
    } else
      if (isGreaterThanDate(sessionStorage.getItem("StartDate"), StartDate)) {
        seterrorStartDate('Please fix following error(s): Date(s) should not be out of academic year' +
          '(i.e between ' + getDateFormattedDash(sessionStorage.getItem("StartDate")) +
          ' and ' + getDateFormattedDash(sessionStorage.getItem("EndDate")) + ')')
        returnVal = false
      } else seterrorStartDate('')
    if (isGreaterThanDate(EndDate, sessionStorage.getItem("EndDate"))
    ) {
      seterrorEndDate(' Please fix following error(s): Date(s) should not be out of academic year.' +
        '(i.e between ' + getDateFormattedDash(sessionStorage.getItem("StartDate")) +
        ' and ' + getDateFormattedDash(sessionStorage.getItem("EndDate")) + ')')
      returnVal = false
    } else seterrorEndDate('')


    return returnVal;
  };

  const onClickSave = () => {
    if (IsFormValid()) {
      const SaveLessonPlanBody: ISaveLessonPlanBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: Number(asUserId),
        asReportingUserId: Number(asUserId),
        aasStartDate: StartDate,
        aasEndDate: EndDate,
        asLessonPlanXml: getXML(),
        asUpdatedById: Number(UpdatedById),
        asOldStartDate: OldStartDate,
        asOldEndDate: OldEndDate,
      };
      dispatch(SaveLessonPlan(SaveLessonPlanBody))

    }
  };
  const onClickSubmit = () => {
    if (confirm('After this action you will not be able to change any details. Do you want to continue?')) {
      const SubmitLessonPlanBody: ISubmitLessonPlanBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: Number(asUserId),
        asReportingUserId: Number(asUserId),
        aasStartDate: StartDate,
        aasEndDate: EndDate,
        asUpdatedById: Number(UpdatedById)
      };
      dispatch(getSubmitLessonPlan(SubmitLessonPlanBody));
    }
  };

  return (
    <Container maxWidth="xl">
      <CommonPageHeader
        navLinks={[
          {
            title: 'Lesson Plans',
            path: '/extended-sidebar/Teacher/LessonPlanBaseScreen'
          },
          {
            title: 'Lesson Plan Details',
            path: ''
          }
        ]}
        rightActions={
          <>
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
                    backgroundColor: grey[500],
                    color: 'white',
                    '&:hover': {
                      backgroundColor: blue[600]
                    }
                  }}
                  onClick={onClickSubmit}
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
          </>
        }
      />
      <Box sx={{ p: 2, background: 'white' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label={<>
                Teacher <span style={{ color: 'red' }}>*</span>
              </>}
              value={TeacherName?.TeacherName}
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
              error={errorStartDate !== ''}
              helperText={errorStartDate}
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
              error={errorEndDate !== ''}
              helperText={errorEndDate}

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
          {Loading ? <SuspenseLoader /> : <Grid item xs={12}>
            <Typography variant={"h5"} mb={1}>
              Plan Details
            </Typography>

            <LessonPlanList exampleLessonDetails={exampleLessonDetails}
              onTextChange={onTextChange} Action={Action} />
          </Grid>
          }
          <Grid item xs={12}>
            <Typography variant={"h5"} mb={1}>
              Activity
            </Typography>
            {ApproverDetails?.map((Item, i) => {
              return (<Grid container key={i}>
                < Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                  <Typography color={"primary"} fontWeight={"bold"}>
                    Name:
                  </Typography>
                </Grid>
                <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                  <Typography color={"primary"}>
                    {Item.ReportingUserName}
                  </Typography>
                </Grid>
                <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={2}>
                  <Typography color={"primary"} fontWeight={"bold"}>
                    {i == 0 ? "Submitted On:" : "Approved On:"}
                  </Typography>
                </Grid>
                <Grid sx={{ border: (theme) => `1px solid ${theme.palette.primary.light}`, p: 1, background: (theme) => alpha(theme.palette.primary.main, 0.1) }} item xs={4}>
                  <Typography color={"primary"}>
                    {Item.UpdateDate}
                  </Typography>
                </Grid>
              </Grid>)
            })
            }
          </Grid>
        </Grid>
      </Box>

    </Container >
  );
};

export default AddLessonPlan;
