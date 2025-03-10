import { createSlice } from "@reduxjs/toolkit";import GetAllMonthwiseAttendanceApi from "src/api/HolidayNew/APIMonthwise";
import { MonthwiseAttendanceIBody } from "src/interfaces/HolidayNew/IHolidays";
import { AppThunk } from "src/store";

const GetMonthwiseAttendanceDataSlice = createSlice({
    name: 'MonthWiseAttendanceData',
    initialState: {
        GetMonthwiseAttendanceList: [],
        HeaderArrayList: []
    },
    reducers: {
        getAllMonthwiseAttendance(state, action) {
            state.GetMonthwiseAttendanceList = action.payload;
        },
        getHeaderArrayList(state, action) {
            state.HeaderArrayList = action.payload;
        }
    }
});
export const getMonthwiseAttendance =
    (data: MonthwiseAttendanceIBody): AppThunk =>
        async (dispatch) => {
            const response = await GetAllMonthwiseAttendanceApi.ListsMonthwiseAttendance(data);
            const getValue = (value, i) => {
                return value.MonthwiseDays[i].Days
            }
            const getHeader = (value, i) => {
                return value.MonthwiseDays[i].MonthName;
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
                { Id: 1, scope: '', Header: 'Roll No' },
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

            dispatch(GetMonthwiseAttendanceDataSlice.actions.getAllMonthwiseAttendance(a));
            dispatch(GetMonthwiseAttendanceDataSlice.actions.getHeaderArrayList(HeaderArray));

        };
export default GetMonthwiseAttendanceDataSlice.reducer;
