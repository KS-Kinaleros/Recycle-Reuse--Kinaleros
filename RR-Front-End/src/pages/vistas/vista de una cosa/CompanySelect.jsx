import React, { useEffect, useState } from 'react'
import { Navbar } from '../../../components/Navbar'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { SaleProduct } from '../../../components/Adds/saleProduct';
import { UpdateCompany } from '../../../components/Upd/UpdateCompany';
import Swal from 'sweetalert2';

export const CompanySelect = ({ prop }) => {
  const { id } = useParams()
  const [company, setCompany] = useState({})
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const getCompany = async () => {
    try {
      const { data } = await axios(`http://localhost:3400/company/getCompany/${id}`)
      if (data.existCompany) {
        setCompany(data.existCompany)
        console.log(data.existCompany)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
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

  const deleteCompany = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:3400/company/deleteCompany/${id}`, { headers: headers })
      Swal.fire({
        title: `${data.message}`,
        icon: "success",
      })
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: `${err.response.data.message}`,
        icon: "warning",
      })
    }
  }

  const elimCompany = async () => {
    try {
      Swal.fire({
        title: 'Estas seguro de eliminar a la empresa?',
        text: "No se podra revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCompany()
          navigate('/company')
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


  useEffect(() => { getCompany(), getUserToken() }, [])

  return (
    <>
      <Navbar />
      <SaleProduct />
      <UpdateCompany getCompany={getCompany} />
      <section>
        <div className="container py-5">

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src="../img/empresas.png" alt="empresa" style={{ width: "350px", borderRadius: '20px' }} />
                  <h5 className="my-3">{company.name}</h5>

                </div>
              </div>
              <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="bi bi-google"></i>
                      <p className="mb-0">https://{company.name}.com</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="bi bi-facebook"></i>
                      <p className="mb-0">{company.name}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="bi bi-instagram"></i>
                      <p className="mb-0">@{company.name}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="bi bi-twitter"></i>
                      <p className="mb-0">@{company.name}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Nombre:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Empresa {company.name}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Correo:</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{company.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Teléfono</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">(502) {company.phone}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Dirección</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{company.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="card text-center mb-3 " style={{ height: '10rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">Vender productos</h5>
                    <p className="card-text">Realice una venta a esta empresa de una manera sencilla.</p>
                    <button className='btn btn-primary col-4' data-bs-toggle="modal" data-bs-target="#myModal">Vender</button>
                  </div>
                </div>
              </div>
              {user.role === 'ADMIN' ? (
                <>
                  <div className="row">
                    <div className="card text-center mb-3 " style={{ height: '10rem' }}>
                      <div className="card-body">
                        <h5 className="card-title">Solo Administradores</h5>
                        <p className="card-text">Realice una manipulacion de esta empresa de una manera sencilla.</p>
                        <button className='btn btn-primary col-4 ms-2' data-bs-toggle="modal" data-bs-target="#myUpdateCompany">Editar</button>
                        <button className='btn btn-warning col-4 ms-2' onClick={() => elimCompany()} > Eliminar</button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (<>


              </>)}



            </div>
          </div>
        </div>
      </section>
    </>
  )
}
