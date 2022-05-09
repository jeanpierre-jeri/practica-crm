import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({ cliente }) => {
   const navigate = useNavigate()
   const nuevoClienteSchema = Yup.object().shape({
      nombre: Yup.string()
         .min(3, 'El nombre es muy corto')
         .max(20, 'El nombre es muy largo')
         .required('Este campo es obligatorio'),
      empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
      email: Yup.string()
         .email('Email no válido')
         .required('El email es obligatorio'),
      telefono: Yup.number()
         .positive('Número no válido')
         .integer('Número no válido')
         .typeError('Número no es válido'),
   })

   const handleSubmit = async (values, { resetForm }) => {
      const url = 'http://localhost:4000/clientes'

      try {
         let resp
         if (cliente.id) {
            resp = await fetch(`${url}/${cliente.id}`, {
               method: 'PUT',
               body: JSON.stringify(values),
               headers: {
                  'Content-type': 'application/json',
               },
            })
         } else {
            resp = await fetch(url, {
               method: 'POST',
               body: JSON.stringify(values),
               headers: {
                  'Content-type': 'application/json',
               },
            })
         }
         await resp.json()
      } catch (error) {
         console.log(error)
      }

      resetForm()
      navigate('/clientes')
   }

   return (
      <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
         <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
            {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
         </h1>

         <Formik
            initialValues={{
               nombre: cliente?.nombre ?? '',
               empresa: cliente?.empresa ?? '',
               email: cliente?.email ?? '',
               telefono: cliente?.telefono ?? '',
               notas: cliente?.notas ?? '',
            }}
            enableReinitialize={true}
            onSubmit={handleSubmit}
            validationSchema={nuevoClienteSchema}
         >
            {({ errors, touched }) => {
               return (
                  <Form className="mt-10">
                     <div className="mb-4">
                        <label className="text-gray-800 " htmlFor="nombre">
                           Nombre:
                        </label>
                        <Field
                           id="nombre"
                           type="text"
                           className="mt-2 block w-full p-3 bg-gray-50"
                           placeholder="Nombre del Cliente"
                           name="nombre"
                        />
                        <ErrorMessage
                           name="nombre"
                           component="p"
                           className="text-center my-4 bg-red-600 text-white p-3 uppercase"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="text-gray-800 " htmlFor="empresa">
                           Empresa:
                        </label>
                        <Field
                           id="empresa"
                           type="text"
                           className="mt-2 block w-full p-3 bg-gray-50"
                           placeholder="Empresa del Cliente"
                           name="empresa"
                        />
                        <ErrorMessage
                           name="empresa"
                           component="p"
                           className="text-center my-4 bg-red-600 text-white p-3 uppercase"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="text-gray-800 " htmlFor="email">
                           Email:
                        </label>
                        <Field
                           id="email"
                           type="email"
                           className="mt-2 block w-full p-3 bg-gray-50"
                           placeholder="Email del Cliente"
                           name="email"
                        />
                        <ErrorMessage
                           name="email"
                           component="p"
                           className="text-center my-4 bg-red-600 text-white p-3 uppercase"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="text-gray-800 " htmlFor="telefono">
                           Telefono:
                        </label>
                        <Field
                           id="telefono"
                           type="tel"
                           className="mt-2 block w-full p-3 bg-gray-50"
                           placeholder="Telefono del Cliente"
                           name="telefono"
                        />
                        <ErrorMessage
                           name="telefono"
                           component="p"
                           className="text-center my-4 bg-red-600 text-white p-3 uppercase"
                        />
                     </div>
                     <div className="mb-4">
                        <label className="text-gray-800 " htmlFor="notas">
                           Notas:
                        </label>
                        <Field
                           as="textarea"
                           id="notas"
                           type="text"
                           className="mt-2 block w-full p-3 bg-gray-50 h-40"
                           placeholder="Notas del Cliente"
                           name="notas"
                        />
                     </div>

                     <input
                        type="submit"
                        value={
                           cliente?.nombre
                              ? 'Editar Cliente'
                              : 'Agregar Cliente'
                        }
                        className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                     />
                  </Form>
               )
            }}
         </Formik>
      </div>
   )
}

Formulario.defaultProps = {
   cliente: {},
}

export default Formulario
