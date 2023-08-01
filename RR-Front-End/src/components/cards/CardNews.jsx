import React from 'react'

export const CardNews = ({ title, date, description }) => {
    return (
        <>
            <div className="col-md-4 mx-3" > {/* Agregamos la clase mx-3 para crear espacio entre las tarjetas */}
                <div className="card mb-3 mt-4" style={{ width: '440px', height: '300px' }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src="./img/noticias.png" className="img-fluid rounded-start" alt="noticias" style={{ width: '100%', maxHeight: '100%' }} />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{description}</p>
                                <p className="card-text">
                                    <small className="text-body-secondary">{date}</small>
                                </p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary">Ver más</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
