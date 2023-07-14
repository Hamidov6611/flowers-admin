import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Starter from './pages/Starter'
import Layout from './utils/Layout'
import Login from './pages/Login'
import Kategoriya from './pages/kategoriya/Kategoriya'
import SubKategoriya from './pages/sub_kategoriya/SubKategoriya'
import Flowers from './pages/flowers/Flowers'
import Blogs from './pages/blogs/Blogs'
import Korzinka from './pages/korzinka/Korzinka'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Otziv from './pages/otziv/Otziv'
import KorzinkaDetail from './pages/korzinka/KorzinkaDetail'
import Cookies from 'js-cookie'
import Loader from './utils/Loader'
import Comments from './pages/Comments/Comments'

function App() {
  const [token, setToken] = useState("")
  const getToken = () => {
    const a = Cookies.get("token")
    if(a) {
      const b = JSON.parse(a)
      setToken(b)
    }
  }
  useEffect(() => {
    getToken()
  },[])
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Login />} />
        <Route path='/home' element={<Starter />} />
        <Route path='/Категория' element={<Layout title={'Категория'}> <Kategoriya /></Layout>} />
        <Route path='/Подкатегория' element={<Layout title={'Подкатегория'}> <SubKategoriya /></Layout>} />
        <Route path='/Цветы' element={<Layout title={'Цветы'}> <Flowers /></Layout>} />
        <Route path='/Блог' element={<Layout title={'Блог'}> <Blogs /></Layout>} />
        <Route path='/Корзина' element={<Layout title={'Корзина'}> <Korzinka /></Layout>} />
        <Route path='/Корзина/:id' element={<Layout title={'Корзина'}> <KorzinkaDetail /></Layout>} />
        <Route path='/Отзывы' element={<Layout title={'Отзывы'}><Otziv /></Layout>} />
        <Route path="/коммент" element={<Layout title="Комментарии"><Comments /></Layout>} />
        {/* <Route path='/Loader' element={<Layout><Loader /></Layout>} /> */}
    </Routes>
    <ToastContainer />
    </div>
  )
}

export default App