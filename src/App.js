import React, { useState, useEffect } from "react";
import "./App.css";
import MaterialTable from "material-table";
import dataList from "./data/data.json";
import { Checkbox, Select, MenuItem } from "@material-ui/core";

function DataTable() {

  const [data, setData] = useState(dataList);
  const [filter, setFilter] = useState(false);
  const [segment, setSegment] = useState("all");
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Vendor name", field: "Vendor name" },
    { title: "Vendor contact", field: "Vendor contact" },
    { title: "Buisness Unit Acquiring", field: "Buisness Unit Acquiring" },
    {
      title: "Lead Data Steward",
      field: "Lead Data Steward",
      render: (rowData) => <div> {rowData["Lead Data Steward"]} |<a href={`${findURL(rowData)}`} target="_blank" rel="noopener noreferrer"> Contact </a> </div>
    },
    {
      title: "Business Contact",
      field: "Business Contact",
      render: (rowData) => <div> {rowData["Business Contact"]} |<a href={`${findURL(rowData)}`} target="_blank" rel="noopener noreferrer"> Contact </a> </div>
    },
    { title: "Main Users of Data", field: "Main Users of Data" },
    { title: "Brief Desc of Data Used", field: "Brief Desc of Data Used" },
    { title: "Value Dervied From Data", field: "Value Dervied From Data" },
    { title: "Contracts in Zycus", field: "Contracts in Zycus" },
    { title: "IT Source", field: "IT Source" }
  ];

  const handleCheck = () => {
    setFilter(!filter);
  }

  useEffect(() => {
    setData(segment === 'all'? dataList : dataList.filter(dt => dt["Main Users of Data"] === segment))
  }, [segment]);

  return (
    <div className="App">
      <h1 align="center">DataTable using the Material Table library</h1>
      <h4 align="center">
        Please see the react component below
      </h4>

      <MaterialTable
        title="3rd Party Vendors"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          filtering: filter,
          search: true,
          draggable: true
        }}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              var newID = findID(data);
              // console.log(`newID: ${newID}`);
              const updatedRows = [...data, { id: newID, ...newRow }];
              setTimeout(() => {
                setData(updatedRows);
                resolve();
              }, 1000);
            }),

          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const index = selectedRow.tableData.id;
              // console.log(index);
              const updatedRows = [...data];
              updatedRows.splice(index, 1);
              console.log(updatedRows);
              setTimeout(() => {
                setData(updatedRows);
                resolve();
              }, 1000);
            }),

          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              const index = oldRow.tableData.id;
              const updatedRows = [...data];
              updatedRows[index] = updatedRow;
              setTimeout(() => {
                setData(updatedRows);
                resolve();
              }, 1000);
            })
        }}
      actions = {[
        {
        icon:() => 
        <Checkbox
        checked = {filter}
        onChange={handleCheck}
        inputProps={{'aria-label': 'primary checkbox'}}
        color="primary"
        />,
        tooltip:"Hide/Show Filter",
        isFreeAction: true
        },
        {
          icon: () => 
          <Select
          labelId="demo-simple-select-label"
          id="demo-select-simple"
          style={{width: 100}}
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          >
          <MenuItem value={"all"}> All </MenuItem>
          <MenuItem value={"Insurance"}> Insurance </MenuItem>
          <MenuItem value={"Re-insurance"}> Re-insurance </MenuItem>
          <MenuItem value={"Admin"}> Admin </MenuItem>
          </Select>,
          tooltip: "Filter Users of Data",
          isFreeAction: true
        }
      ]}
      />
    </div>
  );
}

function findID(dataStream) {
  let data = dataStream.sort((a, b) => a.id - b.id);
  let id = 1;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      id++;
    }
  }
  return id;
}

function findURL(dataStream) {
  if (dataStream.WorkdayLink) {
  let data = dataStream.WorkdayLink.split(" ");
  let url = "";
  
  for (let i = 0; i < data.length; i++) {
    if( data[i].startsWith("https")){
      url = data[i];
      return url;
    }
    else if (data[i].startsWith("mailtdo")) {
      url = data[i];
    }
  }
  if (url === "") {
    url = "https://www.axiscapital.com/";
  }
  return url;
  }
  else {
    return "https://www.axiscapital.com/";
  }
}

export default DataTable;
