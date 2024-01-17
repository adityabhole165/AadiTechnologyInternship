import http from "../../requests/SchoolService/schoolServices"
import { IGetStandardDropdownBody,IGetStandardDropdownResult,IGetStandardExamDropdownBody,IGetStandardExamDropdownResult ,IGetSubjectDropdownBody,IGetSubjectDropdownResult,IGetStandardToppersListBOdy,IGetStandardToppersListResult} from "src/interfaces/FinalResult/IStandardToppers"


const StandardDropdownList=
(data:IGetStandardDropdownBody)=>{
    return http.post<IGetStandardDropdownResult[]>('Teacher/GetStandardsDropDown',data)
};

const StandardExamDropdown=
(data:IGetStandardExamDropdownBody)=>{
    return http.post<IGetStandardExamDropdownResult[]>('Teacher/GetStandardExamDropDown',data)
};
const ClassSubjectDropdown=
(data:IGetSubjectDropdownBody)=>{
    return http.post<IGetSubjectDropdownResult[]>('Teacher/GetStandardSubjectsDropDown',data)
};
const StandardToppersList=
(data:IGetStandardToppersListBOdy)=>{
    return http.post<IGetStandardToppersListResult>('Teacher/GetStandardTopperList',data)
};


const StandardToppersApi={
    StandardExamDropdown,
    ClassSubjectDropdown,
    StandardToppersList,
    StandardDropdownList
}

export default StandardToppersApi