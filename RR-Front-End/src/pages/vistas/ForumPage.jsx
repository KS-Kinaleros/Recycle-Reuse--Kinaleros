import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { CardForum } from '../../components/cards/CardForum'
import './Boton.css'
import { AddForum } from '../../components/Adds/AddForum'

export const ForumPage = () => {
    const [forum, setForum] = useState([{}])
    const [user, setUser] = useState({})

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getForum = async () => {
        try {
            const { data } = await axios.get('http://localhost:3400/forum/getForums')
            if (data.forums) {
                setForum(data.forums)
                console.log(data.forums)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getUserToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:3400/user/getUser', { headers: headers })
            if (data.user) {
                setUser(data.user)
                console.log(data.user)
            }
            console.log(user.role)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getForum(), getUserToken() }, [])
    return (
        <>
            <Navbar />
            <AddForum getForum={getForum} />
            {/* hacer una barra para crear un foro */}
            <div className='container'>
                <h3 className="text-center">Foros</h3>
            </div>

            <main>
                {forum.length === 0 ? (
                    <div className="row g-0 justify-content-center">
                        <div className="col-12 text-center mt-5">
                            <h3>No hay foros actualmente</h3>
                        </div>
                    </div>
                ) : (
                    <div className='row g-0 justify-content-center'>
                        {forum.map(({ _id, date, user, title, description }, i) => (
                            <CardForum
                                key={i}
                                _id={_id}
                                title={title}
                                user={user?.name}
                                date={date}
                                description={description}
                                getForum={getForum}
                            />
                        ))}
                    </div>
                )}
            </main>


            {/* mostrar solo si es cliente */}
            {user.role === 'CLIENT' ? (
                <>
                    <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myFormAdd">Nuevo Foro</button>
                </>
            ) : (null)}


        </>
    )
}
