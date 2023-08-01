import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UpdateCompany = ({ getCompany }) => {
    const title = 'Actualizar Empresa'
    const { id } = useParams()

    const [form, setForm] = useState({
        name: '',
        description: '',
        address: '',
        phone: '',
        email: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }


    const updateCompany = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.put(`http://localhost:3400/company/updateCompany/${id}`, form, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
            getCompany()
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            });
        }
    }


    return (
        <>
            <div className="modal" tabIndex="-1" id="myUpdateCompany">
                <div className="modal-dialog modal-lg">
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
                                        <input type="text" className="form-control" name='name' id='inputQuantity' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Descripción</label>
                                        <input type="text" className="form-control" name='description' id='inputQuantity' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6" >
                                        <label className="form-label">Direccion</label>
                                        <input type="text" className="form-control" name='address' id='inputQuantity' onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6" >
                                        <label className="form-label">Teléfono</label>
                                        <input type="text" className="form-control" name='phone' id='inputQuantity' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-5">
                                        <label className="form-label">Correo</label>

                                        <div className="input-group">
                                            <div className="input-group-text">@</div>
                                            <input type="text" className="form-control" name='email' onChange={handleChange} />
                                        </div>
                                    </div>


                                    <div className="modal-footer">
                                        <button onClick={(e) => updateCompany(e)} type="button" className="btn btn-primary">Actualizar Empresa</button>
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
