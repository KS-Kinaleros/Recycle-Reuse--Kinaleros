import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { CardNews } from '../../components/cards/CardNews'

export const NewsPage = () => {
    const [news, setNews] = useState([{}])

    const getNews = async () => {
        try {
            const { data } = await axios.get('http://localhost:3400/news/getNews')
            if (data.news) {
                setNews(data.news)
                console.log(data.news)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getNews() }, [])

    return (
        <>
            <Navbar />
            <div style={{ background: `url('/img/Fondo.png')`, backgroundSize: 'cover', minHeight: '100vh' }}>
                <main>
                    {news.length === 0 ? (
                        <div className="row g-0 justify-content-center">
                            <div className="col-12 text-center mt-5">
                                <h3>No hay noticias actualmente</h3>
                            </div>
                        </div>
                    ) : (
                        <div className='row g-0 justify-content-center'>
                            {news.map(({ _id, date, title, description }, i) => (
                                <CardNews
                                    key={_id}
                                    _id={_id}
                                    title={title}
                                    description={description}
                                    date={date}
                                />
                            ))}
                        </div>
                    )}
                </main>
            </div>




        </>
    )
}
