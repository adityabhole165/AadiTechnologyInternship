import Add from '@mui/icons-material/Add';
import Download from '@mui/icons-material/Download';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Pagination, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
// import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  IAddOrEditLessonPlanDetailsBody,
  IDeleteLessonPlanBody,
  IGetAllLessonPlanReportingConfigsBody,
  IGetAllTeachersOfLessonPlanBody,
  IGetLessonPlanDetailsForReportBody,
  IGetLessonPlanListBody
} from 'src/interfaces/LessonPlan/ILessonPlanBaseScreen';
import DotLegends2 from 'src/libraries/ResuableComponents/DotLegends2';
import ListIcon from 'src/libraries/ResuableComponents/ListIcon';
import SearchableDropdown from 'src/libraries/ResuableComponents/SearchableDropdown';
import {
  CDAAddOrEditLessonPlanDetails,
  CDAGetAllTeachersOfLessonPlan,
  CDAlessonplanlist,
  GetLessonPlanreport,
  deletelessonplan,
  resetdeleteplan
} from 'src/requests/LessonPlan/RequestLessonPlanBaseScreen';

import { RootState } from 'src/store';
import { getSchoolConfigurations } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';
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

  const [isDeleteEffectTriggered, setDeleteEffectTriggered] = useState(false);

  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [selectClasstecahernew, setselectClasstecahernew] = useState(
    localStorage.getItem('UserId')
  );


  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const LessonPlanList: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISLessonList
  );

  const LessonPlanList1: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISLessonList1
  );


  console.log(LessonPlanList, "LessonPlanList");


  const USGetAllLessonPlanReportingConfigs: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISGetAllLessonPlanReportingConfigs
  );



  const DeleteLessonPlan: any = useSelector(
    (state: RootState) => state.LessonPlanBase.DeletePlan
  );

  const LessonPlanReport: any = useSelector(
    (state: RootState) => state.LessonPlanBase.LessonReport
  );

  const USAddOrEditLessonPlanDetails: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISAddOrEditLessonPlanDetails
  );

  console.log(USAddOrEditLessonPlanDetails, "USAddOrEditLessonPlanDetails");


  const USGetAllTeachersOfLessonPlan: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISGetAllTeachersOfLessonPlan
  );

  const GetScreenPermission = () => {
    let perm = 'N';
    ScreensAccessPermission?.map((item) => {
      if (item.ScreenName === 'LessonPlan') perm = item.IsFullAccess;
    });
    return perm;
  };



  const HeaderList1 = [
    { Id: 1, Header: 'Start Date' },
    { Id: 2, Header: 'End Date' },
    { Id: 3, Header: 'View Remark', align: 'center' },
    { Id: 4, Header: 'Edit', align: 'center' },
    { Id: 5, Header: 'Delete', align: 'center' },
    ...(CanEdit === 'Y' && LessonPlanList.map((item) => item.Text2) != 'False' ? [{ Id: 6, Header: 'View', align: 'center' }] : []),
    { Id: 7, Header: 'Export', align: 'center' },
    { Id: 8, Header: 'Submit Status', align: 'center' }
  ];

  const GetLessonPlanListBody: IGetLessonPlanListBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asUserId: Number(selectClasstecahernew),
    asReportingUserId: asUserId,
    asStartIndex: 0,
    asEndIndex: 20,
    asRecordCount: false,
    asStartDate: StartDate,
    asEndDate: EndDate

  };
  useEffect(() => {
    dispatch(CDAlessonplanlist(GetLessonPlanListBody));
  }, [StartDate, EndDate]);


  


  useEffect(() => {

    if (CanEdit == 'Y') {
      dispatch(CDAlessonplanlist(GetLessonPlanListBody));

    }
  }, [selectClasstecahernew]);


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
    asUserId: asUserId,
    asReportingUserId: asUserId,
    asStartDate: StartDate,
    asEndDate: EndDate,
    IsNewMode: false
  }


  useEffect(() => {
    const GetAllTeachersOfLessonBody: IGetAllTeachersOfLessonPlanBody = {
      asSchoolId: asSchoolId,
      asAcademicYearId: asAcademicYearId,
      asReportingUserId: asUserId,
      asIsFullAccess: `${GetScreenPermission() == 'Y' ? 0 : selectClasstecahernew}`
    }

    dispatch(CDAGetAllTeachersOfLessonPlan(GetAllTeachersOfLessonBody));

  }, []);





  useEffect(() => {
    dispatch(CDAAddOrEditLessonPlanDetails(AddOrEditLessonPlanDetailsBody));
  }, []);
  // useEffect(() => {
  //   dispatch(CDAGetAllTeachersOfLessonPlan(GetAllTeachersOfLessonBody));
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



  const clickDelete = (sStartDate, sEndDate) => {
    if (confirm('Are you sure you want to delete this record?')) {
      const DeleteLessonPlanBody: IDeleteLessonPlanBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUpdatedById: Number(selectClasstecahernew),
        asUserId: Number(selectClasstecahernew),
        asStartDate: sStartDate,
        asEndDate: sEndDate,
      };
      dispatch(deletelessonplan(DeleteLessonPlanBody));
      dispatch(CDAlessonplanlist(GetLessonPlanListBody));

    }
  }

  useEffect(() => {
    if (DeleteLessonPlan !== '' && !isDeleteEffectTriggered) {
      toast.success(DeleteLessonPlan, { toastId: 'success1' });
      dispatch(resetdeleteplan());
      dispatch(CDAlessonplanlist(GetLessonPlanListBody));
      setDeleteEffectTriggered(true);
    }
  }, [DeleteLessonPlan, dispatch, GetLessonPlanListBody, isDeleteEffectTriggered]);

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





  const [ViewRemarks, setViewRemarks] = useState('')
  const clickView = (Id, Remarks) => {
    setOpenViewRemarkDialog(true);
    setViewRemarks(Remarks)
  }

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
  console.log(itemToDisplay, "itemToDisplay");

  const [page, setPage] = useState(1);


  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const itemsPerPage = 10;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const newGetStudentsToTransferMarksBody: IGetLessonPlanListBody = {
      ...GetLessonPlanListBody,
      asStartIndex: startIndex,
      asEndIndex: endIndex

    };

    dispatch(CDAlessonplanlist(newGetStudentsToTransferMarksBody));
  }, [page]);



  return (
    <>
      <Box sx={{ px: 2 }}>
        <CommonPageHeader
          navLinks={[
            {
              title: 'Lesson Plans',
              path: ''
            }
          ]}
          rightActions={
            <>
              <Box sx={{ background: 'white' }}>
                {CanEdit == 'Y' && (
                  <Box sx={{ background: 'white' }}>
                    <SearchableDropdown
                      sx={{ minWidth: '300px' }}
                      ItemList={USGetAllTeachersOfLessonPlan}
                      onChange={ClickSelctTecher}
                      label={'Select Teacher:'}
                      defaultValue={selectClasstecahernew}
                      mandatory
                      size={"small"}
                    />
                  </Box>
                )}
              </Box>

              {errorMessage && (
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              )}
              <Box sx={{ background: 'white' }}>
                <TextField
                  value={StartDate}
                  type='date'
                  onChange={(e) => { onSelectStartDate(e.target.value) }}
                  label={'Start Date'}
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}

                />

              </Box>

              <Box sx={{ background: 'white' }}>
                <TextField
                  value={EndDate}
                  type='date'
                  onChange={(e) => { onSelectEndDate(e.target.value) }}
                  label={'End Date'}
                  size="small"
                  InputLabelProps={{
                    shrink: true
                  }}

                />
              </Box>
              <Box>
                <Tooltip title={"Displays all available lesson plans."}>
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
              <Box>

                {LessonPlanList.length > 0 ? (
                  <Tooltip title="Export All">
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: grey[600] }
                      }}
                      onClick={OnClickExportAll}
                    >
                      <Download />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Export All">
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: grey[600] },
                        pointerEvents: 'none', // Disables pointer events when LessonPlanList is empty
                        opacity: 0.5 // Makes the button visually disabled
                      }}
                    >
                      <Download />
                    </IconButton>
                  </Tooltip>
                )}


              </Box>
              <Box>
                {String(asUserId) == String(selectClasstecahernew) && LessonPlanList.length > 0 ? (
                  <Tooltip title={"Add new Lesson Plan"}>
                    <IconButton
                      sx={{
                        color: 'white',
                        backgroundColor: grey[500],
                        height: '36px !important',
                        ':hover': { backgroundColor: grey[600] }
                      }}
                      onClick={onClickAdd}
                    >
                      <Add />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <span></span>
                )}
              </Box>


            </>
          }
        />
        <Box sx={{ background: 'white', p: 2 }}>
          {/* <Typography variant={'h4'} mb={1}>
            My Subjects
          </Typography> */}
          {LessonPlanList.length > 0 ? (
            <ListIcon
              HeaderArray={HeaderList1}
              ItemList={LessonPlanList}
              clickView={clickView}
              clickEdit={ClickEdit}
              clickDelete={clickDelete}
              clickExport={downloadJsonToPdf}
              CanEdit={CanEdit}
              clicknav={Clicknav}
              SubmitedByReportingUser={LessonPlanList.some((item) => item.SubmitedByReportingUser)}
              ReportingConfigs={LessonPlanList1}
              Text2={LessonPlanList.map((item) => item.Text2)}
              ShowEdit={localStorage.getItem("UserId") == selectClasstecahernew}

            />



          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 1, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No Record Found.</b>
            </Typography>
          )}

          {LessonPlanList.length > 0 ? (

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              Select a page:
              {/* <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button value={"1"} onClick={() => handlePageChange("1")}>1</Button>
                <Button value={"2"} onClick={() => handlePageChange("2")}>2</Button>
              </ButtonGroup> */}

              <Pagination
                                count={5}
                                variant={"outlined"}
                                shape='rounded' showFirstButton
                                showLastButton
                                onChange={(event, value) => {
                                    handlePageChange(value);
                                }}
                            />

            </Box>
          ) : (<span></span>)
          }

          <Box sx={{ display: 'flex', gap: '20px', mt: 2 }}>
            <DotLegends2
              color="secondary"
              text={''}
              text1={'Submited'}
              text2={'Non Submited'}
              text3={'Not Applicable'}
              text4={'Suggestion Added'}
              text5={''}
            />
          </Box>
        </Box>

      </Box>

      {/* View remark dialog */}
      <Dialog
        open={openViewRemarkDialog}
        onClose={() => {
          setOpenViewRemarkDialog(false);
        }}
        maxWidth={"xs"}
        fullWidth
      >
        <DialogTitle
          sx={{
            py: 1,
            backgroundColor: (theme) => theme.colors.primary.main,
            color: (theme) => theme.palette.common.white
          }}
        />
        <DialogContent dividers>
          <Stack gap={1}>
            <Typography variant={"h3"} color={"primary"}>View Remark: </Typography>
            <Divider />
            <Stack gap={1}>
              <div>
                <Typography variant={"h4"} style={{ marginBottom: '10px' }}>
                  {stripHtmlTags(ViewRemarks)}
                </Typography>
              </div>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button
            variant={"contained"}
            onClick={() => {
              setOpenViewRemarkDialog(false);
            }}
            color={'error'}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LessonPlanBaseScreen;
