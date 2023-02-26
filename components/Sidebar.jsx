import Image from "next/image"
import Categoria from "./Categoria";
import useQuiosco from "quiscoapp/hooks/useQuiosco"

function Sidebar() {

  const { categorias } = useQuiosco();

  return (
    <>
        <Image width={300} height={100} src="/assets/img/logo.svg" alt="Imagen Logotipo" className="mx-auto"/>

        <nav className="mt-10">
          {categorias.map( categoria => (
            <Categoria
              key={categoria.id}
              categoria={categoria}
            />
          ))}
        </nav>
    </>
  )
}
export default Sidebar