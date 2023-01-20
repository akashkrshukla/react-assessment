import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Profiles from "./Profiles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";
import MessageBox from "./MessageBox";

import { useLocation } from "react-router-dom";

const UserList = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [ticketId, setTicketId] = useState(0);
  console.log(ticketId, "Tickkk");
  //  const [data,setData]=useState();
  useEffect(() => {
    fetch(
      "http://localhost:3001/user/list/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => setData(response.userList))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      name: "User Name.",
      selector: (row) => row.firstName,
    },
    {
      name: "Created On.",
      selector: (row) => row.createdAt.slice(0, 10),
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Action",
      width: "160px",
      justifyContent: "center",
      cell: (row) => (
        <div className="">
          {/* <button className='btn btn-sm btn-outline-danger rounded-4 px-3'>
        <i className="fa fa-reply" aria-hidden="true"></i>
        </button> */}
          {/* Link to="/raised-ticket" */}
          <button
            onClick={() => {
              setTicketId(row);
            }}
            id={row.id}
            className="btn btn-sm btn-outline-danger rounded-4 px-3"
            state={{ from: row.id }}
          >
            <i className="fa fa-reply" aria-hidden="true"></i>
          </button>
          {/* <button className='btn btn-sm btn-outline-danger rounded-4 px-3'>Close</button> */}
        </div>
      ),
      // <button className='btn btn-sm btn-outline-success'>DisApprove</button>
    },
  ];

  return (
    <>
    {console.log(data, "lllllll")}
      {ticketId === 0 ? (
        <div>
          <h1 className="heading mb-3">User List</h1>
          <div className="float-end">
          <input
            type="date"
            placeholder="enter"
            className=" custom-input"
            // onChange={(e) => setMin(e.target.value)}
          />{" "}
          <span className=" mx-5">To</span>
          <input
            type="date"
            placeholder="enter"
            className=" custom-input"
            name="toDate"
            // onChange={(e) => setMax(e.target.value)}
          />
          <button className="mx-3 btn admin-btn" >
            Show Data
          </button>
        </div>
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
      ) : (
        <TicketsReply userDetails={data} />
      )}
    </>
  );
};

export default UserList;

const TicketsReply = (props) => {
  const location = useLocation();
  const from = location.state;
  const [data, setData] = useState([]);
  console.log(from);

  //  const [data,setData]=useState();
  useEffect(() => {
    fetch("https://staging.jobportalapi.atwpl.com/jobseeker/storemessages/", {
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

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {/* Chat And Messages */}
      <div style={{ height: "calc(100vh - 81px)" }}>
        <div className="row">
          {/* <div className="col-4 px-0">
            <MessageBox MticketId={props.boxTicketId} />
          </div> */}
          <div className="col-12">
            <Chat name={props.chatName} description={props.description} subject={props.subject} date={props.created_at} close={props.backBtn} ticketId={props.chatTicketId} />
          </div>
        </div>
      </div>
    </>
  );
};
