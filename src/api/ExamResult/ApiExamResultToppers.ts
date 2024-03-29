import {
    IGetClassDropdownBodyCT,
    IGetClassDropdownResultCT,
    IGetClassSubjectDropdownBodyCT,
    IGetClassSubjectDropdownResultCT,
    IGetClassToppersListBOdyCT,
    IGetClassToppersListResultCT,
    IGetExamDropdownResultCT,
    IGetexamDropdownBodyCT
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
const ExamResultToppersApi = {
    ClassDropdownCT,
  ClassExamDropdownCT,
  ClassSubjectDropdownCT,
  ClassToppersListCT
};
export default ExamResultToppersApi;
