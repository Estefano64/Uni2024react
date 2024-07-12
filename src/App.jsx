import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import MainFooter from './common/MainFooter'
import MainHeader from './common/MainHeader'
import MainNav from './common/MainNav'
import Inicio from './pages/Inicio'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'
import Tienda from './pages/Tienda'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Directores from './pages/Directores'
import Futbol from './pages/Futbol'
import Pedidos from './pages/Pedidos'
import PedidosDetalle from './pages/PedidosDetalle'
import Seleccionados from './pages/Seleccionados'
import Paises from './pages/Paises'

function App() {
  return (
    <>
      <BrowserRouter>
        <MainHeader/>
        <MainNav/>
        
        <main>
          <Routes>

            <Route path='/' element={<Inicio/>} />
            <Route path='/proveedores' element={<Proveedores/>} />
            <Route path='/empleados' element={<Empleados/>} />
            <Route path='/tienda' element={<Tienda/>} />
            <Route path='/productodetalle/:idproducto' element={<ProductoDetalle/>} />
            <Route path='/carrito' element={<Carrito/>} />
            <Route path='/directores' element={<Directores/>} />
            <Route path='/futbol' element={<Futbol/>} />
            <Route path='/pedidos' element={<Pedidos/>} />
            <Route path='/pedidosdetalle/:idpedido' element={<PedidosDetalle/>} />
            <Route path='/seleccionados' element={<Seleccionados/>} />
            <Route path='/paises' element={<Paises/>} />
          </Routes>
        </main>

        <MainFooter/>
      </BrowserRouter>
    </>
  )
}

export default App
