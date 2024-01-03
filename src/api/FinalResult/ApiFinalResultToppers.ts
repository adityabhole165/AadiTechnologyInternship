import http from "../../requests/SchoolService/schoolServices"
import { IGetClassDropdownBody,IGetClassDropdownResult,IGetexamDropdownBody,IGetExamDropdownResult,IGetClassSubjectDropdownBody,IGetClassSubjectDropdownResult,IGetClassToppersListBOdy,IGetClassToppersListResult } from "src/interfaces/FinalResult/IFinalResultToppers"

const ClassDropdown=
(data:IGetClassDropdownBody) => {
    return http.post<IGetClassDropdownResult[]>('Teacher/GetClassForExamDropDown', data)
};
const ClassExamDropdown=
(data:IGetexamDropdownBody)=>{
    return http.post<IGetExamDropdownResult[]>('Teacher/GetClassExamDropDown',data)
};
const ClassSubjectDropdown=
(data:IGetClassSubjectDropdownBody)=>{
    return http.post<IGetClassSubjectDropdownResult[]>('Teacher/GetClassSubjectsDropDown',data)
};
const ClassToppersList=
(data:IGetClassToppersListBOdy)=>{
    return http.post<IGetClassToppersListResult[]>('Teacher/GetClassTopperList',data)
};
const FinalResultToppersApi={
    ClassDropdown,
    ClassExamDropdown,
    ClassSubjectDropdown,
    ClassToppersList
}
export default FinalResultToppersApi
