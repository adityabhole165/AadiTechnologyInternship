//books details
export interface IBooksDetails {
    aiSchoolId:number,
         asBookName:null,
         asAccessionNumber:null,
         asAuthorName:null,
         asPublisher:null,
         asLanguage:string,
         aiStandardId:number,
         aiMediaType:number,
         aiBookId:number,
         aiParentStaffId:number,
         aiEndIndex:number,
         aiStartRowIndex:number,
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
export interface IClaimList {
    aiSchoolId:number,
    aiAcademicYearId:number,
    aiUserId:number,
    asBookTitle:string,
    asUserName:string,
    aiStartRowIndex:string,
    aiEndIndex:number,
    asSortExpression:string,
    aiAllUser:number
}

export interface GetClaimResult {
    UserId: number,
            UserName: string,
            UserRoleId: number,
            ClassNameDesignation: string,
            Designation: string,
            Book_Id: number,
            Book_Title: string,
            Issue_Date: string,
            Return_Date: string,
            RollNo: number,         
            IsForParent: string,
            ReservationDate: string,
            StandardDivisionId: number,      
}
