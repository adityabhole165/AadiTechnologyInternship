import {
  IGetCancelRequisitionBody,
  IGetDeleteRequisitionBody,
  IGetPagedRequisitionBody,
  IGetPagedRequisitionResult,
  IGetRequisitionStatusBody,
  IGetRequisitionStatusResult
} from 'src/interfaces/Requisition/IRequisition';
import http from '../../requests/SchoolService/schoolServices';

const RequisitionApi = (data: IGetRequisitionStatusBody) => {
  return http.post<IGetRequisitionStatusResult[]>(
    'Teacher/GetRequsitionStatus',
    data
  );
};
const RequisitionListApi = (data: IGetPagedRequisitionBody) => {
  return http.post<IGetPagedRequisitionResult[]>(
    'Teacher/GetPagedRequisition',
    data
  );
};
const DeleteRequisition = (data: IGetDeleteRequisitionBody) => {
  return http.post('Teacher/DeleteRequisitionn', data);
};
const CancelRequisition = (data: IGetCancelRequisitionBody) => {
  return http.post('Teacher/CancelRequisition', data);
};
const ApiRequisition = {
  RequisitionApi,
  RequisitionListApi,
  DeleteRequisition,
  CancelRequisition
};

export default ApiRequisition;
