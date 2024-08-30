import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    autogas_store: [
        {
            id: 'ID',
            item: 'Item',
            price: 'Price',
            description: 'Description',
            manufacturer: 'Manufacturer',
            quantity: 'Quantity',
        },
        {
            id: 1,
            item: 'CNG Kit',
            price: 2000,
            description: 'This is a complete kit for conversion',
            manufacturer: 'Mijo',
            quantity: 10,
        },
        {
            id: 2,
            item: 'CNG Tank',
            price: 500,
            description: 'This is a 10 gallon tank',
            manufacturer: 'Mijo',
            quantity: 10,
        },
        {
            id: 3,
            item: 'CNG Hose',
            price: 50,
            description: 'This is a 10 foot hose',
            manufacturer: 'Mijo',
            quantity: 10,
        },
        {
            id: 4,
            item: 'CNG Regulator',
            price: 100,
            description: 'This is a 10 psi regulator',
            manufacturer: 'Mijo',
            quantity: 10,
        },
        {
            id: 5,
            item: 'CNG Filter',
            price: 50,
            description: 'This is a 10 micron filter',
            manufacturer: 'Mijo',
            quantity: 10,
        },
        {
            id: 6,
            item: 'CNG Injector',
            price: 100,
            description: 'This is a 10 psi injector',
            manufacturer: 'Mijo',
            quantity: 10,
        },
        {
            id: 7,
            item: 'CNG ECU',
            price: 200,
            description: 'This is a 10 psi ECU',
            manufacturer: 'Mijo',
            quantity: 10,
        }
    ],
    requestList: []
}

const itemsSlice = createSlice({
    name: 'itmesSlice',
    initialState,
    reducers: {
        addRequest(state, action) {
            state.requestList.push(action.payload);
        },
        approveRequest(state, action) {            
            state.autogas_store[state.requestList[action.payload].itemID].quantity -= state.requestList[action.payload].numberRequired;
        }

    }
});

export const {addRequest, approveRequest} = itemsSlice.actions;
export default itemsSlice.reducer;