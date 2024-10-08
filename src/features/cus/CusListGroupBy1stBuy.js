import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  cuslist_groupBy1stBuy: {},
  get_cus_groupBy1stMonthListFlag:0,
  status: null,
};

var initdata = "";
export const get_cus_groupBy1stMonthList = createAsyncThunk(
  "cus/gbfbdata",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/customers/cusList_groupBy1stBuyMonth.php",data,{ withCredentials: true })
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

export const GBy1stBuyMonthSlice = createSlice({
  
  name: "cusGroupBy1stMonth",
  
  initialState,
  
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(get_cus_groupBy1stMonthList.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_cus_groupBy1stMonthList.fulfilled, (state, action) => {
      state.status = "success";
      state.get_cus_groupBy1stMonthListFlag = Date.now(); 
      if (action.payload !== null && action.payload.cuslist_groupBy1stBuy) {
        state.cuslist_groupBy1stBuy = action.payload.cuslist_groupBy1stBuy;
      }
    })

    .addCase(get_cus_groupBy1stMonthList.rejected, (state, action) => {
        state.status = "failed";
    })

  },

});
