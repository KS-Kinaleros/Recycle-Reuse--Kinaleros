import React, { useEffect, useState } from 'react'
import { Navbar } from '../../../components/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { UpdateProduct } from '../../../components/Upd/UpdateProduct'


export const ProductSelect = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3400/product/getProductId/${id}`)
            if (data.existProduct) {
                setProduct(data.existProduct)
                console.log(data.existProduct)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getProduct() }, [])


    return (
        <>
            <Navbar />
            <UpdateProduct getProducts={getProduct} _id={id}/>
            <section className="vh-100" style={{ background: `url('/img/fondo2.png')` }}>
                <div className="container py-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-12 col-xl-4">
                            <div className="card" style={{ borderRadius: '15px', width: '500px', height: '450px' }}>
                                <div className="card-body text-center">
                                    <div className="mt-4 mb-4">
                                        <img src="../../img/materiales.png" className="rounded-circle img-fluid" style={{ width: '200px' }} alt="materiales" />
                                    </div>

                                    {/* nombres */}
                                    <h4 className="mb-3">Nombre: {product.name}</h4>
                                    <h4 className="mb-3">Precio: {product.price}</h4>
                                    <button className='btn btn-warning ms-5' data-bs-toggle="modal" data-bs-target="#myModal">Editar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
