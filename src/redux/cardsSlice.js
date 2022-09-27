import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("Card/getUser", async () => {
	return fetch("https://randomuser.me/api/").then((res) => res.json());
});

const cardSlice = createSlice({
	name: "user",
	initialState: {
		user: "",
		cards: [
			{
				type: "Mastercard",
				code: "1234 5678 9101 1123",
				valid: "12/22",
				ccv: "001",
				id: 0,
			},
		],
		activeId: 0,
		lastId: 0,
	},
	reducers: {
		activate: (state, { payload }) => {
			state.activeId = payload.id;
		},
		remove: (state, { payload }) => {
			state.cards = state.cards.filter((card) => card.id !== payload.id);
		},
		add: (state, { payload }) => {
			state.cards.push(payload);
			state.lastId += 1;
		},
	},

	extraReducers: {
		[getUser.fulfilled]: (state, { payload }) => {
	
			if(state.user === ""){
				state.user =
				payload.results[0].name.first +
				" " +
				payload.results[0].name.last;
			}
			
		},
		[getUser.pending]: (state, action) => {
			state.status = "Loading data...";
		},
		[getUser.rejected]: (state, action) => {
			state.status = "Failed to get data";
		},
	},
});

export const { activate, remove, add } = cardSlice.actions;
export default cardSlice.reducer;
