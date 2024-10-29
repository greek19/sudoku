import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  difficulty: 'Facile', 
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
  },
});

export const { setDifficulty } = gameSlice.actions;
export default gameSlice.reducer;
