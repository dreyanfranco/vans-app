import { Link, Route, Routes } from 'react-router-dom';
import HostLayout from './components/HostLayout/HostLayout';
import Layout from './components/Layout';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Dashboard from './pages/Host/Dashboard';
import HostVanDetail from './pages/Host/HostVanDetail/HostVanDetail';
import HostVanInfo from './pages/Host/HostVanInfo/HostVanInfo';
import HostVanPhotos from './pages/Host/HostVanPhotos/HostVanPhotos';
import HostVanPricing from './pages/Host/HostVanPricing/HostVanPricing';
import HostVans from './pages/Host/HostVans/HostVans';
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
            <Route path="vans/:van_id" element={<HostVanDetail />} >
              <Route index element={<HostVanInfo />} />
              <Route path='pricing' element={<HostVanPricing />} />
              <Route path='photos' element={<HostVanPhotos />} />
            </Route>
            <Route path="new-van" element={<VanForm />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
