import { createSlice } from '@reduxjs/toolkit';
import ApiGetMenuDetails from 'src/api/NavBarMenu/ApiNavbarMenu';
import { IGetMenuDetailsBody } from 'src/interfaces/Student/INavbarMenu';
import { AppThunk } from 'src/store';

const SliceNavbarMenu = createSlice({
  name: 'NavBarMenus',
  initialState: {
    GetNavbarMenuDetails: [],
    MenuDescription: [],
    ChildMenuId: 0,
    Loading: true,
  },
  reducers: {
    getNavbarMenuDetails(state, action) {
      state.GetNavbarMenuDetails = action.payload;
      state.Loading = false;
    },
    getMenuDescription(state, action) {
      state.MenuDescription = action.payload;
      state.Loading = false;
    },
    getChildMenuId(state, action) {
      state.ChildMenuId = action.payload;
      state.Loading = false;
    },
    getLoading(state, action) {
      state.Loading = true
    }
  }
});



export const getMenuDescription =
  (data: IGetMenuDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceNavbarMenu.actions.getLoading(true));
      const response = await ApiGetMenuDetails.GetMenuDescriptionApi(data)
      dispatch(SliceNavbarMenu.actions.getMenuDescription(response.data.MenuDetails));
    };
export const getChildMenuId =
  (data: IGetMenuDetailsBody): AppThunk =>
    async (dispatch) => {
      console.warn('-\--/-', data)
      dispatch(SliceNavbarMenu.actions.getChildMenuId(data.aiMenuId));
    };

export const getNavbarMenuDetails =
  (data: IGetMenuDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceNavbarMenu.actions.getLoading(true));
      let responseData = []
      // if (!data.IsRefresh) {
      //   let NavbarMenuTemp = localStorage.getItem("NavbarMenu")
      //   responseData = (NavbarMenuTemp == undefined || NavbarMenuTemp == null) ?
      //     [] : JSON.parse(NavbarMenuTemp)
      // }
      if (responseData != null && responseData.length == 0) {
        const response = await ApiGetMenuDetails.GetMenuDetailsApi(data)
        responseData = response.data.MenuDetails
        // localStorage.setItem("NavbarMenu", JSON.stringify(responseData))
      }
      dispatch(SliceNavbarMenu.actions.getNavbarMenuDetails(responseData.sort((a, b) => a.Priority - b.Priority)));
    };

export default SliceNavbarMenu.reducer;