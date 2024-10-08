import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  default_list : {},
  list: {},
  segs: {},
  cus: "",
  rev: "",
  order: "",
  profit: "",
  get_cusList_dataFlag : 0,
  get_cusfilter_List_dataFlag:0,
  get_cussegs_ListFlag:0,
  get_selseg_ListFlag:0,
  status: null,
};

var initdata = "";

export const get_cusList_data = createAsyncThunk("cus/dList", async (data) => {
  try {
    await axios.post("https://server.shopex.io/customers/cus_default_list.php", data, { withCredentials: true,})
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

export const get_cusfilter_List_data = createAsyncThunk("cus/ListAndSeg", async (data) => {
    try {
      await axios
        .post(
          "https://server.shopex.io/customers/cus_segment_filter_form.php",
          data,
          { withCredentials: true }
        )
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

export const get_cussegs_List = createAsyncThunk("cus/segList",async (data) => {
    try {
      await axios
        .post("https://server.shopex.io/customers/cus_segments.php", data, {
          withCredentials: true,
        })
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

export const get_selseg_List = createAsyncThunk("cus/selsegList",async (data) => {
    try {
      await axios.post("https://server.shopex.io/customers/cus_show_selected_segment.php",data,{ withCredentials: true } )
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


export const CusListAndSegsSlice = createSlice({
  
  name: "cusListAndSegs",
  initialState,

  reducers: {

    DeleteCusSegment: (state, action) => {
      const { id } = action.payload;
      const indexToRemove = state.segs.findIndex((segment) => segment.id === id);
      if (indexToRemove !== -1) {
        state.segs.splice(indexToRemove, 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(get_cusList_data.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_cusList_data.fulfilled, (state, action) => {
      state.status = "success";
      state.get_cusList_dataFlag = Date.now(); 
      if (action.payload !== null) {
        if (action.payload.cuslist) {
          state.list = action.payload.cuslist;
          state.default_list = action.payload.cuslist;
        }
        if (action.payload.total_cus)state.cus           = action.payload.total_cus;
        if (action.payload.total_revenue)state.rev       = action.payload.total_revenue;
        if (action.payload.total_order)state.order       = action.payload.total_order;
        if (action.payload.total_profit)state.profit     = action.payload.total_profit;
      }
    })

    .addCase(get_cusList_data.rejected, (state, action) => {
        state.status = "failed";
    })



    .addCase(get_cusfilter_List_data.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_cusfilter_List_data.fulfilled, (state, action) => {
      state.status = "success";
      state.get_cusfilter_List_dataFlag = Date.now(); 
      if (action.payload !== null) {
        if (action.payload.cuslist) state.list           = action.payload.cuslist;
        if (action.payload.total_cus)state.cus           = action.payload.total_cus;
        if (action.payload.total_revenue)state.rev       = action.payload.total_revenue;
        if (action.payload.total_order)state.order       = action.payload.total_order;
        if (action.payload.total_profit)state.profit     = action.payload.total_profit;
      }
    })

    .addCase(get_cusfilter_List_data.rejected, (state, action) => {
        state.status = "failed";
    })



    .addCase(get_selseg_List.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_selseg_List.fulfilled, (state, action) => {
      state.status = "success";
      state.get_selseg_ListFlag = Date.now(); 
      if (action.payload !== null && action.payload.cuslist ) {
        state.list = action.payload.cuslist;
      }
    })

    .addCase(get_selseg_List.rejected, (state, action) => {
        state.status = "failed";
    })



    .addCase(get_cussegs_List.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_cussegs_List.fulfilled, (state, action) => {
      state.status = "success";
      state.get_cussegs_ListFlag = Date.now(); 
      if (action.payload !== null && action.payload.segs ) {
        state.segs = action.payload.segs;
      }
    })

    .addCase(get_cussegs_List.rejected, (state, action) => {
        state.status = "failed";
    })

  }

});

export const { DeleteCusSegment } = CusListAndSegsSlice.actions;
