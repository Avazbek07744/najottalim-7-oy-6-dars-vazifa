import React, { useContext, useEffect, useState } from "react";
import { UseCart } from "../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const { cart, setCart } = useContext(UseCart);
    const [ tow, setTow ] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [jwt, setJwt] = useState(localStorage.getItem('jwt'))

    useEffect(()=>{
        if (jwt || token) {
            setTow(true)
        }
    },[])

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        if (storedCart) {
            setCart(storedCart);
        }
    }, [setCart]);

    function remove(id, color) {
        setTow(false)
        toast("Item removed from cart");
        let copied = [...cart];
        copied = copied.filter((value) => !(value.id === id && value.color === color));
        setCart(copied);
        localStorage.setItem('cart', JSON.stringify(copied));
    }

    function count(amount, color, id) {
        let copied = [...cart];
        copied = copied.map((value) => {
            if (value.id === id && value.color === color) {
                value.amount = Number(amount);
            }
            return value;
        });
        setCart(copied);
        localStorage.setItem('cart', JSON.stringify(copied));
    }

    return (
        <div className="container max-w-[1200px] mx-auto pt-20">
            {
                token ?
                    <h1 className="border-b text-3xl pb-5 font-semibold text-[#394E6A]">Your cart is empty</h1>
                    :
                    <h1 className="border-b text-3xl pb-5 font-semibold text-[#394E6A]">Shopping Cart</h1>
            }
            {cart && cart.length > 0 ? (
                <div className="flex justify-between items-start mt-20">
                    <div>
                        {cart.map((v) => (
                            <div key={v.id + v.color} className="w-[714px] flex justify-between border-b p-4">
                                <img
                                    className="w-32 h-32 object-cover rounded-md"
                                    src={v.image}
                                    alt={v.title}
                                />
                                <div>
                                    <h2 className="text-[#394E6A] text-[16px] font-bold mb-2 capitalize">{v.title}</h2>
                                    <h4 className="text-[#CBD9EF] text-[14px] mb-4">{v.product.attributes.company}</h4>
                                    <div className="flex gap-2 items-center text-[#394E6A] text-[14px]">
                                        <p>Color:</p>
                                        <span
                                            style={{ backgroundColor: v.color }}
                                            className="block w-4 h-4 rounded-full cursor-pointer"
                                        ></span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-[#394E6A]">Amount</p>
                                    <select
                                        className="w-12 px-1 border mb-2 bg-white rounded-md"
                                        value={v.amount}
                                        onChange={(e) => count(e.target.value, v.color, v.id)}
                                    >
                                        {[...Array(20)].map((_, i) => (
                                            <option key={i} value={i + 1}>
                                                {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <span
                                        onClick={() => remove(v.id, v.color)}
                                        className="text-[14px] cursor-pointer text-blue-500 hover:underline"
                                    >
                                        Remove
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[#394E6A] text-[16px] font-bold">${v.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="bg-[#F0F6FF] p-8 w-[323px] rounded-xl">
                            <div className="w-[258px] flex justify-between text-[#394E6A] pb-2 border-b">
                                <p>Subtotal</p>
                            </div>
                        </div>
                        <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md uppercase">{tow?'Proceed to Checkout':'please login'}</button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[50vh]">
                    <h2 className="text-2xl font-bold text-[#394E6A]">Your cart is empty</h2>
                </div>
            )}
            <ToastContainer
                position="top-center"
                autoClose={5000}
            />
        </div>
    );
}

export default Cart;
