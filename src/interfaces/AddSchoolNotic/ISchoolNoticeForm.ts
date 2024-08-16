export interface IGetAllClassesAndDivisionsBody {
    asSchoolId: number,
    asAcademicYearId: number,
}
export interface IGetGetAllClassesAndDivisionsResult {
    SchoolWise_Standard_Division_Id: string;
    Standard_Id: string;
    Standard_Name: string;
    Division_Id: string;
    Division_Name: string;
}

export interface ISaveUpdateSchoolNoticesBody {
    asUserRoleIds: string;
    asClassIds: string;
    asSaveFeature: string;
    asFolderName: string;
    asBase64String: string;
    asBase64String2: string;
    NoticeId: number;
    NoticeName: string;
    DisplayLocation: string;
    StartDate: string;
    EndDate: string;
    SortOrder: number;
    FileName: string;
    IsSelected: boolean;
    IsText: boolean;
    NoticeContent: string;
    UserId: number;
    SchoolId: number;
    InertedById: number;
    NoticeDescription: string;
    NoticeImage: string;
}

export interface IGetEditUserRolesandStdDivForSelectedNoticeIdBody {
    asSchoolId: number,
    asNoticeId: number,
}

export interface IGetEditSchoolNoticeDetailsResult {
    NoticeId: string;
    NoticeName: string;
    DisplayLocation: string;
    StartDate: string;
    EndDate: string;
    dbSortOrder: string;
    outSortOrder: string;
    FileName: string;
    NoticeContent: string;
    IsText: boolean;
    NoticeDescription: string;
    NoticeImage: string;
}

export interface IGetDeleteSchoolNoticeImageBody {
    asSchoolId: number,
    asNoticeId: number,
    asIsText: number,
}

export interface IGetUserRolesForSelectedNoticeIdResult {
    UserRoleId: string;
}

export interface IGetStandardDivisionsForSelectedNoticeIdResult {
    StandardDivisionId: string;
}

export interface IGetSchoolNoticeIdByNameBody {
    asSchoolId: number,
    asNoticeName: string,
    asStartDate: string;
    asEndDate: string;
}

export interface IGetSchoolNoticeIdByNameResult {
    NoticeId: string;
}