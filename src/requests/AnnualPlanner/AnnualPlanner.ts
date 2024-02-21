import { createSlice } from '@reduxjs/toolkit';
import IGetEventsInMonth, {
  IEventList,
  IGetAcadamicYearDropDownBody,
  IGetAllEventsBody,
  IGetAllMonthsDropDownBody,
  IGetAllStandardsBody,
  IGetFilePathBody
} from 'src/interfaces/Common/AnnualPlanner';
import { AppThunk } from 'src/store';
import AnnualPlannerApi from '../../api/AnnualPlanner/AnnualPlanner';

const AnnualPlannerSlice = createSlice({
  name: 'Annual Planner',
  initialState: {
    EventList: [],
    Event: [],
    Loading: true,
    FilePath: '',
    IAllStandards: [],
    ISSelectMonthList: [],
    ISAcadamicYearList: [],
    IsAllYearEventList: [],



  },
  reducers: {
    getEventList(state, action) {
      state.EventList = action.payload;
      state.Loading = false;
    },
    getEvents(state, action) {
      state.Event = action.payload;
      state.Loading = false;
    },
    getLoading(state, action) {
      state.Loading = true;
      state.EventList = [];
    },
    getFilepath(state, action) {
      state.FilePath = action.payload;
    },
    resetFilepath(state) {
      state.FilePath = '';
    },
    RgetallStandards(state, action) {
      state.IAllStandards = action.payload;
    },
    RSelectMonthList(state, action) {
      state.ISSelectMonthList = action.payload;
    },
    RSelectYearList(state, action) {
      state.ISAcadamicYearList = action.payload;
    },
    RAllYeareventList(state, action) {
      state.IsAllYearEventList = action.payload;
    },
  }
});

export const getEventList =
  (data: IEventList): AppThunk =>
    async (dispatch) => {
      dispatch(AnnualPlannerSlice.actions.getLoading(true));
      const response = await AnnualPlannerApi.GetEventOverviewList(data);
      let Data = [];
      Data = response.data.GetEventsInMonthResult?.map((item, index) => {
        return {
          id: index,
          header: item.Description,
          text1: 'Standard : ' + item.StandardList,
          text3: item.StartDate,
          linkPath:
            '/Common/viewevent/' +
            item.Id +
            '/' +
            data.asMonth +
            '/' +
            data.asYear
        };
      });
      dispatch(AnnualPlannerSlice.actions.getEventList(Data));
    };

export const getEvents =
  (body: IGetEventsInMonth): AppThunk =>
    async (dispatch) => {
      dispatch(AnnualPlannerSlice.actions.getLoading(true));

      const response = await AnnualPlannerApi.GetEventsMonth(body);
      let UpcomingEventList = response.data.GetEventsInMonthResult.map(
        (item, index) => {
          return {
            Id: item.Id,
            header: item.Description,
            text1: item.DisplayDate,
            text2: '',
            text3: item.EventComment,
            backgroundColor:
              item.TypeId === 1
                ? 'green2'
                : item.TypeId === 2
                  ? 'green1'
                  : 'pink2',
            linkPath:
              item.TypeId === 1 ? '/Common/viewevent/' + item.Id : undefined,
            Textcolor: item.TypeId === 1 ? '#42a5f5' : item.TypeId === 2 ? '' : ''
          };
        }
      );

      dispatch(AnnualPlannerSlice.actions.getEvents(UpcomingEventList));
    };
export const getFilePath =
  (data: IGetFilePathBody): AppThunk =>
    async (dispatch) => {
      const response = await AnnualPlannerApi.GetFilePath(data);
      dispatch(AnnualPlannerSlice.actions.getFilepath(response.data));
    };
export const ResetFilePath = (): AppThunk => async (dispatch) => {
  dispatch(AnnualPlannerSlice.actions.resetFilepath());
};
export const AllStandards =
  (data: IGetAllStandardsBody): AppThunk =>
    async (dispatch) => {
      const response = await AnnualPlannerApi.GetallStandards(data)

      let abc = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        abc.push({
          Id: item.standard_id,
          Name: item.standard_name,
          Value: item.standard_id
        })
      })

      dispatch(AnnualPlannerSlice.actions.RgetallStandards(abc))
    }

export const GetMonthList =
  (data: IGetAllMonthsDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await AnnualPlannerApi.MonthsDropDown(data)
      let abc = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        abc.push({
          Id: item.MonthID,
          Name: item.Month,
          Value: item.MonthID
        })
      })
      dispatch(AnnualPlannerSlice.actions.RSelectMonthList(abc))
    }
export const AcadamicYear =
  (data: IGetAcadamicYearDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await AnnualPlannerApi.AcadamicYearDropDown(data)

      let abc = [{ Id: '0', Name: 'All', Value: '0' }];
      response.data.map((item, i) => {
        abc.push({
          Id: item.Academic_Year_ID,
          Name: item.YearValue,
          Value: item.Academic_Year_ID
        })
      });
      dispatch(AnnualPlannerSlice.actions.RSelectYearList(abc))
    };

export const alleventyearlist =
  (data: IGetAllEventsBody): AppThunk =>
    async (dispatch) => {
      dispatch(AnnualPlannerSlice.actions.getLoading(true));
      const response = await AnnualPlannerApi.AllYearEventList(data);


      let Data = [];
      Data = response.data.map((item, index) => {
        return {
          id: index,
          header: item.EventDescription,
          text1: 'Standards : ' + item.Standards,

          text3: item.DisplayDate,
          text4: item.EndDate


        };
      });
      dispatch(AnnualPlannerSlice.actions.RAllYeareventList(Data));
    };

// export const alleventyearlist =
//   (data: IGetAllEventsBody): AppThunk =>
//     async (dispatch) => {
//       const response = await AnnualPlannerApi.AllYearEventList(data);
//       console.log(response, "response");

//       dispatch(AnnualPlannerSlice.actions.RAllYeareventList(response.data));
//     };

export default AnnualPlannerSlice.reducer;
