import {
  GetImagesResult,
  IDeletePhotoBody,
  IDeletePhotosBody,
  IGetAllImagesBody,
  IGetAllImagesResult,
  IGetCountBody,
  IGetCountResult,
  IGetPhotoCountBody,
  IGetPhotoCountResult,
  IGetPhotoDetailsBody,
  IGetPhotoDetailsResult,
  IInsertVideoGallaryBody,
  IManagePhotoGalleryBody,
  IPics,
  IStandardDivisionNameBody,
  IStandardDivisionNameResult,
  IUpdateCommentBody,
  Iimg
} from 'src/interfaces/Common/PhotoGallery';
import {
  AllAcademicYearsForSchoolResult,
  IYearList
} from '../../interfaces/Student/PhotoGallary';
import http from '../../requests/SchoolService/schoolServices';

//Get year list

const GetAllAcademicYearsForSchool = (data: IYearList) => {
  return http.post<AllAcademicYearsForSchoolResult[]>(
    'Teacher/GetAllAcademicYearsForSchool',
    data
  );
};

const GetPICSList = (data: IPics) => {
  return http.post<IPics>('User/GetAlbums', data);
};

const GetimgList = (data: Iimg) => {
  return http.post<GetImagesResult>('User/GetImages', data);
};

const GetPhotodetails = (data: IGetPhotoDetailsBody) => {
  return http.post<IGetPhotoDetailsResult[]>('Teacher/GetAllPhotoGalleriesDetails', data);
};
const GetCount = (data: IGetCountBody) => {
  return http.post<IGetCountResult[]>('Teacher/CountPhotoGalleriesS', data);
};
const DeletePhoto = (data: IDeletePhotoBody) => {
  return http.post('Teacher/DeletePhotoGallery', data);
};
const StandardDivisionNameAPI = (data: IStandardDivisionNameBody) => {
  return http.post<IStandardDivisionNameResult[]>('Teacher/GetStandardDivisionName', data);
}
const ManagePhotoGalleryApi = (data: IManagePhotoGalleryBody) => {
  return http.post<string>('Teacher/ManagePhotoGallery', data);
};
const InsertVideoGallaryApi = (data: IInsertVideoGallaryBody) => {
  return http.post<string>('Teacher/InsertVideoGallary', data);
};
const GetAllImagesAPI = (data: IGetAllImagesBody) => {
  return http.post<IGetAllImagesResult[]>('Teacher/GetAllImages', data);
}
const GetPhotoCountAPI = (data: IGetPhotoCountBody) => {
  return http.post<IGetPhotoCountResult[]>('Teacher/GetPhotoCount', data);
}
const DeletePhotoAPI = (data: IDeletePhotosBody) => {
  return http.post<string>('Teacher/DeletePhoto', data);
};
const UpdateCommentAPI = (data: IUpdateCommentBody) => {
  return http.post<string>('Teacher/UpdateComment', data);
};
const PhotoGallaryApi = {
  GetAllAcademicYearsForSchool,
  GetPICSList,
  GetimgList,
  GetPhotodetails,
  DeletePhoto,
  GetCount,
  StandardDivisionNameAPI,
  ManagePhotoGalleryApi,
  InsertVideoGallaryApi,
  GetAllImagesAPI,
  GetPhotoCountAPI,
  DeletePhotoAPI,
  UpdateCommentAPI,
};

export default PhotoGallaryApi;
