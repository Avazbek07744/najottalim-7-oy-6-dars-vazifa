import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { lord } from '../axios';
import { UseCart } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Detail() {
    const [product, setProduct] = useState({});
    const [color, setColor] = useState('');
    const [amount, setAmount] = useState(1);
    const { id } = useParams();
    const { cart, setCart, setSum, sum } = useContext(UseCart);

    useEffect(() => {
        lord.get(`products/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setProduct(response.data.data);
                    setColor(response.data.data.attributes.colors[0]);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    const handleAdd = () => {
        toast("Item added to cart");
        const existingItem = cart.find(item => item.id == product.id && item.color == color);
        
        if (existingItem) {
            const updatedCart = cart.map(item => {
                if (item.id == product.id && item.color == color) {
                    return { ...item, amount: item.amount + amount };
                }
                return item;
            });
            
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            const cartItem = {
                id: product.id,
                title: product.attributes.title,
                price: product.attributes.price,
                image: product.attributes.image,
                color,
                amount,
                product: product
            };
            
            const updatedCart = [...cart, cartItem];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));

        }

    };

    return (
        <div>
            {product.id && (
                <div>
                    <ul className='mt-20 flex gap-5 max-w-[1190px] mx-auto'>
                        <Link to='/' className={`hover:underline text-lg text-[#394E6A]`}>Home</Link>
                        <Link to='/products' className={`hover:underline text-lg text-[#394E6A]`}>Products</Link>
                    </ul>
                    <div className='container flex gap-5 justify-between max-w-[1250px] mx-auto items-start p-7 bg-transparent'>
                        <img className='w-[512px] object-cover h-96 rounded-xl' src={product.attributes.image} alt="book img" />
                        <div className="px-5">
                            <h2 className="text-3xl font-bold mb-3 capitalize text-[#394E6A]">{product.attributes.title}</h2>
                            <h2 className="text-xl font-bold mb-3">{product.attributes.company}</h2>
                            <h2 className="text-xl mb-5 capitalize text-[#394E6A]">${product.attributes.price}</h2>
                            <p className={`w-[580px] text-lg text-[#394E6A]`}>{product.attributes.description}</p>
                            <div className="my-2">
                                <h4 className='text-md mb-2 font-semibold text-[#394E6A] mt-5'>Colors</h4>
                                <ul className="flex gap-3">
                                    {product.attributes.colors && product.attributes.colors.map((col, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                backgroundColor: col,
                                                border: color === col ? '2px solid black' : 'none',
                                            }}
                                            className="p-3 w-max rounded-full cursor-pointer"
                                            onClick={() => setColor(col)}
                                        ></li>
                                    ))}
                                </ul>
                                <h4 className='text-md mb-2 font-semibold text-[#394E6A] mt-5'>Amount</h4>
                                <select value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="select border border-black text-black bg-transparent w-full max-w-xs">
                                    {[...Array(20)].map((_, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleAdd} className='uppercase py-3 px-5 bg-[#463AA1] rounded-md text-[#DBD4ED] mt-10'>Add to Bag</button>
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
