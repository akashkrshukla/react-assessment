import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import Profiles from './Profiles'

const ClientManagement = () => {
  //  const token = localStorage.getItem('token')
  const [data, setData] = useState();
  const [enable, setEnable] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  const [filter, setFilter] = useState();
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  function dateFilter(e) {
    fetch(
      "https://staging.jobportalapi.atwpl.com//adminportal/onboard_clients/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ from_date: min, to_date: max }),
      }
    )
      .then((response) => response.json())
      .then((data) => setFilter(data.data));
    // console.log(min);
  }

  useEffect(() => {
    fetch(
      "https://staging.jobportalapi.atwpl.com//adminportal/onboard_clients/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => setData(response.data))
      .then()
      .catch((err) => console.log(err));
  }, []);

  function handleAction(id) {
    console.log(id, "id");
    fetch(
      "https://staging.jobportalapi.atwpl.com//adminportal/disable_recruiter/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ recruiter_id: id }),
      }
    );
  }
  useEffect(() => {
    console.log(data);
  }, [data]);
  const columns = [
    {
      name: "Company Name",
      selector: (row) => row.username,
    },
    {
      name: "Transaction History",
      selector: (row) => row.created_at.slice(0, 10),
    },
    {
      name: "Balance Credits",
      selector: (row) => row.available_credits,
    },
    {
      name: "Used Credits",
      selector: (row) => row.used_credits,
    },
    {
      name: "Carry Forward",
      cell: (rows) => (
        <>
          {rows.status === "DISABLED" ? <button
              className="disable-btn btn-sm text-danger btn-outline-danger px-3 rounded-4"
            >
              Disable
              {/* {enable && clickedId === row.id ? "Enable" : "Disable"} */}
            </button> : (
            <button
              className="btn btn-sm
      btn-outline-danger
    px-3 rounded-4"
              onClick={(row) => {
                console.log("sec row", rows);
                setClickedId(rows.id);
                handleAction(rows.user);
                // clickedId === row.id && setEnable(!enable)
              }}
            >
              Disable
              {/* {enable && clickedId === row.id ? "Enable" : "Disable"} */}
            </button>
          )}
        </>
      ),
      // cell: (row) => <button className={` btn btn-sm ${enable && clickedId === row.id ? "btn-outline-success" : "btn-outline-danger"} px-3 rounded-4`} onClick={()=>setClickedId=== row.id && setEnable(!enable)}}>{enable && clickedId === row.id ?'Enable':'disable'}</button>
    },
  ];

  return (
    <div>
      <div className=" d-flex justify-content-between mb-3 align-items-center">
        <h2 className=" mb-0 heading">On-boarded Clients</h2>
        <div className="">
          <input
            type="date"
            placeholder="enter"
            className=" custom-input"
            onChange={(e) => setMin(e.target.value)}
          />{" "}
          <span className=" mx-5">To</span>
          <input
            type="date"
            placeholder="enter"
            className=" custom-input"
            name="toDate"
            onChange={(e) => setMax(e.target.value)}
          />
          <button className="mx-3 btn admin-btn" onClick={dateFilter}>
            Show Data
          </button>
        </div>
      </div>
      {filter ? (
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 65px - 54px - 72px)"
          columns={columns}
          data={filter}
          pagination
        />
      ) : (
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 65px - 54px - 72px)"
          columns={columns}
          data={data}
          pagination
        />
      )}
    </div>
  );
};

export default ClientManagement;
