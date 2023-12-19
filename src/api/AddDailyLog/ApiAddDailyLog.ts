import http from "../../requests/SchoolService/schoolServices";
import { ISaveDailyLogBody ,IGetAllHomeworkDailyLogsBody,IGetAllHomeworkDailyLogsResult} from "src/interfaces/AddDailyLog/IAddDailyLog";

const SaveDailyLog = (data:ISaveDailyLogBody) => {
    return http.post('Teacher/SaveDailyLog',data);
};
const GetAllHomeworkDailyLogs = (data:IGetAllHomeworkDailyLogsBody) => {
    return http.post<IGetAllHomeworkDailyLogsResult[]>('Teacher/GetAllHomeworkDailyLogs',data);
};
// const StudentList = (data:IStudentsListBody) => {
//     return http.post<IStudentsListResult[]>('Teacher/GetStudentListToCaptureHeighthWeight',data);
// };
// const UpdateStudentList = (data:IUpdateStudentDetailsBody) => {
//     return http.post('Teacher/UpdateStudentDetailsForHeightWeight',data);
// };

const DailyLogApi ={
    SaveDailyLog,
    GetAllHomeworkDailyLogs,
    
    
}

export default DailyLogApi