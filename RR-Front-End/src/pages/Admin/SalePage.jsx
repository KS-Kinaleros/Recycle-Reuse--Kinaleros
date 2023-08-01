import React, { useEffect } from 'react'
import { Navbar } from '../../components/Navbar'
import { CardSales } from '../../components/cards/CardSales'
import axios from 'axios'
import { useState } from 'react'

export const SalePage = () => {
  const [sales, setSales] = useState([{}])

  const getSales = async () => {
    try {
      const { data } = await axios.get('http://localhost:3400/sale/getSalles')
      if (data.sales) {
        setSales(data.sales)
        console.log(data.sales)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { getSales() }, [])
  return (
    <>
      <Navbar />
      <div style={{ background: `url('/img/Fondo.png')`, backgroundSize: 'cover', minHeight: '100vh' }}>
        <main>
          <div className='row g-0 justify-content-center'>
            {sales.length === 0 ? (
              <div className="col-12 text-center mt-5">
                <h3>No hay ventas actualmente</h3>
              </div>
            ) : (
              sales.map(({ _id, date, user, company, product, quantity, total }, i) => (
                <CardSales
                  key={i}
                  _id={_id}
                  date={date}
                  user={user?.name}
                  company={company?.name}
                  product={product?.name}
                  quantity={quantity}
                  total={total}
                  getSales={getSales}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </>
  )
}
