import React, { useContext, useEffect, useRef, useState } from "react";
import { UseCart } from "../App";
import { useNavigate } from "react-router-dom";
import { lord } from "../axios";

function Checkout() {
    const { cart, setCart } = useContext(UseCart);
    const { token, setToken } = useState(localStorage.getItem('token'));
    const firstNameRef = useRef()
    const addressRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()

    function guest(e) {
        e.preventDefault()

        const userForm = {
            'address': addressRef.current.value,
            'name': firstNameRef.current.value,
            'cart': cart,
        }

        lord.post('orders', userForm)
            .then((response) => {
                const data = response.data;

                // if (data.message === "Request failed with status code 400") {
                //     alert("Username yoki parol noto'g'ri");
                // }
                console.log(data);

                // if (data.user) {
                //     localStorage.setItem('jwt', data.jwt);
                //     localStorage.setItem('user', JSON.stringify(data));
                //     navigate('/');
                // }
            })
            .catch((error) => {
                console.log(error);
                alert("Parol yoki email noto'g'ri");
            })
    }

    return (
        <div className="container max-w-[1200px] mx-auto pt-20">
            {
                cart.length ?
                    <h1 className="border-b text-3xl pb-5 font-semibold text-[#394E6A]">Shopping Cart</h1>
                    :
                    <h1 className="border-b text-3xl pb-5 font-semibold text-[#394E6A]">Your cart is empty</h1>
            }
            <div className="flex justify-between items-start mt-20">
                <div>
                    {cart.length > 0 &&
                        <div>
                            <h2 className="capitalize text-xl text-[#394E6A] font-semibold mb-5">shipping information</h2>
                            <form className="max-w-[1200px] flex items-start gap-96">
                                <div className='flex flex-col gap-4 w-[480px]'>
                                    <div className="input-bordered flex flex-col gap-2">
                                        <label className='text-[#394E6A] py-2 px-1 text-sm' htmlFor="em">First Name</label>
                                        <input ref={firstNameRef} type="email" className="grow border border-[#e5e7eb] px-4 w-[478px] h-12 rounded-lg bg-white" id='em' />
                                    </div>
                                    <div className="input-bordered flex flex-col gap-2">
                                        <label className='text-[#394E6A] py-2 px-1 text-sm' htmlFor="pa">Address</label>
                                        <input ref={addressRef} type="password" className="grow border border-[#e5e7eb] px-4 w-[478px] h-12 rounded-lg bg-white" id='pa' />
                                    </div>
                                    <div className='flex flex-col gap-3 my-4'>
                                        <button onClick={guest} className='bg-[#057AFF] h-12 rounded-lg text-[#DBE1FF] uppercase font-semibold'>place your order</button>
                                    </div>
                                </div>
                                <div className="bg-[#F0F6FF] p-8 w-[328px] rounded-xl">
                                    <div className="w-[258px] flex justify-between text-[#394E6A] pb-2 border-b">
                                        <p>Subtotal</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}

export default Checkout;
