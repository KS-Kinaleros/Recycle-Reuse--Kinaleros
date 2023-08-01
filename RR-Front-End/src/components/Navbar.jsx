import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Index'
import axios from 'axios'

export const Navbar = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }
  
  const loginOut = () => {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
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

  useEffect(() => { getUserToken() }, [])

  return (
    <>
      {user.role === 'CLIENT' ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand" href="#">
                <img src="./img/logo.png" alt="" width="auto" height="55" className="d-inline-block align-text-top" />
              </Link>


              {/* dependiendo del rol de lacuenta mostrar unas cosas */}
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  {/* para las rutas */}
                  <li className="nav-item">
                    <Link to="/como-ayudar" className="nav-link active" aria-current="page">
                      Como reciclar
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/news" className="nav-link active" aria-current="page">
                      Noticias
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/company" className="nav-link active" aria-current="page">
                      Empresas
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/forum" className="nav-link active" aria-current="page">
                      Foro
                    </Link>
                  </li>
                </ul>

                <div>
                  {/* ver su cuenta */}
                  {loggedIn ? (
                    <>
                      <Link to="/account">
                        <button type="button" className="btn btn-outline-secondary mx-2">
                          Su cuenta
                        </button>
                      </Link>
                      <button type="button" className="btn btn-danger me-3" onClick={loginOut}>
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <Link to="/login">
                      <img src="./img/cuenta.png" alt="" width="auto" height="55" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>

        </>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand" href="#">
                <img src="./img/logo.png" alt="" width="auto" height="55" className="d-inline-block align-text-top" />
              </Link>

              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/users" className="nav-link active" aria-current="page">
                    Usuarios
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/sales" className="nav-link active" aria-current="page">
                    Ventas
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/forum" className="nav-link active" aria-current="page">
                    Foros
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/products" className="nav-link active" aria-current="page">
                    Productos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/company" className="nav-link active" aria-current="page">
                    Empresas
                  </Link>
                </li>
              </ul>


              <div>
                {/* ver su cuenta */}
                {loggedIn ? (
                  <>
                    <Link to="/account">
                      <button type="button" className="btn btn-outline-secondary mx-2">
                        Su cuenta
                      </button>
                    </Link>
                    <button type="button" className="btn btn-danger me-3" onClick={loginOut}>
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <img src="./img/cuenta.png" alt="" width="auto" height="55" />
                  </Link>
                )}
              </div>


            </div>
          </nav >

        </>)}


    </>
  )
}
