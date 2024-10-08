import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { REHYDRATE } from "redux-persist";

var initialState = {
  cus_table: "",
  rev_table: "",
  order_table: "",
  cus_chart: "",
  order_chart: "",
  rev_chart: "",
  label: "",
  scity: "",
  sa1: "",
  sa2: "",
  shippostcode: "",
  scountry: "",
  bcity: "",
  ba1: "",
  ba2: "",
  bcountry: "",
  src: "",
  tag: "",
  note: "",
  paymeth: "",
  shipmeth: "",
  coupon: "",
  get_cusret_SelcityFlag : 0,
  get_cusret_getcityFlag:0,
  status: null,
};

var initdata = "";
export var get_cusret_Selcity = createAsyncThunk("cus/RetSelCitydata",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/customers/cus_selected_city_retention.php",data,{ withCredentials: true })
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

var initdata1 = "";
export var get_cusret_getcity = createAsyncThunk(
  "cus/RetenCitydata",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/customers/cus_citylist.php", data, {withCredentials: true,})
        .then(
          (response) => {
            initdata1 = response.data;
          },
          (error) => {}
        );

      return initdata1;
    } catch (err) {
      return err;
    }
  }
);

// state.CusRetS.C.scity

export const RetSelCitySlice = createSlice({
  
  name: "CusRetSC",
  
  initialState,
  
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(get_cusret_Selcity.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(get_cusret_Selcity.fulfilled, (state, action) => {
        
        state.status = "success";
        state.get_cusret_SelcityFlag = Date.now(); 
        if(action.payload.ctable)state.cus_table     = action.payload.ctable;
        if(action.payload.otable)state.order_table   = action.payload.otable;
        if(action.payload.rtable)state.rev_table     = action.payload.rtable;

        /// Order Retention Chart
        if(action.payload.ochart){
          var ochart = action.payload.ochart;
          var ochart_arr = [];
          var ind=1;
          for (const property in ochart) {
            var l = `${property}`;
            var d = `${ochart[property]}`;
            var line_color =
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            ochart_arr.push({
              id:ind,
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
          state.order_chart = ochart_arr;
        }

        if(action.payload.label){
          var lbl = action.payload.label;
          var t_label = lbl.replace(/\"/g, "");
          var t_label = t_label.split(",");
          state.label = t_label;
        }

        /// Rev Retention Chart
        if(action.payload.rchart){
          var rchart = action.payload.rchart;
          var rchart_arr = [];
          for (const property in rchart) {
            var l = `${property}`;
            var d = `${rchart[property]}`;
            var line_color =
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            rchart_arr.push({
              id:ind,
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
          state.rev_chart = rchart_arr;
        }

        /// Cus Retention chart
        if(action.payload.cchart){
          var cchart = action.payload.cchart;
          var cchart_arr = [];
          for (const property in cchart) {
            var l = `${property}`;
            var d = `${cchart[property]}`;
            var line_color =
              "#" +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            cchart_arr.push({
              id:ind,
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
          state.cus_chart = cchart_arr;
        }

        if (action.payload.repeat !== "undefined" &&action.payload.note !== "undefined") {
          state.repeat = action.payload.repeat;
          state.note = action.payload.note;
        }

      })
      .addCase(get_cusret_Selcity.rejected, (state, action) => {
        state.status = "failed";
      })



      .addCase(get_cusret_getcity.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(get_cusret_getcity.fulfilled, (state, action) => {
        
        state.status = "success";
        state.get_cusret_getcityFlag = Date.now(); 
        state.scity         = action.payload.scity;
        state.scountry      = action.payload.scountry;
        state.sa1           = action.payload.sa1;
        state.sa2           = action.payload.sa2;
        state.shippostcode  = action.payload.shippostcode;

        state.bcity         = action.payload.bcity;
        state.bcountry      = action.payload.bcountry;
        state.ba1           = action.payload.ba1;
        state.ba2           = action.payload.ba2;

        state.src           = action.payload.src;
        state.tag           = action.payload.tag;

        state.paymeth       = action.payload.paymeth;
        state.shipmeth      = action.payload.shipmeth;

        state.coupon        = action.payload.coupon;

      })
      .addCase(get_cusret_getcity.rejected, (state, action) => {
        state.status = "failed";
      })

  },

});
