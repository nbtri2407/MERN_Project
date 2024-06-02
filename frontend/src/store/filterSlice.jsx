import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: [],
  category: [],
  length: [],
  handleLength: [],
  balancePoint: [],
  formatPlay: [],
  level: [],
  stiffness: [],
  stylePlay: [],
  swingweight: [],
  weight: [],
  search: "",
  limit: 24,
  page: 1,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filterName, value } = action.payload;
      if (filterName === "search") {
        state[filterName] = value;
      } else {
        const isArray = Array.isArray(state[filterName]);
        if (!isArray) {
          console.error(`Expected ${filterName} to be an array`);
          return state;
        }
        const isPresent = state[filterName].includes(value);
        state[filterName] = isPresent
          ? state[filterName].filter((v) => v !== value)
          : [...state[filterName], value];
      }
    },
    clearFilters: () => {
      return { ...initialState };
    },
  },
});
export const { setFilter } = filterSlice.actions;
export const { clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
