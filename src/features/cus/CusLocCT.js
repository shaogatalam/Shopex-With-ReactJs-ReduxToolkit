import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  billcity_cus: "",
  billcity_rev: "",
  shipcity_cus: "",
  shipcity_rev: "",
  label: "",
  shipstate_table: {},
  shipcity_table: {},
  billcity_table: {},
  billstate_table: {},
  get_cusLocCT_dataFlag : 0, 
  status: null,
};

var initdata = "";
export const get_cusLocCT_data = createAsyncThunk(
  "cus/LocCTdata",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/customers/cus_bill_ship_city.php",data,{ withCredentials: true })
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

export const CusLocChartTableSlice = createSlice({
  name: "cusLocChartTable",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(get_cusLocCT_data.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_cusLocCT_data.fulfilled, (state, action) => {
      state.status = "success";
      state.get_cusLocCT_dataFlag = Date.now(); 
      if (action.payload !== null) {
        
        if(action.payload.billcity_cusnum){
          var billcity_cus = action.payload.billcity_cusnum;
          var arr = [];
          var ind = 1;
          for (const property in billcity_cus) {
            var l = `${property}`;
            var d = `${billcity_cus[property]}`;
            var line_color =
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr.push({
              id:ind,
              hoverRadius:11,
              label: l,
              fill: false,
              spanGaps: false,
              borderWidth: 1.5,
              pointRadius: 5.5,
              pointHoverRadius: 11,
              borderColor: line_color,
              pointHitRadius: 10,
              pointStyle: "circle",
              lineTension: 0.5,
              pointBorderWidth: 4,
              pointBackgroundColor: "rgba(255,150,0,0.5)",
              pointRotation: 5,
              data: res,
            });

            ind++;
          }
          state.billcity_cus = arr;
        }

        if(action.payload.billcity_cusrev){
          var billcity_rev = action.payload.billcity_cusrev;
          var arr = [];
          for (const property in billcity_rev) {
            var l = `${property}`;
            var d = `${billcity_rev[property]}`;
            var line_color ="#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr.push({
              id:ind,
              hoverRadius:11,
              label: l,
              fill: false,
              spanGaps: false,
              borderWidth: 1.5,
              pointRadius: 5.5,
              pointHoverRadius: 11,
              borderColor: line_color,
              pointHitRadius: 10,
              pointStyle: "circle",
              lineTension: 0.5,
              pointBorderWidth: 4,
              pointBackgroundColor: "rgba(255,150,0,0.5)",
              pointRotation: 5,
              data: res,
            });
            ind++;
          }
          state.billcity_rev = arr;
        }

        if(action.payload.shipcity_cusnum){
          var shipcity_cus = action.payload.shipcity_cusnum;
          var arr = [];
          for (const property in shipcity_cus) {
            var l = `${property}`;
            var d = `${shipcity_cus[property]}`;
            var line_color ="#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr.push({
              id:ind,
              hoverRadius:11,
              label: l,
              fill: false,
              spanGaps: false,
              borderWidth: 1.5,
              pointRadius: 5.5,
              pointHoverRadius: 11,
              borderColor: line_color,
              pointHitRadius: 10,
              pointStyle: "circle",
              lineTension: 0.5,
              pointBorderWidth: 4,
              pointBackgroundColor: "rgba(255,150,0,0.5)",
              pointRotation: 5,
              data: res,
            });
            ind++;
          }
          state.shipcity_cus = arr;
        }

        if(action.payload.shipcity_cusrev){
          var shipcity_rev = action.payload.shipcity_cusrev;
          var arr = [];
          for (const property in shipcity_rev) {
            var l = `${property}`;
            var d = `${shipcity_rev[property]}`;
            var line_color ="#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr.push({
              id:ind,
              hoverRadius:11,
              label: l,
              fill: false,
              spanGaps: false,
              borderWidth: 1.5,
              pointRadius: 5.5,
              pointHoverRadius: 11,
              borderColor: line_color,
              pointHitRadius: 10,
              pointStyle: "circle",
              lineTension: 0.5,
              pointBorderWidth: 4,
              pointBackgroundColor: "rgba(255,150,0,0.5)",
              pointRotation: 5,
              data: res,
            });
            ind++;
            
          }
          state.shipcity_rev = arr;
        }

        if(action.payload.label) { state.label = action.payload.label.replace(/\"/g, "").split(",");}

        //// Tables ////
        if(action.payload.label) {state.shipstate_table = action.payload.ss_table_rt;}
        if(action.payload.label) {state.shipcity_table = action.payload.stable_rt;}
        if(action.payload.label) {state.billstate_table = action.payload.bs_table_rt;}
        if(action.payload.label) {state.billcity_table = action.payload.btable_rt;}
      }
    })

    .addCase(get_cusLocCT_data.rejected, (state, action) => {
        state.status = "failed";
    })

  },


});
