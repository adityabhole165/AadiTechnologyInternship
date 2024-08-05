import { IGetAllClassesAndDivisionsBody, IGetDeleteSchoolNoticeImageBody, IGetEditSchoolNoticeDetailsResult, IGetEditUserRolesandStdDivForSelectedNoticeIdBody, IGetGetAllClassesAndDivisionsResult, IGetStandardDivisionsForSelectedNoticeIdResult, IGetUserRolesForSelectedNoticeIdResult, ISaveUpdateSchoolNoticesBody } from 'src/interfaces/AddSchoolNotic/ISchoolNoticeForm';
import http from '../../requests/SchoolService/schoolServices';

const SaveSchoolNotice = (data: ISaveUpdateSchoolNoticesBody) => {
    return http.post<string>(
      'Teacher/SaveUpdateSchoolNotices',
      data
    );
  };
  const DeleteImage = (data: IGetDeleteSchoolNoticeImageBody) => {
    return http.post<string>(
      'Teacher/DeleteSchoolNoticeImage',
      data
    );
  };
  
  const EditSchoolNoticeDetails = (data: IGetEditUserRolesandStdDivForSelectedNoticeIdBody) => {
    return http.post<IGetEditSchoolNoticeDetailsResult[]>(
      'Teacher/EditSchoolNoticeDetails',
      data
    );
  };

  const UserRolesDetails = (data: IGetEditUserRolesandStdDivForSelectedNoticeIdBody) => {
    return http.post<IGetUserRolesForSelectedNoticeIdResult[]>(
      'Teacher/GetUserRolesForSelectedNoticeId',
      data
    );
  };

  const StandardDivSelectedclasses = (data: IGetEditUserRolesandStdDivForSelectedNoticeIdBody) => {
    return http.post<IGetStandardDivisionsForSelectedNoticeIdResult[]>(
      'Teacher/GetStandardDivisionsForSelectedNoticeId',
      data
    );
  };
  
  const AllStandardDivclasses = (data: IGetAllClassesAndDivisionsBody) => {
    return http.post<IGetGetAllClassesAndDivisionsResult[]>(
      'Teacher/GetAllClassesAndDivisions',
      data
    );
  };
  
  
const SchoolNoticeFormApi = {
    SaveSchoolNotice,
    DeleteImage,
    EditSchoolNoticeDetails,
    UserRolesDetails,
    StandardDivSelectedclasses,
    AllStandardDivclasses
  };
  
  export default SchoolNoticeFormApi;