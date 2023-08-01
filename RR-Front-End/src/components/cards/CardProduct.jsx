import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { UpdateProduct } from '../../components/Upd/UpdateProduct'
import { useNavigate } from 'react-router-dom'

export const CardProduct = ({ _id, name, price, getProducts }) => {
    const navigate = useNavigate()


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const deleteProduct = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3400/product/deleteProduct/${_id}`, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
            getProducts()
        } catch (err) {
            console.log(err)
        }
    }

    const elimMaterial = async () => {
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
                    deleteProduct()
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


    return (
        <>
            <UpdateProduct getProducts={getProducts} _id={_id} />
            <div className="card text-bg-secondary mt-4 mb-3 ms-4" style={{ maxWidth: '540px', width: '540px', height: '200px' }}>
                <div className="row g-0 align-items-center"> {/* Utilizamos align-items-center para centrar verticalmente */}
                    <div className="col-md-4 text-center"> {/* Agregamos la clase text-center para centrar horizontalmente */}
                        <img src="img/materiales.png" className="img-fluid rounded-start" alt="Materiales" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body text-center"> {/* Agregamos la clase text-center para centrar horizontalmente */}
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text" style={{ color: '#FB6540' }}>Precio: {price}</p>
                            <div className="d-flex justify-content-center"> {/* Utilizamos justify-content-center para centrar horizontalmente los botones */}
                                <button type="button" className="btn btn-outline-info ms-2" onClick={() => { navigate(`/product-Select/${_id}`) }}>Editar</button>
                                <button className='btn btn-outline-danger ms-2' onClick={() => elimMaterial(_id)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
