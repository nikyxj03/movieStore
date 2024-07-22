import React from 'react'
import './UsersList.css'
import Sidebar from "../../SideBar/Sidebar"
import { useGetUserDetailsQuery, useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '../../../redux/api/usersApiSlice'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"
import Loader from '../../../components/Loader';
import Message from '../../../components/Message'

const UsersList = () => {

    const {data:users, refetch, isLoading, error} = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName ] = useState('')
    const [editableUserEmail, setEditableEmail] = useState('')

    useEffect(() => {
        refetch()
    } , [refetch]
    )

    const deleteHandler = async(id) => {
        if(window.confirm('Are you sure?')){
          try {
            await deleteUser(id)
            toast.success("User deleted successfully")
          } catch (error) {
              toast.error(error.data.message || error.error)
          }
        }
      } 

      const toggleEdit = (id, username, email) => {
        setEditableUserId(id)
        setEditableUserName(username)
        setEditableEmail(email)
      }

      const updateHandler = async(id) => {
        try {
          await updateUser({
            userId: id,
            username: editableUserName,
            email: editableUserEmail
          })
      
          setEditableUserId(null)
          refetch()
      
        } catch (error) {
            toast.error(error.data.message || error.error)
        }
      }
    

  return (
    <>
        <Sidebar/>
        <h1 > Users</h1>
        <div className = 'toright'>
      
      {isLoading ? (<Loader/>) : error ? (<Message variant = 'danger'>
         {error?.data.message || error.message}
         </Message>) :(
          <div > 
         
            <table className='table'>
              <thead className='heading'>
                <tr>
                  <th className="row"> ID</th>
                  <th className="row"> NAME</th>
                  <th className="row"> EMAIL</th>
                  <th className="row"> ADMIN</th>
                  <th className="row"> </th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key = {user._id}>
                    <td className="value">{user._id}</td>
                    <td className="value">
                      {editableUserId === user._id ? (
                        <div >
                          <input type="text" value={editableUserName} 
                          onChange={e => setEditableUserName(e.target.value)} 
                          />

                          <button onClick={() => updateHandler(user._id)}
                          >
                            <FaCheck/>
                          </button>
                        </div>
                        ):(
                            <div >
                              {user.username} { " "}
                              <button 
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }>
                                <FaEdit />
                              </button>
                            </div>
                          )}
                        </td>
                        <td className='value'>
                          {editableUserId === user._id ? (
                            <div >
                              <input type="text" value={editableUserEmail} onChange={e =>
                                setEditableEmail(e.target.value)
                              } />
                              <button onClick={() => updateHandler(user._id)}
                             >
                                <FaCheck/>
                              </button>
                            </div>
                          ): (
                            <div >
                              <p> {user.email}</p>
                              <button onClick={() => toggleEdit(user._id, user.username, user.email )}>
                                <FaEdit />
                              </button>
                            </div>
                          )}
                        </td>
    
                        <td className='value'>
                          {user.isAdmin ? (
                            <FaCheck style = {{color : 'green'}}/>
                          ):(
                            <FaTimes style = {{color : 'red'}}/>
                          )
                        }
                        </td>
    
                        <td className='value'>
                          {!user.isAdmin && (
                            <div >
                              <button onClick={() => deleteHandler(user._id)}
                             >
                                <FaTrash/>
                              </button>
    
                            </div>
                          )}
                        </td>
    
                      </tr>
    
                    ))}
                  </tbody>
                </table>
              </div>
             )
             }
        </div>
    </>
  )
}

export default UsersList
