import http from "../../requests/SchoolService/schoolServices";
import {IGetParentPhotosBody,IGetParentPhotosResult,IsaveParentPhotosBody,IsaveParentPhotosResult,ISubmitParentPhotoDetailsBody,ISubmitParentPhotoDetailsResult} from 'src/interfaces/Student/IUpoladParentPhoto';

const GetParentPhotosApi = (data: IGetParentPhotosBody) => {
    return http.post<IGetParentPhotosResult>('student/GetParentPhotos',data);
  };

  const saveParentPhotosApi = (data: IsaveParentPhotosBody) => {
    return http.post<IsaveParentPhotosResult>('student/saveParentPhotos',data);
  };

  const SubmitParentPhotoDetailsApi = (data: ISubmitParentPhotoDetailsBody) => {
    return http.post<ISubmitParentPhotoDetailsResult>('Student/SubmitParentPhotoDetails',data);
  };


  const ApiUploadParentPhoto={
    GetParentPhotosApi,
    saveParentPhotosApi,
    SubmitParentPhotoDetailsApi

  }
  export default ApiUploadParentPhoto;