import {
  IAddAnnualPlannerBody,
  IDeleteFileDetailsBody,
  IGetFileDetailsBody,
  IGetFileDetailsResult
} from 'src/interfaces/AddAnnualPlanner/IAddAnnualPlanner';
import http from '../../requests/SchoolService/schoolServices';

const AddAnnualPlanner = (data: IAddAnnualPlannerBody) => {
  return http.post('Teacher/SaveYearwiseAnnualPlannerDetails', data);
};
const GetAnnualPlanner = (data: IGetFileDetailsBody) => {
  return http.post<IGetFileDetailsResult[]>('Teacher/GetFileDetails', data);
};

const DeleteAnnualPlanner = (data: IDeleteFileDetailsBody) => {
  return http.post('Teacher/DeleteFileDetails', data);
};
const AddAnnualPlannerApi = {
  AddAnnualPlanner,
  GetAnnualPlanner,
  DeleteAnnualPlanner
};

export default AddAnnualPlannerApi;
