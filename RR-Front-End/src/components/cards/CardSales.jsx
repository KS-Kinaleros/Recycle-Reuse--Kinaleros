import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const CardSales = ({ _id, date, user, company, product, quantity, total, getSales }) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const deleteSale = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3400/sale/cancelSaleAdmin/${_id}`, {headers: headers})
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

    const elimSale = async () => {
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
                    deleteSale()
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
            <section>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
                            <div className="card">
                                <div className="d-flex justify-content-between p-3">
                                </div>
                                <img src="../../img/materiales.png" alt="sale" className="card-img-top" />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="medium">Empresa: {company}</p>
                                        <p className="medium">Usuario: {user}</p>
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                        <h5 className="mb-0">{product}</h5>
                                        <h5 className="text-dark mb-0">Cantidad:{quantity}</h5>
                                        <h5 className="text-dark mb-0">Total: Q.{total}.00</h5>
                                    </div>
                                    <div className='card-footer'>
                                        <h6 >{date}</h6>
                                        <button className='btn btn-danger' onClick={() => elimSale(_id)}> Cancelar Compra</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
