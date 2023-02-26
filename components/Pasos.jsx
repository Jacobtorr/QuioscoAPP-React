import { useRouter } from "next/router"

const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos & Total', url: '/total'}
]

function Pasos() {

    const router = useRouter()

    function calcularProgreso () {
        let valor;

        if (router.pathname === "/") {
            valor = 2
        } else if (router.pathname === "/resumen") {
            valor = 50
        } else {
            valor = 100
        }
        return valor;
    }

  return (
    <>
        <div className="flex justify-between mb-5 bg-amber-00 p-2 rounded-xl text-gray-700">
            {pasos.map( paso => (
                <button 
                onClick={() => {
                    router.push(paso.url)
                }}
                className="text-2xl font-bold "
                key={paso.paso}>{paso.nombre}</button>
            ))}
        </div>

        <div className="bg-gray-200 mb-10">
            <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white" style={{width: `${calcularProgreso()}%`}}>


            </div>
        </div>
    
    </>
  )
}
export default Pasos