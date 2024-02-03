import {
  IDeleteHomeworkBody,
  IGetAllHomeworkDocumentsBody,
  IGetAllHomeworkDocumentsResult,
  IGetHomeworkDetailBody,
  IGetHomeworkDetailResult,
  IGetSubjectListForTeacherBody,
  IGetSubjectListForTeacherResult,
  IPublishUnPublishHomeworkBody
} from 'src/interfaces/AssignHomework/IHomeworkSubjectList';
import http from '../../requests/SchoolService/schoolServices';

const ApiHomeworkSubjectList = (data: IGetSubjectListForTeacherBody) => {
  return http.post<IGetSubjectListForTeacherResult[]>(
    'Teacher/GetSubjectListForTeacher',
    data
  );
};

const PublishUnpublish = (data: IPublishUnPublishHomeworkBody) => {
  return http.post('Teacher/PublishUnPublishHomework', data);
};

const GetAllHomeworkDocuments = (data: IGetAllHomeworkDocumentsBody) => {
  return http.post<IGetAllHomeworkDocumentsResult[]>(
    'Homework/GetAllHomeworkDocuments',
    data
  );
};

const Deletehomework = (data: IDeleteHomeworkBody) => {
  return http.post('Teacher/DeleteHomework', data);
};

const GetHomeworkDetails = (data: IGetHomeworkDetailBody) => {
  return http.post<IGetHomeworkDetailResult[]>(
    'Homework/GetHomeworkDetails',
    data
  );
};

const HomeworkListTeacher = {
  ApiHomeworkSubjectList,
  PublishUnpublish,
  GetAllHomeworkDocuments,
  Deletehomework,
  GetHomeworkDetails
};
export default HomeworkListTeacher;
