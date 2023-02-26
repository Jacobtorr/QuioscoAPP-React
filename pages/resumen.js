import Layout from "quiscoapp/layout/Layout"
import ResumenProducto from "quiscoapp/components/ResumenProducto";
import useQuiosco from "quiscoapp/hooks/useQuiosco"

function Resumen() {

  const { pedido } = useQuiosco();

  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black text-center">Resumen</h1>
      <p className="text-2xl my-10 text-center">Revisa tu Pedido</p>

      {pedido.length === 0 ? (
        <p>No hay productos en tu pedido</p>
      ) : (
        pedido.map(producto => (
          <ResumenProducto 
            key={producto.id}
            producto={producto}
          />
        ))
      )}

    </Layout>
  )
}
export default Resumen