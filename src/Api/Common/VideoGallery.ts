import http from "../../Client_Api/SchoolService/schoolServices";
import { IVideoList,Icomments } from "src/Interface/Common/VideoGallery";

const GetVideosGallary = (data: IVideoList) => {
    return http.post<IVideoList>('User/GetVideoGallery',data);
  };

  const GetComments = (data: Icomments) => {
    return http.post<Icomments>('User/GetVideoGalleryComments',data);
  };

  const VideoGalleryApi ={
    GetVideosGallary,
    GetComments
}
export default VideoGalleryApi