import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../firebase';

const Tarea = ({ tarea, tareas, edicion, setTareas, setEdicion, setTarea, gotToNews, area }) => {

    const { id, name } = tarea;

    const eliminarTarea = async id => {

        try {

            const db = firebase.firestore();
            await db.collection('tareas').doc(id).delete();
            const nuevasTareas = tareas.filter(tarea => tarea.id !== id);
            setTareas(nuevasTareas);

            if (edicion.tarea) {
                if (edicion.tarea.id === id) {
                    // Resetear edición
                    setEdicion({
                        editando: false,
                        tarea: null
                    });

                    setTarea('');
                }
            }

        } catch (error) {

            console.error(error);

        }
    };

    const editarTarea = tarea => {

        setEdicion({
            editando: true,
            tarea
        });
        setTarea(tarea.name, tarea.id);
        //console.log(tarea.id);
        
    };

    return (
        <>
            <span>
                {name}
            </span>

            <button
                className="btn btn-outline-danger btn-sm float-right"
                onClick={() => eliminarTarea(id)}
            >
                Delete
            </button>

            <button
                className="btn btn-outline-warning btn-sm float-right mr-2"
                onClick={() => editarTarea(tarea)}
            >
                Edit
            </button>
        </>
    );
};

Tarea.propTypes = {
    tarea: PropTypes.object.isRequired,
    edicion: PropTypes.object.isRequired,
    tareas: PropTypes.array.isRequired,
    setTareas: PropTypes.func.isRequired,
    setEdicion: PropTypes.func.isRequired,
    setTarea: PropTypes.func.isRequired,
    gotToNews: PropTypes.func.isRequired,
};

export default Tarea;