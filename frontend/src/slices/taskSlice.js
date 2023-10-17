import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        data: {},
        selectedCountry: '',
        selectedState: '',
        selectedDistrict: ''
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload;
            state.selectedState = '';
            state.selectedDistrict = '';
        },
        setSelectedState: (state, action) => {
            state.selectedState = action.payload;
            state.selectedDistrict = '';
        },
        setSelectedDistrict: (state, action) => {
            state.selectedDistrict = action.payload;
        }
    }
});

export const { setData, setSelectedCountry, setSelectedState, setSelectedDistrict } = taskSlice.actions;

export default taskSlice.reducer;
