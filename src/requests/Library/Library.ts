import { createSlice} from '@reduxjs/toolkit'
import LibraryApi from 'src/api/Library/Library';
import ClaimBookDetails from 'src/api/Library/Library';
import { AppThunk } from 'src/store';
import { IBooksDetails,IBookswithmeList,IClaimDetail,IClaimDetailResult,
  ICancelBookReservation,ILanguagesDetails, IStandardsBody,IStandardsResult } from 'src/interfaces/Student/Library';

const LibrarySlicee = createSlice({

name:'library',

initialState:{
  BooksDetaiLs:[],
  BookswithmeList:[],
  ClaimList:[],
  CancelBookReservation:'',
  LanguageList:[],
  Standards:[],
  Loading:true
},

reducers:{
  getBookDetailslist(state,action){
 state.BooksDetaiLs=action.payload.GetBookDetails;
 
 state.Loading = false
// alert(JSON.stringify( state.BooksDetaiLs));
  },

  
  getBookswithme(state,action){
  state.BookswithmeList=action.payload.GetIssuedBookDetails;
  state.Loading = false
  },

  getClaimBookDetails(state,action){
    state.ClaimList=action.payload.GetClaimBookDetails;
    state.Loading = false
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
  getLoading (state,action) {
    state.Loading = true
    state.BooksDetaiLs = [];
    state.BookswithmeList=[];
    state.ClaimList=[];
   },
 
    getStandards (state,action) {
     state.Standards =action.payload;
    }

   }

});

export const getBookDetailslist=
(data:IBooksDetails):AppThunk=>
async (dispatch) => {
  dispatch(LibrarySlicee.actions.getLoading(true));
  const response = await LibraryApi.GetBooksDetailsList(data);
  dispatch(LibrarySlicee.actions.getBookDetailslist(response.data));

};

export const getBookswithmelist=
(data:IBookswithmeList):AppThunk=>
async (dispatch) => {
  dispatch(LibrarySlicee.actions.getLoading(true));
  const response = await LibraryApi.GetBookswithmeList(data);
  dispatch(LibrarySlicee.actions.getBookswithme(response.data));

};

export const getClaimBookDetails=
(data:IClaimDetail):AppThunk=>
async (dispatch) => {
  dispatch(LibrarySlicee.actions.getLoading(true));
  const response = await LibraryApi.ClaimBookDetails(data);
  dispatch(LibrarySlicee.actions.getClaimBookDetails(response.data));

};
export const getCancelBookReservation=
(data:ICancelBookReservation):AppThunk=>
async (dispatch) => {
  const response = await LibraryApi.GetCancelBookReservation(data);
  dispatch(LibrarySlicee.actions.getCancelBookReservation(response.data));

};
export const getStandards=
(data:IStandardsBody):AppThunk=>
async (dispatch) => {
  const response = await LibraryApi.GetStandards(data);
  const StandardsList =  response.data.Standards.map((item, index) => {
    return {
     Value:item.standard_id,
     Name:item.standard_name,
   }
  }) 
  dispatch(LibrarySlicee.actions. getStandards(StandardsList ));

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

  
  dispatch(LibrarySlicee.actions.getLanguagesDetails(Language));

};

export const resetMessage=
():AppThunk=>
async (dispatch) => {
  dispatch(LibrarySlicee.actions.resetCancelMessage());

}
export default LibrarySlicee.reducer
