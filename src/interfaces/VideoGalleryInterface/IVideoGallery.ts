export interface IGetVideoGalleryBody {
    asSchoolId: number,
    asSortExp: string,
    asStartIndex: number,
    asPageSize: number,
    asIsFromExternalWebsite: number
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