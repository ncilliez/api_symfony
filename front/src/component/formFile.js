import React, { useState } from 'react';
import axios from 'axios';

const FormFile = () => {
  const baseUrl = 'http://192.168.1.10:8000';
  const [file, setFile] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
        await axios.post(`${baseUrl}/api/media_objects`, formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } });

    } catch (error) {
      // Gérer les erreurs lors de l'envoi du fichier
    }

  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Fichier</legend>
          <label>
            Image:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Ajouter</button>
        </fieldset>
      </form>
    </div>
  );
};

export default FormFile;

