import {
  IGetClassDropdownBodyCT,
  IGetClassDropdownResultCT,
  IGetClassSubjectDropdownBodyCT,
  IGetClassSubjectDropdownResultCT,
  IGetClassToppersListBOdyCT,
  IGetClassToppersListResultCT,
  IGetExamDropdownResultCT,
  IGetexamDropdownBodyCT,
  IGetStandardDropdownBodyST,
  IGetStandardDropdownResultST,
  IGetStandardExamDropdownBodyST,
  IGetStandardExamDropdownResultST,
  IGetSubjectDropdownBodyST,
  IGetSubjectDropdownResultST,
  IGetStandardToppersListBOdyST,
  IGetStandardToppersListResultST
} from 'src/interfaces/ExamResult/IExamResultToppers';
import http from '../../requests/SchoolService/schoolServices';

const ClassDropdownCT = (data: IGetClassDropdownBodyCT) => {
  return http.post<IGetClassDropdownResultCT[]>(
    'Teacher/GetClassForExamDropDown',
    data
  );
};
const ClassExamDropdownCT = (data: IGetexamDropdownBodyCT) => {
  return http.post<IGetExamDropdownResultCT[]>(
    'Teacher/GetClassExamDropDown',
    data
  );
};
const ClassSubjectDropdownCT = (data: IGetClassSubjectDropdownBodyCT) => {
  return http.post<IGetClassSubjectDropdownResultCT[]>(
    'Teacher/GetClassSubjectsDropDown',
    data
  );
};
const ClassToppersListCT = (data: IGetClassToppersListBOdyCT) => {
  return http.post<IGetClassToppersListResultCT>(
    'Teacher/GetClassTopperList',
    data
  );
};
const StandardDropdownListST = (data: IGetStandardDropdownBodyST) => {
  return http.post<IGetStandardDropdownResultST[]>(
    'Teacher/GetStandardsDropDown',
    data
  );
};

const StandardExamDropdownST = (data: IGetStandardExamDropdownBodyST) => {
  return http.post<IGetStandardExamDropdownResultST[]>(
    'Teacher/GetStandardExamDropDown',
    data
  );
};
const ClassSubjectDropdownST = (data: IGetSubjectDropdownBodyST) => {
  return http.post<IGetSubjectDropdownResultST[]>(
    'Teacher/GetStandardSubjectsDropDown',
    data
  );
};
const StandardToppersListST = (data: IGetStandardToppersListBOdyST) => {
  return http.post<IGetStandardToppersListResultST>(
    'Teacher/GetStandardTopperList',
    data
  );
};

const ExamResultToppersApi = {
  ClassDropdownCT,
ClassExamDropdownCT,
ClassSubjectDropdownCT,
ClassToppersListCT,
StandardExamDropdownST,
ClassSubjectDropdownST,
StandardToppersListST,
StandardDropdownListST
};
export default ExamResultToppersApi;
