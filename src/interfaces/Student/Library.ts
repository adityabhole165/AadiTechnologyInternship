//books details
export interface IBooksDetails {
        aiSchoolId:string,
         asBookName:string,
         asAccessionNumber:string,
         asAuthorName:string,
         asPublisher:string,
         asLanguage:string,
         aiStandardId:string,
         aiMediaType:number,
         aiBookId:number,
         aiParentStaffId:string,
         aiEndIndex:number,
         aiStartRowIndex:string,
         asSortExpression:string
}

export interface GetBooksDetailsResult {
    Book_Id: number,
    Book_Title: string,
    Is_Printable: number,
    Category_Id: string,
    Author_Name: string,
    Published_By: string,
    Category_Name: string,
    Available_Books: number,
    Total_Book_Quantity: number,
    IsForIssue: number,
    Decription: string,
    Standards: string,
    Language: string,
    Book_No: string
}

//books with me
export interface IBookswithmeList {
    aiSchoolId:string,
          aiAcademicYrId:string,
          aiUserId:string
}

export interface GetBookswithmeResult {

    Book_Issued_To: string,
            Return_Date: string,
            Book_Detail_Id: string,
            Book_No:string,
            Book_Id: string,
            Book_Title: string,
            Issue_Date: string,
            IsForParent:string
}

//Claim Books
export interface IClaimDetail {
    aiSchoolId:string,
    aiAcademicYearId:string,
    aiUserId:string,
    asBookTitle:string,
    asUserName:string,
    aiStartRowIndex:string,
    aiEndIndex:number,
    asSortExpression:string,
    aiAllUser:number
}

export interface IClaimDetailResult {
    UserId:number,
    UserName: string,
    RegNo: null,
    UserRoleId: number,
    ClassNameDesignation: string,
    Designation: string,
    Book_Id: number,
    Book_No: null,
    Book_Title: string,
    Issue_Date:string,
    Return_Date: string,
    IsActive: null,
    RollNo: number,
    EmployeeNo: null,
    IsForParent: false,
    ReservationDate: string,
    StandardDivisionId: number,
    EnrollmentNo: null     
}

export interface ICancelBookReservation {
    aiUserId:string,
    aiBookid:string,
    aiSchoolId:string,
    aiAcademicYearId:string,
}

export interface ILanguagesDetails {
    aiSchoolId:string,
}

export interface ILanguagesDetailsResult {
    Language:string,
}

export interface  ILanguagesDetailsList{
    LanguagesDetails:ILanguagesDetailsResult[]
}



