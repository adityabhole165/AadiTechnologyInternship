import {
    IGetClassExamDropDownBodyCT,
    IGetClassExamDropDownResultCT,
    IGetClassNameDropDownBodyCT,
    IGetClassNameDropDownResultCT,
    IGetClassSubjectDropdownBodyCT,
    IGetClassSubjectDropdownResultCT,
    IGetClassToppersListResultCT,
    IGetClassToppersListBOdyCT
} from 'src/interfaces/ExamResult/IExamResultToppers';
import http from '../../requests/SchoolService/schoolServices';

const ClassSubjectDropDownCT = (data: IGetClassSubjectDropdownBodyCT) => {
    return http.post<IGetClassSubjectDropdownResultCT[]>(
        'Teacher/GetClassSubjectsDropDown',
        data
    );
};
const ClassExamDropdownCT = (data: IGetClassExamDropDownBodyCT) => {
    return http.post<IGetClassExamDropDownResultCT[]>(
        'Teacher/GetClassExamDropDown',
        data
    );
};
const ClassNameDropdownCT = (data: IGetClassNameDropDownBodyCT) => {
    return http.post<IGetClassNameDropDownResultCT[]>(
        'Teacher/GetClassForExamDropDown',
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
    ClassSubjectDropDownCT,
    ClassExamDropdownCT,
    ClassNameDropdownCT,
    ClassToppersListCT
};
export default ExamResultToppersApi;
