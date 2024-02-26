import ChevronRightTwoTone from '@mui/icons-material/ChevronRightTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breadcrumbs,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  IGetAllAcademicYearsForSchoolEVBody,
  IGetAllEventsBody,
  IGetAllMonthsDropDownBody,
  IGetAssociatedStandardsEVBody
} from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import {
  CDAAllAcademicYearsForSchool,
  CDAAssociatedStandardListEventOverview,
  CDAGetAllEvents,
  CDAGetAllMonthsDropDown
} from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import { RootState } from 'src/store';
type Props = {};

const EventOverview = (props: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = sessionStorage.getItem('TeacherId');

  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const [selectStandard, setSelectStandard] = useState('');
  const [selectMonth, setSelectMonth] = useState(currentMonth);
  const [selectYear, setSelectYear] = useState(currentYear);

  const AssociatedStandardsEV: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.IGetAssociatedStandardsEv
  );

  const AllAcademicYearsForSchool: any = useSelector(
    (state: RootState) =>
      state.AnnualPlanerBaseScreen.ISGetAllAcademicYearsForSchool
  );

  const UsGetAllMonthsDropDown: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.IsGetAllMonthsDropDown
  );

  const USGetAllEvents: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISGetAllEvents
  );

  console.log(AssociatedStandardsEV, 'AssociatedStandardsEV');
  console.log(AllAcademicYearsForSchool, 'AllAcademicYearsForSchool');
  console.log(UsGetAllMonthsDropDown, 'UsGetAllMonthsDropDown');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const GetAssociatedStandardsEVBody: IGetAssociatedStandardsEVBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId)
  };

  const GetAllAcademicYearsForSchoolBody: IGetAllAcademicYearsForSchoolEVBody =
    {
      asSchoolId: Number(asSchoolId),
      asUserId: Number(UserId),
      asUserRoleId: 2
    };

  const GetAllMonthsDropDownBody: IGetAllMonthsDropDownBody = {
    asSchoolId: Number(asSchoolId)
  };

  const GetAllEventsBody: IGetAllEventsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asMonthId: null,
    asStandardId: null
  };

  useEffect(() => {
    dispatch(
      CDAAssociatedStandardListEventOverview(GetAssociatedStandardsEVBody)
    );
  }, []);

  useEffect(() => {
    dispatch(CDAAllAcademicYearsForSchool(GetAllAcademicYearsForSchoolBody));
  }, []);

  useEffect(() => {
    dispatch(CDAGetAllMonthsDropDown(GetAllMonthsDropDownBody));
  }, []);
  useEffect(() => {
    dispatch(CDAGetAllEvents(GetAllEventsBody));
  }, []);

  const clickStandardDropdown = (value) => {
    setSelectStandard(value);
  };

  const clicMonthDropdown = (value) => {
    setSelectMonth(value);
  };
  const clicYearDropdown = (value) => {
    setSelectYear(value);
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth={'xl'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
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
            </Link>{' '}
            <Link
              to={'/extended-sidebar/Common/AnnualPlanner'}
              color="inherit"
              style={{ textDecoration: 'none' }}
            >
              <Typography
                variant={'h3'}
                fontSize={'23px'}
                color="text.primary"
                fontWeight={'normal'}
                sx={{
                  '&:hover': {
                    fontWeight: 'bold'
                  }
                }}
              >
                Annual Planner
              </Typography>
            </Link>
            <Typography variant={'h3'} fontSize={'23px'} color="text.primary">
              Events Overview
            </Typography>
          </Breadcrumbs>
        </Box>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Box>
            <Dropdown
              Array={AssociatedStandardsEV}
              handleChange={clickStandardDropdown}
              defaultValue={selectStandard}
              label={'Select Standard'}
            />
          </Box>
          <Box>
            <Dropdown
              Array={UsGetAllMonthsDropDown}
              handleChange={clicMonthDropdown}
              defaultValue={selectMonth}
              label={'Select Month'}
            />
          </Box>
          <Box>
            <Dropdown
              Array={AllAcademicYearsForSchool}
              handleChange={clicYearDropdown}
              defaultValue={selectYear}
              label={'Select Year'}
            />
          </Box>
          <Box>
            <Tooltip title={'Display All the events of the school'}>
              <IconButton
                sx={{
                  color: 'white',
                  backgroundColor: grey[500],
                  '&:hover': {
                    backgroundColor: grey[700]
                  }
                }}
              >
                <QuestionMarkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{ border: `1px solid ${grey[300]}` }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Box width={'100%'}>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                January 1990
              </Typography>
              <Typography sx={{ color: 'text.secondary' }} variant={'h5'}>
                Monday, 1st
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant={'h4'}>Events: </Typography>
            {/* loopable */}
            <Box my={1}>
              <Divider />
            </Box>
            <Typography variant={'h5'}>1. Arts Competition</Typography>
            <Typography>For Standards: </Typography>
            <span>
              Nursery, Junior KG, Senior KG, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            </span>
            {/* loop end*/}
            {/* loopable */}
            <Box my={1}>
              <Divider />
            </Box>
            <Typography variant={'h5'}>2. Science Competition</Typography>
            <Typography>For Standards: </Typography>
            <span>
              Nursery, Junior KG, Senior KG, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            </span>
            {/* loop end*/}
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default EventOverview;
