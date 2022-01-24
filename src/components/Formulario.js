import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../firebase';

const Formulario = ({ tareas, tarea, edicion, setTarea, setTareas, setEdicion,setUrl,gotToNews }) => {

    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        // Validar
        if (!tarea.trim()) return setError('Write some things please...');
        setError(null);

        // Generar nueva tarea
        const nuevaTarea = {
            name: tarea.trim(),
            fecha: Date.now()
        };

        // Agregar nueva tarea
        try {

            const db = firebase.firestore();
            const data = await db.collection('tareas').add(nuevaTarea);
            setTareas(tarea => [...tarea, { ...nuevaTarea, id: data.id }]);

        } catch (error) {

            console.error(error);

        };

        // Resetear
        setTarea('');
    };

    const handleEditar = async e => {
        e.preventDefault();

        // Validar
        if (!tarea.trim()) return setError('Write some things please...');
        setError(null);


        // Actualizar tarea
        try {

            const db = firebase.firestore();
            await db.collection('tareas').doc(edicion.tarea.id).update({
                name: tarea
            });

            const arrayEditado = tareas.map(item => item.id === edicion.tarea.id ? { ...item, name: tarea } : item);
            setTareas(arrayEditado);


            setUrl=tarea ;
            console.log(edicion.tarea.id)
            
           

            // Resetear edición
            setEdicion({
                editando: false,
                tarea: null,
                
            });

            setTarea('');

        } catch (error) {

            console.error(error);

        };
    };
    

    return (
        <>
            <h2>{edicion.editando ? 'Edit Article' : 'Create Article'}</h2>

            <hr />

            <form
                onSubmit={edicion.editando ? handleEditar : handleSubmit}
            >

                {error && <span className="text-danger">{error}</span>}

                <input
                    className="form-control mt-1 mb-2"
                    placeholder="Tittle of your Article"
                    type="text"
                    value={tarea}
                    onChange={e => setTarea(e.target.value)}
                />

                <button
                    className={`btn btn-block ${edicion.editando ? 'btn-warning' : 'btn-dark'}`}
                    type="submit"
                >
                    {edicion.editando ? 'Edit' : 'Create'}
                </button>
                
            </form>
            
        </>
    );
};

Formulario.propTypes = {
    tarea: PropTypes.string.isRequired,
    tareas: PropTypes.array.isRequired,
    edicion: PropTypes.object.isRequired,
    setTareas: PropTypes.func.isRequired,
    setTarea: PropTypes.func.isRequired,
    setEdicion: PropTypes.func.isRequired
};

export default Formulario;