import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const baseUrl = 'http://192.168.1.10:8000';
    const [libelle, setLibelle] = useState('');
    const [prix, setPrix] = useState('');
    const [image, setImage] = useState('');
    const [categorie, setCategorie] = useState('');
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`${baseUrl}/api/categories`)
            .then(response => {
                setCategories(response.data["hydra:member"]);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            libelle: libelle,
            prix: prix,
            picture: image,
            categorie: categorie
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
                        <select onChange={(event) => setCategorie(event.target.value)}>
                            <option>-- Choisissez une catégorie --</option>
                            {categories.map((une, i) => (
                                <option key={i} value={une["@id"]} select={une["@id"]}>
                                    {une.libelle}  
                                </option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Ajouter</button>
                </fieldset>
            </form>
        </div>
    );

};

export default AddProductForm;