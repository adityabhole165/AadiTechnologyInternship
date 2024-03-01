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
  INewGetAllMonthsDropDownotBody,
  INewGetAssociatedStdLstForTeacherDropDownBody
} from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import Dropdown from 'src/libraries/dropdown/Dropdown';
import {
  CDAAllAcademicYearsForSchool,
  CDAGetAllEvents,
  CDAMonthList,
  CDAStdList
} from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import { RootState } from 'src/store';
import { getMonthYearSplitFormatted } from '../Common/Util';
type Props = {};

const EventOverview = (props: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = sessionStorage.getItem('TeacherId');
  const asStandardId = sessionStorage.getItem('StandardId');

  const currentYear = new Date().getFullYear().toString();
  const [selectStandard, setSelectStandard] = useState('');
  const [selectMonth, setSelectMonth] = useState();
  const [selectYear, setSelectYear] = useState();

  const AssociatedStandardsEV: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISStdList
  );

  const AllAcademicYearsForSchool: any = useSelector(
    (state: RootState) =>
      state.AnnualPlanerBaseScreen.ISGetAllAcademicYearsForSchool
  );

  const UsGetAllMonthsDropDown: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISMonthList
  );

  const USGetAllEvents: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISGetAllEvents
  );

  const ParentList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ParentList
  );

  console.log(AssociatedStandardsEV);
  console.log(UsGetAllMonthsDropDown);




  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const GetAssociatedStandardsEVBody: INewGetAssociatedStdLstForTeacherDropDownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: 0
  };

  const GetAllAcademicYearsForSchoolBody: IGetAllAcademicYearsForSchoolEVBody =
  {
    asSchoolId: Number(asSchoolId),
    asUserId: Number(UserId),
    asUserRoleId: 2
  };

  const GetAllMonthsDropDownBody: INewGetAllMonthsDropDownotBody = {
    asSchoolId: Number(asSchoolId)
  };

  const GetAllEventsBody: IGetAllEventsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(selectYear),
    asMonthId: selectMonth,
    asStandardId: selectStandard
  };
  useEffect(() => {
    if (UsGetAllMonthsDropDown.length > 0) {
      setSelectMonth(UsGetAllMonthsDropDown[0].Value);
    }
  }, [UsGetAllMonthsDropDown]);

  useEffect(() => {
    if (AssociatedStandardsEV.length > 0) {
      setSelectStandard(AssociatedStandardsEV[0].Value);
    }
  }, [AssociatedStandardsEV]);


  useEffect(() => {
    if (AllAcademicYearsForSchool.length > 8) {
      setSelectYear(AllAcademicYearsForSchool[8].Value);
    }
  }, [AllAcademicYearsForSchool]);


  useEffect(() => {
    dispatch(
      CDAStdList(GetAssociatedStandardsEVBody)
    );
  }, []);

  useEffect(() => {
    dispatch(CDAAllAcademicYearsForSchool(GetAllAcademicYearsForSchoolBody));
  }, []);

  useEffect(() => {
    dispatch(CDAMonthList(GetAllMonthsDropDownBody));
  }, []);
  useEffect(() => {
    dispatch(CDAGetAllEvents(GetAllEventsBody));
  }, [selectMonth, selectYear, selectStandard]);

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
              label={''}
            />
          </Box>
          <Box>
            <Dropdown
              Array={UsGetAllMonthsDropDown}
              handleChange={clicMonthDropdown}
              defaultValue={selectMonth}
              label={''}
            />
          </Box>
          <Box>
            <Dropdown
              Array={AllAcademicYearsForSchool}
              handleChange={clicYearDropdown}
              defaultValue={selectYear}
              label={''}
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
        <Box sx={{ mt: 2 }}>
          {ParentList ? (
            ParentList.map((event, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index + 1}`}
                onChange={handleChange(`panel${index + 1}`)}
                sx={{ border: `1px solid ${grey[300]}` }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}bh-content`}
                  id={`panel${index + 1}bh-header`}
                >
                  <Box width={'100%'}>
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {event}
                    </Typography>
                    {/* <Typography sx={{ color: 'text.secondary' }} variant={'h5'}>
                      {event.StartDate}
                    </Typography> */}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {USGetAllEvents
                    .filter(item => getMonthYearSplitFormatted(item.StartDateAndTime) == event)
                    .map((obj, index) => (
                      <>
                        <Typography variant={'h4'}>	{obj.DisplayDate} </Typography>
                        <React.Fragment >
                          <Box my={1}>
                            <Divider />
                          </Box>
                          <Typography variant={'h4'}>	Event Title: </Typography>
                          <Typography variant={'h5'}>
                            {obj.EventDescription}
                          </Typography>
                          <Typography>Standards: </Typography>
                          <span>{obj.Standards}
                          </span>
                        </React.Fragment>
                      </>))}
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Typography variant="body1">Loading events...</Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default EventOverview;
