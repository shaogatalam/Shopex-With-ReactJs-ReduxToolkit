import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {

  total_label: "",

  total_data: "",

  total_s_note: "",

  f_r_label: "",

  ftime_data: "",

  f_s_note: "",

  ret_data: "",

  r_s_note: "",

  get_trf_dataFlag : 0,

  status: null,

};

var initdata = "";
export const get_trf_data = createAsyncThunk("cus/trfdata", async (data) => {
  try {
    await axios.post("https://server.shopex.io/customers/customer_new_repeat_total_charts.php",data,{ withCredentials: true })
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


export const TRFSlice = createSlice({
  
  name: "cusTRF",
  
  initialState,
  
  reducers: {},
  
  extraReducers: (builder) => {
    
    builder
    .addCase(get_trf_data.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_trf_data.fulfilled, (state, action) => {
      
      state.status = "success";
      state.get_trf_dataFlag = Date.now(); 
      if (action.payload !== null) {

        if(action.payload.total_label)  { state.total_label = action.payload.total_label;}
        if(action.payload.total_data)   { state.total_data = action.payload.total_data;}
        if(action.payload.tn)           { state.total_s_note = action.payload.tn;}

        if(action.payload.ftime_label)  { state.f_r_label = action.payload.ftime_label;}

        if(action.payload.ftime_data)   { state.ftime_data = action.payload.ftime_data;}
        if(action.payload.fn)           { state.f_s_note = action.payload.fn;}

        if(action.payload.returning_data) { state.ret_data = action.payload.returning_data;}
        if(action.payload.rn) { state.r_s_note = action.payload.rn;}
        
       
      }
    
    })

    .addCase(get_trf_data.rejected, (state, action) => {
        state.status = "failed";
    })

  },


});
