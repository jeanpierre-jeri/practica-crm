import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Spinner from '../components/Spinner'

const VerCliente = () => {
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

   if (!Object.keys(cliente).length) {
      return <div>No hay resultados</div>
   }

   return (
      <div>
         <h1 className="font-black text-4xl text-blue-900 ">
            Ver Cliente: {cliente.nombre}
         </h1>
         <p className="mt-3 ">Información del Cliente</p>

         <p className="text-4xl text-gray-600 mt-10">
            <span className="text-gray-800 uppercase font-bold">Cliente: </span>

            {cliente.nombre}
         </p>
         <p className="text-2xl mt-4 text-gray-600 ">
            <span className="text-gray-800 uppercase font-bold">Email: </span>

            {cliente.email}
         </p>
         <p className="text-2xl mt-4 text-gray-600 ">
            <span className="text-gray-800 uppercase font-bold">
               Teléfono:{' '}
            </span>

            {cliente.telefono}
         </p>
         <p className="text-2xl mt-4 text-gray-600 ">
            <span className="text-gray-800 uppercase font-bold">Empresa: </span>

            {cliente.empresa}
         </p>
         {cliente.notas && (
            <p className="text-2xl mt-4 text-gray-600 ">
               <span className="text-gray-800 uppercase font-bold">
                  Notas:{' '}
               </span>

               {cliente.notas}
            </p>
         )}
      </div>
   )
}

export default VerCliente
