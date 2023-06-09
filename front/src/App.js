import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormCategorie from "./component/formCategorie"
import FormProduit from "./component/formProduit"
import FormFile from "./component/formFile"

function App() {
    const baseUrl = 'http://192.168.1.10:8000';
    const [produit, setProduit] = useState([]);
    const [page, setPage] = useState('/api/produits?page=1&itemsPerPage=2');
    const [nextPage, setNextPage] = useState('');
    const [previousPage, setPreviousPage] = useState('');

    useEffect(() => {
        axios.get(`${baseUrl}${page}`)
            .then(response => {
                setProduit(response.data["hydra:member"]);
                setNextPage(response.data["hydra:view"]["hydra:next"]);
                setPreviousPage(response.data["hydra:view"]["hydra:previous"]);
            })
            .catch(error => {
                console.error(error);
            });
    }, [page]);

    const handleNext = () => {
        setPage(nextPage);
    }

    const handlePrevious = () => {
        if (previousPage) {
            setPage(previousPage);
        }
    }

    return (
        <div>
            <FormCategorie />
            <FormProduit />
            <button onClick={handlePrevious} disabled={!previousPage}>Précédent</button>
            <button onClick={handleNext} disabled={!nextPage}>Suivant</button>
            <ul>
                {produit.map((une, i) => (
                    <li key={i}>
                        {une.libelle}
                        <img src={`${baseUrl}/api/images/${une.picture}`} alt='toto' style={{ width: "100px" }}></img>
                    </li>
                ))}
            </ul>   
            <FormFile />  
        </div>
    );
}

export default App;

