

export default interface IstaffBirthdayBody {
  pagesize: number;
  asAcademicYearId: number;
  asSchoolId: number;
  startindex: number;
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

export default interface IstaffBirthday {
  asMonth: Number;
  asAcademicyearId: number;
  asSchoolId: number;
}

export interface GetstaffBirthdayList {
  Name: string;
  Designation: string;
  BirthDate;
  string;
}
