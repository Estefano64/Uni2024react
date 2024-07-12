import Envios from "../home/Envios"
import MainBanner from "../home/MainBanner"
import Nosotros from "../home/Nosotros"
import Noticias from "../home/Noticias"
import Calendario from "../home/Calendario"

function Inicio() {
    return (
        <>
            <MainBanner/>
            <Nosotros/>
            <Noticias/>
            <Calendario/>
            <Envios/>
        </>
    )
}

export default Inicio