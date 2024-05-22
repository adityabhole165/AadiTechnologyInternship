import IHolidays, {
  EditHolidayDetailsResult,
  GetHolidayListResult,
  GetHolidayListResult1,

  IGetHolidayBody,
  IHolidaysFA
} from '../../interfaces/Common/Holidays';
import http from '../../requests/SchoolService/schoolServices';

const GetHolidayList = (data: IHolidays) => {
  return http.post<GetHolidayListResult>('School/GetHolidayList', data);
};

const GetHolidayList1 = (data: IHolidaysFA) => {
  return http.post<GetHolidayListResult1[]>('Teacher/GetHolidayDetailss', data);
};

const GetDeleteHoliday = (data: IGetHolidayBody) => {
  return http.post<string>('Teacher/DeleteHolidayDetails', data);
};

const GetEditHolidayDetails = (data: IGetHolidayBody) => {
  return http.post<EditHolidayDetailsResult[]>('Teacher/GetHolidayDetails', data);
}

const HolidaysApi = {
  GetHolidayList,
  GetHolidayList1,
  GetDeleteHoliday,
  GetEditHolidayDetails,

};




export default HolidaysApi;