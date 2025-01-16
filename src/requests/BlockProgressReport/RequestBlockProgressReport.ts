import { createSlice } from "@reduxjs/toolkit";
import ApiBlockProgressReport from "src/api/BlockProgressReport/ApiBlockProgressReport";
import { IAllClassTeachersBody, IBlockUnBlockStudentsBody, IBlockUnBlockUpdateBtnBody } from "src/interfaces/BlockProgressReport/IBlockProgressReport";
import { AppThunk } from "src/store";

const BlockUnBlockStudents = createSlice({
    name: 'BlockUnblock',
    initialState: {
        IsClassTeachers: [],
        ISStudentList: [],
        ISBlockedStudentsList: [],
        ISUnblockedStudentsList: [],
        IsStudentsCount: [],
        IsBlockUnblockUpdatebtn: '',

        Loading: true,
    },

    reducers: {
        RStudentsList(state, action) {
            state.ISStudentList = action.payload;
            state.Loading = false;
        },
        RBlockedStudentsList(state, action) {
            state.ISBlockedStudentsList = action.payload;
            state.Loading = false;
        },
        RUnblockedStudentsList(state, action) {
            state.ISUnblockedStudentsList = action.payload;
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

export const CDABlockUnblockStudentslist =
    (data: IBlockUnBlockStudentsBody, radioValue, selectedTeacher): AppThunk =>
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
            // Create student list with "All" option
            // Default "All" option
            const allOption = {
                RegNo: "",
                Id: "0",
                RollNo: "",
                Name: "--All--",
                Reason: "",
                RowNo: 0,
                Value: "0"
            };

            //student list based on selectedTeacher condition
            let studentListWithAll = selectedTeacher
                ? [allOption, ...getStudentName]
                : [allOption];

            let getStudentCount = response.data.listStudentsCount.map((item, i) => {
                return {
                    Count: item.Count
                }
            });

            //console.log("studentListWithAll", studentListWithAll);

            dispatch(BlockUnBlockStudents.actions.RStudentsList(studentListWithAll));
            if (radioValue === 'showBlocked') {
                console.log("radioValue", radioValue);
                dispatch(BlockUnBlockStudents.actions.RBlockedStudentsList(getStudentName));
            } else if (radioValue === 'showUnblocked') {
                console.log("radioValue", radioValue);
                dispatch(BlockUnBlockStudents.actions.RUnblockedStudentsList(getStudentName)); // Need to Rename
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
                    SchoolWise_Standard_Division_Id: item.SchoolWise_Standard_Division_Id
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