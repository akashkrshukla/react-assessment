import { CListGroup } from "@coreui/react";
import React, { useEffect, useState } from "react";
import Avatar10 from "../assets/images/avatars/10.jpg"
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import firestore from "../../src/firebase";
import { async } from "@firebase/util";

const Chat = (props) => {
  const [msgName, setMsgName] = useState("");
  const [msgSended, setMsgSended] = useState("");
  const [chatMsgList, setChatMsgList] = useState([]);
  const [idOfTicket, setIdOfTicket] = useState("");

  const handleChange = (event) => {
    setMsgName(event.target.value);
  };
  
  const sendMessage = async () => {
    setMsgSended(msgName);
    const messageList = chatMsgList;
    messageList.push({
      title: msgName,
      avatar_image: "",
    });
    const obj = {
      query_id: idOfTicket,
      data: messageList,
    };
    const queryDoc = doc(firestore, "messages", idOfTicket.toString());
    await setDoc(queryDoc, obj);
    fetch(
      "https://staging.jobportalapi.atwpl.com/adminportal/ticket_response/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ticket_id: idOfTicket,
          ticket_response: msgName,
        }),
      }
    );
    setMsgName("");
    fetch(
      "https://staging.jobportalapi.atwpl.com/adminportal/close_ticket/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ticket_id: idOfTicket,
        }),
      }
    );


  };
  useEffect(() => {
    setIdOfTicket(props.ticketId);
    getCloudMessageList();
  });
  const getCloudMessageList = async () => {
    try {
      console.log("fetching the message list", idOfTicket);
      let mList = [];
      let msgList = [];
      const messagesRef = collection(firestore, "messages");
      const q = query(messagesRef, where("query_id", "==", idOfTicket));
      const querySnapshot = await getDocs(q);
      console.log("querySnapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        mList = doc.data();
      });
      if (mList["data"]) {
        msgList = mList["data"];
      }
      console.log(msgList, "msgList");
      if (msgList.length !== chatMsgList.length) {
        setChatMsgList(msgList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // if (props.ticketId != "") {
    // setIdOfTicket(props.ticketId)
    // getCloudMessageList();
    // }
  }, [chatMsgList]);

  return (
    <>
      <div className="chat-section-box">
        <div className="fix-chat-header">
          <img src="./white-backbtn.png" onClick={() => { props.close() }} alt="l" className="backImg me-3 chat-back-arrow-header" />
          <span className="chat-user-name">{props.name} </span>

        </div>
        <h3>Ticket Details</h3>
        <div className="send-msg-box">
                  <h3 className="sender-name">{props.subject}</h3>
                  <p className="text mt-2">{props.description}</p>
                  <p className="text mt-2">{props.time}</p>
                  <p className="text mt-2">{props.date.slice(0, 10)}</p>
                </div>
        
        <span className="chat-user-name text-dark"> </span>

        <div className="wrapped-message-area">
          <div className="chat ">
            <div className="flex-center w-100 position-relative">
              <hr className="days-update-line" />
              <p className="msg-day">Today {props.ticketId}</p>
            </div>
            {chatMsgList.map((item) => {
              return (
                <div className="d-flex justify-content-end">
                <div className="send-msg-box">
                  <h3 className="sender-name">You</h3>
                  <p className="text mt-2">{item.title}</p>
                </div>
                <img src={Avatar10} alt="" className="sender-img ml-1" />
              </div>
              );
            })}
            {/* Chat Send Box */}
            {/* {msgSended != "" ? (
              <div className="d-flex justify-content-end">
                <div className="send-msg-box">
                  <h3 className="sender-name">You</h3>
                  <p className="text mt-2">{msgSended}</p>
                </div>
                <img src="./msg1.png" alt="" className="sender-img ml-1" />
              </div>
            ) : null} */}

            {/* Recieve Box */}
            {/* <div className="d-flex">
              <img src="./msg1.png" alt="" className="sender-img mr-1" />
              <div className="recieve-msg-box">
                <h3 className="sender-name">Rahul Dewal</h3>
                <p className="text mt-2">
                  Good Morning! I am reaching out to you for a Plumber job
                  vacancy which you have posted. Can we discuss on the same?
                </p>
              </div>
            </div> */}
          </div>
        </div>
        <div className="send-input-box">
          <div className="relative w-100">
            {/* <input
              type="textarea"
              name="textValue"

              placeholder="Type a message"
              className="send-input"
              onChange={(e) => {
                handleChange(e);
              }}
              value={msgName}
            /> */}
            <textarea id="response"  cols="50"
              name="textValue"
              style={{minHeight: "48px"}}

              placeholder="Type a message"
              className="send-input"
              onChange={(e) => {
                handleChange(e);
              }}
              value={msgName}>
              </textarea>
            <img src="./smile-grey.png" alt="" className="left-img" />
            <img src="./camera.png" alt="" className="right-img" />
          </div>

          <button className="send-btn" onClick={sendMessage}>
            <img src="./send-msg.png" alt="" className="send-img" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
