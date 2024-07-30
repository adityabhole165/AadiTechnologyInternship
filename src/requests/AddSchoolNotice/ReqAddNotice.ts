import { createSlice } from '@reduxjs/toolkit';
import AddSchoolNoticApi from 'src/api/AddSchoolNotic/ApiAddSchoolNotice';
import { getDateMonthYearDayDash } from 'src/components/Common/Util';
import { IDeleteSchooNoticeBody, IGetAllNoticeListBody, IUpdateSelectSchoolNoticeBody } from 'src/interfaces/AddSchoolNotic/IAddSchoolNotic';
import { AppThunk } from 'src/store';

const AddNoticeslice = createSlice({
    name: 'School Notice',
    initialState: {
        SchoolNoticeList: [],
        SelectSchoolNotice: '',
        DeleteSchoolNoticeMsg: '',
        Loading: true
    },

    reducers: {
        getSchoolNoticeList(state, action) {
            state.Loading = false;
            state.SchoolNoticeList = action.payload;
        },
        getSelectSchoolNotice(state, action) {
            state.Loading = false;
            state.SelectSchoolNotice = action.payload;
        },
        resetSelectSchoolNotice(state) {
            state.SelectSchoolNotice = '';
        },
        getDeleteSchoolNoticeMsg(state, action) {
            state.Loading = false;
            state.DeleteSchoolNoticeMsg = action.payload;
        },
        resetDeleteSchoolNoticeMsg(state) {
            state.Loading = false;
            state.DeleteSchoolNoticeMsg = '';
        },
        getLoading(state, action) {
            state.Loading = true;
        }
    }
});

export const getSchoolNoticeList = (data: IGetAllNoticeListBody): AppThunk => async (dispatch) => {
    dispatch(AddNoticeslice.actions.getLoading(true));
    const response = await AddSchoolNoticApi.GetAllNoticeList(data);
    const responseData = response.data.map((Item, i) => {
        return {
            Id: Item.NoticeId,
            Text1: Item.NoticeName,
            Text2: getDateMonthYearDayDash(Item.StartDate),
            Text3: getDateMonthYearDayDash(Item.EndDate),
            Text4: Item.DisplayLocation,
            Text5: Item.dbSortOrder,
            Text6: Item.FileName,
            Text7: Item.NoticeDescription,
            RowNo1: Item.RowNo1
        };
    });
    dispatch(AddNoticeslice.actions.getSchoolNoticeList(responseData));
};


export const getSelectSchoolNotice =
    (data: IUpdateSelectSchoolNoticeBody): AppThunk =>
        async (dispatch) => {
            dispatch(AddNoticeslice.actions.getLoading(true));
            const response = await AddSchoolNoticApi.UpdateSelectSchoolNotice(data);
            dispatch(AddNoticeslice.actions.getSelectSchoolNotice(response.data))
        }
export const resetSelectSchoolNotice =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(AddNoticeslice.actions.resetSelectSchoolNotice())
        }

export const DeleteSchoolNotice = (data: IDeleteSchooNoticeBody): AppThunk => async (dispatch) => {
    dispatch(AddNoticeslice.actions.getLoading(true));
    const response = await AddSchoolNoticApi.DeleteSchoolNotice(data);
    dispatch(AddNoticeslice.actions.getDeleteSchoolNoticeMsg(response.data));
};

export const resetDeleteSchoolNotice = (): AppThunk => async (dispatch) => {
    dispatch(AddNoticeslice.actions.resetDeleteSchoolNoticeMsg());
};


export default AddNoticeslice.reducer;
