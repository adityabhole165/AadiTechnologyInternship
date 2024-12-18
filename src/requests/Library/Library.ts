import { createSlice } from '@reduxjs/toolkit';
import LibraryApi from 'src/api/Library/Library';
import {
  IBooksDetails,
  IBookswithmeList,
  ICancelBookReservation,
  IClaimDetail,
  ILanguagesDetails,
  IReserveBook,
  IStandardsBody
} from 'src/interfaces/Student/Library';
import { AppThunk } from 'src/store';

const LibrarySlicee = createSlice({
  name: 'library',

  initialState: {
    BooksDetaiLs: [],
    BookswithmeList: [],
    ClaimList: [],
    CancelBookReservation: '',
    LanguageList: [],
    Standards: [],
    ReserveBook: '',
    Loading: true
  },

  reducers: {
    getBookDetailslist(state, action) {
      state.BooksDetaiLs = action.payload.GetBookDetails;

      state.Loading = false;
      // alert(JSON.stringify( state.BooksDetaiLs));
    },

    getBookswithme(state, action) {
      state.BookswithmeList = action.payload.GetIssuedBookDetails;
      state.Loading = false;
    },

    getClaimBookDetails(state, action) {
      state.ClaimList = action.payload.GetClaimBookDetails;
      state.Loading = false;
    },
    getCancelBookReservation(state, action) {
      state.CancelBookReservation = action.payload;
    },
    resetCancelMessage(state) {
      state.CancelBookReservation = '';
    },
    resetClaimMessage(state) {
      state.ReserveBook = '';
    },
    getLanguagesDetails(state, action) {
      state.LanguageList = action.payload;
    },
    getReserveBook(state, action) {
      state.ReserveBook = action.payload;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.BooksDetaiLs = [];
      state.BookswithmeList = [];
      state.ClaimList = [];
    },

    getStandards(state, action) {
      state.Standards = action.payload;
    }
  }
});

export const getBookDetailslist =
  (data: IBooksDetails): AppThunk =>
    async (dispatch) => {
      dispatch(LibrarySlicee.actions.getLoading(true));
      const response = await LibraryApi.GetBooksDetailsList(data);
      dispatch(LibrarySlicee.actions.getBookDetailslist(response.data));
    };

export const getBookswithmelist =
  (data: IBookswithmeList): AppThunk =>
    async (dispatch) => {
      dispatch(LibrarySlicee.actions.getLoading(true));
      const response = await LibraryApi.GetBookswithmeList(data);
      dispatch(LibrarySlicee.actions.getBookswithme(response.data));
    };

export const getClaimBookDetails =
  (data: IClaimDetail): AppThunk =>
    async (dispatch) => {
      dispatch(LibrarySlicee.actions.getLoading(true));
      const response = await LibraryApi.ClaimBookDetails(data);
      dispatch(LibrarySlicee.actions.getClaimBookDetails(response.data));
    };
export const getCancelBookReservation =
  (data: ICancelBookReservation): AppThunk =>
    async (dispatch) => {
      const response = await LibraryApi.GetCancelBookReservation(data);
      dispatch(LibrarySlicee.actions.getCancelBookReservation(response.data));
    };
export const getReserveBook =
  (data: IReserveBook): AppThunk =>
    async (dispatch) => {
      const response = await LibraryApi.GetReserveBook(data);

      dispatch(LibrarySlicee.actions.getReserveBook(response.data));
    };
export const getStandards =
  (data: IStandardsBody): AppThunk =>
    async (dispatch) => {
      const response = await LibraryApi.GetStandards(data);
      let StandardsList = response.data.Standards.map((item, index) => {
        return {
          Value: item.standard_id,
          Name: item.standard_name
        };
      });
      StandardsList = [{ Value: '0', Name: 'All Standards' }, ...StandardsList];
      dispatch(LibrarySlicee.actions.getStandards(StandardsList));
    };

export const getLanguagesDetails =
  (data: ILanguagesDetails): AppThunk =>
    async (dispatch) => {
      const response = await LibraryApi.GetLanguage(data);

      // Map the response and prepend "All" option
      const Language = [
        { Id: '', Name: 'All', Value: '' }, // Add "All" as the default option
        ...response.data.LanguagesDetails.map((item) => ({
          Id: item.Language,
          Name: item.Language,
          Value: item.Language
        }))
      ];

      // Dispatch the updated language list to the store
      dispatch(LibrarySlicee.actions.getLanguagesDetails(Language));
    };

export const resetClaimMessage = (): AppThunk => async (dispatch) => {
  dispatch(LibrarySlicee.actions.resetClaimMessage());
};
export const resetMessage = (): AppThunk => async (dispatch) => {
  dispatch(LibrarySlicee.actions.resetCancelMessage());
};
export default LibrarySlicee.reducer;
