import http from "../../Client_Api/SchoolService/schoolServices";
import MissingAttandenceInterface from "src/Interface/Student/MissingAttandenceInterface";


const GetMissingAttandence = (data:MissingAttandenceInterface)=>{
    return http.post<MissingAttandenceInterface>('School/GetAttendanceStatusOfClasses',data);
};

const GetMissingAttandenceApi={
    GetMissingAttandence,
}

export default GetMissingAttandenceApi;