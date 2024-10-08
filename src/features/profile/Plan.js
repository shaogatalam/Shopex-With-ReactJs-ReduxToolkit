import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  profile_plan: "",
  plan_Flag:0,
  status: null,
};

var initdata = "";

export const plan_ = createAsyncThunk("profile/plan", async (data) => {
  try {
    await axios.post("https://server.shopex.io/profile/plan.php", data, { withCredentials: true,})
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
});

export const Profile_plan_Slice = createSlice({
  name: "Profile_plan",
  initialState,
  reducers: {},


  extraReducers: (builder) => {
    
    builder
    .addCase(plan_.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(plan_.fulfilled, (state, action) => {
      state.status = "success";
      state.plan_Flag = Date.now();
      if (action.payload !== null && action.payload.plan) {
        state.profile_plan = action.payload.plan;
      }
    })

    .addCase(plan_.rejected, (state, action) => {
        state.status = "failed";
    })
  }



});
