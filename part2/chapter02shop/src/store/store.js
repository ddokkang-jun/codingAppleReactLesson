import { configureStore, createSlice } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.js";
import watchReducer from './watchSlice.js';

let user = createSlice({
  name: "user",
  initialState: "kim",
  reducers: {
    changeName(state) {
      return "john" + state;
    },
  },
});

export let { changeName } = user.actions;

let secondUser = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    changeSecondName(state) {
      // return { name: "park", age: 21 };
      state.name = "park";
      // 줄여쓴 코드
    },
    changeAge(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeSecondName, changeAge } = secondUser.actions;

let products = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    increaseProductCount(state, action) {
      state.find((item) => item.id === action.payload).count++;
    },
    decreaseProductCount(state, action) {
      state.find((item) => item.id === action.payload).count--;
    },
    addList(state, action) {
      state.push(action.payload);
    },
    deleteList(state, action) {
      let num = state.findIndex((item) => item.id === action.payload);
      state.splice(num, 1);
    },
  },
});

export let { increaseProductCount, decreaseProductCount, addList, deleteList } =
  products.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    secondUser: secondUser.reducer,
    products: products.reducer,
    counterSlice: counterReducer,
    watchSlice: watchReducer,
  },
});
