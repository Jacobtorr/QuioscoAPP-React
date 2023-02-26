import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { formatearDinero } from "quiscoapp/helpers";

function Orden({orden}) {

    const { id, nombre, total, pedido } = orden;
    
    async function completarOrden () {
        
        try {
           // Eliminar Registro
            await Swal.fire({
                title: '¿Estas seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#4f46e5',
                cancelButtonColor: '#d33',
                confirmButtonText: '¡Sí, completar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    (async() => {
                        await axios.post(`/api/ordenes/${id}`)
                    })()
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Orden Completada Correctamente!',
                    showConfirmButton: false,
                    timer: 1000
                })
                }
                })
        } catch (error) {
            toast.error('Hubo Un error')
        }
    }

  return (
    <div className="border p-10 space-y-5">
         <h3 className="text-2xl font-black text-center font-bold">Orden: {id}</h3>
         <p className="text-lg my-10 text-center font-bold">Cliente: {nombre}</p>

         <div>
            {pedido.map(platillo => (
                <div key={platillo.id} className="py-3 flex border-b last-of-type:border-0 items-center">
                    <div className="w-32">
                        <Image 
                            width={400}
                            height={200}
                            src={`/assets/img/${platillo.imagen}.jpg`}
                            alt={`Imagen Platillo ${platillo.nombre}`}
                            className="rounded"
                        />
                    </div>

                    <div className="p-5 space-y-2">
                        <h4 className="text-xl font-bold text-amber-500">{platillo.nombre}</h4>
                        <p className="text-lg font-bold">Cantidad: {platillo.cantidad}</p>
                    </div>
                </div>
            ))}
         </div>

         <div className="md:flex md:items-center md:justify-between my-10">
            <p className="mt-5 font-black text-4xl text-amber-500 text-center md:text-left">
                Total a pagar: {formatearDinero(total)}
            </p>
            
            <div className="flex justify-center items-center">
                <button 
                className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-2 px-5 uppercase font-bold rounded-lg"
                type="button"
                onClick={completarOrden}
                >
                    Completar Orden
                </button>
            </div>
         </div>
    </div>
  )
}
export default Orden