import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {

  corp_chart: {
    cus_l: "",
    cus_d: "",
    or_l: "",
    or_d: "",

    rev_l: "",
    rev_d: "",

    prof_l: "",
    prof_d: "",

    cus_note: "",
    rev_note: "",
    order_note: "",
    profit_note: "",
  },

  rsale: {
    rsd: "",
    tpbu: "",
    tpbr: "",
    tpbp: "",
    tcbu: "",
    tcbr: "",
    tcbp: "",
  },
  
  get_init_dataFlag :0,
  get_recent_salesFlag:0,
  status: null,
};

var initdata = "";
export var get_init_data = createAsyncThunk("dash/initdata", async (data) => {
  try {
    await axios.post("https://server.shopex.io/dashboard/dash_charts_table.php", data, {withCredentials: true,})
      .then((response) => {
          initdata = response.data;
        },
        (error) => {}
      );

    return initdata;
  } catch (err) {
      return err;
  }
});

var rsdata = "";
export var get_recent_sales = createAsyncThunk("dash_rs/initdata", async (data) => {
    try {
      await axios.post("https://server.shopex.io/dashboard/dash_recent_sales.php", data,{ withCredentials: true } )
      .then(
        (response) => {
          rsdata = response.data;
          //console.log(response.data);
        },
        (error) => {}
      );
      return rsdata;
    } catch (err) {
      return err;
    }
  }
);


export var dashSlice = createSlice({
  
  name: "dash",
  
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    
    builder
    .addCase(get_recent_sales.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_recent_sales.fulfilled, (state, action) => {
      state.status = "success";
      state.get_recent_salesFlag = Date.now(); 
      if(action.payload.recent_sales)state.rsale.rsd = action.payload.recent_sales;
    })

    .addCase(get_recent_sales.rejected, (state, action) => {
        state.status = "failed";
    })



    .addCase(get_init_data.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_init_data.fulfilled, (state, action) => {
      state.status = "success";
      state.get_init_dataFlag = Date.now(); 
      if (action.payload !== null) {
        
        if(action.payload.rev_data)         state.corp_chart.rev_d      = action.payload.rev_data;
        if(action.payload.profit_data)      state.corp_chart.prof_d     = action.payload.profit_data;
        if(action.payload.cus_data)         state.corp_chart.cus_d      = action.payload.cus_data;
        if(action.payload.order_cus_label)  state.corp_chart.or_l       = action.payload.order_cus_label;
        if(action.payload.order_data)       state.corp_chart.or_d       = action.payload.order_data;
       
        if(action.payload.cus_note)         state.corp_chart.cus_note    = action.payload.cus_note;
        if(action.payload.rev_note)         state.corp_chart.rev_note    = action.payload.rev_note;
        if(action.payload.onote)            state.corp_chart.order_note  = action.payload.onote;
        if(action.payload.profit_note)      state.corp_chart.profit_note = action.payload.profit_note;
      }
    })

    .addCase(get_init_data.rejected, (state, action) => {
        state.status = "failed";
    })
  
  }



});
