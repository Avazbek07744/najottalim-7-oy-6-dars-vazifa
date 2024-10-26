import React, { useEffect, useState } from 'react'
import { lord } from '../axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [cards, setCards] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        lord.get('products?featured=true')
            .then((res) => {
                setCards(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const hendelClick = (id) => {
        navigate(`/products/${id}`)
    }

    return (
        <div>
            <main className='flex justify-between items-center py-20 max-w-[1300px] mx-auto'>
                <div>
                    <h1 className='text-[#394E6A] text-6xl w-[494px] font-bold mb-8'>We are changing the way people shop</h1>
                    <p className='text-[#394E6A] text-lg w-[494px] mb-10'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
                    </p>
                    <button className='bg-[#057AFF] text-[#DBE1FF] px-5 py-3 rounded-md text-lg'>Our Products</button>
                </div>

                <div className='py-4 ps-4 bg-[#021431] max-w-[462px] rounded-2xl'>
                    <div className="carousel">
                        <div className="carousel-item max-w-80 h-[416px] me-5">
                            <img
                                className='rounded-2xl object-cover'
                                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero1-deae5a1f.webp"
                                alt="" />
                        </div>
                        <div className="carousel-item max-w-80 h-[416px] me-5">
                            <img
                                className='rounded-2xl object-cover'
                                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero2-2271e3ad.webp"
                                alt="" />
                        </div>
                        <div className="carousel-item max-w-80 h-[416px] me-5">
                            <img
                                className='rounded-2xl object-cover'
                                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero3-a83f0357.webp"
                                alt="" />
                        </div>
                        <div className="carousel-item max-w-80 h-[416px] me-5">
                            <img
                                className='rounded-2xl object-cover'
                                src="https://react-vite-comfy-store-v2.netlify.app/assets/hero4-4b9de90e.webp"
                                alt="" />
                        </div>
                    </div>
                </div>
            </main>

            <div className='max-w-[1300px] mx-auto pt-20'>
                <h2 className='text-3xl pb-5 font-semibold capitalize text-[#394E6A] border-b-2 w-full'>featured products</h2>
                <div className='flex gap-5 py-12 pb-28'>
                    {
                        cards.length > 0 && cards.map((v) => {
                            return (
                                <div key={v.id} onClick={() => { hendelClick(v.id) }} className='w-[429px] px-4 pt-4 shadow-xl hover:shadow-2xl transition duration-300 rounded-xl'>
                                    <img className="rounded-xl h-64 md:h-48 w-full object-cover" src={v.attributes.image} alt="" />
                                    <div className='p-8 text-center'>
                                        <h3 className='text-[#394E6A] text-xl capitalize font-semibold'>{v.attributes.title}</h3>
                                        <p className='text-[#463AA1]'>{v.attributes.price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Home;
