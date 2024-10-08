import { configureStore } from '@reduxjs/toolkit';
import {combineReducers} from "redux"; 
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import {dashSlice} from "../features/dash/dashboard";
import {dashTopsSlice} from "../features/dash/DashTopsSlice";

import {TRFSlice} from '../features/cus/Cus_new_repeat_total_Chart';
import {TMSlice} from '../features/cus/CustomersFromThisMonth';
import {CusLocChartTableSlice} from '../features/cus/CusLocCT';
import {GBy1stBuyMonthSlice} from '../features/cus/CusListGroupBy1stBuy';
import {RetAllCitySlice} from '../features/cus/CusRetAllCity';
import {RetSelCitySlice} from '../features/cus/CusRetSelCity';
import {CusListAndSegsSlice} from '../features/cus/CusListAndSeg';

import { Order_List_And_Seg_Slice} from '../features/order/OrderListAndSegs';
import { Order_numrev_LocChartTable_Slice } from '../features/order/OrderReport';

import { Product_List_And_Seg_Slice } from '../features/product/ProductListAndSegment';
import { Product_and_catagory_sales_Slice } from '../features/product/ProductSalesTable';
import { Product_specific_city_all_product_Slice } from '../features/product/ProductSingleCity';
import { Product_performance_single_and_mutiple_Slice } from '../features/product/ProductPerformance';
import { Product_segments_Slice } from '../features/product/ProductSegments';
import { Product_Purchase_Based_Customer_List_and_Segment_Slice } from '../features/product/ProductPurchaseBasedCusSeg';

import { pricing_rule_List_Slice } from '../features/DynamicPricing/CreatedRules';
import { Pricing_Current_Rules_Slice } from '../features/DynamicPricing/CurrentRules';

import { campaign_Slice } from '../features/campaign/OrderListAndGroupByCam';

import { coupon_Slice } from '../features/Coupons/Get_coupon_list';

import { Profile_personal_data_Slice } from '../features/profile/PersonalData';
import { Profile_plan_Slice } from '../features/profile/Plan';
import { Profile_shops_Slice } from '../features/profile/Shops';
import { Profile_team_Slice } from '../features/profile/Team';

import { engage_Slice } from '../features/engage/PerformanceCompare';

import { CustomerSegmentReportSlice } from '../features/cus/CusSegmentReport';


const rootReducer = combineReducers({
    
    //user: usersReducer,
    dash: dashSlice.reducer,
    dashTops: dashTopsSlice.reducer,
    
    cusTRF: TRFSlice.reducer,
    cusTM: TMSlice.reducer,
    cusLocChartTable: CusLocChartTableSlice.reducer,
    cusGroupBy1stMonth: GBy1stBuyMonthSlice.reducer,
    CusRetAC: RetAllCitySlice.reducer,
    CusRetSC: RetSelCitySlice.reducer,
    cusListAndSegs: CusListAndSegsSlice.reducer,

    order_List_And_Segs: Order_List_And_Seg_Slice.reducer,
    order_numrev_shipLoc_ChartTable : Order_numrev_LocChartTable_Slice.reducer,
    
    product_List_And_Segments : Product_List_And_Seg_Slice.reducer,
    Product_and_Catagory_sales : Product_and_catagory_sales_Slice.reducer,
    Product_performance:Product_performance_single_and_mutiple_Slice.reducer,
    Product_specific_city_all_product : Product_specific_city_all_product_Slice.reducer,
    Product_Purchase_Based_Customer_List_and_Segment : Product_Purchase_Based_Customer_List_and_Segment_Slice.reducer,
    Product_segments : Product_segments_Slice.reducer,



    Pricing_rule_list : pricing_rule_List_Slice.reducer,
    Pricing_current_rules : Pricing_Current_Rules_Slice.reducer,

    campaign : campaign_Slice.reducer,

    coupon : coupon_Slice.reducer,

    Profile_personal_data : Profile_personal_data_Slice.reducer, 
    Profile_plan : Profile_plan_Slice.reducer,
    Profile_shops : Profile_shops_Slice.reducer,
    profile_team : Profile_team_Slice.reducer,


    engage : engage_Slice.reducer,

    CustomerSegmentReport : CustomerSegmentReportSlice.reducer

})


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      //serializableCheck: false,
    }),
})

//Working code
export default store;
export const persistor = persistStore(store);

