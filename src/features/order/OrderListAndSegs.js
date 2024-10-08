import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  olist: {},
  default_order_list:{},
  osegs: {},
  ocus: "",
  orev: "",
  order: "",
  oprofit: "",
  get_order_ListFlag:0,
  get_order_filtered_ListFlag:0,
  get_order_segsFlag:0,
  get_selseg_ListFlag:0,
  status: null,
};

var initdata = "";

export const get_order_List = createAsyncThunk(
  "order/defList",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/orders/order_table.php", data, {withCredentials: true,})
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

export const get_order_filtered_List = createAsyncThunk(
  "order/filtList",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/orders/order_table.php", data, { withCredentials: true,})
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

export const get_order_segs = createAsyncThunk(
  "order/segsList",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/orders/order_segments.php", data, {withCredentials: true, })
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

export const get_selseg_List = createAsyncThunk(
  "order/sel_segList",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/orders/order_show_segment.php", data, {withCredentials: true,})
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


export const Order_List_And_Seg_Slice = createSlice({

  name: "order_List_And_Segs",

  initialState,

  reducers: {

    DeleteOrderSegment: (state, action) => {
      const { id } = action.payload;
      const indexToRemove = state.osegs.findIndex((segment) => segment.id === id);
      if (indexToRemove !== -1) {
        state.osegs.splice(indexToRemove, 1);
      }
    },
  },


  extraReducers: (builder) => {
    builder
    .addCase(get_selseg_List.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_selseg_List.fulfilled, (state, action) => {
      state.status = "success";
      state.get_selseg_ListFlag = Date.now();
      if (action.payload !== null && action.payload.table) {
        state.olist = action.payload.table;
      }
    })

    .addCase(get_selseg_List.rejected, (state, action) => {
        state.status = "failed";
    })


    // 
    .addCase(get_order_segs.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_order_segs.fulfilled, (state, action) => {
      state.status = "success";
      state.get_order_segsFlag=Date.now();
      if (action.payload !== null && action.payload.segs) {
        state.osegs = action.payload.segs;
      }
    })

    .addCase(get_order_segs.rejected, (state, action) => {
        state.status = "failed";
    })
    // 


    // 
    .addCase(get_order_filtered_List.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_order_filtered_List.fulfilled, (state, action) => {
      state.status = "success";
      state.get_order_filtered_ListFlag=Date.now();
      if (action.payload !== null && action.payload.table) {
        state.olist = action.payload.table;
      }
    })

    .addCase(get_order_filtered_List.rejected, (state, action) => {
        state.status = "failed";
    })
    // 


    // 
     .addCase(get_order_List.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_order_List.fulfilled, (state, action) => {
      state.status = "success";
      state.get_order_ListFlag=Date.now();
      if (action.payload !== null && action.payload.table) {
        state.olist = action.payload.table;
        state.default_order_list = action.payload.table;
      }
    })

    .addCase(get_order_List.rejected, (state, action) => {
        state.status = "failed";
    })
    // 


  },


});


export const { DeleteOrderSegment } = Order_List_And_Seg_Slice.actions;
