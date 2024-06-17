import { IGetClassDivandStandardDropdownBody, IGetClassDivandStandardDropdownResult, IGetClassandStandardToppersListBody, IGetClassandStandardToppersListResult, IGetExamDropdownResult, IGetLatestExamIdandDropdownBody, IGetSubjectDropdownBody, IGetSubjectDropdownResult } from 'src/interfaces/ExamResult/IToppers';
import http from '../../requests/SchoolService/schoolServices';

const ClassandStandardDropdown = (data: IGetClassDivandStandardDropdownBody) => {
    return http.post<IGetClassDivandStandardDropdownResult[]>(
        'Teacher/GetAssociatedStandardsAndDivisionsDropdownForToppers',
        data
    );
};

const ClassandStandardExamDropdown = (data: IGetLatestExamIdandDropdownBody) => {
    return http.post<IGetExamDropdownResult[]>(
        'Teacher/GetClassAndStandardExamDropDownForToppers',
        data
    );
};
const ClassandStandardSubjectDropdown = (data: IGetSubjectDropdownBody) => {
    return http.post<IGetSubjectDropdownResult[]>(
        'Teacher/GetStandardAndDivisionToppersSubjectsDropDown',
        data
    );
};
const ClassandStandardToppersList = (data: IGetClassandStandardToppersListBody) => {
    return http.post<IGetClassandStandardToppersListResult>(
        'Teacher/GetClassAndStandardToppersList',
        data
    );
};

const ToppersApi = {
    ClassandStandardDropdown,
    ClassandStandardExamDropdown,
    ClassandStandardSubjectDropdown,
    ClassandStandardToppersList
}

export default ToppersApi;