import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";
import Chat from "./Chat";
import { useLocation } from "react-router-dom";

const TicketsReply = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
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
          <div className="col-4 px-0">
            <MessageBox />
          </div>
          <div className="col-8">
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketsReply;
