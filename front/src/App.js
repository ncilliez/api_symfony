import React, { useState, useEffect } from 'react';
import axios from "axios";

function App() {
    const baseUrl = 'http://192.168.1.10:8000';
    const [produit, setProduit] = useState([]);
    const [page, setPage] = useState('/api/produits?page=1&itemsPerPage=1');
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
            <button onClick={handlePrevious} disabled={!previousPage}>Précédent</button>
            <button onClick={handleNext} disabled={!nextPage}>Suivant</button>
            <ul>
                {produit.map((une, i) => (
                    <li key={i}>
                        {une.libelle}  
                    </li>
                ))}
            </ul>     
        </div>
    );
}

export default App;

