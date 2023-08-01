import React, { useState, createContext, useEffect } from 'react'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './NotFound'
import { PrinPage } from './pages/PrinPage'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
/* vistas */
import { NewsPage } from './pages/vistas/NewsPage'
import { NewsSelect } from './pages/vistas/vista de una cosa/NewsSelect'
import { ForumPage } from './pages/vistas/ForumPage'
import { ForumSelect } from './pages/vistas/vista de una cosa/ForumSelect'
import { CompanyPage } from './pages/vistas/CompanyPage'
import { CompanySelect } from './pages/vistas/vista de una cosa/CompanySelect'
import { ReciclarPage } from './pages/vistas/ReciclarPage'
import { CuentaPage } from './pages/user/CuentaPage'
import { InfoSales } from './pages/user/InfoSales'

/* admin */
import { UserPage } from './pages/admin/UserPage'
import { SalePage } from './pages/admin/SalePage'
import { Products } from './pages/Admin/Products'
import { ProductSelect } from './pages/vistas/vista de una cosa/ProductSelect'


export const AuthContext = createContext();

export const Index = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
    })

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) setLoggedIn(true)
    }, [])


    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                /* demas rutas */
                {
                    path: '/login',
                    element: <LoginPage />
                },
                {
                    path: '/register',
                    element: <RegisterPage />
                },
                {
                    path: '/news',
                    element: <NewsPage />
                },
                {
                    path: '/news-Select/:id',
                    element: <NewsSelect />
                },
                {
                    path: '/forum',
                    element: <ForumPage />
                },
                {
                    path: '/forum-Select/:id',
                    element: <ForumSelect />
                },
                {
                    path: '/company',
                    element: <CompanyPage />
                },
                {
                    path: '/company-Select/:id',
                    element: <CompanySelect />
                },
                {
                    path: '/como-ayudar',
                    element: <ReciclarPage />
                },
                {
                    path: '/users',
                    element: <UserPage />
                },
                {
                    path: '/sales',
                    element: <SalePage />
                },
                {
                    path: '/products',
                    element: <Products />
                },
                {
                    path: '/product-Select/:id',
                    element: <ProductSelect />
                },
/*                 {
                    path: '/companies',
                    element: <Companies />
                }, */
                /* Cuenta del usuario */
                {
                    path: '/account',
                    element: <CuentaPage />,
                    children: [
                        {
                            path: 'sales',
                            element: <InfoSales />
                        }
                    ]
                },

            ],
        },
    ]);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}
