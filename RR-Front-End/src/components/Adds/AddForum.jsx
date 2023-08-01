import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const AddForum = ({getForum}) => {
    const title = 'Nuevo Foro'
    const [form, setForm] = useState({
        title: '',
        description: '',
        content: ''
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

    const saveForum = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post('http://localhost:3400/forum/saveForum', form, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: 'success',
            })
            getForum()
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
            <div className="modal" tabIndex="-1" id="myFormAdd">
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
                                        <label className="form-label">Titulo</label>
                                        <input type="text" className="form-control" name='title' id='inputQuantity' onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Descripcion</label>
                                        <input type="text" className="form-control" name='description' id='inputQuantity' onChange={handleChange} />
                                    </div>

                                    <div className="col-md" s>
                                        <label className="form-label">Contenido</label>
                                        <input type="text" className="form-control" name='content' id='inputQuantity' onChange={handleChange} style={{ height: '300px' }} />
                                    </div>

                                    <div className="modal-footer">
                                        <button onClick={(e) => saveForum(e)} type="button" className="btn btn-primary">Agregar foro</button>
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
