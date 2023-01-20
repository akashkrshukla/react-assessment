// import { filter } from 'core-js/core/array'
import { useEffect, useState } from "react";
import { cilFindInPage } from "@coreui/icons";

import CIcon from "@coreui/icons-react";

import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

// import Profiles from './Profiles'

const JobPostManagement = () => {
  const [data, setData] = useState([]);
  const [clickedId, setClickedId] = useState(null);

  const [selected, setSelected] = useState(null);

  const [titlesearch, setTitlesearch] = useState([]);

  const [filter, setFilter] = useState();

  // function changeHandler(event) {
  //   setSelected(event.target.value);
  //   console.log(selected);
  // }
  function searchHandler(data) {
    // console.log(data,"prsen tadata");

    fetch(
      `https://staging.jobportalapi.atwpl.com/adminportal/all_vacancies/?keyword=${titlesearch}`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())

      .then((response) => setFilter(response.data))

      .catch((err) => console.log(err));
  }
  function myFunction() {
    Swal.fire("Vacancy Verified Successfully");
  }

  function myFunction1() {
    Swal.fire("Vacancy Disapproved");
  }
  const filtered = data.filter((item) => item.title === "Python Developer");
  console.log(filtered);

  // const filterHandler=()=>{
  //   setData(filtered)
  // }

  async function disapproveHandle(data) {
    await fetch(
      "https://staging.jobportalapi.atwpl.com/adminportal/reject_vacancy/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ vacancy_id: data }),
      }
    )
      .then((response) => response.json())
      .then((err) => console.log(err));
  }

  function approveHandle(data) {
    console.log(data, "prsen tadata");
    fetch(
      "https://staging.jobportalapi.atwpl.com//adminportal/verify_vacancy/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ vacancy_id: data }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    fetch("https://staging.jobportalapi.atwpl.com/adminportal/all_vacancies/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  const columns = [
    {
      name: "Jobs",
      selector: (row) => row.title,
    },
    {
      name: "Job Category",
      selector: (row) => row.job_category_name,
    },
    {
      name: "Posted On",
      selector: (row) => row.created_on.slice(0, 10),
    },
    {
      name: "Posted By",
      selector: (row) => row.recruiter_name,
    },
    {
      name: "Job Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {row.status === "APPROVED" ? (
            <button
              className="btn btn-sm btn-outline-danger px-3 rounded-4"
              onClick={() => {
                disapproveHandle(row.id);
                myFunction1();
                setClickedId(row.id);
              }}
            >
              Dis-Approve
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-success px-3 rounded-4"
              onClick={() => {
                approveHandle(row.id);
                myFunction();
                setClickedId(row.id);
              }}
            >
              Approve
            </button>
          )}

          {/* <button
            className={` btn btn-sm ${
              enable && clickedId === row.id
                ? "btn-outline-success"
                : "btn-outline-danger"
            } 
          px-3 rounded-4`}
            onClick={(e) => {
              !enable
                ? disapproveHandle(row.id) && myFunction1()
                : approveHandle(row.id) && myFunction();
              setClickedId(row.id);
              clickedId === row.id && setEnable(!enable);
            }}
          >
            {enable && clickedId === row.id ? "Approved" : "Disapproved"}
          </button> */}
        </>
      ),
      // "onClick={() =>{ approveHandle(row.id);console.log(row);myFunction()}}
      // <button className='btn btn-sm btn-outline-success'>DisApprove</button>
    },
  ];
  //   {
  //     name: 'Action',
  //     cell: (row) => (
  //       <>
  //         <button className="btn btn-sm btn-outline-success px-3 me-1 rounded-4"onClick={() =>{ approveHandle(row.id);console.log(row);myFunction()}}>Approve</button>
  //         <button className="btn btn-sm btn-outline-danger px-3  rounded-4" onClick={() => {disapproveHandle(row.id);console.log(row);myFunction1()}}>DisApprove</button>
  //       </>
  //     ),
  //   },
  // ]

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2 className="mb-3 heading">Posted Job Management</h2>

        <div className="w-25 d-flex mb-3">
          <label>
            <input
              className="form-control"
              // style={{ borderRadius: "10px 0px 0px 10px" }}
              type="text"
              onChange={(e) => {setTitlesearch(e.target.value);searchHandler()}}
              placeholder="Search by Jobs"
            />
          </label>

          {/* <button
            className="btn bg-white"
            style={{
              borderRadius: "0px 10px 10px 0",
              border: "1px solid #b1b7c1",
              borderLeft:"0"
            }}
            type="button"
            onClick={searchHandler}
          >
            <CIcon icon={cilFindInPage} />
          </button> */}
        </div>
      </div>

      {filter ? (
        <DataTable
          highlightOnHover
          selectableRowsHighlight
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 65px - 54px - 72px)"
          columns={columns}
          data={filter}
          pagination
        />
      ) : (
        <DataTable
          highlightOnHover
          selectableRowsHighlight
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
export default JobPostManagement;
