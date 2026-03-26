import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    coffeeListData: []
};

// console.log(initialState);
const coffeeListSlice = createSlice({
    name: 'coffeeList',
    initialState,
    reducers: {
        addCoffee: (state, action) => {
            console.log(action.payload)
            const findDuplicate = state.coffeeListData.find((e) => e.id === action.payload.id);
            if (findDuplicate === undefined) {
                state.coffeeListData.push(action.payload);
            }
            console.log(current(state));
        },
        deleteCoffee: (state, action) => {
            // console.log(current(state));
            const idToDelete = action.payload.id;
            state.coffeeListData = state.coffeeListData.filter((item) => item.id !== idToDelete);
        },
        updateCoffeeQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const coffeeItem = state.coffeeListData.find((item) => item.id === id);
            if (coffeeItem) {
                coffeeItem.quantity = quantity;
            }
        },
        clearCart: (state) => {
            state.coffeeListData = [];
        }
    }
});

export const { addCoffee, deleteCoffee, updateCoffeeQuantity, clearCart } = coffeeListSlice.actions;
export default coffeeListSlice.reducer;
