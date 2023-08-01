import React, { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../Index';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    phone: '',
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const createAccount = async (e) => {
    try {
      e.preventDefault()
      const { data } = await axios.post('http://localhost:3400/user/saveUser', form)
      Swal.fire({
        title: `${data.message}`,
        icon: "success",
      })
      navigate('/login')
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
      <section className="vh-100" style={{ background: `url('/img/Fondo.png')`}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src='/img/login.png' alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", objectFit: 'cover', width: '100%', height: '100%' }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                        <span className="h1 fw-bold mb-0">Recycle & Reuse</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Crea tu cuenta rapidamente</h5>

                      {/* formulario */}
                      <form className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">Nombre</label>
                          <input type="text" className="form-control" name='name' onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Apellido</label>
                          <input type="text" className="form-control" name='surname' onChange={handleChange} />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">Telefono</label>
                          <input type="text" className="form-control" name='phone' onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Username</label>
                          <input type="text" className="form-control" name='username' onChange={handleChange} />
                        </div>

                        <div className="col-4">
                          <label className="form-label">Correo</label>

                          <div className="input-group">
                            <div className="input-group-text">@</div>
                            <input type="text" className="form-control" name='email' onChange={handleChange} />
                          </div>
                        </div>

                        <div className="col-4">
                          <label className="form-label">Contraseña</label>
                          <input type="password" className="form-control" name='password' onChange={handleChange} />
                        </div>

                        <a className="small text-muted" onClick={() => navigate('/login')}>Ya tienes cuenta?</a>

                        {/* cambiar el color del boton */}
                        <div className="pt-1 mb-4 mt-3">
                          <button onClick={(e) => createAccount(e)} className="btn btn-dark btn-lg btn-block" type="button">Crear cuenta</button>
                        </div>
                      </form>
                    </div>
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
