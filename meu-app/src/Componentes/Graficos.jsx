import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js';
import estilos from './TabelaTemperatura.module.css';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Bubble } from 'react-chartjs-2';
import { Scatter } from 'react-chartjs-2';

Chart.register(BarElement, ArcElement, LineController,CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Table = () => {
    const [temperatura, setTemperatura] = useState([]);
    const [umidade, setUmidade] = useState([]);
    const [luminosidade, setLuminosidade] = useState([]);
    const [contador, setContador] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTemperatura = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!")
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/temperatura/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTemperatura(response.data);
            } catch(error){
                console.error('Erro ao buscar os dados: ', error);
                setError("Erro ao buscar dados")
            }
        };

        const fetchUmidade = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!");
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/umidade/",{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUmidade(response.data);
            }catch(error){
                console.error('Erro ao buscar os dados: ', error);
                setError("Erro ao buscar dados")
            }
        };

        const fetchLuminosidade = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!")
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/luminosidade/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLuminosidade(response.data);
            } catch(error){
                console.error('Erro ao buscar os dados: ', error);
                setError("Erro ao buscar dados")
            }
        };

        const fetchContador = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!")
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/contador/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setContador(response.data);
            } catch(error){
                console.error('Erro ao buscar os dados: ', error);
                setError("Erro ao buscar dados")
            }
        };


        fetchTemperatura();
        fetchUmidade();
        fetchLuminosidade();
        fetchContador();
    }, []);

    const chartDataTemperatura = {
        labels: temperatura.map(data => new Date(data.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: "Valor de Temperatura",
                data: temperatura.map(data => data.valor.toFixed(1)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const chartDataUmidade = {
        labels: umidade.map(data => new Date(data.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: "Valor de Umidade",
                data: umidade.map(data => data.valor.toFixed(1)),
                borderColor: 'rgba(46, 139, 87, 1)',
                backgroundColor: 'rgba(46, 139, 87, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const chartDataLuminosidade = {
        labels: luminosidade.map(data => new Date(data.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: "Valor de Luminosidade",
                data: luminosidade.map(data => data.valor.toFixed(1)),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 2,
            },
        ],
    };

    const chartDataContador = {
        labels: contador.map(data => new Date(data.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: "Valor de Contador",
                data: contador.map(data => {
                    const valor = data.valor;
                    return typeof valor === "number" ? valor.toFixed(1) : 0; }),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderWidth: 2,
            }
        ]
    }

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
            <div className={estilos.rolagem}>
                <h1>Dados de Temperatura</h1>
                <div>
                    <Line data={chartDataTemperatura} options={{responsive: true}} />
                </div>

                <h1>Dados de Umidade</h1>
                <div>
                    <Line data={chartDataUmidade} options={{responsive: true}}/>
                </div>

                <h1>Dados de Luminosidade</h1>
                <div>
                    <Line data={chartDataLuminosidade} options={{responsive: true}}/>
                </div>

                <h1>Dados do Contador</h1>
                <div>
                    <Line data={chartDataContador} options={{responsive: true}}/>
                </div>
            </div>
        </>
    )
};

export default Table;