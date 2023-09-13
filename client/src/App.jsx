import { Link, Route, Routes } from 'react-router-dom';
import HostLayout from './components/HostLayout/HostLayout';
import Layout from './components/Layout';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Dashboard from './pages/Host/Dashboard';
import HostVanDetail from './pages/Host/HostVanDetail';
import HostVans from './pages/Host/HostVans';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import VanDetail from './pages/VanDetail/VanDetail';
import VanForm from './pages/VanForm/VanForm';
import Vans from './pages/Vans/Vans';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:van_id" element={<VanDetail />} />

          <Route path="host" element={<HostLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:van_id" element={<HostVanDetail />} />
            <Route path="new-van" element={<VanForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
