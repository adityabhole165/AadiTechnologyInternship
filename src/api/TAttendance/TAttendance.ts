import StandardAttendance ,{GetStandardDivisionsResult}from "src/interfaces/Teacher/TAttendance";
import GetClassAttendance, { IGetStudentDetails, ISaveAttendance ,IGetAttendanceStatus,
    IGetAttendanceStatusResult,GetStudentDetailsResult,IGetClassAttendanceResult} from "src/interfaces/Teacher/TAttendanceList";
import http from "../../requests/SchoolService/schoolServices";


const GetStandardList = (data:StandardAttendance)=>{
    return http.post<GetStandardDivisionsResult>('Teacher/GetStandardDivisions',data);
};

const GetAttendanceData = (data:GetClassAttendance)=>{
    return http.post<IGetClassAttendanceResult[]>('Teacher/GetClassAttendance',data);
};

const GetStudentDetails = (data:IGetStudentDetails) => {
    return http.post<GetStudentDetailsResult[]>('Teacher/GetStudentDetails',data);
}

const SaveStudentAttendanceDetails = (data:ISaveAttendance) => {
    return http.post<ISaveAttendance>('Teacher/SaveStudentAttendanceDetails',data);
}

const GetAttendanceStatus = (data:IGetAttendanceStatus) => {
    return http.post<IGetAttendanceStatusResult[]>('Teacher/GetAttendanceStatus',data);
}
const GetTAttendanceListApi={
    GetStandardList,
    GetAttendanceData,
    GetStudentDetails,
    SaveStudentAttendanceDetails,
    GetAttendanceStatus,
    
}

export default GetTAttendanceListApi

