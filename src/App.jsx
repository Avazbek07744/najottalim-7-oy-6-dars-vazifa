import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Deteil from './pages/Deteil'
import Orders from './pages/Order'
import Checkout from './pages/Checkout'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import MainLeout from './leout/MainLeout'
import { createContext } from 'react'

export const UseCart = createContext()

const App = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const param = useParams()
  const [sum, setSum] = useState(0)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
    else {
      if (token) {
        if (!(location.pathname == '/' || location.pathname.includes('register') || location.pathname.includes('about') || location.pathname.includes('product') || location.pathname.includes('cart'))) {
          navigate('/login')
        }
      }
    }
  }, [navigate])

  const Protection = ({ isAuth, children }) => {
    if (!isAuth) {
      navigate('/login')
    }
    return children;
  };
  


  return (
    <div>
      <UseCart.Provider value={{ cart, setCart, sum, setSum }}>
        <Routes>
          <Route path='/'
            element={
              <MainLeout>
                <Home></Home>
              </MainLeout>}>
          </Route>

          <Route path='/about'
            element={
              <MainLeout>
                <About></About>
              </MainLeout>}>
          </Route>

          <Route path='/cart'
            element={
              <MainLeout>
                <Cart></Cart>
              </MainLeout>}>
          </Route>

          <Route path='/products'
            element={
              <MainLeout>
                <Products></Products>
              </MainLeout>}>
          </Route>

          <Route path='/products/:id'
            element={
              <MainLeout>
                <Deteil></Deteil>
              </MainLeout>}>
          </Route>

          <Route path='/orders'
            element={
              <Protection isAuth={token}>
                <MainLeout>
                  <Orders></Orders>
                </MainLeout>
              </Protection>
            }>
          </Route>
          <Route path='/checkout'
            element={
              <Protection isAuth={token}>
                <MainLeout>
                  <Checkout></Checkout>
                </MainLeout>
              </Protection>
            }>

          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='*' element={<ErrorPage></ErrorPage>}></Route>

        </Routes>
      </UseCart.Provider>
    </div>
  )
}

export default App
