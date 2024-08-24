import { createSlice } from '@reduxjs/toolkit';
import SchoolNoticePopupApi from 'src/api/SchoolNoticePopup/ApiSchoolNoticePopup';
import { getDateMonthYearTimeDayDash } from 'src/components/Common/Util';
import { IGetSchoolNoticePopupBody } from 'src/interfaces/SchoolNoticePopup/ISchoolNoticePopup';
import { AppThunk } from 'src/store';

const SchoolNoticePopupslice = createSlice({
    name: 'SchoolNoticePopup',
    initialState: {
        SchoolNoticePopUP: [],
        FillUpcomingEvents: [],
        Loading: true
    },

    reducers: {
        getSchoolNoticePopUP(state, action) {
            state.SchoolNoticePopUP = action.payload;
        },

        getFillUpcomingEvents(state, action) {
            state.Loading = false;
            state.FillUpcomingEvents = action.payload;
        },
        getLoading(state, action) {
            state.Loading = true;
        }

    }
})
export const SchoolNoticePopup = (data: IGetSchoolNoticePopupBody): AppThunk => async (dispatch) => {
    dispatch(SchoolNoticePopupslice.actions.getLoading(true));
    const response = await SchoolNoticePopupApi.GetSchoolNoticePopup(data);
    let SchoolNoticePopup1 = response.data.SchoolNoticePopUP.map((item, i) => {
        return {
            Id: item.NoticeId,
            Text1: item.NoticeName,
            Text2: getDateMonthYearTimeDayDash(item.StartDate),
            Text3: getDateMonthYearTimeDayDash(item.EndDate),
            Text4: item.DisplayLocation,
            Text5: item.dbSortOrder,
            Text6: item.FileName,
            Text7: item.NoticeContent,
            Text8: item.outSortOrder,
        };
    });

    let SchoolNoticePopup2 = response.data.FillUpcomingEvents.map((item, i) => {
        return {
            Event_Id: item.Event_Id,
            Event_Description: item.Event_Description,
            Event_Start_Date: item.Event_Start_Date,
            Standard_Name: item.Standard_Name,
            Standard_Id: item.Standard_Id,
        }
    })
    dispatch(SchoolNoticePopupslice.actions.getSchoolNoticePopUP(SchoolNoticePopup1));
    dispatch(SchoolNoticePopupslice.actions.getFillUpcomingEvents(SchoolNoticePopup2));
};


export default SchoolNoticePopupslice.reducer;