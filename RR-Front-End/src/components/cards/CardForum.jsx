import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const CardForum = ({ _id, date, user, title, description, getForum }) => {
    const navigate = useNavigate()
    const [userT, setUser] = useState({})

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getUserToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:3400/user/getUser', { headers: headers })
            if (data.user) {
                setUser(data.user)
                console.log(data.user)
            }
            console.log(user.role)
        } catch (err) {
            console.log(err)
        }
    }

    const deleteForum = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3400/forum/deleteForumAdmin/${_id}`, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
            getSales()
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }

    const elimForum = async () => {
        try {
            Swal.fire({
                title: 'Estas seguro de cancelar la venta?',
                text: "No se podra revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteForum()
                    getForum()
                }
            })

        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }




    useEffect(() => { getUserToken() }, [])

    return (
        <>
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="card border border-dark" style={{ maxWidth: '850px' }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className='card-title'>{user}</h6>
                                </div>
                                <div>
                                    <h6 className='card-title'>{date}</h6>
                                </div>
                            </div>
                            <h4 className="card-title">{title}</h4>
                            <p className="card-text">{description}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                {/* este boton tiene que hacer de enviarme a una pagina solo para el foro que eligio */}
                                {/* hacer un terniario que sea de que si es admin le muestre comentar y si es admin boton eliminar */}
                                {userT.role === 'ADMIN' ? (
                                    <>
                                        <button className='btn btn-danger' onClick={() => elimForum(_id)}>Eliminar Foro</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { navigate(`/forum-Select/${_id}`) }} className="btn btn-primary">comentar</button>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
