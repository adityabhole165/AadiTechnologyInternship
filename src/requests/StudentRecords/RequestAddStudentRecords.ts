import { createSlice } from '@reduxjs/toolkit';
import GetStudentRecordDataAPI from 'src/api/StudentRecords/ApiAddStudentRecords';
import { IGetStudentRecordDataBody } from 'src/interfaces/StudentRecords/IAddStudentRecords';
import { AppThunk } from 'src/store';

const AddStudentRecordsSlice = createSlice({
    name: 'AddStudentRecords',
    initialState: {
        listGeneralDetails: [],
        listSiblingsDetails: [],
        listFamilyDetails: []
    },
    reducers: {
        GeneralDetails(state, action) {
            state.listGeneralDetails = action.payload;
        },
        SiblingsDetails(state, action) {
            state.listSiblingsDetails = action.payload;
        },
        FamilyDetails(state, action) {
            state.listFamilyDetails = action.payload;
        },

    }
});
export const GetStudentRecordData =
    (data: IGetStudentRecordDataBody): AppThunk =>
        async (dispatch) => {
            const response = await GetStudentRecordDataAPI.GetStudentRecordDataApi(data);
            let abc = []
            response.data.listGeneralDetails.map((item, i) => {
                abc.push({

                    Text1: item.StudentName,
                    Text2: item.DOB,
                    Text3: item.MotherName,
                    Text4: item.FatherName,
                    Text5: item.FatherOccupation,
                    Text6: item.MotherOccupation
                });
            });
            dispatch(AddStudentRecordsSlice.actions.GeneralDetails(abc));
            console.log(abc)

            let siblingsdetails = [];
            response.data.listSiblingsDetails.map((item, i) => {
                siblingsdetails.push({

                    Text1: item.SiblingName,
                    Text2: item.Sex,
                    Text3: item.Age,
                    Text4: item.Standard
                });
            });
            dispatch(AddStudentRecordsSlice.actions.SiblingsDetails(siblingsdetails));
            console.log(siblingsdetails)
        }
export default AddStudentRecordsSlice.reducer;
