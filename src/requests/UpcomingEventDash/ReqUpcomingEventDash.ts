
import { createSlice } from '@reduxjs/toolkit';
import ApiUpcomingEventDash from 'src/api/UpcomingEventDash/ApiUpcomingEventDash';
import { formatDateAsDDMMMYYYY } from 'src/components/Common/Util';
import { IUpcomingEventDashBody } from 'src/interfaces/UpcomingEventDash/IUpcomingEventDash';
import { AppThunk } from 'src/store';

const UpcomingEventDashslice = createSlice({
    name: 'UpcomingEventDash',
    initialState: {
        UpcomingEventData: [],
        Loading: true
    },
    reducers: {

        getUpcomingEventData(state, action) {
            state.Loading = false;
            state.UpcomingEventData = action.payload;
        },

        getLoading(state, action) {
            state.Loading = true;
            state.UpcomingEventData = [];
        }
    }
});



export const getUpcomingEventDashdata =
    (data: IUpcomingEventDashBody): AppThunk =>
        async (dispatch) => {
            dispatch(UpcomingEventDashslice.actions.getLoading(true));
            const response = await ApiUpcomingEventDash.GetUpcomingEventList(data);
            let Data = [];
            Data = response.data.UpcomingEventsData?.map((item, index) => {
                return {
                    Id: item.EventId,
                    Text1: formatDateAsDDMMMYYYY(item.StartDate),
                    Text2: formatDateAsDDMMMYYYY(item.EndDate),
                    Text3: item.EventTitle,
                    Text4: item.StandardName,
                    Text5: item.EventDescription,
                    Text6: item.EventType
                };
            });

            dispatch(UpcomingEventDashslice.actions.getUpcomingEventData(Data));
        };

export default UpcomingEventDashslice.reducer;