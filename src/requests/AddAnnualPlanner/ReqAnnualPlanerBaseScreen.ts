import { createSlice } from '@reduxjs/toolkit';
import ApiAnnualPlanerBaseScreen from 'src/api/AddAnnualPlanner/ApiAnnualPlanerBaseScreen';
import { IGetAllDivisionsForStandardDropDownBody, IGetAllMonthsDropDownBody, IGetAssociatedStandardsBodyP, IGetAssociatedStdLstForTeacherDropDownBody, IGetEventsDataListBody, IGetYearsForAnnualPalannerDropDownBody } from "src/interfaces/AddAnnualPlanner/IAnnualPlanerBaseScreen";
import { AppThunk } from 'src/store';

const AnnualPlanerBaseScreenSlice = createSlice({
  name: 'AnnualPlanerBaseScreen',
  initialState: {
    AddAnnual: '',
    getfile: [],
    deletefile: '',
    ISSelectStandardList: [],
    ISSelectDivisionList: [],
    ISSelectMonthList: [],
    ISSelectYearList: [],
    ISEventsDataList: [],
    IGetAssociatedStandardsP: [],
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
    RSelectStandardList(state, action) {
      state.ISSelectStandardList = action.payload;
    },
    RSelectDivisionList(state, action) {
      state.ISSelectDivisionList = action.payload;
    },
    RSelectMonthList(state, action) {
      state.ISSelectMonthList = action.payload;
    },
    RSelectYearList(state, action) {
      state.ISSelectYearList = action.payload;
    },


    REventsDataList(state, action) {
      state.ISEventsDataList = action.payload;
    },

    AssociatedStandardsP(state, action) {
      state.IGetAssociatedStandardsP = action.payload;
    },

  }
});


export const GetStandardList =
  (data: IGetAssociatedStdLstForTeacherDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.StandardDropDown(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.StandardId,
          Name: item.Standard_Name,
          Value: item.StandardId
        }
      })

      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectStandardList(a))
    }





export const GetDivisionList =
  (data: IGetAllDivisionsForStandardDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.DivisionDropDown(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.division_id,
          Name: item.division_name,
          Value: item.division_id
        }
      })

      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectDivisionList(a))
    }

export const GetMonthList =
  (data: IGetAllMonthsDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.MonthsDropDown(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.MonthID,
          Name: item.Month,
          Value: item.MonthID
        }
      })
      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectMonthList(a))
    }

export const GetYearList =
  (data: IGetYearsForAnnualPalannerDropDownBody): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.YearsDropDown(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.Year,
          Name: item.Year,
          Value: item.Year
        }
      })
      dispatch(AnnualPlanerBaseScreenSlice.actions.RSelectYearList(a))
    }

// export const CDAGetEventsDataList = (data: IGetEventsDataListBody): AppThunk => async (dispatch) => {
//   const response = await ApiAnnualPlanerBaseScreen.EventsDataList(data);

//   let CDAGetEventsDataList = [];
//   let uniqueDays = {}; // To store unique days as keys and Event_Title as values

//   response.data.forEach((item, i) => {


//     if (item.Day) {
//       if (!uniqueDays[item.Day]) {
//         uniqueDays[item.Day] = []; // Initialize an array if Day doesn't exist
//       }
//       uniqueDays[item.Day].push(item.Event_Title); // Store Event_Title for each Day
//     }
//   });

//   Object.keys(uniqueDays).forEach(day => {
//     CDAGetEventsDataList.push({
//       Id: uniqueDays[day].Event_Id,
//       IsActive: false,
//       Name: parseInt(day),
//       Value: "",
//       Text1: uniqueDays[day].join(', '),
//       Text2: uniqueDays[day].join(', '),
//       ForeColur: "",
//       BackgroundColor: "",
//       IsClickable: parseInt(day)
//     });
//   });

//   CDAGetEventsDataList.sort((a, b) => a.Name - b.Name);

//   dispatch(AnnualPlanerBaseScreenSlice.actions.REventsDataList(CDAGetEventsDataList));
// };
// export const CDAGetEventsDataList = (data: IGetEventsDataListBody): AppThunk => async (dispatch) => {
//   const response = await ApiAnnualPlanerBaseScreen.EventsDataList(data);

//   let EventsDataList = response.data.map((item, i) => {

//     return {
//       Id: item.Event_Desc,
//       IsActive: false,
//       Name: parseInt(item.Day),
//       Value: item.Event_Id,
//       Text1: item.Event_Title,
//       Text2: item.Event_Desc,
//       ForeColur: item.Event_ForeColor,
//       BackgroundColor: item.Event_BackColor,
//       IsClickable: parseInt(item.Day)
//     };
//   });
//   EventsDataList.sort((a, b) => a.Name - b.Name);

//   dispatch(AnnualPlanerBaseScreenSlice.actions.REventsDataList(EventsDataList));
// };
export const CDAGetEventsDataList = (data: IGetEventsDataListBody): AppThunk => async (dispatch) => {
  const response = await ApiAnnualPlanerBaseScreen.EventsDataList(data);

  // Create an object to store events grouped by day
  let eventsByDay = {};

  response.data.forEach((item, i) => {
    const { Day, Event_Id, Event_Title, Event_Desc, Event_ForeColor, Event_BackColor } = item;

    // If the day doesn't exist in the object, initialize it with an empty array
    if (!eventsByDay[Day]) {
      eventsByDay[Day] = [];
    }

    // Push the event to the array corresponding to its day
    eventsByDay[Day].push({
      Id: Event_Id,
      IsActive: false,
      Name: parseInt(Day),
      Value: Event_Id,
      Text1: Event_Title,
      Text2: Event_Desc,
      ForeColor: Event_ForeColor,
      BackgroundColor: Event_BackColor,
      IsClickable: parseInt(Day)
    });
  });

  // Transform the object into an array of events, maintaining the order of days
  let EventsDataList = Object.keys(eventsByDay).map(day => {
    // Merge events for the day into a single object
    const mergedEvent = eventsByDay[day].reduce((acc, cur) => {
      acc.Id += `, ${cur.Id}`;
      acc.Text1 += `, ${cur.Text1}`;
      acc.Text2 += `, ${cur.Text2}`;
      return acc;
    });

    // Convert mergedEvent back to an object
    return {
      Id: mergedEvent.Id,
      IsActive: false,
      Name: parseInt(day),
      Value: mergedEvent.Id,
      Text1: mergedEvent.Text1,
      Text2: mergedEvent.Text2,
      ForeColor: mergedEvent.ForeColor,
      BackgroundColor: mergedEvent.BackgroundColor,
      IsClickable: parseInt(day)
    };
  });

  EventsDataList.sort((a, b) => a.Name - b.Name);

  dispatch(AnnualPlanerBaseScreenSlice.actions.REventsDataList(EventsDataList));
};



export const AssociatedStandardListP =
  (data: IGetAssociatedStandardsBodyP): AppThunk =>
    async (dispatch) => {
      const response = await ApiAnnualPlanerBaseScreen.AssociatedStandardP(data)
      let a = response.data.map((item, i) => {
        return {
          Id: item.original_standard_id,
          Name: item.standard_name,
          Value: item.original_standard_id
        }
      })

      dispatch(AnnualPlanerBaseScreenSlice.actions.AssociatedStandardsP(a))
    }

export default AnnualPlanerBaseScreenSlice.reducer;





