export interface IGetAllPrimaryClassTeacherssBody {
    asSchoolId: number
    asAcadmicYearId: number
    asTeacher_id: number
  }
  export interface IGetAllPrimaryClassTeacherssResult {
    TeacherName: string
    Teacher_Id: string
    Designation_Id: string
    Teacher_First_Name: string
    Standard_Name: string
    Division_Name: string
    Original_Standard_Id: string
    Original_Division_Id: string
    SchoolWise_Standard_Division_Id: string
    Is_PrePrimary: string
  }