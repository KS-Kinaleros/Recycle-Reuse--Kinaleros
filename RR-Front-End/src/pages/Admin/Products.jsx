import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'
import { CardProduct } from '../../components/cards/CardProduct'
import { AddProduct } from '../../components/Adds/AddProduct'
import { UpdateProduct } from '../../components/Upd/UpdateProduct'
import '../vistas/Boton.css'

export const Products = () => {
  const [products, setProducts] = useState([{}])

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

  useEffect(() => { getProducts() }, [])

  return (
    <>
      <Navbar />
      <AddProduct getProducts={getProducts} />
      <div style={{ background: `url('/img/Fondo.png')`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <main>
          <div className='row g-0 justify-content-center'>
            {products.length === 0 ? (
              <div className="col-12 text-center mt-5">
                <h3>No hay productos actualmente</h3>
              </div>
            ) : (
              products.map(({ _id, name, price }, i) => (
                <CardProduct
                  key={i}
                  _id={_id}
                  name={name}
                  price={price}
                  getProducts={getProducts}
                />
              ))
            )}
          </div>
          <button className='btn btn-primary floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
        </main>
      </div>



    </>
  )
}
