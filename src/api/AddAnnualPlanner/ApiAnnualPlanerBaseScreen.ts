
import http from "../../requests/SchoolService/schoolServices";
import { IGetAssociatedStdLstForTeacherDropDownBody,  IGetAllDivisionsForStandardDropDownBody , IGetAllMonthsDropDownBody ,IGetYearsForAnnualPalannerDropDownBody, IGetEventsDataListBody , IGetAssociatedStdLstForTeacherDropDownResult , IGetAllDivisionsForStandardDropDownResult , IGetAllMonthsDropDownResult ,IGetYearsForAnnualPalannerDropDownResult ,IGetEventsDataListResult,IGetAssociatedStandardsBodyP,IGetAssociatedStandardsResultP,IGetAssociatedStandardsEVBody,IGetAssociatedStandardsEVResult, IGetAllAcademicYearsForSchoolEVBody, IGetAllAcademicYearsForSchoolEVResult, IGetAllEventsBody, IGetAllEventsResult} from "src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen"

const  StandardDropDown = (data: IGetAssociatedStdLstForTeacherDropDownBody) => {
 return http.post<IGetAssociatedStdLstForTeacherDropDownResult[]>('Teacher/GetAssociatedStdLstForTeacherDropDown',data);
};

const  DivisionDropDown = (data: IGetAllDivisionsForStandardDropDownBody) => {
    return http.post<IGetAllDivisionsForStandardDropDownResult[]>('Teacher/GetAllDivisionsForStandardDropDown',data);
};

const  MonthsDropDown = (data: IGetAllMonthsDropDownBody) => {
    return http.post<IGetAllMonthsDropDownResult[]>('Teacher/GetAllMonthsDropDown',data);
};
const  YearsDropDown= (data: IGetYearsForAnnualPalannerDropDownBody) => {
    return http.post<IGetYearsForAnnualPalannerDropDownResult[]>('Teacher/GetYearsForAnnualPalannerDropDown',data);
};

const  EventsDataList= (data: IGetEventsDataListBody) => {
    return http.post<IGetEventsDataListResult[]>('Teacher/GetEventsDataList',data);
};
const AssociatedStandardP = (data: IGetAssociatedStandardsBodyP) => {
    return http.post< IGetAssociatedStandardsResultP[]>('Teacher/GetAssociatedStandards',data);
   };


   const AssociatedStandardEventoverview = (data: IGetAssociatedStandardsEVBody) => {
    return http.post< IGetAssociatedStandardsEVResult[]>('Teacher/GetAssociatedStandards',data);
   };

   const GetAllAcademicYearsForSchool = (data: IGetAllAcademicYearsForSchoolEVBody) => {
    return http.post< IGetAllAcademicYearsForSchoolEVResult[]>('Teacher/GetAllAcademicYearsForSchool',data);
   };

   const GetAllMonthsDropDown = (data: IGetAllMonthsDropDownBody) => {
    return http.post< IGetAllMonthsDropDownResult[]>('Teacher/GetAllAcademicYearsForSchool',data);
   };

   const GetAllEvents = (data: IGetAllEventsBody) => {
    return http.post< IGetAllEventsResult[]>('Teacher/GetAllAcademicYearsForSchool',data);
   };


   
   

const ApiAnnualPlanerBaseScreen ={
   
    StandardDropDown,
    DivisionDropDown,
    MonthsDropDown,
    YearsDropDown,
    EventsDataList,
    AssociatedStandardP,
    AssociatedStandardEventoverview,
    GetAllAcademicYearsForSchool,
    GetAllMonthsDropDown,
    GetAllEvents
}


export default ApiAnnualPlanerBaseScreen