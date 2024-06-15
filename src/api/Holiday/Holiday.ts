import IHolidays, {
  EditHolidayDetailsResult,
  GetHolidayListResult,
  GetHolidayListResult1,

  IAllClassesAndDivisionsBody,

  IAllClassesAndDivisionsResult,

  IGetHolidayBody,
  IGetNameAndStartDateEndDateValidationBody,
  IGetNameAndStartDateEndDateValidationResult,
  IHolidaysFA,
  ISelectedStandardAndDivisionCheckBoxBody,
  ISelectedStandardAndDivisionCheckBoxResult,
  SaveHolidayDetailsBody,
  SaveHolidayDetailsResult
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

//3.AllClassesAndDivisions
const AllClassesAndDivisions = (data: IAllClassesAndDivisionsBody) => {
  return http.post<IAllClassesAndDivisionsResult[]>('Teacher/GetAllClassesAndDivisions', data);
}

const SelectedStandardAndDivisionCheckBox = (data: ISelectedStandardAndDivisionCheckBoxBody) => {
  return http.post<ISelectedStandardAndDivisionCheckBoxResult[]>('Teacher/GetSelectedStandardAndDivisionCheckBox', data);
}

const SaveHolidays = (data: SaveHolidayDetailsBody) => {
  return http.post<SaveHolidayDetailsResult>('Teacher/SaveHolidayDetails', data);
}


const GetNameAndStartDateEndDateValidation = (data: IGetNameAndStartDateEndDateValidationBody) => {
  return http.post<IGetNameAndStartDateEndDateValidationResult>('Teacher/GetHolidayNameAndStartDateEnddateValidationForSave', data);

};



const HolidaysApi = {
  GetHolidayList,
  GetHolidayList1,
  GetDeleteHoliday,
  GetEditHolidayDetails,
  AllClassesAndDivisions,
  SelectedStandardAndDivisionCheckBox,
  SaveHolidays,
  GetNameAndStartDateEndDateValidation

};




export default HolidaysApi;