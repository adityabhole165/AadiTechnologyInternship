import http from "../../Client_Api/SchoolService/schoolServices";
import IGetAllStandards from "src/Interface/Teacher/TExamSchedule"
import IGetExamsList from "src/Interface/Teacher/TExamSchedule"
import IExamList from "src/Interface/Teacher/TExamSchedule"


const GetAllStandards  =  (data:IGetAllStandards) =>{
    return http.post<IGetAllStandards>('School/GetAllStandards',data);
};

const IGetExams =  (data:IGetExamsList) =>{
    return http.post<IGetExamsList>('School/GetExamsForStandard',data);
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