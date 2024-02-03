import {
  IAllPublishUnpublishAddHomeworkBody,
  IDeleteHomeworkBody,
  IDeleteHomeworkDocumentBody,
  IGetAllHomeworkDocumentsBody,
  IGetAllHomeworkDocumentsResult,
  IGetHomeworkDetailBody,
  IGetHomeworkDetailResult,
  IGetHomeworkListForTeacherBody,
  IGetHomeworkListForTeacherResult,
  IGetSubjectListForTeacherBody,
  IGetSubjectListForTeacherResult,
  IGetTeacherSubjectAndClassSubjectBody,
  IGetTeacherSubjectAndClassSubjectResult,
  IPublishUnPublishHomeworkBody,
  ISaveHomeworkBody
} from 'src/interfaces/AssignHomework/IAddHomework';
import http from '../../requests/SchoolService/schoolServices';

const HomeworkList = (data: IGetHomeworkListForTeacherBody) => {
  return http.post<IGetHomeworkListForTeacherResult[]>(
    '/Teacher/GetSubjectListForTeacher',
    data
  );
};

const PublishUnpublish = (data: IPublishUnPublishHomeworkBody) => {
  return http.post('Teacher/PublishUnPublishHomework', data);
};

const HomeworkDetail = (data: IGetHomeworkDetailBody) => {
  return http.post<IGetHomeworkDetailResult>(
    'Homework/GetHomeworkDetails',
    data
  );
};
const Deletehomework = (data: IDeleteHomeworkBody) => {
  return http.post('Teacher/DeleteHomework', data);
};
const SaveHomework = (data: ISaveHomeworkBody) => {
  return http.post('Teacher/SaveUpdateHomework', data);
};
const DeleteDocument = (data: IDeleteHomeworkDocumentBody) => {
  return http.post('Homework/DeleteHomeworkDocument', data);
};
const ApiTeacheSubjectlist = (data: IGetTeacherSubjectAndClassSubjectBody) => {
  return http.post<IGetTeacherSubjectAndClassSubjectResult[]>(
    'Teacher/GetTeacherSubjectAndClassSubject',
    data
  );
};
const GetSubjectListTeacher = (data: IGetSubjectListForTeacherBody) => {
  return http.post<IGetSubjectListForTeacherResult[]>(
    'Teacher/GetSubjectListForTeacher',
    data
  );
};
const HomeworkAllPublishUnpublish = (
  data: IAllPublishUnpublishAddHomeworkBody
) => {
  return http.post('Homework/PublishUnpublishAddHomework', data);
};
const GetAllHomeworkDocuments = (data: IGetAllHomeworkDocumentsBody) => {
  return http.post<IGetAllHomeworkDocumentsResult[]>(
    'Homework/GetAllHomeworkDocuments',
    data
  );
};

const AddHomeworkApi = {
  HomeworkList,
  HomeworkDetail,
  Deletehomework,
  SaveHomework,
  PublishUnpublish,
  DeleteDocument,
  ApiTeacheSubjectlist,
  GetSubjectListTeacher,
  HomeworkAllPublishUnpublish,
  GetAllHomeworkDocuments
};
export default AddHomeworkApi;
