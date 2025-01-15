import Add from '@mui/icons-material/Add';
import Download from '@mui/icons-material/Download';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
import html2pdf from 'html2pdf.js';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import ListIcon from 'src/components/LessonPlan/ListIcon';
import {
  IAddOrEditLessonPlanDetailsBody,
  IDeleteLessonPlanBody,
  IGetAllLessonPlanReportingConfigsBody,
  IGetAllTeachersOfLessonPlanBody,
  IGetLessonPlanDetailsForReportBody,
  IGetLessonPlanListBody,
  IGetLessonPlanRecordCountBody,
  IUpdateReadSuggestionBody
} from 'src/interfaces/LessonPlan/ILessonPlanBaseScreen';
import {
  CDAAddOrEditLessonPlanDetails,
  CDAGetAllTeachersOfLessonPlan,
  CDAUpdateReadSuggestion,
  CDAlessonplanlist,
  GetLessonPlanreport,
  LessonPlanCount,
  deletelessonplan,
  resetdeleteplan
} from 'src/requests/LessonPlan/RequestLessonPlanBaseScreen';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ClearIcon } from '@mui/x-date-pickers';
import { AlertContext } from 'src/contexts/AlertContext';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import Legend from 'src/libraries/Legend/Legend';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import SearchableDropdown1 from 'src/libraries/ResuableComponents/SearchableDropdown1';
import { GetAddOrEditLessonPlanDetails } from 'src/requests/LessonPlan/RequestAddLessonPlan';
import { RootState } from 'src/store';
import { encodeURL, getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import ExportLessonPlan from './ExportLessonPlan';
import IsHighliteStaus from './LessonPlanContext';

const LessonPlanBaseScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openViewRemarkDialog, setOpenViewRemarkDialog] = useState(false);
  const [showAddLessonPlanBtn, setShowAddLessonPlanBtn] = useState(false);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const TeacherName = sessionStorage.getItem('StudentName');

  let CanEdit = getSchoolConfigurations(233)
  //console.log(CanEdit, "CanEdit");

  const { showAlert, closeAlert } = useContext(AlertContext);
  const LessonPlanList1: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISLessonList1
  );

  const [isDeleteEffectTriggered, setDeleteEffectTriggered] = useState(false);
  const [StartDate, setStartDate]: any = useState(null);
  //const [StartDate, setStartDate] = useState();
  //const [EndDate, setEndDate] = useState();
  const [EndDate, setEndDate]: any = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectClasstecahernew, setselectClasstecahernew] = useState(
    localStorage.getItem('UserId')
  );
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const rowsPerPageOptions = [20, 50, 100, 200];
  const [page, setPage] = useState(1);
  const [TeacherName1, setTeacherName1] = useState(sessionStorage.getItem('StudentName'));

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const [PagedLessonPlanList, setPagedLessonPlanList] = useState([]);
  const LessonPlanList: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISLessonList
  );



  const USGetAllLessonPlanReportingConfigs: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISGetAllLessonPlanReportingConfigs
  );

  const DeleteLessonPlan: any = useSelector(
    (state: RootState) => state.LessonPlanBase.DeletePlan
  );

  const USUpdateReadSuggestion: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISUpdateReadSuggestion
  );

  const USGetLessonPlanRecordCount: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISGetLessonPlanRecordCount
  );
  const LessonPlanReport: any = useSelector(
    (state: RootState) => state.LessonPlanBase.LessonReport
  );

  const USAddOrEditLessonPlanDetails: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISAddOrEditLessonPlanDetails
  );
  const LessonPlanListCount = useSelector(
    (state: RootState) => state.LessonPlanBase.LessonListCount1
  )

  const USGetAllTeachersOfLessonPlan: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISGetAllTeachersOfLessonPlan
  );


  const filteredList = LessonPlanListCount.filter((item) => item.RecordCount !== undefined);
  const TotalCount = filteredList.map((item) => item.RecordCount);
  const uniqueTotalCount = [...new Set(TotalCount)];
  const singleTotalCount = uniqueTotalCount[0];

  /**
  //  #region  Add Btn Visibility
   * 
   * This section controls the visibility of the Add Lesson Plan button based on user permissions
   */

  /**
   * Determines if the current user has permission to add lesson plans
   * @returns {boolean} True if user has permission, false otherwise
   */
  const showAddLessonPlan = () => {
    let flag = false;
    if (USGetAllTeachersOfLessonPlan?.length > 0) {
      const evnUserId = localStorage.getItem('UserId');
      // Filter teachers array to find if current user is a teacher
      let filterArr = USGetAllTeachersOfLessonPlan?.filter(item => item.Id === evnUserId);
      // Show button only if user is a teacher and they are viewing their own lessons
      if (filterArr.length > 0 && selectClasstecahernew === evnUserId) {
        flag = true;
      }
    }
    return flag;
  }

  /**
   * Effect hook to update Add Lesson Plan button visibility when dependencies change
   */
  useEffect(() => {
    setShowAddLessonPlanBtn(showAddLessonPlan());
  }, [USGetAllTeachersOfLessonPlan, selectClasstecahernew]);
  // #endregion

  const HeaderList1 = [
    { Id: 1, Header: 'Start Date' },
    { Id: 2, Header: 'End Date' },
    { Id: 3, Header: 'View Remarks', align: 'center' },
    { Id: 4, Header: 'Edit', align: 'center' },
    { Id: 5, Header: 'Delete', align: 'center' },
    ...(LessonPlanList.map((item) => item.Text2) != 'False' && LessonPlanList.map((item) => item.UserId) !== selectClasstecahernew ? [{ Id: 6, Header: 'View', align: 'center' }] : []),
    { Id: 7, Header: 'Export', align: 'center' },
    { Id: 8, Header: 'Status', align: 'center' }
  ];


  const GetLessonPlanListBody: IGetLessonPlanListBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asUserId: Number(selectClasstecahernew),
    asReportingUserId: asUserId,
    asStartIndex: (page - 1) * rowsPerPage,
    asEndIndex: page * rowsPerPage,
    asRecordCount: false,
    asStartDate: StartDate,
    asEndDate: EndDate

  };
  useEffect(() => {
    dispatch(CDAlessonplanlist(GetLessonPlanListBody));
  }, [StartDate, EndDate, selectClasstecahernew]);

  const GetLessonPlanlistCountBody: IGetLessonPlanListBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asUserId: Number(selectClasstecahernew),
    asReportingUserId: asUserId,
    asStartIndex: (page - 1) * rowsPerPage,
    asEndIndex: page * rowsPerPage,
    asRecordCount: true,
    asStartDate: StartDate,
    asEndDate: EndDate

  };
  useEffect(() => {
    dispatch(LessonPlanCount(GetLessonPlanlistCountBody));
  }, []);


  const GetAllLessonPlanReportingConfigsBody: IGetAllLessonPlanReportingConfigsBody = {
    asSchoolId: asSchoolId,
    asAcademicYrId: asAcademicYearId,
    asUserId: Number(selectClasstecahernew),
  }

  // import for jspd
  const [listObj, setListObj] = useState({
    userId: '',
    startDate: '',
    endDate: ''
  });
  // () => clickEdit({ UserId: item.UserId, StartDate: item.StartDate, EndDate: item.EndDate })




  const AddOrEditLessonPlanDetailsBody: IAddOrEditLessonPlanDetailsBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivId: asStandardDivisionId,
    asUserId: Number(selectClasstecahernew),
    asReportingUserId: asUserId,
    asStartDate: StartDate,
    asEndDate: EndDate,
    IsNewMode: false
  }


  const GetLessonPlanRecordCountBody: IGetLessonPlanRecordCountBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asUserId: asUserId,
    asReportingUserId: asUserId,
    asStartIndex: (page - 1) * rowsPerPage,
    asEndIndex: page * rowsPerPage,
    asStartDate: null,
    asEndDate: null
  }

  useEffect(() => {
    const GetAllTeachersOfLessonBody: IGetAllTeachersOfLessonPlanBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asReportingUserId: asUserId,
      asIsFullAccess: CanEdit// `${CanEdit == 'Y' ? 0 : selectClasstecahernew}`
    }

    dispatch(CDAGetAllTeachersOfLessonPlan(GetAllTeachersOfLessonBody));

  }, []);


  useEffect(() => {
    dispatch(CDAAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailsBody));
  }, [selectClasstecahernew]);
  // useEffect(() => {
  //   dispatch(CDAGetAllTeachersOfLessonPlan(GetAllTeachersOfLessonBody));
  // }, []);


  // const UpdateReadSuggestionBody: IUpdateReadSuggestionBody = {
  //   asSchoolId: asSchoolId,
  //   asAcadmicYearId: asAcademicYearId,
  //   asUpdatedById: asUserId,
  //   asUserId: asUserId,
  //   asStartDate: StartDate,
  //   asEndDate: EndDate
  // }

  // useEffect(() => {
  //   dispatch(CDAUpdateReadSuggestion(UpdateReadSuggestionBody));
  // }, []);

  const GetLessonPlanReportBody: IGetLessonPlanDetailsForReportBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStartDate: StartDate,
    asEndDate: EndDate,
    asUserId: asUserId,
    asStandardDivisionId: asStandardDivisionId,
    asSubjectId: 0
  };
  useEffect(() => {
    dispatch(GetLessonPlanreport(GetLessonPlanReportBody));
  }, []);

  useEffect(() => {
    if (DeleteLessonPlan !== '') {
      toast.success(DeleteLessonPlan, { toastId: 'success1' });
    }
    dispatch(resetdeleteplan());
  }, [DeleteLessonPlan]);



  // const clickDelete = (sStartDate, sEndDate) => {
  //   if (confirm('Are you sure you want to delete this record?')) {
  //     const DeleteLessonPlanBody: IDeleteLessonPlanBody = {
  //       asSchoolId: asSchoolId,
  //       asAcademicYearId: asAcademicYearId,
  //       asUpdatedById: Number(selectClasstecahernew),
  //       asUserId: Number(selectClasstecahernew),
  //       asStartDate: sStartDate,
  //       asEndDate: sEndDate,
  //     };
  //     dispatch(deletelessonplan(DeleteLessonPlanBody));
  //     dispatch(CDAlessonplanlist(GetLessonPlanListBody));

  //   }
  // }
  const clickDelete = (sStartDate, sEndDate) => {
    const DeleteLessonPlanBody: IDeleteLessonPlanBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asUpdatedById: Number(selectClasstecahernew),
      asUserId: Number(selectClasstecahernew),
      asStartDate: sStartDate,
      asEndDate: sEndDate,
    };
    showAlert({
      title: 'Please Confirm',
      message:
        'Are you sure you want to delete this record?  ',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        dispatch(deletelessonplan(DeleteLessonPlanBody));
        closeAlert();
      }
    });
  };

  useEffect(() => {
    if (DeleteLessonPlan !== '' && !isDeleteEffectTriggered) {
      toast.success(DeleteLessonPlan, { toastId: 'success1' });
      dispatch(resetdeleteplan());
      dispatch(CDAlessonplanlist(GetLessonPlanListBody));
      setDeleteEffectTriggered(true);
    }
  }, [DeleteLessonPlan, dispatch, GetLessonPlanListBody, isDeleteEffectTriggered]);

  useEffect(() => {
    if (USUpdateReadSuggestion !== '') {
      dispatch(CDAlessonplanlist(GetLessonPlanListBody));
    }
  }, [USUpdateReadSuggestion]);

  const onSelectStartDate = (value) => {
    setStartDate(value);
    if (!value) {
      const newGetStudentsToTransferMarksBody: IGetLessonPlanListBody = {
        ...GetLessonPlanListBody,
        asStartDate: null, // Set the start date to null or whatever default value you prefer
      };
      dispatch(CDAlessonplanlist(newGetStudentsToTransferMarksBody));
    }
  };

  const onSelectEndDate = (value) => {
    setEndDate(value);
    if (!value) {
      const newGetStudentsToTransferMarksBody: IGetLessonPlanListBody = {
        ...GetLessonPlanListBody,
        asEndDate: null, // Set the end date to null or whatever default value you prefer
      };
      dispatch(CDAlessonplanlist(newGetStudentsToTransferMarksBody));
      return;
    }

    // Check if end date is less than or equal to start date
    if (StartDate && new Date(value) <= new Date(StartDate)) {
      setErrorMessage('End date should be greater than start date.');
    } else {
      setErrorMessage('');
    }
  };

  const [ViewRemarks, setViewRemarks] = useState<RemarkItem[]>([]);



  const clickView = (Id, Remarks: any, sStartDate, sEndDate, sUserId) => {
    //console.log('View clicked with Id:', Id);
    //console.log('Remarks:', Remarks);
    //console.log('StartDate:', sStartDate);
    //console.log('EndDate:', sEndDate);
    //console.log('UserId:', sUserId);

    setOpenViewRemarkDialog(true);
    let formattedRemarks: RemarkItem[] = [];
    if (typeof Remarks === 'string') {
      formattedRemarks = parseRemarksFromString(Remarks);
    } else if (Array.isArray(Remarks)) {

      formattedRemarks = Remarks;
    }

    setViewRemarks(formattedRemarks);
    //  setViewRemarks(Remarks);
    if (sUserId == asUserId && LessonPlanList.some((item) => item.IsSuggisionAdded === "True" && item.IsSuggisitionRead === "False")) {
      //console.log('Condition met: Updating read suggestion');
      const UpdateReadSuggestionBody: IUpdateReadSuggestionBody = {
        asSchoolId: asSchoolId,
        asAcadmicYearId: asAcademicYearId,
        asUpdatedById: asUserId,
        asUserId: asUserId,
        asStartDate: sStartDate,
        asEndDate: sEndDate
      };
      dispatch(CDAUpdateReadSuggestion(UpdateReadSuggestionBody));
      // dispatch(CDAlessonplanlist(GetLessonPlanListBody));

    }
  };



  // const clickView = (Id, Remarks) => {
  //   setOpenViewRemarkDialog(true);
  //   setViewRemarks(Remarks);

  //   // Check if any item in LessonPlanList meets the conditions
  //   if (LessonPlanList.some((item) => item.IsSuggisionAdded === "True" && item.IsSuggisitionRead === "False")) {
  //     dispatch(CDAUpdateReadSuggestion(UpdateReadSuggestionBody));
  //   }
  // };

  const parseRemarksFromString = (remarksString: string): RemarkItem[] => {
    // Example logic to split and parse string into RemarkItem[]
    return remarksString.split('\n').map(line => {
      const [name, description] = line.split(':');
      return { name: name.trim(), description: description.trim() };
    });
  };


  const ClickSelectTeacher = (item) => {
    //console.log('teacher name', item);

    setselectClasstecahernew(item.Value);
    setTeacherName1(item.Name);
  }



  const ClickEdit = (value) => {
    let obj = {
      userId: value.UserId,
      startDate: value.StartDate,
      endDate: value.EndDate
    };
    //console.log('whats this', obj);

    navigate('/RITeSchool/Teacher/AddLessonPlan/Edit/' +
      encodeURL(value.UserId) + '/' +
      encodeURL(value.StartDate.replaceAll(' ', '-')) + '/' +
      encodeURL(value.EndDate.replaceAll(' ', '-')),
      { state: { fromInternal: true } });
  };
  const Clicknav = (value) => {
    navigate('/RITeSchool/Teacher/AddLessonPlan/View/' +
      encodeURL(value.UserId) + '/' +
      encodeURL(value.StartDate.replaceAll(' ', '-')) + '/' +
      encodeURL(value.EndDate.replaceAll(' ', '-')), { state: { fromInternal: true } }
    );
  };




  const OnClickExportAll = () => {
    dispatch(GetLessonPlanreport(GetLessonPlanReportBody));
  };
  const onClickAdd = () => {
    navigate('/RITeSchool/Teacher/AddLessonPlan/Add', { state: { fromInternal: true } });
  };

  const onClickaaaa1 = () => {
    navigate('/RITeSchool/Teacher/AddLessonPlan');
  };
  const onClickaaaa2 = () => {
    navigate('/RITeSchool/Teacher/AddHomework');
  };

  const handleOpenViewRemarkDialog = () => {
    setOpenViewRemarkDialog(true);
  }

  const stripHtmlTags = (htmlString: string): string => {

    return htmlString != "" ? htmlString.replace(/<[^>]*>?/gm, '') : "";
  };
  const itemToDisplay = LessonPlanList.length > 0 ? LessonPlanList[0] : null;

  useEffect(() => {
    setPagedLessonPlanList(LessonPlanList);
  }, [LessonPlanList])


  interface RemarkItem {
    name: string;
    description: string;
  }


  const paginatedItems = LessonPlanList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const totalRecords = LessonPlanList.length;
  const startRecord = (page - 1) * rowsPerPage + 1;
  const endRecord = Math.min(page * rowsPerPage, singleTotalCount);
  const pagecount = Math.ceil(singleTotalCount / rowsPerPage);

  const PageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const ChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  useEffect(() => {
    dispatch(CDAlessonplanlist(GetLessonPlanListBody));
  }, [page, rowsPerPage]);
  // #region Export Logic
  // Export | Print Logic
  const printRef = useRef(null);

  const clickPrint = async () => {
    if (printRef.current) {
      const element = printRef.current;

      try {
        // Fallback UUID generation function
        const generateUUID = () => {
          // Check if crypto.randomUUID is available
          if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
          }

          // Fallback UUID generation
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        };

        // Use html2pdf for better multi-page handling
        const opt = {
          margin: [10, 10, 10, 10], // top, right, bottom, left
          filename: `${generateUUID()}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            allowTaint: true,
            removeContainer: true
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
          },
          pagebreak: {
            mode: ['avoid-all', 'css', 'legacy']
          }
        };

        // Use html2pdf to generate PDF
        await html2pdf().set(opt).from(element).save();

      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
      }
    }
  };

  // For making the content selectable in PDF
  const PrintableView = () => {
    return (
      <div ref={printRef} style={{
        userSelect: 'text',  // Makes text selectable
        WebkitUserSelect: 'text',  // For webkit browsers
        MozUserSelect: 'text',  // For Firefox
        msUserSelect: 'text'  // For Internet Explorer/Edge
      }}>
        {/* Your existing content goes here */}
        {/* The content of the previous component */}
      </div>
    );
  };
  const AddOrEditLessonPlanDetails: any = useSelector((state: RootState) => state.addlessonplan.AddOrEditLessonPlanDetails);
  const [LessonPlanDetails, setLessonPlanDetails] = useState<[]>();
  const [downloadPdf, setDownloadPdf] = useState(false);
  useEffect(() => {
    if (LessonPlanDetails?.length > 0 && downloadPdf) {
      // alert('Lesson Plan Downloaded Successfully');
      clickPrint();
      setDownloadPdf(false);
    }
  }, [downloadPdf, LessonPlanDetails])
  useEffect(() => {
    if (AddOrEditLessonPlanDetails?.length > 0) {
      setLessonPlanDetails(AddOrEditLessonPlanDetails);
    }
  }, [AddOrEditLessonPlanDetails])
  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  });
  const downloadJsonToPdf = async (value) => {
    const AddOrEditLessonPlanDetailBody: IAddOrEditLessonPlanDetailsBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asStandardDivId: 0,
      asUserId: value.UserId,
      asReportingUserId: asUserId,
      asStartDate: value.StartDate,
      asEndDate: value.EndDate,
      IsNewMode: false
    };
    setDates({
      startDate: value.StartDate,
      endDate: value.EndDate
    });

    try {
      await dispatch(GetAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailBody));
      // Only call clickPrint after the dispatch is successful
      setDownloadPdf(true);
    } catch (error) {
      console.error("Error during dispatch:", error);
    }
  };

  const LegendArray = [

    {
      id: 1,
      Name: 'Submitted',
      Value:
        <CheckIcon style={{ color: 'green', fontSize: 'large', position: 'relative', top: '-1px' }} />
    },
    {
      id: 2,
      Name: 'Non Submitted',
      Value:
        <CloseIcon style={{ color: 'red', fontSize: 'large', position: 'relative', top: '-1px' }} />

    },
    {
      id: 3,
      Name: 'Not Applicable',
      Value:
        <Typography component="h5" style={{ color: 'black', margin: 0 }}>N/A</Typography>
    },
    {
      id: 4,
      Name: 'Suggestion Added',
      color: 'blue',
      Value:
        ""
    }
  ]

  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[{ title: 'Lesson Plans', path: '' }]}
          rightActions={
            <>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="left"
                gap={1}
                sx={{ flexWrap: { xs: 'nowrap', sm: 'nowrap' } }}
              >
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                >
                  {USGetAllTeachersOfLessonPlan.length > 1 && (
                    <Box sx={{ background: 'white' }}>
                      <SearchableDropdown1
                        sx={{ width: { xs: '40vw', sm: '20vw' } }}
                        ItemList={USGetAllTeachersOfLessonPlan}
                        onChange={ClickSelectTeacher}
                        label={'Select Teacher:'}
                        defaultValue={selectClasstecahernew}
                        mandatory
                        size="small"
                      />
                    </Box>
                  )}
                </Grid>
                {/* {errorMessage && (
                  <Typography variant="body2" color="error">
                    {errorMessage}
                  </Typography>
                )} */}

                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                >

                  <Box sx={{ background: 'white' }}>
                    <Datepicker
                      DateValue={StartDate}
                      onDateChange={onSelectStartDate}
                      label="Start Date"
                      size="small"
                      dateWidth={'12vw'}

                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                >
                  <Box sx={{ background: 'white' }}>
                    <Datepicker
                      DateValue={EndDate}
                      onDateChange={onSelectEndDate}
                      label="End Date"
                      size="small"
                      dateWidth={'12vw'}
                    />
                  </Box>
                </Grid>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems="left"
                  gap={1}
                  sx={{ flexWrap: { xs: 'nowrap', sm: 'nowrap' } }}
                >
                  <Grid
                    item
                    xs={12}
                    gap={1}
                    display="flex"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
                  >

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Tooltip title="Displays all available lesson plans.">
                        <IconButton
                          sx={{
                            color: 'white',
                            backgroundColor: grey[500],
                            height: '36px !important',
                            ':hover': { backgroundColor: grey[600] },
                            marginRight: '-4px',
                          }}
                        >
                          <QuestionMark />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box>
                      {(LessonPlanList.length < 0 ? LessonPlanList[0].IsSubmitted === "1" : true) && (
                        <Tooltip title="Export All">
                          <span>
                            <IconButton
                              sx={{
                                color: 'white',
                                backgroundColor: blue[500],
                                height: '36px !important',
                                ':hover': { backgroundColor: blue[600] },
                              }}
                              onClick={OnClickExportAll}
                              disabled={LessonPlanList.length <= 0}
                            >
                              <Download />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </Box>
                    <Box>
                      {showAddLessonPlanBtn ? (
                        <Tooltip title="Add Lesson Plan">
                          <IconButton
                            sx={{
                              color: 'white',
                              backgroundColor: green[500],
                              height: '36px !important',
                              ':hover': { backgroundColor: green[600] },
                              marginLeft: '-4px',
                            }}
                            onClick={onClickAdd}
                          >
                            <Add />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                    </Box>
                  </Grid>
                </Stack>
              </Stack>
            </>
          }
        />
        <Box py={0}>
          <ErrorMessage1 Error={errorMessage} />
        </Box>
        <Box sx={{ background: 'white', p: 2, mb: 1 }}>
          <Legend LegendArray={LegendArray} />
        </Box>
        <Box sx={{ background: 'white', pt: 2, pl: 2, pr: 2, pb: 2 }}>
          {LessonPlanList.length > 0 ? (
            <>
              <Box sx={{ background: 'white', }}>
                {PagedLessonPlanList.length >= 20 && singleTotalCount > rowsPerPage ? <div style={{ flex: 1, textAlign: 'center' }}>
                  <Typography variant="subtitle1" sx={{ margin: '16px 0', textAlign: 'center' }}>
                    <Box component="span" fontWeight="fontWeightBold">
                      {startRecord} to {endRecord}
                    </Box>
                    {' '}out of{' '}
                    <Box component="span" fontWeight="fontWeightBold">
                      {singleTotalCount}
                    </Box>{' '}
                    {singleTotalCount === 1 ? 'record' : 'records'}
                  </Typography>
                </div> : <span> </span>}
              </Box>
              <IsHighliteStaus.Provider value={USAddOrEditLessonPlanDetails}>
                <ListIcon
                  HeaderArray={HeaderList1}
                  ItemList={PagedLessonPlanList}
                  clickView={clickView}
                  clickEdit={ClickEdit}
                  clickDelete={clickDelete}
                  clickExport={downloadJsonToPdf}
                  CanEdit={CanEdit}
                  clicknav={Clicknav}
                  SubmitedByReportingUser={LessonPlanList.some((item) => item.SubmitedByReportingUser)}
                  ReportingConfigs={LessonPlanList1}
                  Text2={LessonPlanList.map((item) => item.Text2)}
                  ShowEdit={localStorage.getItem("UserId") === selectClasstecahernew}
                />
              </IsHighliteStaus.Provider>
              {endRecord > 19 && PagedLessonPlanList.length >= 20 && (
                <ButtonGroupComponent
                  rowsPerPage={rowsPerPage}
                  ChangeRowsPerPage={ChangeRowsPerPage}
                  rowsPerPageOptions={rowsPerPageOptions}
                  PageChange={PageChange}
                  pagecount={pagecount}
                />
              )}

            </>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No record found.</b>
            </Typography>
          )}

        </Box>
      </Box>
      <Dialog
        open={openViewRemarkDialog}
        onClose={() => setOpenViewRemarkDialog(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "15px",
          }
        }}

      >
        <DialogTitle sx={{ bgcolor: '#223354' }}>
          <ClearIcon onClick={() => setOpenViewRemarkDialog(false)}
            sx={{
              color: 'white',
              // background:'white',
              borderRadius: '7px',
              position: 'absolute',
              top: '5px',
              right: '8px',
              cursor: 'pointer',
              '&:hover': {
                color: 'red',
                //  backgroundColor: red[100]
              }
            }} />
        </DialogTitle>
        <DialogContent dividers>
          <Stack gap={1}>
            <Typography variant="h3" color="primary">View Remarks</Typography>
            <Divider />
            <Stack gap={1}>
              {ViewRemarks && (
                <>
                  {ViewRemarks.map((item, index) => (
                    <span key={index}>
                      <span style={{ fontWeight: 'bold', color: 'primary', fontSize: '1rem' }}>{item.name.split('-')[0]}</span><br />
                      <span style={{ fontWeight: '', color: 'primary', fontSize: '1rem' }}>{item.description}</span>
                      {index < ViewRemarks.length - 1 && <br />} {/* Add line break if not the last item */}
                    </span>
                  ))}
                </>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ py: 1, px: 3 }}>
          <Button
            sx={{ color: 'red', ':hover': { backgroundColor: red[100] } }}
            onClick={() => setOpenViewRemarkDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* exampleLessonDetails, onTextChange, Action, IsEditingAllowed  */}
      <span style={{ display: 'none' }}>
        <ExportLessonPlan printRef={printRef} LesssonPlanDetails={LessonPlanDetails} TeacherName={TeacherName1}
          startDate={dates.startDate} endDate={dates.endDate} />
      </span>
    </>
  );

};

export default LessonPlanBaseScreen;