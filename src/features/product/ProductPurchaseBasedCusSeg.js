import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  Product_Purchase_Based_Cus_List_Obj: {},
  Product_Purchase_Based_Cus_Segment_Obj: {},
  Get_Product_Purchase_Based_Cus_List_ObjFlag:0,
  Get_Product_Category_Purchase_Based_Cus_List_ObjFlag:0,
  Get_selected_specific_segments_cus_list_objFlag:0,
  Get_Product_Purchase_Based_Cus_Seg_ObjFlag:0,
  status: null,
};


var initdata = "";
export const Get_Product_Purchase_Based_Cus_List_Obj = createAsyncThunk("product/Purchase_buy_based_customer_list",async (data) => {
    try {
      await axios.post( "https://server.shopex.io/products/product_cus_segment.php",data,{ withCredentials: true })
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

export const Get_Product_Category_Purchase_Based_Cus_List_Obj =createAsyncThunk("product/Purchase_category_buy_based_customer_list",async (data) =>{
    try {
      await axios.post( "https://server.shopex.io/products/product_category_cus_segment.php",data,{ withCredentials: true })
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

var initdata99 = "";
export const Get_selected_specific_segments_cus_list_obj = createAsyncThunk("product/Get_specific_segments_cus_list_obj",async (data) => {
    try {
      await axios.post( "https://server.shopex.io/products/product_selected_cuseg.php",data,{ withCredentials: true })
        .then(
          (response) => {
            initdata99 = response.data;
            //console.log(initdata);
          },
          (error) => {}
        );
      return initdata99;
    } catch (err) {
      return err;
    }
  }
);

var initdata1 = "";
export const Get_Product_Purchase_Based_Cus_Seg_Obj = createAsyncThunk("product/Purchase_buy_based_customer_segment",async (data) => {
    try {
      await axios.post("https://server.shopex.io/products/product_purchase_based_cus_segment_list.php",data,{ withCredentials: true })
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

export const Product_Purchase_Based_Customer_List_and_Segment_Slice = createSlice({

    name: "Product_Purchase_Based_Customer_List_and_Segment",

    initialState,

    reducers: {
      removeCuslist(state, action) {
        state.Product_Purchase_Based_Cus_List_Obj = null;
      },
    },

    extraReducers: (builder) => {
    
      builder
      .addCase(Get_Product_Purchase_Based_Cus_List_Obj.pending, (state, action) => {
          state.status = "loading";
      })
  
      .addCase(Get_Product_Purchase_Based_Cus_List_Obj.fulfilled, (state, action) => {
        state.status = "success";
        state.Get_Product_Purchase_Based_Cus_List_ObjFlag = Date.now();
        if (action.payload !== null && action.payload.table) {
          state.Product_Purchase_Based_Cus_List_Obj = action.payload.table;
        }
      })
  
      .addCase(Get_Product_Purchase_Based_Cus_List_Obj.rejected, (state, action) => {
          state.status = "failed";
      })

      
      .addCase(Get_Product_Category_Purchase_Based_Cus_List_Obj.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(Get_Product_Category_Purchase_Based_Cus_List_Obj.fulfilled, (state, action) => {
        state.status = "success";
        state.Get_Product_Category_Purchase_Based_Cus_List_ObjFlag=Date.now();
        if (action.payload !== null && action.payload.table) {
          state.Product_Purchase_Based_Cus_List_Obj = action.payload.table;
        }
      })

      .addCase(Get_Product_Category_Purchase_Based_Cus_List_Obj.rejected, (state, action) => {
          state.status = "failed";
      })



      .addCase(Get_Product_Purchase_Based_Cus_Seg_Obj.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(Get_Product_Purchase_Based_Cus_Seg_Obj.fulfilled, (state, action) => {
        state.status = "success";
        state.Get_Product_Purchase_Based_Cus_Seg_ObjFlag=Date.now();
        if(action.payload.segs)state.Product_Purchase_Based_Cus_Segment_Obj = action.payload.segs;
      })

      .addCase(Get_Product_Purchase_Based_Cus_Seg_Obj.rejected, (state, action) => {
          state.status = "failed";
      })



      .addCase(Get_selected_specific_segments_cus_list_obj.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(Get_selected_specific_segments_cus_list_obj.fulfilled, (state, action) => {
        state.status = "success";
        state.Get_selected_specific_segments_cus_list_objFlag=Date.now();
        if(action.payload.table){
          state.Product_Purchase_Based_Cus_List_Obj = action.payload.table;
        }
      })

      .addCase(Get_selected_specific_segments_cus_list_obj.rejected, (state, action) => {
          state.status = "failed";
      })

    }
  
  });

//export const { removeCuslist } = Product_Purchase_Based_Customer_List_and_Segment_Slice.actions
