import React, { useState, useEffect }  from 'react';
import axios from 'axios';
import estilos from './TabelaSensores.module.css';

export function TabelaSensores(){
    const [sensores, setSensores] = useState([]);
    const [error, setError] =useState("");

    useEffect (() => {
        const fetchSensores = async () => {
            const token = localStorage.getItem("token");

            if(!token){
                setError("Usuário não logado!");
                return;
            }

            try{
                const response = await axios.get("http://127.0.0.1:8000/api/sensores/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSensores(response.data);
            } catch(error){
                console.error('Error ao buscar os dados: ', error);
                setError("Erro ao buscar dados");
            }
        };

        fetchSensores();

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

    return(
        <div>
            <h1 className={estilos.h1}>SENSORES</h1>
            <div className={estilos.rolagem}>
                <table className={estilos.tabela}> 
                    <thead>
                        <tr className={estilos.cabecalho}>
                            <th>ID</th>
                            <th>LATITUDE</th>
                            <th>LONGITUDE</th>
                            <th>LOCALIZAÇÃO</th>
                            <th>RESPONSAVEL</th>
                            <th>OBSERVAÇÃO</th>
                            <th>TIPO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensores.map((sensor) => (
                            <tr key={sensor.id} className={estilos.linha}>
                                <td>{sensor.id}</td>
                                <td>{sensor.latitude}</td>
                                <td>{sensor.longitude}</td>
                                <td>{sensor.localizacao}</td>
                                <td>{sensor.responsavel}</td>
                                <td>{sensor.observacao}</td>
                                <td>{sensor.tipo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}