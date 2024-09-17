import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error:null,
  loading:false
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    signinStart : (state)=>{
      state.loading = true;
      state.error = null;
    },
    signinSuccess : (state,action)=>{
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },
    signinFailure : (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    },
    updateStart : (state)=>{
      state.loading = true;
      state.error = null;
    },
    updateSuccess : (state,action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFail : (state,action)=>{
      state.loading = false;
      state.error = action.payload
    },
    updateStartAgain : (state)=>{
      state.loading = false;
      state.error = null;
    },
    refresh : (state)=>{
      state.error = null;
    },
    deleteStart : (state)=>{
      state.loading = true;
      state.error = null;
    },
    deleteSuccess : (state)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFail : (state,action) =>{
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const {signinStart, signinSuccess, signinFailure,updateStart,updateSuccess,updateFail,updateStartAgain,refresh,deleteStart,deleteSuccess,deleteFail } = userSlice.actions;
export default userSlice.reducer;