import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const CardUsers = ({ _id, name, surname, username, role, getUsers }) => {

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const deleteUser = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3400/user/deleteUser/${_id}`, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }

    const elimUser = async () => {
        try {
            Swal.fire({
                title: 'Estas seguro de eliminar al usuario?',
                text: "No se podra revertir!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteUser()
                }
            })
            getUsers()
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }

    return (
        <>
            <div className='col-md-3 mb-4'>
                <div className='card' style={{ borderRadius: '15px', width: '400px', height: '250px' }}>
                    <div className='card-body p-4'>
                        <div className='d-flex text-black'>
                            <div className='flex-shrink-0'>
                                <img
                                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                                    alt='Generic placeholder image'
                                    className='img-fluid'
                                    style={{ width: '180px', borderRadius: '10px' }}
                                />
                            </div>
                            <div className='flex-grow-1 ms-3'>
                                <h5 className='mb-1'>
                                    {name} {surname}
                                </h5>
                                <p className='mb-2 pb-1' style={{ color: '#2b2a2a' }}>
                                    {username}
                                </p>
                                <p classNsame='mb-2 pb-1' style={{ color: role === 'CLIENT' ? 'Green' : 'Red' }}>
                                    {role}
                                </p>
                                <div className='d-flex pt-1'>
                                    {role !== 'ADMIN' && (
                                        <>
                                            <button className='btn btn-danger btn-common me-2' onClick={() => elimUser(_id)}>Eliminar</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
