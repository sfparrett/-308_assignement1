import React, {useState} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios'; 

function MyApp() {
   const [characters, setCharacters] = useState([]);
   
   function removeOneCharacter (index) {
      const updated = characters.filter((character, i) => {
         return i !== index
      });
      setCharacters(updated);
   }
   
   function updateList(person) { 
   makePostCall(person).then( result => {
   if (result)
      setCharacters([...characters, person] );
   });
   }

   async function makePostCall(person){
   try {
      const response = await axios.post('http://localhost:5000/users', person);
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
   }

   return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} /> 
   </div>
   )

}




export default MyApp;

