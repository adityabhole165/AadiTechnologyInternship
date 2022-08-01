import { createSlice} from '@reduxjs/toolkit'
import LibraryApi from 'src/api/Student/Library';
import { AppThunk } from 'src/store';
import { IBooksDetails,IBookswithmeList,IClaimList } from 'src/Interface/Student/Library';

const LibrarySlicee = createSlice({

name:'library',

initialState:{
  BooksDetaiLs:[],
  BookswithmeList:[],
  ClaimList:[],
},

reducers:{
  getBookDetailslist(state,action){
 state.BooksDetaiLs=action.payload.GetBookDetails;
// alert(JSON.stringify( state.BooksDetaiLs));
  },

  
    getBookswithme(state,action){
      state.BookswithmeList=action.payload.GetIssuedBookDetails;
  },

  getClaimListList(state,action){
    state.ClaimList=action.payload.GetClaimBookDetails;
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

export const getClaimlist=
(data:IClaimList):AppThunk=>
async (dispatch) => {
  const response = await LibraryApi.GetClaim(data);
  dispatch(LibrarySlicee.actions.getClaimListList(response.data));

};
export default LibrarySlicee.reducer
