import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
const Login = () => {
  const [usernamee, setUsernamee ] = useState('');
  const [userpass, setUserpass ] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate()
  const clickHandler =()=>{
    fetch("https://staging.jobportalapi.atwpl.com//login/",{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
         },
         body: JSON.stringify( {
          "username":usernamee,
          "password":userpass,
          "user_types":"admin"
      })
    })
    .then(val=>val.json())
    .then((data)=>{

        if(data?.status_code == 200){
      
          localStorage.setItem("token",data.data.access)
          navigate("/dashboard");
          setError(false);
          
        }
        else{
          setError(true);
          console.log("incorrect");
          // useNavigate("/login");
        }
      
      console.log(usernamee)
      console.log(userpass);
    })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" onChange={(e)=>setUsernamee(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4" on>
                      <CInputGroupText >
                        <CIcon icon={cilLockLocked}/>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={(e)=>setUserpass(e.target.value)}
                      />
                      {error ? <p className='mb-0' style={{color:'red',marginTop:'7px'}}>The username and password is incorrect. Try again.</p> : null}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        {/* <Link to="/dashboard"> */}
                        <CButton onClick={clickHandler} color="primary" className="px-4 admin-btn btn">
                          Login
                        </CButton>
                        {/* </Link> */}
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center flex-center">
                  {/* <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div> */}
                  {/* <img src="./logo-atzapp_white.png" alt=''/> */}

                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login;




// await fetch(
    //   "https://staging.jobportalapi.atwpl.com/adminportal/ticket_response/",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer  ${localStorage.getItem("token")}`,
    //     },
    //     body: JSON.stringify({ ticket_id: 1, ticket_response: msgName }),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    //  props.fetchData();
