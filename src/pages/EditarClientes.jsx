import Error from "../components/Error"
import Formulario from "../components/Formulario"
import { actualizarCliente, obtenerCliente } from "../data/clientes"
import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom"

export async function loader({params}){
  const cliente = await obtenerCliente(params.clienteId)
  if (Object.values(cliente).length === 0) {
    throw new Response('Not found', {
      status: 404,
      statusText: 'No hay resultados'})
  }
  return cliente
}

export async function action({request, params}){
  const formData = await request.formData()
  const datos = Object.fromEntries(formData)
  const errores = []

  const email = formData.get('email')

  if (Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!regex.test(email)) {
    errores.push('El email no es valido')
  }

  if (Object.keys(errores).length) {
    return errores
  }

  await actualizarCliente(params.clienteId, datos)

  return redirect('/')
}


const EditarClientes = () => {
  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()
  return (
    <>
      <h2 className="font-black text-4xl text-red-700">Editar Cliente</h2>

      <div className="flex justify-end">
        <button className="bg-red-600 text-white px-3 py-1 font-bold uppercase" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      <Form className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-2"
        method="POST"
        noValidate
      >
        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Formulario cliente={cliente} />

        <input type="submit" className="mt-5 w-full bg-red-600 p-3 uppercase font-bold text-white text-lg rounded-md" id="" />
      </Form>
    </>
  )
}

export default EditarClientes
