import {createSlice} from '@reduxjs/toolkit';
import { addToNewsLetter } from '../utils/thunk';



export const UserSlice=createSlice({
  name:'users',
  initialState:{
    actions:{}
  },
  reducers:{
    clearNewsLetter:(state)=>{
      state.actions={};
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(addToNewsLetter.fulfilled,(state,action)=>{
      state.actions=action.payload
    })
  }
})

export const {clearNewsLetter} = UserSlice.actions
export default UserSlice.reducer;
