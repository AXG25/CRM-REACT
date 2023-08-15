import { useLoaderData } from "react-router-dom"
import { obtenerClientes } from "../data/clientes";
import Cliente from "../components/Cliente";

export function loader() {
 const clientes = obtenerClientes()
 return clientes
}

const Index = () => {

  const clientes = useLoaderData()


  return (
    <div>
      <h2 className="font-black text-4xl text-red-700">Clientes</h2>
      <p className="mt-3">Administra tus Clientes</p>
      {clientes.length ? (
        <table className="w-full bg-white shadow mt-4 table-auto">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
              {clientes.map(cliente => (
                <Cliente
                  cliente={cliente}
                  key={cliente.id}
                />
              ))}
            </tbody>
        </table>
      ) : (
        <p className='text-center mt-10'>No hay clientes aun</p>
      )}
    </div>
  )
}

export default Index
