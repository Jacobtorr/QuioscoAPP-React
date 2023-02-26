import { useContext } from "react";
import QuioscoContext from "quiscoapp/context/QuioscoProvider";

function useQuiosco () {
    return useContext(QuioscoContext);
}

export default useQuiosco;