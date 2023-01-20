import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const UpdateCategory = (props) => {
  console.log(props.id);
  console.log(props.editType,"edit type")
  console.log(props.id)

  const [selectedData,setSelectedData]= useState([])
  const handleChange = (event) => {
    setSelectedData(event.target.value);
    console.log(selectedData);
  };

  useEffect(()=>{
    if(!props.editType) return;
    setSelectedData(props.editType);
  const selectedArray = props.editType;
  console.log(selectedArray,"selected")
  const filterArray= selectedArray.filter((item)=>item.id == props.id)
    setSelectedData(filterArray[0]?.category_name)


  },[props.editType])

  async function postHandle() {
    await fetch(
      `https://staging.jobportalapi.atwpl.com//adminportal/JobCategories/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: props.id,
          category_name: selectedData,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));

    props.fetchData();
  }
  const message = (mes) => { Swal.fire(mes) }
   const handupdate = () => {
              postHandle();
              props.closePopup();
               if (selectedData === "") {
      message('Please Fill Valid Category')
      return
    }
    message('Update Category Successfully')

  }
   


  return (
    <div className="blur-screen flex-center">
      {console.log(selectedData,"confirm selected data")}
      <div className="addCategory position-relative">
        <img
          src="./grey-cross.png"
          className="dismiss-popup"
          alt=""
          onClick={props.closePopup}
        />
        <h4 className="heading text-center mb-3">Edit</h4>
        <input
          type="text"
          onChange={handleChange}
          value={selectedData}
          placeholder="Categories tittle"
          className=" custom-input border-2 w-100 mb-3"
        />{" "}
        <br />
        {/* <input type="file" className=" custom-input w-100"  /> <br /> */}
        <div className=" flex-center justify-content-between">
          <button
            className="btn admin-outline-dark mt-3 "
            onClick={props.closePopup}
          >
            Cancel
          </button>
          <button
            className="btn admin-btn mt-3 "
           onClick={() => handupdate()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
