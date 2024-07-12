import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils"
import { Link } from "react-router-dom"

function Empleados() {
    const [listaEmpleados, setListaEmpleados] = useState([])

    useEffect(() => {
        leerServicio()
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "empleados.php"
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setListaEmpleados(data)
            })
    }

    const agregarEmpleado = (empleado) => {
        let empleadosSeleccionados = JSON.parse(sessionStorage.getItem("empleadosSeleccionados")) || []
        if (!empleadosSeleccionados.some(e => e.idempleado === empleado.idempleado)) {
            empleadosSeleccionados.push(empleado)
            sessionStorage.setItem("empleadosSeleccionados", JSON.stringify(empleadosSeleccionados))
            alert("Empleado seleccionado")
        } else {
            alert("Este empleado ya ha sido seleccionado")
        }
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4">
                {listaEmpleados.map(item =>
                    <div className="col" key={item.idempleado}>
                        <div className="card">
                            <img src={ApiWebURL + "fotos/" + item.foto} className="card-img-top" alt={item.nombres} />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                                <p className="card-text">{item.cargo}</p>
                                <button className="btn btn-primary" onClick={() => agregarEmpleado(item)}>Seleccionar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <section id='empleados' className='padded'>
            <div className="container">
                <h2>Empleados</h2>
                <Link to="/seleccionados" className="btn btn-info mb-3">
                    <i className="bi bi-person-check"></i> Ver Seleccionados
                </Link>
                {dibujarCuadricula()}
            </div>
        </section>
    )
}

export default Empleados