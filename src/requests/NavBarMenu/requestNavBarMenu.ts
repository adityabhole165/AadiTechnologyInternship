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

/**
 * Fetches navbar menu details from session storage or API.
 * If data exists in session storage, uses cached data.
 * Otherwise calls API, stores response in session storage and returns sorted menu items by priority.
 * @param data Menu details request body
 */
export const getNavbarMenuDetails =
  (data: IGetMenuDetailsBody): AppThunk =>
    async (dispatch) => {
      dispatch(SliceNavbarMenu.actions.getLoading(true));
      let responseData = [];

      const sessionData = sessionStorage.getItem("NavbarMenu");
      if (sessionData) {
        responseData = JSON.parse(sessionData);
      } else {
        const response = await ApiGetMenuDetails.GetMenuDetailsApi(data);
        responseData = response.data.MenuDetails;
        sessionStorage.setItem("NavbarMenu", JSON.stringify(responseData));
      }
      dispatch(SliceNavbarMenu.actions.getNavbarMenuDetails(responseData.sort((a, b) => a.Priority - b.Priority)));
    };

export default SliceNavbarMenu.reducer;