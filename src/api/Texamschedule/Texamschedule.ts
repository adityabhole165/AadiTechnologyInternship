import http from "../../requests/SchoolService/schoolServices";
import IGetAllStandards,{GetStandardListResult} from "src/interfaces/Teacher/TExamSchedule"
import IGetExamsList from "src/interfaces/Teacher/TExamSchedule"
import IExamList from "src/interfaces/Teacher/TExamSchedule"


const GetAllStandards  =  (data:IGetAllStandards) =>{
    return http.post<GetStandardListResult>('School/GetAllStandards',data);
};

const IGetExams =  (data:IGetExamsList) =>{
    return http.post<GetStandardListResult>('School/GetExamsForStandard',data);
};

const GetExamsList  = (data: IExamList) => {

    return http.post<IExamList>('School/GetExamScheduleForStandard',data);
};


const GetTExamResultListApi ={
    GetAllStandards,
    IGetExams,
    GetExamsList
}

export default GetTExamResultListApi