import {
  ISaveStudentPhotoBody,
  ISaveStudentPhotoResult,
  ISubmitStudentPhotoBody,
  ISubmitStudentPhotoResult
} from 'src/interfaces/Student/IEditProfile';
import http from '../../requests/SchoolService/schoolServices';

const SaveStudentPhotoApi = (data: ISaveStudentPhotoBody) => {
  return http.post<ISaveStudentPhotoResult>('Student/SaveStudentPhoto', data);
};

const SubmitStudentPhotoapi = (data: ISubmitStudentPhotoBody) => {
  return http.post<ISubmitStudentPhotoResult>(
    'Student/SubmitStudentPhoto',
    data
  );
};

const ApiEditprofile = {
  SaveStudentPhotoApi,
  SubmitStudentPhotoapi
};
export default ApiEditprofile;
