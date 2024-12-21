import {
  GetImagesResult,
  IDeletePhotoBody,
  IGetPhotoDetailsBody,
  IGetPhotoDetailsResult,
  IPics,
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

const DeletePhoto = (data: IDeletePhotoBody) => {
  return http.post('Teacher/DeletePhotoGallery', data);
};

const PhotoGallaryApi = {
  GetAllAcademicYearsForSchool,
  GetPICSList,
  GetimgList,
  GetPhotodetails,
  DeletePhoto
};

export default PhotoGallaryApi;
