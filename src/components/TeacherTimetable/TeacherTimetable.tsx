import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMark from '@mui/icons-material/QuestionMark';
import { Box, Breadcrumbs, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ITimetable from 'src/interfaces/Student/TimeTable';
import IWdays, {
  GettimeTable,
  ItimeTable
} from 'src/interfaces/Student/Tmtimetable';
import CardTimetable from 'src/libraries/card/CardTimetable';
import { getTimetable } from 'src/requests/Teacher/TMtimetable';
import { RootState } from 'src/store';
function TeacherTimetable() {
  const dispatch = useDispatch();
  const weekdaysList = useSelector(
    (state: RootState) => state.TMTimetable.Weekdays
  );
  const TMTimetable = useSelector(
    (state: RootState) => state.TMTimetable.TmTimetable
  );
  const AddLectures = useSelector(
    (state: RootState) => state.TMTimetable.AdditionalLecture
  );
  const [expanded, setExpanded] = useState<boolean>(true);
  const [additional, setAdditional] = useState<GettimeTable>();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const asSchoolId = localStorage.getItem('localSchoolId');
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asStandardDivisionId = sessionStorage.getItem('DivisionId');
  const asTeacherId = sessionStorage.getItem('TeacherId');

  const tt_body: IWdays = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId
  };

  const t_body: ITimetable = {
    asStandardDivId: '0',
    asTeacherId: asTeacherId,
    asIsTeacher: '1',
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };
  const teacger_body: ItimeTable = {
    asStandardDivId: '0',
    asTeacherId: asTeacherId,
    asIsTeacher: 1,
    asAcademicYearId: asAcademicYearId,
    asSchoolId: asSchoolId
  };

  useEffect(() => {
    dispatch(getTimetable(t_body));
    // dispatch(getAdditional(teacger_body));
  }, []);

  return (
    <>
      <Container maxWidth={'xl'} sx={{ mt: 4 }}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
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
                Timetable
              </Typography>
            </Breadcrumbs>
          </Box>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Tooltip title={'Timetable'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[600]
                  }
                }}
              >
                <QuestionMark />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Box sx={{ mt: 1 }}>
          <CardTimetable header={TMTimetable}></CardTimetable>
        </Box>
        {/* <CardTimetable2 header={TMTimetable.filter((item)=>{return item.Name === "Additional Lectures"})}></CardTimetable2> */}
      </Container>
    </>
  );
}

export default TeacherTimetable;
