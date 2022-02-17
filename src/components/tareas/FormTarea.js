import React, { useContext, useState, useEffect } from 'react';  
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    // Extrar si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // obtener la función del context de tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada,  errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada)
        } else {
            guardarTarea({
                nombre: '',
                stock: '',
                precio: ''
            })
        }
    }, [  tareaseleccionada]); 

    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    // extraer el nombre del proyecto
    const { nombre, stock, precio } = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null;

    // Array destructuring para extraer el proyecto actual
    const [proyectoActual] =  proyecto;

    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        // validar
        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        // Si es edición o si es nueva tarea
        if(tareaseleccionada === null ) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizarTarea(tarea);

            // Elimina tareaseleccionada del state
            limpiarTarea();
        }
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // reiniciar el form
        guardarTarea({
            nombre: '',
            stock: '',
            precio: ''
        })
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Producto..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />

                </div>
                <div className="contenedor-input">
                    <input 
                        type="number"
                        min="0" step="0.01" value="0.00"
                        className="input-text"
                        placeholder="Precio"
                        name="precio"
                        value={precio}
                        onChange={handleChange}
                    />

                    <input 
                        type="number"
                        min="0" max="100" value="0"
                        className="input-text"
                        placeholder="Stock"
                        name="stock"
                        value={stock}
                        onChange={handleChange}
                    />

                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? 'Editar Producto' : 'Agregar Producto'}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre del producto es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;