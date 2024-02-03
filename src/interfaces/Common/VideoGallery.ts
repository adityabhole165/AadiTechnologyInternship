export interface IVideoList {
  asSchoolId: string;
  asMonth: number;
  asYear: number;
  asUserId: string;
}

export interface GetVideoGalleryResult {
  GetVideoGalleryResult: [
    {
      IsSubjectExists: number;
      StartDateEndDate: string;
      UrlSourceId: number;
      VideoGalleryName: string;
      VideoId: number;
    }
  ];
}

//comments
export interface Icomments {
  asSchoolId: string;
  asSubjectId: string;
  asVideoId: string;
}

export interface Getcomments {
  UrlSourceId: number;
  VideoComment: string;
  VideoDetailsId: number;
  VideoId: number;
  VideoName: string;
  VideoUrl: string;
}
