import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils"
import './Directores.css'

function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([])
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([])
    const [textoBuscar, setTextoBuscar] = useState("")
    const [filasPagina, setFilasPagina] = useState(5)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [totalFilas, setTotalFilas] = useState(0)
    const [pagina, setPagina] = useState(0)
    const [estadoAscendente, setEstadoAscendente] = useState(1)
    const [columnaAnterior, setColumnaAnterior] = useState("")
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState({})

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "proveedores.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaProveedores(data)
                setListaProveedoresFiltrados(data)
                setTotalFilas(data.length)
                setTotalPaginas(Math.ceil(data.length/filasPagina))
            })
    }

    const seleccionarColumna = (event, columna) => {
         console.log(columna)
         let iconosOrden = document.querySelectorAll("#tabla-proveedores th i")
         iconosOrden.forEach(item => item.remove())
         let ascendente = estadoAscendente
         if(columna !== columnaAnterior){
            ascendente = 1
         }
         else {
            ascendente = -ascendente
         }
         const resultado = [...listaProveedoresFiltrados].sort((a,b) =>
            a[columna] > b[columna] ? ascendente : -ascendente
        )
        let icono = ascendente === 1 ? '<i class="bi bi-caret-down-fill"></i>' : '<i class="bi bi-caret-up-fill"></i>'
        event.currentTarget.innerHTML += icono
        setListaProveedoresFiltrados(resultado)
        setColumnaAnterior(columna)
        setEstadoAscendente(ascendente)
    }

    const mostrarVistaRapida = (event) => {
        event.currentTarget.querySelector(".icono-vista-rapida").classList.add("icono-vista-rapida-mostrar")
    }

    const ocultarVistaRapida = (event) => {
        event.currentTarget.querySelector(".icono-vista-rapida").classList.remove("icono-vista-rapida-mostrar")
    }

    const seleccionarProveedor = (proveedor) => {
        setProveedorSeleccionado(proveedor)
    }

    const dibujarTabla = () => {
        return (
            <table className="table" id="tabla-proveedores">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th onClick={(event)=> seleccionarColumna(event,"nombreempresa")}>Empresa</th>
                        <th onClick={(event)=> seleccionarColumna(event,"nombrecontacto")}>Contactos</th>
                        <th onClick={(event)=> seleccionarColumna(event,"ciudad")}>Ciudad</th>
                        <th onClick={(event)=> seleccionarColumna(event,"pais")}>País</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrados.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>{item.nombreempresa}</span>
                                    <i className="bi bi-eye"
                                    onClick={() => seleccionarProveedor(item)}
                                    data-bs-toggle="modal" 
                                    data-bs-target="#vistaRapidaModal"
                                    style={{ cursor: 'pointer' }}></i>
                                </div>
                            </td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    const buscarTexto = (event) => {
        let texto = event.target.value
        setTextoBuscar(texto)
        console.log(texto)
        const resultado = listaProveedores.filter(item =>
            item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["pais"].toUpperCase().includes(texto.toUpperCase()) ||
            item["ciudad"].toUpperCase().includes(texto.toUpperCase())
        )
        setListaProveedoresFiltrados(resultado)
    }

    const dibujarPaginacion = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => retroceder()}>Retroceder</a></li>
                    {dibujarNumerosPaginacion()}
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => avanzar()}>Avanzar</a></li>
                </ul>
            </nav>
        )
    }

    const dibujarNumerosPaginacion = () => {
        return(
            <>
                {Array.from({length: totalPaginas}).map((item, index) =>
                    <li className={index === pagina?"page-item active":"page-item"} key={index}>
                        <a className="page-link" href="#"
                            onClick={() => setPagina(index)}>
                            {index + 1}
                        </a>
                    </li>
                )}
            </>
        )
    }

    const retroceder = () => {
        if(pagina > 0){
            setPagina(pagina - 1)
        }
    }

    const avanzar = () => {
        if(pagina < totalPaginas - 1){
            setPagina(pagina + 1)
        }
    }

    const dibujarVistaRapidaModal = () => {
        return (
            <div className="modal fade" id="vistaRapidaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title fs-5" id="exampleModalLabel">{proveedorSeleccionado.nombreempresa}</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Código</th>
                                        <td>{proveedorSeleccionado.idproveedor}</td>
                                    </tr>
                                    <tr>
                                        <th>Contacto</th>
                                        <td>{proveedorSeleccionado.nombrecontacto}</td>
                                    </tr>
                                    <tr>
                                        <th>Ciudad</th>
                                        <td>{proveedorSeleccionado.ciudad}</td>
                                    </tr>
                                    <tr>
                                        <th>País</th>
                                        <td>{proveedorSeleccionado.pais}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section id='proveedores' className='padded'>
            <div className="container">
                <h2>Proveedores</h2>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                        value={textoBuscar} onChange={(event) => buscarTexto(event)} />
                </div>
                {dibujarTabla()}
                {dibujarPaginacion()}
                {dibujarVistaRapidaModal()}
            </div>
        </section>
    )
}

export default Proveedores