import {
  IDeleteHomeworkDocumentBody,
  IGetAllHomeworkDocumentsBody,
  IGetAllHomeworkDocumentsResult
} from 'src/interfaces/AssignHomework/IHomeworkDocuments';
import http from '../../requests/SchoolService/schoolServices';

const GetAllHomeworkDocuments = (data: IGetAllHomeworkDocumentsBody) => {
  return http.post<IGetAllHomeworkDocumentsResult[]>(
    'Homework/GetAllHomeworkDocuments',
    data
  );
};
const DeleteDocument = (data: IDeleteHomeworkDocumentBody) => {
  return http.post('Homework/DeleteHomeworkDocument', data);
};
const ApiHomeworkDocuments = {
  GetAllHomeworkDocuments,
  DeleteDocument
};
export default ApiHomeworkDocuments;
