import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from 'src/store';
import ApiGetMenuDetails from 'src/api/NavBarMenu/ApiNavbarMenu';
import { IGetMenuDetailsBody } from 'src/interfaces/Student/INavbarMenu';

const SliceNavbarMenu = createSlice({
    name: 'NavBarMenus',
    initialState: {
        GetNavbarMenuDetails:[],
        Loading: true,
    },
    reducers: {
        getNavbarMenuDetails(state, action) {
            state.GetNavbarMenuDetails = action.payload;
            state.Loading = false;
        },
        getLoading(state, action) {
            state.Loading = true
        }
    }
});


    export const getNavbarMenuDetails =
    (data: IGetMenuDetailsBody): AppThunk =>
      async (dispatch) => {
        dispatch(SliceNavbarMenu.actions.getLoading(true));
        const response = await ApiGetMenuDetails.GetMenuDetailsApi(data)
        dispatch(SliceNavbarMenu.actions.getNavbarMenuDetails(response.data));
       
      };
    
    export default SliceNavbarMenu.reducer;