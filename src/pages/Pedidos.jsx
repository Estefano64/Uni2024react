import { useEffect } from "react"
import { useState } from "react"
import { ApiWebURL } from "../utils"
import { Link } from "react-router-dom";

function Pedidos() {

    const [listaPedidos, setListaPedidos] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    /*
    function leerServicio(){
    }
    */

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidos.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaPedidos(data)
            })
    }

    return (
        <section className='padded'>
            <div className="container">
                <h2>Pedidos</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaPedidos.map(item =>
                            <tr key={item.idpedido}>
                        <Link to={"/pedidosdetalle/" + item.idpedido} style={{ display: 'contents' }}>
                            <td>{item.idpedido}</td>
                            <td>{item.fechapedido}</td>
                            <td>{item.usuario}</td>
                            <td>{item.nombres}</td>
                            <td>{item.total}</td>
                        </Link>
                    </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Pedidos