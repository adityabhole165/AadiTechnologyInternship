import StandardAttendance from "src/Interface/Teacher/TAttendance";
import AttendanceData, { IGetStudentDetails, ISaveAttendance } from "src/Interface/Teacher/TAttendanceList";
import http from "../../Client_Api/SchoolService/schoolServices";


const GetStandardList = (data:StandardAttendance)=>{
    return http.post<StandardAttendance>('Teacher/GetStandardDivisions',data);
};

const GetAttendanceData = (data:AttendanceData)=>{
    return http.post<AttendanceData>('Teacher/GetClassAttendance',data);
};

const GetStudentDetails = (data:IGetStudentDetails) => {
    return http.post<IGetStudentDetails>('Teacher/GetStudentDetails',data);
}

const SaveStudentAttendanceDetails = (data:ISaveAttendance) => {
    return http.post<ISaveAttendance>('Teacher/SaveStudentAttendanceDetails',data);
}

const GetTAttendanceListApi={
    GetStandardList,
    GetAttendanceData,
    GetStudentDetails,
    SaveStudentAttendanceDetails
    
}

export default GetTAttendanceListApi

