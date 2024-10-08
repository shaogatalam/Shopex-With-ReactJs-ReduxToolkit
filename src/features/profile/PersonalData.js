import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  personal_data: {},
  demo : 0,
  status : null,
  personaldata_Flag:0,
  account_type :"",
};

var initdata = "";

export const personaldata_ = createAsyncThunk(
  "profile/personal_data",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/profile/personal_data.php", data, {withCredentials: true,})
      .then(
        (response) => {
          initdata = response.data;
          //console.log(initdata);
        },
        (error) => {}
      );
      return initdata;
    } catch (err) {
      return err;
    }
  }
);

export var Profile_personal_data_Slice = createSlice({
 
  name: "Profile_personal_data",

  initialState,

  reducers: {
    demo: (state, action) => {
      state.demo = 1;
    },
  },

  extraReducers: (builder) => {
    
    builder
    .addCase(personaldata_.pending, (state, action) => {
        state.status = "loading";
        state.demo = 0;
    })

    .addCase(personaldata_.fulfilled, (state, action) => {
      state.status = "success";
      state.personaldata_Flag = Date.now();
      if (action.payload !== null && action.payload.personal_data) {
        state.personal_data = action.payload.personal_data;
        state.demo = 0;
      }
    })

    .addCase(personaldata_.rejected, (state, action) => {
        state.status = "failed";
        state.demo = 0;
    })
  }



});

export const { demo } = Profile_personal_data_Slice.actions;

