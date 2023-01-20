import React, { useState } from 'react'
import Swal from 'sweetalert2'

const AddCategory = (props) => {

  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
    console.log(name)
  }
  async function postHandle() {
    await fetch('https://staging.jobportalapi.atwpl.com/adminportal/JobCategories/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer  ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ "category_name": name }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))

    props.fetchData();
  }
  const message = (mes) => { Swal.fire(mes) }

  const handadd = () => {
    console.log("calling")
    postHandle();
    props.closePopup();
    if (name === "") {
      message('Job Category Can’t be empty')
      return
    }
    message('Added Successfully')

  }

  return (
    <div className='blur-screen flex-center'>
      <div className='addCategory position-relative'>

        <img src='./grey-cross.png' className="dismiss-popup" alt="" onClick={props.closePopup} />
        <h4 className='heading text-center mb-3'>Add Category</h4>
        <input type="text" onChange={handleChange} value={name} placeholder="Categories tittle" className=" custom-input border-2 w-100 mb-3" /> <br />
        {/* <input type="file" className=" custom-input w-100"  /> <br /> */}
        <div className=' flex-center justify-content-between'>
          <button className="btn admin-outline-dark mt-3 " onClick={props.closePopup}>Cancel</button>
          <button className="btn admin-btn mt-3 " onClick={() => handadd()} >Add Now</button>
        </div>
      </div>
    </div>
  )
}

export default AddCategory