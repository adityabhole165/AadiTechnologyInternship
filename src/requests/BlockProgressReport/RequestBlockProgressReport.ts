import { createSlice } from "@reduxjs/toolkit";
import ApiBlockProgressReport from "src/api/BlockProgressReport/ApiBlockProgressReport";
import { IAllClassTeachersBody, IBlockUnBlockStudentsBody, IBlockUnBlockUpdateBtnBody } from "src/interfaces/BlockProgressReport/IBlockProgressReport";
import { AppThunk } from "src/store";

const BlockUnBlockStudents = createSlice({
    name: 'BlockUnblock',
    initialState: {

        IsStudentsName: [],
        IsStudentsName1: [],
        IsStudentsCount: [],
        IsClassTeachers: [],
        IsBlockUnblockUpdatebtn: '',

        Loading: true
    },

    reducers: {

        RlistStudentsName(state, action) {
            state.IsStudentsName = action.payload;
            state.Loading = false;
        },
        RlistStudentsName1(state, action) {
            state.IsStudentsName1 = action.payload;
            state.Loading = false;
        },
        RlistStudentsCount(state, action) {
            state.Loading = false;
            state.IsStudentsCount = action.payload;
            state.Loading = false;
        },
        RAllClassTeachers(state, action) {
            state.Loading = false;
            state.IsClassTeachers = action.payload;
        },
        RBlockUnblockUpdateBtn(state, action) {
            state.Loading = false;
            state.IsBlockUnblockUpdatebtn = action.payload;
        },

        getLoading(state, action) {
            state.Loading = true;
        }

    }
})

export const CDABlockUnblocklist =
    (data: IBlockUnBlockStudentsBody, radioValue): AppThunk =>
        async (dispatch) => {
            const response = await ApiBlockProgressReport.BlockUnBlockStudents(data);
            let getStudentName = response.data.listStudentsName.map((item, i) => {
                return {
                    RegNo: item.RegNo,
                    Id: item.YearwiseStudentId,
                    RollNo: item.RollNo,
                    Name: item.StudentName,
                    Reason: item.Reason,
                    RowNo: item.RowNo,
                    Value: item.YearwiseStudentId
                }
            });
            let getStudentCount = response.data.listStudentsCount.map((item, i) => {
                return {
                    Count: item.Count
                }
            });
            if (radioValue === '1') {
                dispatch(BlockUnBlockStudents.actions.RlistStudentsName(getStudentName));
            } else if (radioValue === '0') {
                dispatch(BlockUnBlockStudents.actions.RlistStudentsName1(getStudentName)); // Need to Rename
            }
            dispatch(BlockUnBlockStudents.actions.RlistStudentsCount(getStudentCount));
        };

export const CDAClassTeachers =
    (data: IAllClassTeachersBody): AppThunk =>
        async (dispatch) => {
            dispatch(BlockUnBlockStudents.actions.getLoading(true));
            const response = await ApiBlockProgressReport.AllClassTeachers(data);
            const responseData = response.data.map((item, i) => {
                return {
                    Name: item.TeacherName,
                    Id: item.Teacher_Id,
                    Value: item.Teacher_Id,
                    // Teacher_First_Name: item.Teacher_First_Name,
                    // Standard_Name: item.Standard_Name,
                    // Division_Name: item.Division_Name,
                    // Original_Standard_Id: item.Original_Standard_Id,
                    // Original_Division_Id: item.Original_Division_Id,
                    // SchoolWise_Standard_Division_Id: item.SchoolWise_Standard_Division_Id
                }
            })
            dispatch(BlockUnBlockStudents.actions.RAllClassTeachers(responseData));
        };

export const CDABlockUnblockUpdatebtn =
    (data: IBlockUnBlockUpdateBtnBody): AppThunk =>
        async (dispatch) => {
            const response = await ApiBlockProgressReport.BlockUnblockUpdateBtn(data);
            dispatch(BlockUnBlockStudents.actions.RBlockUnblockUpdateBtn(response.data));
        };

export default BlockUnBlockStudents.reducer;