import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  segment_join_drop_chart_object:"",
  get_segment_join_drop_chart_objectFlag : 0,
  status: null,
};

var initdata = "";
export var get_segment_join_drop_chart_object = createAsyncThunk(
  "cus/Segment_join_drop_chart",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/segment_report.php",data,{ withCredentials: true })
      .then(
        (response) => {
          initdata = response.data;
        },
        (error) => {}
      );
      return initdata;
    } catch (err) {
      return err;
    }
  }
);


export var CustomerSegmentReportSlice = createSlice({
  
    name: "CustomerSegmentReport",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
      builder
      .addCase(get_segment_join_drop_chart_object.pending, (state, action) => {
          state.status = "loading";
      })

      .addCase(get_segment_join_drop_chart_object.fulfilled, (state, action) => {
          state.status = "success";
          state.get_segment_join_drop_chart_objectFlag = Date.now(); 
          if(action.payload.segment_report) {state.segment_join_drop_chart_object = action.payload.segment_report;}
      })

      .addCase(get_segment_join_drop_chart_object.rejected, (state, action) => {
          state.status = "failed";
      })

    },

});
