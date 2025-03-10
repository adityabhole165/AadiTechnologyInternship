import { Box } from "@mui/material";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveHolidayDetailsBody } from 'src/interfaces/Common/Holidays';
import { IDeleteHolidayDetailsBody, IGetAllClassesAndDivisionsBody, IGetHolidayDetailsBody, IGetHolidayDetailssBody, IGetHolidayListBody, IGetHolidaynameAndStartDateEnddateValidationBody, IGetHomeworkDetailsBody, IGetMonthwiseAttendance } from "src/interfaces/HolidayNew/IHolidays";
import { getSaveHolidays } from 'src/requests/Holiday/Holiday';
import { GetDeleteHolidayDetails, GetGetAllClassesAndDivisions, getGetHolidayDetails, GetGetHolidayDetailss, getGetHolidayList, GetGetHomeworkDetails, GetGetMonthwiseAttendance, GetNameAndStartDateEnddateValidationForSaveHoliday } from 'src/requests/HolidayNew/RequestHolidays';
import { RootState } from 'src/store';
import CommonPageHeader from '../CommonPageHeader';

const HolidayNew = () => {

  const dispatch = useDispatch();

  const SaveholidayBody: SaveHolidayDetailsBody = {

    asHolidayName: "Navaratri",
    asRemarks: "Dandiaya",
    asStartDate: "3/22/2025 12:00:00 Am",
    asEndDate: "3/22/2025 12:00:00 Am",
    asSchoolId: 18,
    asAcademicYearID: 54,
    asInsertedById: 0,
    asAssociatedStandard: "1229 , 1290 ",
    asHoliday_Id: 0
  }

  useEffect(() => { }, [
    dispatch(getSaveHolidays(SaveholidayBody)),

  ]);

  const Saveholidays1 = useSelector((state: RootState) => state.HolidayNew.saveHoliday)
  console.log(Saveholidays1, "SaveHolidays1")


  const NameAndStartDateEnddateValidationForSaveHoliday: IGetHolidaynameAndStartDateEnddateValidationBody = {
    asSchoolId: 18,
    asAcademicYearId: 55,
    asStandardDivIds: 1073,
    asHolidayId: 0,
    asHolidayName: "GoodFridays",
    asHolidayStartDate: "6/14/2024",
    asHolidayEndDate: "6/14/2024"
  }
  useEffect(() => {
    dispatch(GetNameAndStartDateEnddateValidationForSaveHoliday(NameAndStartDateEnddateValidationForSaveHoliday));//request madhil get name 
  }, []);

  const NameStartdatedata = useSelector((state: RootState) => state.HolidayNew.MyHoliday) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(NameStartdatedata, 'MyHoliday')


  const GetAllClassesAndDivisin01: IGetAllClassesAndDivisionsBody = {
    asSchoolId: 18,
    asAcademicYearId: 55,
    associatedStandard: undefined
  }
  useEffect(() => {
    dispatch(GetGetAllClassesAndDivisions(GetAllClassesAndDivisin01));//request madhil get name 
  }, []);

  const GetAllClassesAndDiData = useSelector((state: RootState) => state.HolidayNew.GetAllClassAndDivnew) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(GetAllClassesAndDiData, 'GetAllClassAndDivnew')


  const GetHolidayDetailss: IGetHolidayDetailssBody = {
    asSchoolId: 18,
    asAcademicYrId: 55,
    asSortExp:" 0",
    asStartIndex: 0,
    asPageSize: 20,
    asStandardId: 0,
    asDivisionId: 0
  }
  useEffect(() => {
    dispatch(GetGetHolidayDetailss(GetHolidayDetailss));//request madhil get name 
  }, []);

  const GetHolidayDetailss01 = useSelector((state: RootState) => state.HolidayNew.GetAllClassAndDivnew) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(GetHolidayDetailss01, 'GetHolidayDetailss')




  const GetHomeworkDetails: IGetHomeworkDetailsBody = {
    asSchoolId: 18,
    asAcademicyearId: 55,
    asHomeworkId: 15566

  }
  useEffect(() => {
    dispatch(GetGetHomeworkDetails(GetHomeworkDetails));//request madhil get name 
  }, []);

  const GetHomeworkDetailss01 = useSelector((state: RootState) => state.HolidayNew.GetAllClassAndDivnew) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(GetHomeworkDetailss01, 'GetHomeworkDetails')


  const DeleteHolidayDetails: IDeleteHolidayDetailsBody = {
    asSchoolId: 18,
    asAcademicyearId: 55,
    asHolidayId: 564

  }
  useEffect(() => {
    dispatch(GetDeleteHolidayDetails(DeleteHolidayDetails));//request madhil get name 
  }, []);

  const DeleteHolidayDetails01 = useSelector((state: RootState) => state.HolidayNew.DeleteHolidayDetails) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(DeleteHolidayDetails01, 'GetHomeworkDetails')


  const GetGetHolidayDetails01: IGetHolidayDetailsBody = {
    asHoliday_Id: 563,
    asSchoolId: 18,
    asAcademicYearID: 55


  }
  useEffect(() => {
    dispatch(getGetHolidayDetails(GetGetHolidayDetails01));//request madhil get name 
  }, []);

  const GetGetHolidayDetails = useSelector((state: RootState) => state.HolidayNew.GetHolidayDetails) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(GetGetHolidayDetails, 'GetHolidayDetails')

  const GetHolidayList: IGetHolidayListBody = {
    asSchoolId: 18,
    asAcademicYearId: 55,
    asStandardId: 0,
    asDivisionId: 0
  }
  useEffect(() => {
    dispatch(getGetHolidayList(GetHolidayList));//request madhil get name 
  }, []);

  const HolidayList = useSelector((state: RootState) => state.HolidayNew.GetHolidayList) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(HolidayList, 'GetHolidayList')




  const GetMonthwiseAttendance: IGetMonthwiseAttendance = {
    asSchoolId:18,
    asAcademicyearId: 54,
    asStanardDivisionId: 1264
  }
  useEffect(() => {
    dispatch(GetGetMonthwiseAttendance(GetMonthwiseAttendance));//request madhil get name 
  }, []);

  const MonthwiseAttendance = useSelector((state: RootState) => state.HolidayNew.GetMonthwiseAttendance) //HolidayNew from root reducer, MyHoliday from Request initial state
  console.log(MonthwiseAttendance, 'GetMonthwiseAttendance');



  return (
    <Box sx={{ px: 2 }}>

      <CommonPageHeader
        navLinks={
          [
            {
              title: 'HolidayNew',
              path: '/extended-sidebar/Teacher/HolidayNew'
            }
          ]
        }
      />

    </Box>

  )
}

export default HolidayNew

