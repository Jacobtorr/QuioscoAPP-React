import Head from 'next/head';
import Image from 'next/image';
import Layout from 'quiscoapp/layout/Layout';
import Producto from 'quiscoapp/components/Producto';
import useQuiosco from 'quiscoapp/hooks/useQuiosco';

export default function Home() {

  const { categoriaActual } = useQuiosco();

  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className='text-4xl font-black text-center'>{categoriaActual?.nombre}</h1>
      <p className='text-2xl my-10 text-center'>
        Elige y personaliza tu pedido a continuacion
      </p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {categoriaActual?.productos?.map( producto => (
          <Producto 
            key={producto.id} 
            producto={producto}
          />
        ))}

      </div>
    </Layout>
      
  )
}

