import { createSlice } from '@reduxjs/toolkit';
import apiAbsentStudentPopup from 'src/api/APiAbsentStudentDetails/apiAbsentStudentPopup';
import { IGetAbsentStudentDetailsBody } from 'src/interfaces/AbsentStudentDetails/IAbsentStudentPopup';
import { AppThunk } from 'src/store';

const AbsentStudentDetailsslice = createSlice({
    name: 'AbsentStudentDetail',
    initialState: {
        getlistAbsentStudentDetails: [],
        getlistHalfdayStudentDetails: []
    },
    reducers: {
        listAbsentStudentDetails(state, action) {
            state.getlistAbsentStudentDetails = action.payload;
        },
        RgetlistAbsentStudentDetails(state) {
            state.getlistAbsentStudentDetails = [];
        },

        

        listHalfdayStudentDetails(state, action) {
            state.getlistHalfdayStudentDetails = action.payload;
        },
    }
});

export const AbsentStudentsandHalfday = (data: IGetAbsentStudentDetailsBody): AppThunk => async (dispatch) => {
    const response = await apiAbsentStudentPopup.GetAbsentStudentDetails(data);
    let AbsentStudentDetails = response.data.listAbsentStudentDetails.map((item, i) => {

        return {
            Id: item.User_Id,
            Text1: item.StudentName,
        };

    });

    let HalfdayStudentDetails = response.data.listHalfdayStudentDetails.map((item, i) => {

        return {
            Id: item.User_Id,
            Text1: item.StudentName,

        }
    })

    let Mobile_Number = response.data.listAbsentStudentDetails.map((item, i) => {

        return {
            Id: item.User_Id,
            Text1: item.Mobile_Number,
        };

    });
    dispatch(AbsentStudentDetailsslice.actions.listAbsentStudentDetails(AbsentStudentDetails));
    dispatch(AbsentStudentDetailsslice.actions.listHalfdayStudentDetails(HalfdayStudentDetails));


};


export const ResetgetlistAbsentStudentDetails = (): AppThunk => async (dispatch) => {
  dispatch(AbsentStudentDetailsslice.actions.RgetlistAbsentStudentDetails());
};

export default AbsentStudentDetailsslice.reducer;
