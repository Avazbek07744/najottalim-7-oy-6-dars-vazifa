import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lord } from '../axios';

function Products() {
    const [products, setProducts] = useState([]);
    const [freeShipping, setFreeShipping] = useState(false);
    const [price, setPrice] = useState(100000);
    const navigate = useNavigate();

    const searchRef = useRef();
    const categoryRef = useRef();
    const companyRef = useRef();
    const sortRef = useRef();
    const formRef = useRef();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = (query = '') => {
        lord.get(`products${query}`)
            .then(response => {
                if (response.status === 200) {
                    setProducts(response.data.data);
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const handleReset = () => {
        formRef.current.reset();
        setFreeShipping(false);
        setPrice(100000);
        fetchProducts();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = `?search=${searchRef.current.value}&category=${categoryRef.current.value}&company=${companyRef.current.value}&order=${sortRef.current.value}&price=${price}&shipping=${freeShipping ? 'on' : 'off'}`;
        fetchProducts(searchQuery);
    };

    const handleNavigate = (id) => {
        navigate(`/products/${id}`);
    };

    return (
        <div>
            <form ref={formRef} className='bg-[#F0F6FF] text-[#394E6a] max-w-[1100px] mx-auto my-20 p-10'>
                <div className='flex flex-col gap-16'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-3'>
                            <label className='capitalize' htmlFor="search">Search product</label>
                            <input ref={searchRef} className='bg-white w-60 py-1 px-3 rounded-lg border border-[#D7DCE1]' id='search' type="text" />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="category">Select Category</label>
                            <select id='category' ref={categoryRef} className=' w-60 py-1 px-3 rounded-lg bg-white border border-[#D7DCE1]'>
                                <option value="all">All</option>
                                <option value="tables">Tables</option>
                                <option value="chairs">Chairs</option>
                                <option value="kids">Kids</option>
                                <option value="sofas">Sofas</option>
                                <option value="beds">Beds</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="company">Select Company</label>
                            <select ref={companyRef} className='bg-white w-60 py-1 px-3 rounded-lg border border-[#D7DCE1]'>
                                <option value="all">All</option>
                                <option value="modenza">Modenza</option>
                                <option value="luxora">Luxora</option>
                                <option value="artifex">Artifex</option>
                                <option value="comfora">Comfora</option>
                                <option value="homestead">Homestead</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="sort">Sort By</label>
                            <select ref={sortRef} className='bg-white w-60 py-1 px-3 rounded-lg border border-[#D7DCE1]'>
                                <option value="a-z">A-Z</option>
                                <option value="z-a">Z-A</option>
                                <option value="high">High Price</option>
                                <option value="low">Low Price</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="price" className='capitalize'>Select price</label>
                            <input
                                type="range"
                                max={100000}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <span>Price: ${price}</span>
                        </div>
                        <div className='flex flex-col gap-2 w-28 items-center uppercase'>
                            <label htmlFor="freeShipping">Free shipping</label>
                            <input
                                type="checkbox"
                                id="freeShipping"
                                checked={freeShipping}
                                onChange={() => setFreeShipping(!freeShipping)}
                                className="checkbox checkbox-primary border-[#057AFF] checkbox-sm"
                            />
                        </div>
                        <div className='flex gap-4'>
                            <button onClick={handleSearch} className='w-[230px] px-3 py-1 rounded-lg font-semibold text-sm bg-[#057AFF] text-[#DBE1FF] uppercase'>Search</button>
                            <button onClick={handleReset} className='w-[230px] px-3 py-1 rounded-lg font-semibold text-sm bg-[#C149AD] text-[#F5DBEE] uppercase'>Reset</button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="flex flex-wrap gap-8 p-8 max-w-[1200px] mx-auto">
                {products.map((v) => (
                    <div key={v.id} onClick={() => { handleNavigate(v.id) }} className='w-[352px] px-4 pt-4 shadow-xl hover:shadow-2xl transition duration-300 rounded-xl'>
                        <img className="rounded-xl h-48 md:h-48 w-full object-cover" src={v.attributes.image} alt={v.attributes.title} />
                        <div className='p-8 text-center'>
                            <h3 className='text-[#394E6A] text-xl capitalize font-semibold'>{v.attributes.title}</h3>
                            <p className='text-[#463AA1]'>${v.attributes.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
