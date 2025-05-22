import { createSlice } from "@reduxjs/toolkit";
import HolidayApi from "src/api/HolidayNew/ApiHolidaynew";
import { getDateMonthYearDayDash } from "src/components/Common/Util";
import { ISchoolSettings,IDeleteHolidayDetailsBody, IGetAllClassesAndDivisionsBody, IGetHolidayDetailsBody, IGetHolidayDetailssBody, IGetHolidayListBody, IGetHolidaynameAndStartDateEnddateValidationBody, IGetHomeworkDetailsBody, IGetMonthwiseAttendance, SaveHolidayDetailsBody } from "src/interfaces/HolidayNew/IHolidays";
import { AppThunk } from "src/store";

const HolidaySliceNew = createSlice({
    name: 'HolidayNew',
    initialState: {
        MyHoliday: [],
        saveHoliday: '',
        GetAllClassAndDivnew: [],
        GetAllClassAndDivnew1: [],
        GetHolidayDetailss: [],
        GetHomeworkDetails: [],
        DeleteHolidayDetails: '',
        HolidayStartAndEndDateValidation: [],
        HolidayDuplicateNameValCount: [],


        GetHolidayList: [],

        GetHolidayDetails: '',

        GetMonthwiseAttendance: [],
        HeaderArray: [],


        ReqGetSchoolSettings: {},

        Loading: true
    },
    reducers: {

        getSaveHoliday(state, action) {
            state.Loading = false;
            state.saveHoliday = action.payload;
        },
        resetSaveholidays(state) {
            state.saveHoliday = '';
        },


        GetNameAndStartDateEnddateValidationForSaveHoliday: (state, action) => {
            state.Loading = false;
            state.MyHoliday = action.payload;
        },

        // resetgetHolidayNameAndStartDateEndDateValidation: (state) => {
        //     state.MyHoliday = [];
        // },
        resetgetHolidayNameAndStartDateEndDateValidation: (state) => {
            state.Loading = false;
            state.HolidayDuplicateNameValCount = [];
            state.HolidayStartAndEndDateValidation = [];
        },
        DuplicateNameValidationCount(state, action) {
            state.Loading = false;
            state.HolidayDuplicateNameValCount = action.payload;
        },

        StartDateEndDateValidations(state, action) {
            state.Loading = false;
            state.HolidayStartAndEndDateValidation = action.payload;
        },

        GetGetAllClassesAndDivisions: (state, action) => {

            state.GetAllClassAndDivnew = action.payload;
        },
        GetGetAllClassesAndDivisions1: (state, action) => {
            state.Loading = false;
            state.GetAllClassAndDivnew1 = action.payload;
        },

        GetGetHolidayDetailss: (state, action) => {
            state.Loading = false;
            state.GetHolidayDetailss = action.payload;
        },

        GetGetHomeworkDetails: (state, action) => {
            state.Loading = false;
            state.GetHomeworkDetails = action.payload;
        },

        GetDeleteHolidayDetails: (state, action) => {
            state.Loading = false;
            state.DeleteHolidayDetails = action.payload;
        },
        resetDeleteHolidayDetails(state) {
            state.DeleteHolidayDetails = '';
        },

        getGetHolidayDetails: (state, action) => {
            state.Loading = false;
            state.GetHolidayDetails = action.payload;
        },

        getGetHolidayList: (state, action) => {
            state.Loading = false;
            state.GetHolidayList = action.payload;
        },

        //     GetGetAllClassesAndDivisions : (state , action) => {
        //     state.getAllClassesAndDivisions = action.payload;
        // },

        GetGetMonthwiseAttendance(state, action) {
            state.Loading = false;
            state.GetMonthwiseAttendance = action.payload;
        },
        resetGetMonthwiseAttendance(state) {
            state.saveHoliday = '';
        },
        getHeaderArray(state, action) {
            state.HeaderArray = action.payload;
          },

        getLoading(state, _action) {
            state.Loading = true;
        },
        GetgetSchoolSettings(state, action) {
            state.ReqGetSchoolSettings = action.payload;
            state.Loading = false;
        },
    }
});
export const resetSaveholidays =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(HolidaySliceNew.actions.resetSaveholidays())
        }



export const getSaveHoliday =
    (data: SaveHolidayDetailsBody): AppThunk => async (dispatch) => {
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.SaveHolidaysNew(data);
        dispatch(HolidaySliceNew.actions.getSaveHoliday(response.data));
    };


export const GetNameAndStartDateEnddateValidationForSaveHoliday =
    (data: IGetHolidaynameAndStartDateEnddateValidationBody): AppThunk => async (dispatch) => {
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.GetHolidayNameAndStartDateEndDateValidation(data);
        dispatch(HolidaySliceNew.actions.GetNameAndStartDateEnddateValidationForSaveHoliday(response.data));
        const NameAndStartDateEnddateValidation = response.data.HolidayDuplicatenameValidationCount.map((item, i) => {
            return (
                {
                    DuplicateHolidayNameCount: item.DuplicateHolidayNameCount,
                }
            );
        });
        const NameAndStartDateEnddateValidation1 = response.data.HolidayStartAndEndDatePredefinedValidationCount.map((item, i) => {
            return (
                {
                    predefinedStartDateAndEndDate: item.PredefinedStartDateAndEndDateCount,
                }
            );
        });
        dispatch(HolidaySliceNew.actions.DuplicateNameValidationCount(NameAndStartDateEnddateValidation));
        dispatch(HolidaySliceNew.actions.StartDateEndDateValidations(NameAndStartDateEnddateValidation1));
    };

export const resetgetHolidayNameAndStartDateEndDateValidation =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(HolidaySliceNew.actions.resetgetHolidayNameAndStartDateEndDateValidation())
        };
export const resetDeleteHolidayDetails =
    (): AppThunk =>
        async (dispatch) => {
            dispatch(HolidaySliceNew.actions.resetDeleteHolidayDetails())
        };


export const GetGetAllClassesAndDivisions =
    (data: IGetAllClassesAndDivisionsBody): AppThunk => async (dispatch) => {
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.GetAllClassesAndDivisions(data);


        let responseData = response.data.map((item, i) => {
            return {
                Id: item.SchoolWise_Standard_Division_Id,
                Name: item.Division_Name,
                Value: item.SchoolWise_Standard_Division_Id,
                ParentId: item.Standard_Id,
                IsActive: data.associatedStandard.length > 0 ? (data.associatedStandard.includes(item.SchoolWise_Standard_Division_Id) ?
                    true : false) : true
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
                    IsActive: true
                })
            }
        })
        dispatch(HolidaySliceNew.actions.GetGetAllClassesAndDivisions(responseData));
        dispatch(HolidaySliceNew.actions.GetGetAllClassesAndDivisions1(arr));
    };

export const GetGetHolidayDetailss =
    (data: IGetHolidayDetailssBody): AppThunk => async (dispatch) => {
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.GetHolidayDetailss(data);
        const responseData = response.data.map((Item, i) => {
            return {
                Id: Item.Holiday_Id,
                Text1: getDateMonthYearDayDash(Item.Holiday_Start_Date),
                Text2: getDateMonthYearDayDash(Item.Holiday_End_Date),
                Text3: Item.Holiday_Name,
                Text4: Item.AssociatedStandard,
                Text5: Item.TotalDays,
                TotalRows: Item.TotalRows
            };
        });
        dispatch(HolidaySliceNew.actions.GetGetHolidayDetailss(responseData));
    };

export const GetGetHomeworkDetails =
    (data: IGetHomeworkDetailsBody): AppThunk => async (dispatch) => {//
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.GetHomeworkDetails(data);
        dispatch(HolidaySliceNew.actions.GetGetHomeworkDetails(response.data));
    };



export const GetDeleteHolidayDetails =
    (data: IDeleteHolidayDetailsBody): AppThunk => async (dispatch) => {//
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.DeleteHolidayDetails(data);
        dispatch(HolidaySliceNew.actions.GetDeleteHolidayDetails(response.data));
    };
//
export const getGetHolidayDetails =
    (data: IGetHolidayDetailsBody): AppThunk => async (dispatch) => {//
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.GetHolidayDetails(data);
        dispatch(HolidaySliceNew.actions.getGetHolidayDetails(response.data));
    };

export const getGetHolidayList =//reducer madhe je name aste te ithe 

    (data: IGetHolidayListBody): AppThunk => async (dispatch) => {
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.GetHolidayList(data);
        dispatch(HolidaySliceNew.actions.getGetHolidayList(response.data));
    };
export const GetGetMonthwiseAttendance =//reducer madhe je name aste te ithe 

    (data: IGetMonthwiseAttendance): AppThunk => async (dispatch) => {
        dispatch(HolidaySliceNew.actions.getLoading(true));
        const response = await HolidayApi.GetMonthwiseAttendance(data);
        const getValue = (value, i) => {
            return value?.MonthwiseDays[i] != undefined ? value?.MonthwiseDays[i].Days : ''
          }
          const getHeader = (value, i) => {
            return value?.MonthwiseDays[i] != undefined ? value.MonthwiseDays[i].MonthName : ''
          }
          let a = response.data.StudentAttendanceDetailsList.map((item, i) => {
            return response.data.StudentAttendanceDetailsList[0].MonthwiseDays.length > 12 ? {
              Text1: item.Roll_No,
              Text2: item.StudentName,
              Text3: getValue(item, 0),
              Text4: getValue(item, 1),
              Text5: getValue(item, 2),
              Text6: getValue(item, 3),
              Text7: getValue(item, 4),
              Text8: getValue(item, 5),
              Text9: getValue(item, 6),
              Text10: getValue(item, 7),
              Text11: getValue(item, 8),
              Text12: getValue(item, 9),
              Text13: getValue(item, 10),
              Text14: getValue(item, 11),
              Text15: getValue(item, 12),
              Text16: item.PresentDays,
              Text17: item.TotalDays,
              Text18: item.Percentage
            } :
              {
                Text1: item.Roll_No,
                Text2: item.StudentName,
                Text3: getValue(item, 0),
                Text4: getValue(item, 1),
                Text5: getValue(item, 2),
                Text6: getValue(item, 3),
                Text7: getValue(item, 4),
                Text8: getValue(item, 5),
                Text9: getValue(item, 6),
                Text10: getValue(item, 7),
                Text11: getValue(item, 8),
                Text12: getValue(item, 9),
                Text13: getValue(item, 10),
                Text14: getValue(item, 11),
                Text15: item.PresentDays,
                Text16: item.TotalDays,
                Text17: item.Percentage
              }
          });
          const HeaderArray = [
            { Id: 1, scope: '', Header: 'Roll No.' },
            { Id: 2, Header: 'Student Name', align: 'left' },
            { Id: 3, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 0) },
            { Id: 4, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 1) },
            { Id: 5, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 2) },
            { Id: 6, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 3) },
            { Id: 7, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 4) },
            { Id: 8, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 5) },
            { Id: 9, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 6) },
            { Id: 10, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 7) },
            { Id: 10, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 8) },
            { Id: 10, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 9) },
            { Id: 11, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 10) },
            { Id: 12, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 11) }
          ];
          if (response.data.StudentAttendanceDetailsList[0].MonthwiseDays.length > 12)
            HeaderArray.push({ Id: 12, Header: getHeader(response.data.StudentAttendanceDetailsList[0], 12) })
          HeaderArray.push({ Id: 13, scope: 'row', Header: 'Present Days' })
          HeaderArray.push({ Id: 14, scope: 'row', Header: 'Total Days' })
          HeaderArray.push({ Id: 15, Header: '%' })
    
          //console.log(HeaderArray, "HeaderArray", a);
    
          dispatch(HolidaySliceNew.actions.GetGetMonthwiseAttendance(a));
          dispatch(HolidaySliceNew.actions.getHeaderArray(HeaderArray));
    
    };

    
export const GetschoolSettings =
(data: ISchoolSettings): AppThunk =>
  async (dispatch) => {
    dispatch(HolidaySliceNew.actions.getLoading(true));
    const response = await HolidayApi.GetSchoolSettings({ ...data, asSchoolId: Number(data.asSchoolId) });

    dispatch(
        HolidaySliceNew.actions.GetgetSchoolSettings(
        response.data.GetSchoolSettingsResult)
    );
  };

export default HolidaySliceNew.reducer;

































