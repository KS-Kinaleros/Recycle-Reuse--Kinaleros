import React from 'react'
import { useNavigate } from 'react-router-dom'

export const CardCompanies = ({ _id, name, description, ratings }) => {
    const navigate = useNavigate()
    return (
        <>
            <div className="card mb-3 ms-5 mt-3" style={{ maxWidth: '400px' }}>
                <img src="./img/empresas.png" className="card-img-top" alt="empresas" style={{ maxWidth: "500px" }} />
                <div className="card-body">
                    <h5 className="card-title">Empresa {name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">{ratings}</small></p>
                </div>
                <div className='card-footer'>
                    <button onClick={() => { navigate(`/company-Select/${_id}`) }} className='btn btn-primary'>Ver mas</button>
                </div>
            </div>
        </>
    )
}
