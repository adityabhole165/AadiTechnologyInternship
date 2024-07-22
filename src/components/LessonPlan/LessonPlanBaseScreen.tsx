import Add from '@mui/icons-material/Add';
import Download from '@mui/icons-material/Download';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { blue, green, grey, red } from '@mui/material/colors';
// import jsPDF from 'jspdf';
import { useContext, useEffect, useState } from 'react';
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
import DotLegends2 from 'src/libraries/ResuableComponents/DotLegends2';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDAAddOrEditLessonPlanDetails,
  CDAGetAllTeachersOfLessonPlan,
  CDAGetLessonPlanRecordCount,
  CDAUpdateReadSuggestion,
  CDAlessonplanlist,
  GetLessonPlanreport,
  LessonPlanCount,
  deletelessonplan,
  resetdeleteplan
} from 'src/requests/LessonPlan/RequestLessonPlanBaseScreen';

import { AlertContext } from 'src/contexts/AlertContext';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ButtonGroupComponent from 'src/libraries/ResuableComponents/ButtonGroupComponent';
import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
import IsHighliteStaus from './LessonPlanContext';
const LessonPlanBaseScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openViewRemarkDialog, setOpenViewRemarkDialog] = useState(false);

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );
  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const TeacherName = sessionStorage.getItem('StudentName');

  let CanEdit = getSchoolConfigurations(233)
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


  const downloadJsonToPdf = () => {
    // const doc = new jsPDF();
    const jsonString = JSON.stringify(LessonPlanReport, null, 2);
    // doc.text(20, 20, 'Lesson Plan Report:');
    // doc.text(20, 30, jsonString);
    // doc.save('lesson_plan_report.pdf');
    // doc.save('sample-file.pdf')
  };



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
      setErrorMessage('End Date should be greater than Start Date');
    } else {
      setErrorMessage('');
    }
  };

  const [ViewRemarks, setViewRemarks] = useState<RemarkItem[]>([]);



  const clickView = (Id, Remarks: any, sStartDate, sEndDate, sUserId) => {
    console.log('View clicked with Id:', Id);
    console.log('Remarks:', Remarks);
    console.log('StartDate:', sStartDate);
    console.log('EndDate:', sEndDate);
    console.log('UserId:', sUserId);

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
      console.log('Condition met: Updating read suggestion');
      const UpdateReadSuggestionBody: IUpdateReadSuggestionBody = {
        asSchoolId: asSchoolId,
        asAcadmicYearId: asAcademicYearId,
        asUpdatedById: asUserId,
        asUserId: asUserId,
        asStartDate: sStartDate,
        asEndDate: sEndDate
      };
      dispatch(CDAUpdateReadSuggestion(UpdateReadSuggestionBody));
      dispatch(CDAlessonplanlist(GetLessonPlanListBody));

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


  const ClickSelctTecher = (value) => {
    setselectClasstecahernew(value)
  }



  const ClickEdit = (value) => {
    navigate('/extended-sidebar/Teacher/AddLessonPlan/Edit/' +
      value.UserId + '/' +
      value.StartDate.replaceAll(' ', '-') + '/' +
      value.EndDate.replaceAll(' ', '-'));
  };
  const Clicknav = (value) => {
    navigate('/extended-sidebar/Teacher/AddLessonPlan/View/' +
      value.UserId + '/' +
      value.StartDate.replaceAll(' ', '-') + '/' +
      value.EndDate.replaceAll(' ', '-')
    );
  };




  const OnClickExportAll = () => {
    dispatch(GetLessonPlanreport(GetLessonPlanReportBody));
  };
  const onClickAdd = () => {
    navigate('/extended-sidebar/Teacher/AddLessonPlan/Add');
  };

  const onClickaaaa1 = () => {
    navigate('/extended-sidebar/Teacher/AddLessonPlan');
  };
  const onClickaaaa2 = () => {
    navigate('/extended-sidebar/Teacher/AddHomework');
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

  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[{ title: 'Lesson Plans', path: '' }]}
          rightActions={
            <>
              {USGetAllTeachersOfLessonPlan.length > 1 && (
                <Box sx={{ background: 'white' }}>
                  <SearchableDropdown
                    sx={{ minWidth: '25vw' }}
                    ItemList={USGetAllTeachersOfLessonPlan}
                    onChange={ClickSelctTecher}
                    label={'Select Teacher:'}
                    defaultValue={selectClasstecahernew}
                    mandatory
                    size="small"
                  />
                </Box>
              )}
              {errorMessage && (
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              )}
              <Box sx={{ background: 'white' }}>
                <Datepicker
                  DateValue={StartDate}
                  onDateChange={onSelectStartDate}
                  label="Start Date"
                  size="small"
                />
              </Box>
              <Box sx={{ background: 'white' }}>
                <Datepicker
                  DateValue={EndDate}
                  onDateChange={onSelectEndDate}
                  label="End Date"
                  size="small"
                />
              </Box>
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
                {(LessonPlanList.length > 0 ? LessonPlanList[0].IsSubmitted === "1" : true) && (
                  <Tooltip title="Export All">
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: blue[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: blue[600] },
                      }}
                      onClick={OnClickExportAll}
                    >
                      <Download />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
              <Box>
                {String(asUserId) === String(selectClasstecahernew) ? (
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
            </>
          }
        />
        <Box sx={{ background: 'white', pl: 2, pt:2}}>
          <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ mb: 0, lineHeight: 'normal', alignSelf: 'center', paddingBottom: '2px' }}>Legend</Typography>
            <DotLegends2
              color="secondary"
              text=""
              text1="Submitted"
              text2="Non Submitted"
              text3="Not Applicable"
              text4="Suggestion Added"
              text5=""
            />
          </Box>
        </Box>
        <Box sx={{ background: 'white', p: 2  }}>
          {LessonPlanList.length > 0 ? (
            <>
              <Box sx={{ background: 'white'}}>
                {singleTotalCount > rowsPerPage ? <div style={{ flex: 1, textAlign: 'center' }}>
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
              {endRecord > 19 && (
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
      >
        <DialogTitle
          sx={{
            py: 1,
            backgroundColor: (theme) => theme.colors.primary.main,
            color: (theme) => theme.palette.common.white,
          }}
        />
        <DialogContent dividers>
          <Stack gap={1}>
            <Typography variant="h3" color="primary">View Remarks:</Typography>
            <Divider />
            <Stack gap={1}>
              {ViewRemarks && (
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {ViewRemarks.map((item, index) => (
                    <div key={index}>
                      <span style={{ fontWeight: 'bold', color: 'primary', fontSize: '1.2rem' }}>{item.name}</span>&nbsp;
                      <span style={{ fontWeight: '', color: 'primary', fontSize: '1.2rem' }}>{item.description}</span>
                      {index < ViewRemarks.length - 1 && <br />} {/* Add line break if not the last item */}
                    </div>
                  ))}
                </Typography>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button
            sx={{ color: 'red', ':hover': { backgroundColor: red[100] } }}
            onClick={() => setOpenViewRemarkDialog(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );

};

export default LessonPlanBaseScreen;