import React, { useEffect, useState } from "react";

const MessageBox = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://staging.jobportalapi.atwpl.com/adminportal/ticket_details/",
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {data.map((item, index) => {
        {
          console.log(item.id, props.MticketId, "Item id and ticket id", item);
        }
        return (
          <>
            {item.id === props.MticketId ? (
              <>
                <div className="message-box active" key={index}>
                  <div className="row flex-center m-0">
                    {/* <div className="col-2 pr-0 flex-center">
                        <img src="./msg1.png" className="msg-profile" alt="" />
                    </div> */}
                    <div className="col-10 ps-0 py-2">
                      <h4
                        className="msg-name"
                        style={{ fontSize: "20px", color: "#0e0e0e" }}
                      >
                        {item.user_name}
                      </h4>
                      <h4 className="msg-name">{item.subject}</h4>
                      <p className="text mb-0">{item.description}</p>
                    </div>
                    <div className="col-2 pl-0 flex-center issue-circle">
                      <p className="text mb-0">{item.ticket_type}</p>
                      {/* <p className="no_messages">3</p> */}
                    </div>
                  </div>
                </div>
                <hr className="m-0" />
              </>
            ) : null}
          </>
        );
      })}
    </>
  );
};

export default MessageBox;
