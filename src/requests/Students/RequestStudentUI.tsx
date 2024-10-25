import { createSlice } from '@reduxjs/toolkit';

const StudentUISlice = createSlice({
    name: 'StudentUI',

    initialState: {
        Loading: true
    },
    reducers: {
        getLoading(state, action) {
            state.Loading = true;
        },
    }
});



export default StudentUISlice.reducer;