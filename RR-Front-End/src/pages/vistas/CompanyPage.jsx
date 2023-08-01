import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { CardCompanies } from '../../components/cards/CardCompanies'
import { AddCompany } from '../../components/Adds/AddCompany'
import './search.css'
import './Boton.css'

export const CompanyPage = () => {
    const [company, setCompany] = useState([{}])
    const [user, setUser] = useState({})
    const [form, setForm] = useState({
        name: ''
    })

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const getCompany = async () => {
        try {
            const { data } = await axios.get('http://localhost:3400/company/getCompanies')
            if (data.companies) {
                setCompany(data.companies)
                console.log(data.companies)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const searchCompany = async () => {
        try {
            const { data } = await axios.post('http://localhost:3400/company/searchCompany', form)
            if (data.companies) {
                setCompany(data.companies)
                console.log(data.companies)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getUserToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:3400/user/getUser', { headers: headers })
            if (data.user) {
                setUser(data.user)
                console.log(data.user)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getCompany(), getUserToken() }, [])

    return (
        <>
            <Navbar />
            <AddCompany getCompany={getCompany} />

            <div style={{ background: `url('/img/Fondo.png')`, backgroundSize: 'cover', minHeight: '100vh' }}>

                {/* bara de busqueda */}
                <div className="search_wrap search_wrap_3">
                    <div className="search_box">
                        <input type="text" className="input" name='name' placeholder="search..." onChange={handleChange} />
                        <div className="btn btn_common" onClick={() => searchCompany()}>
                            {/* Agregar onClick para activar la búsqueda */}
                            <i className="bi bi-search" style={{ color: 'white' }}></i>
                        </div>
                    </div>
                </div>

                {/* empresas */}
                <main>
                    {company.length === 0 ? (
                        <div className="row g-0 justify-content-center">
                            <div className="col-12 text-center mt-5">
                                <h3>No hay empresas actualmente</h3>
                            </div>
                        </div>
                    ) : (
                        <div className='row g-0 justify-content-center'>
                            {company.map(({ _id, name, description, ratings }, i) => (
                                <CardCompanies
                                    key={i}
                                    _id={_id}
                                    name={name}
                                    description={description}
                                    ratings={ratings}
                                />
                            ))}
                        </div>
                    )}
                </main>

                {/* hacer un terniario para que solo lo miren admins */}
                {user.role === 'ADMIN' ? (
                    <>
                        <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myCompanyAdd">Nueva Empresa</button>
                    </>
                ) : (null)}

            </div>




        </>
    )
}
