export interface IGetClassTeachersBody {
    asSchoolId: number
    asAcademicYearId: number
    asTeacherId: number
  };

  export interface IGetClassTeachersResult {
    TeacherName: string
    Teacher_Id: string
    Designation_Id: string
    Teacher_First_Name: string
    Standard_Name: string
    Division_Name: string
    Original_Standard_Id: string
    Original_Division_Id: string
    SchoolWise_Standard_Division_Id: string
  };

  export interface IGetStudentNameDropdownBody {
    asSchoolId: number
    asAcademicYearId: number
    asStandardDivisionId: number
  };

  export interface IGetStudentNameDropdownResult {
    RollNo: string
    StudentName: string
    Student_Id: string
  }
  
  


  
  