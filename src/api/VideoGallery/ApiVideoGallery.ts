import {
  GetVideoGalleryResult,
  Icomments,
  IVideoList
} from 'src/interfaces/Common/VideoGallery';
import { ICountVideoBody, IdeleteVideoBody, IDeleteVideogallaryDetails, IGetSaveUpdateVideoBody, IGetSaveUpdateVideoResult, IGetVideoGalleryBody, IGetVideoGalleryResponse, IGetViewVideoListBody, IGetViewVideoListResponse } from 'src/interfaces/VideoGalleryInterface/IVideoGallery';
import http from '../../requests/SchoolService/schoolServices';

const GetVideosGallary = (data: IVideoList) => {
  return http.post<GetVideoGalleryResult>('User/GetVideoGallery', data);
};

const GetComments = (data: Icomments) => {
  return http.post<Icomments>('User/GetVideoGalleryComments', data);
};

const GetVideoDetails = (data: IGetVideoGalleryBody) => {
  return http.post<IGetVideoGalleryResponse[]>('Teacher/GetVideoGalleryDetails', data);
}

const Deletevideo = (data: IdeleteVideoBody) => {
  return http.post('Teacher/DeleteVideoGallery', data);
};

const GetCountVideo = (data: ICountVideoBody) => {
  return http.post('Teacher/CountFromVideoList', data);
}

const GetViewVideo = (data: IGetViewVideoListBody) => {
  return http.post<IGetViewVideoListResponse[]>('Teacher/GetVideoGallery', data);
}

const GetSaveUpdateVideo = (data: IGetSaveUpdateVideoBody) => {
  return http.post<IGetSaveUpdateVideoResult>('Teacher/SaveUpdateVideo', data);
}
const DeleteVideoGallary = (data: IDeleteVideogallaryDetails) => {
  return http.post<IGetSaveUpdateVideoResult>('Teacher/SaveUpdateVideo', data);
}
const VideoGalleryApi = {
  GetVideosGallary,
  GetComments,
  GetVideoDetails,
  Deletevideo,
  GetCountVideo,
  GetViewVideo,
  GetSaveUpdateVideo,
  DeleteVideoGallary
};
export default VideoGalleryApi;
