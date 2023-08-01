import React, { useContext, useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { UpdateUser } from '../../components/Upd/UpdateUser'
import Swal from 'sweetalert2'
import { AuthContext } from '../../Index'

export const CuentaPage = () => {
    const { loggedIn, setLoggedIn } = useContext(AuthContext)
    const [user, setUser] = useState([{}])
    const navigate = useNavigate()

    const loginOut = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/')
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getUser = async () => {
        try {
            const { data } = await axios.get('http://localhost:3400/user/getUser', { headers: headers })
            if (data.user) {
                setUser(data.user)
                console.log(data.user)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteAccount = async () => {
        try {
            const { data } = await axios.delete('http://localhost:3400/user/deleteAccount', { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
            loginOut()
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }


    useEffect(() => { getUser() }, [])
    return (
        <>
            <Navbar />
            <UpdateUser getUser={getUser} />
            <section className="vh-100" style={{ background: `url('/img/fondo2.png')` }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-12 col-xl-4">
                            <div className="card" style={{ borderRadius: '15px', width: '500px', height: '600px' }}>
                                <div className="card-body text-center">
                                    <div className="mt-4 mb-4">
                                        <img src="img/avatar.png" className="rounded-circle img-fluid" style={{ width: '200px' }} alt="Profile" />
                                    </div>

                                    {/* nombres */}
                                    <h4 className="mb-3">Nombre: {user.name}</h4>
                                    <h4 className="mb-3">Usuario: {user.username}</h4>
                                    <h4 className="mb-3">Correo: {user.email}</h4>
                                    <h4 className="mb-3">Teléfono: {user.phone}</h4>
                                    <h4 className="mb-3">Dinero: {user.money}</h4>
                                    <button className='btn btn-warning ms-5' data-bs-toggle="modal" data-bs-target="#myUpdateAccount">Editar</button>

                                    {/* solo pueden eliminar su cuenta los clientes */}
                                    {user.role === 'CLIENT' ? (
                                        <>
                                        <button className='btn btn-danger ms-2' onClick={() => deleteAccount()}>Eliminar</button>
                                        </>
                                    ) : (null)}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {user.role === 'CLIENT' ? (
                    <>
                        {/* ver ventas*/}
                        <div className="card text-center">
                            <div className="card-header">
                                <ul className="nav nav-pills card-header-pills">
                                    <li className="nav-item">
                                        <Link className='nav-link' to={'sales'}>Ventas</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <Outlet />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    </>)}

            </section>
        </>
    )
}
