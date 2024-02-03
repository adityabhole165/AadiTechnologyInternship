import {
  GetVideoGalleryResult,
  IVideoList,
  Icomments
} from 'src/interfaces/Common/VideoGallery';
import http from '../../requests/SchoolService/schoolServices';

const GetVideosGallary = (data: IVideoList) => {
  return http.post<GetVideoGalleryResult>('User/GetVideoGallery', data);
};

const GetComments = (data: Icomments) => {
  return http.post<Icomments>('User/GetVideoGalleryComments', data);
};

const VideoGalleryApi = {
  GetVideosGallary,
  GetComments
};
export default VideoGalleryApi;
