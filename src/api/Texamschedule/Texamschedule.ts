import http from "../../requests/SchoolService/schoolServices";
import IGetAllStandards,{GetStandardListResult,GetExamsForStandardResult} from "src/interfaces/Teacher/TExamSchedule"
import {IGetExamsList} from "src/interfaces/Teacher/TExamSchedule"
import {IExamList,GetExamsListResult} from "src/interfaces/Teacher/TExamSchedule"


const GetAllStandards  =  (data:IGetAllStandards) =>{
    return http.post<GetStandardListResult>('School/GetAllStandards',data);
};

const IGetExams =  (data:IGetExamsList) =>{
    return http.post<GetExamsForStandardResult>('School/GetExamsForStandard',data);
};

const GetExamsList  = (data: IExamList) => {

    return http.post<GetExamsListResult>('School/GetExamScheduleForStandard',data);
};


const GetTExamResultListApi ={
    GetAllStandards,
    IGetExams,
    GetExamsList
}

export default GetTExamResultListApi