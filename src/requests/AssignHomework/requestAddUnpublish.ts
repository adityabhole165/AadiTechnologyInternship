import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "src/store";
import ApiAddUnpublish from "src/api/AssignHomework/ApiAddUnpublish";
import {IPublishUnPublishHomeworkBody , } from "src/interfaces/AssignHomework/IAddUnpublish";
import { getDateMonthYearFormatted } from "src/components/Common/Util";

const AddUnpublishSlice = createSlice({
    name: 'UnpublishAdd',
    initialState: {
        
        PublishUnPublishHomework: "",
            },

    reducers: {
      
        getPublishunpublish(state, action) {
            state.PublishUnPublishHomework = action.payload;
        },
       
        
    }
});

    
        export const GetPublishUnpublishHomework =
        (data: IPublishUnPublishHomeworkBody): AppThunk =>
            async (dispatch) => {
                const response = await ApiAddUnpublish.PublishUnpublish(data);
                dispatch(AddUnpublishSlice.actions.getPublishunpublish(response.data))
            }

           


        export default AddUnpublishSlice.reducer