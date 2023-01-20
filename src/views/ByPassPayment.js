import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Profiles from "./Profiles";

const ByPassPayment = () => {
  const [data, setData] = useState();
  const [bypassPopup, setBypassPopup] = useState(false);
  console.log(data);
  const [subcriptionType, setSubcriptionType] = useState(0);
  const [creditCoins, setCreditCoins] = useState();
  const [validity, setValidity] = useState();
  const [subcription, setSubcription] = useState(true);
  console.log(subcriptionType, creditCoins, validity, subcription);

  function postHandle() {
    fetch(
      "https://staging.jobportalapi.atwpl.com//adminportal/bypasspayment/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },

        body: JSON.stringify({
          id: clickedId,
          subscription: subcriptionType,
          available_credits: creditCoins,
          validity: validity,
          is_subscribed: subcription,
        }),
      }
    );
    setBypassPopup(false);
  }
  // const token = localStorage.getItem('token')
  const [enable, setEnable] = useState(false);
  const [clickedId, setClickedId] = useState(null);
  function enableHandle(data) {
    fetch("https://staging.jobportalapi.atwpl.com/adminportal/bypasspayment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ vacancy_id: data }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  useEffect(() => {
    fetch(
      "https://staging.jobportalapi.atwpl.com/adminportal/all_recruiters/",
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

  const columns = [
    // {
    //   name: 'User Id',
    //   selector: (row) => row.id,
    // },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
    },
    // {
    //   name: "Balance",
    //   selector: (row) => row.credit_balance,
    // },
    {
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Validity",
      selector: (row) => row.duration,
    },
    {
      name: "Plan",
      selector: (row) => row.subscription_plan,
    },
    {
      name: "Purchase Date",
      selector: (row) => row.updated_at,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {row.is_subscribed ? (
            <button
              className="btn-outline-info btn px-3 rounded-4"
              onClick={() => {
                setClickedId(row.id);
                setBypassPopup(true);
              }}
            >
              {console.log(row.is_subscribed)}
              Renew
            </button>
          ) : (
            <button
              className="btn-outline-success btn px-3 rounded-4"
              onClick={() => {
                setClickedId(row.id);
                setBypassPopup(true);
              }}
            >
              {console.log(row.is_subscribed)}
              Enable
            </button>
          )}
        </>
      ),

      // <button className='btn btn-sm btn-outline-success'>DisApprove</button>
    },
  ];
  return (
    <>
      <div>
        <h2 className="mb-3 heading">Bypass-Payment</h2>
        
        <DataTable
          highlightOnHover
          selectableRowsHighlight
          fixedHeader
          fixedHeaderScrollHeight="calc(100vh - 65px - 54px - 72px)"
          columns={columns}
          data={data}
          pagination
        />
        {bypassPopup ? (
          <div className="blur-screen flex-center">
            {/* {console.log(selectedData, "confirm selected data")} */}
            <div className="addCategory position-relative">
              <img
                src="./grey-cross.png"
                className="dismiss-popup"
                alt=""
                onClick={() => setBypassPopup(false)}
              />
              <h4 className="heading text-center mb-3">Bypass Payment</h4>
              <label>Select Subcription Type</label>
              <div className="space-between w-75 mb-3">
                <div className="">
                  <input
                    type="radio"
                    name="subcriptionType"
                    value="1"
                    onClick={(e) => {
                      setSubcriptionType(e.target.value);
                      if (subcriptionType == 1) {
                        setCreditCoins(100);
                      } else {
                        setCreditCoins(300);
                      }
                    }}
                    className="catzappRadioBtn"
                  />
                  <span className="ms-2">VIP</span>
                </div>
                <div className="">
                  <input
                    type="radio"
                    name="subcriptionType"
                    value="2"
                    onClick={(e) => {
                      setSubcriptionType(e.target.value);
                      if (subcriptionType == 1) {
                        setCreditCoins(100);
                      } else {
                        setCreditCoins(300);
                      }
                    }}
                    className="catzappRadioBtn"
                  />
                  <span className="ms-2">PREMIUM</span>
                </div>
              </div>
              <input
                type="text"
                placeholder="Your Coins"
                readOnly
                value={creditCoins}
                onChange={(e) => {
                  setCreditCoins(e.target.value);
                }}
                className=" custom-input border-2 w-100 mb-3"
              />{" "}
              <br />
              <input
                type="date"
                placeholder="Validity"
                className=" custom-input w-100"
                value={validity}
                onChange={(e) => setValidity(e.target.value)}
              />{" "}
              <br />
              {/* <div className="mt-2">
            <input
              type="checkbox"
              onClick={(e) => setSubcription(e.target.checked)}
            />{" "}
            <span>Subcription</span>
          </div> */}
              <div className=" flex-center justify-content-between">
                <button
                  className="btn admin-outline-dark mt-3 "
                  onClick={() => setBypassPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn admin-btn mt-3 "
                  onClick={() => {
                    postHandle();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ByPassPayment;
