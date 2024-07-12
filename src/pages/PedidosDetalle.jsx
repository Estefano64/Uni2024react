import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiWebURL } from "../utils";
import nofoto from "./../assets/images/nofoto.jpg";

function PedidosDetalle() {
    const { idpedido } = useParams();
    const [pedido, setPedido] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        leerServicio();
    }, [idpedido]);

    function decodeUTF8(str) {
        return decodeURIComponent(escape(str));
      }

    const leerServicio = async () => {
        try {
            const rutaServicio = `${ApiWebURL}pedidosdetalle.php?idpedido=${idpedido}`;
            const response = await fetch(rutaServicio);
            if (!response.ok) {
                throw new Error('Error al cargar los datos');
            }
            const data = await response.json();
            setPedido(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!pedido || pedido.length === 0) return <div>No se encontraron detalles del pedido.</div>;

    return (
        <section className="padded">
            <div className="container">
                <h2>Detalles del Pedido #{idpedido}</h2>
               
                <div className="row">
                <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2  g-4">
                    {pedido.map((producto) => (
                        <div key={producto.idproducto} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img
                                    src={producto.imagenchica ? `${ApiWebURL}${producto.imagenchica}` : nofoto}
                                    className="card-img-top"
                                    alt={producto.nombre}
                                />
                                <div className="card-body">
                                <h5 className="card-title">{decodeUTF8(producto.nombre)}</h5>
                                    <p className="card-text">{producto.detalle}</p>
                                    <p className="card-text">Cantidad: {producto.cantidad}</p>
                                    <p className="card-text">
                                        Precio: S/ {parseFloat(producto.precio).toFixed(2)}
                                    </p>
                                    <p className="card-text">
                                        Subtotal: S/ {(parseFloat(producto.precio) * parseInt(producto.cantidad)).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="mt-4">
                    <h3>Total del Pedido: S/ {
                        pedido.reduce((total, producto) => 
                            total + parseFloat(producto.precio) * parseInt(producto.cantidad), 0
                        ).toFixed(2)
                    }</h3>
                </div>
            </div>
        </section>
    );
}

export default PedidosDetalle;