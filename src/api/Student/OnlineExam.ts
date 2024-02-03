import IOnlineTest, {
  GetQuestionsForOnlineExamResult,
  GetSaveOnlineExamDetailsResult,
  GetSubmitOnlineExamResult,
  IExamData,
  IOnlineExamQuestions,
  IOnlineTestSubject,
  ISaveOnlineExamDetailsBody,
  ISubmitOnlineExamBody
} from '../../interfaces/Student/OnlineExam';
import http from '../../requests/SchoolService/schoolServices';

const GetOnlineExamList = (data: IOnlineTest) => {
  return http.post<IOnlineTest>('Student/GetAllTestsForStudent', data);
};

const GetOnlineExamSubjectList = (data: IOnlineTestSubject) => {
  return http.post<IOnlineTestSubject>('Student/AllSubjectsForExam', data);
};

const GetOnlineExamQuestionsDetail = (data: IOnlineExamQuestions) => {
  return http.post<GetQuestionsForOnlineExamResult>(
    'Student/GetQuestionsForOnlineExam',
    data
  );
};
const AllExamData = (data: IExamData) => {
  return http.post('Student/GetQuestionsForOnlineExam', data);
};
const SubmitExam = (data: ISubmitOnlineExamBody) => {
  return http.post<GetSubmitOnlineExamResult>('Student/SubmitOnlineExam', data);
};
const SaveExam = (data: ISaveOnlineExamDetailsBody) => {
  return http.post<GetSaveOnlineExamDetailsResult>(
    'Student/SaveOnlineExamDetails',
    data
  );
};

const GetOnlineExamListApi = {
  GetOnlineExamList,
  GetOnlineExamSubjectList,
  GetOnlineExamQuestionsDetail,
  AllExamData,
  SubmitExam,
  SaveExam
};

export default GetOnlineExamListApi;
