import React, { useState, useEffect } from "react";
import "./App.css";
import MaterialTable from "material-table";
import { Checkbox, Select, MenuItem } from "@material-ui/core";
import Modal from "./Modal"
const URL = "http://localhost:4000/DataStreams";
let oldSeg = "all";

function DataTable() {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [segment, setSegment] = useState("all");
  const [show, setShow] = useState(false);
  const [idNum, setIdNum] = useState(1);
  useEffect(()=>{
    getDataList()
  },[]);

  const getDataList=()=> {
    fetch(URL).then(resp=>resp.json())
    .then(resp=>setData(resp))
  };

  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Vendor name", field: "Vendor name"},
    {title: "Test Coloum", field: "tester", hidden: true},
    {
      title: "More Info",
      render: (rowData) => (
        <button onClick={() => handleClickModal(rowData["id"])}>
          More Info </button> 
          )},
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

  function handleClickModal(Id) {
    setIdNum(Id);
    setShow(!show);
  }

  const handleCheck = () => {
    setFilter(!filter);
  }

  useEffect(() => {
    if((segment !== "all" && oldSeg !== "all") || (segment === "all" && oldSeg !== "all")) {
      window.location.reload();
    }
    // console.log(segment, oldSeg);
    setData(segment === 'all'? data : data.filter(dt => dt["Main Users of Data"] === segment));
    oldSeg = segment;
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
          draggable: true,
          paginationType: "stepped",
          exportButton: true
        }}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              console.log(newRow);
              let newID = findID(data);
              newRow.id = newID;
              fetch(URL,{
                method: "POST",
                headers:{
                  "Content-type": "application/json"
                },
                body: JSON.stringify(newRow)
              }).then(resp=>resp.json()).then(resp=>getDataList())
              .then(resolve());
            }),
      

          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              fetch(`${URL}/${selectedRow.id}`,{
                method: "DELETE",
                headers:{
                  "Content-type": "application/json"
                },
              }).then(resp=>resp.json()).then(resp=>getDataList())
              .then(resolve());
            }),

          onRowUpdate: (updatedRow, oldRow) =>
            new Promise((resolve, reject) => {
              console.log(updatedRow);
              fetch(`${URL}/${oldRow.id}`,{
                method: "PUT",
                headers:{
                  "Content-type": "application/json"
                },
                body: JSON.stringify(updatedRow)
              }).then(resp=>resp.json()).then(resp=>getDataList())
              .then(resolve());
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
          onChange={(e) => {
            setSegment(e.target.value);
          }}
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
      <Modal
        show={show}
        idNumber={idNum}
        onClose={() => setShow(false)}
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
    if( data[i].startsWith("https://www.myworkday.com")){
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
