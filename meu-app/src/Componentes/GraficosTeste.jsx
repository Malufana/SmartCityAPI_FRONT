import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import estilos from './TabelaTemperatura.module.css';

Chart.register(LineController,CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Table = () => {

  const [temperatura, setTemperatura] = useState([]);
  const [umidade, setUmidade] = useState([]);
  const [luminosidade, setLuminosidade] = useState([]);
  const [error, setError] = useState("");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const updateChart = () =>{
      if(!chartInstance.current){
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [],
            datasets: [
              {
                label: "Valor de Temperatura",
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2, 
              },
              {
                label: "Valor da Umidade",
                data: [],
                borderColor: 'rgba(46, 139, 87, 1)',
                backgroundColor: 'rgba(46, 139, 87, 0.2)',
                borderWidth: 2,
              },
              {
                label: "Valor da Luminosidade",
                data: [],
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: "Temperatura, Umidade e Luminosidade" },
            },
            scales: { y: { beginAtZero: true } },
          },
        });
      } else{
        const chart = chartInstance.current;

        const uniqueLabels = Array.from(
          new Set([
            ...temperatura.map(data => new Date(data.timestamp).toLocaleDateString()),
            ...umidade.map(data => new Date(data.timestamp).toLocaleDateString()),
            ...luminosidade.map(data => new Date(data.timestamp).toLocaleDateString()),
          ])
        ).sort((a, b) => new Date(a) - new Date(b));

        const mapDataToLabels = (data, labels) => 
          labels.map(label => {
            const entry = data.find(d => new Date(d.timestamp).toLocaleDateString() === label);
            return entry ? entry.valor.toFixed(1) : null;
          });

        chart.data.labels = uniqueLabels;

        chart.data.datasets[0].data = mapDataToLabels(temperatura, uniqueLabels);
        chart.data.datasets[1].data = mapDataToLabels(umidade, uniqueLabels);
        chart.data.datasets[2].data = mapDataToLabels(luminosidade, uniqueLabels);

        chart.update();

      }
    };

    updateChart();

    const fetchData = async (url, setData) => {
      const token = localStorage.getItem("token");

      if(!token){
        setError("Usuário não logado!")
        return;
      }

      try{
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch(error){
        console.error(`Erro ao buscar os dados de ${url}`, error);
        setError(`Erro ao buscar dados de ${url}`)
      }
    };

    fetchData("http://127.0.0.1:8000/api/temperatura/", setTemperatura);
    fetchData("http://127.0.0.1:8000/api/umidade/", setUmidade);
    fetchData("http://127.0.0.1:8000/api/luminosidade/", setLuminosidade);

    
  }, [temperatura, umidade, luminosidade]);

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

  return(
    <>
      <div>
        <h1>Gráfico de Sensores</h1>
        <div>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </>
  );

};

export default Table;