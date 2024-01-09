import http from "../../requests/SchoolService/schoolServices"
import { IGetStandardExamDropdownBody,IGetStandardExamDropdownResult ,IGetSubjectDropdownBody,IGetSubjectDropdownResult,IGetStandardToppersListBOdy,IGetStandardToppersListResult} from "src/interfaces/FinalResult/IStandardToppers"

const StandardExamDropdown=
(data:IGetStandardExamDropdownBody)=>{
    return http.post<IGetStandardExamDropdownResult[]>('Teacher/GetStandardExamDropDown',data)
};
const ClassSubjectDropdown=
(data:IGetSubjectDropdownBody)=>{
    return http.post<IGetSubjectDropdownResult[]>('Teacher/GetClassSubjectsDropDown',data)
};
const StandardToppersList=
(data:IGetStandardToppersListBOdy)=>{
    return http.post<IGetStandardToppersListResult>('Teacher/GetStandardTopperList',data)
};


const StandardToppersApi={
    StandardExamDropdown,
    ClassSubjectDropdown,
    StandardToppersList
}

export default StandardToppersApi