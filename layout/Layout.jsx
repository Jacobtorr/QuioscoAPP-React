import Head from "next/head";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import Sidebar from "quiscoapp/components/Sidebar";
import ModalProducto from "quiscoapp/components/ModalProducto";
import Pasos from "quiscoapp/components/Pasos";
import useQuiosco from "quiscoapp/hooks/useQuiosco";

import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      },
  };

  Modal.setAppElement('#__next');

export default function Layout({children, pagina}) {

    const { modal, closeModal } = useQuiosco();

    return (
        <>
            <Head>
                <title>Cafe - {pagina}</title>
                <meta name="description" content="Quiosco Cafeteria" />
            </Head>

            <div className="md:flex">
                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 bg-gray-100">
                    <Sidebar />
                </aside>

                <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen md:overflow-y-scroll ">
                    <div className="p-10">
                        <Pasos />
                        {children}
                    </div>
                </main>
            </div>

            {modal && (
                <Modal 
                    isOpen={modal}
                    style={customStyles} 
                    onRequestClose={closeModal}
                >
                    <ModalProducto />
                </Modal>
            )}

                <ToastContainer 
                    autoClose={2000}
                />
        </>
    )
  }