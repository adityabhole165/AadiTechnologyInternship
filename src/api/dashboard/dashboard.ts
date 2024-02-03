import {
  IBirthdays,
  IFeedbackList,
  IMsgfrom,
  INewMessageCount,
  IPhotoAlbum,
  IPhotoAlbumResult,
  ISaveUserLoginDetailsBody,
  ISaveUserLoginDetailsResult,
  IUnreadMessages,
  IUpcomingEventsList
} from '../../interfaces/Student/dashboard';
import http from '../../requests/SchoolService/schoolServices';

//Unread messages

const GetUnreadMessageList = (data: IUnreadMessages) => {
  return http.post<IUnreadMessages>('Dashboard/GetUnreadMessageList', data);
};
//Upcoming Events
const GetUpcomingEventSList = (data: IUpcomingEventsList) => {
  return http.post<IUpcomingEventsList>('Dashboard/GetUpcomingEvents', data);
};

//birthdays
const BirthdayDetailsData = (data: IBirthdays) => {
  return http.post<IBirthdays>('Dashboard/GetUpcomingStaffBdayList', data);
};

//photo album
const PhotoAlbumData = (data: IPhotoAlbum) => {
  return http.post<IPhotoAlbumResult[]>('Dashboard/GetAlbumsList', data);
};

//Feedback
const Feedback = (data: IFeedbackList) => {
  return http.post<IFeedbackList>('Dashboard/GetUserFeedback', data);
};

const GetMessageFromList = (data: IMsgfrom) => {
  return http.post<IMsgfrom>('Dashboard/Messagefrom', data);
};
const GetMessagesCount = (data: INewMessageCount) => {
  return http.post<INewMessageCount>('MessageCenter/GetNewMessageCount', data);
};
const GetSaveUserLoginDetailsResult = (data: ISaveUserLoginDetailsBody) => {
  return http.post<ISaveUserLoginDetailsResult>(
    'User/SaveUserLoginDetails',
    data
  );
};

const DashboardApi = {
  GetUnreadMessageList,
  GetUpcomingEventSList,
  BirthdayDetailsData,
  PhotoAlbumData,
  Feedback,
  GetMessageFromList,
  GetMessagesCount,
  GetSaveUserLoginDetailsResult
};

export default DashboardApi;
