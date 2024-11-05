

export interface IstaffBirthdayBody {
  pagesize: string;
  asAcademicYearId: string;
  asSchoolId: string;
  startindex: string;
}

export interface getSchoolStaffBirthdayResult {
  getSchoolStaffBirthdaylists: [
    {
      RowID: number;
      TotalRows: number;
      User_Role_Id: number;
      Email_Address: string;
      User_Id: number;
      Mobile_Number: number;
      StaffName: string;
      Designation: string;
      DOB: string;
      Sort_Order: number;
      School_Id: number;
      BinaryPhotoImage: string;
    }
  ]
}

export interface IstaffBirthday {
  asMonth: number;
  asAcademicyearId: string;
  asSchoolId: string;
}

export interface GetstaffBirthdayList {
  Name: string;
  Designation: string;
  BirthDate;
  string;
}
