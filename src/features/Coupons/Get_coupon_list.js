import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  Allcoupon: {},
  shopifyDiscountCodes : {},
  status: null,
};
//server.shopex.io/coupon/coupons.php
var initdata = "";
export const get_all_coupons = createAsyncThunk(
  "coupon/AllcouponList",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/coupon/coupons.php", data, {withCredentials: true,})
        .then(
          (response) => { initdata = response.data; },
          (error) => {}
        );
      return initdata;
    } catch (err) {
      return err;
    }
  }
);

export const coupon_Slice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},

  // extraReducers: {
  //   [get_all_coupons.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [get_all_coupons.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.Allcoupon = action.payload.Allcoupon;
  //   },
  //   [get_all_coupons.rejected]: (state, action) => {
  //     state.status = "failed";
  //   },
  // },

  extraReducers: (builder) => {
    builder
    .addCase(get_all_coupons.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_all_coupons.fulfilled, (state, action) => {
      state.status = "success";
      state.Allcoupon = action.payload.Allcoupon;
      state.shopifyDiscountCodes = action.shopifyDiscountCodes;
    })

    .addCase(get_all_coupons.rejected, (state, action) => {
        state.status = "failed";
    })
  
  }


});
