import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";

export const SaleProduct = () => {
    const { id } = useParams()
    const title = 'Vender productos'

    const [products, setProducts] = useState([{}])
    /*     const [form, setForm] = useState({
            quantity: '',
        })
     */
/*     const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    } */

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:3400/product/getProducts')
            if (data.products) {
                setProducts(data.products)
                console.log(data.products)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const saleProduct = async (e) => {
        try {
            e.preventDefault()
            let product = {
                product: document.getElementById('inputProduct').value,
                quantity: document.getElementById('inputQuantity').value
            }
            const { data } = await axios.post(`http://localhost:3400/sale/saveSale/${id}`, product, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            });
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            });

        }
    }

    useEffect(() => { getProducts() }, [])

    return (
        <>
            <div className="modal" tabIndex="-1" id="myModal">
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
                                        <label htmlFor="" className="form-label">Producto</label>
                                        <select className="form-control" name="product" id='inputProduct'>
                                            <option value="">Seleccione un producto</option>
                                            {
                                                products.map(({ _id, name, price }, i) => {
                                                    return (
                                                        <option key={i} value={_id} > {name}, C/U: Q.{price} </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Cantidad</label>
                                        <input type="text" className="form-control" name='quantity' id='inputQuantity' onChange={handleChange} />
                                    </div>

                                    <div className="modal-footer">
                                        <button onClick={(e) => saleProduct(e)} type="button" className="btn btn-primary">Vender Productos</button>
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
