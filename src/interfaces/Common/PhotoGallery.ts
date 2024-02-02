// photo gallery
export interface IPics {
  asSchoolId: string;
  asMonth: any;
  asYear: any;
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
