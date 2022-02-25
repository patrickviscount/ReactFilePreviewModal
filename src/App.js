import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table';
import dataList from "./data/data.json";

function DataTable() {

  const [data, setData] = useState(dataList)
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Vendor name", field: "Vendor name" },
    { title: "Vendor contact", field: "Vendor contact" }, 
    { title: "Buisness Unit Acquiring", field: 'Buisness Unit Acquiring', },
    { title: "Lead Data Steward", field: "Lead Data Steward", },
    { title: "Business Contact", field: "Business Contact" },
    { title: "Main Users of Data", field: "Main Users of Data" },
    { title: "Brief Desc of Data Used", field: "Brief Desc of Data Used" },
    { title: "Value Dervied From Data", field: "Value Dervied From Data" },
    { title: "Contracts in Zycus", field: "Contracts in Zycus" },
    { title: "IT Source", field: "IT Source" }
  ] 
 

  return (
    <div className="App">
      <h1 align="center">DataTable using the Material Table library</h1>
      <h4 align='center'>Please see the react component below: ADD HYPERLINKS TO WORKDAY FOR PEOPLE</h4>
      <MaterialTable
        title="3rd Party Vendors"
        data={data}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            
            var newID = findID(data);
            // console.log(`newID: ${newID}`);
            const updatedRows = [...data,{id: newID,...newRow}];
            setTimeout(()=>{
              setData(updatedRows);
              resolve();
            }, 1000);
          }),

          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const index = (selectedRow.tableData.id);
            // console.log(index);
            const updatedRows = [...data];
            updatedRows.splice(index, 1);
            console.log(updatedRows);
            setTimeout(()=>{
              setData(updatedRows);
              resolve();
            }, 1000);
          }),

          onRowUpdate: (updatedRow, oldRow) => new Promise((resolve,reject) => {
            const index=oldRow.tableData.id;
            const updatedRows=[...data];
            updatedRows[index]= updatedRow;
            setTimeout(() => {
              setData(updatedRows);
              resolve();
            }, 1000);
          })

        }}
        options = {{
          actionsColumnIndex: -1,
          addRowPosition: "first"
        }}
      />
    </div>
  );
}

function findID(dataStream) {
  let data = dataStream.sort((a, b) => a.id - b.id);
  // console.log(data);
  let id = 1;
  for(let i = 0; i < data.length; i++){
    // console.log(`data[i].id value ${data[i].id}`)
    // console.log(`id value ${id}`);
    if (data[i].id == id){
      id++;
    }
  }
  return id;
}



export default DataTable;