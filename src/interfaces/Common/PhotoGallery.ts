
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
  asAcademicYearId: number
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
