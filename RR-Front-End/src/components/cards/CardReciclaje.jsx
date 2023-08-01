import React from 'react'
import '../cards/CardReci.css'

export const CardReciclaje = ({ title, content }) => {
    return (
        <>
            <div className='containerHomeRe' >

                <div className='text-containerReciclaje' >
                    <div className='titleReciclaje' >
                        {title}
                        <hr />
                    </div>
                    <div className='contentReciclaje'>
                        {content}
                    </div>
                </div>
            </div>
        </>
    )
}
