import {
    IGetClassSubjectDropdownBodyCT,
    IGetClassSubjectDropdownResultCT,
} from 'src/interfaces/ExamResult/IExamResultToppers';
import http from '../../requests/SchoolService/schoolServices';

const ClassSubjectDropDownCT = (data: IGetClassSubjectDropdownBodyCT) => {
    return http.post<IGetClassSubjectDropdownResultCT[]>(
        'Teacher/GetClassSubjectsDropDown',
        data
    );
};
//   const ClassExamDropdownCT = (data: IGetexamDropdownBodyCT) => {
//     return http.post<IGetExamDropdownResultCT[]>(
//       'Teacher/GetClassExamDropDown',
//       data
//     );
//   };
//   const ClassSubjectDropdownCT = (data: IGetClassSubjectDropdownBodyCT) => {
//     return http.post<IGetClassSubjectDropdownResultCT[]>(
//       'Teacher/GetClassSubjectsDropDown',
//       data
//     );
//   };
//   const ClassToppersListCT = (data: IGetClassToppersListBOdyCT) => {
//     return http.post<IGetClassToppersListResultCT>(
//       'Teacher/GetClassTopperList',
//       data
//     );
//   };
const ExamResultToppersApi = {
    ClassSubjectDropDownCT
};
export default ExamResultToppersApi;
