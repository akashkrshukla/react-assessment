import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
// import Profiles from './Profiles'
import AddCategory from "./Popup/AddCategory";
import UpdateCategory from "./Popup/UpdateCategory";

const Categories = (props) => {
  const [data, setData] = useState();
  const [relatedJobs, setRelatedJobs] = useState([]);
  // const length = data.length;
  // console.log(data.length);
  const [iD, setID] = useState(null);

  async function remove(id) {
    await fetch(
      `https://staging.jobportalapi.atwpl.com//adminportal/JobCategories/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    )
      .then(() => {
        console.log("removed");
      })
      .catch((err) => {
        console.error(err);
      });
    fetchData();
  }

  console.log("<<<<", data, relatedJobs);

  const fetchData = () => {
    fetch(
      "https://staging.jobportalapi.atwpl.com//adminportal/JobCategories/",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer  ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.data.list_of_category);
        setRelatedJobs(response.data.related_vacancy);
      })
      .catch((err) => console.log(err));
  };
  const msg=()=>{
    alert("Category Deleted Successfully")
  }
  useEffect(() => {
    fetchData();
  }, [iD]);
  const [updateCategory, setUpdateCategory] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Create Date",
      selector: (row) => row.created_at.slice(0, 10),
    },
    {
      name: "Added By",
      selector: (row) => row.added_by,
    },

    {
      name: "Ongoing Jobs",
      selector: (row) => {
        const filterArr = relatedJobs.find((item, index) => item.id === row.id);

        return filterArr?.no_of_vacancy == null ? 0 : filterArr?.no_of_vacancy;
        // return <>{filterArr?.no_of_vacancy}</>;
      },
    },
    {
      name: "Action",
      width: "190px",
      sortable: true,
      justifyContent: "center",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-sm btn-outline-success rounded-4 px-3 me-2"
            onClick={() => {
              setID(row.id);
              setUpdateCategory(true);
              msg();
            }}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="btn btn-sm btn-outline-danger rounded-4 px-3"
            onClick={() => {
              remove(row.id);
            }}
          >
            <i className="fa fa-solid fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className=" text-center mb-0 heading">
          Job Categories ({data?.length}){" "}
        </h2>
        <div className=" d-flex justify-content-end mr-3">
          {/* <input type="text" placeholder="Enter Categories to add" className=" custom-input"/> */}
          <button
            className="btn admin-btn ms-3 "
            onClick={() => {
              setAddCategory(true);
            }}
          >
            Add Categories
          </button>
        </div>
      </div>
      {updateCategory ? (
        <UpdateCategory
          editType={data}
          id={iD}
          fetchData={fetchData}
          closePopup={() => {
            setUpdateCategory(false);
          }}
        />
      ) : null}
      {addCategory ? (
        <AddCategory
          fetchData={fetchData}
          closePopup={() => {
            setAddCategory(false);
          }}
        />
      ) : null}
      <DataTable
        highlightOnHover
        selectableRowsHighlight
        fixedHeader
        fixedHeaderScrollHeight="calc(100vh - 65px - 54px - 72px)"
        columns={columns}
        defaultSortFieldId={1}
        data={data}
        pagination
      />
    </div>
  );
};

export default Categories;
