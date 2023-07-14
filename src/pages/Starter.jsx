import React, { useEffect, useState } from 'react'
import Aside from '../components/Aside'
import Navbar from '../components/Navbar'
import Cookies from 'js-cookie'

function Starter() {
    const [token, setToken] = useState("")
    const getToken = () => {
      const a = Cookies.get("token")
      if(a) {
        const b = JSON.parse(a)
        setToken(b)
      }
    }
    useEffect(() => {
      getToken()
    },[])
    return token && (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Aside />

                <div className="layout-page">
                    <Navbar />
                </div>
            </div>
        </div>
    )
}

export default Starter