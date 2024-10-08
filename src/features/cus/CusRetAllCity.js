import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  cus_table: "",
  rev_table: "",
  order_table: "",
  cus_chart: "",
  order_chart: "",
  rev_chart: "",
  label: "",
  repeat: "",
  note: "",
  get_cusret_allcityFlag : 0, 
  status: null,
};

var initdata = "";
export const get_cusret_allcity = createAsyncThunk(
  "cus/RetAllCitydata",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/customers/cus_allcity_retention.php",data,{ withCredentials: true })
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

export const RetAllCitySlice = createSlice({
  name: "CusRetAC",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(get_cusret_allcity.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(get_cusret_allcity.fulfilled, (state, action) => {
        
        state.status = "success";
        state.get_cusret_allcityFlag = Date.now(); 
        
        if(action.payload.ctable) state.cus_table   = action.payload.ctable;
        if(action.payload.otable) state.order_table = action.payload.otable;
        if(action.payload.rtable) state.rev_table   = action.payload.rtable;

        /// Order Retention Chart
        
        var ochart = action.payload.ochart;
        
        var ochart_arr = [];
        
        if(action.payload.ochart){
          for (const property in ochart) {
            var l = `${property}`;
            var d = `${ochart[property]}`;
            var line_color ="#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            ochart_arr.push({
              label: l,
              fill: false,
              spanGaps: false,
              borderWidth: 1.5,
              pointRadius: 5.5,
              pointHoverRadius: 8,
              borderColor: line_color,
              pointHitRadius: 10,
              pointStyle: "circle",
              lineTension: 0.5,
              pointBorderWidth: 4,
              pointBackgroundColor: "rgba(255,150,0,0.5)",
              pointRotation: 5,
              data: res,
            });
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
            var line_color ="#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            rchart_arr.push({
              label: l,
              fill: false,
              spanGaps: false,
              borderWidth: 1.5,
              pointRadius: 5.5,
              pointHoverRadius: 8,
              borderColor: line_color,
              pointHitRadius: 10,
              pointStyle: "circle",
              lineTension: 0.5,
              pointBorderWidth: 4,
              pointBackgroundColor: "rgba(255,150,0,0.5)",
              pointRotation: 5,
              data: res,
            });
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
            var line_color ="#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            cchart_arr.push({
              label: l,
              fill: false,
              spanGaps: false,
              borderWidth: 1.5,
              pointRadius: 5.5,
              pointHoverRadius: 8,
              borderColor: line_color,
              pointHitRadius: 10,
              pointStyle: "circle",
              lineTension: 0.5,
              pointBorderWidth: 4,
              pointBackgroundColor: "rgba(255,150,0,0.5)",
              pointRotation: 5,
              data: res,
            });
          }
          state.cus_chart = cchart_arr;
        }

        if (action.payload.repeat !== "undefined" &&action.payload.note !== "undefined") {
          state.repeat = action.payload.repeat;
          state.note = action.payload.note;
        }

      })

      .addCase(get_cusret_allcity.rejected, (state, action) => {
        state.status = "failed";
      })

  },

});
