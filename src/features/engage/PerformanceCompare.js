import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  autoList: {},
  get_all_engage_automation_performanceFlag :0,
  status: null,
};

var initdata = "";
export const get_all_engage_automation_performance = createAsyncThunk(
  "engage/compare",
  async (data) => {
    try {
      await axios.post("https://server.shopex.io/engage/engage_perform.php", data, {withCredentials: true, })
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

export const engage_Slice = createSlice({
  
  name: "engage",
  initialState,

  reducers: {
    
    addEngage: (state, action) => {
      state.autoList.push(action.payload);
    },

    editEngageStatus: (state, action) => {
      const { id, status } = action.payload;
      const roleIndex = state.autoList.findIndex((engage) => engage.id === id);
      if (roleIndex !== -1) {
        state.autoList[roleIndex].status = status;
      }
    },

    removeEngage: (state, action) => {
      const { id } = action.payload;
      const indexToRemove = state.autoList.findIndex((engage) => engage.id === id);
      if (indexToRemove !== -1) {
        state.autoList.splice(indexToRemove, 1);
      }
    },
  },

  extraReducers: (builder) => {
    builder
    .addCase(get_all_engage_automation_performance.pending, (state, action) => {
        state.status = "loading";
    })

    .addCase(get_all_engage_automation_performance.fulfilled, (state, action) => {
      state.status = "success";
      state.get_all_engage_automation_performanceFlag = Date.now(); 
      if(action.payload.autoList)state.autoList = action.payload.autoList;
    })

    .addCase(get_all_engage_automation_performance.rejected, (state, action) => {
        state.status = "failed";
    })


  },

});


export const { addEngage,editEngageStatus,removeEngage } = engage_Slice.actions;
