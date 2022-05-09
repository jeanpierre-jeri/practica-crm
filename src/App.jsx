import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'
import VerCliente from './pages/VerCliente'

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/clientes" element={<Layout />}>
               <Route index element={<Inicio />} />
               <Route path="nuevo" element={<NuevoCliente />} />
               <Route exact path=":id" element={<VerCliente />} />
               <Route path="editar/:id" element={<EditarCliente />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App
