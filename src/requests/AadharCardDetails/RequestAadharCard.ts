import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiAadharCardDetails from 'src/api/AadharCardDetails/ApiAadharCard';
import { IGetUserAadharCardDetailsBody, ISaveUserAadharCardDetailsBody } from 'src/interfaces/Student/IAadharCardDetails';

const SliceAadharCardDetails = createSlice({
    name: 'AadharCardDetails',
    initialState: {
        GetUserAadharCardDetails: {},
        SaveUserAadharCardDetails: {},
        Loading: true,
    },
    reducers: {
        getUserAadharCardDetails(state, action) {
            state.GetUserAadharCardDetails = action.payload;
            state.Loading = false;
        },

        getsaveUserAadharCardDetails(state, action) {
            state.SaveUserAadharCardDetails = action.payload;
            state.Loading = false;
        },
        resetMessage(state) {
            state.SaveUserAadharCardDetails = ""
        },
        getLoading(state, action) {
            state.Loading = true
        }
    }
});

export const getUserAadharCardDetails =
  (data: IGetUserAadharCardDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceAadharCardDetails.actions.getLoading(true));
     
      const response = await ApiAadharCardDetails.GetUserAadharCardDetailsApi(data)
      
      const AadharCardList =  
         {
        Name:response.data.User.Name.split('(')[0],
        AadharCardNo:response.data.User.AadharCardNo,
        AadharCardFileName:response.data.User.AadharCardFileName

       }
      
      dispatch(SliceAadharCardDetails.actions.getUserAadharCardDetails( AadharCardList ));
    };

    export const getsaveUserAadharCardDetails =
  (data: ISaveUserAadharCardDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceAadharCardDetails.actions.getLoading(true));
      const response = await ApiAadharCardDetails.SaveUserAadharCardDetailsapi(data)
      dispatch(SliceAadharCardDetails.actions.getsaveUserAadharCardDetails(response.data));
    };
    
    export const resetMessage =
  (): AppThunk =>
    async (dispatch) => {
      dispatch(SliceAadharCardDetails.actions.resetMessage());
    };
    
    export default SliceAadharCardDetails.reducer;