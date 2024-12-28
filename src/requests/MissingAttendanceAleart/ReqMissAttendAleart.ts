import { createSlice } from '@reduxjs/toolkit';
import Missingattendance from 'src/api/MissAttendaceAleart/ApiMissAttendanceAleart';
import {
    IMissingattendancealeartDateBody,
    IMissingattendancealeartNameBody
} from 'src/interfaces/MissAttendaceAleart/IMissingAttendaceAleart';
import { AppThunk } from 'src/store';


const MissingattendanceAleartSlice = createSlice({
    name: 'Missingatendancealeart',

    initialState: {
        MissingattendName: [],
        Missingattenddate: [],
        Loading: true
    },
    reducers: {
        MissingAttenace(state, action) {
            state.MissingattendName = action.payload;
        },
        MissingAttenaceDate(state, action) {
            state.Missingattenddate = action.payload;
        },
        setLoading(state, action) {
            state.Loading = action.payload;
        }
    }
});


export const MissingAttenNameAleart =
    (data: IMissingattendancealeartNameBody): AppThunk =>
        async (dispatch) => {
            const response = await Missingattendance.MissingNameList(data);
            //  console.log(response.data, "respons");

            let MissingAttendancelist = response.data.MissingAttendanceDetailsList.map((item, i) => {
                return {
                    Id: item.ClassName,
                    Name: item.ClassTeacherName,
                    Value: item.MissingDays,
                    StandardDivisionId: item.StandardDivisionId


                };
            });
            dispatch(MissingattendanceAleartSlice.actions.MissingAttenace(MissingAttendancelist));
            //  console.log(MissingAttendancelist, 'StudentListnamealll');

        }

export const MissingAttenDateAleart =
    (data: IMissingattendancealeartDateBody): AppThunk =>
        async (dispatch) => {

            const response = await Missingattendance.MissingDateList(data);
            //  console.log(response.data, "respon");

            let MissingDate = response.data.MissingAttendanceDatesList.map((item, i) => {
                return {
                    Id: item.MissingAttendanceDates,
                    Name: item.MissingAttendanceDates,
                    Value: item.MissingAttendanceDates,
                };
            });

            dispatch(MissingattendanceAleartSlice.actions.MissingAttenaceDate(MissingDate));
            //console.log(MissingDate, 'StudentListnamealll');
        };
export default MissingattendanceAleartSlice.reducer;
