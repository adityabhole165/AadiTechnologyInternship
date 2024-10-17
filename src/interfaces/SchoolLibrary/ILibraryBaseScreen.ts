export interface IGetAllBooksDetailsBody {
    asprm_iSchoolId: number,
    asprm_Filter: string,
    asprm_BookNo: string,
    asprm_iStandardId: number,
    asSortExp: string,
    asStartIndex: number,
    asEndIndex: number,
    asprm_iParentStaffId: number
}
export interface IGetAllBooksDetailsResult {
    Book_Id: string,
    Book_Title: string,
    Is_Printable: string,
    Category_id: string,
    Author_Name: string,
    Published_By: string,
    Category_Name: string,
    Available_Books: string,
    Total_Book_Quantity: string,
    IsForIssue: string,
    Decription: string,
    Standards: string,
    Language: string,
    Book_No: string,
    AllowBookClaimForParent: string
}
export interface IGetLibraryBookIssueDetailsBody {
    asSchool_Id: number,
    asBook_Issued_To: number,
    asAcademic_Year_Id: number
}
export interface IGetLibraryBookIssueDetailsResult {
    Book_Issued_To: string,
    Return_Date: string,
    Book_Detail_Id: string,
    Book_No: string,
    Book_Id: string,
    Book_Title: string,
    Issue_Date: string,
    IsForParent: string
}
export interface IBookclaimedBody {
    asBookId: number,
    asUserId: number,
    asReservedByParent: number,
    asSchoolId: number,
    asAcademicYearId: number,
    asInsertedById: number
}
export interface IBookclaimedResult {
    string
}
export interface IGetTotalBooksCountsBody {
    asprm_iSchoolId: number,
    asprm_Filter: string,
    asprm_BookNo: string,
    asprm_iStandardId: number,
    asprm_iParentStaffId: number,
    asCnt: number
}
export interface IGetTotalBooksCountsResult {
    listGetTotalBooksCountss: [
        {
            TotalCount: string
        }
    ];
    listGetTotalBookId: [
        {
            Book_Id: string
        }
    ];
}
export interface IGetReserveBookDetailsBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asUserID: number,
    asStartIndex: number,
    asEndIndex: number,
    asBookTitle: string,
    asUserName: string,
    asSortExpression: string,
    asAllUserFlag: number
}
export interface IGetReserveBookDetailsResult {
    listGetReserveBookDetails: [
        {
            BookId: string,
            Book_Title: string,
            Name: string,
            Class: string,
            Designation: string,
            UserId: string,
            ReservedByParent: string,
            ReservationDate: string,
            DesignationId: string,
            StandardId: string,
            DivisionId: string
        }
    ];
    listGetReserveBookDetailsCount: [
        {
            Count: string
        }
    ]
}

export interface ITotalBooksCountsBody {

    asprm_iSchoolId: number,
    asprm_Filter: string,
    asprm_BookNo: string,
    asprm_iStandardId: number,
    asprm_iParentStaffId: number

}
export interface ITotalBooksCountsResult {
    listGetTotalBooksCountss: [
        {
            TotalCount: string

        }
    ];
    listGetTotalBookId: [
        {
            Book_Id: string

        }
    ]
}
export interface IGetReserveBooksCountperpersonBody {
    asSchoolId: number,
    asAcademicYearId: number,
    asBookId: number,
    asUserId: number,
    asFlag: number
}
export interface IGetReserveBooksCountperpersonResult {
    Count: string
}