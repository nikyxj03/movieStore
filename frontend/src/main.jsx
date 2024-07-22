import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom' 
import Register from './pages/Register/Register.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Login from './pages/Login/Login.jsx'
import Movies from './pages/Movies/Movies.jsx'
import Userpage from './pages/Userpage/Userpage.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import MoviesList from './pages/Admin/MoviesList/MoviesList.jsx'
import UsersList from './pages/Admin/UsersList/UsersList.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path = '/' element = {<App/>}>

      <Route path = '/register' element = {<Register/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/movies' element = {<Movies/>}/>
      <Route path = '/userpage' element = {<Userpage/>}/>
   
      
      <Route path = '/admin' element = {<AdminRoute/>}>
        <Route path = 'movieslist' element = {<MoviesList/>}/>
        <Route path = 'userslist' element = {<UsersList/>}/>
      </Route>
   
   </Route>


  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store = {store}>
    <RouterProvider router = {router}/>
  </Provider>
  
)
