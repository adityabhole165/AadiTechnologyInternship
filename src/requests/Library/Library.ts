import { createSlice} from '@reduxjs/toolkit'
import LibraryApi from 'src/api/Library/Library';
import ClaimBookDetails from 'src/api/Library/Library';
import { AppThunk } from 'src/store';
import { IBooksDetails,IBookswithmeList,IClaimDetail,IClaimDetailResult,ICancelBookReservation,ILanguagesDetails } from 'src/interfaces/Student/Library';

const LibrarySlicee = createSlice({

name:'library',

initialState:{
  BooksDetaiLs:[],
  BookswithmeList:[],
  ClaimList:[],
  CancelBookReservation:'',
  LanguageList:[]
},

reducers:{
  getBookDetailslist(state,action){
 state.BooksDetaiLs=action.payload.GetBookDetails;
// alert(JSON.stringify( state.BooksDetaiLs));
  },

  
    getBookswithme(state,action){
      state.BookswithmeList=action.payload.GetIssuedBookDetails;
  },

  getClaimBookDetails(state,action){
    state.ClaimList=action.payload.GetClaimBookDetails;
  },
   getCancelBookReservation(state,action){
   state.CancelBookReservation=action.payload;
  },
  resetCancelMessage(state){
    state.CancelBookReservation='';
  },
  getLanguagesDetails(state,action){
  state.LanguageList=action.payload;
  },

}

});

export const getBookDetailslist=
(data:IBooksDetails):AppThunk=>
async (dispatch) => {
  const response = await LibraryApi.GetBooksDetailsList(data);
  dispatch(LibrarySlicee.actions.getBookDetailslist(response.data));

};

export const getBookswithmelist=
(data:IBookswithmeList):AppThunk=>
async (dispatch) => {
  const response = await LibraryApi.GetBookswithmeList(data);
  dispatch(LibrarySlicee.actions.getBookswithme(response.data));

};

export const getClaimBookDetails=
(data:IClaimDetail):AppThunk=>
async (dispatch) => {
  const response = await LibraryApi.ClaimBookDetails(data);
  console.log(response.data,"response.data")
  dispatch(LibrarySlicee.actions.getClaimBookDetails(response.data));

};
export const getCancelBookReservation=
(data:ICancelBookReservation):AppThunk=>
async (dispatch) => {
  const response = await LibraryApi.GetCancelBookReservation(data);
  dispatch(LibrarySlicee.actions.getCancelBookReservation(response.data));

};

export const  getLanguagesDetails=
(data:ILanguagesDetails):AppThunk=>
async (dispatch) => {
  const response = await LibraryApi.GetLanguage(data);
  const Language =  response.data.LanguagesDetails.map((item, index) => {
           return {
            id:index,
            Name:item.Language,
          }
         }) 

  console.log(Language,"Languagerefdgddh")
  dispatch(LibrarySlicee.actions.getLanguagesDetails(Language));

};

export const resetMessage=
():AppThunk=>
async (dispatch) => {
  dispatch(LibrarySlicee.actions.resetCancelMessage());

}
export default LibrarySlicee.reducer
