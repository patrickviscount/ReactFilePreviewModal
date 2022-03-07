import React, { useState, useEffect } from "react";
import "./App.css";
import MaterialTable from "material-table";
import dataList from "./data/data.json";
import { Checkbox, Select, MenuItem } from "@material-ui/core";
import Modal from "./modal.js";

function DataTable() {
  const [data, setData] = useState(dataList);
  const [filter, setFilter] = useState(false);
  const [segment, setSegment] = useState("all");
  const [show, setShow] = useState(false);
  const [idNum, setIdNum] = useState(1);
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Vendor name", field: "Vendor name" },
    {
      title: "More Info",
      render: (rowData) => (
        <button onClick={() => handleClickModal(rowData["id"])}>
          {" "}
          More Info{" "}
        </button>
      )
    },
    { title: "Vendor contact", field: "Vendor contact" },
    { title: "Buisness Unit Acquiring", field: "Buisness Unit Acquiring" },
    {
      title: "Lead Data Steward",
      field: "Lead Data Steward",
      render: (rowData) => (
        <div>
          {" "}
          {rowData["Lead Data Steward"]} |
          <a
            href={`${findURL(rowData)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Contact{" "}
          </a>{" "}
        </div>
      )
    },
    {
      title: "Business Contact",
      field: "Business Contact",
      render: (rowData) => (
        <div>
          {" "}
          {rowData["Business Contact"]} |
          <a
            href={`${findURL(rowData)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Contact{" "}
          </a>{" "}
        </div>
      )
    },
    { title: "Main Users of Data", field: "Main Users of Data" },
    { title: "Brief Desc of Data Used", field: "Brief Desc of Data Used" },
    { title: "Value Dervied From Data", field: "Value Dervied From Data" },
    { title: "Contracts in Zycus", field: "Contracts in Zycus" },
    { title: "IT Source", field: "IT Source" }
  ];

  function handleClickModal(idNumber) {
    let id = idNumber - 1;
    setShow(!show);
    setIdNum(id);
  }

  const handleCheck = () => {
    setFilter(!filter);
    // console.log(dataList);
    // console.log(dataList.length);
    // dataList[dataList.length] = {
    // "id": dataList.length,
    // "Vendor name": "IJ INC",
    // "Vendor contact": "peter@xx.com",
    // "Buisness Unit Acquiring": "All",
    // "Lead Data Steward": "LA Lakers",
    // "Business Contact": "Patrick Viscount",
    // "Main Users of Data": "Insurance",
    // "Brief Desc of Data Used": "global variable checking",
    // "Value Dervied From Data": "Risk Assesment",
    // "Contracts in Zycus": "H1Z1Z0MB13S",
    // "IT Source": "",
    // "WorkdayLink": "hi"
    // };
    // console.log(dataList.length);
    // dataList[dataList.length-1].id = "";
    // console.log(dataList);
  };

  useEffect(() => {
    setData(
      segment === "all"
        ? dataList
        : dataList.filter((dt) => dt["Main Users of Data"] === segment)
    );
  }, [segment]);

  return (
    <div className="App">
      <h1 align="center">DataTable using the Material Table library</h1>
      <h4 align="center">Please see the react component below</h4>

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
          exportButton: true,
          exportCsv: (columns, data) => {
            alert(
              "You should develop a code to export " + data.length + " rows"
            );
            console.log(data);
          }
        }}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              var newID = findID(data);
              const updatedRows = [...data, { id: newID, ...newRow }];
              setTimeout(() => {
                setData(updatedRows);
                console.log(updatedRows);
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
        actions={[
          {
            icon: () => (
              <Checkbox
                checked={filter}
                onChange={handleCheck}
                inputProps={{ "aria-label": "primary checkbox" }}
                color="primary"
              />
            ),
            tooltip: "Hide/Show Filter",
            isFreeAction: true
          },
          {
            icon: () => (
              <Select
                labelId="demo-simple-select-label"
                id="demo-select-simple"
                style={{ width: 100 }}
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
              >
                <MenuItem value={"all"}> All </MenuItem>
                <MenuItem value={"Insurance"}> Insurance </MenuItem>
                <MenuItem value={"Re-insurance"}> Re-insurance </MenuItem>
                <MenuItem value={"Admin"}> Admin </MenuItem>
              </Select>
            ),
            tooltip: "Filter Users of Data",
            isFreeAction: true
          }
        ]}
      />
      <Modal
        show={show}
        idNum={idNum}
        onClose={() => setShow(false)}
        title={dataList[idNum]["Vendor name"]}
      >
        <ul>
          <li> Vendor name: {dataList[idNum]["Vendor name"]}</li>
          <li> Vendor contact: {dataList[idNum]["Vendor contact"]}</li>
          <li> Buisness Unit Acquiring: {dataList[idNum]["Buisness Unit Acquiring"]}</li>
          <li> Lead Data Steward: {dataList[idNum]["Lead Data Steward"]}</li>
          <li> Business Contact: {dataList[idNum]["Business Contact"]}</li>
          <li> Main Users of Data: {dataList[idNum]["Main Users of Data"]}</li>
          <li> Brief Desc of Data Used: {dataList[idNum]["Brief Desc of Data Used"]}</li>
          <li> Value Dervied From Data: {dataList[idNum]["Value Dervied From Data"]}</li>
          <li> Contracts in Zycus: {dataList[idNum]["Contracts in Zycus"]}</li>
          <li> IT Source: {dataList[idNum]["IT Source"]}</li>
          <li> <div>
          <a
            href={`${findURL(dataList[idNum])}`}
            target="_blank"
            rel="noopener noreferrer" >
            Relevant Contact
          </a>
        </div></li>
        </ul>
      </Modal>
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
      if (data[i].startsWith("https")) {
        url = data[i];
        return url;
      } else if (data[i].startsWith("mailtdo")) {
        url = data[i];
      }
    }
    if (url === "") {
      url = "https://www.axiscapital.com/";
    }
    return url;
  } else {
    return "https://www.axiscapital.com/";
  }
}

export default DataTable;
