import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [libelle, setLibelle] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState('');
    const [categorie, setCategorie] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            libelle: libelle,
            prix: prix,
            picture: image,
            categorie: '/api/categories/1'
        }

        console.log(formData);

        axios.post('http://192.168.1.10:8000/api/produits', formData)
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
                    <legend>Produit</legend>
                    <label>Nom du produit:
                        <input type="text" onChange={(event) => setLibelle(event.target.value)}/>
                    </label>
                    <label>Prix:
                        <input type="text" onChange={(event) => setPrix(event.target.value)}/>
                    </label>
                    <label>Image:
                        <input type="text" onChange={(event) => setImage(event.target.value)}/>
                    </label>
                    <label>Categorie:
                        <input type="text" onChange={(event) => setCategorie(event.target.value)}/>
                    </label>
                    <button type="submit">Ajouter</button>
                </fieldset>
            </form>
        </div>
    );

};

export default AddProductForm;