import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  profile_shops: {},
  shops_Flag:0,
  status: null,
  
};

var initdata = "";

export const shops_ = createAsyncThunk("profile/shops", async (data) => {
  try {
    await axios.post("https://server.shopex.io/profile/shops.php", data, {withCredentials: true,})
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

export const Profile_shops_Slice = createSlice({
  name: "Profile_shops",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    
    builder
    .addCase(shops_.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(shops_.fulfilled, (state, action) => {
      state.status = "success";
      state.shops_Flag = Date.now();
      if (action.payload !== null && action.payload.shops) {
        state.profile_shops = action.payload.shops;
      }
    })

    .addCase(shops_.rejected, (state, action) => {
        state.status = "failed";
    })
  }


});
