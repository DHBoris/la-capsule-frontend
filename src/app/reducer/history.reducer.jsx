import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    historyListData: []
};

const historySlice = createSlice({
    name: 'historyList',
    initialState,
    reducers: {
        addHistory: (state, action) => {
            const findDuplicate = state.historyListData.find((e) => e.id === action.payload.id);
            if (findDuplicate === undefined) {
                state.coffeeListData.push(action.payload);
            }
            console.log(current(state));
        }
    }
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
