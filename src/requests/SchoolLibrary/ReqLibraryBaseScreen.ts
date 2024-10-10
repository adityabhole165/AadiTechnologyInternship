import { createSlice } from "@reduxjs/toolkit";
import ApiLibraryBaseScreen from "src/api/SchoolLibrary/APILibraryBaseScreen";
import { IBookclaimedBody, IGetAllBooksDetailsBody, IGetLibraryBookIssueDetailsBody, IGetReserveBookDetailsBody, IGetTotalBooksCountsBody } from "src/interfaces/SchoolLibrary/ILibraryBaseScreen";
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

        getLoading(state, action) {
            state.Loading = true;
        }

    }
})

export const CDAGetAllBooksDetails = (data: IGetAllBooksDetailsBody): AppThunk => async (dispatch) => {
    dispatch(SchoolLibraryslice.actions.getLoading(true));
    const response = await ApiLibraryBaseScreen.GetAllBooksDetails(data);
    let BooksDetails = response.data.map((item, i) => {
        return {
            Book_Id: item.Book_Id,
            Book_No: item.Book_No,
            Book_Title: item.Book_Title,
            Author_Name: item.Author_Name,
            Published_By: item.Published_By,
            Language: item.Language,
            Category_Name: item.Standards,
            Available_Books: item.Available_Books,
            Total_Book_Quantity: item.Total_Book_Quantity,
            AllowBookClaimForParent: item.AllowBookClaimForParent,
        };
    });
    //console.log(response.data, '>>>>>>');
    dispatch(SchoolLibraryslice.actions.RGetAllBooksDetails(BooksDetails));
};
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

export const CDAGetTotalBooksCounts =
    (data: IGetTotalBooksCountsBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiLibraryBaseScreen.GetTotalBooksCounts(data);
            let BookCount = response.data.listGetTotalBooksCountss.map((item, i) => {
                return {

                    TotalCount: item.TotalCount,
                };
            });

            let BookId = response.data.listGetTotalBookId.map((item, i) => {
                return {

                    Book_Id: item.Book_Id,

                };
            });

            dispatch(SchoolLibraryslice.actions.RGetTotalBooksCounts(BookCount));
            dispatch(SchoolLibraryslice.actions.RGetTotalBookId(BookId));
        };


export const CDAGetReserveBookDetails =
    (data: IGetReserveBookDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiLibraryBaseScreen.GetReserveBookDetails(data);
            let GetReserveBookDetails = response.data.listGetReserveBookDetails.map((item, i) => {
                return {

                    BookId: item.BookId,
                    bookTitle: item.Book_Title,
                    date: item.ReservationDate,

                };

            });

            let ReserveBookDetailsCount = response.data.listGetReserveBookDetailsCount.map((item, i) => {
                return {

                    Count: item.Count,

                };
            });
            console.log(response.data.listGetReserveBookDetails, '*****GetReserveBookDetails');
            console.log(response.data.listGetReserveBookDetailsCount, '*****GetReserveBookDetails');
            dispatch(SchoolLibraryslice.actions.RGetReserveBookDetails(GetReserveBookDetails));
            dispatch(SchoolLibraryslice.actions.RGetReserveBookDetailsCount(ReserveBookDetailsCount));
        };
export default SchoolLibraryslice.reducer;
