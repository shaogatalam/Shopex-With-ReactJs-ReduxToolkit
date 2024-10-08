import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  sales_table_product_object: {},
  sales_table_product_catagory_object: {},
  get_product_and_catagory_sales_objectFlag:0,
  get_products_sales_from_selected_catagoryFlag:0,
  status: null,
};

var initdata = "";
export const get_product_and_catagory_sales_object = createAsyncThunk("product/sales_table_product_and_catagory_object",async (data) => {
    try {
      await axios.post("https://server.shopex.io/products/product_sales_table.php",data,{ withCredentials: true })
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
export const get_products_sales_from_selected_catagory = createAsyncThunk("product/selected_cat_product_sales",async (data) => {
    try {
      await axios.post("https://server.shopex.io/products/product_show_sincat_sale.php ",data,{ withCredentials: true }) //
        .then(
          (response) => {
            initdata1 = response.data;
            //console.log(initdata);
          },
          (error) => {}
        );
      return initdata1;
    } catch (err) {
      return err;
    }
  }
);

export const Product_and_catagory_sales_Slice = createSlice({

  name: "Product_and_Catagory_sales",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    
    builder
    .addCase(get_products_sales_from_selected_catagory.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_products_sales_from_selected_catagory.fulfilled, (state, action) => {
      state.status = "success";
      state.get_products_sales_from_selected_catagoryFlag = Date.now();
      if (action.payload !== null && action.payload.table) {
        state.sales_table_product_object = action.payload.table;
      }
    })

    .addCase(get_products_sales_from_selected_catagory.rejected, (state, action) => {
        state.status = "failed";
    })

    .addCase(get_product_and_catagory_sales_object.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_product_and_catagory_sales_object.fulfilled, (state, action) => {
      state.status = "success";
      state.get_product_and_catagory_sales_objectFlag = Date.now()
      if (action.payload !== null && action.payload.product_sales_table_object && action.payload.product_catagory_sales_table_object) {
        state.sales_table_product_object = action.payload.product_sales_table_object;
        state.sales_table_product_catagory_object = action.payload.product_catagory_sales_table_object;
      }
    })

    .addCase(get_product_and_catagory_sales_object.rejected, (state, action) => {
        state.status = "failed";
    })

  }



});
