import {
  IDeleteHomeworkDailyLogBody,
  IGetAllHomeworkDailyLogsBody,
  IGetAllHomeworkDailyLogsResult,
  IGetHomeworkDailyLogBody,
  IGetHomeworkDailyLogResult,
  IPublishUnpublishHomeworkDailylogBody,
  ISaveDailyLogBody
} from 'src/interfaces/AddDailyLog/IAddDailyLog';
import http from '../../requests/SchoolService/schoolServices';

const SaveDailyLog = (data: ISaveDailyLogBody) => {
  return http.post('Teacher/SaveDailyLog', data);
};
const GetAllHomeworkDailyLogs = (data: IGetAllHomeworkDailyLogsBody) => {
  return http.post<IGetAllHomeworkDailyLogsResult[]>(
    'Teacher/GetAllHomeworkDailyLogs',
    data
  );
};
const GetHomeworkDailyLog = (data: IGetHomeworkDailyLogBody) => {
  return http.post<IGetHomeworkDailyLogResult[]>(
    'Teacher/GetHomeworkDailyLog',
    data
  );
};
const DeleteHomeworkDailyLog = (data: IDeleteHomeworkDailyLogBody) => {
  return http.post('Teacher/DeleteHomeworkDailyLog', data);
};
const PublishUnpublishHomeworkDailylog = (
  data: IPublishUnpublishHomeworkDailylogBody
) => {
  return http.post('Teacher/PublishUnpublishHomeworkDailylog', data);
};

const DailyLogApi = {
  SaveDailyLog,
  GetAllHomeworkDailyLogs,
  GetHomeworkDailyLog,
  DeleteHomeworkDailyLog,
  PublishUnpublishHomeworkDailylog
};

export default DailyLogApi;
