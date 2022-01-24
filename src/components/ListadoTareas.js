import React from 'react';
import PropTypes from 'prop-types';

import Tarea from './Tarea';

const ListadoTareas = ({ tareas, edicion, setTareas, setEdicion, setTarea, gotToNews }) => (
   
    <>
    
        <h2>List of Articles</h2>
        
        <hr />
            
        <ul className="list-group">


            {
                tareas.map(tarea => (
                    <li
                        className="list-group-item"
                        key={tarea.id}
                    >
                        <Tarea
                            tareas={tareas}
                            tarea={tarea}
                            edicion={edicion}
                            setTareas={setTareas}
                            setEdicion={setEdicion}
                            setTarea={setTarea}
                            gotToNews={gotToNews}
                           
                        />
                    </li>
                ))
            }
        </ul>
    </>
);

ListadoTareas.propTypes = {
    tareas: PropTypes.array.isRequired,
    edicion: PropTypes.object.isRequired,
    setTareas: PropTypes.func.isRequired,
    setEdicion: PropTypes.func.isRequired,
    setTarea: PropTypes.func.isRequired,
    gotToNews: PropTypes.func.isRequired,
    
};

export default ListadoTareas;