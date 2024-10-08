import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

var initialState = {
  tops: { tpbu: "", tpbr: "", tpbp: "", tcbu: "", tcbr: "", tcbp: "" },
  ThisMonth: { tmnew: "", tmnew_note: "", tmret: "", tmret_note: "" },
  weekday: { day: "", day_on: "", day_oa: "" },
  segment_join : "",
  segment_drop : "",
  fbt_table: {},
  associatiol_rule_table: {},
  rolePower:null,
  shoptype:null,
  accountType:null,
  get_topsFlag : 0,
  get_segment_todayFlag:0,
  get_basket_anaysisFlag:0,
  status: null,

};

  var topsdata = "";
  export const get_tops = createAsyncThunk("dash_tops/initdata", async () => {
    try { await axios.post("https://server.shopex.io/dashboard/dash_query.php",{},{ withCredentials: true })
      .then(
        (response) => {
          topsdata = response.data;
          //console.log(response.data);
        },
        (error) => {}
      );
      return topsdata;
    } catch (err) {
        return err;
    }
  });


  export const get_segment_today = createAsyncThunk("dash_segment/join_drop", async () => {
      try { await axios.post("https://server.shopex.io/dashboard/dash_segment_join_drop_list.php",{},{ withCredentials: true })
        .then(
          (response) => {
            topsdata = response.data;
            //console.log(response.data);
          },
          (error) => {}
        );
        return topsdata;
      } catch (err) {
          return err;
      }
    }
  );



  export const get_basket_anaysis = createAsyncThunk("baskets/analysis_timeline", async (data) => {
      try { await axios.post("https://server.shopex.io/dashboard/baskets.php",data,{ withCredentials: true })
        .then(
          (response) => {
            topsdata = response.data;
            //console.log(response.data);
          },
          (error) => {}
        );
        return topsdata;
      } catch (err) {
          return err;
      }
    }
  );



export const dashTopsSlice = createSlice({
  
  name: "dashTops",
  initialState,

  reducers: {
    LogOut: (state, action) => {
      state.status = null;
      state.rolePower   = null;
      state.shoptype    = null;
      state.accountType = null;
    },
    LogIn: (state, action) => {
      var {role,shoptype,accountType} = action.payload;
      state.rolePower   = role;
      state.shoptype    = shoptype;
      state.accountType = accountType;
      state.status      = "success";
    },
    demoLogin:(state,action) => {
      const { id }    = action.payload;
      state.rolePower = id;
      state.status    = "success";
    }
  },

  extraReducers: (builder) => {
    
    builder
    .addCase(get_tops.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(get_tops.fulfilled, (state, action) => {
      state.status = "success";
      state.get_topsFlag = Date.now(); 
      state.tops.tpbu = action.payload.tpbu;
      state.tops.tpbr = action.payload.tpbr;
      state.tops.tpbp = action.payload.tpbp;
      state.tops.tcbu = action.payload.tcbu;
      state.tops.tcbr = action.payload.tcbr;
      state.tops.tcbp = action.payload.tcbp;

      state.ThisMonth.tmnew      = action.payload.ThisMonthNewCustomer;
      state.ThisMonth.tmnew_note = action.payload.ThisMonthNewCustomer_note;
      state.ThisMonth.tmret      = action.payload.ThisMonthRetCustomer;
      state.ThisMonth.tmret_note = action.payload.ThisMonthRetCustomer_note;

      state.weekday.day     = action.payload.dayname;
      state.weekday.day_on  = action.payload.day_total_order;
      state.weekday.day_oa  = action.payload.day_total_amount;

      // 'frequent_ProductSets'=>$frequent_ProductSets,
      // "rules"=>$rules

      state.fbt_table               = action.payload.frequent_ProductSets;
      state.associatiol_rule_table  = action.payload.rules;

    })
    .addCase(get_tops.rejected, (state, action) => {
        state.status = "failed";
    })



    //Today Segment Join-Drop
    .addCase(get_segment_today.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_segment_today.fulfilled, (state, action) => {
      
      state.status = "success";
      state.get_segment_todayFlag = Date.now(); 
      if (action.payload !== null) {
        if(action.payload.join_data) { 
          state.segment_join    = action.payload.join_data; 
        }
        if(action.payload.drop_data) { 
          state.segment_drop    = action.payload.drop_data; 
        }
      }
    })

    .addCase(get_segment_today.rejected, (state, action) => {
        state.status = "failed";
    })


    // Basket Analysis
    .addCase(get_basket_anaysis.pending, (state, action) => {
      state.status = "loading";
    })

    .addCase(get_basket_anaysis.fulfilled, (state, action) => {
      
      state.status = "success";
      state.get_basket_anaysisFlag = Date.now(); 
      if (action.payload !== null) {
        if(action.payload.frequent_ProductSets) { 
          state.fbt_table               = action.payload.frequent_ProductSets;
        }
        if(action.payload.rules) { 
          state.associatiol_rule_table  = action.payload.rules;
        }
      }
    })

    .addCase(get_basket_anaysis.rejected, (state, action) => {
        state.status = "failed";
    })
  
  }

});

//export default dashSlice.reducer;

export const { LogOut,LogIn } = dashTopsSlice.actions;

