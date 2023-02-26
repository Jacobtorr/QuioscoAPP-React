import Image from "next/image";
import useQuiosco from "quiscoapp/hooks/useQuiosco";

function Categoria({categoria}) {

    const { categoriaActual, handleClickCategoria } = useQuiosco();
    
    const { id, nombre, icono } = categoria;

  return (
    <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''}  flex items-center gap-4 w-full border p-5 hover:bg-amber-400 transition-all duration-300`}>
        <Image 
            width={70}
            height={70}
            src={`/assets/img/icono_${icono}.svg`}
            alt="Imagen icono"
        />

        <button
            type="buton"
            className="text-2xl font-bold"
            onClick={() => handleClickCategoria(id)}
        >
            {nombre}
        </button>
    </div>
  )
}
export default Categoria