import React, { useState } from "react";
import uniqid from "uniqid";

export const Listadonombres = () => {
  const [nombre, setNombre] = useState("");
  const [listaNombres, setListaNombres] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const addNombre = (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError("El nombre no puede estar vacío.");
      return;
    }

    const nuevoNombre = {
      id: uniqid(),
      nombre: nombre,
    };
    setListaNombres([...listaNombres, nuevoNombre]);
    setNombre("");
    setError(null);
  };

  const deleteNombre = (id) => {
    const nuevoArray = listaNombres.filter((item) => item.id !== id);
    setListaNombres(nuevoArray);
  };

  const editar = (item) => {
    setModoEdicion(true);
    setNombre(item.nombre);
    setId(item.id);
  };

  const editarNombre = (e) => {
    e.preventDefault();
    const NuevoArray = listaNombres.map((item) =>
      item.id === id ? { id: id, nombre: nombre } : item
    );
    setListaNombres(NuevoArray);
    setModoEdicion(false);
    setNombre("");
  };

  return (
    <div>
      <div className="row mt-4">
        <div className="col">
          <h4>Listado de Nombres</h4>
          <ul className="list-group">
            
            {
              listaNombres.map((item) => (
                <li key={item.id} className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between">
                    {item.nombre}
                    <div>
                      <button
                        onClick={() => deleteNombre(item.id)}
                        className="btn btn-danger mx-1"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <button
                        onClick={() => editar(item)}
                        className="btn btn-info mx-1 text-light"
                      >
                        <i class="far fa-edit"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))
            }
            

          </ul>
        </div>
        <div className="col">
          <h4>Añadir nombres</h4>
          <form
            onSubmit={modoEdicion ? editarNombre : addNombre}
            className="form-group"
          >
            <input
              onChange={(e) => {
                setNombre(e.target.value);
              }}
              className="form-control m-2"
              value={nombre}
              placeholder="Introduce un nombre"
              type="text"
            />
            <input
              className="btn btn-info m-2"
              type="submit"
              value={modoEdicion ? "Editar" : "Registrar"}
            />
          </form>
          {error != null ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
