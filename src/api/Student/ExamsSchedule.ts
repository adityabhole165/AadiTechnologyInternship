
import http from "../../Client_Api/SchoolService/schoolServices";
import ISelectExam from "../../Interface/Student/ExamSchedule"
import IExamList from "../../Interface/Student/ExamSchedule"


const GetSelectExamList  = (data: ISelectExam) => {

    return http.post<ISelectExam>('School/GetExamsForStandard',data);
};

const GetExamsList  = (data: IExamList) => {

    return http.post<IExamList>('School/GetExamScheduleForStandard',data);
};
const GetSelectExamApi= {
    GetSelectExamList,
    GetExamsList
}

export default GetSelectExamApi;