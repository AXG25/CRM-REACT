import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"
import { crearCliente } from "../data/clientes"

export async function action({ request }) {
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

  await crearCliente(datos)

  return redirect('/')
}



const NuevoCliente = () => {
  const errores = useActionData()
  const navigate = useNavigate()
  return (
    <>
      <h2 className="font-black text-4xl text-red-700">Nuevo Cliente</h2>
      <p className="mt-3">Registra tus Clientes</p>

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
        <Formulario />

        <input type="submit" className="mt-5 w-full bg-red-600 p-3 uppercase font-bold text-white text-lg rounded-md" id="" />
      </Form>
    </>
  )
}

export default NuevoCliente
