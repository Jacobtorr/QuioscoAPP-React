import Image from "next/image";
import { formatearDinero } from "quiscoapp/helpers";
import useQuiosco from "quiscoapp/hooks/useQuiosco";

function Producto({producto}) {

    const { handleSetProducto, handleChangeModal } = useQuiosco();
    const { nombre, imagen, precio } = producto;

  return (
    <div className="border p-3 flex flex-col justify-between">
        <Image
            src={`/assets/img/${imagen}.jpg`}
            alt={`Imagen Platillo ${nombre}`}
            width={400}
            height={500}
            className="mx-auto rounded"
        />

        <div className="px-5 pb-5">
            <h3 className="text-2xl font-bold px-5 pt-3 mb-auto">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatearDinero(precio)}
            </p>

            <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold rounded"
                onClick={() => {
                    handleChangeModal()
                    handleSetProducto(producto)
                }}
            >Agregar</button>
        </div>
    </div>
  )
}
export default Producto