import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UpdateProduct = ({ _id, getProducts }) => {
    const navigate = useNavigate()
    const title = 'Actualizar Producto'

    const [form, setForm] = useState({
        name: '',
        price: '',
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

    const updateProduct = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3400/product/updateProduct/${_id}`, form, { headers: headers });
            Swal.fire({
                title: `${data.message}`,
                icon: 'success',
            });
            navigate('/products')
        } catch (err) {
            console.error(err);
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'warning',
            });
        }
    };

    return (
        <>
            <div className="modal" tabIndex="-1" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* titulo */}
                        <div className='modal-header' style={{ backgroundColor: '#BADD7C', color: '#fff' }}>
                            <h1 className="modal-title">{title}</h1>
                        </div>

                        {/* formulario */}
                        <div className='modal-body'>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Nombre</label>
                                <input onChange={handleChange} name='name' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Precio</label>
                                <input onChange={handleChange} name='price' type="number" className="form-control" required />
                            </div>

                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => updateProduct()} type="submit" className="btn btn-primary">Actualizar Material</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
