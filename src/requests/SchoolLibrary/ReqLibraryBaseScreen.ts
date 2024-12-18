import { createSlice } from "@reduxjs/toolkit";
import ApiLibraryBaseScreen from "src/api/SchoolLibrary/APILibraryBaseScreen";
import { IBookclaimedBody, ICancelBookReservationBody, IGetAllBooksDetailsBody, IGetLibraryBookIssueDetailsBody, IGetReserveBookDetailsBody, IGetReserveBooksCountperpersonBody, ITotalBooksCountsBody } from "src/interfaces/SchoolLibrary/ILibraryBaseScreen";
import { AppThunk } from "src/store";

const SchoolLibraryslice = createSlice({
    name: 'SchoolLibrary',
    initialState: {
        IGetAllBooksDetails: [],
        IGetLibraryBookIssueDetails: [],
        IBookClimedMsg: '',
        IGetTotalBooksCounts: [],
        IGetTotalBookId: [],
        IGetReserveBookDetails: [],
        IGetReserveBookDetailsCount: [],
        IlistGetTotalBooksCounts: [],
        IlistGetTotalBookId: [],
        IreserveBooksCountperperson: [],
        IGetAllBooksDetailss: [],
        IGetBookTotalCount: [],
        IGetTotalBookID: [],
        ICancelBookReservationMsg: '',
        Loading: true
    },

    reducers: {
        RGetAllBooksDetails(state, action) {
            state.Loading = false;
            state.IGetAllBooksDetails = action.payload;
        },
        RGetLibraryBookIssueDetails(state, action) {
            state.Loading = false;
            state.IGetLibraryBookIssueDetails = action.payload;
        },
        RBookClimedMsg(state, action) {
            state.Loading = false;
            state.IBookClimedMsg = action.payload;
        },
        RClearBookClimedMsg(state) {
            state.Loading = false;
            state.IBookClimedMsg = '';
        },
        RGetTotalBooksCounts(state, action) {
            state.IGetTotalBooksCounts = action.payload;
        },
        RGetTotalBookId(state, action) {
            state.IGetTotalBookId = action.payload;
        },
        RGetReserveBookDetails(state, action) {
            state.IGetReserveBookDetails = action.payload;
        },
        RGetReserveBookDetailsCount(state, action) {
            state.IGetReserveBookDetailsCount = action.payload;
        },
        RlistGetTotalBooksCounts(state, action) {
            state.IlistGetTotalBooksCounts = action.payload;
        },
        RlistGetTotalBookId(state, action) {
            state.IlistGetTotalBookId = action.payload;
        },
        RreserveBooksCountperperson(state, action) {
            state.Loading = false;
            state.IreserveBooksCountperperson = action.payload;
        },
        RClearRreserveBooksCountperperson(state) {
            state.Loading = false;
            state.IreserveBooksCountperperson = [];
        },
        RGetAllBooksDetailss(state, action) {
            state.Loading = false;
            state.IGetAllBooksDetailss = action.payload;
        },
        RGetBookTotalCount(state, action) {
            state.Loading = false;
            state.IGetBookTotalCount = action.payload;
        },
        RGetTotalBookID(state, action) {
            state.Loading = false;
            state.IGetTotalBookID = action.payload;
        },
        RCancelBookReservationMsg(state, action) {
            state.Loading = false;
            state.ICancelBookReservationMsg = action.payload;
        },
        RClearCancelBookReservationMsg(state) {
            state.Loading = false;
            state.ICancelBookReservationMsg = '';
        },
        getLoading(state, action) {
            state.Loading = true;
        }

    }
})

// export const CDAGetAllBooksDetails = (data: IGetAllBooksDetailsBody): AppThunk => async (dispatch) => {
//     dispatch(SchoolLibraryslice.actions.getLoading(true));
//     const response = await ApiLibraryBaseScreen.GetAllBooksDetails(data);
//     let BooksDetails = response.data.map((item, i) => {
//         return {
//             Book_Id: item.Book_Id,
//             Book_No: item.Book_No,
//             Book_Title: item.Book_Title,
//             Author_Name: item.Author_Name,
//             Published_By: item.Published_By,
//             Language: item.Language,
//             Category_Name: item.Standards,
//             Available_Books: item.Available_Books,
//             Total_Books: item.Total_Book_Quantity,
//             AllowBookClaimForParent: item.AllowBookClaimForParent,
//         };
//     });
//     //console.log(response.data, '>>>>>>');
//     dispatch(SchoolLibraryslice.actions.RGetAllBooksDetails(BooksDetails));
// };
export const CDAGetLibraryBookIssue = (data: IGetLibraryBookIssueDetailsBody): AppThunk => async (dispatch) => {
    dispatch(SchoolLibraryslice.actions.getLoading(true));
    const response = await ApiLibraryBaseScreen.GetLibraryBookIssueDetails(data);
    let BooksDetailsIssue = response.data.map((item, i) => {
        return {
            Id: item.Book_Id,
            Book_Title: item.Book_Title,
            Accession_No: item.Book_No,
            Issue_Date: item.Issue_Date,
            Return_Date: item.Return_Date,

        };
    });
    //console.log(response.data, '>>>>>>');
    dispatch(SchoolLibraryslice.actions.RGetLibraryBookIssueDetails(BooksDetailsIssue));
};
export const CDABookClimedMsg = (data: IBookclaimedBody): AppThunk =>
    async (dispatch) => {
        dispatch(SchoolLibraryslice.actions.getLoading(true));
        const response = await ApiLibraryBaseScreen.BookClimedMsg(data);
        dispatch(SchoolLibraryslice.actions.RBookClimedMsg(response.data))
    };
export const CDAClearBookClimedMsg = (): AppThunk =>
    async (dispatch) => {
        dispatch(SchoolLibraryslice.actions.RClearBookClimedMsg());

    };

// export const CDAGetTotalBooksCounts =
//     (data: IGetTotalBooksCountsBody): AppThunk =>
//         async (dispatch) => {
//             const response = await ApiLibraryBaseScreen.GetTotalBooksCounts(data);
//             let BookCount = response.data.listGetTotalBooksCountss.map((item, i) => {
//                 return {

//                     TotalCount: item.TotalCount,
//                 };
//             });

//             let BookId = response.data.listGetTotalBookId.map((item, i) => {
//                 return {

//                     Book_Id: item.Book_Id,

//                 };
//             });

//             dispatch(SchoolLibraryslice.actions.RGetTotalBooksCounts(BookCount));
//             dispatch(SchoolLibraryslice.actions.RGetTotalBookId(BookId));
//         };


export const CDAGetReserveBookDetails =
    (data: IGetReserveBookDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiLibraryBaseScreen.GetReserveBookDetails(data);
            let GetReserveBookDetails = response.data.listGetReserveBookDetails.map((item, i) => {
                return {

                    BookId: item.BookId,
                    bookTitle: item.Book_Title,
                    date: item.ReservationDate,
                    class: item.Class,
                    userName: item.Name,
                    designation: item.Designation,
                    UserId: item.UserId

                };

            });
            let ReserveBookDetailsCount = response.data.listGetReserveBookDetailsCount.map((item, i) => {
                return {

                    Count: item.Count,

                };
            });

            dispatch(SchoolLibraryslice.actions.RGetReserveBookDetails(GetReserveBookDetails));
            dispatch(SchoolLibraryslice.actions.RGetReserveBookDetailsCount(ReserveBookDetailsCount));
        };
export const CDAGetTotalBooksCount =
    (data: ITotalBooksCountsBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiLibraryBaseScreen.GetTotalLibraryBooksCounts(data);
            let totalBookCount = response.data.listGetTotalBooksCountss.map((item, i) => {
                return {
                    TotalCount: item.TotalCount

                }
            });
            let totalBookId = response.data.listGetTotalBookId.map((item, i) => {
                return {
                    Book_Id: item.Book_Id
                }

            });

            dispatch(SchoolLibraryslice.actions.RlistGetTotalBooksCounts(totalBookCount));
            dispatch(SchoolLibraryslice.actions.RlistGetTotalBookId(totalBookId));
        };

export const CDAReserveBooksperpersonCount = (data: IGetReserveBooksCountperpersonBody): AppThunk => async (dispatch) => {
    dispatch(SchoolLibraryslice.actions.getLoading(true));
    const response = await ApiLibraryBaseScreen.GetReserveBooksCountperperson(data);
    dispatch(SchoolLibraryslice.actions.RreserveBooksCountperperson(response.data));
};
export const CDAClearCDAReserveBooksperpersonCount = (): AppThunk =>
    async (dispatch) => {
        dispatch(SchoolLibraryslice.actions.RClearRreserveBooksCountperperson());

    };
export const CDAGetAllBooksDetails =
    (data: IGetAllBooksDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiLibraryBaseScreen.GetAllBooksDetails(data);
            let AllBooks = response.data.listAllBooksDetails.map((item, i) => {
                return {
                    Book_Id: item.Book_Id,
                    Book_No: item.Book_No,
                    Book_Title: item.Book_Title,
                    Author_Name: item.Author_Name,
                    Published_By: item.Published_By,
                    Language: item.Language,
                    Category_Name: item.Standards,
                    Available_Books: item.Available_Books,
                    Total_Books: item.Total_Book_Quantity,
                    AllowBookClaimForParent: item.AllowBookClaimForParent,
                    IsForIssue: item.IsForIssue
                };
            });

            let TotalBookCount = response.data.listBookTotalCount.map((item, i) => {
                return {

                    TotalCount: item.TotalCount,

                };
            });
            let TotalBookId = response.data.listTotalBookId.map((item, i) => {
                return {

                    Book_Id: item.Book_Id,

                };
            });
            console.log(AllBooks, '>>>>>>');
            dispatch(SchoolLibraryslice.actions.RGetAllBooksDetailss(AllBooks));
            dispatch(SchoolLibraryslice.actions.RGetBookTotalCount(TotalBookCount));
            dispatch(SchoolLibraryslice.actions.RGetTotalBookID(TotalBookId));
        };
export const CDACancelBookReservationMsg = (data: ICancelBookReservationBody): AppThunk =>
    async (dispatch) => {
        dispatch(SchoolLibraryslice.actions.getLoading(true));
        const response = await ApiLibraryBaseScreen.CancelBookReservationApi(data);
        dispatch(SchoolLibraryslice.actions.RCancelBookReservationMsg(response.data))
    };
export const CDAClearCancelBookReservationMsg = (): AppThunk =>
    async (dispatch) => {
        dispatch(SchoolLibraryslice.actions.RClearCancelBookReservationMsg());
    };


export default SchoolLibraryslice.reducer;
