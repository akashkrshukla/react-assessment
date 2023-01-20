import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Profiles from "./Profiles";
const Jobseekers = () => {
  // const token = localStorage.getItem('token')
  const [data, setData] = useState();
  console.log(data);
  function myFunction() {
    alert("verified successfully");
  }
  useEffect(() => {
    fetch(
      "https://staging.jobportalapi.atwpl.com/adminportal/subscribed_jobseeker/",
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
      .catch((err) => console.log(err));
  }, []);
  console.log(data);

  // useEffect(()=>{
  //   console.log(data)
  // },[data])
  function verifyHandle(data) {
    fetch(
      "https://staging.jobportalapi.atwpl.com//adminportal/verify_jobseeker/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ jobseeker_id: data }),
      }
    );
  }

  const columns = [
    // {
    //   name: "Jobseeker Id",
    //   selector: (row) => row.id
    // },
    {
      name: "Name",
      selector: (row) => row.first_name,
    },
    {
      name: "Profile Title",
      selector: (row) => row.profile_title,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Mobile No.",
      selector: (row) => row.mobile_number,
    },
    {
      name: "Paid",
      selector: (row) => (row.is_premium === true ? "true" : "false"),
    },
    // {
    //   name: "Verification",
    //   cell: (row) => (
    //     <>
    //       {row.is_verified ? (
    //         <button
    //           className="btn btn-sm btn-outline-success rounded-4 px-3"
    //           onClick={() => {
    //             verifyHandle(row.id);
    //             myFunction();
    //           }}
    //         >
    //           Verify &nbsp;
    //           <i className="fa-regular fa-circle-check"></i>
    //         </button>
    //       ) : (
    //         <p className="py-2 pt-3">Verified</p>
    //       )}
    //     </>
    //   ),
    //   // <button className='btn btn-sm btn-outline-success'>DisApprove</button>
    // },
  ];
  return (
    <>
      <div>
        <h2 className="mb-3 heading">Subscribed Jobseeker</h2>
        <DataTable
          highlightOnHover
          selectableRowsHighlight
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 65px - 54px - 72px)"
          columns={columns}
          data={data}
          pagination
        />
      </div>
    </>
  );
};

export default Jobseekers;
