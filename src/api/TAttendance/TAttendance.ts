import StandardAttendance ,{GetStandardDivisionsResult}from "src/interfaces/Teacher/TAttendance";
import AttendanceData, { IGetStudentDetails, ISaveAttendance ,
    IGetAttendanceStatusDetails,GetClassAttendanceResult} from "src/interfaces/Teacher/TAttendanceList";
import http from "../../requests/SchoolService/schoolServices";


const GetStandardList = (data:StandardAttendance)=>{
    return http.post<GetStandardDivisionsResult>('Teacher/GetStandardDivisions',data);
};

const GetAttendanceData = (data:AttendanceData)=>{
    return http.post<AttendanceData>('Teacher/GetClassAttendance',data);
};

const GetStudentDetails = (data:IGetStudentDetails) => {
    return http.post<GetClassAttendanceResult[]>('Teacher/GetStudentDetails',data);
}

const SaveStudentAttendanceDetails = (data:ISaveAttendance) => {
    return http.post<ISaveAttendance>('Teacher/SaveStudentAttendanceDetails',data);
}

const GetAttendanceStatus = (data:IGetAttendanceStatusDetails) => {
    return http.post<GetClassAttendanceResult[]>('Teacher/GetAttendanceStatus',data);
}
const GetTAttendanceListApi={
    GetStandardList,
    GetAttendanceData,
    GetStudentDetails,
    SaveStudentAttendanceDetails,
    GetAttendanceStatus
    
}

export default GetTAttendanceListApi

