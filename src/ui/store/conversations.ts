import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../model/conversation';

interface CounterState {
  data: Conversation[];
}

const initialState: CounterState = {
  data: [],
};

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setConversations } = conversationsSlice.actions;

export default conversationsSlice.reducer;
