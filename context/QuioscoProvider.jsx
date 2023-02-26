import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

function QuioscoProvider ({children}) {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter();

    // Obteniendo los datos de la base de datos con Axios
    useEffect(() => {
        async function obtenerCategorias () {
            try {
                const url = '/api/categorias';
                const { data } = await axios(url);
                setCategorias(data);
            } catch (error) {
                console.log(error);
            }
        }
        obtenerCategorias();
    }, []);

    // Mostrar una categoria seleccionada por defecto
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]);

    // Calcular el Total
    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal);
    }, [pedido]);

    // Resaltar Categoria que estamos clickeando en el Menu
    function handleClickCategoria (id) {
        const categoria = categorias.filter( cat => cat.id === id);
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    // Mostrar el Producto en el Modal
    function handleSetProducto (producto) {
        setProducto(producto);
    }

    // Abrir y cerrar el modal
    function handleChangeModal () {
        setModal(!modal)
    }

    // Cerrar el modal Clickeando fuera de el
    function closeModal() {
        setModal(false)
    }

    // Agregar Pedido a nuestro State de Pedido
    function handleAgregarPedido ({categoriaId, ...producto}) {
        if (pedido.some(productoState => productoState.id === producto.id)) {
            // Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState);
            setPedido(pedidoActualizado);
            toast.success('Guardado Correctamente')
        } else {
            // Agregar Nuevo Producto
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
        setModal(false);
    }

    // Editando las cantidades de nuestro pedido
    function handleEditarCantidades (id) {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    // Eliminar un Producto de nuestro Pedido
    function handleEliminarProducto (id) {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        if (pedidoActualizado) {
            Swal.fire({
              title: '¿Estas seguro?',
              text: '¡Se eliminara del pedido!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#4f46e5',
              cancelButtonColor: '#d33',
              confirmButtonText: '¡Sí, eliminar!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Eliminado Correctamente!',
                  showConfirmButton: false,
                  timer: 700
                })
                setPedido(pedidoActualizado)
                }
              })
            }
        
    }

    // Enviar la Orden al Servidor
    async function colocarOrden (e) {
        e.preventDefault();

        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()});

            // Resetear la app al terminar la orden
            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre('');
            setTotal(0);

            toast.success('Pedido Realizado Correctamente');
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            console.log(error);
        }

        console.log(pedido)
        console.log(nombre)
        console.log(total)
      }


    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                closeModal,
                pedido,
                handleAgregarPedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;