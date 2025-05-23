export interface IGetVideoGalleryBody {
    asSchoolId: number,
    asSortExp: string,
    asStartIndex: number,
    asPageSize: number,
    asIsFromExternalWebsite: number
    asVideoNameFilter: string
}
export interface IGetVideoGalleryResponse {
    RowID: string,
    TotalRows: string,
    Video_Id: string,
    Video_Name: string,
    Video_Url: string,
    UrlSourceId: string,
    URLSource: string,
    Update_Date: string,
    SubjectId: string,
    Subject_Name: string,
    StartDate: string,
    EndDate: string
}

export interface IdeleteVideoBody {
    asSchoolId: number,
    asVideoId: number,
    asSubjectId: number,
    asUpdatedById: number
}
export interface ICountVideoBody {
    asSchoolId: number,
    asCnt: number
}

export interface ICountVideoResponse {
    TotalCount: number
}

export interface IGetViewVideoListBody {
    asSchoolId: number,
    asVideoId: number,
    asSubjectId: number,

}
export interface IGetViewVideoListResponse {
    VideoId: string,
    VideoDetailsId: string,
    VideoName: string,
    URL: string,
    Description: string,
}

export interface IGetSaveUpdateVideoBody {
    asVideoId: number;
    asVideoDetailId: number;
    asVideoName: string;
    asDescription: string;
    asVideoURL: string;
    asSchoolId: number;
    asInsertedById: number;
    asSubjectId: number;
}
export interface IGetSaveUpdateVideoResult {
    string
}

export interface IDeleteVideogallaryDetails {
    asSchoolId: number;
    asIsDeleted: number;
    asUpdateDate: string;
    asUpdatedById: number;
    asVideoId: number;
    asId: number;
}
export interface IDeleteVideogallaryResult {
    string
}

export interface IGetPhotoImageListBody {
    asSchoolId: number,
    asGalleryName: string,
    IsDeleted: number,
}
export interface IGetPhotoImageListResult {
    GalleryimgsResult: [
        {
            GalleryId: string;
            ImagePath: string;
            ImageSrNo: string;
            Comment: string;
        }
    ];
}
