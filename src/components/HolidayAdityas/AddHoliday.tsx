import { QuestionMark, Save } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertContext } from 'src/contexts/AlertContext';
import { IGetAllClassesAndDivisionsBody } from 'src/interfaces/AddSchoolNotic/ISchoolNoticeForm';
import { SaveHolidayDetailsBody } from 'src/interfaces/Common/Holidays';
import { IGetHolidaynameAndStartDateEnddateValidationBody } from 'src/interfaces/HolidayNew/IHolidays';
import Datepicker from 'src/libraries/DateSelector/Datepicker';
import ErrorMessage1 from 'src/libraries/ErrorMessages/ErrorMessage1';
import SelectListHierarchy from 'src/libraries/SelectList/SelectListHierarchy';
import { getSaveHolidays } from 'src/requests/Holiday/Holiday';
import { GetGetAllClassesAndDivisions, GetNameAndStartDateEnddateValidationForSaveHoliday } from 'src/requests/HolidayNew/RequestHolidays';
import { RootState } from 'src/store';
import { formatDateAsDDMMMYYYY, getCalendarDateFormatDateNew, isLessThanDate, isOutsideAcademicYear } from '../Common/Util';
import CommonPageHeader from '../CommonPageHeader';


function AddHoliday() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { asHoliday_Id } = useParams();
  const [Itemlist, setItemlist] = useState([]);
  const [StartDate, setStartDate]: any = useState(getCalendarDateFormatDateNew(new Date()));
  const [EndDate, setEndDate]: any = useState(getCalendarDateFormatDateNew(new Date()));
  const [HolidayTitle, setHolidayTitle] = useState('');
  const [TotalDays, setTotalDays] = useState(1);
  const [Remark, setRemark] = useState('');
  const [RemarkError, setRemarkError] = useState('');
  const asUserId = Number(localStorage.getItem('UserId'));
  const { showAlert, closeAlert } = useContext(AlertContext);
  const asSchoolId = Number(localStorage.getItem('localSchoolId'));
  const asAcademicYearId = Number(sessionStorage.getItem('AcademicYearId'));
  const [ErrorStartDate, setErrorStsrtDate] = useState('');
  const [ErrorEndDate, setErrorEndDate] = useState('');
  const [errorHolidayTitle, setErrorHolidayTitle] = useState('');
  const [errorHolidayTitle1, setErrorHolidayTitle1] = useState('');
  const [ErrorEndDateblank, setErrorEndDateblank] = useState('');
  const [ErrorStartDateblank, setErrorStartDateblank] = useState('');
  const [ErrorClass, setErrorClass] = useState('');
  const [ErrorEndDate1, setErrorEndDate1] = useState('');
  const [ErrorEndDate2, setErrorEndDate2] = useState('');
  const [ErrorStartDate2, setErrorStartDate2] = useState('');
  const PredefinedStartDateAndEndDateCount: any = useSelector((state: RootState) => state.HolidayNew.HolidayStartAndEndDateValidation)
  const filteredItems1 = PredefinedStartDateAndEndDateCount.filter(item => item.PredefinedStartDateAndEndDateCount);
  const DuplicateHolidayNameCount: any = useSelector((state: RootState) => state.HolidayNew.HolidayDuplicateNameValCount)
  const filteredItems = DuplicateHolidayNameCount.filter(item => item.DuplicateHolidayNameCount);
  const result1 = filteredItems1.length > 0 ? filteredItems1[0] : null;
  const result = filteredItems.length > 0 ? filteredItems[0] : null;
  const ClickChild = (value) => {
    setItemlist(value);
  };
  const classanddivisions = useSelector((state: RootState) => state.HolidayNew.GetAllClassAndDivnew);
  const classanddivisions1 = useSelector((state: RootState) => state.HolidayNew.GetAllClassAndDivnew1);
  const GetAllClassesAndDivisin01: IGetAllClassesAndDivisionsBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    associatedStandard: (' ')
  }
  useEffect(() => {
    dispatch(GetGetAllClassesAndDivisions(GetAllClassesAndDivisin01));
  }, []);
  const GetAllClassesAndDiData = useSelector((state: RootState) => state.HolidayNew.GetAllClassAndDivnew)
  console.log(GetAllClassesAndDiData, 'GetAllClassAndDivss')
  useEffect(() => {
    setItemlist(classanddivisions);
  }, [classanddivisions]);
  useEffect(() => {
    const start = new Date(StartDate);
    const end = new Date(EndDate);
    const timeDiff = end.getTime() - start.getTime();
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    setTotalDays(daysDiff < 0 ? 0 : daysDiff + 1);
  }, [StartDate, EndDate]);
  const onSelectStartDate = (value: Date) => {
    setStartDate(getCalendarDateFormatDateNew(value));
  };
  const onSelectEndDate = (value: Date) => {
    setEndDate(getCalendarDateFormatDateNew(value));
  };
  const Clicksave = () => {
    let isError = false;
    let dateError = false;
    if (HolidayTitle == '') {
      setErrorHolidayTitle('Holiday Name sholud not be blank');
    } else setErrorHolidayTitle('')
    if (!isClassSelected()) {
      setErrorClass('At least one class should be associated');
    } else setErrorClass('')
    if (StartDate == '') {
      setErrorStartDate2('Please choose a valid date');
      dateError = true;
      isError = true;
    } else setErrorStartDate2('')
    if (StartDate == null) {
      setErrorStartDateblank('Start date should not be blank');
      dateError = true;
      isError = true;
    } else setErrorStartDateblank('')
    if (EndDate == '') {
      setErrorEndDate2('Please choose a valid date');
      dateError = true;
      isError = true;
    } else setErrorEndDate2('')
    if (EndDate == null) {
      setErrorEndDateblank('End date should not be blank');
      dateError = true;
      isError = true;
    } else setErrorEndDateblank('')
    if (dateError == false) {
      if (isOutsideAcademicYear(StartDate)) {
        setErrorStsrtDate('Holiday start date must be within current academic year (i.e. between ' +
          formatDateAsDDMMMYYYY(sessionStorage.getItem('StartDate')) + 'and' +
          formatDateAsDDMMMYYYY(sessionStorage.getItem('EndDate')) + ').'
        );
        dateError = true
        isError = true
      } else {
        setErrorEndDate('')
      }
      if (isLessThanDate(StartDate, EndDate)) {
        setErrorEndDate1('End date should be greater than start date.');
        dateError = true
        isError = true;
      } else setErrorEndDate1('')
      if (result1.PredefinedStartDateAndEndDateCount != "0" && dateError == false) {
        setErrorEndDate2('Holiday Already defined.');
        isError = true
      } else setErrorEndDate2('')
    }
    if (Remark.length > 200) {
      setRemarkError('Remark should not be more than 200 characters.');
    } else {
      setRemarkError('');
      console.log('Saving Holiday:', { StartDate, EndDate, HolidayTitle, Remark, TotalDays, Itemlist });
    }
    if (result.DuplicateHolidayNameCount !== "0") {
      setErrorHolidayTitle1('Holiday Name already exists.');
      isError = true;
    } else setErrorHolidayTitle1('')
    if (!isError) {
      dispatch(getSaveHolidays(SaveHolidayBody));
    }
  };
  useEffect(() => {
    setItemlist(classanddivisions);
  }, [classanddivisions]);
  //Save and cancel Functionality
  const Clicksave1 = () => {
    showAlert({
      title: 'Please Confirm',
      message: 'Are you sure you want to save Holiday',
      variant: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      onCancel: () => {
        closeAlert();
      },
      onConfirm: () => {
        Clicksave()
        closeAlert();
        navigate('/RITeSchool/Teacher/Holiday');
      }
    })
  };
  const isClassSelected = () => {
    let arr = []
    Itemlist.map(item => {
      if (item.IsActive) {
        arr.push(item.id)
      }
    })
    return arr.toString()
  }
  const ClassSelected = isClassSelected();
  const SaveHolidayBody: SaveHolidayDetailsBody = {
    asHolidayName: HolidayTitle,
    asRemarks: Remark,
    asStartDate: StartDate,
    asEndDate: EndDate,
    asSchoolId: asSchoolId,
    asAcademicYearID: asAcademicYearId,
    asInsertedById: asUserId,
    asAssociatedStandard: ClassSelected,
    asHoliday_Id: Number(asHoliday_Id ? asHoliday_Id : 0),
  }
  useEffect(() => { }, [
    dispatch(getSaveHolidays(SaveHolidayBody)),
  ]);
  const Saveholidays1 = useSelector((state: RootState) => state.HolidayNew.saveHoliday)
  console.log(Saveholidays1, "SaveHolidays1")
  const NameAndStartDateEnddateValidationForSaveHoliday: IGetHolidaynameAndStartDateEnddateValidationBody = {
    asSchoolId: asSchoolId,
    asAcademicYearId: asAcademicYearId,
    asStandardDivIds: Number(localStorage.getItem('StandardDivId')),
    asHolidayId: Number(asHoliday_Id ? asHoliday_Id : 0),
    asHolidayName: HolidayTitle,
    asHolidayStartDate: StartDate,
    asHolidayEndDate: EndDate
  }
  useEffect(() => {
    dispatch(GetNameAndStartDateEnddateValidationForSaveHoliday(NameAndStartDateEnddateValidationForSaveHoliday));//request madhil get name 
  }, []);
  const NameStartdatedata = useSelector((state: RootState) => state.HolidayNew.MyHoliday) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(NameStartdatedata, 'MyHoliday')
  const resetForm = () => {
    navigate('/RITeSchool/Teacher/Holiday');
  };
  return (
    <Box sx={{ px: 2 }}>
      <CommonPageHeader
        rightActions={
          <>
            <Tooltip title="Declare a new classwise holiday for your school">
              <IconButton sx={{ bgcolor: 'grey.500', color: 'white', '&:hover': { bgcolor: 'grey.700' } }}>
                <QuestionMark />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton
                onClick={Clicksave}
                sx={{
                  background: green[500],
                  color: 'white',
                  '&:hover': { backgroundColor: green[600] }
                }}
              >
                <Save />
              </IconButton>
            </Tooltip>
          </>
        } 
        navLinks={[
          { title: 'Holiday', path: '/RITeSchool/Teacher/Holiday' },
          { title: 'AddHoliday', path: '/extended-sidebar/Teacher/HolidayNew' },
        ]}
      />
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Datepicker
            DateValue={StartDate}
            onDateChange={onSelectStartDate}
            label="Start Date"
            size="medium"
          />
          <ErrorMessage1 Error={ErrorStartDate}></ErrorMessage1>
          <ErrorMessage1 Error={ErrorStartDate2}></ErrorMessage1>
          <ErrorMessage1 Error={ErrorStartDateblank}></ErrorMessage1>
        </Grid>
        <Grid item xs={6} md={4}>
          <Datepicker
            DateValue={EndDate}
            onDateChange={onSelectEndDate}
            label="End Date"
            size="medium"
          />
          <ErrorMessage1 Error={ErrorEndDate}></ErrorMessage1>
          <ErrorMessage1 Error={ErrorEndDate1}></ErrorMessage1>
          <ErrorMessage1 Error={ErrorEndDate2}></ErrorMessage1>
          <ErrorMessage1 Error={ErrorEndDateblank}></ErrorMessage1>
        </Grid>
        <Grid item xs={6} md={4}>
          <TextField label="Total Days" value={TotalDays} InputProps={{ readOnly: true }} fullWidth />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            label="Name *"
            multiline
            rows={1}
            value={HolidayTitle}
            onChange={(e) => {
              if (e.target.value.length <= 50) {
                setHolidayTitle(e.target.value);
              }
            }}
            fullWidth
          />
          <ErrorMessage1 Error={errorHolidayTitle}></ErrorMessage1>
          <ErrorMessage1 Error={errorHolidayTitle1}></ErrorMessage1>
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            label="Remark"
            multiline
            rows={1}
            value={Remark}
            onChange={(e) => setRemark(e.target.value)}
            fullWidth
            error={RemarkError !== ''}
            helperText={RemarkError}
          />
        </Grid>
        <Grid item xs={12} md={12} mt={4}>
          <Typography variant="h6">
            Associated Classes <span style={{ color: 'red' }}>*</span>
          </Typography>
          <SelectListHierarchy
            ItemList={Itemlist}
            ParentList={classanddivisions1}
            ClickChild={ClickChild} >
          </SelectListHierarchy>
          <ErrorMessage1 Error={ErrorClass}></ErrorMessage1>
        </Grid>
        <Grid item xs={12} md={12}>
          <Stack direction="row" gap={2} alignItems="center">
            <Button
              sx={{ backgroundColor: red[500], color: 'white', '&:hover': { backgroundColor: red[700] } }}
              onClick={resetForm}
            >
              Cancel
            </Button>
            <Button
              sx={{ backgroundColor: green[500], color: 'white', '&:hover': { backgroundColor: green[700] } }}
              onClick={Clicksave1}
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <br />
    </Box>
  );
}
export default AddHoliday;

