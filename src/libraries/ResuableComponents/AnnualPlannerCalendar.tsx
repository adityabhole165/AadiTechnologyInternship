

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  alpha
} from '@mui/material';
import {
  IGetAllDivisionsForStandardDropDownBody,
  IGetAllMonthsDropDownBody,
  IGetAssociatedStdLstForTeacherDropDownBody,
  IGetYearsForAnnualPalannerDropDownBody
} from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import {
  GetDivisionList,
  GetMonthList,
  GetStandardList,
  GetYearList
} from 'src/requests/AddAnnualPlanner/ReqAnnualPlanerBaseScreen';
import DotLegendTeacher from '../summary/DotLegendTeacher';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import Dropdown from '../dropdown/Dropdown';
import CardCal from './CardCal';
function AnnualPlannerCalendar({
  ItemList,
  ClickItem,
  handlePrevMonth,
  handleNextMonth,
  formattedDate,
  DefaultValue,
  ArrayList
}) {
  const legendColors = {
    holiday: '#b73839',
    exam: '#008000',
    events: '#303f9f'
  };
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();
  const asAcademicYearId = sessionStorage.getItem('AcademicYearId');
  const asSchoolId = localStorage.getItem('localSchoolId');
  const UserId = sessionStorage.getItem('Id');
  const TeacherId = sessionStorage.getItem('TeacherId');

  const [assignedYear, setAssignedYear] = useState<any>();
  const [assignedMonth_num, SetassignedMonth_num] = useState<any>();
  const [selectStandard, setSelectStandard] = useState('');
  const [selectDivision, setSelectDivision] = useState('');
  const [selectMonth, setSelectMonth] = useState(currentMonth);
  const [selectYear, setSelectYear] = useState(currentYear);
  const dispatch = useDispatch();
  const SelectStandardList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectStandardList
  );
  const SelectDivisionList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectDivisionList
  );
  const SelectMonthList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectMonthList
  );
  const SelectYearList: any = useSelector(
    (state: RootState) => state.AnnualPlanerBaseScreen.ISSelectYearList
  );

  const GetAssociatedStdLstForTeacherBody: IGetAssociatedStdLstForTeacherDropDownBody =
  {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asUserId: Number(UserId)
  };

  const GetAllMonthsDropBody: IGetAllMonthsDropDownBody = {
    asSchoolId: Number(asSchoolId)
  };

  const GetYearsForAnnualPalannerBody: IGetYearsForAnnualPalannerDropDownBody =
  {
    asSchoolId: Number(asSchoolId)
  };

  const AllDivisionsForStandardBody: IGetAllDivisionsForStandardDropDownBody = {
    asSchoolId: Number(asSchoolId),
    asAcademicYearId: Number(asAcademicYearId),
    asStandardId: 1062
  };



  useEffect(() => {
    dispatch(GetStandardList(GetAssociatedStdLstForTeacherBody));
  }, []);
  useEffect(() => {
    dispatch(GetDivisionList(AllDivisionsForStandardBody));
  }, []);
  useEffect(() => {
    dispatch(GetMonthList(GetAllMonthsDropBody));
  }, []);
  useEffect(() => {
    dispatch(GetYearList(GetYearsForAnnualPalannerBody));
  }, []);

  // useEffect(() => {
  //   if (
  //     selectStandard != '' &&
  //     selectDivision != '' &&
  //     selectMonth != '' &&
  //     selectYear != '' &&
  //     date != ''
  //   )
  //     dispatch(CDAGetEventsDataList(GetEventsDataListBody));
  // }, [selectStandard, selectDivision, selectMonth, selectYear, date]);

  useEffect(() => {
    if (SelectStandardList.length > 0 && SelectDivisionList.length > 0) {
      setSelectStandard(SelectStandardList[0].Value);
      setSelectDivision(SelectDivisionList[0].Value);
    }
  }, [SelectStandardList, SelectDivisionList]);

  const clickStandardDropdown = (value) => {
    setSelectStandard(value);
  };

  const clickdivisionDropdown = (value) => {
    setSelectDivision(value);
  };
  const clicMonthDropdown = (value) => {
    setSelectMonth(value);
  };
  const clicYearDropdown = (value) => {
    setSelectYear(value);
  };


  const clickCard = (Value) => {
    const checkStatus = (obj) => {
      return (obj.Status == undefined ? obj.Text3 : obj.Status) == 'Y';
    };
    let returnVal = ItemList.map((obj) =>
      obj.Value === Value
        ? {
          ...obj,
          Status: checkStatus(obj) ? 'N' : 'Y',
          BackgroundColor: checkStatus(obj) ? 'tomato' : 'mediumturquoise',
          Text1: checkStatus(obj) ? 'Absent' : 'Present'
        }
        : obj
    );

    ClickItem(returnVal);
  };
  let dayCount = new Date('01' + formattedDate).getDay();
  return (
    <Box sx={{ backgroundColor: 'white' }} p={2}>
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography m={0} variant={'h3'}>
            <b>{formattedDate}</b>
          </Typography>

          <Stack direction={'row'} gap={1}>
            <Box>

              <Dropdown
                Array={SelectStandardList}
                handleChange={clickStandardDropdown}
                defaultValue={selectStandard}
              />


            </Box>
            <Box>
              <Dropdown
                Array={SelectDivisionList}
                handleChange={clickdivisionDropdown}
                defaultValue={selectDivision}
                label={'Select Division'}
              />
            </Box>
            <Box>
              <Dropdown
                Array={SelectMonthList}
                handleChange={clicMonthDropdown}
                defaultValue={selectMonth}
                label={'Select Month'}
              />
            </Box>
            <Box>
              <Dropdown
                Array={SelectYearList}
                handleChange={clicYearDropdown}
                defaultValue={selectYear}
                label={'Select Year'}
              />
            </Box>
            <IconButton
              color={'primary'}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.2)
              }}
              onClick={() => handlePrevMonth()}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton
              color={'primary'}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.2)
              }}
              onClick={() => handleNextMonth()}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Stack>
        </Box>

        <Grid container spacing={0} sx={{ mt: 2 }}>
          {ArrayList.map((item, i) => (
            <Grid
              item
              xs={1.7}
              md={1.7}
              sx={{ textAlign: 'center', pt: 0 }}
              key={i}
            >
              <Box sx={{}}>
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  {item.Header}
                </Typography>
              </Box>
            </Grid>
          ))}
          <Grid
            item
            border="0.5px solid #ebebeb"
            md={1.7 * dayCount}
            sx={{ textAlign: 'center', pt: 0 }}
          ></Grid>
          {ItemList &&
            ItemList.length > 0 &&
            ItemList.map((item, i) => {
              return (
                <Grid
                  item
                  border="0.5px solid #ebebeb"
                  md={1.7}
                  sx={{ textAlign: 'center', pt: 0 }}
                  key={i}
                >
                  <CardCal
                    item={item}
                    clickItem={clickCard}
                    DefaultValue={DefaultValue}
                    legendColors={legendColors}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Grid container sx={{ mt: 2 }}>
          <Grid item sx={{}} gap={6} display="flex" xs={12} lg={12}>
            <DotLegendTeacher color={legendColors.holiday} text="Holiday" />
            <DotLegendTeacher color={legendColors.exam} text="Exam" />
            <DotLegendTeacher color={legendColors.events} text="Events" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default AnnualPlannerCalendar;