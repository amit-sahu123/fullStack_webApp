import { useState } from 'react'
import './App.css'
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Home from "./pages/Home.jsx";
import NoPage from "./pages/NoPage.jsx";
import MyProperties from './pages/my-properties.jsx';
import PropertydetailPage from './pages/PropertydetailPage.jsx';
import AddProperty from './pages/AddProperty.jsx';
import Blogs from './Components/Blogs.jsx';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Layout >
      <Routes>
        <Route >
          <Route path='login' element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/my-properties" element={<MyProperties />} />
          <Route path="/property/:id" element={<PropertydetailPage />} />
          <Route path="/add-property" element={<AddProperty/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Layout>
    </BrowserRouter>
  )
}

export default App
