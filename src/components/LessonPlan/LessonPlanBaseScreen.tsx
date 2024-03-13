import Add from '@mui/icons-material/Add';
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import Download from '@mui/icons-material/Download';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Breadcrumbs, Container, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
// import jsPDF from 'jspdf';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IAddOrEditLessonPlanDetailsBody,
  IDeleteLessonPlanBody,
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
const LessonPlanBaseScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const asUserId = Number(localStorage.getItem('UserId'));
  const asStandardDivisionId = Number(
    sessionStorage.getItem('StandardDivisionId')
  );

  const TeacherId = Number(sessionStorage.getItem('TeacherId'));
  const TeacherName = sessionStorage.getItem('StudentName');
  const [isDeleteEffectTriggered, setDeleteEffectTriggered] = useState(false);

  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  const [selectClasstecahernew, setselectClasstecahernew] = useState(
    sessionStorage.getItem('TeacherId')
  );
  console.log('StartDate---', StartDate);
  console.log('EndDate---', EndDate);

  const ScreensAccessPermission = JSON.parse(
    sessionStorage.getItem('ScreensAccessPermission')
  );
  const LessonPlanList: any = useSelector(
    (state: RootState) => state.LessonPlanBase.ISLessonList
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
    { Id: 1, Header: ' Start Date	' },
    { Id: 2, Header: 'End Date' },
    { Id: 3, Header: 'View Remark' },
    { Id: 4, Header: 'Edit' },
    { Id: 5, Header: 'Delete ' },
    { Id: 6, Header: 'Export' },
    { Id: 6, Header: 'Submit Status' }
  ];
  const GetLessonPlanListBody: IGetLessonPlanListBody = {
    asSchoolId: asSchoolId,
    asAcadmicYearId: asAcademicYearId,
    asUserId: Number(selectClasstecahernew),
    asReportingUserId: asUserId,
    asStartIndex: 0,
    asEndIndex: 20,
    asRecordCount: 0,
    asStartDate: StartDate,
    asEndDate: EndDate

  };
  useEffect(() => {
    dispatch(CDAlessonplanlist(GetLessonPlanListBody));
  }, [StartDate, EndDate, selectClasstecahernew]);

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



  const clickDelete = (Id) => {
    if (confirm('Are You Sure you want to delete The List')) {
      const DeleteLessonPlanBody: IDeleteLessonPlanBody = {
        asSchoolId: asSchoolId,
        asAcademicYearId: asAcademicYearId,
        asUpdatedById: asUserId,
        asUserId: asUserId,
        asStartDate: LessonPlanList.find((item) => item.StartDate)?.StartDate,
        asEndDate: LessonPlanList.find((item) => item.StartDate)?.EndDate,
      };
      dispatch(deletelessonplan(DeleteLessonPlanBody));

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


  };


  const clickView = (Id) => {
    console.log(clickView, "clickView");

  }
  const ClickSelctTecher = (value) => {
    setselectClasstecahernew(value)

  }



  const ClickEdit = (value) => {
    navigate('/extended-sidebar/Teacher/AddLessonPlan');
  };

  const onSelectEndDate = (value) => {
    setEndDate(value);


  };


  const OnClickExportAll = () => {
    dispatch(GetLessonPlanreport(GetLessonPlanReportBody));
  };
  const onClickAdd = () => {
    navigate('/extended-sidebar/Teacher/AddLessonPlan');
  };

  const onClickaaaa1 = () => {
    navigate('/extended-sidebar/Teacher/AddLessonPlan');
  };
  const onClickaaaa2 = () => {
    navigate('/extended-sidebar/Teacher/AddHomework');
  };



  return (
    <>
      <Container maxWidth={"xl"}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            pt: 5,
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
              <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
                Lesson Plans
              </Typography>
            </Breadcrumbs>

            <Box sx={{ background: 'white' }}>
              <SearchableDropdown
                label={""}
                sx={{ pl: 0, minWidth: '350px' }}
                ItemList={USGetAllTeachersOfLessonPlan}
                onChange={ClickSelctTecher}
                defaultValue={selectClasstecahernew}
                size={"small"}
              />
            </Box>

          </Box>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
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
                inputProps={{
                  max: new Date().toISOString().split('T')[0]
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
                inputProps={{
                  max: new Date().toISOString().split('T')[0]
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
              <Tooltip title={"Export All"}>
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
            </Box>
            <Box>
              <Tooltip title={"Add new Lesson Plan"}>
                <IconButton
                  sx={{
                    color: 'white',
                    backgroundColor: green[500],
                    height: '36px !important',
                    ':hover': { backgroundColor: green[600] }
                  }}
                  onClick={onClickAdd}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Stack>





        <Box mt={2}>
          <Typography variant={'h4'} mb={1}>
            My Subjects
          </Typography>
          {LessonPlanList.length > 0 ? (
            <ListIcon
              HeaderArray={HeaderList1}
              ItemList={LessonPlanList}
              clickView={clickView}
              clickEdit={ClickEdit}
              clickDelete={clickDelete}
              clickExport={downloadJsonToPdf}
            />
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
              <b>No Record Found.</b>
            </Typography>
          )}

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

      </Container>
    </>
  );
};

export default LessonPlanBaseScreen;
