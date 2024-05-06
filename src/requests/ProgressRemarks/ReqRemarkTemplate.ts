import { createSlice } from "@reduxjs/toolkit";
import ApiRemarkTemplate from "src/api/ProgressRemarks/ApiRemarkTemplate";
import { IGetAllGradesForStandardBody, IGetRemarkTemplateDetailsBody, IGetRemarksCategory } from "src/interfaces/ProgressRemarks/IRemarkTemplate";
import { AppThunk } from "src/store";

const RemarkTemplateSlice = createSlice({
    name: 'RemarkTemplate',
    initialState: {
        GetRemarkCategory: [],
        GetGrades: [],
        GetRemarkTemplateDetails: []
    },
    reducers: {
        RGetRemarkCategory(state, action) {
            state.GetRemarkCategory = action.payload
        },

        RGetGrades(state, action) {
            state.GetGrades = action.payload
        },
        RGetRemarkTemplateDetails(state, action) {
            state.GetRemarkTemplateDetails = action.payload
        }
    }
});

export const CDAGetRemarkCategory =
    (data: IGetRemarksCategory): AppThunk =>
        async (dispatch) => {
            const response = await ApiRemarkTemplate.ReamrksCategory(data);
            let ReamrkCategory = response.data.map((item, i) => {
                return {
                    Id: item.Id,
                    Name: item.Name,
                    Value: item.SortOrder
                };
            });
            dispatch(RemarkTemplateSlice.actions.RGetRemarkCategory(ReamrkCategory))
        };

export const CDAGetGrades =
    (data: IGetAllGradesForStandardBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiRemarkTemplate.Grades(data);
            let AllGrades = response.data.map((item, i) => {
                return {
                    Id: item.Marks_Grades_Configuration_Detail_ID,
                    Name: item.Grade_Name,
                    Value: item.Marks_Grades_Configuration_Detail_ID

                };
            });
            dispatch(RemarkTemplateSlice.actions.RGetGrades(AllGrades))
        };

export const CDAGetRemarkTemplateDetails =
    (data: IGetRemarkTemplateDetailsBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiRemarkTemplate.ReamrkTemplateDetails(data);
            dispatch(RemarkTemplateSlice.actions.RGetRemarkTemplateDetails(response.data))
        };


export default RemarkTemplateSlice.reducer