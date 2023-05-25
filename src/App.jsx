import styled from "styled-components"
import { BrowserRouter,Routes,Route } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"



export default function App() {
    axios.defaults.headers.common['Authorization'] = 'CXsWjs5oIZPtLIyHNdgCzRAl';
    const [cartaz,Setcartaz]= useState([])
    const[chosen,Setchosen]= useState('')
    const [sessionid,Setsessionid] =useState(0)
    const [seatspageid,Setseatspageid] =useState(0)
    return (
        <>
            <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={<HomePage Setchosen={Setchosen} cartaz={cartaz} Setcartaz={Setcartaz}/>}/>
                <Route path="/SessionsPage" element={<SessionsPage  chosen={chosen} Setseatspageid={Setseatspageid}/>}/>
                <Route path="/SeatsPage" element={<SeatsPage  seatspageid={seatspageid}/>}/>
                <Route path="/SuccessPage" element={<SuccessPage />}/>
            </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
