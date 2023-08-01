import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const InfoSales = () => {

    const [sales, setSales] = useState([{}])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getSales = async () => {
        try {
            const { data } = await axios('http://localhost:3400/sale/getSaleUser', { headers: headers })
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
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Compañia</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        {/* Otros encabezados de columna */}
                    </tr>
                </thead>
                <tbody>
                    {
                        sales?.map(({ _id, date, product, company, quantity, total }, i) => {
                            return (
                                <tr key={i}>
                                    <td>{date}</td>
                                    <td>{company?.name}</td>
                                    <td>{product?.name}</td>
                                    <td>{quantity}</td>
                                    <td>Q{total}.00</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}
