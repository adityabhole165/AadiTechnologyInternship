import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import CommonPageHeader from '../CommonPageHeader';
type Props = {};

const EventOverview = (props: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const dispatch = useDispatch();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = sessionStorage.getItem('TeacherId');
  const asStandardId = sessionStorage.getItem('StandardId');
  const [selectYear, setSelectYear] = useState();
  const [selectStandard, setSelectStandard] = useState('');
  const [selectMonth, setSelectMonth] = useState();

  const AllAcademicYearsForSchool: any = useSelector(
    (state: RootState) =>
      state.AnnualPlanerBaseScreen.ISGetAllAcademicYearsForSchool
  );

  const UsGetAllMonthsDropDown: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISMonthList
  );
  const AssociatedStandardsEV: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISStdList
  );

  const USGetAllEvents: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISGetAllEvents
  );

  const ParentList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ParentList
  );


  //console.log(AssociatedStandardsEV);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


  const GetAllAcademicYearsForSchoolBody: IGetAllAcademicYearsForSchoolEVBody =
  {
    asSchoolId: Number(asSchoolId),
    asUserId: Number(UserId),
    asUserRoleId: 2
  };
  const GetAssociatedStandardsEVBody: INewGetAssociatedStdLstForTeacherDropDownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: 0
  };

  const GetAllMonthsDropDownBody: INewGetAllMonthsDropDownotBody = {
    asSchoolId: Number(asSchoolId)
  };

  const GetAllEventsBody: IGetAllEventsBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
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
    const lastIndex = AllAcademicYearsForSchool.length - 1;
    if (lastIndex >= 0) {
      setSelectYear(AllAcademicYearsForSchool[lastIndex].Value);
    }
  }, [AllAcademicYearsForSchool]);


  useEffect(() => {
    dispatch(
      CDAStdList(GetAssociatedStandardsEVBody)
    );
  }, [selectYear]);

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
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        navLinks={[
          { title: 'Annual Planner', path: '/RITeSchool/Common/AnnualPlanner' },
          { title: 'Events Overview', path: '/RITeSchool/Common/EventOverview' }
        ]}
        rightActions={
          <>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              // justifyContent="space-between"
              alignItems="right"

              spacing={2}
              sx={{

                mt: { xs: 0, sm: 0 },
                flexWrap: { xs: 'nowrap', sm: 'nowrap' }
              }}
            >
              <Grid
                item
                xs={12}
                sm={6}
                display="flex"
                justifyContent={{ xs: 'flex-start', sm: 'flex-start' }}
              >
                <Stack
                  direction="row"
                  gap={1}
                  alignItems="left"
                  sx={{
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    justifyContent: { xs: 'flex-start', sm: 'flex-start' }
                  }}
                >
                  <Box>
                    <Dropdown
                      size={"small"}
                      variant={"outlined"}
                      Array={AssociatedStandardsEV}
                      handleChange={clickStandardDropdown}
                      defaultValue={selectStandard}
                      label={'Standard'}
                      width={'100px'}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Box>
                <Dropdown
                  size={"small"}
                  variant={"outlined"}
                  Array={UsGetAllMonthsDropDown}
                  handleChange={clicMonthDropdown}
                  defaultValue={selectMonth}
                  label={'Month(s)'}
                  width={'100px'}
                />
              </Box>
              <Box>
                <Dropdown
                  size={"small"}
                  variant={"outlined"}
                  Array={AllAcademicYearsForSchool}
                  handleChange={clicYearDropdown}
                  defaultValue={selectYear}
                  label={'Academic Year'}
                  width={'150px'}
                />
              </Box>
              <Box>
                <Tooltip title={' Displays all the events of the school.'}>
                  <IconButton
                    sx={{
                      color: 'white',
                      backgroundColor: grey[500],
                      '&:hover': {
                        backgroundColor: grey[600]
                      }
                    }}
                  >
                    <QuestionMarkIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </>
        }
      />
      <Box>
        {(ParentList && ParentList.length > 0) && USGetAllEvents ? (
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
                <Box width={'100%'} display={"flex"} justifyContent={"space-between"} alignItems={"center"} pr={2}>
                  <Typography variant={"h4"} sx={{ width: '33%', flexShrink: 0 }}>
                    {event}
                  </Typography>
                  <Badge color={"primary"} badgeContent={USGetAllEvents
                    .filter(item => getMonthYearSplitFormatted(item.StartDateAndTime) == event).length}></Badge>
                </Box>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Grid container>
                  {USGetAllEvents
                    .filter(item => getMonthYearSplitFormatted(item.StartDateAndTime) == event)
                    .map((obj, index) => (
                      <Grid item xs={6} sm={3} key={index} sx={{ p: 1, height: '100%' }}>
                        <Box sx={{ border: `1px solid ${grey[400]}`, borderRadius: (theme) => theme.general.borderRadius }}>
                          <Typography variant={'h4'} sx={{ p: 1, background: (theme) => theme.palette.secondary.main, color: 'white' }}>{obj.DisplayDate}</Typography>
                          <Box sx={{ p: 1 }}>
                            <React.Fragment>
                              {/* <Typography variant={'h4'}>Event Title: </Typography> */}
                              <Typography variant={'h5'}>
                                {obj.EventDescription}
                              </Typography>
                              {/* <Typography>Standards: </Typography> */}
                              <span>{obj.Standards}</span>
                            </React.Fragment>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                </Grid >
              </AccordionDetails>
            </Accordion>
          ))
        ) : (

          <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 4, backgroundColor: '#324b84', padding: 1, borderRadius: 2, color: 'white' }}>
            <b>No event found.</b>
          </Typography>

        )}
      </Box>
    </Box >
  );
};

export default EventOverview;
