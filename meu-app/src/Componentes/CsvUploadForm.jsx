import React, { useState, useEffect } from 'react';
import estilos from './CsvUploadForm.module.css';

const getCSRFToken = () => {
  const csrfTokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
  return csrfTokenElement ? csrfTokenElement.value : null;
};

export function CsvUploadForm() {

  const [error, setError] = useState("");
  const [sensorFile, setSensorFile] = useState(null);
  const [luminosidadeFile, setLuminosidadeFile] = useState(null);
  const [temperaturaFile, setTemperaturaFile] = useState(null);
  const [umidadeFile, setUmidadeFile] = useState(null);
  const [contadorFile, setContadorFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      setError("Usuário não logado!")
    }
  }, []);

  if(error){
    return <div>
      {error && (
        <div className={estilos.cardErro}>
          <h2>ERRO</h2>
          <p>{error}</p>
        </div>
      )}
    </div>

  }

  const handleFileChange = (e, setFile) => {
    if(e.target.files && e.target.files[0]){
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async(e, uploadType, file) => {
    e.preventDefault();

    if(!file){
      alert(`Nenhum arquivo selecionado para ${uploadType}`);
      return;
    }

    const formData = new FormData();
    formData.append('upload_type', uploadType);
    formData.append(uploadType + '_csv', file);

    fetch('http://localhost:8000/api/process-upload/', {
      method: 'POST',
      body: formData,
      headers: {
        'X-CSRFToken': getCSRFToken(),
      }
    })

    .then((response) => {
      if(!response.ok){
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Upload realizado com sucesso:', data);
      alert('Upload realizado com sucesso:', data);
    })
    .catch((error) => {
      console.log('Erro ao realizar upload:', error);
      alert('Erro ao realizar upload:', error);
    });
  };

  return (
    <body>
      <div className={estilos.body}>
        <form encType="multipart/form-data" className={estilos.form}>
          
          <h1>CSV UPLOAD</h1>

          {/* <input type='hidden' name='csrfmiddlewaretoken' value="{{ csrf_token }}" /> */}
          
          <div className={estilos.uploadSection}>
            <label htmlFor="sensor_csv">Upload Sensor CSV:</label>
            <input
              type="file"
              name="sensor_csv"
              id="sensor_csv"
              onChange={(e) => handleFileChange(e, setSensorFile)}
              className={estilos.input}
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'sensor', sensorFile)}
              className={estilos.button}
            >
              Upload Sensor
            </button>
          </div>

          <div className={estilos.uploadSection}>
            <label htmlFor="luminosidade_csv">Upload Luminosidade CSV:</label>
            <input
              type="file"
              name="luminosidade_csv"
              id="luminosidade_csv"
              onChange={(e) => handleFileChange(e, setLuminosidadeFile)}
              className={estilos.input}
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'luminosidade', luminosidadeFile)}
              className={estilos.button}
            >
              Upload Luminosidade
            </button>
          </div>

          <div className={estilos.uploadSection}>
            <label htmlFor="temperatura_csv">Upload Temperatura CSV:</label>
            <input
              type="file"
              name="temperatura_csv"
              id="temperatura_csv"
              onChange={(e) => handleFileChange(e, setTemperaturaFile)}
              className={estilos.input}
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'temperatura', temperaturaFile)}
              className={estilos.button}
            >
              Upload Temperatura
            </button>
          </div>

          <div className={estilos.uploadSection}>
            <label htmlFor="umidade_csv">Upload Umidade CSV:</label>
            <input
              type="file"
              name="umidade_csv"
              id="umidade_csv"
              onChange={(e) => handleFileChange(e, setUmidadeFile)}
              className={estilos.input}
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'umidade', umidadeFile)}
              className={estilos.button}
            >
              Upload Umidade
            </button>
          </div>

          <div className={estilos.uploadSection}>
            <label htmlFor="contador_csv">Upload Contador CSV:</label>
            <input
              type="file"
              name="contador_csv"
              id="contador_csv"
              onChange={(e) => handleFileChange(e, setContadorFile)}
              className={estilos.input}
            />
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, 'contador', contadorFile)}
              className={estilos.button}
            >
              Upload Contador
            </button>
          </div>
        </form>
      </div>
    </body>
  );
}


