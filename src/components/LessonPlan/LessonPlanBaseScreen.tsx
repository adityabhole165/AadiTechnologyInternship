import Add from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import Download from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import Visibility from '@mui/icons-material/Visibility';
import { Box, Breadcrumbs, Container, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IDeleteLessonPlanBody,
  IGetLessonPlanDetailsForReportBody,
  IGetLessonPlanListBody
} from 'src/interfaces/LessonPlan/ILessonPlanBaseScreen';
import DotLegends2 from 'src/libraries/ResuableComponents/DotLegends2';
import DynamicList2 from 'src/libraries/list/DynamicList2';
import {
  GetLessonPlanreport,
  deletelessonplan,
  lessonplanlist,
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

  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  console.log('StartDate---', StartDate);
  console.log('EndDate---', EndDate);

  const LessonPlanList: any = useSelector(
    (state: RootState) => state.LessonPlanBase.LessonList
  );
  console.log('LessonPlanList', LessonPlanList);

  const DeleteLessonPlan: any = useSelector(
    (state: RootState) => state.LessonPlanBase.DeletePlan
  );
  console.log('DeleteLessonPlan', DeleteLessonPlan);

  const LessonPlanReport: any = useSelector(
    (state: RootState) => state.LessonPlanBase.LessonReport
  );
  console.log('LessonPlanReport', LessonPlanReport);

  const IconList = [
    {
      Id: 1,
      Icon: <Visibility titleAccess="View Remark" />,
      Action: 'PreviewIcon'
    },
    {
      Id: 2,
      Icon: <EditIcon titleAccess="Edit" />,
      Action: 'EditIcon'
    },
    {
      Id: 3,
      Icon: (
        <CloseIcon
          titleAccess="Delete"
          style={{ backgroundColor: 'white', color: 'red' }}
        />
      ),
      Action: 'CloseIcon'
    },
    {
      Id: 4,
      Icon: (
        <div style={{ backgroundColor: 'white', color: 'skyblue' }}>Export</div>
      ),
      Action: 'RemoveRedEyeIcon2'
    },
    {
      Id: 5,
      Icon: <CheckIcon />,
      Action: 'RemoveRedEyeIcon2'
    }
  ];
  const GetLessonPlanListBody: IGetLessonPlanListBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asUserId: asUserId,
    asReportingUserId: asUserId,
    asStartIndex: 0,
    asEndIndex: 20,
    asIsRecordCount: 0,
    asStartDate: StartDate,
    asEndDate: EndDate,
    asRecordCount: null
  };

  useEffect(() => {
    dispatch(lessonplanlist(GetLessonPlanListBody));
  }, [StartDate, EndDate]);

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
    if (Id.Action == 'CloseIcon') {
      LessonPlanList.map((item, i) => {
        if (i == Id) {
          LessonPlanList.map((item, i) => { });
        }
      });
      if (confirm('Are You Sure you want to delete The List')) {
        const DeleteLessonPlanBody: IDeleteLessonPlanBody = {
          asSchoolId: asSchoolId,
          asAcademicYearId: asAcademicYearId,
          asUpdatedById: asUserId,
          asUserId: asUserId,
          aasStartDate: StartDate,
          aasEndDate: EndDate
        };
        dispatch(deletelessonplan(DeleteLessonPlanBody));
      }
    }
  };

  //   const clickDelete = (Id) => {
  //     if(Id.Action=="CloseIcon"){
  //       LessonPlanList.map((item,i)=>{
  //         if(i==Id){
  //           LessonPlanList.map((item,i)=>{

  //       })
  //         }
  //       })
  //     if (confirm('Are You Sure you want to delete The Lesson Plan')) {
  //       const DeleteLessonPlanBody: IDeleteLessonPlanBody = {
  //         asSchoolId: asSchoolId,
  //         asAcademicYearId: asAcademicYearId,
  //         asUpdatedById: asUserId,
  //         asUserId: asUserId,
  //         aasStartDate:asStartDate,
  //         aasEndDate:asEndDate

  //       }
  //       dispatch(deletelessonplan(DeleteLessonPlanBody))
  //     }

  //       if (DeleteLessonPlan!== '') {
  //       toast.success(DeleteLessonPlan, { toastId: 'success1' })
  //     }
  //     dispatch(lessonplanlist(GetLessonPlanListBody))
  //   }
  // }

  const onSelectStartDate = (value) => {
    setStartDate(value);

    // if(StartDate !== ""){
    //   const GetLessonPlanListBody1: IGetLessonPlanListBody = {

    //     asSchoolId:asSchoolId,
    //     asAcademicYearId:asAcademicYearId,
    //      asUserId:asUserId,
    //      asReportingUserId:asUserId,
    //       asStartIndex:0,
    //        asEndIndex:20,
    //        asIsRecordCount:0,
    //        asStartDate:StartDate,
    //        asEndDate:null,
    //        asRecordCount:null

    //   }
    //   dispatch(lessonplanlist(GetLessonPlanListBody1))
    // }
  };

  const onSelectEndDate = (value) => {
    setEndDate(value);

    // if(EndDate !== ""){
    //   const GetLessonPlanListBody: IGetLessonPlanListBody = {

    //     asSchoolId:asSchoolId,
    //     asAcademicYearId:asAcademicYearId,
    //      asUserId:asUserId,
    //      asReportingUserId:asUserId,
    //       asStartIndex:0,
    //        asEndIndex:20,
    //        asIsRecordCount:0,
    //        asStartDate:null,
    //        asEndDate:EndDate,
    //        asRecordCount:null

    //   }
    //   dispatch(lessonplanlist(GetLessonPlanListBody))
    // }
  };

  const HeaderList = [
    'Start Date',
    'End Date',
    'View Remark ',
    'Edit',
    'Delete',
    'Export',
    'Submit Status'
  ];

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

  const ClickEdit = (value) => {
    if (value.Action == 'EditIcon') {
      navigate('/extended-sidebar/Teacher/AddLessonPlan');
    }
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
        <Box sx={{ p: 2, background: 'white' }}>
          <DynamicList2
            HeaderList={HeaderList}
            ItemList={LessonPlanList}
            IconList={IconList}
            ClickItem={clickDelete}
          />
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
