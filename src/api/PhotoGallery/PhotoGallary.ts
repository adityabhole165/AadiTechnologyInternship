import {
  GetImagesResult,
  IDeletePhotoBody,
  IGetCountBody,
  IGetCountResult,
  IGetPhotoDetailsBody,
  IGetPhotoDetailsResult,
  IPics,
  IStandardDivisionNameBody,
  IStandardDivisionNameResult,
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

const PhotoGallaryApi = {
  GetAllAcademicYearsForSchool,
  GetPICSList,
  GetimgList,
  GetPhotodetails,
  DeletePhoto,
  GetCount,
  StandardDivisionNameAPI
};

export default PhotoGallaryApi;
