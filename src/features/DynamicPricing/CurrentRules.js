import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  CurrentRules: {},
  get_pricing_current_rulesFlag :0,
  status: null,
};

var initdata = "";
export const get_pricing_current_rules = createAsyncThunk(
  "PricingRules/CurrentList",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/dynamicpricing/dpp_created_pricing_rules.php",data,{ withCredentials: true })
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

export const Pricing_Current_Rules_Slice = createSlice({
  
  name: "Pricing_current_rules",
  initialState,
  
  reducers: {
    
    addRole: (state, action) => {
      state.CurrentRules.push(action.payload);
    },

    editRoleStatus: (state, action) => {
      const { name, status } = action.payload;
      const roleIndex = state.CurrentRules.findIndex((role) => role.name === name);
      console.log(roleIndex);
      if (roleIndex !== -1) {
        state.CurrentRules[roleIndex].status = status;
      }
    },

    removeRole: (state, action) => {
      state.CurrentRules.splice(action.payload, 1);
    },
  },

  extraReducers: (builder) => {
    
    builder
    .addCase(get_pricing_current_rules.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_pricing_current_rules.fulfilled, (state, action) => {
      state.status = "success";
      state.get_pricing_current_rulesFlag = Date.now(); 
      if(action.payload.created_rules) state.CurrentRules = action.payload.created_rules;
    })

    .addCase(get_pricing_current_rules.rejected, (state, action) => {
        state.status = "failed";
    })
  }


});

export const { addRole,editRoleStatus,removeRole } = Pricing_Current_Rules_Slice.actions;
