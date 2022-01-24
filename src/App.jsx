import React, { useEffect, useState } from 'react';

import { firebase } from './firebase';

import ListadoTareas from './components/ListadoTareas';
import Formulario from './components/Formulario';

const App = props => {

	const [tareas, setTareas] = useState([]);
	const [tarea, setTarea] = useState('');
	const [edicion, setEdicion] = useState({
		editando: false,
		tarea: null
	});
	

	/*async function handleSave() {
	const db = firebase.firestore();
	await db.collection('tareas').doc(location.state.id).get({
		saveData:savedData,
	});}*/

	const gotToNews= () => {
		//setUrl(tarea)
		props.history.push(`/news/${edicion.tarea.id}`,{id: edicion.tarea.id, data:'sss'});
		
	  };
	  const editarTarea = tarea =>{
        gotToNews(`${edicion.tarea.id}`)
            console.log(`${edicion.tarea.id}`)

    }

	useEffect(() => {

		(async () => {

			try {

				const db = firebase.firestore();
				const data = await db.collection('tareas').get();
				const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));

				setTareas(arrayData);

			} catch (error) {

				console.error(error);

			}

		})();

	}, []);
	 


	return (
		<div className="container">
			<div className="row">
				<div className="col-12">

					<h1 className="text-center">Editor React For "Geeko" - On  Firestore </h1>

					<hr />
				</div>

				<div className="col-md-6 mb-5 mb-md-0">
					<Formulario
						tarea={tarea}
						tareas={tareas}
						edicion={edicion}
						setEdicion={setEdicion}
						setTareas={setTareas}
						setTarea={setTarea}
						
						gotToNews={gotToNews}
					/>
					{edicion.editando ?
					<button
                    className={`btn btn-block  ${!edicion.editando ? 'btn-warning' : 'btn-dark'}`}
                    type="submit"
                    onClick={() => editarTarea(tarea)}
                >
                     'Go to' 
                </button>
				: null}
				</div>

				<div className="col-md-6 mt-5 mt-md-0">
					<ListadoTareas
						tareas={tareas}
						edicion={edicion}
						setTareas={setTareas}
						setTarea={setTarea}
						setEdicion={setEdicion}
						gotToNews={gotToNews}
					/>
				</div>
			</div>
			
		</div>
	);
};

export default App;
