
import http from "../../requests/SchoolService/schoolServices";
import ISelectExam from "../../interfaces/Student/ExamSchedule"
import IExamList from "../../interfaces/Student/ExamSchedule"


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