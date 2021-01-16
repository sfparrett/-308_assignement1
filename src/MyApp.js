import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';


function MyApp() {
   const [characters, setCharacters] = useState([]);
   //     [  variable, setWhatever ]
   // set charecters =  state 
   // have to put this around what you want to change 
   
   async function removeOneCharacter (index) {
      const updated = characters.filter((character, i) => {
         return i !== index
      });
      setCharacters(updated);
      var item = characters[index]
      const id = item['id']
      console.log(item)
      console.log(item['id'])
      // const id = item.get('id')
      
      const url = `http://127.0.0.1:5000/users/${id}`
      console.log(url)

      
      const response = await axios.delete(url);
      console.log(response)
      return response
   }


   
   // DELETE THIS FUNCTION 
   // function updateList(person) {
   // 	setCharacters([...characters, person]);
   // }

   // function DeleteItem(){
   //    // how do I get the id in there??? / how does this replace remove One Charecter and where is 
   //    // it called 
   //    try {
   //       const response = await axios.get('http://localhost:5000/users');
   //       return response.status   
   //    }
   //    catch (error){
   //       console.log(error); 
   //       return false; 
         
   //    }
   // }

   async function fetchAll(){
      try {
         const response = await axios.get('http://localhost:5000/users');
         return response.data.users_list;     
      }
      catch (error){
         //We're not handling errors. Just logging into the console.
         console.log(error); 
         return false;         
      }
   }

   useEffect(() => { fetchAll().then( result => { if (result) setCharacters(result);});}, [] );

   async function makePostCall(person){
      try {
         const response = await axios.post('http://localhost:5000/users', person); // backend value 
         return response;
      }
      catch (error) {
         console.log(error);
         return false;
      }
   }

   function updateList(person) { 
      makePostCall(person).then( result => { // passed into front end 
      if (result.status === 201)
         console.log(result)
          
         setCharacters([...characters, result.data] );
         // what is useState and how is the front end updated on the screen? 
         // 1.) make value 
            // const array = [1,2,3] 
         // 2.) change value locally 
            // characters.push(4) 
         // 3.) check value 
            // console.log(characters) = = 1,2,3,4 
         // 4.) Update it to output ?? 
            // WILL NOT UPDATE until setCharecters(    charecters <- is manipulayed )
         // Run npm start to check ! 
      });
   }
   
   // This is what this means: result =  makePostCall(person); 



   return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} /> 
   </div>
   )

}




export default MyApp;

