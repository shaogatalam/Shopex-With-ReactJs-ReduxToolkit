import React, { useEffect, useState,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Multiselect from "multiselect-react-dropdown";


import axios from "axios";
//import MaterialTable, { MTableToolbar } from 'material-table';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import {  } from "@mui/material";
import { Button } from "@mui/material";

import { get_product_and_catagory_and_sku_data } from "../../features/product/ProductListAndSegment";
//import { get_woo_filtered_product_data } from "../../features/product/ProductListAndSegment";
import { get_filtered_product_data } from "../../features/product/ProductListAndSegment";
import { get_shopify_filtered_product_data } from "../../features/product/ProductListAndSegment";


import { get_product_segments } from "../../features/product/ProductListAndSegment";
import { get_shopify_product_and_sku_and_type } from "../../features/product/ProductListAndSegment";


import Products from "./ProductSegmentFilters/Products";
import ProductCatagory from "./ProductSegmentFilters/ProductCatagory";
import ProductSKU from "./ProductSegmentFilters/ProductSKU";
import ProductCurrentPrice from "./ProductSegmentFilters/ProductCurrentPrice";
import ProductHeight from "./ProductSegmentFilters/ProductHeight";
import ProductWidth from "./ProductSegmentFilters/ProductWidth";
import ProductLength from "./ProductSegmentFilters/ProductLength";
import ProductWeight from "./ProductSegmentFilters/ProductWeight";
import ProductStock from "./ProductSegmentFilters/ProductStock";
import ProductOnSale from "./ProductSegmentFilters/ProductOnSale";
import ProductType from "./ProductSegmentFilters/ProductType";

import ProductGrams from "./ProductSegmentFilters/ProductGrams";
import ProductVendor from "./ProductSegmentFilters/ProductVendor";
import ProductTypeShopify from "./ProductSegmentFilters/ProductTypeShopify";
import ProductInventory_Management from "./ProductSegmentFilters/ProductInventory_Management";
import ProductStatus from "./ProductSegmentFilters/ProductStatus";

import ProductFilter from "./ProductFilter";
import { get_products_from_selected_catagory } from "../../features/product/ProductListAndSegment";
import { get_products_from_selected_segment } from "../../features/product/ProductListAndSegment";
import Grid from "@mui/material/Grid";
//import { makeStyles } from '@material-ui/core/styles';

import { EditCost,EditCurrentPrice,EditRegulerPrice } from "../../features/product/ProductListAndSegment";
import { Card } from "react-bootstrap";

import ViewInArIcon from '@mui/icons-material/ViewInAr';


import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import { debounce } from 'lodash';

//import { Modal, Paper, TextField } from '@mui/material';
import {Modal, Paper, TextField,ThemeProvider, createTheme } from '@mui/material';
import { forwardRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import InfoIcon from '@mui/icons-material/Info';
//import CopyAllTwoToneIcon from '@mui/icons-material/CopyAllTwoTone';
//import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';

var tableIcons = {
    Add: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <CheckBoxIcon {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutlineIcon {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <InfoIcon {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRightIcon {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeftIcon {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <ManageSearchIcon {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <FilterListIcon style={{color:'red'}} {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <RemoveCircleOutlineIcon {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumnIcon {...props} ref={ref} />)
};

function ProductListAndSegments() {

  var dispatch                = useDispatch();
  const defaultMaterialTheme  = createTheme();
  var [segname, setSegname]   = useState("Orders from last 6month/s");
  var shoptype      = useSelector((state) => state.dashTops.shoptype);
  var accountType   = useSelector((state) => state.dashTops.accountType);

 
  useEffect(() => {

    // if(accountType === "paid") {

    //   if (!ReactSession.get("get_product_segments")) {
    //     ReactSession.set("get_product_segments", "1");
    //     dispatch(get_product_segments({ ajax_call: 2 }));
    //   }
    //   if(shoptype==="woo"){
    //     if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
    //       ReactSession.set("get_product_and_catagory_and_sku_data", "1");
    //       dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
    //     }
    //   }
    //   if(shoptype==="shopify"){
    //     if (!ReactSession.get("get_shopify_product_and_sku_and_type")) {
    //       ReactSession.set("get_shopify_product_and_sku_and_type", "1");
    //       dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
    //     }
    //   }
    // }
    if (accountType === "paid") {
      if (!sessionStorage.getItem("get_product_segments")) {
        sessionStorage.setItem("get_product_segments", "1");
        dispatch(get_product_segments({ ajax_call: 2 }));
      }
    
      if (shoptype === "woo") {
        if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
          sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
          dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
        }
      }
    
      if (shoptype === "shopify") {
        if (!sessionStorage.getItem("get_shopify_product_and_sku_and_type")) {
          sessionStorage.setItem("get_shopify_product_and_sku_and_type", "1");
          dispatch(get_shopify_product_and_sku_and_type({ ajax_call: 2 }));
        }
      }
    }

  }, [])

 
  var Product_list_seg    = useSelector((state) => state.product_List_And_Segments);
  
  var WooProduct_table       = Product_list_seg?.product_table_object ?? [];
  var [WooProductTableData, setWooProductTableData] = useState(null);
  useEffect(() => {
      if (WooProduct_table.length > 0) {
        setWooProductTableData(structuredClone(WooProduct_table));
      }
  }, [WooProduct_table]);


  var shopify_product_table = Product_list_seg?.shopify_product ?? [];
  var [ShopifyProductTableData, setShopifyProductTableData] = useState(null);
  useEffect(() => {
      if (shopify_product_table.length > 0) {
        setShopifyProductTableData(structuredClone(shopify_product_table));
      }
  }, [shopify_product_table]);



  var Product_list_seg          = useSelector((state) => state.product_List_And_Segments);
  var woo_default_products      = Product_list_seg?.woo_default_product ?? [];
  var shopify_default_products  = Product_list_seg?.shopify_default_product ?? [];
  
  var defaultList = () => {
    if(shoptype==="woo"){
      if(woo_default_products.length > 0)
        setWooProductTableData(structuredClone(woo_default_products));
    }
    if(shoptype==="shopify"){
      if(shopify_default_products.length > 0)
      setShopifyProductTableData(structuredClone(shopify_default_products));
    }
  }
  
  var [filterList_, setfilterList]                  = useState([]);
  var [filts, setfils]                              = useState(["Catagory", "SKU", "Current_Price", "Height", "Width", "Length", "Weight", "Stock", "on_sale", "Type"]);
  var [shopify_filterList_, setShopify_filterList]  = useState([]);
  var [shopifyfilts, setShopifyfilts]               = useState(["Type", "SKU", "Current_Price","Stock","Grams" ,"Inventory_Management","vendor","status"]);
  

  const debounceMethod = useCallback(

    debounce(() => {
      
      const form  = document.getElementById('myForm');
      const fdata = new FormData(form);
      const data  = Object.fromEntries(fdata.entries());
      data["ajax_call"] = 1;
      console.log(data);
      setSegname("");
      setWooProductTableData(null);
      setShopifyProductTableData(null);
      if(shoptype === "woo" && accountType === "paid"){
        //dispatch(get_woo_filtered_product_data(data));
        dispatch(get_filtered_product_data(data))
      }
      if(shoptype === "shopify" && accountType === "paid"){
        dispatch(get_shopify_filtered_product_data(data));
      }
    }, 1200),
    []
  );
  
  

  var addfilter = (e, arg) => {
    // cus-Filter De-selested from Dropdown
    if (arg === 99) {
      // Get previous state
      var prev_state = JSON.parse(localStorage.getItem("shopex_Product_filts"));
      console.log(prev_state);

      // Get Removed state
      var removed_filter = prev_state.filter((x) => !e.includes(x));
      var remfil = removed_filter[0];

      var newfils = filterList_.filter((item) => item.key !== remfil);
      setfilterList(newfils);

      // Update The latest selected's as previous state in local-Storage
      localStorage.setItem("shopex_Product_filts", JSON.stringify(e));
    }

    // cus-Filter Selected from Dropdown
    if (arg !== 99) {
      localStorage.setItem("shopex_Product_filts", JSON.stringify(e));
      if (arg === "Products")       {setfilterList(filterList_.concat(<Products key={"Products"} onChange={debounceMethod} />));}
      if (arg === "Catagory")       {setfilterList(filterList_.concat(<ProductCatagory key={"Catagory"} onChange={debounceMethod} />));}
      if (arg === "SKU")            {setfilterList(filterList_.concat(<ProductSKU key={"SKU"} onChange={debounceMethod} />));}
      if (arg === "Current_Price")  {setfilterList(filterList_.concat(<ProductCurrentPrice key={"Current_Price"} onChange={debounceMethod} />));}
      if (arg === "Height")         {setfilterList(filterList_.concat(<ProductHeight key={"Height"} onChange={debounceMethod} />));}
      if (arg === "Width")          {setfilterList(filterList_.concat(<ProductWidth key={"Width"} onChange={debounceMethod} />));}
      if (arg === "Length")         {setfilterList(filterList_.concat(<ProductLength key={"Length"} onChange={debounceMethod} />));}
      if (arg === "Weight")         {setfilterList(filterList_.concat(<ProductWeight key={"Weight"} onChange={debounceMethod} />));}
      if (arg === "Stock")          {setfilterList(filterList_.concat(<ProductStock key={"Stock"} onChange={debounceMethod} />));}
      if (arg === "on_sale")        {setfilterList(filterList_.concat(<ProductOnSale key={"on_sale"} onChange={debounceMethod} />));}
      if (arg === "Type")           {setfilterList(filterList_.concat(<ProductType key={"Type"} onChange={debounceMethod} />));}
    }
  };


  var add_shopify_filter = (e,arg) => {
    if (arg === 99) {
      var prev_state = JSON.parse(localStorage.getItem("shopex_shopify_Product_filts"));
      console.log(prev_state);
      var removed_filter = prev_state.filter((x) => !e.includes(x));
      var remfil = removed_filter[0];
      var newfils = shopify_filterList_.filter((item) => item.key !== remfil);
      setShopify_filterList(newfils);
      localStorage.setItem("shopex_shopify_Product_filts", JSON.stringify(e));
    }
    //"Products", "Type", "SKU", "Current_Price","Stock","Grams" ,"Inventory_Management","vendor","status"
    if (arg !== 99) {
      localStorage.setItem("shopex_shopify_Product_filts", JSON.stringify(e));
      // if (arg === "Products")       {setShopify_filterList(shopify_filterList_.concat(<Products key={"Products"} />));}
      if (arg === "Type")                 {setShopify_filterList(shopify_filterList_.concat(<ProductTypeShopify key={"Type"} onChange={debounceMethod}/>));}
      if (arg === "SKU")                  {setShopify_filterList(shopify_filterList_.concat(<ProductSKU key={"SKU"} onChange={debounceMethod}/>));}
      if (arg === "Current_Price")        {setShopify_filterList(shopify_filterList_.concat(<ProductCurrentPrice key={"Current_Price"} onChange={debounceMethod}/>));}
      if (arg === "Stock")                {setShopify_filterList(shopify_filterList_.concat(<ProductStock key={"Stock"} onChange={debounceMethod}/>));}
      if (arg === "Grams")                {setShopify_filterList(shopify_filterList_.concat(<ProductGrams key={"Grams"} onChange={debounceMethod}/>));}
      if (arg === "Inventory_Management") {setShopify_filterList(shopify_filterList_.concat(<ProductInventory_Management key={"Inventory_Management"} onChange={debounceMethod}/>));}
      if (arg === "vendor")               {setShopify_filterList(shopify_filterList_.concat(<ProductVendor key={"vendor"} onChange={debounceMethod}/>));}
      if (arg === "status")               {setShopify_filterList(shopify_filterList_.concat(<ProductStatus key={"status"} onChange={debounceMethod}/>));}
      
    }
  } 

  var filterSubmit = (event) => {
    event.preventDefault();
    const fdata = new FormData(event.target);
    const data = Object.fromEntries(fdata.entries());
    data["ajax_call"] = 1;
    setSegname("");
    setWooProductTableData(null);
    if(shoptype === "woo" && accountType === "paid"){
      //dispatch(get_woo_filtered_product_data(data));
      dispatch(get_filtered_product_data(data))
    }
    if(shoptype === "shopify" && accountType === "paid"){
      dispatch(get_shopify_filtered_product_data(data));
    }
  };

  var [filterList1, setfilterList1] = useState([]);




  var [regularPriceChanged, setRegularPriceChanged] = useState(false);
  var [currentPriceChanged, setCurrentPriceChanged] = useState(false);
  var [costChanged, setCostChanged]                 = useState(false);
  var [stockChanged, setStockChanged]               = useState(false);


  var handleCogChange = (e) => {
    e.preventDefault();
    setCostChanged(true);
    //var id   = e.target.name;
    //var cost = e.target.value;
    //dispatch(EditCost({ id: id, cost: cost }));
  };

  var handle_Regular_Price_Change = (e) => {
    e.preventDefault();
    setRegularPriceChanged(true);
    //var id            = e.target.name;
    //var reguler_price = e.target.value;
    //dispatch(EditRegulerPrice({ id: id, reguler_price: reguler_price }));
  };

  var handle_Current_Price_Change = (e) => {
    e.preventDefault();
    setCurrentPriceChanged(true);
    //var id         = e.target.name;
    //var curr_price = e.target.value;
    //dispatch(EditCurrentPrice({ id: id, curr_price: curr_price }));
  };

  var handleStockChange = (e) => {
    e.preventDefault();
    setStockChanged(true);
    //var id   = e.target.name;
    //var cost = e.target.value;
    //dispatch(EditCost({ id: id, cost: cost }));
  };


  var Update_cog = (event) => {
    
    event.preventDefault();
    setCostChanged(false);
    const fdata = new FormData(event.target);
    const data = Object.fromEntries(fdata.entries());

    axios.post("https://server.shopex.io/products/product_cost_update.php", data, {withCredentials: true, })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  var Update_Current_price = (event) => {
    
    event.preventDefault();
    setCurrentPriceChanged(false);
    const fdata = new FormData(event.target);
    const data  = Object.fromEntries(fdata.entries());

    axios.post("https://server.shopex.io/webhooks/wh_update_product_current_price.php", data, {withCredentials: true, })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  var Update_Regular_price = (event) => {
    
    event.preventDefault();
    setRegularPriceChanged(false);
    const fdata = new FormData(event.target);
    const data = Object.fromEntries(fdata.entries());

    axios.post("https://server.shopex.io/webhooks/wh_update_product_regular_price.php", data, {withCredentials: true, })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  var Update_stock = (event) => {
    
    event.preventDefault();
    setStockChanged(false);
    const fdata = new FormData(event.target);
    const data  = Object.fromEntries(fdata.entries());

    axios.post("https://server.shopex.io/webhooks/wh_update_product_stock.php", data, {withCredentials: true, })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };


  var Product_segs = useSelector((state) => state.product_List_And_Segments);
  var Product_segs_ = Product_segs?.product_segments ?? [];
  var Segments_dropdownList = [];
  if (Product_segs_ && Product_segs_.length > 0) {
    for (var i of Product_segs_) {
      var value = i.id;
      var name  = i.name;
      if(value && name){
        Segments_dropdownList.push({ value: value, label : name });
      }
    }
  }

  //--
  var cat_obj        = useSelector((state) => state.product_List_And_Segments?.product_cat_table_object ?? {});
  var collection_obj = useSelector((state) => state.product_List_And_Segments?.shopify_collection ?? {});

  var dropdown_categories_or_collection = [];
  var cat_coll = null;
  if(shoptype == "woo"){
    cat_coll = cat_obj;
  }else if(shoptype == "shopify"){
    cat_coll = collection_obj;
  }

  if (cat_coll && Object.keys(cat_coll).length > 0) {
    for (var i of cat_coll) {
      var label = i.category_name;
      var value = i.category_id;
      if(label && value){
        dropdown_categories_or_collection.push({ value: value, label: label });
      }
    }
  }
  //--

  var [selectedSegment, setSelectedSegment]   = useState(null);
  var [selectedCategory, setSelectedCategory] = useState(null);


  var CPcross    = () => { setCurrentPriceChanged(false); }
  var RPcross    = () => { setRegularPriceChanged(false); }
  var Costcross  = () => { setCostChanged(false); }
  var Stockcross = () => { setStockChanged(false); }
  
  
  if(accountType === "demo") {

    var dropdown_categories_or_collection = [
      { value: '1', label: 'Electronics' },
      { value: '2', label: 'Apparel' },
      { value: '3', label: 'Home & Kitchen' },
      { value: '4', label: 'Beauty & Personal Care' },
      { value: '5', label: 'Sports & Outdoors' }
    ];

    var Segments_dropdownList = [
      { value: '1', label: 'segment 1' },
      { value: '2', label: 'segment 2' },
      { value: '3', label: 'segment 3' },
      { value: '4', label: 'segment 4' },
      { value: '5', label: 'segment 5' }
    ];

    
    if(shoptype === "woo") {

      var WooProductTableData = [
        {
          product_id: "101",
          product_name: "Product 1",
          product_type: "simple",
          reguler_price: 100,
          curr_price: 90,
          cog: 50,
          stock_quantity: 20,
        },
        {
          product_id: "102",
          product_name: "Product 2",
          product_type: "variable",
          variation_names: "Variation 1_&_Variation 2",
          variation_ids: "201_&_202",
          variation_reg_prices: "150_&_200",
          variation_curr_prices: "140_&_180",
          variation_costs: "70_&_100",
          variation_stock: "10_&_5",
          stock_quantity: 15,
        },
        {
          product_id: "103",
          product_name: "Product 3",
          product_type: "simple",
          reguler_price: 200,
          curr_price: 180,
          cog: 120,
          stock_quantity: 30,
        },
        {
          product_id: "103",
          product_name: "Product 4",
          product_type: "simple",
          reguler_price: 100,
          curr_price: 80,
          cog: 130,
          stock_quantity: 40,
        },
        {
          product_id: "103",
          product_name: "Product 5",
          product_type: "simple",
          reguler_price: 300,
          curr_price: 280,
          cog: 140,
          stock_quantity: 50,
        },
        {
          product_id: "103",
          product_name: "Product 6",
          product_type: "simple",
          reguler_price: 400,
          curr_price: 380,
          cog: 150,
          stock_quantity: 60,
        },
        {
          product_id: "103",
          product_name: "Product 7",
          product_type: "simple",
          reguler_price: 500,
          curr_price: 480,
          cog: 160,
          stock_quantity: 70,
        },
        {
          product_id: "103",
          product_name: "Product 8",
          product_type: "simple",
          reguler_price: 600,
          curr_price: 580,
          cog: 170,
          stock_quantity: 80,
        },
        {
          product_id: "103",
          product_name: "Product 9",
          product_type: "simple",
          reguler_price: 700,
          curr_price: 680,
          cog: 180,
          stock_quantity: 90,
        },
        {
          product_id: "103",
          product_name: "Product 10",
          product_type: "simple",
          reguler_price: 800,
          curr_price: 780,
          cog: 190,
          stock_quantity: 100,
        },
      ];
      
    }

    if(shoptype === "shopify") {

      var ShopifyProductTableData = [
        {
          product_id: "1001",
          product_name: "",
          product_type: "variable",
          variation_name: "Product A Variation 1",
          variation_ids: "2001",
          variation_reg_prices: "100",
          variation_curr_price: "90",
          variation_cost: "50",
          variation_stock: "10",
          variation_gram: "500",
          vendor: "Vendor X",
          status: "active"
        },
        {
          product_id: "1002",
          variation_name: "Product B",
          product_type: "simple",
          reguler_price: 150,
          curr_price: 140,
          cog: 70,
          stock_quantity: 20,
          vendor: "Vendor Y",
          status: "paused"
        },
        {
          product_id: "1003",
          product_name: "Product C",
          product_type: "variable",
          variation_name: "Product C Variation 3",
          variation_ids: "3001",
          variation_reg_prices: "200",
          variation_curr_price: "190",
          variation_cost: "100",
          variation_stock: "15",
          variation_gram: "1000",
          vendor: "Vendor Z",
          status: "active"
        },
        {
          product_id: "1004",
          product_name: "Product D",
          variation_name:"Product D",
          product_type: "simple",
          reguler_price: 180,
          curr_price: 160,
          cog: 90,
          stock_quantity: 30,
          vendor: "Vendor W",
          status: "active"
        },
        {
          product_id: "1005",
          product_name: "Product E",
          product_type: "variable",
          variation_name: "Variation 2",
          variation_ids: "4001",
          variation_curr_price: "290",
          variation_costs: "150",
          variation_stock: "20",
          variation_grams: "1500",
          vendor: "Vendor V",
          status: "paused"
        }
      ];

    }

  }

  var [wooSelectedFilterOptions,setWooSelectedFilterOptions]         = useState();
  var [shopifySelectedFilterOptions,setShopifySelectedFilterOptions] = useState();

  return (
    
    <>
      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Product : List and segments</h6>
        </div>
      </Grid>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{display:"flex"}}>
          {/* Filters dropdown list */}
          <div style={{width:"30%",marginRight:'10px'}}>
            
            {shoptype === "woo" && 
              <>
                <Multiselect isObject={false}  
                  placeholder=" +Search with filter" 
                  onRemove = { 
                    (selectedList, selectedItem) => {
                        if (selectedList.length > 0) {
                          addfilter(selectedList, 99);
                        }else{
                          setfilterList([]);
                          defaultList();
                        }
                    }
                  } 
                  
                  onSelect={(e) => {
                    addfilter(e, e[e.length - 1]); 
                    setSelectedCategory(null); 
                    setSelectedSegment(null);}
                  } 
                  options={filts} 
                  selectedValues={wooSelectedFilterOptions}
                  showCheckbox 
                />
              </> 
            } 

            { shoptype === "shopify" && 
                <>
                  <Multiselect isObject={false}  
                  placeholder=" + Find with filter" 
                  onRemove = { 
                    (selectedList, selectedItem) => {
                        if (selectedList.length > 0) {
                          add_shopify_filter(selectedList, 99);
                        }else{
                          setShopify_filterList([]);
                          defaultList();
                        }
                    }
                  } 
                  
                  onSelect={(e) => {
                      console.log(selectedCategory);
                      add_shopify_filter(e, e[e.length - 1]); 
                      setSelectedSegment(null);
                      setShopifySelectedFilterOptions(e);
                      setSelectedCategory(null); 
                    }
                  } 
                  options={shopifyfilts} 
                  selectedValues={shopifySelectedFilterOptions}
                  showCheckbox />
                </> 
            } 
            
          </div>

          {/* Segments dropdown list */}
          <div style={{width:"30%",marginRight:'10px'}}>
            
            {Segments_dropdownList && Segments_dropdownList.length > 0 && 
          
              <Multiselect displayValue="label" singleSelect={true} placeholder="Find from segments's"
                  onSelect={(selectedList, selectedItem) => {
                    if (selectedList.length > 0) {
                      //setSelectedSegment(selectedList[0].label,selectedList[0].value);
                      setSelectedSegment(selectedList[0]);

                      setSelectedCategory(null); 
                      {shoptype==="woo" && 
                        setWooSelectedFilterOptions(null);
                        setWooProductTableData(null);
                        setfilterList([]);
                      }
                      {shoptype==="shopify" && 
                        setShopifySelectedFilterOptions(null);
                        setShopifyProductTableData(null);
                        setShopify_filterList([])
                      }

                      dispatch(get_products_from_selected_segment({ id: selectedList[0].value}));
                    }
                  }}
                  onRemove={(removedItem, selectedList) => {
                    defaultList();
                  }}
                  options={Segments_dropdownList}
                  //selectedValues={selectedSegment ? [{ label: selectedSegment, value: selectedSegment }] : []}
                  selectedValues={selectedSegment ? [selectedSegment] : []}

                />
            }

          </div>

          {/* Category OR collection dropdown list */}
          <div style={{width:"25%"}}>
            {
              dropdown_categories_or_collection && dropdown_categories_or_collection.length > 0 && 
            
              <Multiselect displayValue="label" singleSelect={true} 
                placeholder={shoptype === "woo"  ? "Specific category"  : shoptype === "shopify" ? "Specific collection" : "" }
                onSelect={(selectedList, selectedItem) => {
                  
                  if(selectedList.length > 0) {

                    setSelectedCategory(selectedList[0]);
                    setSelectedSegment(null);
                    {shoptype==="woo" && 
                      setWooSelectedFilterOptions(null);
                      setWooProductTableData(null);
                      setfilterList([]);
                    }
                    {shoptype==="shopify" && 
                      setShopifySelectedFilterOptions(null);
                      setShopifyProductTableData(null);
                      setShopify_filterList([])
                    }
                    dispatch(get_products_from_selected_catagory({ id: selectedList[0].value, see_sin_cat: 1 }));
                  }
                }}
                onRemove={(removedItem, selectedList) => {
                  defaultList();
                }}
                options={dropdown_categories_or_collection} 
                // selectedValues={selectedCategory ? [{ label: selectedCategory, value: selectedCategory }] : []}
                // selectedValues={selectedCategory}
                selectedValues={selectedCategory ? [selectedCategory] : []}
              />
            }
          </div> 
        

        </Grid>



        <Grid item xs={12}>
          
          {/* Filter form  */}

          <form id="myForm" className="dash-card" onSubmit={filterSubmit}>
            
            {shoptype==="woo" && 
              <>
                {filterList_.length > 0 && 
                  <div className="input-filters">
                    <strong> To create a product segment based on filter(s) above, provide a relevant name : </strong>
                    <input type="text" name="segname" size="45" placeholder="Insert segment name" style={{padding: "5px", fontSize: "17px"}}/>
                  </div>
                }
                {filterList_}
                {filterList_.length > 0 && 
                  <Button style={{marginTop: ".5rem",height:"35px"}} className="period-btn" variant="contained" color="secondary" type="submit"> 
                    filter product
                  </Button>
                }
              </>
            }

            {shoptype==="shopify" && 
              <>
                {shopify_filterList_.length > 0 && 
                  <div className="input-filters">
                    <strong> To create a product segment based on filter(s) above, provide a relevant name : </strong>
                    <input type="text" name="segname" size="45" placeholder="Insert segment name" style={{padding: "5px", fontSize: "17px"}}/>
                  </div>
                }
                {shopify_filterList_}
                {shopify_filterList_.length > 0 && 
                  <Button style={{marginTop: ".5rem",height:"35px"}} className="period-btn" variant="contained" color="secondary" type="submit"> 
                    filter product
                  </Button>
                }
              </>
            }

          </form>

        </Grid>



        {/* Product List */}
        {/* Title , vendor, price , grams, status, stock , inventory management */}
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{paddingTop:"0px"}}>

          <Card className="dash-card" style={{padding:"0%"}}>
          
            {shoptype === "woo" && 
              <>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    {
                      WooProductTableData == null && (
                        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                        </Stack>
                    )}

                      { WooProductTableData && 
                  
                        <MaterialTable

                        sx={{ 
                          [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                          [`& .td`]:{padding:'2px!important'},
                        }}

                          columns={[
                            
                            {
                              
                              title: "", 
                              cellStyle: {
                                textAlign: 'left', 
                                borderBottom:"0px",
                              },
                              headerStyle: {
                                  textAlign: 'left', 
                              },
                              field: "name", 

                              filterComponent: (props) => (
                                <input
                                  type="text"
                                  placeholder="Search..."
                                  onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                                  style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                                />
                              ),

                              customFilterAndSearch: (filterValue, rowData) => {
                                return rowData.product_name.toLowerCase().includes(filterValue.toLowerCase());
                              },
                              
                              render: (row) => 
                                <span style={{ minWidth:'15vw',maxWidth:'20vw',borderBottomLeftRadius: "16px", borderTopLeftRadius: "16px",width: "-webkit-fill-available",backgroundColor: "rgba(76, 110, 245, 0.08)",
                                          color: "rgb(76, 110, 245)",textAlign:'left',float: "left"}}>  
                                  <a href={"/Products/" + row.product_id} style={{verticalAlign : "test-top",textDecoration: "none",padding: "0px"}}> 
                                    <ViewInArIcon style={{verticalAlign: "middle",fontSize: "32px",color: "slateblue",border: "1px solid",}}/>&nbsp;{row.product_name}
                                  </a>
                                  <br/>
                                  <span style={{fontSize:'11px',paddingLeft:'14%',display:'none'}}>{row.product_id}</span>
                                </span>
                            },

                            {
                              
                              title: (<p style={{color:"crimson",fontSize: "medium"}}>Regular Price</p>),
                              filtering: false,
                              type:"numeric",
                              align:"left",
                              render: (row) => {

                                if (row.product_type === "variable") {

                                  var variation_names       = row.variation_names.split('_&_');
                                  var variation_ids         = row.variation_ids.split('_&_');
                                  var variation_reg_prices  = row.variation_reg_prices.split('_&_');

                                  return (
                                    <>
                                      {variation_names.map((variation, index) => (
                                        <>
                                          <input style={{width:"70%","border":'0px!important',"borderBottom":"0.6px solid","display":'flex',"justifyContent":"left","fontWeight":"700"}} 
                                                key={variation_ids[index]} 
                                                name={`productPrices[${row.product_id}][${variation_ids[index]}]`}
                                                form="RegularPriceform"  
                                                type="number" 
                                                placeholder={variation_reg_prices[index]}  
                                                onChange={handle_Regular_Price_Change}
                                              />
                                          <br/>
                                          <span style={{fontSize:'10px',maxWidth:'10vw'}}> <span style={{color:'crimson'}}> {index+1}. </span>  {variation} </span> 
                                          <br/>
                                        </>
                                      ))}
                                    </>
                                  );

                                } else {
                                    return <input style={{float:'left'}} name={row.product_id} form="RegularPriceform" type="number" placeholder={row.reguler_price} onChange={handle_Regular_Price_Change}/>;
                                }
                              },

                              customSort: (a, b) => a.reguler_price - b.reguler_price,
                              headerStyle: {
                                textAlign: 'start', 
                              },
                            },


                            { 
                              title: ( <p style={{color:"slateblue",fontSize: "medium"}}>CurrentPrice</p> ),
                              filtering: false,
                              type:"numeric",
                              align:"left",
                              render: (row) => {

                                if (row.product_type === "variable") {

                                  var variation_names       = row.variation_names.split('_&_');
                                  var variation_ids         = row.variation_ids.split('_&_');
                                  var variation_curr_prices = row.variation_curr_prices.split('_&_');
                                
                                  return (
                                    <>
                                      {variation_names.map((variation, index) => (
                                        <>
                                        
                                          
                                          <input style={{width:"70%","border":'0px!important',"borderBottom":"0.6px solid","display":'flex',"justifyContent":"left","fontWeight":"700"}} 
                                            key={variation_ids[index]} 
                                            name={`productPrices[${row.product_id}][${variation_ids[index]}]`}
                                            form="CurrentPriceform"  
                                            type="number" 
                                            placeholder={variation_curr_prices[index]}  
                                            onChange={handle_Current_Price_Change}/>
                                          <br/>
                                          <span style={{fontSize:'10px',maxWidth:'10vw'}}> 
                                            variation {index+1}
                                          </span> 
                                          <br/>
                                        </>
                                      ))}
                                    </>
                                  );
                                } else {
                                    return <input style={{float:'left'}} name={row.product_id} form="CurrentPriceform" type="number" placeholder={row.curr_price} onChange={handle_Current_Price_Change}/>;
                                }
                              },

                              customSort: (a, b) => a.curr_price - b.curr_price,
                              headerStyle: {
                                textAlign: 'start', 
                              },
                            },


                            { 
                              
                              title: (<p style={{color:"teal",fontSize: "medium"}}>Cost</p>),
                              filtering: false,
                              field: "cog", 
                              type:"numeric",
                              align:"left",
                              render: (row) => {

                                if (row.product_type === "variable") {

                                  var variation_names       = row.variation_names.split('_&_');
                                  var variation_ids         = row.variation_ids.split('_&_');
                                  var variation_costs       = row.variation_costs.split('_&_');
                                  
                                  return (
                                    <>
                                      {variation_names.map((variation, index) => (
                                        <>
                                          <input style={{width:"70%","border":'0px!important',"borderBottom":"0.6px solid","display":'flex',"justifyContent":"left","fontWeight":"700"}} 
                                                key={variation_ids[index]} 
                                                name={`productCost[${row.product_id}][${variation_ids[index]}]`}
                                                form="cogform"  
                                                type="number" 
                                                placeholder={variation_costs[index]}  
                                                onChange={handleCogChange}/>
                                          <br/>
                                          <span style={{fontSize:'10px',maxWidth:'10vw'}}> 
                                          variation {index+1} 
                                          </span> 
                                          <br/>
                                        </>
                                      ))}
                                    </>
                                  );
                                } else {
                                  return <input style={{float:'left'}} name={row.product_id} form="cogform" type="number" placeholder={row.cog} onChange={handleCogChange}/>;
                                }
                                
                              },


                              customSort: (a, b) => a.cog - b.cog,
                              
                              headerStyle: {
                                textAlign: 'start', 
                              },

                            },


                            { 
                              
                              title: ( <p style={{color:"darkmagenta",fontSize: "medium"}}>StockCount</p> ),
                              filtering: false,
                              field:"stock_quantity",
                              type:"numeric",
                              align:"left",
                              render: (row) => {

                                
                                if (row.product_type === "simple") {
                                  return (
                                    <>
                                      <input style={{float:'left'}} name={row.product_id} form="stockform" type="number" placeholder={row.stock_quantity} onChange={handleStockChange}/>
                                    </>
                                  )
                                }

                                if (row.product_type === "variable") {

                                  var variation_names       = row.variation_names.split('_&_');
                                  var variation_ids         = row.variation_ids.split('_&_');
                                  var variation_stock       = row.variation_stock.split('_&_');
                                  
                                  return (
                                    <>

                                      <input name={row.product_id} form="stockform" type="number" placeholder={row.stock_quantity} onChange={handleStockChange}/>
                                      <br/>
                                      <span style={{fontSize:'10px'}}> Total </span> 
                                      <br/>
                                      {variation_names.map((variation, index) => (
                                        <>
                                          <input style={{width:"70%","border":'0px!important',"borderBottom":"0.6px solid","display":'flex',"justifyContent":"left","fontWeight":"700"}} 
                                                key={variation_ids[index]} 
                                                name={`productStock[${row.product_id}][${variation_ids[index]}]`}
                                                form="stockform"  
                                                type="number" placeholder={variation_stock[index]}  
                                                onChange={handleStockChange}/>
                                          <br/>
                                          <span style={{fontSize:'10px',maxWidth:'10vw'}}> 
                                            variation {index+1} 
                                          </span> 
                                          <br/>
                                        </>
                                      ))}
                                    </>
                                  );

                                } 
                                
                              },

                              //headerStyle: { textAlign: 'start' },
                            },

                            
                            {
                              align:"left",
                              title: "Type", 
                              field: "product_type",
                              filterComponent: (props) => (
                                <input type="text" placeholder="Search..."
                                  onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                                  style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                                />
                              ),

                              customFilterAndSearch: (filterValue, rowData) => {
                                return rowData.product_type.toLowerCase().includes(filterValue.toLowerCase());
                              },
                            },
                            
                          ]}

                          components={{

                            Toolbar: (props) => (
                            
                              <div>
                            
                                <MTableToolbar {...props} />
                            
                                <div style={{ padding: '5px', display: 'flex', alignItems: 'center',fontSize:"16px" }}>
                                  
                                  { regularPriceChanged && 
                                    <span style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",border: "1px solid",color: "crimson",}}>
                                      <Button style={{verticalAlign: "top",marginRight: "15px"}} form="RegularPriceform" type="submit">Save Regular-Price</Button>
                                      <CancelIcon style={{cursor:'pointer',paddingBottom: "2px"}}  onClick={RPcross}/>
                                    </span>
                                  }
                                  &nbsp;&nbsp;


                                  { currentPriceChanged && 
                                    <span style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",border: "1px solid",color: "slateblue",}}>
                                      <Button style={{verticalAlign: "top",marginRight: "15px"}} form="CurrentPriceform" type="submit">Save Curr-Price</Button>
                                      <CancelIcon style={{cursor:'pointer',paddingBottom: "2px"}}  onClick={CPcross}/>
                                    </span>
                                  }
                                  &nbsp;&nbsp;

                                  
                                  { costChanged && 
                                    <span style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",border: "1px solid",color: "teal",}}>
                                      <Button style={{verticalAlign: "top",marginRight: "15px"}} form="cogform" type="submit">Save cost</Button>
                                      <CancelIcon style={{cursor:'pointer',paddingBottom: "2px"}}  onClick={Costcross}/>
                                    </span>
                                  }


                                  &nbsp;&nbsp;
                                
                                  { stockChanged && 
                                    <span style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",border: "1px solid",color: "darkmagenta",}}>
                                      <Button style={{verticalAlign: "top",marginRight: "15px"}} form="stockform" type="submit">Save stock</Button>
                                      <CancelIcon style={{cursor:'pointer',paddingBottom: "2px"}}  onClick={Stockcross}/>
                                    </span>
                                  }


                                </div>


                              </div>

                            ),

                          }}


                          data={WooProductTableData}
                          
                          title="Current Products"

                          icons={tableIcons}

                          options={{
                            filtering: true ,
                            pageSize: 15,
                            showFirstLastPageButtons: false, // make initial page size
                            emptyRowsWhenPaging: false, // To avoid of having empty rows
                            pageSizeOptions: [10, 15, 25, 40, 50],
                            //search: true,
                            searchFieldAlignment: "right",
                            exportButton: true,
                            exportAllData: true,
                            cellStyle: {
                              padding: "4px",
                              lineHeight: 2,
                              fontFamily: "system-ui",
                              textAlign: "center",
                              //borderBottom: "2px solid rgb(246, 224, 224)",
                            },
                            headerStyle:{
                              paddingLeft:"0px",
                            },

                            rowStyle: (rowData, index) => ({
                              backgroundColor: index % 2 === 1 && rowData.tableData.id % 2 === 1 ? 'ghostwhite' : 'white',
                            }),

                          }}
                          
                          localization={{
                            pagination: {
                              labelRowsPerPage: "",
                              showFirstLastPageButtons: false,
                            },
                          }}

                        />
                      }
                    

                  </ThemeProvider>
              </>
            }

            {shoptype === "shopify" && 
              
              <>
              
                <ThemeProvider theme={defaultMaterialTheme}>
            
                  {
                    ShopifyProductTableData == null && (
                      <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                          <LinearProgress color="secondary" />
                          <LinearProgress color="success" />
                      </Stack>
                  )}

                    { ShopifyProductTableData && 
                
                      <MaterialTable
                      
                        columns={[
                          
                          {
                            
                            title: "", 
                            cellStyle: {
                              textAlign: 'left', 
                              borderBottom:"0px",
                            },
                            headerStyle: {
                                textAlign: 'left', 
                            },
                            field: "variation_name", 

                            filterComponent: (props) => (
                              <input type="text" placeholder="Search..." onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                                style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                              />
                            ),
                            customFilterAndSearch: (filterValue, rowData) => {
                              return rowData.variation_name.toLowerCase().includes(filterValue.toLowerCase());
                            },
                            
                            render: (row) => 
                              <span style={{ minWidth:'15vw',maxWidth:'20vw',borderBottomLeftRadius: "16px", borderTopLeftRadius: "16px",width: "-webkit-fill-available",backgroundColor: "rgba(76, 110, 245, 0.08)",
                                        color: "rgb(76, 110, 245)",textAlign:'left',float: "left"}}>  
                                <a href={"/Products/" + row.product_id} style={{verticalAlign : "test-top",textDecoration: "none",padding: "0px"}}> 
                                  <ViewInArIcon style={{verticalAlign: "middle",fontSize: "32px",color: "slateblue",border: "1px solid",}}/>&nbsp;
                                  {row.variation_name}
                                </a>
                                <br/>
                                <span style={{fontSize:'11px',paddingLeft:'14%',display:'none'}}>{row.product_id}</span>
                              </span>
                          },

                          { 
                            title: (<p style={{color:"slateblue",fontSize: "medium"}}>CurrentPrice</p>),
                            field: "variation_curr_price", 
                            filtering: false,
                            type:"numeric",
                            customSort: (a, b) => a.variation_curr_price - b.variation_curr_price,
                            headerStyle: {
                              textAlign: 'start', 
                            },
                          },


                          { 
                            title: (
                              <>
                                <p style={{color:"teal",fontSize: "medium"}}>Cost</p>
                              </>
                            ),
                            filtering: false,
                            field: "variation_cost", 
                            type:"numeric",
                            render: (row) => {<input name={row.product_id} form="cogform" type="number" placeholder={row.variation_cost} onChange={handleCogChange}/>;},
                            customSort: (a, b) => a.cog - b.cog,
                            headerStyle: { textAlign: 'start',},
                          },

                          { 
                            title: (<p style={{color:"darkmagenta",fontSize: "medium"}}>In-Stock</p>),
                            filtering: false,
                            field:"variation_stock",
                            type:"numeric",
                            render: (row) => {
                              <input name={row.product_id} form="stockform" type="number" placeholder={row.variation_stock} onChange={handleStockChange}/>
                            },
                            headerStyle: { textAlign: 'start' },
                          },

                          
                          {
                            title: "Type", 
                            field: "product_type",
                            filterComponent: (props) => (
                              <input type="text" placeholder="Search..."
                                onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                                style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                              />
                            ),

                            customFilterAndSearch: (filterValue, rowData) => {
                              return rowData.product_type.toLowerCase().includes(filterValue.toLowerCase());
                            },
                          },

                          

                          {
                            title: "In-Gram", 
                            field: "variation_grams",
                            filterComponent: (props) => (
                              <input type="text" placeholder="Search..."
                                onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                                style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                              />
                            ),

                            customFilterAndSearch: (filterValue, rowData) => {
                              return rowData.variation_grams.toLowerCase().includes(filterValue.toLowerCase());
                            },
                          },



                          {
                            title: "Vendor", 
                            field: "vendor",
                            filterComponent: (props) => (
                              <input type="text" placeholder="Search..."
                                onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                                style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                              />
                            ),

                            customFilterAndSearch: (filterValue, rowData) => {
                              return rowData.vendor.toLowerCase().includes(filterValue.toLowerCase());
                            },
                          },


                          {
                            title: "Status", 
                            field: "status",
                            filterComponent: (props) => (
                              <input type="text" placeholder="Search..."
                                onChange={(event) => props.onFilterChanged(props.columnDef.tableData.id, event.target.value)}
                                style={{ width:"100%", borderRadius:"0px", border:"0px",outline:"none", display:"flex", textAlign:"-webkit-center", marginLeft:"2px", borderRight:"3px solid lightgrey" }}
                              />
                            ),

                            customFilterAndSearch: (filterValue, rowData) => {
                              return rowData.status.toLowerCase().includes(filterValue.toLowerCase());
                            },
                          },
                          
                        ]}

                        components={{

                          Toolbar: (props) => (
                          
                            <div>
                          
                              <MTableToolbar {...props} />
                          
                              <div style={{ padding: '5px', display: 'flex', alignItems: 'center',fontSize:"16px" }}>
                                
                                { costChanged && 
                                  <span style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",border: "1px solid",color: "teal"}}>
                                    <Button style={{verticalAlign: "top",marginRight: "15px"}} form="cogform" type="submit">Save cost</Button>
                                    <CancelIcon style={{cursor:'pointer',paddingBottom: "2px"}}  onClick={Costcross}/>
                                  </span>
                                }


                              </div>


                            </div>

                          ),

                        }}

                        data={ShopifyProductTableData}
                        title="Current Products"
                        icons={tableIcons}

                        options={{
                          filtering: true ,
                          pageSize: 15,
                          showFirstLastPageButtons: false, // make initial page size
                          emptyRowsWhenPaging: false, // To avoid of having empty rows
                          pageSizeOptions: [10, 15, 25, 40, 50],
                          //search: true,
                          searchFieldAlignment: "right",
                          exportButton: true,
                          exportAllData: true,
                          cellStyle: {
                            padding: "4px",
                            lineHeight: 2,
                            fontFamily: "system-ui",
                            textAlign: "center",
                            //borderBottom: "2px solid rgb(246, 224, 224)",
                          },

                          rowStyle: (rowData, index) => ({
                            backgroundColor: index % 2 === 1 && rowData.tableData.id % 2 === 1 ? 'ghostwhite' : 'white',
                          }),

                        }}
                        
                        localization={{
                          pagination: {
                            labelRowsPerPage: "",
                            showFirstLastPageButtons: false,
                          },
                        }}
        
                      />
                    }
              
                </ThemeProvider>
              
              </>
            
            }
          
          </Card>

        </Grid>
      
        <form onSubmit={Update_cog} id="cogform"> </form>

        <form onSubmit={Update_stock} id="stockform"> </form>

        <form onSubmit={Update_Regular_price} id="RegularPriceform"> </form>

        <form onSubmit={Update_Current_price} id="CurrentPriceform"> </form>
      
      </Grid>
    </>

  );

}

export default ProductListAndSegments;
