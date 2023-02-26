import useSWR from 'swr';
import axios from 'axios';
import AdminLayout from "quiscoapp/layout/AdminLayout";
import Orden from 'quiscoapp/components/Orden';

function Admin() {

    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)

    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 10})

    // console.log(data)

  return (
    <AdminLayout pagina={'Admin'}>
         <h1 className="text-4xl font-black text-center">Panel de Administracion</h1>
         <p className="text-2xl my-10 text-center">Administra las ordenes</p>

         {data && data.length ? data.map(orden =>
            <Orden 
                key={orden.id}
                orden={orden}
            
            />
            ) : <p>No hay ordenes pendientes</p>}
    </AdminLayout>
  )
}
export default Admin