import http from "../../requests/SchoolService/schoolServices";
import MissingAttandenceInterface from "src/interfaces/Student/MissingAttandenceInterface";


const GetMissingAttandence = (data:MissingAttandenceInterface)=>{
    return http.post<MissingAttandenceInterface>('School/GetAttendanceStatusOfClasses',data);
};

const GetMissingAttandenceApi={
    GetMissingAttandence,
}

export default GetMissingAttandenceApi;