import React, { useState } from 'react';
import axios from "axios";

function Form() {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            libelle: name
        }

        axios.post('http://192.168.1.10:8000/api/categories', formData)
            .then(response => {
                // La promesse est résolue, la requête a réussi
                console.log(response.data);
            })
            .catch(error => {
                // La promesse est rejetée, une erreur s'est produite lors de la requête
                console.error(error);
            });
        
    }

    return (
        <div>          
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Categorie</legend>
                    <label>Libelle de la categorie:
                        <input type="text" onChange={(event) => setName(event.target.value)}/>
                    </label>
                    <button type="submit">Ajouter</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Form;