import { useState } from 'react'
import { Outlet } from 'react-router'
import './App.css'
import Header from './pages/Header/Header'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  

  return (
    <>
      <ToastContainer/>
      <Header/>
      
      <main>
        <Outlet/>
      </main>
    </>

  )
}

export default App
