
import http from "../../requests/SchoolService/schoolServices";
import {IUnreadMessages,IUpcomingEventsList, IBirthdays, 
  IPhotoAlbum,IFeedbackList,IMsgfrom, IPhotoAlbumResult} from "../../interfaces/Student/dashboard"

//Unread messages

  const GetUnreadMessageList = (data: IUnreadMessages) => {
    return http.post<IUnreadMessages>('Dashboard/GetUnreadMessageList',data);
  };
  //Upcoming Events
  const GetUpcomingEventSList  = (data: IUpcomingEventsList) => {
    return http.post<IUpcomingEventsList>('Dashboard/GetUpcomingEvents',data);
};

//birthdays
const BirthdayDetailsData  = (data: IBirthdays) => {
  return http.post<IBirthdays>('Dashboard/GetUpcomingStaffBdayList',data);
};

//photo album
const PhotoAlbumData  = (data: IPhotoAlbum) => {
  return http.post<IPhotoAlbumResult[]>('Dashboard/GetAlbumsList',data);
};

//Feedback
const Feedback  = (data: IFeedbackList) => {
  return http.post<IFeedbackList>('Dashboard/GetUserFeedback',data);
};

const GetMessageFromList = (data: IMsgfrom) => {
  return http.post<IMsgfrom>('Dashboard/Messagefrom',data);
};

  
const DashboardApi ={
    GetUnreadMessageList,
     GetUpcomingEventSList,
     BirthdayDetailsData,
     PhotoAlbumData,
     Feedback,
     GetMessageFromList
}

export default DashboardApi;
