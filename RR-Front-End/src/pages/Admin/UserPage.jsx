import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { CardUsers } from '../../components/cards/CardUsers'
import axios from 'axios'
import { AddAdmin } from '../../components/Adds/AddAdmin'

export const UserPage = () => {
  const [users, setUsers] = useState([{}])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUsers = async () => {
    try {
      const { data } = await axios('http://localhost:3400/user/getUsers', { headers: headers })
      if (data.users) {
        setUsers(data.users)
        console.log(data.users)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getUsers() }, [])

  return (
    <>

      <Navbar />
      <AddAdmin getUsers={getUsers}/>
      <main>
        <div className="left binding color" style={{ color: '#fff' }}>
          Favoritos
        </div>
        {users.length === 0 ? (
          <div className="row g-0 justify-content-center">
            <div className="col-12 text-center mt-5">
              <h1>Invita a personas a nuestra web</h1>
            </div>
          </div>
        ) : (
          <div className="row g-0 justify-content-center">
            {users.map(({ _id, name, surname, username, role }, i) => (
              <CardUsers
                key={i}
                _id={_id}
                name={name}
                surname={surname}
                username={username}
                role={role}
                getUsers={getUsers}
              />
            ))}
          </div>
        )}
        <button className='btn btn-info floating-button' data-bs-toggle="modal" data-bs-target="#myAdminAdd">Agregar Administrador</button>
      </main>

    </>
  )
}
