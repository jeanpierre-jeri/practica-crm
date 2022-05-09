import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from '../components/Formulario'
import Spinner from '../components/Spinner'

const EditarCliente = () => {
   const { id } = useParams()

   const [cliente, setCliente] = useState({})
   const [cargando, setCargando] = useState(true)

   useEffect(() => {
      const obtenerClienteAPI = async () => {
         try {
            setCargando(true)
            const url = `http://localhost:4000/clientes/${id}`
            const resp = await fetch(url)
            const data = await resp.json()
            setCliente(data)
         } catch (error) {
            console.log(error)
         }
         setCargando(false)
      }
      obtenerClienteAPI()
   }, [])

   if (cargando) {
      return <Spinner />
   }

   if (!Object.keys(cliente).length) return <div>Cliente no válido</div>

   return (
      <>
         <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
         <p className="mt-3">
            Utiliza este formulario para editar los datos de un cliente
         </p>
         <Formulario cliente={cliente} />
      </>
   )
}

export default EditarCliente
