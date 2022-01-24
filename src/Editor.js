/* eslint-disable no-unused-expressions */
import MarkdownIt from 'markdown-it';
import Editor from 'react-markdown-editor-lite'; 
import React, { useState, useEffect } from 'react';
import { firebase } from './firebase';
import { useLocation } from 'react-router-dom';
import 'react-markdown-editor-lite/lib/index.css';


const Editors = () =>   
{const [dat, setDat]=useState({})
 const [value, setValue]=React.useState("xx");
  let location=useLocation()

    //const onClick = async () =>{ (await instanceRef.current.save())
     //     console.log([])
    //};
 useEffect(() => {
	(async () => {
  	try {
      docRef.get().then((doc) => {
       if (doc.exists) {
            setDat(doc.data());
            console.log(doc.data());  
          }
           else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      })
			} catch (error) {
				console.error(error);
			}


		})();
	}, []);
  useEffect(() => {
    (async () => {
    try { if(dat.idFirebase){
      let url = `http://localhost:5000/api/posts/${dat.idFirebase}`
      let response = await fetch(url);

        if (response.ok) { // если HTTP-статус в диапазоне 200-299
                        // получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();
       
        await setValue(json.nodeData.contentRu);
         console.log(23, value)
          } else {
             alert("Ошибка HTTP: " + response.status);
                }
              }else {
                console.log("NO FIREBASE ID")
              }
            
    }catch (error) {
      console.error(error);
    }
    })()
      
  }, [dat])

  

  const fbId =location.state.id
  
  
  // Ref of the Editor 
   const mdEditor = React.useRef(null);
   const mdParser = new MarkdownIt(/* Markdown-it options */);
  
  // Image Uploader Yeahh)) 
 
   const handleImageUpload = async(file) => {
    return new Promise(async resolve => {  
      const reader =  new FileReader();
    
    reader.onload =async data => {
      let ub64 = data.target.result
      let uploadBase64 = async( option) => 
        {
        let fileData = await fetch('https://static1.waba.bot/file', {
         method : 'POST',
         headers: {
           'Content-Type': 'application/json',
           'SS-TOKEN'    : '3c5ff820-faea-4561-8ea8-fea32623f964',
          },
          body   : JSON.stringify({
          base64:ub64,
          option: {
            fileName:"Название файла",
            mimeType:"image/png",
            }
         })
       });
       if (!fileData.ok) return Promise.reject({
         error: {
           msg: 'Не удалось загрузить файла',
         }
       });
     
       if (fileData.status !== 200 && fileData.status !== 201) return Promise.reject({
         error: {
           msg       : 'Не удалось загрузить файла',
           status    : fileData.status,
           statusText: fileData.statusText,
           // eslint-disable-next-line no-undef
           result    : await res.json()
         }
       });
        const response = await fileData.json()
        ub64= `https://static1.waba.bot/file/${response._id}`
        return await `https://static1.waba.bot/file/${response._id}`
     };
  await uploadBase64();
    resolve(ub64);
    };
    reader.readAsDataURL(file);
    await console.log(111, reader);
  });
};


   const handleSave = async e => {
    let nodeData={
      title:dat.name,
      fecha:fbId,
      contentRu:mdEditor.current.getMdValue(),
      idFireB:''
    }
    console.log(nodeData)
      const md = await mdEditor.current.getMdValue()

    // Sand  data to Server REST API ROUTER
    if(dat.idFirebase){
      const result=await fetch('http://localhost:5000/api/posts', {
       method: 'PUT',
       headers: {
        'Accept': 'application/json;',
        'Content-Type': 'application/json;charset=utf-8',
      },
       body:JSON.stringify({
         nodeData: {
          title:dat.name,
          fecha: dat.fecha,
          contentRu: value
      },
         id:dat.idFirebase

       })       
      })
      const mongoseId= await result.json();
      return await mongoseId; 

      /*const sendContent=await fetch('http://localhost:5000/api/posts' , {
       method: 'POST',
       headers: {
        'Accept': 'application/json;',
        'Content-Type': 'application/json;charset=utf-8',
      },
       body:JSON.stringify({
         nodeData: {
          title:dat.name,
          fecha: dat.fecha,
          contentRu: value
      },
         id:dat.idFirebase

       })       
      })
      const mongoseId= await result.json();
      return await mongoseId;*/

     
    }  else {
        const result=await fetch('http://localhost:5000/api/posts' , {
          method: 'POST',
          headers: {
            'Accept': 'application/json;',
            'Content-Type': 'application/json;charset=utf-8',
                  },
              body:JSON.stringify({nodeData})       
                  })
            const mongoseId= await result.json();
            
            // Save the id on Firebase
            const mdID={"idFirebase":mongoseId._id}
            const db = firebase.firestore();
            await db.collection('tareas').doc(location.state.id).update(
            await mdID
            ); 
       return await mongoseId;

    }
    
    

     
     
    }  
     
    
    const db = firebase.firestore();
    var docRef = db.collection("tareas").doc(location.state.id);
        
  // save from Basic Project 
    /*const handleClick = () => {
      if (mdEditor.current) {
        alert(mdEditor.current.getMdValue());
        }
      };*/    

  // Conditional Rendering     
  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace();
    setValue(newValue);
  };

   if (dat.length === 0) return (<>загрузка</>)
  
   // Rendering Editor With Data!!!

  return (
    <>      
        <h2>{dat.name}</h2>
        <button onClick={handleSave}>Save!</button>  
      <Editor
         ref={mdEditor}
         value={value}
         style={{ height: '500px' }} 
         renderHTML={text => mdParser.render(text)}
         onImageUpload={handleImageUpload}
         onChange={handleEditorChange}
/>; 
    </>
  );
}


export default Editors;
