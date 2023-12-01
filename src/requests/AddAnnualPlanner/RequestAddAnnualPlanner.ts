import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import AddAnnualPlannerApi from 'src/api/AddAnnualPlanner/ApiAddAnnualPlanner';
import { IAddAnnualPlannerBody,IGetFileDetailsBody,IDeleteFileDetailsBody } from 'src/interfaces/AddAnnualPlanner/IAddAnnualPlanner';


const AddAnnualPlannerSlice = createSlice({
    name: 'AddAnnualPlanner',
    initialState: {
        AddAnnual:'',
        getfile:[],
        deletefile:''
    },
    reducers: {
        addanual(state, action) {
            state.AddAnnual = action.payload;
        },
        GetFile(state, action) {
            state.getfile = action.payload;
        },
        DeleteFile(state, action) {
            state.deletefile = action.payload;
        },

    }
});
export const addanual =
  (data: IAddAnnualPlannerBody): AppThunk =>
    async (dispatch) => {
      const response = await AddAnnualPlannerApi.AddAnnualPlanner(data)
      dispatch(AddAnnualPlannerSlice.actions.addanual(response.data))
    }

    export const GetFile =
  (data: IGetFileDetailsBody): AppThunk =>
    async (dispatch) => {
      const response = await AddAnnualPlannerApi.GetAnnualPlanner(data)
      dispatch(AddAnnualPlannerSlice.actions.GetFile(response.data))
    }
    export const DeleteFile =
    (data: IDeleteFileDetailsBody): AppThunk =>
      async (dispatch) => {
        const response = await AddAnnualPlannerApi.DeleteAnnualPlanner(data)
        dispatch(AddAnnualPlannerSlice.actions.DeleteFile(response.data))
      }
    
    
    export default AddAnnualPlannerSlice.reducer;