export interface IGetStudentPhotoBody {
  aiUserId: number;
  aiSchoolId: number;
  aiStudentId: number;
}

export interface IGetStudentPhotoResult {
  StudentPhotoDetails: {
    StudentName: string;
    IsSaved: boolean;
    IsSubmitted: boolean;
    PhotoImage: string;
  };
}
