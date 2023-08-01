import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Reciclaje } from '../../assets/Reciclaje';
import { CardReciclaje } from '../../components/cards/CardReciclaje';

export const ReciclarPage = () => {

    const arrayReciclaje = Reciclaje;

    return (
        <>
            <Navbar />
            <div className='container'>
                <h1 className='text-center'>Como podemos ayudar al planeta!!!</h1>

                <div className='d-flex flex-column align-items-center'>
                    {arrayReciclaje &&
                        arrayReciclaje.map((reciclaje) => (
                            <CardReciclaje
                                key={reciclaje.title}
                                title={reciclaje.title}
                                content={reciclaje.content}
                            />
                        ))}
                </div>
            </div>
        </>
    )
}
