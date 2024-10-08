import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  single_city_comparison_table_object: {},

  single_city_unit_comparison: {},
  single_city_rev_comparison: {},
  single_city_cus_comparison: {},
  single_city_order_comparison: {},
  single_city_profit_comparison: {},
  single_city_comparison_chart_base_label: "",
  get_single_city_all_product_dataFlag:0,
  status: null,
};

var initdata = "";

export const get_single_city_all_product_data = createAsyncThunk("product/single_city_performance",async (data) => {
    try {
      await axios.post("https://server.shopex.io/products/products_sincity_perform.php",data,{ withCredentials: true })
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

export const Product_specific_city_all_product_Slice = createSlice({
  
  name: "Product_specific_city_all_product",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    
    builder
    .addCase(get_single_city_all_product_data.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_single_city_all_product_data.fulfilled, (state, action) => {
      state.status = "success";
      state.get_single_city_all_product_dataFlag=Date.now();
      if (action.payload !== null) {
        //// Charts ////

        if(action.payload.label) state.single_city_comparison_chart_base_label = action.payload.label;
        if(action.payload.comparison_table) state.single_city_comparison_table_object = action.payload.comparison_table;

        if(action.payload.unit){
          var unit_object = action.payload.unit;
          var arr = [];
          for (const property in unit_object) {
            var l = `${property}`;
            var d = `${unit_object[property]}`;
            var line_color = "#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr.push({
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
          state.single_city_unit_comparison = arr;
        }

        if(action.payload.revenue){
          var rev_object = action.payload.revenue;
          var arr1 = [];
          for (const property in rev_object) {
            var l = `${property}`;
            var d = `${rev_object[property]}`;
            var line_color ="#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr1.push({
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
          state.single_city_rev_comparison = arr1;
        }

        if(action.payload.customer){
          var cus_object = action.payload.customer;
          var arr2 = [];
          for (const property in cus_object) {
            var l = `${property}`;
            var d = `${cus_object[property]}`;
            var line_color ="#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr2.push({
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
          state.single_city_cus_comparison = arr2;
        }

        if(action.payload.order){
          var order_object = action.payload.order;
          var arr3 = [];
          for (const property in order_object) {
            var l = `${property}`;
            var d = `${order_object[property]}`;
            var line_color = "#" +(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr3.push({
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
          state.single_city_order_comparison = arr3;
        }

        if(action.payload.profit){
          var profit_object = action.payload.profit;
          var arr4 = [];
          for (const property in profit_object) {
            var l = `${property}`;
            var d = `${profit_object[property]}`;
            var line_color ="#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
            var res = d.split(",");

            arr4.push({
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
          state.single_city_profit_comparison = arr4;
        }
      }

    })

    .addCase(get_single_city_all_product_data.rejected, (state, action) => {
        state.status = "failed";
    })
  }



});
