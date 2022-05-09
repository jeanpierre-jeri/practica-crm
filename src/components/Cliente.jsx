import { Link, useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar }) => {
   const navigate = useNavigate()

   const { id, nombre, empresa, email, telefono, notas } = cliente

   return (
      <tr className="border-b hover:bg-gray-50">
         <td className="p-3">{nombre}</td>
         <td className="p-3">
            <p>
               <span className="text-gray-800 uppercase font-bold ">
                  Email:
               </span>
               {email}
            </p>
            <p>
               <span className="text-gray-800 uppercase font-bold ">Tel:</span>
               {telefono}
            </p>
         </td>
         <td className="p-3">{empresa}</td>
         <td className="p-3">
            <Link
               className="bg-yellow-500 text-center hover:bg-yellow-600 block  w-full text-white p-2 uppercase font-bold text-xs"
               to={`/clientes/${id}`}
            >
               Ver
            </Link>
            <Link
               className="bg-blue-600 text-center hover:bg-blue-700 block  w-full text-white p-2 uppercase font-bold text-xs mt-3"
               to={`/clientes/editar/${id}`}
            >
               Editar
            </Link>
            <button
               className="bg-red-600 hover:bg-red-700 block  w-full text-white p-2 uppercase font-bold text-xs mt-3"
               onClick={() => handleEliminar(id)}
            >
               Eliminar
            </button>
         </td>
      </tr>
   )
}

export default Cliente
