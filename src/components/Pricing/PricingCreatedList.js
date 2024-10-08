import React, { useEffect, useState } from "react";
import axios from "axios";

//import MaterialTable from "material-table";
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { useSelector, useDispatch } from "react-redux";

import { get_pricing_current_rules } from "../../features/DynamicPricing/CurrentRules";

import Quantity from "./PricingType/Quantity";
import GiftProduct from "./PricingType/GiftProduct";
import DiscountOnEntireShop from "./PricingType/DiscountOnEntireShop";
import CategoryDiscount from "./PricingType/CategoryDiscount";

// import store,{injectAsyncReducer} from "../../app/NewStore";
// import { Pricing_Current_Rules_Slice } from "../../features/DynamicPricing/CurrentRules";
// import { pricing_rule_List_Slice }  from "../../features/DynamicPricing/CreatedRules";

import { Get_Product_Purchase_Based_Cus_Seg_Obj } from "../../features/product/ProductPurchaseBasedCusSeg";
import { get_product_and_catagory_and_sku_data } from "../../features/product/ProductListAndSegment";
import Grid from "@mui/material/Grid";

// import EditNoteIcon from '@mui/icons-material/EditNote';
// import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
// import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Button from "@mui/material/Button";
import { editRoleStatus } from "../../features/DynamicPricing/CurrentRules";

import { Modal, Paper, TextField,ThemeProvider, createTheme } from '@mui/material';
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

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';


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



function PricingCreatedList() {

  var accountType = useSelector((state) => state.dashTops.accountType);
  var rolePower   = useSelector((state) => state.dashTops.rolePower);
  if (rolePower === 3) {
    window.location.href = "/dashboard";
  }


  var defaultMaterialTheme            = createTheme();
  var dispatch                        = useDispatch();
  var [createdRules, setCreatedRules] = useState([]);

  
  useEffect(() => {

    // if(accountType === "paid") {

    //   if (!ReactSession.get("Get_Product_Purchase_Based_Cus_Seg_Obj")) {
    //     ReactSession.set("Get_Product_Purchase_Based_Cus_Seg_Obj", "1");
    //     dispatch(Get_Product_Purchase_Based_Cus_Seg_Obj({ ajax_call: 2 }));
    //   }

    //   if (!ReactSession.get("get_pricing_current_rules")) {
    //     ReactSession.set("get_pricing_current_rules", "1");
    //     dispatch(get_pricing_current_rules({ ajax_call: 99 }));
    //   }

    //   if (!ReactSession.get("get_product_and_catagory_and_sku_data")) {
    //     ReactSession.set("get_product_and_catagory_and_sku_data", "1");
    //     dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
    //   }

    // }

    if (accountType === "paid") {
      if (!sessionStorage.getItem("Get_Product_Purchase_Based_Cus_Seg_Obj")) {
        sessionStorage.setItem("Get_Product_Purchase_Based_Cus_Seg_Obj", "1");
        dispatch(Get_Product_Purchase_Based_Cus_Seg_Obj({ ajax_call: 2 }));
      }
    
      if (!sessionStorage.getItem("get_pricing_current_rules")) {
        sessionStorage.setItem("get_pricing_current_rules", "1");
        dispatch(get_pricing_current_rules({ ajax_call: 99 }));
      }
    
      if (!sessionStorage.getItem("get_product_and_catagory_and_sku_data")) {
        sessionStorage.setItem("get_product_and_catagory_and_sku_data", "1");
        dispatch(get_product_and_catagory_and_sku_data({ ajax_call: 2 }));
      }
    }

  }, []);


  var Cus_Purchase_based_segment = useSelector((state) => state.Product_Purchase_Based_Customer_List_and_Segment);
  var Cus_Purchase_based_segment = Cus_Purchase_based_segment?.Product_Purchase_Based_Cus_Segment_Obj ?? [];


  //if(demo_value!=1){
  var rules = useSelector((state) => state.Pricing_current_rules)?.CurrentRules ?? null;
  //}

  if(accountType === "demo"){

    var demoRules = [
      {
        name: "Rule 1",
        status: "non-active",
        type: "Quantity",
        segment_name: "Segment A",
        schedule: "2030-07-05 To 2030-08-05",
      },
      {
        name: "Rule 2",
        status: "non-active",
        type: "Gift",
        segment_name: "Segment B",
        schedule: "2030-07-05 To 2030-08-05",
      },
      {
        name: "Rule 3",
        status: "non-active",
        type: "Category discount",
        segment_name: "Segment C",
        schedule: "2030-07-05 To 2030-08-05",
      },
      {
        name: "Rule 4",
        status: "non-active",
        type: "Discount on entire shop",
        segment_name: "Segment C",
        schedule: "2030-07-05 To 2030-08-05",
      },
    ];
  }


  useEffect(() => {
    if (rules && rules.length > 0 && accountType === "paid") {
      setCreatedRules(structuredClone(rules));
    }
    if(accountType==="demo"){
      setCreatedRules(demoRules);
    }
  }, [rules]);


  var product_obj     = useSelector((state) => state.product_List_And_Segments)?.product_table_object ?? null;
  var product_cat_obj = useSelector((state) => state.product_List_And_Segments)?.product_cat_table_object ?? null;

  var [edit, setEditrule] = useState(null);
  var [opened, setOpened] = useState(false);

  var EditRule = (Name, Type) => {
    
    setEditrule(null);
    setOpened(true);

    if(accountType === "paid"){

      axios.post("https://server.shopex.io/dynamicpricing/dpp_single_pricing_rule.php", {name: Name,ajax_call: "2"},{ withCredentials: true })
        .then(function (response) {
        
          var ruletype      = response.data.onerule[0].type;
          var OFFER_name    = response.data.onerule[0].name;
          var schedule      = response.data.onerule[0].schedule;
          var status        = response.data.onerule[0].status;
          var osrun         = response.data.onerule[0].osrun;
          var pr            = response.data.onerule[0].pr;

          var from          ="";
          var to            ="";
          var schedule_type ="";

          var schedule = schedule.split(" To ");
          if(schedule[0].length != 1 && schedule[1].length !== 1){
            from = new Date(schedule[0]);
            to   = new Date(schedule[1]);
            schedule_type = "tl";
          }else{
            schedule_type = "manual";
          }


          var Target_segment_Name = "";
          var Target_segment_Id = response.data.onerule[0].target_segment;

          for (var i of Cus_Purchase_based_segment) {
            if (Target_segment_Name === "") {
              if (Target_segment_Id === i.id) {
                Target_segment_Name = i.name;
              }
            }
          }

          if (ruletype === "q_dis") {

            var offer_on_pro_or_cat = "";
            var offer_on_id = "";
            var cars = [];
            var Qdis_AvailableForProduct = [];
            var Qdis_AvailableForCategory = [];

            var sinrule = response.data.onerule;

            for (var i of sinrule) {

              var dtail = i.dtail;

              //console.log(i);

              offer_on_pro_or_cat = i.offer_on_pro_or_cat;
              offer_on_id = i.offer_on_id;

              var dtailArray = dtail.split("_next_");

              var from          = dtailArray[0];
              var to            = dtailArray[1];
              var discount      = dtailArray[2];
              var discount_type = dtailArray[3];

              var car = {from: from, to: to, offer: discount, type: discount_type};
              cars.push(car);
              cars = cars.filter((car, index) => {
                return index === cars.findIndex((c) => (
                    c.from === car.from && c.to === car.to && c.offer === car.offer && c.type === car.type
                ));
              });


              if (offer_on_pro_or_cat === "prod") {
                if (product_obj && product_obj.length > 0) {
                  for (var j of product_obj) {
                    if (offer_on_id === j.product_id) {
                      var found = Qdis_AvailableForProduct.find( (element) => element.value === offer_on_id );
                      if (found === undefined) {
                        Qdis_AvailableForProduct.push({
                          value: j.product_id,
                          label: j.product_name,
                        });
                      }
                    }
                  }
                }
              } else if (offer_on_pro_or_cat === "cat") {
                if (product_cat_obj && product_cat_obj.length > 0) {
                  for (var j of product_cat_obj) {
                    if (offer_on_id === j.catagory_id) {
                      var found = Qdis_AvailableForCategory.find( (element) => element.value === offer_on_id );
                      if (found === undefined) {
                        Qdis_AvailableForCategory.push({
                          value: j.catagory_id,
                          label: j.catagory_name,
                        });
                      }
                    }
                  }
                }
              }
            }

            setEditrule(null);
            setEditrule(
              <Quantity
                key={"Quantity"}
                target_segment_name={Target_segment_Name}
                target_segment_id={Target_segment_Id}
                offername={OFFER_name}
                schedule_type={schedule_type}
                schedule_from = {from}
                schedule_to = {to}
                osrun={osrun}
                status={status}
                pr={pr}
                qt={cars}
                for_category={Qdis_AvailableForCategory}
                for_product={Qdis_AvailableForProduct}
                offer_on_pro_or_cat={offer_on_pro_or_cat}
              />
            );
          } else if (ruletype === "gift_dis") {
            //function resolveAfter2Seconds(x) {

            var Product_or_Category = response.data.onerule[0].offer_on_pro_or_cat;

            var minITEM   = response.data.onerule[0].dtail.split("_next_")[3];
            var minAMOUNT = response.data.onerule[0].dtail.split("_next_")[4];

            var sinrule = response.data.onerule;
            //console.log(sinrule);

            //  Gift Available on Products ID -OR- Category ID
            var gift_available_for_product = [];
            var gift_available_for_category = [];

            for (var i of sinrule) {

              var dtail = i.dtail;
              var dtailArray = dtail.split("_next_");
              if (Product_or_Category === "prod") {
                gift_available_for_product.push(dtailArray[1]);
              } else if (Product_or_Category === "cat") {
                gift_available_for_category.push(dtailArray[1]);
              }
            
            }

            var giftAvailableForProduct = [];
            var giftAvailableForCategory = [];

            var product_options_init = [];
            if (product_obj && product_obj.length > 0) {
              for (var i of product_obj) {
                var label = i.product_name;
                var value = i.product_id;
                product_options_init.push({ value: value, label: label });
              }
            }

            if (Product_or_Category === "prod") {
              if (product_obj && product_obj.length > 0) {
                for (var i of gift_available_for_product) {
                  for (var j of product_obj) {
                    if (i === j.product_id) {
                      giftAvailableForProduct.push({
                        value: j.product_id,
                        label: j.product_name,
                      });
                    }
                  }
                }
              }
            } else if (Product_or_Category === "cat") {
              if (product_cat_obj && product_cat_obj.length > 0) {
                for (var i of gift_available_for_category) {
                  for (var j of product_obj) {
                    if (i === j.product_id) {
                      giftAvailableForCategory.push({
                        value: j.product_id,
                        label: j.product_name,
                      });
                    }
                  }
                }
              }
            }
            //  Gift Available on Products ID -OR- Category ID

            //  Offer As Gift -ID'S-
            var gift_pre_selected = [];

            var gifts = sinrule[0].dtail.split("_next_")[2].split("next_gift");
            if (product_obj && product_obj.length > 0) {
              for (var i of gifts) {
                for (var j of product_obj) {
                  if (i === j.product_id) {
                    gift_pre_selected.push({
                      value: j.product_id,
                      label: j.product_name,
                    });
                  }
                }
              }
            }

            var giftfor_List = "";
            if (giftAvailableForProduct.length > 0) {
              giftfor_List = giftAvailableForProduct;
            } else if (giftAvailableForCategory.length > 0) {
              giftfor_List = giftAvailableForCategory;
            }

            var obj = {
              type: "gift",
              target_segment_name: Target_segment_Name,
              target_segment_id: Target_segment_Id,
              offername: OFFER_name,
              products: product_options_init,
              gifts: gift_pre_selected,       // available as gift
              giftfor: Product_or_Category,   // prod or cat 
              giftfor_List: giftfor_List,     // gift available if these prod or cat bought
              minItem: minITEM,
              minAmount: minAMOUNT,
            };

            //return  obj;
            setEditrule(null);
            setEditrule(
              <GiftProduct
                key={"GiftProduct"}
                target_segment_name={Target_segment_Name}
                target_segment_id={Target_segment_Id}
                offername={obj.offername}
                schedule_type={schedule_type}
                schedule_from = {from}
                schedule_to = {to}
                products={product_options_init}
                gifts={gift_pre_selected}                   // available as gift
                giftfor={Product_or_Category}               // prod or cat 
                giftfor_List={giftfor_List}                 // gift available if these prod or cat bought
                minItem={minITEM}
                minAmount={minAMOUNT}
                osrun={osrun}
                status={status}
                pr={pr}
              />
            );
          } else if (ruletype === "entire") {
            setEditrule(null);
            setEditrule(
              <DiscountOnEntireShop
                key={"DiscountOnEntireShop"}
                data={response.data}
                schedule_type={schedule_type}
                schedule_from = {from}
                schedule_to = {to}
                target_segment_name={Target_segment_Name}
              />
            );
            //data,schedule_type,schedule_from,schedule_to,Target_segment_Name,Target_SegmentId,offer_name
          } else if (ruletype === "catdis") {
            setEditrule(null);
            setEditrule(
              <CategoryDiscount
                key={"CategoryDiscount"}
                data={response.data}
                schedule_type={schedule_type}
                schedule_from = {from}
                schedule_to = {to}
                offer_name={OFFER_name}
                Target_SegmentId={Target_segment_Id}
                Target_segment_Name={Target_segment_Name}
                osrun={osrun}
              />
            );
          }
        })

        .catch(function (error) {
          console.log(error);
        });
    }

  };

  var DeleteRule = (Name, Type) => {};

  var ChangeStatus = (name, status) => {
    
    let _status="";
    if(status == 1){_status=0;}
    else if(status == 0){_status = 1;} 

    dispatch(editRoleStatus({name: name,status: _status}));
    if(accountType === "paid"){
      axios.post("https://server.shopex.io/dynamicpricing/dpdis_status_changing.php",{name: name,status:status,ajax_call: "2"},{ withCredentials: true })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
    }

  };

  // var useStyles = makeStyles(theme => ({
  //   table: {
  //     '& tbody>.MuiTableRow-root:hover': {
  //       boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)", 
  //     },
  //     '& tbody .MuiTableCell-root': {
  //       padding: "8px!important",
  //     },
  //   },
  // }));
  // var classes = useStyles();
  
  


  return (
    
    <>

      <Grid container className="top-wrap" style={{padding: "0% 0% 3% 0%"}}>
        <div className="notifications">
          <h6>Pricing : Available  </h6>
        </div>
      </Grid>

      <Grid className="pricing" container> 

        <Grid item md={12}>
          
          {/* <ThemeProvider theme={defaultMaterialTheme}>
          {
            createdRules && createdRules.length > 0 && 
            
            <MaterialTable style={{borderRadius: "14px",marginRight: "10px",marginBottom: "5%",marginTop: "2%"}}
              columns={[
                {title: "status",field: "status",render: (row) =>(
                  <Button 
                    onClick={() => {
                      ChangeStatus(row.name, row.status);
                    }} 
                    variant="contained" color="info">
                      {row.status == 1 && <strong> Running </strong>} 
                      {row.status == 0 && <strong> Not-Running </strong>}
                  </Button>)
                },
                {title: "Name",field: "name",render: (row) => (<div style={{ background: "ghostwhite" }}> {row.name} </div>)},
                {title: "Type",field: "type",render: (row) => (<div style={{ background: "whitesmoke" }}> {row.type} </div>)},
                {title: "Target-segment",field: "segment_name",render: (row) => (<div style={{ background: "ghostwhite" }}>{row.segment_name}</div>)},
                {title: "Edit",field: "",render: (row) => (<Button onClick={() => {EditRule(row.name, row.type);}} variant="contained" color="info">Edit-Rule</Button>)},
                {title: "Schedule",field: "schedule",render: (row) => (<div style={{ background: "ghostwhite" }}>{row.schedule}</div>)},
                {title: "Delete",field: "",render: (row) => (<Button onClick={() => {DeleteRule(row.name, row.type);}} variant="contained" color="warning" >Delete</Button>),},
              ]}

              data={createdRules}
              title="Created rules"
              icons={{
                Check: Check,
                DetailPanel: ChevronRight,
                Export: SaveAlt,
                Filter: FilterList,
                FirstPage: FirstPage,
                LastPage: LastPage,
                NextPage: ChevronRight,
                PreviousPage: ChevronLeft,
                Search: Search,
              }}
              options={{
                pageSize: 10, // make initial page size
                emptyRowsWhenPaging: false, // To avoid of having empty rows
                pageSizeOptions: [10, 15, 25, 40, 50],
                search: true,
                searchFieldAlignment: "right",
                exportButton: true,
                exportAllData: true,
                cellStyle: {
                  padding: "2px",
                },
                headerStyle: {
                  backgrounor: "#01579b",
                  or: "#FFF",
                },
              }}
              localization={{
                pagination: {
                  labelRowsPerPage: "",
                },
                header: {
                  actions: "",
                },
              }}
            />
          }
          </ThemeProvider> */}

          <ThemeProvider theme={defaultMaterialTheme}>
          
            <div style={{borderRadius: "0px"}}>
            {
              createdRules && createdRules.length > 0 && 
              
              <MaterialTable 
                
                sx={{ 
                  [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                  [`& .td`]:{padding:'2px!important'},
                }}
                
                style={{padding:'10px',borderRadius: "0px",marginBottom: "5px",marginTop: "0%"}}
                
                columns={[
                
                  {title: "Name",sorting: false ,field: "name",render: (row) => (<div style={{ minWidth:'15vw',maxWidth:'20vw' }}> {row.name} </div>)},
                    
                  {
                    title: "status",field: "status",render: (row) =>(
                    
                    row.status == 1 ?  ( 
                    
                        <Button style={{backgroundColor: "white",color: "green",padding:"0px",border:'0px',borderBottom: "1px solid",fontSize: "12px",borderRadius:"0px"}}
                        
                          onClick={() => {
                            ChangeStatus(row.name, row.status);
                          }} 
                          variant="contained" color="info">
                          <span> Active </span>
                            
                        </Button>
                      
                      ) : ( 
                        
                        <Button style={{backgroundColor: "white",color: "red",padding:"0px",border: "2px solid",fontSize: "12px",borderRadius:"0px"}}
                        
                          onClick={() => {
                            ChangeStatus(row.name, row.status);
                          }} 
                          variant="contained" color="info">
                          <span> Paused </span>
                        </Button>
                      )
                    
                  )},
                  
                  {title: "Type",sorting: false ,field: "type",render: (row) => (<div style={{ }}> {row.type} </div>)},
                  
                  {title: "Target-segment",sorting: false ,field: "segment_name",render: (row) => (<div style={{ minWidth:'15vw',maxWidth:'20vw' }}>{row.segment_name}</div>)},
                  
                  {title: "Edit",sorting: false ,field: "",
                    render: (row) => (
                      <Button style={{"border":"0px","background":"white","padding":"0px","color":"yellowgreen","borderRadius":"0px","borderBottom":"1px solid"}}
                        onClick={() => {
                          EditRule(row.name, row.type);
                        }} 
                        variant="contained" color="info"> Edit
                      </Button>
                    )
                  },

                  {title: "Schedule",sorting: false ,field: "schedule",render: (row) => (<div style={{ }}>{row.schedule}</div>)},
                  
                  {title: "Delete",sorting: false ,field: "",
                    render: (row) => (
                      <Button style={{"border":"0px","background":"white","padding":"0px","color":"red","borderRadius":"0px","borderBottom":"1px solid"}}
                        onClick={() => {
                          DeleteRule(row.name, row.type);
                        }} 
                        variant="contained" color="warning">  Delete
                      </Button>
                    )
                  },

                ]}

                data={createdRules}
                title="Created pricing offers"
                icons={tableIcons}
                
                options={{

                  pageSize: 15, // make initial page size
                  emptyRowsWhenPaging: false, // To avoid of having empty rows
                  pageSizeOptions: [15, 15, 25, 40, 50],
                  search: true,
                  searchFieldAlignment: "right",
                  exportButton: true,
                  exportAllData: true,

                  cellStyle: {
                    fontFamily: "Montserrat",
                    textAlign: "right",
                    padding:'0px!important',
                    borderTop:"0px",
                    borderBottom:"0px",
                    borderLeft:"1px solid lightgray",
                    borderRight:"1px solid lightgray",
                  },

                  headerStyle: {
                    fontFamily: "Montserrat",
                    textAlign: "right",
                    fontWeight:700,
                    padding: "0px",
                    backgroundColor: "rgba(76, 110, 245, 0.1)",
                    color: "rgb(76, 110, 245)",
                    border: "0px",
                    padding: "0px 16px 0px 0px",
                    height: "40px",
                    fontSize: "18px"
                  },

                  rowStyle: (rowData, index) => ({
                    backgroundColor: index % 2 === 0 && rowData.tableData.id % 2 === 0 ? 'ghostwhite' : 'white',
                  }),
                }}

                localization={{
                  pagination: {
                    labelRowsPerPage: "",
                  },
                  header: {
                    actions: "",
                  },

                }}

              />
            }
            </div>
          
          </ThemeProvider>
        
        </Grid>

        {/* <Grid item md={12}>
          <div>{edit}</div>
        </Grid> */}

        <Grid item md={12}>

          <Modal open={opened} overflow="inside" style={{overflowY:'scroll'}}
            
            // overlayColor={theme.colorScheme === "dark"? theme.colors.dark[9]: theme.colors.gray[2]}  
            
            overlayOpacity={0.55} overlayBlur={3}  size="70%"
            
            onClose={() => setOpened(false)}>
              
            {/* <Paper style={{ padding: "20px",maxWidth: "60vw",height: "fit-content", margin: "5vh auto auto" }}>
            
              {edit}
              
            </Paper> */}

            <Paper style={{ padding: "20px", maxWidth:'70vw', margin: "7vh 0vh 0vh 40vh" }}>
                      
              {   
                edit !== null ? (

                  <> {edit} </>
                
                ) : ( 
                  <>
                    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                      <LinearProgress color="secondary" />
                      <LinearProgress color="success" />
                    </Stack>
                  </>
                )
              }

            </Paper>

          </Modal>

        </Grid>
        
      </Grid>

    </>

  );

}

export default PricingCreatedList;
