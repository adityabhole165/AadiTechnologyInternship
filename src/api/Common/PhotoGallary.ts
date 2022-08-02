
import { Iimg, IPics } from "src/Interface/Common/PhotoGallery";
import http from "../../Client_Api/SchoolService/schoolServices";
import {IYearList} from "../../Interface/Student/PhotoGallary"

//Get year list

const GetAllAcademicYearsForSchool = (data: IYearList) => {
      return http.post<IYearList>('School/GetAllAcademicYearsForSchool',data);
};

const GetPICSList = (data: IPics) => {
  return http.post<IPics>('User/GetAlbums',data);
};

const GetimgList = (data: Iimg) => {
  return http.post<Iimg>('User/GetImages',data);
};

const PhotoGallaryApi  ={
    GetAllAcademicYearsForSchool,
    GetPICSList,
    GetimgList
};


export default PhotoGallaryApi ;