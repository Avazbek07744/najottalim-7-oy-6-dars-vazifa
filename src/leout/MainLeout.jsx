import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UseCart } from '../App'
import img from '../assets/savat.svg'
import img2 from '../assets/mon.svg'

const MainLeout = ({ children }) => {
    const { cart, setCart } = useContext(UseCart)
    const [chek, setChek] = useState(0)
    const [tok, setTOk] = useState(false)
    const [username1, setUsername] = useState('')
    const token = localStorage.getItem("token")
    const jwt = localStorage.getItem("jwt")
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("user")) {
            const name = JSON.parse(localStorage.getItem("user"))
            setUsername(name.user.username)
        }else{
            setTOk(false)
        }
    }, [])
    useEffect(() => {
        if (token || jwt) {
            setTOk(true)
        }
    }, [])

    useEffect(() => {
        const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0);
        setChek(totalAmount);
    }, [cart]);

    const hendleHome = () => {
        navigate('/')
    }

    const hendleCart = () => {
        navigate('/cart')
    }

    const hendelLogout = () => {
        navigate('/')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('jwt')
        setTOk(false)
    }

    return (
        <div>
            <div className='bg-[#021431] text-[#C7C9D1] py-2'>
                <div className='flex justify-between max-w-[1150px] mx-auto'>
                    <div></div>
                    {
                        tok ?
                            <div className='flex gap-6 text-sm'>
                                <NavLink>Hello, {tok ? username1 : 'salom'}</NavLink>
                                <NavLink onClick={hendelLogout} className={'border border-[#0475FF] text-[#0475FF] px-2 font-semibold rounded-lg'}>LOGOUT</NavLink>
                            </div>
                            :
                            <div className='flex gap-6 text-sm'>
                                <NavLink to='/login'>Sign in / Guest</NavLink>
                                <NavLink to='/register'>Create Account</NavLink>
                            </div>}

                </div>
            </div>
            <header className='bg-[#F0F6FF]'>
                <nav className='flex justify-between items-center py-3 max-w-[1100px] mx-auto'>
                    <div className="bg-[#057AFF] w-max text-3xl font-semibold text-white rounded-md">
                        <h1 onClick={hendleHome} className='pb-1 px-2 pe-3 cursor-pointer'>C</h1>
                    </div>
                    <ul className='flex gap-3 text-[#394E9A] '>
                        <NavLink to='/' className={`px-4 p-1 rounded-md`}>Home</NavLink>
                        <NavLink to='/about' className={`px-4 p-1 rounded-md li`}>About</NavLink>
                        <NavLink to='/products' className={`px-4 p-1 rounded-md li`}>Products</NavLink>
                        <NavLink to='/cart' className={`px-4 p-1 rounded-md li`}>Cart</NavLink>
                        {
                            token ?
                                <div className='flex gap-3 text-[#394E9A] '>
                                    <NavLink to='/checkout' className={`px-4 p-1 rounded-md li`}>Checkout</NavLink>
                                    <NavLink to='/orders' className={`px-4 p-1 rounded-md li`}>Orders</NavLink>
                                </div> :
                                <div></div>
                        }
                    </ul>

                    <div className='flex gap-6 items-center'>
                        <button className='flex'>
                            <img src={img2} width={20} alt="" />
                        </button>
                        <button onClick={hendleCart} className='flex relative hover:bg-[#CBD5E1] px-2 py-2 rounded-full'>
                            <img src={img} width={25} alt="" />
                            <h4 className='bg-blue-500 text-white w-6 h-5 flex items-center justify-center rounded-full absolute left-6 bottom-6'>{chek}</h4>
                        </button>
                    </div>
                </nav>
            </header>
            {
                children
            }
        </div>
    )
}

export default MainLeout
