import { Outlet, Link, useLocation } from 'react-router-dom'

const Layaout = () => {
    const location = useLocation()

    return (
        <div className='md:flex md:min-h-screen'>

            <aside className='md:w-1/4 bg-red-700 px-5 py-10'>
                <h1 className='text-4xl font-black text-center text-white'>CRM - Clientes</h1>

                <nav className='mt-10'>
                    <Link
                        className={`${location.pathname === '/' ? 'border-2 border-red-500 transition-all rounded-3xl  text-start px-2 w-2/3 text-white' : 'text-white'} text-2xl block mt-3 hover:text-red-300 text-white`}
                        to="/">Clientes</Link>
                    <Link
                        className={`${location.pathname === '/clientes/nuevo' ? 'border-2 border-red-500 transition-all rounded-3xl text-white text-start w-2/3 px-2' : 'text-white'} text-2xl block mt-3 hover:text-red-300 text-white`}
                        to="/clientes/nuevo">Nuevo cliente</Link>
                </nav>
            </aside>



            <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
                <Outlet />
            </main>

        </div>
    )
}

export default Layaout
