import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiAddAadharCardDetails from 'src/api/AddAadharCardDetails/APIAddAadharCardDetails';
import { IGetAddAadharCardDetailsBody,IGetSubmitAadharDetailsBody } from 'src/interfaces/AddAadharCardDetails/IAddAadharCardDetails';

const SliceAddAadharCardDetails = createSlice({
    name: 'AddAadharCardDetails',
    initialState: {
        ISAddAadharCardDetails:[],
        ISSubmitAadharCardDetailsS:""
       
    },
    reducers : {
        AddAadharCardDetailss(state , action)
            {
                state.ISAddAadharCardDetails=action.payload;
            },
        SubmitAadharDetails(state,action)    
           {
               state.ISSubmitAadharCardDetailsS=action.payload
           },
        }
    });
    export const AddAadharCard =
  (data:IGetAddAadharCardDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAddAadharCardDetails.AddAadharCardDetailsApi(data);
      let abc = response.data.map((item, i) => {
        return {
          Id: item.SchoolWise_Student_Id,
          Name: item.StudentFullName,
          Value: item.AadharCardNo
        }                
      })
      dispatch(SliceAddAadharCardDetails.actions.AddAadharCardDetailss(abc));
    };
    export const SubmitAadhardetails =
    (data: IGetSubmitAadharDetailsBody): AppThunk =>
      async (dispatch) => {
        const response = await ApiAddAadharCardDetails.SubmitAadharDetailsApi(data)
        dispatch(SliceAddAadharCardDetails.actions.SubmitAadharDetails(response.data))
      }
    export default SliceAddAadharCardDetails.reducer;   