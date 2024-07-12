import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";
import { Link } from "react-router-dom";

function Seleccionados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);

  useEffect(() => {
    leerEmpleadosSeleccionados();
  }, []);

  const leerEmpleadosSeleccionados = () => {
    const empleadosSeleccionados = JSON.parse(sessionStorage.getItem("empleadosSeleccionados")) || [];
    setListaEmpleados(empleadosSeleccionados);
  };

  const eliminarEmpleado = (empleado) => {
    const nuevaLista = listaEmpleados.filter(e => e.idempleado !== empleado.idempleado);
    setListaEmpleados(nuevaLista);
    sessionStorage.setItem("empleadosSeleccionados", JSON.stringify(nuevaLista));
  };

  const vaciarSeleccion = () => {
    setListaEmpleados([]);
    sessionStorage.removeItem("empleadosSeleccionados");
  };

  return (
    <section className="padded">
      <div className="container">
        <h2>Empleados Seleccionados</h2>
        <Link to="/empleados" className="btn btn-primary mb-3">Volver a Empleados</Link>
        {listaEmpleados.length > 0 ? (
          <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4">
            {listaEmpleados.map(empleado => (
              <div className="col" key={empleado.idempleado}>
                <div className="card">
                  <img src={ApiWebURL + "fotos/" + empleado.foto} className="card-img-top" alt={empleado.nombres} />
                  <div className="card-body">
                    <h5 className="card-title">{empleado.nombres} {empleado.apellidos}</h5>
                    <p className="card-text">{empleado.cargo}</p>
                    <button className="btn btn-danger" onClick={() => eliminarEmpleado(empleado)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-warning" role="alert">
            No hay empleados seleccionados
          </div>
        )}
        {listaEmpleados.length > 0 && (
          <button className="btn btn-danger mt-3" onClick={vaciarSeleccion}>
            Vaciar selección
          </button>
        )}
      </div>
    </section>
  );
}

export default Seleccionados;