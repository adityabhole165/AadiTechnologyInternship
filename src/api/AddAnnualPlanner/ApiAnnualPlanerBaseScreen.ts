import {
  IGetAllAcademicYearsForSchoolEVBody,
  IGetAllAcademicYearsForSchoolEVResult,
  IGetAllDivisionsForStandardDropDownBody,
  IGetAllDivisionsForStandardDropDownResult,
  IGetAllEventsBody,
  IGetAllEventsResult,
  IGetAllMonthsDropDownBody,
  IGetAllMonthsDropDownResult,
  IGetAssociatedStandardsBodyP,
  IGetAssociatedStandardsEVBody,
  IGetAssociatedStandardsEVResult,
  IGetAssociatedStandardsResultP,
  IGetAssociatedStdLstForTeacherDropDownBody,
  IGetAssociatedStdLstForTeacherDropDownResult,
  IGetEventsDataListBody,
  IGetEventsDataListResult,
  IGetYearsForAnnualPalannerDropDownBody,
  IGetYearsForAnnualPalannerDropDownResult,
  INewGetAllMonthsDropDownotBody,
  INewGetAllMonthsDropDownotResult,
  INewGetAssociatedStdLstForTeacherDropDownBody,
  INewGetAssociatedStdLstForTeacherDropDownResult,
} from 'src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen';
import { IGetTeacherDetailsForControlPanelBody, IGetTeacherDetailsForControlPanelResult } from 'src/interfaces/ExamResult/IExamResult';
import http from '../../requests/SchoolService/schoolServices';

const StandardDropDown = (data: IGetAssociatedStdLstForTeacherDropDownBody) => {
  return http.post<IGetAssociatedStdLstForTeacherDropDownResult[]>(
    'Teacher/GetAssociatedStdLstForTeacherDropDown',
    data
  );
};

const DivisionDropDown = (data: IGetAllDivisionsForStandardDropDownBody) => {
  return http.post<IGetAllDivisionsForStandardDropDownResult[]>(
    'Teacher/GetAllDivisionsForStandardDropDown',
    data
  );
};

const MonthsDropDown = (data: IGetAllMonthsDropDownBody) => {
  return http.post<IGetAllMonthsDropDownResult[]>(
    'Teacher/GetAllMonthsDropDown',
    data
  );
};
const YearsDropDown = (data: IGetYearsForAnnualPalannerDropDownBody) => {
  return http.post<IGetYearsForAnnualPalannerDropDownResult[]>(
    'Teacher/GetYearsForAnnualPalannerDropDown',
    data
  );
};

const EventsDataList = (data: IGetEventsDataListBody) => {
  return http.post<IGetEventsDataListResult[]>(
    'Teacher/GetEventsDataList',
    data
  );
};
const AssociatedStandardP = (data: IGetAssociatedStandardsBodyP) => {
  return http.post<IGetAssociatedStandardsResultP[]>(
    'Teacher/GetAssociatedStandards',
    data
  );
};

const AssociatedStandardEventoverview = (
  data: IGetAssociatedStandardsEVBody
) => {
  return http.post<IGetAssociatedStandardsEVResult[]>(
    'Teacher/GetAssociatedStandards',
    data
  );
};

const GetAllAcademicYearsForSchool = (
  data: IGetAllAcademicYearsForSchoolEVBody
) => {
  return http.post<IGetAllAcademicYearsForSchoolEVResult[]>(
    'Teacher/GetAllAcademicYearsForSchool',
    data
  );
};

const GetAllMonthsDropDown = (data: IGetAllMonthsDropDownBody) => {
  return http.post<IGetAllMonthsDropDownResult[]>(
    'Teacher/GetAllAcademicYearsForSchool',
    data
  );
};

const GetAllEvents = (data: IGetAllEventsBody) => {
  return http.post<IGetAllEventsResult[]>('Teacher/GetAllEvents', data);
};

const Stdlist = (data: INewGetAssociatedStdLstForTeacherDropDownBody) => {
  return http.post<INewGetAssociatedStdLstForTeacherDropDownResult[]>(
    'Teacher/GetAssociatedStdLstForTeacherDropDown',
    data
  );
};

const MonthList = (data: INewGetAllMonthsDropDownotBody) => {
  return http.post<INewGetAllMonthsDropDownotResult[]>(
    'Teacher/GetAllMonthsDropDown',
    data
  );
};
const GetTeacherDetailsForControlPanel = (data: IGetTeacherDetailsForControlPanelBody) => {
  return http.post<IGetTeacherDetailsForControlPanelResult>(
    'Teacher/GetTeacherDetailsForControlPanel',
    data
  );
};
const ApiAnnualPlanerBaseScreen = {
  StandardDropDown,
  DivisionDropDown,
  MonthsDropDown,
  YearsDropDown,
  EventsDataList,
  AssociatedStandardP,
  AssociatedStandardEventoverview,
  GetAllAcademicYearsForSchool,
  GetAllMonthsDropDown,
  GetAllEvents,
  Stdlist,
  MonthList,
  GetTeacherDetailsForControlPanel
};

export default ApiAnnualPlanerBaseScreen;
