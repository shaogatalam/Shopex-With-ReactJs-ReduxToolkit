import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {

  woo_default_product: {},
  shopify_default_product: {},
  shopify_product : {},
  shopify_collection : {},
  product_table_object: {},
  product_cat_table_object: {},
  all_product_cat_object: {},
  product_segments: {},
  product_sku: "",
  shopify_sku:"",
  shopify_product_type:"",
  shopify_product_vendor:"",
  shopify_product_inv:"",

  get_product_and_catagory_and_sku_dataFlag : 0,
  get_shopify_product_and_sku_and_typeFlag : 0,
  get_filtered_product_dataFlag : 0,
  get_shopify_filtered_product_dataFlag:0,
  get_product_segmentsFlag : 0,
  get_products_from_selected_segmentFlag:0,
  get_products_from_selected_catagoryFlag : 0,

  status: null,

};


  var initdata = "";

  export const get_product_and_catagory_and_sku_data = createAsyncThunk("product/product_catagory_main_List",async (data) => {
      try {
        await axios.post("https://server.shopex.io/products/product_main_list_woo.php", data, { withCredentials: true,})
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

  export const get_shopify_product_and_sku_and_type = createAsyncThunk("product/shopify_product",async (data) => {
      try {
        await axios.post("https://server.shopex.io/products/product_main_list_shopify.php", data, { withCredentials: true,})
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

  export const get_filtered_product_data = createAsyncThunk("product/woo_filtered_product_List",async (data) => {
      try {
        await axios.post("https://server.shopex.io/products/product_filter_form_woo.php",data,{ withCredentials: true })
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

  export const get_shopify_filtered_product_data = createAsyncThunk("product/shopify_filtered_product_List",async (data) => {
    try {
      await axios.post("https://server.shopex.io/products/product_filter_form_shopify.php",data,{ withCredentials: true })
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

  export const get_product_segments = createAsyncThunk("product/segment_List",async (data) => {
    try {
      await axios.post("https://server.shopex.io/products/product_segments.php", data, {withCredentials: true,})
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

  export const get_products_from_selected_segment = createAsyncThunk("product/selected_segment_product",async (data) => {
    try {
      await axios.post("https://server.shopex.io/products/product_show_segment.php ",data,{ withCredentials: true }) //
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

  export const get_products_from_selected_catagory = createAsyncThunk("product/selected_cat_product",async (data) => {
    try {
      await axios.post(`https://server.shopex.io/products/product_show_sincat.php`,data,{ withCredentials: true }) //
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



export const Product_List_And_Seg_Slice = createSlice({
  
  name: "product_List_And_Segments",

  initialState,

  reducers: {
    EditCost: (state, action) => {
      var id  = action.payload.id;
      var cog = action.payload.cost;
      state.product_table_object = state.product_table_object.map((item) => {
        if (item.product_id === id) {
          return { ...item, cog };
        } else {
          return item;
        }
      });
    },
    
    EditRegulerPrice: (state, action) => {
      var id  = action.payload.id;
      var reguler_price = action.payload.reguler_price;
      state.product_table_object = state.product_table_object.map((item) => {
        if (item.product_id === id) {
          return { ...item, reguler_price };
        } else {
          return item;
        }
      });
    },
    EditCurrentPrice: (state, action) => {
      var id  = action.payload.id;
      var curr_price = action.payload.curr_price;
      state.product_table_object = state.product_table_object.map((item) => {
        if (item.product_id === id) {
          return { ...item, curr_price };
        } else {
          return item;
        }
      });
    }

  },



  extraReducers: (builder) => {
    
    builder
    .addCase(get_products_from_selected_catagory.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_products_from_selected_catagory.fulfilled, (state, action) => {
      state.status = "success";
      state.get_products_from_selected_catagoryFlag=Date.now();
      if(action.payload !== null && action.payload.table ) {state.product_table_object = action.payload.table;}
    })

    .addCase(get_products_from_selected_catagory.rejected, (state, action) => {
        state.status = "failed";
    })

    //=
    .addCase(get_products_from_selected_segment.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_products_from_selected_segment.fulfilled, (state, action) => {
      state.status = "success";
      state.get_products_from_selected_segmentFlag = Date.now();
      if(action.payload !== null && action.payload.products_table_object_from_a_segment ) { 
        state.product_table_object = action.payload.products_table_object_from_a_segment;
      }
    })

    .addCase(get_products_from_selected_segment.rejected, (state, action) => {
        state.status = "failed";
    })


    //=
    .addCase(get_product_segments.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(get_product_segments.fulfilled, (state, action) => {
      state.status = "success";
      state.get_product_segmentsFlag=Date.now();
      if(action.payload !== null && action.payload.product_segments) {state.product_segments = action.payload.product_segments;}
    })
    .addCase(get_product_segments.rejected, (state, action) => {
        state.status = "failed";
    })


    //=
    .addCase(get_filtered_product_data.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(get_filtered_product_data.fulfilled, (state, action) => {
      state.status = "success";
      state.get_filtered_product_dataFlag=Date.now();
      if(action.payload !== null) {
        state.product_table_object = action.payload.filtered_product_table_object;
        if(action.payload.product_segment_id !== "") {
          
          const currentDate     = new Date();
          const year            = currentDate.getFullYear();
          const month           = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero for single digit months
          const day             = currentDate.getDate().toString().padStart(2, "0"); // Add leading zero for single digit days
          const formattedDate   = `${year}-${month}-${day}`;
          
          state.product_segments = [...state.product_segments, 
            { id: action.payload.product_segment_id, 
              name: action.payload.product_segment_name, 
              filter: action.payload.product_segment_filter, 
              created: formattedDate
            }
          ];
        }
      }
    })
    .addCase(get_filtered_product_data.rejected, (state, action) => {
        state.status = "failed";
    })

    
    
    //=
    .addCase(get_shopify_filtered_product_data.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(get_shopify_filtered_product_data.fulfilled, (state, action) => {
      state.status = "success";
      state.get_shopify_filtered_product_dataFlag=Date.now();
      if(action.payload !== null) {
        state.shopify_product = action.payload.filtered_product_table_object;
        if(action.payload.product_segment_id !== "") {
          
          const currentDate     = new Date();
          const year            = currentDate.getFullYear();
          const month           = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero for single digit months
          const day             = currentDate.getDate().toString().padStart(2, "0"); // Add leading zero for single digit days
          const formattedDate   = `${year}-${month}-${day}`;
          
          state.product_segments = [...state.product_segments, 
            { id: action.payload.product_segment_id, 
              name: action.payload.product_segment_name, 
              filter: action.payload.product_segment_filter, 
              created: formattedDate
            }
          ];
        }
      }
    })
    .addCase(get_shopify_filtered_product_data.rejected, (state, action) => {
        state.status = "failed";
    })


    //=
    .addCase(get_product_and_catagory_and_sku_data.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_product_and_catagory_and_sku_data.fulfilled, (state, action) => {
      state.status = "success";
      state.get_product_and_catagory_and_sku_dataFlag = Date.now();
      if (action.payload !== null) {
        if(action.payload.product_table_object)state.woo_default_product       = action.payload.product_table_object;
        if(action.payload.product_table_object)state.product_table_object      = action.payload.product_table_object;
        if(action.payload.category_table_object)state.product_cat_table_object = action.payload.category_table_object;
        if(action.payload.sku)state.product_sku = action.payload.sku;
      }
    })

    .addCase(get_product_and_catagory_and_sku_data.rejected, (state, action) => {
        state.status = "failed";
    })


    //=
    .addCase(get_shopify_product_and_sku_and_type.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(get_shopify_product_and_sku_and_type.fulfilled, (state, action) => {
      state.status = "success";
      state.get_shopify_product_and_sku_and_typeFlag=Date.now();
      if (action.payload !== null) {
        if(action.payload.all_shopify_product)state.shopify_default_product   = action.payload.all_shopify_product;
        if(action.payload.all_shopify_product)state.shopify_product       = action.payload.all_shopify_product;

        if(action.payload.collection)state.shopify_collection             = action.payload.collection;
        
        if(action.payload.type)state.shopify_product_type                 = action.payload.type;
        if(action.payload.sku)state.shopify_sku                           = action.payload.sku;
        if(action.payload.vendor)state.shopify_product_vendor             = action.payload.vendor;
        if(action.payload.inv)state.shopify_product_inv                   = action.payload.inv;
        
      }
    })
    .addCase(get_shopify_product_and_sku_and_type.rejected, (state, action) => {
        state.status = "failed";
    })


  }



});

export const { EditCost,EditCurrentPrice,EditRegulerPrice } = Product_List_And_Seg_Slice.actions;
