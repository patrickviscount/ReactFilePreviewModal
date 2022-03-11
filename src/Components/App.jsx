import React, { useState, useEffect } from "react";
import "./App.css";
import MaterialTable from "material-table";
import { Checkbox, Select, MenuItem } from "@material-ui/core";
import Modal from "./Modal";
var checker = 1;

function DataTable() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [view, setView] = useState(true);
  const [segment, setSegment] = useState("all");
  const [show, setShow] = useState(false);
  const [idNum, setIdNum] = useState(1);
  const [file, setFile] = useState("");

  useEffect(() => {
    setFile("../../test.pdf");
  }, []);

  const getColumns = () => {
    if (checker === 1) {
      columns[0].hidden = true;
      columns[3].hidden = true;
      columns[4].hidden = true;
      columns[6].hidden = true;
      columns[9].hidden = true;
      columns[10].hidden = true;
      columns[11].hidden = true;
    }
    return columns;
  };

  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Vendor name", field: "Vendor name" },
    {
      title: "More Info",
      render: (rowData) => (
        <button onClick={() => handleClickModal(rowData["id"])}>
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
    {
      title: "IT Source",
      field: "IT Source",
      hidden: true,
      hiddenByColumnsButton: true
    }
  ];

  function handleClickModal(Id) {
    setIdNum(Id);
    setShow(!show);
  }

  const handleColumns = () => {
    setView(!view);
    if (checker === 0) {
      checker = 1;
    } else {
      checker = 0;
    }
    getColumns();
  };

  const handleCheck = () => {
    setFilter(!filter);
  };

  return (
    <div className="App">
      <h1 align="center">DataTable using the Material Table library</h1>
      <h4 align="center">Please see the react component below</h4>
      <button onClick={() => handleClickModal(1)}>
        {" "}
        open react document viewer popup
      </button>
      <MaterialTable
        title="3rd Party Vendors"
        data={Array.from(data)}
        columns={getColumns()}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          filtering: filter,
          search: true,
          draggable: true,
          paginationType: "stepped"
        }}
        actions={[
          {
            icon: () => (
              <Checkbox
                checked={view}
                onChange={handleColumns}
                inputProps={{ "aria-label": "primary checkbox" }}
                color="primary"
              />
            ),
            tooltip: "Hide/Show Columns",
            isFreeAction: true
          },
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
                onChange={(e) => {
                  setSegment(e.target.value);
                }}
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
      <Modal show={show} file={file} onClose={() => setShow(false)} />
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
      if (data[i].startsWith("https://www.myworkday.com")) {
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
