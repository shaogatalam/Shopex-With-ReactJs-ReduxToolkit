import React from "react";
import Grid from "@mui/material/Grid";
import MaterialTable from '@material-table/core';
import "rsuite/dist/rsuite.css";
import "react-datepicker/dist/react-datepicker.css";
import './SegmentLogStyle.css'; 
import {ThemeProvider, createTheme } from '@mui/material';
import { forwardRef } from 'react';
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

var styles = {"background": "#059669","color":"white","borderTopRightRadius": "32px", "borderBottomRightRadius": "32px", "width": "fit-content","padding": "10px"};

const DashBasket = ({frequently_bought_together_table_column,frequently_bought_together_table_data,
                    purchase_recom_table_column,purchase_recom_table_data}) => {

    var defaultMaterialTheme = createTheme();

    return (

        <>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                <h5 style={styles}>  Frequently bought together </h5>

                {frequently_bought_together_table_data && (

                <ThemeProvider theme={defaultMaterialTheme}>
                    
                    <MaterialTable
                        sx={{ 
                            [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                            [`td`]:{padding:'12px!important',cursor:'pointer'},
                        }}
                        columns={frequently_bought_together_table_column}
                        data={frequently_bought_together_table_data}
                        title={""}
                        icons={tableIcons}
                        options={{
                        sortIcon: true,
                        draggable: true, 
                        sorting: true, 
                        showFirstLastPageButtons: false,
                        pageSize: 10, 
                        emptyRowsWhenPaging: false, 
                        pageSizeOptions: [10, 15, 25, 40, 50],
                        search: false,
                        cellStyle: {
                            fontFamily: "Montserrat",
                            textAlign: "right",
                            padding:'7px',
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
                        },
                        rowStyle :  {}
                        }}

                        localization={{
                        pagination: {
                            labelRowsPerPage: "",
                            showFirstLastPageButtons: false,
                        },
                        }}
                    />

                </ThemeProvider>
                
                )}

            </Grid>


            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                <h5 style={styles}> Purchase Recommendations  </h5>

                {purchase_recom_table_data && (

                <ThemeProvider theme={defaultMaterialTheme}>

                    <MaterialTable
                    sx={{ 
                        [`& .MuiTableRow-root:hover`]: { boxShadow: "inset 0px 0px 0px 2px rgba(3, 102, 214, 0.6)"}, 
                        [`td`]:{padding:'12px!important',cursor:'pointer'},
                    }}
                    columns={purchase_recom_table_column}
                    data={purchase_recom_table_data}
                    title={""}
                    icons={tableIcons}
                    options={{
                        sortIcon: true,
                        draggable: true, 
                        sorting: true, 
                        showFirstLastPageButtons: false,
                        pageSize: 10, 
                        emptyRowsWhenPaging: false, 
                        pageSizeOptions: [10, 15, 25, 40, 50],
                        search: false,
                        cellStyle: {
                        fontFamily: "Montserrat",
                        textAlign: "right",
                        padding:'7px',
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
                        },
                        rowStyle :  {}
                    }}

                    localization={{
                        pagination: {
                        labelRowsPerPage: "",
                        showFirstLastPageButtons: false,
                        },
                    }}
                    />
                
                </ThemeProvider>
                
                )}

            </Grid>

        </>
    )
}

export default DashBasket