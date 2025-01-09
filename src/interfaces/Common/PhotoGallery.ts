
// photo gallery
export interface IPics {
  asSchoolId: string;
  asMonth: any;
  asYear: any;
}
export interface IGetPhotoDetailsBody {
  asSchoolId: number,
  asSortExp: string,
  asStartIndex: number,
  asPageSize: number,
  asAcademicYearId: number,
  asGalleryNameFilter: string
}

export interface IGetPhotoDetailsResult {
  RowID: string,
  TotalRows: string,
  Gallery_Name: string,
  Classes: string,
  Update_Date: string,
}

export interface IGetCountBody {
  asSchoolId: number
}

export interface IGetCountResult {
  TotalRecordCount: number
}
export interface IDeletePhotoBody {

  asGalleryName: string,
  asSchoolId: number

}

export interface GetPics {
  AlumbName: string;
}

//images
export interface Iimg {
  asSchoolId: string;
  asGalleryName: string;
}
export interface GetImagesResult {
  GetImagesResult: [Getimg];
}
export interface Getimg {
  Description: string;
  ImageId: number;
  ImagePath: string;
}
//New photo ablum
export interface IPhotoAlbum {
  aiSchoolId: string;
  aiMonth: any;
  aiYear: any;
  abSetPreviousMonth: string;
  aiUserId: string;
}

export interface GetPhotoAlbum {
  ImagePath: string;
  ImageList: any;
  Description: string;
  Name: string;
  Id: number;
  ImageId: number;
}
export interface IStandardDivisionNameBody {
  asSchool_Id: number,
  asAcademicYearId: number,
}
export interface IStandardDivisionNameResult {
  Standard_Id: string,
  SchoolWise_Standard_Division_Id: string,
  Original_Division_Id: string,
  Division_Name: string,
  Original_Standard_Id: string,
  Standard_Name: string,
}
export interface IManagePhotoGalleryBody {
  asSchool_Id: number,
  asOrg_Gallery_Name: string,
  asGallery_Name: string,
  asGallery_DetailsXML: string,
  asInserted_By_id: number,
  asAssociatedSection: string
  asClassesIds: string,
  Gallery_ID: number
}
export interface IInsertVideoGallaryBody {
  asSchoolId: number,
  asVideoId: number,
  asVideoName: string,
  asVideoDetails: string,
  asStartDate: string,
  asEndDate: string,
  asUserRoleIds: string,
  asStandardDivIds: string,
  asSubjectId: number,
  asShowOnExternalWebsite: string,
  asInsertedById: number,
  asAddMoreSubjects: string,
  asOldSubjectId: number,
  asId: number,
  asUrlSourceId: number
}