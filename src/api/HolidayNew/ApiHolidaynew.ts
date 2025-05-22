import { IDeleteHolidayDetailsBody, IDeleteHolidayDetailsResult, IGetAllClassesAndDivisionsBody, IGetAllClassesAndDivisionsResult, IGetHolidayDetailsBody, IGetHolidayDetailsResult, IGetHolidayDetailssBody, IGetHolidayDetailssResult, IGetHolidayListBody, IGetHolidayListResult, IGetHolidaynameAndStartDateEnddateValidationBody, IGetHolidaynameAndStartDateEnddateValidationResult, IGetHomeworkDetailsBody, IGetMonthwiseAttendance, IGetMonthwiseAttendanceResult, SaveHolidayDetailsBody, SaveHolidayDetailsResult } from "src/interfaces/HolidayNew/IHolidays";
import http from '../../requests/SchoolService/schoolServices';
import { IGetSchoolSettingsResult, ISchoolsettingBody } from "src/interfaces/AssignExamMarks/IAssignExamMarks";




const SaveHolidaysNew = (data: SaveHolidayDetailsBody) => {
    return http.post<SaveHolidayDetailsResult>('Holiday/SaveHolidayDetails', data);
};

const GetHolidayNameAndStartDateEndDateValidation = (data: IGetHolidaynameAndStartDateEnddateValidationBody) => {
    return http.post<IGetHolidaynameAndStartDateEnddateValidationResult>('Teacher/GetHolidayNameAndStartDateEnddateValidationForSave', data);
};

const GetAllClassesAndDivisions = (data: IGetAllClassesAndDivisionsBody) => {
    return http.post<IGetAllClassesAndDivisionsResult>('Teacher/GetAllClassesAndDivisions', data);
};

const GetHolidayDetailss = (data: IGetHolidayDetailssBody) => {
    return http.post<IGetHolidayDetailssResult>('Teacher/GetHolidayDetailss', data);
};


const GetHomeworkDetails = (data: IGetHomeworkDetailsBody) => {
    return http.post<IGetHolidayDetailssResult>('Homework/GetHomeworkDetails', data);
}

const DeleteHolidayDetails = (data: IDeleteHolidayDetailsBody) => {
    return http.post<IDeleteHolidayDetailsResult>('Teacher/DeleteHolidayDetails', data);
}
const GetHolidayDetails = (data: IGetHolidayDetailsBody) => {
    return http.post<IGetHolidayDetailsResult>('Teacher/GetHolidayDetails', data);
}
const GetHolidayList = (data: IGetHolidayListBody) => {
    return http.post<IGetHolidayListResult>('School/GetHolidayList', data);
}
const GetMonthwiseAttendance = (data: IGetMonthwiseAttendance) => {
    return http.post<IGetMonthwiseAttendanceResult>('/Teacher/GetMonthwiseAttendance', data);
}
const GetSchoolSettings = (data: ISchoolsettingBody) => {
    return http.post<IGetSchoolSettingsResult>('School/GetSchoolSettings', data);
  };

const HolidayApi = {
    SaveHolidaysNew,
    GetHolidayNameAndStartDateEndDateValidation,
    GetAllClassesAndDivisions,
    GetHolidayDetailss,
    GetHomeworkDetails,
    DeleteHolidayDetails,
    GetHolidayDetails,
    GetHolidayList,
    GetMonthwiseAttendance,
    GetSchoolSettings

}

export default HolidayApi;
// path deto 