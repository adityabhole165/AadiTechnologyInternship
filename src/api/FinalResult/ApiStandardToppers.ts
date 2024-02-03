import {
  IGetStandardDropdownBodyST,
  IGetStandardDropdownResultST,
  IGetStandardExamDropdownBodyST,
  IGetStandardExamDropdownResultST,
  IGetStandardToppersListBOdyST,
  IGetStandardToppersListResultST,
  IGetSubjectDropdownBodyST,
  IGetSubjectDropdownResultST
} from 'src/interfaces/FinalResult/IStandardToppers';
import http from '../../requests/SchoolService/schoolServices';

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

const StandardToppersApiST = {
  StandardExamDropdownST,
  ClassSubjectDropdownST,
  StandardToppersListST,
  StandardDropdownListST
};

export default StandardToppersApiST;
