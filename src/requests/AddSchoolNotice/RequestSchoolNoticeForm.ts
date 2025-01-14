import { createSlice } from '@reduxjs/toolkit';
import SchoolNoticeFormApi from 'src/api/AddSchoolNotic/APISchoolNoticeForm';
import { IGetAllClassesAndDivisionsBody, IGetDeleteSchoolNoticeImageBody, IGetEditUserRolesandStdDivForSelectedNoticeIdBody, IGetSchoolNoticeIdByNameBody, ISaveUpdateSchoolNoticesBody } from 'src/interfaces/AddSchoolNotic/ISchoolNoticeForm';
import { AppThunk } from 'src/store';

const SchoolNoticeFormslice = createSlice({
    name: 'School NoticeForm',
    initialState: {
        SaveSchoolNotice: '',
        EditSchoolNotice: [],
        DeleteImageMsg: '',
        UserRoleselected: [],
        AllClassesAndDivisionss: [],
        AllClassesAndDivisionss1: [],
        SelectedStandardAndDivisionCheckBoxx: [],
        getSchoolNoticeIdByName: '',
        Loading: true
    },

    reducers: {
        getSaveSchoolNoticeMsg(state, action) {
            state.Loading = false;
            state.SaveSchoolNotice = action.payload;
        },
        resetSaveSchoolNoticeMsg(state) {
            state.SaveSchoolNotice = '';
        },
        getEditSchoolNoticeMsg(state, action) {
            state.Loading = false;
            state.EditSchoolNotice = action.payload;
        },
        resetEditSchoolNoticeMsg(state) {
            state.EditSchoolNotice = [];
        },
        getDeleteImageMsg(state, action) {
            state.Loading = false;
            state.DeleteImageMsg = action.payload;
        },
        resetDeleteImageMsg(state) {
            state.Loading = false;
            state.DeleteImageMsg = '';
        },
        getUserRoleSelected(state, action) {
            state.Loading = false;
            state.UserRoleselected = action.payload;
        },
        getAllClassesAndDivisionss(state, action) {
            state.Loading = false;
            state.AllClassesAndDivisionss = action.payload;
        },
        getAllClassesAndDivisionss1(state, action) {
            state.Loading = false;
            state.AllClassesAndDivisionss1 = action.payload;
        },
        getSelectedStandardAndDivisionCheckBoxx(state, action) {
            state.Loading = false;
            state.SelectedStandardAndDivisionCheckBoxx = action.payload;
        },
        getSchoolNoticeIdByName(state, action) {
            state.getSchoolNoticeIdByName = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        }
    }
});

export const getEditSchoolNoticeDetails = (data: IGetEditUserRolesandStdDivForSelectedNoticeIdBody): AppThunk => async (dispatch) => {
    dispatch(SchoolNoticeFormslice.actions.getLoading(true));
    const response = await SchoolNoticeFormApi.EditSchoolNoticeDetails(data);
    const responseData = response.data.map((Item, i) => {
        return {
            Id: Item.NoticeId,
            Text1: Item.NoticeName,
            Text2: Item.StartDate,
            Text3: Item.EndDate,
            Text4: Item.DisplayLocation,
            Text5: Item.dbSortOrder,
            Text6: Item.FileName,
            Text7: Item.NoticeDescription,
            Text8: Item.NoticeContent,
            Text9: Item.outSortOrder,
            IsText: Item.IsText,
            NoticeImage: Item.NoticeImage
        };
    });
    dispatch(SchoolNoticeFormslice.actions.getEditSchoolNoticeMsg(responseData));
};

export const getSchoolNoticeIdByName = (data: IGetSchoolNoticeIdByNameBody): AppThunk => async (dispatch) => {
    dispatch(SchoolNoticeFormslice.actions.getLoading(true));
    const response = await SchoolNoticeFormApi.GetSchoolNoticeIdByName(data);
    dispatch(SchoolNoticeFormslice.actions.getSchoolNoticeIdByName(response.data.NoticeId));
};

export const resetEditSchoolNoticeDetails =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(SchoolNoticeFormslice.actions.resetEditSchoolNoticeMsg())
        }


export const getSaveSchoolNoticeDetails =
    (data: ISaveUpdateSchoolNoticesBody): AppThunk =>
        async (dispatch) => {
            dispatch(SchoolNoticeFormslice.actions.getLoading(true));
            const response = await SchoolNoticeFormApi.SaveSchoolNotice(data);
            dispatch(SchoolNoticeFormslice.actions.getSaveSchoolNoticeMsg(response.data))
        }
export const resetSaveSchoolNoticeDetails =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(SchoolNoticeFormslice.actions.resetSaveSchoolNoticeMsg())
        }

export const DeleteImage = (data: IGetDeleteSchoolNoticeImageBody): AppThunk => async (dispatch) => {
    dispatch(SchoolNoticeFormslice.actions.getLoading(true));
    const response = await SchoolNoticeFormApi.DeleteImage(data);
    dispatch(SchoolNoticeFormslice.actions.getDeleteImageMsg(response.data));
};

export const resetDeleteSchoolNotice = (): AppThunk => async (dispatch) => {
    dispatch(SchoolNoticeFormslice.actions.resetDeleteImageMsg());
};

export const GetSelectedStandardAndDivisionCheckBoxx =
    (data: IGetEditUserRolesandStdDivForSelectedNoticeIdBody): AppThunk =>
        async (dispatch) => {
            const response = await SchoolNoticeFormApi.StandardDivSelectedclasses(data);
            dispatch(SchoolNoticeFormslice.actions.getSelectedStandardAndDivisionCheckBoxx(response.data))
        }

export const GetUserRolesForSelectedNoticeId =
    (data: IGetEditUserRolesandStdDivForSelectedNoticeIdBody): AppThunk =>
        async (dispatch) => {
            const response = await SchoolNoticeFormApi.UserRolesDetails(data);
            dispatch(SchoolNoticeFormslice.actions.getUserRoleSelected(response.data))
        }

export const GetAllClassAndDivision =
    (data: IGetAllClassesAndDivisionsBody): AppThunk =>
        async (dispatch) => {
            const response = await SchoolNoticeFormApi.AllStandardDivclasses(data);
            let responseData = response.data.map((item, i) => {
                return {
                    Id: item.SchoolWise_Standard_Division_Id,
                    Name: item.Division_Name,
                    Value: item.SchoolWise_Standard_Division_Id,
                    ParentId: item.Standard_Id,
                    IsActive: false
                }
            })

            let arr = []
            let arrStd = []
            response.data.map((item, i) => {
                if (!arrStd.includes(item.Standard_Id)) {

                    arrStd.push(item.Standard_Id)
                    arr.push({
                        Id: item.Standard_Id,
                        Name: item.Standard_Name,
                        Value: item.Standard_Id,
                        IsActive: false
                    })
                }
            })
            dispatch(SchoolNoticeFormslice.actions.getAllClassesAndDivisionss(responseData))
            dispatch(SchoolNoticeFormslice.actions.getAllClassesAndDivisionss1(arr))
        }

export default SchoolNoticeFormslice.reducer;
