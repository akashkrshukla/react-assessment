import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'


const OrderHistory = () => {
  const [data, setData] = useState();
  const [filter,setFilter]= useState();
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  // var date = (min) ;
  // date = date.split("/").reverse().join("/");

  // var date2 = (max);
  // date2 = date.split("-").reverse().join("-");

  // console.log(date,date2);
  // console.log(max);

  function dateFilter(e) {
    fetch('https://staging.jobportalapi.atwpl.com/adminportal/order_history/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${localStorage.getItem('token')}`,
      
      },
      body: JSON.stringify({"from_date": min,"to_date": max  }),
    })
      .then((response) => response.json())
      .then((data) => setFilter(data.data))
    // console.log(min);
    
  }
  console.log(filter);
  useEffect(() => {
    fetch('https://staging.jobportalapi.atwpl.com/adminportal/order_history/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer  ${localStorage.getItem("token")}`
      },
    })
      .then((response) => response.json())
      .then((response) => setData((response.data)))
      .catch((err) => console.log(err))
  }, [])
  const columns = [
    // {
    //   name: "Order Id",
    //   selector: (row) => row.id
    // },
    {
      name: "Order Id",
      selector: (row) => row.id_with_string
    },
    {
      name: "Order For",
      selector: (row) => row.subscription_name
    },
    {
      name: "Order By",
      selector: (row) => row.user_name
    },
    {
      name: "Order on",
      // selector: (row)=> row.user_name
      selector: (row) => row.created_at.slice(0,10)
    },
    {
      name: "Download",
      cell: (row) => <button className='btn btn-sm btn-outline-primary px-3 rounded-4'>
        <i className="fa-solid fa-download"></i>
      </button>
    }
  ]
  // const onGridReady = (params) => {
  //   setGridAPi(params)
  // }
  return (
    <div>
      <div className=' d-flex justify-content-between mb-3 align-items-center'>
        <h2 className=' text-center mb-0 heading'>Order History</h2>
        <div className=''>
          <input type="date" placeholder='enter' className=' custom-input' onChange={(e) => setMin(e.target.value)} /> <span className=' mx-5'>To</span>
          <input type="date" placeholder='enter' className=' custom-input' onChange={(e) => setMax(e.target.value)} />
          <button className='mx-3 btn admin-btn' onClick={dateFilter} >Show Data</button>
        </div>

      </div>
      {filter?<DataTable highlightOnHover selectableRowsHighlight fixedHeader fixedHeaderScrollHeight='calc(100vh - 65px - 54px - 72px)' columns={columns} data={filter} pagination />
      :<DataTable highlightOnHover selectableRowsHighlight fixedHeader fixedHeaderScrollHeight='calc(100vh - 65px - 54px - 72px)' columns={columns} data={data} pagination />}
    </div>
  )
}


export default OrderHistory