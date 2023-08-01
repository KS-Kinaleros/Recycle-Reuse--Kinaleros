import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const AddAdmin = ({ getUsers }) => {
    const title = 'Agregar Administrador'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const [form, setForm] = useState({
        name: '',
        surname: '',
        phone: '',
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const addAdmin = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post("http://localhost:3400/user/saveAdmin", form, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
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
            <div className="modal" tabIndex="-1" id="myAdminAdd">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        {/* titulo */}
                        <div className='modal-header' style={{ backgroundColor: '#BADD7C', color: '#fff' }}>
                            <h1 className="modal-title">{title}</h1>
                        </div>


                        <div className="modal-body">
                            <div className="container-fluid">
                                <form className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Nombre</label>
                                        <input type="text" className="form-control" name='name' onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Surname</label>
                                        <input type="text" className="form-control" name='surname' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control" name='username' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Telefono</label>
                                        <input type="text" className="form-control" name='phone' onChange={handleChange} />
                                    </div>


                                    <div className="col-4">
                                        <label className="form-label">Correo</label>

                                        <div className="input-group">
                                            <div className="input-group-text">@</div>
                                            <input type="text" className="form-control" name='email' onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className="col-4">
                                        <label className="form-label">Contraseña</label>
                                        <input type="password" className="form-control" name='password' onChange={handleChange} />
                                    </div>


                                    <div className="modal-footer">
                                        <button onClick={(e) => addAdmin(e)} type="button" className="btn btn-primary">Guardar Admin</button>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}
