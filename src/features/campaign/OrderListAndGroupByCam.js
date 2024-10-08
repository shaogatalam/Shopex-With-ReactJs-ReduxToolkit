import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  Allorder: {},
  orderGroupByCamSrc: {},
  all_src_and_url:{},
  status: null,
  shopify_order_from_campaign:{}
};


export const save_new_campaign_data = createAsyncThunk("campaign/savenewcampaign", async (data) => {
    try {
      await axios.post("https://server.shopex.io/campaign/campaign_save_src.php",data,{ withCredentials: true })
        .then(
          (response) => {
          },
          (error) => {}
        );
      return initdata;
    } catch (err) {
      return err;
    }
  }
);

var initdata = "";
export const get_order_from_campaign_shopify = createAsyncThunk("campaign/shopify_order_from_campaign", async (data) => {
  try {
    await axios.post("https://server.shopex.io/campaign/shopify_order_from_campaign.php",data,{ withCredentials: true })
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


var initdata = "";
export const get_all_orders_from_campaign = createAsyncThunk("campaign/AllOrderList",async (data) => {
    try {
      await axios .post("https://server.shopex.io/campaign/campaign.php", data, {withCredentials: true,})
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


export const get_all_src_name_and_url = createAsyncThunk("campaign/getAllSrcNameAndUrl",async (data) => {
    try {
      await axios .post("https://server.shopex.io/campaign/cam_get_all.php", data, {withCredentials: true,})
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


var initdata1 = "";
export const get_all_orders_group_by_campaign = createAsyncThunk("campaign/OrderGroupByCampaignSource",async (data) => {
    try {
      await axios
        .post("https://server.shopex.io/campaign/campaign.php", data, {
          withCredentials: true,
        })
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


export const campaign_Slice = createSlice({

  name: "campaign",
  initialState,
  reducers: {

    DeleteCam: (state, action) => {
      const { id } = action.payload;
      const indexToRemove = state.all_src_and_url.findIndex((cam) => cam.id === id);
      if (indexToRemove !== -1) {
        state.all_src_and_url.splice(indexToRemove, 1);
      }
    },

  },

  // extraReducers: {

  //   [get_all_orders_from_campaign.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [get_all_orders_from_campaign.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.Allorder = action.payload.camoaign_order_list;
  //   },
  //   [get_all_orders_from_campaign.rejected]: (state, action) => {
  //     state.status = "failed";
  //   },

  //   [get_all_orders_group_by_campaign.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [get_all_orders_group_by_campaign.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.orderGroupByCamSrc = action.payload.group_by_src;
  //   },
  //   [get_all_orders_group_by_campaign.rejected]: (state, action) => {
  //     state.status = "failed";
  //   },

  //   [save_new_campaign_data.pending]: (state, action) => {
  //     state.status = "loading";
  //   },
  //   [save_new_campaign_data.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.orderGroupByCamSrc = action.payload.group_by_src;
  //   },
  //   [save_new_campaign_data.rejected]: (state, action) => {
  //     state.status = "failed";
  //   },
  // },


  extraReducers: (builder) => {
    builder
    .addCase(save_new_campaign_data.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(save_new_campaign_data.fulfilled, (state, action) => {
      state.status = "success";
    })

    .addCase(save_new_campaign_data.rejected, (state, action) => {
        state.status = "failed";
    })


    .addCase(get_all_orders_group_by_campaign.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_all_orders_group_by_campaign.fulfilled, (state, action) => {
      state.status = "success";
      state.orderGroupByCamSrc = action.payload.group_by_src;
    })

    .addCase(get_all_orders_group_by_campaign.rejected, (state, action) => {
        state.status = "failed";
    })


    .addCase(get_all_orders_from_campaign.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_all_orders_from_campaign.fulfilled, (state, action) => {
      state.status = "success";
      state.Allorder = action.payload.camoaign_order_list;
    })

    .addCase(get_all_orders_from_campaign.rejected, (state, action) => {
        state.status = "failed";
    })


    .addCase(get_all_src_name_and_url.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_all_src_name_and_url.fulfilled, (state, action) => {
      state.status = "success";
      state.all_src_and_url = action.payload.cams;
    })

    .addCase(get_all_src_name_and_url.rejected, (state, action) => {
        state.status = "failed";
    })
    //

    //
    .addCase(get_order_from_campaign_shopify.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_order_from_campaign_shopify.fulfilled, (state, action) => {
      state.status = "success";
      state.shopify_order_from_campaign = action.payload.shopify_order_from_campaign;
    })

    .addCase(get_order_from_campaign_shopify.rejected, (state, action) => {
        state.status = "failed";
    })

  },

});


export const { DeleteCam } = campaign_Slice.actions;
