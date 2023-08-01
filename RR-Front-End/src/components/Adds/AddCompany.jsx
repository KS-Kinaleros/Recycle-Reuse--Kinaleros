import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const AddCompany = ({ getCompany }) => {
    const title = 'Agregar Empresa'

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

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

    const addCompany = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post("http://localhost:3400/company/saveCompany", form, { headers: headers })
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
            })
        }
    }


    return (
        <>
            <div className="modal" tabIndex="-1" id="myCompanyAdd">
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
                                        <label className="form-label">Descripción</label>
                                        <input type="text" className="form-control" name='description' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Dirección</label>
                                        <input type="text" className="form-control" name='address' onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Teléfono</label>
                                        <input type="text" className="form-control" name='phone' onChange={handleChange} />
                                    </div>
                                    <div className="col-4">
                                        <label className="form-label">Correo</label>

                                        <div className="input-group">
                                            <div className="input-group-text">@</div>
                                            <input type="text" className="form-control" name='email' onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button onClick={(e) => addCompany(e)} type="button" className="btn btn-primary">Guardar Empresa</button>
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
