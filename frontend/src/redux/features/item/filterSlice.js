import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredItems: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_ITEMS(state, action) {
      const { items, search } = action.payload;
      const tempItems = items.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredItems = tempItems;
    },
  },
});

export const { FILTER_ITEMS } = filterSlice.actions;

export const selectFilteredItems = (state) => state.filter.filteredItems;

export default filterSlice.reducer;