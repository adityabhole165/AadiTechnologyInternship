import Book from '@mui/icons-material/Book';
import Check from '@mui/icons-material/Check';
import EventAvailable from '@mui/icons-material/EventAvailable';
import HowToReg from '@mui/icons-material/HowToReg';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Save from '@mui/icons-material/Save';
import { Box, Grid, IconButton, TableCell, TextField, Tooltip, Typography, styled } from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { AlertContext } from 'src/contexts/AlertContext';
import { IAddOrEditLessonPlanDetailsBody, IClassListBody, ISaveApproverCommentBody, ISaveLessonPlanBody, ISubmitLessonPlanBody } from 'src/interfaces/LessonPlan/IAddLessonPlan';
import SuspenseLoader from 'src/layouts/components/SuspenseLoader';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import { GetAddOrEditLessonPlanDetails, SaveLessonPlan, classnamelist, getSaveApproverComment, getSubmitLessonPlan, getUpdateLessonPlanDate, resetsaveLessonPlan, resetsaveapprovercomment, resetsubmitlessonplans, resetupdatelessonplandate } from 'src/requests/LessonPlan/RequestAddLessonPlan';
import { RootState } from 'src/store';
import { ResizableTextField } from '../AddSchoolNitice/ResizableDescriptionBox';
import { GetScreenPermission, getCalendarDateFormatDateNew, getDateFormattedDash, isGreaterThanDate, isOutsideAcademicYear } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import LessonPlanActivity from './LessonPlanActivity';
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
  const { showAlert, closeAlert } = useContext(AlertContext);
  const [ActionMode, setActionMode] = useState(Action)
  const [SelectClass, setSelectClass] = useState('');
  const [ReportingUserId, setasReportingUserId] = useState('');
  const [UpdatedById, setUpdatedById] = useState('');
  const [OldStartDate, setOldStartDate] = useState(StartDateParam);
  const [OldEndDate, setOldEndDate] = useState(EndDateParam);
  const [Word, setWord] = useState('')
  const [Sentences, setSentences] = useState('')
  const [ItemList, setItemList] = useState('');
  const [ApproverComment, setApproverComment] = useState([]);
  const [errorStartDate, seterrorStartDate] = useState('');
  const [errorEndDate, seterrorEndDate] = useState('')
  const [errorMessage, seterrorMessage] = useState('')
  const [errorComment, seterrorComment] = useState('');
  const [errorOverlapDate, seterrorOverlapDate] = useState('')
  const [exampleLessonDetails, setExampleLessonDetails] = useState([])
  const [IsDarty, setIsDarty] = useState(false)
  const [errorexampleLessonDetails, seterrorexampleLessonDetails] = useState('')
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const asReportingUserId = Number(sessionStorage.getItem('asReportingUserId'));
  const [ApprovalCommentData, setApprovalCommentData] = useState([])

  const ClassListDropdown = useSelector((state: RootState) => state.addlessonplan.ClassName);
  const AddOrEditLessonPlanDetails = useSelector((state: RootState) => state.addlessonplan.AddOrEditLessonPlanDetails);
  const TeacherName = useSelector((state: RootState) => state.addlessonplan.TeacherName);
  const ApproverDetails: any = useSelector((state: RootState) => state.addlessonplan.ApproverDetails);
  const ApprovalData: any = useSelector((state: RootState) => state.addlessonplan.ApprovalData);

  const SubmittedApproverDate: any = useSelector((state: RootState) => state.addlessonplan.SubmittedApproverDate);
  const SaveLessonPlans = useSelector((state: RootState) => state.addlessonplan.saveLessonPlanmsg);
  const SubmitLessonPlans = useSelector((state: RootState) => state.addlessonplan.submitLessonPlanmsg);
  const SaveApproverComment = useSelector((state: RootState) => state.addlessonplan.saveApproverCommentmsg);
  const UpdateLessonPlanDate = useSelector((state: RootState) => state.addlessonplan.updateLessonPlanDatemsg);
  const GetEnableButtonList: any = useSelector((state: RootState) => state.addlessonplan.GetEnableButtonList);
  const LessonPlanPhrasesList: any = useSelector((state: RootState) => state.addlessonplan.GetLessonPlanPhrasesList);
  console.log(LessonPlanPhrasesList, "LessonPlanPhrasesList");

  const Loading = useSelector((state: RootState) => state.addlessonplan.Loading);

  // const EnableSaveButton = GetEnableButtonList.EnableSaveButton;
  // const EnableSubmitButton = GetEnableButtonList.EnableSubmitButton;
  let perm = GetScreenPermission('Lesson Plan')

  useEffect(() => {
    setApproverComment(SubmittedApproverDate)
  }, [SubmittedApproverDate])

  useEffect(() => {
    setApprovalCommentData(ApprovalData)
  }, [ApprovalData])

  function getXML() {
    let a = [];
    let asLessonPlanXML = "<ArrayOfLessonPlanDetails xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"" +
      " xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\">";
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
          "</LessonPlanDetails>");
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
            "</LessonPlanDetails>");
        });
      });
    });
    return asLessonPlanXML + a.join('') + "</ArrayOfLessonPlanDetails>";
  }

  useEffect(() => {
    const ClassListBody: IClassListBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
    };
    dispatch(classnamelist(ClassListBody));
  }, [TeacherId]);

  useEffect(() => {
    if (ClassListDropdown.length > 0) {
      setSelectClass(ClassListDropdown[0].Value);
    }
  }, [ClassListDropdown]);

  const AddOrEditLessonPlanDetailBody: IAddOrEditLessonPlanDetailsBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: 0,
    asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
    asReportingUserId: asUserId,
    asStartDate: StartDate,
    asEndDate: EndDate,
    IsNewMode: ActionMode == 'Add'
  };

  useEffect(() => {
    if (SelectClass == '0')
      dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))
  }, [SelectClass])

  useEffect(() => {
    if (AddOrEditLessonPlanDetails.length > 0)
      setExampleLessonDetails(AddOrEditLessonPlanDetails)
  }, [AddOrEditLessonPlanDetails])
  useEffect(() => {
    if (SaveLessonPlans !== '') {
      toast.success(SaveLessonPlans);
      setIsDarty(false);
      if (SaveLessonPlans === "Lesson Plan not saved...!") {
        seterrorOverlapDate("Lesson plan date range should not overlap on another lesson plan.");
      } else {
        seterrorOverlapDate("");
        setOldStartDate(StartDate)
        setOldEndDate(EndDate)
        const AddOrEditLessonPlanDetailBody: IAddOrEditLessonPlanDetailsBody = {
          asSchoolId: asSchoolId,
          asAcademicYearId: asAcademicYearId,
          asStandardDivId: 0,
          asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
          asReportingUserId: asUserId,
          asStartDate: StartDate,
          asEndDate: EndDate,
          IsNewMode: false
        };
        dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))
      }
      dispatch(resetsaveLessonPlan());

      // dispatch(CDAlessonplanlist)
      // setIsSubmitDisabled(false);
    }
  }, [SaveLessonPlans, GetAddOrEditLessonPlanDetails, GetEnableButtonList])

  useEffect(() => {
    if (SubmitLessonPlans !== '') {
      toast.success(SubmitLessonPlans)
      dispatch(resetsubmitlessonplans())
      dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))

    }
  }, [SubmitLessonPlans])

  useEffect(() => {
    if (SaveApproverComment !== '') {
      toast.success(SaveApproverComment)
      dispatch(resetsaveapprovercomment())
      dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))

    }
  }, [SaveApproverComment])
  useEffect(() => {
    if (UpdateLessonPlanDate !== '') {
      toast.success(UpdateLessonPlanDate)
      if (UpdateLessonPlanDate === "Lesson plan date not updated...!") {
        seterrorOverlapDate("Date range of this Lesson plan should not overlap on another lesson plan.");
      } else {
        seterrorOverlapDate("");
        setOldStartDate(StartDate)
        setOldEndDate(EndDate)
        const AddOrEditLessonPlanDetailBody: IAddOrEditLessonPlanDetailsBody = {
          asSchoolId: asSchoolId,
          asAcademicYearId: asAcademicYearId,
          asStandardDivId: 0,
          asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
          asReportingUserId: asUserId,
          asStartDate: StartDate,
          asEndDate: EndDate,
          IsNewMode: false
        };
        dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))
      }


      dispatch(resetupdatelessonplandate())
    }
  }, [UpdateLessonPlanDate])

  const onSelectStartDate = (value) => {
    setStartDate(value);
  };
  const onSelectEndDate = (value) => {
    setEndDate(value);
  };
  const onClickClass = (value) => {

    setSelectClass(value);

    const filteredLessonPlanDetails = AddOrEditLessonPlanDetails.filter((detail) => detail.DivisionId === value);

    setExampleLessonDetails(filteredLessonPlanDetails);

  };

  const onClickBack = () => {
    navigate('/extended-sidebar/Teacher/LessonPlanBaseScreen');
  };

  const onTextChange = (value) => {
    setIsDarty(true)
    setExampleLessonDetails(value)

  }
  const IsFormValid = () => {
    let returnVal = true;
    console.log(new Date(StartDate), "====", new Date(EndDate));
    console.log(isGreaterThanDate(StartDate, EndDate));

    if (isGreaterThanDate(StartDate, EndDate)) {

      seterrorMessage('End Date should not be less than Start Date.')
      returnVal = false
    } else {
      if (isOutsideAcademicYear(StartDate)) {

        seterrorMessage('Date(s) should not be out of academic year' +
          '(i.e between ' + getDateFormattedDash(sessionStorage.getItem("StartDate")) +
          ' and ' + getDateFormattedDash(sessionStorage.getItem("EndDate")) + ')')
        returnVal = false

      } else
        if (isOutsideAcademicYear(EndDate)) {

          seterrorMessage('Date(s) should not be out of academic year.' +
            '(i.e between ' + getDateFormattedDash(sessionStorage.getItem("StartDate")) +
            ' and ' + getDateFormattedDash(sessionStorage.getItem("EndDate")) + ')')
          returnVal = false

        } else seterrorMessage('')
    }
    let IsPlan = false;
    exampleLessonDetails.map((Item) => {
      Item.planDetails.map((planItem) => {
        if (planItem.value !== '') {
          IsPlan = true;
        }
        planItem.subPlanDetails.map((subPlanItem) => {
          if (subPlanItem.value !== '') {
            IsPlan = true;
          }
        });
      });
    });

    if (!IsPlan) {
      seterrorexampleLessonDetails("Lesson Plan should be set for at least one parameter.");
      returnVal = false;
    } else {
      seterrorexampleLessonDetails("");
    }

    // if (!getIsApproverComment()) {
    //   seterrorComment("Please fix the following error(s): Comment should not be blank.");
    //   returnVal = false;
    // }
    // else
    //   seterrorComment("")
    // if (EndDate) {
    //   seterrorOverlapDate("Lesson plan date range should not overlap on another lesson plan.");
    //   returnVal = false;
    // } else {
    //   seterrorOverlapDate("");
    // }

    return returnVal;
  };

  const getIsApproverComment = () => {
    let returnVal = true
    ApprovalCommentData.map((Item, i) => {
      if (Item.ApprovalSortOrder != "0" && Item.ReportingUserId == asUserId) {
        if (Item.Text5 == "") {
          returnVal = false
        }
      }
    })
    return returnVal
  }

  const getIsApproved = () => {
    let returnVal = false
    ApprovalCommentData.map((Item, i) => {
      if (Item.ApprovalSortOrder != "0" && Item.ReportingUserId == asUserId) {
        returnVal = Item.IsPublished == "True"
      }
    })
    return returnVal
  }
  const getIsApproveAll = () => {
    let returnVal = false
    ApprovalCommentData.map((Item, i) => {
      if (Item.ApprovalSortOrder != "0") {
        returnVal = Item.IsPublished == "True"
      }
    })
    return returnVal
  }
  const getIsUpdateVisible = () => {
    let returnVal, enableSubmitButton, enableSaveButton, IsReportingUser = false
    let iIsPublished = "0"
    if (GetEnableButtonList.length > 0) {
      enableSubmitButton = GetEnableButtonList[0].EnableSubmitButton == "True"
      enableSaveButton = GetEnableButtonList[0].EnableSaveButton == "True"
    }

    if (SubmittedApproverDate.length > 0) {
      IsReportingUser = SubmittedApproverDate[0].IsReportingUser == "True"
      iIsPublished = SubmittedApproverDate[0].LessonPlanXML
    }
    if (UserIdParam != sessionStorage.getItem("Id") && iIsPublished == "0") {
      if (IsReportingUser) {
        if (!enableSubmitButton) {
          returnVal = true
        }
      } else
        if ((!enableSubmitButton && !enableSaveButton) ||
          (enableSubmitButton && !enableSaveButton)) {
          returnVal = true
        }

    }
    return returnVal;
  }
  const onClickSave = () => {
    if (IsApprover())
      if (!getIsApproverComment()) {
        seterrorComment("Please fix the following error(s): Comment should not be blank.");
      }
      else {
        seterrorComment('')
        clickSaveApproverComments()
      }
    else
      if (IsFormValid()) {
        const SaveLessonPlanBody: ISaveLessonPlanBody = {
          asSchoolId: asSchoolId,
          asAcademicYearId: asAcademicYearId,
          asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
          asReportingUserId: Number(asUserId),
          aasStartDate: StartDate,
          aasEndDate: EndDate,
          asLessonPlanXml: getXML(),
          asUpdatedById: Number(UpdatedById),
          asOldStartDate: StartDateParam,
          asOldEndDate: EndDateParam,
        };
        dispatch(SaveLessonPlan(SaveLessonPlanBody))

        setActionMode('Edit')

      }
  };
  const [message, setMessage] = useState("");
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (IsDarty) {
        onClickSave();
        setMessage("We are saving lesson plan details, please wait.");
      }
    }, 60000);

    return () => clearInterval(autoSave);
  }, [IsDarty, onClickSave]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        if (IsDarty) {
          setMessage("");
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const getApproverComment = () => {
    let returnVal = ""
    ApprovalCommentData.map((Item, i) => {
      if (Item.ApprovalSortOrder != 0 && Item.ReportingUserId == asUserId) {
        returnVal = Item.Text5
      }
    })

    return returnVal
  }

  const IsApprover = () => {
    let returnVal = false
    ApprovalCommentData.map((Item, i) => {
      if (Item.ApprovalSortOrder != 0 && Item.ReportingUserId == asUserId) {
        returnVal = true
      }
    })
    return returnVal
  }
  const IsSubmitter = () => {
    let returnVal = false
    ApprovalCommentData.map((Item, i) => {
      if (Item.ApprovalSortOrder == 0 && Item.ReportingUserId == asUserId) {
        returnVal = true
      }
    })
    return returnVal
  }

  const onClickSubmit = () => {
    const SubmitLessonPlanBody: ISubmitLessonPlanBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
      asReportingUserId: Number(asUserId),
      aasStartDate: StartDate,
      aasEndDate: EndDate,
      asUpdatedById: Number(UpdatedById)
    };
    showAlert({
      title: 'Please Confirm',
      message: 'After this action you will not be able to change any details. Do you want to continue?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(getSubmitLessonPlan(SubmitLessonPlanBody));
        closeAlert();
      }
    });
  };
  const onClickApprover = () => {
    const SubmitLessonPlanBody: ISubmitLessonPlanBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
      asReportingUserId: Number(asUserId),
      aasStartDate: StartDate,
      aasEndDate: EndDate,
      asUpdatedById: Number(UpdatedById)
    };
    showAlert({
      title: 'Please Confirm',
      message: 'After this action you will not be able to change any details. Do you want to continue?',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(getSubmitLessonPlan(SubmitLessonPlanBody));
        closeAlert();
      }
    });

  };
  const onClickUpdateDate = () => {
    if (IsFormValid()) {
      const UpdateLessonPlanDateBody: ISaveApproverCommentBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
        asReportingUserId: Number(asUserId),
        aasStartDate: StartDate,
        aasEndDate: EndDate,
        asApproverComment: getApproverComment(),
        asUpdatedById: Number(UpdatedById),
        asOldStartDate: OldStartDate,
        asOldEndDate: OldEndDate,
      };

      dispatch(getUpdateLessonPlanDate(UpdateLessonPlanDateBody));
      // dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody))
      // dispatch(CDAlessonplanlist)
    }
  };
  const onChangeApproverComment = (value, index) => {
    setApprovalCommentData(ApprovalData.map((Item, i) => {
      return i == index ? { ...Item, Text5: value } : Item
    }))
    if (value != "") {
      seterrorComment('')
    }
  };

  const clickSaveApproverComments = () => {
    const SaveApproverCommentBody: ISaveApproverCommentBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUserId: Number(Action == 'Add' ? sessionStorage.getItem('Id') : UserIdParam),
      asReportingUserId: Number(asUserId),
      aasStartDate: StartDate,
      aasEndDate: EndDate,
      asApproverComment: getApproverComment(),
      asUpdatedById: Number(UpdatedById),
      asOldStartDate: StartDate,
      asOldEndDate: EndDate,
    };
    dispatch(getSaveApproverComment(SaveApproverCommentBody))

  }
  const IsShowApprove = () => {
    let isShowApprove = false;

    ApprovalCommentData?.map((Item, Index) => {
      if (Item.ApprovalSortOrder != "0") {
        if (Item.ReportingUserId == asUserId) {
          isShowApprove = true;
        }
      }
    });

    return isShowApprove;

  };
  const IsEditingAllowed = () => {
    let returnVal = false;
    ApprovalCommentData?.map((Item, Index) => {
      if (Item.ApprovalSortOrder == "0") {
        if (Item.ReportingUserId == asUserId) {
          returnVal = !(Item.IsPublished == "True");
        }
      }
    });
    return returnVal;
  };

  const OpenWindow = (sfilepath) => {
    window.open(sfilepath, '_new', 'scrollbars=yes,resizable=yes,top=0,left=0,width=800,height=600');
    return false;
  }
  const GetEnableStatus = () => {
    let returnVal = false
    if (IsSubmitter()) {
      returnVal = GetEnableButtonList.length > 0 &&
        GetEnableButtonList[0].EnableSaveButton == "False"
    }
    return returnVal
  }
  const FileLink = ({ filePath, fileName }) => {
    const handleClick = () => {
      OpenWindow(filePath);
    };

    return (
      <span onClick={handleClick} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>{fileName}</span>
    );
  };
  console.log(LessonPlanPhrasesList.join(', ').text1, "******LessonPlanPhrasesList");

  const [wordsentence, setwordsentence] = useState('')
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered data based on search query
  const filteredWords = LessonPlanPhrasesList.filter((item) =>
    item.IsPhrase === 'False' &&
    item.Title.toLowerCase().includes(wordsentence.toLowerCase()))
    .map((item) => item.Title)
    .join(', ');

  const filteredSentences = LessonPlanPhrasesList.filter((item) =>
    item.IsPhrase === 'True' &&
    item.Title.toLowerCase().includes(wordsentence.toLowerCase()))
    .map((item) => item.Title)
    .join(', ');

  return (
    <Box sx={{ px: 2 }} maxWidth="xl">
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
            {/* <Box>
              <Tooltip title={'Translation Tool'}>
                <IconButton
                  sx={{
                    backgroundColor: grey[500],
                    color: 'white',
                    '&:hover': {
                      backgroundColor: grey[600]
                    }
                  }}
                  onClick={() => {
                    OpenWindow("http://web.aaditechnology.info/RITESchool/DOWNLOADS/Lesson Plan/InputToolsSetup.exe")
                  }}
                >
                  <Translate />
                </IconButton>
              </Tooltip>
            </Box> */}
            <Box>
              <Tooltip title={'Translation Guide'}>
                <IconButton
                  sx={{
                    backgroundColor: blue[500],
                    color: 'white',
                    '&:hover': {
                      backgroundColor: blue[600]
                    }
                  }}
                  onClick={() => {
                    OpenWindow("http://web.aaditechnology.info/riteschool/DOWNLOADS/Lesson%20Plan/GOOGLE%20TOOL%20GUIDE.pdf")
                  }}
                >
                  <Book />
                </IconButton>
              </Tooltip>
            </Box>

            {(Action == "Add" || Action == "Edit") &&

              <Box>
                <Tooltip title={'Submit'}>
                  <IconButton
                    disabled={(GetEnableButtonList.length > 0 &&
                      GetEnableButtonList[0].EnableSubmitButton == "False")}
                    sx={{
                      backgroundColor: green[500],
                      color: 'white',
                      '&:hover': {
                        backgroundColor: green[600]
                      }
                    }}
                    onClick={onClickSubmit}
                  >
                    <Check />
                  </IconButton>
                </Tooltip>
              </Box>}
            {(UserIdParam == sessionStorage.getItem("Id") ||
              (GetEnableButtonList.length > 0 && GetEnableButtonList[0].EnableSaveButton == "True") ||
              (IsApprover() && !getIsApproved()) ||
              Action == "Add") &&
              < Box >
                <Tooltip title={'Save'}>
                  <IconButton
                    disabled={GetEnableStatus()}
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
            }

            {(IsApprover() && !getIsApproved()) &&

              < Box > <Tooltip title={'Approve'}>
                <IconButton
                  sx={{
                    backgroundColor: green[500],
                    color: 'white',
                    '&:hover': {
                      backgroundColor: green[600]
                    }
                  }}
                  onClick={onClickApprover}
                >
                  <HowToReg />
                </IconButton>

              </Tooltip>
              </Box>}

            {Action == "View" && getIsUpdateVisible() && (
              <Box>
                <Tooltip title={'Update Date'}>
                  <IconButton
                    sx={{
                      backgroundColor: green[500],
                      color: 'white',
                      '&:hover': {
                        backgroundColor: green[600]
                      }
                    }}
                    onClick={onClickUpdateDate}

                  >
                    <EventAvailable />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </>


        }
      />


      {/* <FileLink filePath="http://web.aaditechnology.info/RITESchool/DOWNLOADS/Lesson Plan/InputToolsSetup.exe" fileName="Translation Tool" />
      <FileLink filePath="http://web.aaditechnology.info/riteschool/DOWNLOADS/Lesson%20Plan/GOOGLE%20TOOL%20GUIDE.pdf" fileName="Translation Guide" /> */}
      <Box sx={{ p: 2, background: 'white' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              InputLabelProps={{ shrink: true }}
              label={<>
                Teacher <span style={{ color: 'red' }}>*</span>
              </>}
              sx={{ bgcolor: '#F0F0F0' }}
              InputProps={{
                readOnly: true,
              }}
              value={TeacherName?.TeacherName}
            />
          </Grid>
          <Grid item xs={3}>
            {/* <TextField
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
            // error={errorStartDate !== ''}
            // helperText={errorStartDate}
            /> */}
            <Datepicker
              DateValue={StartDate}
              onDateChange={onSelectStartDate}
              label={'Start Date'}
              size={"medium"}
            />

          </Grid>
          <Grid item xs={3}>
            {/* <TextField
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
            // error={errorEndDate !== ''}
            // helperText={errorEndDate}

            /> */}
            <Datepicker DateValue={EndDate} onDateChange={onSelectEndDate} label={'End Date'} size={"medium"} />
          </Grid>
          <Grid item xs={3}>
            <SearchableDropdown
              ItemList={ClassListDropdown}
              defaultValue={SelectClass}
              label='Class'
              mandatory
              sx={{ minWidth: '20vw' }}
              onChange={onClickClass}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              sx={{ width: '23vw' }}
              fullWidth
              label="Search Word / Sentence"
              value={wordsentence}
              variant="outlined"
              size="small"
              onChange={(e) => setwordsentence(e.target.value)}
            />
          </Grid>

          {LessonPlanPhrasesList.length !== 0 && (
            <>

              {/* <Grid container spacing={2}> */}
              <Grid item xs={6}>
                <ResizableTextField
                  label="Words"
                  multiline
                  rows={3}
                  value={filteredWords}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <ResizableTextField
                  label="Sentences"
                  multiline
                  rows={3}
                  value={filteredSentences}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              {/* </Grid> */}
            </>
          )}



          {/* {errorexampleLessonDetails || errorMessage && ( */}
          {message && (
            <Typography style={{ position: "fixed", top: "50%", left: "50%", padding: "10px", backgroundColor: "#e8eaf6", border: "1px solid #ccc", zIndex: 9999, width: '500px', font: "20px" }}>
              {message}
            </Typography>

          )}
          <Grid item xs={12}>
            <Typography variant={"h5"} sx={{ color: 'red' }}>
              {errorexampleLessonDetails}<br></br>
              {errorMessage}<br></br>
              {errorComment}
              {errorStartDate} {errorOverlapDate}
            </Typography>
          </Grid>
          {/* )} */}
          {Loading ? <SuspenseLoader /> : <Grid item xs={12}>
            <Typography variant={"h5"} mb={1}>
              Plan Details
            </Typography>

            <LessonPlanList exampleLessonDetails={exampleLessonDetails}
              onTextChange={onTextChange} Action={Action}
              IsEditingAllowed={IsEditingAllowed()} />
          </Grid>
          }
          <Grid item xs={12}>
            <LessonPlanActivity ApprovalData={ApprovalCommentData}
              errorComment={errorComment} onChangeApproverComment={onChangeApproverComment} />

          </Grid>
        </Grid>
      </Box>

    </Box >
  );
};

export default AddLessonPlan;
