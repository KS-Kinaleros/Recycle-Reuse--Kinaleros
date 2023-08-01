import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from '../../../components/Navbar';
import { UpdateForum } from '../../../components/Upd/UpdateForum';
import Swal from 'sweetalert2'

export const ForumSelect = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const [forum, setForum] = useState({})
    const [answers, setAnswers] = useState([]);
    const [user, setUser] = useState({})
    const [form, setForm] = useState({
        answers: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getForum = async () => {
        try {
            const { data } = await axios(`http://localhost:3400/forum/getForum/${id}`)
            if (data.existForum) {
                setForum(data.existForum)
                console.log(data.existForum)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getAnswers = async () => {
        try {
            const { data } = await axios(`http://localhost:3400/forum/getAnswers/${id}`);
            if (data.answers && data.answers.length > 0) {
                // Aquí accedemos al primer elemento del array "answers"
                // y establecemos el estado "answers" con el array de respuestas
                setAnswers(data.answers[0].answers);
                console.log(data.answers[0].answers);
            }
        } catch (err) {
            console.log(err);
        }
    };

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

    const addAnswer = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.put(`http://localhost:3400/forum/addAnswer/${id}`, form, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
            setForm({ answers: "" });
            getAnswers()
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }

    const deleteForum = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:3400/forum/deleteForumAccoutn/${id}`,{ headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
            navigate('/forum')
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }

    const deleteAnswer = async (answerId) => {
        try {
            const { data } = await axios.delete(`http://localhost:3400/forum/deleteAnswer/${id}/${answerId}`, { headers: headers })
            Swal.fire({
                title: `${data.message}`,
                icon: "success",
            })
            getAnswers()
        } catch (err) {
            console.log(err)
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: "warning",
            })
        }
    }

    useEffect(() => { getForum(), getAnswers(), getUserToken() }, [])

    return (
        <>
            <Navbar />
            <UpdateForum getForum={getForum} />
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="card border border-dark" style={{ maxWidth: '850px' }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className='card-title'>{forum.user?.name}</h6>
                                </div>
                                <div>
                                    <h6 className='card-title'>{forum.date}</h6>
                                </div>
                            </div>
                            <h4 className="card-title">{forum.title}</h4>
                            <p className="card-text">{forum.content}</p>

                            {forum.user && forum.user._id === user._id ? (
                                <div>
                                    {/* Aquí puedes agregar los botones de edición y eliminación */}
                                    <button className="btn btn-primary mr-2" data-bs-toggle="modal" data-bs-target="#myForumUpdate">Editar</button>
                                    <button className="btn btn-danger" onClick={() => deleteForum()}>Eliminar</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>

            {/* que la persona haga su comentario */}
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="card border border-success" style={{ maxWidth: '850px' }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h6 className="card-title"> Comentaras como: {user.name}</h6>
                                </div>
                            </div>
                            <div className="d-flex">
                                {/* Establecer el valor del input con el estado form.answers */}
                                <input
                                    type="text"
                                    className="form-control flex-grow-1 mr-2"
                                    name="answers"
                                    style={{ height: '120px' }}
                                    value={form.answers}
                                    onChange={handleChange}
                                    placeholder='Escribe aqui tu comentario'
                                />
                                <button className="btn btn-success" onClick={(e) => addAnswer(e)} style={{ width: '100px', height: '40px' }}>
                                    comentar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* ver los comentarios que tiene */}
            <div className="container mt-3">
                <div className="row justify-content-center">
                    {answers.map((answer) => (
                        <div key={answer._id} className="card border border-primary" style={{ maxWidth: '850px', marginBottom: '10px' }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <h6 className="card-title">{answer.user?.name}</h6>
                                    </div>
                                    <div>
                                        <h6 className="card-title">{answer.date}</h6>
                                    </div>
                                </div>
                                <p className="card-text">{answer.answer}</p>
                                {/* Operador ternario para mostrar el botón de eliminar */}
                                {user._id === forum.user?._id || user._id === answer.user?._id ? (
                                    <div>
                                        {/* Agrega aquí el botón de eliminar */}
                                        <button className="btn btn-danger mr-2" onClick={() => deleteAnswer(answer._id)}>Eliminar</button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}
